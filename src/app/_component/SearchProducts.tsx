'use client';

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "@/apis/searchProducts.api";
import ProductItem from "@/app/product/_components/Productitem"; // موجود عندك

type Props = {
  categoryId?: string;
  children?: React.ReactNode; // هنحط فيها باقي الصفحة: FeaturedProducts ..الخ
};

export default function SearchProducts({ categoryId, children }: Props) {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const [page, setPage] = useState(1);

  // debounce
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 350);
    return () => clearTimeout(t);
  }, [q]);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["search", debounced, page, categoryId],
    queryFn: () => searchProducts({ q: debounced, page, categoryId }),
    enabled: debounced.trim().length > 0,
  });

  const products = data?.products ?? [];
  const totalPages = data?.pages ?? 0;
  const searching = debounced.trim().length > 0;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="my-6">
        <input
          type="text"
          placeholder="search...."
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          className="w-full border rounded-lg px-4 py-2 outline-none"
        />
      </div>

      {/* لو في بحث، اعرض النتايج و أخفي children */}
      {searching ? (
        <>
          {isError && (
            <p className="text-red-600 text-sm mb-4">
              {(error as Error)?.message || "Something went wrong"}
            </p>
          )}

          {isFetching && <p className="text-gray-500 mb-4">Searching…</p>}

          {!isFetching && products.length === 0 && (
            <p className="text-center text-gray-500 mb-6">No products found</p>
          )}

          {products.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((p) => (
                  <ProductItem key={p._id} product={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Prev
                  </button>
                  <span className="text-sm">Page {page} / {totalPages}</span>
                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        // مفيش بحث → رجّع باقي الصفحة
        <>{children}</>
      )}
    </section>
  );
}
