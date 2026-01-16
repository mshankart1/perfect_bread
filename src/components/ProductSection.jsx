'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import { useRouter } from 'next/navigation';

const ArrowLeft = (props) => (
  <button
    {...props}
    type="button"
    className={`absolute z-10 left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 focus:outline-none transition-colors ${props.className || ''}`}
    aria-label="Previous"
  >
    <FaArrowLeft size={20} className="text-gray-800" />
  </button>
);

const ArrowRight = (props) => (
  <button
    {...props}
    type="button"
    className={`absolute z-10 right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-3 hover:bg-gray-100 focus:outline-none transition-colors ${props.className || ''}`}
    aria-label="Next"
  >
    <FaArrowRight size={20} className="text-gray-800" />
  </button>
);

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 1,
  classNames: '',
  prevArrow: <ArrowLeft />,
  nextArrow: <ArrowRight />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
        infinite: true,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
      },
    },
  ],
};

export function ProductSection({ products = [] }) {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);
  const allProducts = products?.reduce((acc, val) => {
    if (!acc[val?.category]) {
      acc[val?.category] = [];
    }
    acc[val?.category].push(val);
    return acc;
  }, {});

  const [selectedCategory, setSelectedCategory] = useState(Object.keys(allProducts)?.[0]);

  return (
    <section id="product" className="my-10 container mx-auto">
      <h2 className="heading mb-8 max-md:mb-4 text-primary">PERFECT PRODUCTS</h2>
      <div className="flex flex-col items-center ">
        <div className="flex w-fit px-2 bg-amber-400 py-1.5 max-md:mx-4 my-6 max-md:my-4 justify-between text-lg rounded-lg items-center max-md:text-sm">
          {Object.keys(allProducts).map((item, index, arr) => (
            <span key={item} className="flex items-center">
              <span
                onClick={() => setSelectedCategory(item)}
                className={`${selectedCategory === item ? 'bg-white shadow-sm shadow-black' : ''} px-3 py-1 text-center rounded-md cursor-pointer`}
              >
                {selectedCategory === item ? item : item}
              </span>
              {index !== arr.length - 1 && <span className="h-[30px] w-[1px] bg-black mx-2"></span>}
            </span>
          ))}
        </div>
        {showAll ? (
          <div className="grid grid-cols-4 max-md:grid-cols-2 max-md:px-2 max-lg:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div
                key={product.name + '-' + index}
                className="border  border-gray-400 hover:shadow-md hover:shadow-black/60 hover:scale-[1.01] aspect-[0.9] max-md:aspect-[0.95] transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/${encodeURI(product?.slug) || product?._id}`)}
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
                    {product.title.split(' - ')[0]}
                  </span>
                  <span className="text-xs text-gray-700 min-h-5 text-center">
                    {product.weight ? product.weight + ' gms' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="slider-container w-full mb-10 px-8 max-md:px-2">
            <Slider {...settings} className="[&_.slick-slide]:px-2">
              {Array.isArray(allProducts[selectedCategory]) &&
                allProducts[selectedCategory].map((item, index) => (
                  <div
                    key={item.name + '-' + index}
                    className="flex flex-col items-center w-full justify-center border border-gray-400 ring-0 focus:outline-none focus:ring-0 hover:shadow hover:shadow-black my-2 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/${item.slug || item._id}`);
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
                      <span className="font-bold text-base mask-clip-fill text-center">
                        {item.title.split(' - ')[0]}
                      </span>
                      <span className="text-xs text-gray-700 min-h-5 text-center">
                        {item.weight ? item.weight + ' gms' : ''}
                      </span>
                    </div>
                  </div>
                ))}
            </Slider>
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
