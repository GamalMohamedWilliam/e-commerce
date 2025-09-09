import getProducts from '@/apis/product.api';
import { ProductInterface } from '@/interfaces/product.interface';
import React from 'react';
import ProductItem from './Productitem';

export default async function FeaturedProducts() {
  const data: ProductInterface[] = await getProducts(); 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-2">
      {data.map((prod) => (
        <ProductItem key={prod.id} product={prod} />  
      ))}
    </div>
  );
}
