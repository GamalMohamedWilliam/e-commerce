// src/app/cart/_actions/updateCount.actions.ts
'use server'

import { getTokenAuth } from '@/utilites/getTokenAuth.server'

export async function updateCount({
  productId,
  count,
}: { productId: string; count: number }) {
  const token = await getTokenAuth()
  if (!token) throw new Error('Unauthuorized, Log in first')

  const res = await fetch(`${process.env.API}/cart/${productId}`, {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
      token,
    },
    body: JSON.stringify({ count }),
  })

  const payload = await res
    .json()
    .catch(async () => ({ text: await res.text() }))

  if (!res.ok) throw new Error(payload?.message || 'Failed to update count')
  return payload
}
