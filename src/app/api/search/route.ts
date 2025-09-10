import { NextResponse } from "next/server";

const BASE = process.env.API || process.env.NEXT_PUBLIC_API;

// ===== Types =====
type Nullable<T> = T | null | undefined;

interface Category { name?: string | null }
interface Brand    { name?: string | null }
export interface Product {
  title?: string | null;
  description?: string | null;
  category?: Category;
  brand?: Brand;
}

interface ApiMeta { numberOfPages?: number }
interface ApiListResponse<T> { data?: T[]; metadata?: ApiMeta }

// ===== Utils =====
const normalize = (s?: string) =>
  (s || "")
    .toLowerCase()
    .replace(/[’'`]/g, "")           // شيل الأبوستروف
    .replace(/[^a-z0-9\s]/g, " ")    // حوّل الرموز لمسافة
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (q: string): string[] => {
  const n = normalize(q)
    .replace(/\bmens\b/g, "men")
    .replace(/\bwomens\b/g, "women");
  return Array.from(new Set(n.split(" ").filter(Boolean)));
};

const hasWord = (text: Nullable<string>, word: string): boolean => {
  const t = normalize(text || "");
  if (!t) return false;
  const re = new RegExp(`\\b${word}\\b`, "i");
  return re.test(t);
};

function scoreItem(item: Product, tokens: string[]): number {
  const title = item?.title || "";
  const desc  = item?.description || "";
  const cat   = item?.category?.name || "";
  const brand = item?.brand?.name || "";

  let score = 0;

  for (const w of tokens) {
    if (hasWord(cat, w))   score += 100;
    if (hasWord(title, w)) score += 60;
    if (hasWord(brand, w)) score += 30;
    if (hasWord(desc, w))  score += 10;
  }

  const askMen   = tokens.includes("men");
  const askWomen = tokens.includes("women");
  if (askMen && hasWord(cat, "women"))  score -= 80;
  if (askWomen && hasWord(cat, "men"))  score -= 80;

  return score;
}

function rankProducts(arr: Product[], q: string): Product[] {
  const tokens = tokenize(q);
  if (!arr?.length) return [];

  const filtered = arr.filter((it) =>
    tokens.some((w) =>
      hasWord(it?.title || "", w) ||
      hasWord(it?.description || "", w) ||
      hasWord(it?.category?.name || "", w) ||
      hasWord(it?.brand?.name || "", w)
    )
  );

  return filtered
    .map((it) => ({ it, s: scoreItem(it, tokens) }))
    .sort((a, b) => b.s - a.s)
    .map(({ it }) => it);
}

async function fetchJSON<T>(url: string): Promise<
  | { ok: true;  status: number; json: T }
  | { ok: false; status: number; json: null }
> {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) return { ok: false, status: r.status, json: null };
  const json = (await r.json()) as T;
  return { ok: true, status: r.status, json };
}

// ===== Route =====
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q          = (searchParams.get("q") || "").trim();
  const page       = Number(searchParams.get("page") || "1");
  const categoryId = searchParams.get("categoryId") || "";

  if (!q) {
    return NextResponse.json({ products: [], results: 0, pages: 0 });
  }

  const baseParams = (extra: Record<string, string>) => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", "80");
    if (categoryId) params.set("category[in]", categoryId);
    Object.entries(extra).forEach(([k, v]) => params.set(k, v));
    return params.toString();
  };

  const tries: string[] = [
    `${BASE}/products?${baseParams({ keyword: q })}`,
    `${BASE}/products?${baseParams({ "title[regex]": q, "title[options]": "i" })}`,
  ];

  // محاولات البحث المباشرة
  for (const urlStr of tries) {
    const { ok, json } = await fetchJSON<ApiListResponse<Product>>(urlStr);
    if (!ok) continue;
    const products = json?.data ?? [];
    const ranked   = rankProducts(products, q);
    if (ranked.length > 0) {
      const pages = json?.metadata?.numberOfPages ?? 1;
      return NextResponse.json({ products: ranked, results: ranked.length, pages });
    }
  }

  // فallback: مسح صفحات وقفية
  const collected: Product[] = [];
  const maxPagesToScan = 5;
  for (let pageIdx = 1; pageIdx <= maxPagesToScan; pageIdx++) {
    const urlStr = `${BASE}/products?${baseParams({ page: String(pageIdx) })}`;
    const { ok, json } = await fetchJSON<ApiListResponse<Product>>(urlStr);
    if (!ok) continue;
    const arr = json?.data ?? [];
    if (!arr.length) break;
    collected.push(...arr);
    const totalPages = json?.metadata?.numberOfPages ?? pageIdx;
    if (pageIdx >= totalPages) break;
  }

  const ranked = rankProducts(collected, q);
  return NextResponse.json({
    products: ranked,
    results: ranked.length,
    pages: 1,
    note: "fallback-filter",
  });
}
