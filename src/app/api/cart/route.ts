import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/auth'

const BASE = process.env.API ?? '' // مثال: https://ecommerce.routemisr.com/api/v1

type SessionUserWithToken = {
  token?: string
}

type JsonObject = Record<string, unknown>

export async function GET() {
  const session = await getServerSession(authOptions)
  const token = (session?.user as SessionUserWithToken | undefined)?.token

  if (!token) {
    return NextResponse.json(
      { message: 'Unauthorized', numOfCartItems: 0 },
      { status: 401 }
    )
  }

  const r = await fetch(`${BASE}/cart`, {
    headers: { token },
    cache: 'no-store',
  })

  const json = (await r.json().catch(() => ({}))) as JsonObject
  return NextResponse.json(json, { status: r.status })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const token = (session?.user as SessionUserWithToken | undefined)?.token

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json().catch(() => ({}))) as JsonObject

  const r = await fetch(`${BASE}/cart`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      token,
    },
    body: JSON.stringify(body),
  })

  const json = (await r.json().catch(() => ({}))) as JsonObject
  return NextResponse.json(json, { status: r.status })
}

export async function DELETE() {
  const session = await getServerSession(authOptions)
  const token = (session?.user as SessionUserWithToken | undefined)?.token

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const r = await fetch(`${BASE}/cart`, {
    method: 'DELETE',
    headers: { token },
    cache: 'no-store',
  })

  const json = (await r.json().catch(() => ({}))) as JsonObject
  return NextResponse.json(json, { status: r.status })
}
