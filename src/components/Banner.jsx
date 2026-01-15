'use client';
import Image from 'next/image';
import Slider from 'react-slick/lib/slider';

const banners = [
  '/banner/banner_1.jpg',
  '/banner/banner_2.jpg',
  '/banner/banner_3.jpg',
  '/banner/banner_4.jpg',
  '/banner/banner_5.jpg',
];

export function Banner() {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: false,
    pauseOnHover: false,
    cssEase: 'linear',
    className: 'react-slick-no-padding',
  };

  return (
    <div className="slider-container w-full m-0 p-0 overflow-hidden">
      <style jsx global>{`
        /* Remove padding and margin from slick-slide and slick-track */
        .react-slick-no-padding .slick-slide {
          padding: 0 !important;
          margin: 0 !important;
        }
        .react-slick-no-padding .slick-track {
          padding: 0 !important;
          margin: 0 !important;
        }
      `}</style>
      <Slider {...settings}>
        {banners.map((item, idx) => (
          <div key={idx} className="w-full m-0 p-0">
            <Image
              src={item}
              width={2000}
              height={2000}
              priority
              alt="hero image"
              className="w-full max-w-full object-cover aspect-[5/2.3] max-lg:aspect-[1.5] h-auto lg:h-[calc(100vh-64px)]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
