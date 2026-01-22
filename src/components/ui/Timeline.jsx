'use client';
import { TimelineArrowSegment } from './TimelineArrowSegment';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { SwiperNavButton } from './SwiperNavButton';

export function Timeline({ timeline }) {
  return (
    <div className="w-full h-full my-5 container slider-container relative px-4 md:px-16 [&>*]:p-0 m-0 overflow-hidden">
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={2}
        navigation={{
          prevEl: '.swiper-button-prev-timeline',
          nextEl: '.swiper-button-next-timeline',
        }}
        loop={true}
        speed={500}
        breakpoints={{
          1280: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        }}
        className="w-full"
      >
        {timeline?.map((item, i) => (
          <SwiperSlide key={item.year} className="flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <div className={`w-fit p-5 ${i % 2 === 0 ? 'bg-amber-300' : 'bg-red-400'} mb-12 relative rounded-full`}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="w-38 aspect-square rounded-full object-cover"
                  style={{ boxShadow: '1px 2px 9px 2px black' }}
                />
                <div
                  className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-10 aspect-square ${i % 2 === 0 ? 'bg-amber-300' : 'bg-red-400'}`}
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                ></div>
              </div>
            </div>
            <TimelineArrowSegment
              year={item.year}
              title={item.title}
              description={item.description}
              color={i % 2 === 0 ? 'yellow' : 'red'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <SwiperNavButton
        direction="prev"
        swiperClass="swiper-button-prev-timeline"
        leftPosition='left-3'
      />
      <SwiperNavButton
        direction="next"
        swiperClass="swiper-button-next-timeline"
        rightPosition='right-3'
      />
    </div>
  );
}
