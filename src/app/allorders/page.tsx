import React from "react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Payment Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been confirmed.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-main hover:bg-green-700 text-white rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
