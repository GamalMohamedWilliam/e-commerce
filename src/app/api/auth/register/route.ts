export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { registerSchema } from '@/schema/register.schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json({ message: first?.message || 'Invalid body', field: first?.path?.[0] }, { status: 400 });
    }

    const { name, email, password, phone } = parsed.data;

    const res = await fetch(`${process.env.API}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, rePassword: password, phone }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data?.message || data?.errors?.[0]?.msg || 'Registration failed';
      return NextResponse.json({ message: msg }, { status: res.status });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
