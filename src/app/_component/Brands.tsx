import Image from "next/image";
import { BRAND_IMAGES, BRAND_LIST, DEFAULT_BRAND_IMAGE } from "@/constants/brand-images";

type Props = {
    title?: string;
    items?: string[];
};

export default function Brands({ title = "Brands", items = BRAND_LIST }: Props) {
    return (
        <section className="max-w-6xl mx-auto px-4 md:px-6 py-6">
            <h2 className="text-2xl font-semibold mb-6">{title}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((name) => {
                    const img = BRAND_IMAGES[name] ?? DEFAULT_BRAND_IMAGE;
                    return (
                        <div
                            className="group rounded-xl border border-gray-200 bg-white overflow-hidden
             transition-all duration-200
             hover:ring-2 hover:ring-emerald-400 hover:ring-offset-2 hover:ring-offset-emerald-50
             hover:shadow-lg hover:shadow-emerald-200/50
             cursor-default select-none"
                        >

                            <div className="aspect-[4/3] relative bg-white p-4 border-2 rounded-md">
                                <Image
                                    src={img}
                                    alt={name}
                                    fill
                                    className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                                />
                            </div>

                            <div className="p-3 text-center text-emerald-700 font-semibold text-sm">
                                {name}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
