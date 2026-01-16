'use client';
// import { getData } from "@/libs";
import Image from 'next/image';
import Slider from 'react-slick/lib/slider';
import { ArrowLeft, ArrowRight } from './ui/Timeline';

export function TeamSection({ images }) {
  var settings = {
    infinite: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
    responsive: [
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-full flex flex-col gap-5 max-md:gap-3 justify-center items-center my-10">
      <h2 className="heading mb-8 max-md:mb-0 text-primary">PERFECT TEAM</h2>
      <div className="w-full max-w-5xl max-xl:max-w-3xl max-md:max-w-xl h-full relative gap-2 slider-container">
        <Slider {...settings}>
          {images.map((item) => (
            <div key={item._key} className="h-full w-full object-cover">
              <Image
                src={item.asset.url}
                alt={item._key}
                width={2000}
                height={2000}
                className="w-full aspect-[16/11] lg:aspect-[16/9] object-cover object-top  rounded-3xl border-4 border-primary overflow-hidden"
                priority
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
