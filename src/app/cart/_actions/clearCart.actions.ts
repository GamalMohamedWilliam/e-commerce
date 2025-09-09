// src/app/cart/_actions/clearCart.actions.ts
'use server'

import { getTokenAuth } from '@/utilites/getTokenAuth.server'

export async function clearCart() {
  const token = await getTokenAuth()
  if (!token) throw new Error('Unauthuorized, Log in first')

  const res = await fetch(`${process.env.API}/cart`, {
    method: 'DELETE',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      token,
    },
  })

  const payload = await res
    .json()
    .catch(async () => ({ text: await res.text() }))

  if (!res.ok) throw new Error(payload?.message || 'Failed to clear cart')
  return payload
}
