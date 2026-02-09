'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useRouter } from 'next/navigation';
import { SwiperNavButton } from './ui';

export function ProductSection({ products = [] }) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const allProducts = products?.reduce((acc, val) => {
    if (!acc[val?.category.toLowerCase()]) {
      acc[val?.category.toLowerCase()] = [];
    }
    acc[val?.category.toLowerCase()].push(val);
    return acc;
  }, {});

  const categories = ['White Bread', 'Health & Wellness', 'Bun & Pav', 'Flat Bread', 'Rusk', 'Sweet Bakery'];
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(allProducts)?.[0]);

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
              <div
                key={product.name + '-' + index}
                className="border  border-gray-400 hover:shadow-md hover:shadow-black/60 hover:scale-[1.01] aspect-[0.9] max-md:aspect-[0.95] transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`product/${encodeURI(product?.slug) || product?._id}`)}
              >
                <Image
                  src={product.imageUrl || null}
                  alt={product.title}
                  width={500}
                  height={500}
                  priority
                  className="w-full object-cover aspect-[1]"
                />
                <div className="flex flex-col px-2 pb-4 items-center max-md:min-h-26 min-h-20 justify-center">
                  <span className="font-bold text-base mask-clip-fill  text-center">
                    {product.title.split('-')[0].trim()}
                  </span>
                  <span className="text-xs text-gray-700 min-h-5 text-center">
                    {product.weight ? product.weight + ' gms' : ''}
                  </span>
                </div>
              </div>
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
                loop={true}
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
                  allProducts[selectedCategory.toLowerCase()]?.map((item, index) => (
                    <SwiperSlide key={item.name + '-' + index} className="">
                      <div
                        className="flex flex-col items-center w-full justify-center border border-gray-400 ring-0 focus:outline-none focus:ring-0 hover:shadow hover:shadow-black my-2 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`product/${item.slug || item._id}`);
                        }}
                      >
                        <Image
                          src={item.imageUrl || null}
                          alt={item.title}
                          width={500}
                          height={500}
                          priority
                          className="w-full h-full object-cover aspect-[0.9] max-md:aspect-[0.95]"
                        />
                        <div className="flex flex-col px-2 pb-4 items-center max-md:min-h-26 min-h-20 justify-center">
                          <span className="font-bold text-base mask-clip-fill text-center leading-tight">
                            {item.title.split(' - ')[0]}
                          </span>
                          <span className="text-xs text-gray-700 min-h-5 text-center">
                            {item.weight ? item.weight + ' gms' : ''}
                          </span>
                        </div>
                      </div>
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
