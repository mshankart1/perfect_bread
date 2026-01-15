'use client';
import Image from 'next/image';
import Slider from 'react-slick/lib/slider';

export function Banner({ banners }) {
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

  console.log({ banners });

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
              src={item.asset.url}
              width={2000}
              height={2000}
              priority
              alt={item._key}
              className="w-full max-w-full object-cover aspect-[5/2.3] max-lg:aspect-[1.5] h-auto lg:h-[calc(100vh-64px)]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
