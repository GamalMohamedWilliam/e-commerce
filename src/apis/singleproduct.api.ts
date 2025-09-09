import { ProductInterface } from "@/interfaces/product.interface";

export default async function getSingleProduct(id: string): Promise<ProductInterface> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}`);
  }

  const { data } = await res.json();
  return data as ProductInterface;
}
