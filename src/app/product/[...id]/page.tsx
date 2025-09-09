import Image from "next/image";
import getSingleProduct from '@/apis/singleproduct.api';
import { notFound } from "next/navigation";
import ProductitemBtn from "@/app/products/_components/ProductitemBtn";
import { ProductInterface } from "@/interfaces/product.interface";
import { getProductsInCat } from "@/apis/getProductsInCat.api";
import ProductItem from "../_components/Productitem";

export default async function ProductPage({
  params,
}: {
  params: { id: string[] }
}) {
  const { id } = params;

  try {
    const product = (await getSingleProduct(id[0])) as ProductInterface;
    const catProduct: ProductInterface[] = await getProductsInCat(id[1]);

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* صورة المنتج */}
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              className="object-contain w-full"
              priority
            />
          </div>

          {/* تفاصيل المنتج */}
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-2xl font-bold mb-3">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg font-bold text-main">{product.price} EGP</p>

            <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center">
              <ProductitemBtn
                id={product._id}
                className="w-full bg-main hover:bg-green-700 text-white py-3 rounded text-center font-semibold"
              />
              <div className="flex items-center gap-2">
                <p className="text-main font-semibold flex items-center">
                  {product.ratingsAverage} ⭐
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="my-5">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {catProduct.map((p: ProductInterface) => (
            <ProductItem key={p._id} product={p} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
