'use client';
// import { getData } from "@/libs";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Heading } from './ui';
import Slider from 'react-slick/lib/slider';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { ArrowLeft, ArrowRight } from './ui/Timeline';

export function TeamSection() {
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

  const data = [
    '/team/team_1.jpeg',
    '/team/team_2.jpeg',
    '/team/team_3.jpeg',
    '/team/team_4.jpeg',
    '/team/team_5.jpeg',
    '/team/team_6.jpeg',
    '/team/team_7.jpeg',
    '/team/team_8.jpeg',
    '/team/team_9.jpeg',
    '/team/team_10.jpeg',
    '/team/team_11.jpeg',
    '/team/team_12.jpeg',
    '/team/team_13.jpeg',
    '/team/team_14.jpeg',
  ];
  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center my-10">
      <h2 className="heading mb-8 text-primary">PERFECT TEAM</h2>
      <div className="w-full md:w-3/4 lg:w-1/2 h-full px-16 relative gap-2 slider-container">
        <Slider {...settings}>
          {data.map((item, i) => (
            <div key={i} className="h-full w-full object-cover">
              <Image
                src={item}
                alt={`team member ${i + 1}`}
                width={2000}
                height={2000}
                className="w-full aspect-[19/12] object-cover object-top  rounded-3xl border-4 border-primary overflow-hidden"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
