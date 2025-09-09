'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ProductInterface } from '@/interfaces/product.interface'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<ProductInterface[]>([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('wishlist') || '[]')
      setWishlist(Array.isArray(saved) ? saved : [])
    } catch {
      setWishlist([])
    }
  }, [])

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="border rounded-lg p-8 text-center text-gray-600">
          <p className="mb-3">Your wishlist is empty for now.</p>
          <Link
            href="/"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {wishlist.map((product) => {
            // ✅ صفحة التفاصيل عندك بتتوقع مسار: /product/[productId]/[categoryId]
            const detailUrl =
              product?.category?._id
                ? `/product/${product._id}/${product.category._id}`
                : `/product/${product._id}/${product._id}` // fallback لو الـ categoryId مش محفوظ

            return (
              <div key={product._id} className="border rounded-lg p-3 shadow">
                <Link href={detailUrl}>
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-contain w-full h-40"
                  />
                  <h3 className="font-semibold mt-2">{product.title}</h3>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
