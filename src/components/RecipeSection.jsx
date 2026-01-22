'use client';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { SwiperNavButton } from './ui';

export function RecipeSection({ recipes }) {

  return (
    <div id="recipe" className="bg-[url('/recipes-bg.jpg')] py-16 bg-cover bg-center w-full relative">
      <section className="container mx-auto px-4">
        <h2 className="heading text-primary mb-8 text-center">PERFECT RECIPES</h2>
        <div className="slider-container max-md:px-6 px-14 relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={{
              prevEl: '.swiper-button-prev-recipe',
              nextEl: '.swiper-button-next-recipe',
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
            className="px-6 mx-4 rounded-4xl py-10 backdrop-blur-xs"
          >
            {recipes.map((item, i) => (
              <SwiperSlide key={i} className="h-full slider-item">
                <div
                  className="relative rounded-4xl max-sm:min-h-80 max-md:min-h-96 min-h-96 mt-[40%] max-lg:mt-[55%] h-full slider-item"
                  style={{ background: item?.card_color }}
                >
                  <Image
                    src={urlFor(item.image)?.url() || ''}
                    alt={item.image?.alt || item?.title}
                    width={1000}
                    height={1000}
                    className="w-[70%] max-md:w-[65%] shadow-[3px_3px_10px_0px_rgba(0,0,0,0.5)] object-cover absolute rounded-full left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                  <div className="flex flex-col flex-grow px-6 max-md:px-4 max-md:py-0 min-h-0  pt-[50%] max-md:pt-[40%] max-lg:pt-[37%]">
                    <h3
                      className="text-white font-bold mb-4 leading-tight uppercase cursor-pointer hover:underline overflow-hidden text-ellipsis line-clamp-2 underline-offset-2"
                      onClick={(e)=> {
                        e.preventDefault();
                        item?.url && window.open(item.url, '_blank');
                      }}
                      style={{
                        fontSize: '19px',
                        letterSpacing: '1.5px',
                        fontFamily: 'sans-serif',
                        fontWeight: '700',
                        lineHeight: '1.3',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-white mb-4 max-md:mb-3 flex-grow leading-relaxed cursor-default"
                      style={{
                        fontSize: '14px',
                        fontFamily: 'sans-serif',
                        lineHeight: '1.7',
                        opacity: '0.95',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <SwiperNavButton direction="prev" swiperClass="swiper-button-prev-recipe" />
          <SwiperNavButton direction="next" swiperClass="swiper-button-next-recipe" />
        </div>
      </section>
    </div>
  );
}
