'use client'
import React from 'react'
import { Swiper, SwiperSlide  } from 'swiper/react';
import 'swiper/css';

import slider1 from '../../assets/images/imgi_3_41nN4nvKaAL._AC_SY200_.jpg'
import slider2 from '../../assets/images/imgi_2_XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import slider3 from '../../assets/images/imgi_1_61cSNgtEISL._AC_SY200_.jpg'
import blog1 from '../../assets/images/imgi_4_XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import blog2 from '../../assets/images/imgi_5_XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import Image from 'next/image';

export default function MainSlider() {
  return (
    <div className="lg:flex hidden gap-2 mb-4 justify-center items-center">
      {/* السلايدر الكبير على الشمال */}
      <div className="w-[450px] h-[450px]">
        <Swiper spaceBetween={10} slidesPerView={1} className="h-full">
          <SwiperSlide>
            <Image src={slider1} alt='slider1' className='w-[400px] h-[500px] object-cover'/>
          </SwiperSlide>
          <SwiperSlide>
            <Image src={slider2} alt='slider2' className='w-full h-full object-cover'/>
          </SwiperSlide>
          <SwiperSlide>
            <Image src={slider3} alt='slider3' className='w-[315px] h-full object-cover'/>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* عمود الصور الصغير */}
      <div className="w-1/3 flex flex-col gap-2 h-[500px]">
        <Image src={blog1} alt='blog1' className='w-full h-1/2 object-cover rounded'/>
        <Image src={blog2} alt='blog2' className='w-full h-1/2 object-cover rounded'/>
      </div>
    </div>
  )
}
