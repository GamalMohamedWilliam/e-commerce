import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import type { JWT } from 'next-auth/jwt'
import type { Session } from 'next-auth'

type APIUser = {
  _id?: string
  id?: string
  name?: string
  email?: string
  image?: string
  token?: string
}

type SigninPayload =
  | {
      message?: string
      token?: string
      user?: APIUser
      data?:
        | {
            token?: string
            user?: APIUser
          }
        | APIUser
    }
  | Record<string, unknown>
  | null

function extractTokenAndUser(payload: SigninPayload): { token?: string; user?: APIUser } {
  if (!payload || typeof payload !== 'object') return {}
  const p = payload as NonNullable<SigninPayload>

  // token in multiple shapes
  const token =
    (p as { token?: string }).token ??
    (p as { data?: { token?: string } }).data?.token ??
    (p as { user?: APIUser }).user?.token

  // user in multiple shapes
  const user =
    (p as { user?: APIUser }).user ??
    ((p as { data?: { user?: APIUser } }).data?.user as APIUser | undefined) ??
    ((p as { data?: APIUser }).data as APIUser | undefined)

  return { token, user }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/auth/login' },

  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const url = `${process.env.API}/auth/signin`

        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const payload = (await res.json().catch(() => null)) as SigninPayload
          const { token, user } = extractTokenAndUser(payload)

          const okByMessage =
            typeof (payload as { message?: string })?.message === 'string' &&
            (payload as { message?: string })!.message === 'success'

          if ((res.ok || okByMessage) && token) {
            const idCandidate =
              user?._id ??
              user?.id ??
              (payload as { user?: APIUser })?.user?._id ??
              (payload as { user?: APIUser })?.user?.id ??
              credentials.email

            const nextUser: User & { token: string } = {
              id: String(idCandidate),
              name: user?.name ?? '',
              email: user?.email ?? credentials.email,
              image: user?.image ?? null,
              token,
            }

            return nextUser
          }

          return null
        } catch {
          return null
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }): Promise<JWT> {
      // مرر توكن الـ backend إلى الـ JWT
      if (user) {
        const u = user as User & { token?: string }
        if (u.token) {
          ;(token as JWT & { accessToken?: string }).accessToken = u.token
        }
        // تحديث بيانات العرض (اختياري)
        token.name = u.name ?? token.name
        token.email = u.email ?? token.email
        token.picture = (u as { image?: string }).image ?? token.picture
      }

      // مساحة لأي تبادل لـ GitHub لاحقًا
      if (account?.provider === 'github') {
        // مثال: (token as JWT & { accessToken?: string }).accessToken = exchangedToken
      }

      return token
    },

    async session({ session, token }): Promise<Session> {
      // نحط التوكن في session.user.token زي المتوقع في المشروع
      const t = token as JWT & { accessToken?: string }
      if (session.user && t.accessToken) {
        ;(session.user as { token?: string }).token = t.accessToken
      }
      return session
    },
  },

  session: { strategy: 'jwt' },
}
