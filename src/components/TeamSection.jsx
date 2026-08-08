'use client';
// import { getData } from "@/libs";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export function TeamSection({ images }) {
  return (
    <div className="w-full flex flex-col gap-8 max-md:gap-6 max-sm:gap-4 justify-center items-center my-10">
      <h2 className="heading mb-8 max-md:mb-0 text-primary">PERFECT TEAM</h2>
      <div className="w-full max-w-6xl max-xl:max-w-3xl max-md:max-w-xl h-full relative gap-2 md:px-14 px-4 slider-container m-0 p-0 overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{
            clickable: true,
            enabled: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          speed={500}
          className="w-full border-4 border-primary rounded-4xl"
        >
          {images.map((item) => (
            <SwiperSlide key={item._key} className="h-full w-full object-cover">
              <Image
                src={item.asset.url}
                alt={item._key}
                width={2000}
                height={2000}
                className="w-full aspect-[16/11] lg:aspect-[16/9] object-cover object-top overflow-hidden"
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
