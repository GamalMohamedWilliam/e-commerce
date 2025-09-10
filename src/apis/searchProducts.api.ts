import { ProductInterface } from "@/interfaces/product.interface";

type Params = { q: string; page?: number; categoryId?: string };

export async function searchProducts(
  { q, page = 1, categoryId }: Params
): Promise<{ products: ProductInterface[]; results: number; pages: number }> {
  if (!q?.trim()) return { products: [], results: 0, pages: 0 };
  const p = new URLSearchParams();
  p.set("q", q.trim());
  p.set("page", String(page));
  if (categoryId) p.set("categoryId", categoryId);

  const res = await fetch(`/api/search?${p.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}
