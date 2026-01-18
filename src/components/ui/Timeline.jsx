'use client';
import { TimelineArrowSegment } from './TimelineArrowSegment';
import Slider from 'react-slick/lib/slider';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const ArrowLeft = (props) => {
  const { classes, ...rest } = props;
  return (
    <button
      {...rest}
      type="button"
      className={`absolute z-10 left-0 md:left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-4/3 bg-primary rounded-full shadow-lg p-2 md:p-3 hover:bg-primary/80 focus:outline-none transition-colors ${classes || ''}`}
      aria-label="Previous"
    >
      <FaArrowLeft size={20} className="text-white" />
    </button>
  );
};

export const ArrowRight = (props) => {
  const { classes, ...rest } = props;
  return (
    <button
      {...rest}
      type="button"
      className={`absolute z-10 -right-0 md:-right-10 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-1/3 bg-primary rounded-full shadow-lg p-2 md:p-3 hover:bg-primary/80 focus:outline-none transition-colors ${classes || ''}`}
      aria-label="Next"
    >
      <FaArrowRight size={20} className="text-white" />
    </button>
  );
};

export function Timeline({ timeline }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
    responsive: [
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className="w-full h-full my-5 container slider-container relative px-4 md:px-8 lg:px-16 [&>*]:p-0">
      <Slider {...settings} className="[&_.slick-slide]:px-1 md:[&_.slick-slide]:px-2">
        {timeline?.map((item, i) => (
          <div className="flex-col items-center justify-center" key={item.year}>
            <div className="flex items-center justify-center">
              <div className={`w-fit p-5 ${i % 2 === 0 ? 'bg-amber-400' : 'bg-red-400'} mb-12 relative rounded-full`}>
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="w-38 aspect-square rounded-full object-cover"
                  style={{ boxShadow: '1px 2px 9px 2px black' }}
                />
                <div
                  className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-10 aspect-square ${i % 2 === 0 ? 'bg-amber-400' : 'bg-red-400'}`}
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
          </div>
        ))}
      </Slider>
    </div>
  );
}
