import { NextResponse } from "next/server";

const BASE = process.env.API || process.env.NEXT_PUBLIC_API;

const normalize = (s?: string) =>
  (s || "")
    .toLowerCase()
    .replace(/[’'`]/g, "")           // شيل الأبوستروف
    .replace(/[^a-z0-9\s]/g, " ")    // حوّل الرموز لمسافة
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (q: string) => {
  let n = normalize(q)
    .replace(/\bmens\b/g, "men")
    .replace(/\bwomens\b/g, "women");
  return Array.from(new Set(n.split(" ").filter(Boolean)));
};

const hasWord = (text: string, word: string) => {
  const t = normalize(text);
  if (!t) return false;
  const re = new RegExp(`\\b${word}\\b`, "i");
  return re.test(t);
};

function scoreItem(item: any, tokens: string[]) {
  const title = item?.title || "";
  const desc = item?.description || "";
  const cat = item?.category?.name || "";
  const brand = item?.brand?.name || "";

  let score = 0;

  // أوزان المطابقة
  for (const w of tokens) {
    if (hasWord(cat, w)) score += 100;      
    if (hasWord(title, w)) score += 60;
    if (hasWord(brand, w)) score += 30;
    if (hasWord(desc, w)) score += 10;
  }


  const askMen = tokens.includes("men");
  const askWomen = tokens.includes("women");
  if (askMen && hasWord(cat, "women")) score -= 80;
  if (askWomen && hasWord(cat, "men")) score -= 80;

  return score;
}

function rankProducts(arr: any[], q: string) {
  const tokens = tokenize(q);
  if (!arr?.length) return [];

  const filtered = arr.filter((it) => {
    return tokens.some((w) =>
      hasWord(it?.title || "", w) ||
      hasWord(it?.description || "", w) ||
      hasWord(it?.category?.name || "", w) ||
      hasWord(it?.brand?.name || "", w)
    );
  });

  return filtered
    .map((it) => ({ it, s: scoreItem(it, tokens) }))
    .sort((a, b) => b.s - a.s)
    .map(({ it }) => it);
}

async function fetchJSON(url: string) {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) return { ok: false as const, status: r.status, json: null as any };
  return { ok: true as const, status: r.status, json: await r.json() };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const page = Number(searchParams.get("page") || "1");
  const categoryId = searchParams.get("categoryId") || "";

  if (!q) return NextResponse.json({ products: [], results: 0, pages: 0 });

  const baseParams = (extra: Record<string, string>) => {
    const p = new URLSearchParams();
    p.set("page", String(page));
    p.set("limit", "80");
    if (categoryId) p.set("category[in]", categoryId);
    Object.entries(extra).forEach(([k, v]) => p.set(k, v));
    return p.toString();
  };

  const tries = [
    `${BASE}/products?${baseParams({ keyword: q })}`,
    `${BASE}/products?${baseParams({ "title[regex]": q, "title[options]": "i" })}`,
  ];


  for (const url of tries) {
    const { ok, json } = await fetchJSON(url);
    if (!ok) continue;
    const products = json?.data ?? [];
    const ranked = rankProducts(products, q);
    if (ranked.length > 0) {
      const pages = json?.metadata?.numberOfPages ?? 1;
      return NextResponse.json({ products: ranked, results: ranked.length, pages });
    }
  }


  const collected: any[] = [];
  const maxPagesToScan = 5;
  for (let p = 1; p <= maxPagesToScan; p++) {
    const url = `${BASE}/products?${baseParams({ page: String(p) })}`;
    const { ok, json } = await fetchJSON(url);
    if (!ok) continue;
    const arr = json?.data ?? [];
    if (!arr.length) break;
    collected.push(...arr);
    const totalPages = json?.metadata?.numberOfPages ?? p;
    if (p >= totalPages) break;
  }

  const ranked = rankProducts(collected, q);
  return NextResponse.json({
    products: ranked,
    results: ranked.length,
    pages: 1,
    note: "fallback-filter",
  });
}
