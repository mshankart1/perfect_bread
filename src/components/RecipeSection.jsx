'use client';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick/lib/slider';
import Image from 'next/image';
import Link from 'next/link';

const data = [
  {
    title: 'BREAD PAKORA RECIPE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....',
    image: '/product/bread-1.jpg',
    bgColor: '#FF6B35', // Vibrant Orange
  },
  {
    title: 'BURGER RECIPE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....',
    image: '/product/bread-4.jpg',
    bgColor: '#9B7A9F', // Mauve/Purple
  },
  {
    title: 'GRILLED SANDWICH RECIPE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....',
    image: '/product/bread-2.jpg',
    bgColor: '#E63946', // Bright Red
  },
  {
    title: 'VEGETARIAN PIZZA RECIPE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....',
    image: '/product/bread-3.jpg',
    bgColor: '#2D5016', // Dark Green
  },
  {
    title: 'BURGER RECIPE',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua....',
    image: '/product/bread-4.jpg',
    bgColor: '#9B7A9F', // Mauve/Purple
  },
];
export function RecipeSection() {
  const ArrowLeft = (props) => {
    const { className, onClick } = props;
    return (
      <button
        onClick={onClick}
        type="button"
        className={`absolute z-10 left-0 top-1/2 shadow-2xl -translate-y-1/3 -translate-x-2/3 cursor-pointer bg-white rounded-full p-3 hover:bg-gray-100 focus:outline-none transition-colors`}
        aria-label="Previous"
      >
        <FaArrowLeft size={20} className="text-red-600" />
      </button>
    );
  };

  const ArrowRight = (props) => {
    const { className, onClick } = props;
    return (
      <button
        onClick={onClick}
        type="button"
        className={`absolute z-10 -right-0 shadow-2xl top-1/2 -translate-y-1/3 bg-white rounded-full p-3 cursor-pointer hover:bg-gray-100 focus:outline-none transition-colors translate-x-2/3`}
        aria-label="Next"
      >
        <FaArrowRight size={20} className="text-red-600" />
      </button>
    );
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div id="recipe" className="bg-[url('/recipes-bg.jpg')] py-16 bg-cover bg-center w-full relative">
      <section className="container mx-auto px-4">
        <h2 className="heading text-primary mb-8 text-center">PERFECT RECIPES</h2>
        <div className="slider-container">
          <Slider {...settings} className=" px-6 mx-4  rounded-4xl py-10 backdrop-blur-xs">
            {data.map((item, i) => (
              <div key={i} className="h-full slider-item">
                <div
                  key={i}
                  className="relative rounded-4xl aspect-[1/1.5] mt-26 h-full slider-item"
                  style={{ background: item.bgColor }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={500}
                    height={500}
                    className="w-[70%] object-cover shadow-4xl absolute rounded-full aspect-square -top-24 left-1/2 -translate-x-1/2"
                  />
                  <div
                    className="flex flex-col flex-grow"
                    style={{
                      padding: '32px 24px',
                      minHeight: '240px',
                    }}
                  >
                    <h3
                      className="text-white  pt-24 font-bold mb-4 leading-tight uppercase"
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
                      className="text-white mb-6 flex-grow leading-relaxed"
                      style={{
                        fontSize: '14px',
                        fontFamily: 'sans-serif',
                        lineHeight: '1.7',
                        opacity: '0.95',
                      }}
                    >
                      {item.description}
                    </p>
                    <Link
                      href="#"
                      className="text-white self-start"
                      style={{
                        fontSize: '14px',
                        fontFamily: 'sans-serif',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                        fontWeight: '400',
                      }}
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}
