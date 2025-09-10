'use client'
import { ProductInterface } from '@/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import ProductitemBtn from '@/app/products/_components/ProductitemBtn'
import Heartitem from '@/app/_component/Heartitem'

interface Props {
  product: ProductInterface
}

export default function ProductItem({ product }: Props) {
  return (
    <div
      className="group relative border border-transparent rounded-lg p-2 shadow
                 flex flex-col justify-between hover:border-green-500 hover:shadow-lg
                 transition-all duration-300 ease-in-out overflow-hidden min-h-[440px]"
    >
      {/* القلب */}
      <Heartitem product={product} className="absolute top-3 right-3 z-10" />

      {/* محتوى الكارت */}
      <div className="p-3 productCard pb-16">
        <Link href={`/product/${product._id}/${product.category._id}`} className="block">
          <span className="text-main">{product.category.name}</span>

          <div className="w-full h-56 my-2">
            <Image
              width={300}
              height={300}
              src={product.imageCover}
              className="w-full h-full object-contain"
              alt={product.title}
            />
          </div>

          <h3 className="font-bold text-lg line-clamp-1">{product.title}</h3>
        </Link>

        <div className="mt-3">
          <p className="text-main font-bold">
            {product.ratingsAverage}{' '}
            <i className="fa-solid fa-star text-rating" />
          </p>

          <div className="mt-1">
            <p
              className={`text-main font-bold ${product.priceAfterDiscount ? 'line-through' : ''}`}
            >
              {product.price} EGP
            </p>

            {product.priceAfterDiscount && (
              <span className="text-gray-700">
                {product.priceAfterDiscount} EGP
              </span>
            )}
          </div>
        </div>
      </div>

      {/* زرار الإضافة: ظاهر دائمًا على الموبايل ويظهر بالهوفر من أول md */}
      <div
        className="
          absolute inset-x-0 bottom-0 h-14
          bg-white flex items-center justify-center
          transition-all duration-300
          translate-y-0 opacity-100              /* موبايل: ظاهر دائمًا */
          md:translate-y-full md:opacity-0        /* من أول md يختفي */
          md:group-hover:translate-y-0 md:group-hover:opacity-100
        "
      >
        <ProductitemBtn
          id={product._id}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
        />
      </div>
    </div>
  )
}
