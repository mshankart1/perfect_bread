'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { SwiperNavButton } from './ui';

export function ProductSection({ products = [] }) {
  const [showAll, setShowAll] = useState(false);
  const allProducts = products?.reduce((acc, val) => {
    if (!acc[val?.category.toLowerCase()]) {
      acc[val?.category.toLowerCase()] = [];
    }
    acc[val?.category.toLowerCase()].push(val);
    return acc;
  }, {});

  const categories = ['Health & Wellness', 'White Bread', 'Bun & Pav', 'Flat Bread', 'Sweet Bakery', 'Rusk'];
  const [selectedCategory, setSelectedCategory] = useState(categories?.[0].toLowerCase());

  return (
    <section id="product" className="my-10 container mx-auto">
      <h2 className="heading mb-8 max-md:mb-6 max-sm:mb-4 text-primary">PERFECT PRODUCTS</h2>
      <div className="flex flex-col items-center ">
        <div className="flex w-fit px-2 bg-secondary py-1.5 max-md:mx-2 my-6 max-md:my-2 max-sm:px-1 justify-between text-lg rounded-lg items-center max-md:text-sm">
          {categories.map((item, index) => (
            <span key={item} className="flex items-center">
              <span
                onClick={() => {
                  setSelectedCategory(item.toLowerCase());
                  setShowAll(false);
                }}
                className={`${selectedCategory === item.toLowerCase() ? 'bg-white shadow-sm shadow-black font-semibold' : ''} px-3 max-md:px-1.5 max-sm:px-1 py-1 text-center rounded-md cursor-pointer`}
              >
                {item}
              </span>
              {index !== categories.length - 1 && <span className="h-[30px] w-[1px] bg-black mx-2 max-sm:mx-1"></span>}
            </span>
          ))}
        </div>
        {showAll ? (
          <div className="grid grid-cols-4 max-md:grid-cols-2 max-md:px-2 max-lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <Link
                key={product.name + '-' + index}
                href={`/product/${encodeURIComponent(product?.slug || product?._id)}`}
                prefetch
                className="border  border-gray-400 hover:shadow-md hover:shadow-black/60 hover:scale-[1.01] aspect-[0.9] max-md:aspect-[0.95] transition-all duration-300 cursor-pointer"
              >
                <Image
                  src={product.imageUrl || null}
                  alt={product.title}
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="w-full object-cover aspect-[1]"
                />
                <div className="flex flex-col px-2 pb-4 items-center max-md:min-h-26 min-h-20 justify-center">
                  <span className="font-bold text-base mask-clip-fill  text-center">
                    {product.title.split('-')[0].trim()}
                  </span>
                  <span className="text-xs text-gray-700 min-h-5 text-center">
                    {product.weight ? product.weight + 'G' : ''}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="slider-container w-full m-0 p-0 overflow-hidden mb-10 px-14 max-md:px-4 relative">
            <div className='w-full'>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={16}
                slidesPerView={2}
                navigation={{
                  prevEl: '.swiper-button-prev-custom',
                  nextEl: '.swiper-button-next-custom',
                }}
                centerInsufficientSlides={true}
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
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                }}
                className="w-full"
              >
                {Array.isArray(allProducts[selectedCategory.toLowerCase()]) && allProducts[selectedCategory.toLowerCase()].length > 0 ?
                  allProducts[selectedCategory.toLowerCase()]?.sort((a, b) => b.weight - a.weight).map((item, index) => (
                    <SwiperSlide key={item.name + '-' + index} className="">
                      <Link
                        href={`/product/${encodeURIComponent(item.slug || item._id)}`}
                        prefetch
                        className="flex flex-col items-center w-full justify-center border border-gray-400 ring-0 focus:outline-none focus:ring-0 hover:shadow hover:shadow-black my-2 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                      >
                        <Image
                          src={item.imageUrl || null}
                          alt={item.title}
                          width={500}
                          height={500}
                          sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                          className="w-full h-full object-cover aspect-[0.9] max-md:aspect-[0.95]"
                        />
                        <div className="flex flex-col px-2 pb-4 items-center max-md:min-h-26 min-h-20 justify-center">
                          <span className="font-bold text-base mask-clip-fill text-center leading-tight">
                            {item.title.split(' - ')[0]}
                          </span>
                          <span className="text-xs text-gray-700 min-h-5 text-center">
                            {item.weight ? item.weight + ' G' : ''}
                          </span>
                        </div>
                      </Link>
                    </SwiperSlide>
                  )
                  ) : (
                    <SwiperSlide>
                      <div className='text-4xl font-semibold w-full py-10 text-center'>COMING<br />SOON</div>
                    </SwiperSlide>
                  )}
              </Swiper>
              <SwiperNavButton direction="prev" swiperClass="swiper-button-prev-custom" />
              <SwiperNavButton direction="next" swiperClass="swiper-button-next-custom" />
            </div>
          </div>
        )}
        {!showAll ? (
          <button className="bg-red-600 text-white px-4 py-2 rounded-md w-fit" onClick={() => setShowAll(true)}>
            EXPLORE MORE
          </button>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
