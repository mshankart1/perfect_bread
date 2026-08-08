'use client';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export function Banner({ banners }) {
  return (
    <div className="slider-container w-full m-0 p-0 overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        pagination={{
          clickable: true,
          enabled: true,
        }}
        speed={700}
        loop={true}
        className="w-full h-full"
      >
        {banners && banners.map((item, idx) => (
          <SwiperSlide key={idx} className="w-full max-h-[calc(100vh-64px)] object-cover object-bottom m-0 p-0">
            <Image
              src={item?.asset?.url || ''}
              width={2000}
              height={2000}
              priority
              alt={item._key}
              className="w-full max-w-full h-auto max-h-[calc(100vh-64px)] object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
