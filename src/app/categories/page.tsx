import Image from "next/image";
import Link from "next/link";

// All of these images were located in the 'images' folder, not 'categories'.
// I've updated the paths to correctly point to them.
import img1 from "@/assets/categories/imgi_1_1681511964020.jpg";
import img2 from "@/assets/categories/imgi_2_1681511865180.jpg";
import img3 from "@/assets/categories/imgi_3_1681511818071.jpg";
import img4 from "@/assets/categories/imgi_4_1681511452254.png";
import img5 from "@/assets/categories/imgi_5_1681511427130.png";
import img6 from "@/assets/categories/imgi_6_1681511392672.png";
import img7 from "@/assets/categories/imgi_7_1681511368164.png";
import img8 from "@/assets/categories/imgi_8_1681511179514.png";
import img9 from "@/assets/categories/imgi_9_1681511156008.png";
import img10 from "@/assets/categories/imgi_10_1681511121316.png";

// This one was already correct.


export const revalidate = 60;

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to load categories");
  const payload = await res.json();
  return payload?.data ?? [];
}

const IMG_BY_NAME: Record<string, any> = {
    "Electronics": img10,      // سماعات/إلكترونيات
    "Music": img1,             // جيتار
    "Men's Fashion": img2,     // رجالي
    "Women's Fashion": img3,   // حريمي/فستان
    "Bags & Wallets": img5,    // شنط ومحافظ
    "Beauty & Health": img8,   // بيوتي/عناية
    "Mobiles": img9,           // موبايلات
    "Home": img6,              // منزل/أدوات منزلية
    "SuperMarket": img4,       // تموين/بقالة
    "Baby & Toys": img7,       // أطفال وألعاب
  };
  
export default async function CategoriesPage() {
  const cats = await getCategories();

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-6 py-6">
      <h1 className="text-2xl font-semibold mb-6">Categories</h1>

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cats.map((c: any) => {
          const img = IMG_BY_NAME[c.name] ?? img1; // fallback لو مفيش صورة مخصصة
          return (
            <Link
            key={c._id}
            href={`/categories/${c._id}`}
            className="rounded-lg border hover:shadow-md transition overflow-hidden
                       pointer-events-none cursor-default select-none"
            aria-disabled="true"
            tabIndex={-1}
            prefetch={false}
          >
            <div className="aspect-[4/3] relative bg-white">
              <Image src={img} alt={c.name} fill className="object-contain p-4 border-2 border-black" />
            </div>
            <div className="p-4 text-center text-emerald-700 font-semibold text-xl">
              {c.name}
            </div>
          </Link>
          
          );
        })}
      </div>
    </main>
  );
}
