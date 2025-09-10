"use client";

import React, { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper"; // نوع المرجع
import "swiper/css";

// صورك...
import img1  from "@/assets/categories/imgi_1_1681511964020.jpg";
import img2  from "@/assets/categories/imgi_2_1681511865180.jpg";
import img3  from "@/assets/categories/imgi_3_1681511818071.jpg";
import img4  from "@/assets/categories/imgi_4_1681511452254.png";
import img5  from "@/assets/categories/imgi_5_1681511427130.png";
import img6  from "@/assets/categories/imgi_6_1681511392672.png";
import img7  from "@/assets/categories/imgi_7_1681511368164.png";
import img8  from "@/assets/categories/imgi_8_1681511179514.png";
import img9  from "@/assets/categories/imgi_9_1681511156008.png";
import img10 from "@/assets/categories/imgi_10_1681511121316.png";

const slides: { title: string; src: StaticImageData }[] = [
  { title: "Music", src: img1 },
  { title: "Men's Fashion", src: img2 },
  { title: "Women's Fashion", src: img3 },
  { title: "SuperMarket", src: img4 },
  { title: "Bags & Wallets", src: img5 },
  { title: "Home", src: img6 },
  { title: "Baby & Toys", src: img7 },
  { title: "Beauty & Health", src: img8 },
  { title: "Mobiles", src: img9 },
  { title: "Electronics", src: img10 },
];

export default function MainSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full  m-4">
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        slidesPerView={6}
        spaceBetween={0}
        loop
        loopAdditionalSlides={slides.length}
        allowTouchMove={false}   // لأننا رجّعنا أزرار
        className="!pb-2"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="flex flex-col items-center">
              <div className="relative w-full h-[220px] bg-white">
                <Image src={s.src} alt={s.title} fill className="object-cover" priority={i===0}/>
              </div>
              <span className="mt-2 text-sm md:text-base font-medium text-gray-800 text-center">
                {s.title}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* أزرارك -> تتحكم مباشرة في السلايدر */}
      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="px-3 py-1 rounded-md border bg-gray-300 hover:bg-gray-500 active:scale-[.98]"
          aria-label="Previous"
        >
          
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="px-3 py-1 rounded-md border bg-gray-300 hover:bg-gray-500 active:scale-[.98]"
          aria-label="Next"
        >
          
        </button>
      </div>
    </div>
  );
}
