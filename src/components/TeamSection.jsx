'use client';
// import { getData } from "@/libs";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Heading } from './ui';
import Slider from 'react-slick/lib/slider';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export function TeamSection() {
  //   const [data, setData] = useState([]);
  //   useEffect(async () => {
  //     const result = await getData('blog');
  //     setData(result);
  //   }, []);

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
    infinite: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };

  const data = ['/team/team_1.png', '/team/team_2.png', '/team/team_3.png', '/team/team_4.png'];
  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center my-5">
      <h2 className="heading mb-5">PERFECT TEAM</h2>
      <div className="w-full md:w-3/4 lg:w-1/2 h-full relative slider-container">
        <Slider {...settings}>
          {data.map((item, i) => (
            <div key={i} className="px-2 h-full w-full object-cover">
              <Image
                src={item}
                alt={`team member ${i + 1}`}
                width={2000}
                height={2000}
                className="w-full aspect-video object-cover rounded-t-lg"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
