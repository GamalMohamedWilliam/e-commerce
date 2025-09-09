'use client';

import React from 'react';
import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

import { CartRes, Product } from '../typescript/cart.interface';
import { deleteItem } from '../_actions/deleteitem.actions';
import { clearCart } from '../_actions/clearCart.actions';
import { updateCount } from '../_actions/updateCount.actions';
import Link from 'next/link';

export default function Cart() {
  const queryClient = useQueryClient();

  // اجلب بيانات العربية (الأفضل من /api/cart عشان الكوكيز تتبعت أوتوماتيك)
  const { data, isLoading, isError, error } = useQuery<CartRes>({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch('/api/cart', { cache: 'no-store' });
      if (!res.ok) {
        // لو أنت مش عامل لوج إن هتبقى 401
        throw new Error('Unauthorized');
      }
      return res.json();
    },
  });

  // زرار Clear Cart الواحد (عالمي)
  const {
    mutate: clearCartMutate,
    isPending: isClearing,
  } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success('Cart cleared');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('log in first');
    },
  });

  if (isLoading) return <div className="p-5">Loading...</div>;
  if (isError) return <div className="p-5">Error: {(error as Error).message}</div>;

  const totalPrice = data?.data?.totalCartPrice ?? 0;
  const totalItems = data?.numOfCartItems ?? 0;

  return (
    <div className="p-5">
      <h2>
        total cart price:{' '}
        <span className="text-main font-bold">{totalPrice} EGP</span>
      </h2>
      <h3>
        total cart items:{' '}
        <span className="text-main font-bold">{totalItems}</span>
      </h3>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.products?.map((product) => (
              <ProductItemTable key={product._id} product={product} />
            ))}
          </tbody>
        </table>
      </div>

      {/* زرار واحد ثابت تحت يمين الصفحة */}
      {totalItems > 0 && (
        <Button
          onClick={() => {
            if (confirm('Clear the whole cart?')) clearCartMutate();
          }}
          disabled={isClearing}
          className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700"
        >
          {isClearing ? (
            <i className="fa-solid fa-spinner fa-spin mr-2" />
          ) : (
            <i className="fa-solid fa-trash mr-2" />
          )}
          Clear Cart
        </Button>
        
      )}
      <Button className='block ml-auto my-2 cursor-pointer'>
        <Link href={`/checkout/${data?.cartId}`}>Check Out</Link>
      </Button>
    </div>
  );
}

function ProductItemTable({ product }: { product: Product }) {
  const queryClient = useQueryClient();

  const { mutate: deleteMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      toast.success('product deleted from cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('log in first');
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateCount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: () => {
      toast.error('log in first');
    },
  });

  const maxQty = product.product.quantity ?? 1;

  function inc() {
    if (product.count < maxQty) {
      updateMutate({ productId: product.product._id, count: product.count + 1 });
    } else {
      toast.info('Not available');
    }
  }

  function dec() {
    const next = Math.max(1, product.count - 1);
    updateMutate({ productId: product.product._id, count: next });
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <Image
          width={100}
          height={100}
          src={product.product.imageCover}
          className="size-[100px] object-cover"
          alt={product.product.title}
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.product.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={dec}
            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none"
            type="button"
          >
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
            </svg>
          </button>

          <span className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg block px-2.5 py-1">
            {product.count}
          </span>

          <button
            onClick={inc}
            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none"
            type="button"
          >
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.price} EGP
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => deleteMutate(product.product._id)}
          className="font-medium text-red-600 hover:underline"
        >
          {isDeleting ? (
            <i className="fa-solid fa-spinner fa-spin" />
          ) : (
            <i className="fa-solid fa-trash" />
          )}
        </button>
      </td>
    </tr>
  );
}
