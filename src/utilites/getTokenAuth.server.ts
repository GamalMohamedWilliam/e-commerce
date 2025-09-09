'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

type SessionUserWithToken = {
  token?: string
}

export async function getTokenAuth(): Promise<string | null> {
  const session = await getServerSession(authOptions)
  const token = (session?.user as SessionUserWithToken | undefined)?.token
  return token ?? null
}
