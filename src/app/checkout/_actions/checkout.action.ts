'use server'

import { getTokenAuth } from "@/utilites/getTokenAuth.server"

type shippingAddressType = {
    "details": string,
    "phone": string,
    "city": string
}

export async function checkoutOnline(cartId: string, url=process.env.NEXTAUTH_URL, shippingAddress: shippingAddressType) {
    const token = await getTokenAuth()
    if (!token) throw new Error('Unauthuorized, Log in first')
    const res = await fetch(`${process.env.API}/orders/checkout-session/${cartId}?url=${url}`, {
        method: 'POST',
        body: JSON.stringify({
            shippingAddress
        }),
        headers: {
            token,
            'Content-type': 'application/json'
        }
    })

    const data = await res.json()
    return data
}