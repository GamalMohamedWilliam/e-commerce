'use client'
import { ProductInterface } from '@/interfaces/product.interface'
import { useState, useEffect } from 'react'

interface Props {
  product?: ProductInterface   // 👈 خليها optional
  className?: string
}

export default function Heartitem({ product, className }: Props) {
  const [isInWishlist, setIsInWishlist] = useState(false)

  // نتأكد إنه فيه product قبل ما نشتغل
  useEffect(() => {
    if (!product?._id) return

    const saved = JSON.parse(localStorage.getItem('wishlist') || '[]')
    const found = saved.some((p: ProductInterface) => p._id === product._id)
    setIsInWishlist(found)
  }, [product?._id])

  const toggleWishlist = () => {
    if (!product) return  // 👈 حماية

    let saved = JSON.parse(localStorage.getItem('wishlist') || '[]')

    if (isInWishlist) {
      saved = saved.filter((p: ProductInterface) => p._id !== product._id)
      setIsInWishlist(false)
    } else {
      saved.push(product)
      setIsInWishlist(true)
    }

    localStorage.setItem('wishlist', JSON.stringify(saved))
  }

  return (
    <button
      onClick={toggleWishlist}
      className={`${className} text-2xl transition-colors`}
    >
      <i
        className={`fa-solid fa-heart ${
          isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
        }`}
      />
    </button>
  )
}
