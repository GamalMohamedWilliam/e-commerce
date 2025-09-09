import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string | null
      token?: string | null   // لو محتاج تضيف التوكن هنا
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string | null
    accessToken?: string     // لو عايز تخزن التوكن في الـ JWT
  }
}
