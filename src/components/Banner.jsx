'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export function Banner({ banners }) {
  return (
    <div className="slider-container w-full m-0 p-0 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={700}
        loop={true}
        className="w-full"
      >
        {banners && banners.map((item, idx) => (
          <SwiperSlide key={idx} className="w-full m-0 p-0">
            <Image
              src={item.asset.url}
              width={2000}
              height={2000}
              priority
              alt={item._key}
              className="w-full max-w-full object-cover aspect-[5/2.3] max-lg:aspect-[1.5] h-auto lg:h-[calc(100vh-64px)]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
