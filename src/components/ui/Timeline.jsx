'use client';
import { TimelineArrowSegment } from './TimelineArrowSegment';
import Slider from 'react-slick/lib/slider';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const data2 = [
  {
    year: 1993,
    image: '/timeline/timeline_1.jpg',
    title: 'THE BIG START:',
    description:
      'Our Managing Director, Mr. H K Bara takes over a sick unit from HFC to reinvent and launch Seeta Foods Pvt. Ltd in industrial town of Faridabad, Haryana in the field of baking.',
  },
  {
    year: 1995,
    image: '/timeline/timeline_2.jpg',
    title: 'THE BRAND ENTRY:',
    description:
      'Here comes the launch of the brand “PERFECT”, which would become the pioneer in the bread industry in the coming years. We nurtured it, baked the passage of hard work, better quality and today we proudly say it’s the Amitabh Bachan of the bread Industry! Unmatched quality and delivery speaks for',
  },
  {
    year: 1997,
    image: '/timeline/timeline_3.jpg',
    title: 'THE FLAGSHIP LAUNCH:',
    description:
      'To cater to the needs of Delhi and NCR Region, LRF FOODS PVT. LTD was launched in the Industrial Area, Faridabad – which later emerged as the flagship company of the group. We were ready to take on the ever increasing demand for better quality and volumes in the ever growing region',
  },
  {
    year: 2001,
    image: '/timeline/timeline_4.jpg',
    title: 'THE CORPORATE WAR ROOM:',
    description:
      'Now as we were growing at a lightning speed, we needed a corporate war room to run the show at a bigger level. We launched our corporate office in sector 15, Main market, Faridabad – right in the heart of the city to coordinate and streamline our operations in the ever increasing Delhi – NCR area.',
  },
  {
    year: 2004,
    image: '/timeline/timeline_5.jpg',
    title: 'Facebook Launched',
    description:
      'Mark Zuckerberg launched Facebook from a Harvard dorm room, beginning a new era of social networking.',
  },
  {
    year: 2007,
    image: '/timeline/timeline_6.jpg',
    title: 'iPhone Revolution',
    description: 'Apple introduced the iPhone, transforming mobile technology and user interaction forever.',
  },
  {
    year: 2008,
    image: '/timeline/timeline_7.jpg',
    title: 'Global Financial Crisis',
    description: 'The collapse of Lehman Brothers triggered a worldwide economic meltdown and recession.',
  },
  {
    year: 2012,
    image: '/timeline/timeline_8.jpg',
    title: 'Tesla Model S Debuts',
    description: 'Tesla released the Model S, redefining electric cars with performance and style.',
  },
  {
    year: 2015,
    image: '/timeline/timeline_1.jpg',
    title: 'SpaceX Makes History',
    description: 'SpaceX launched reusable rockets, making spaceflight more affordable and sustainable.',
  },
  {
    year: 2016,
    image: '/timeline/timeline_8.jpg',
    title: 'US Election Shock',
    description: 'Donald Trump won the U.S. presidential election, signaling major political shifts worldwide.',
  },
  {
    year: 2018,
    image: '/timeline/timeline_5.jpg',
    title: 'GDPR Takes Effect',
    description: "The European Union's General Data Protection Regulation reshaped how companies handle data privacy.",
  },
];

const ArrowLeft = (props) => (
  <button
    {...props}
    type="button"
    className={`absolute z-10 left-0 top-1/2 -translate-y-1/2 -translate-x-4/3 bg-primary rounded-full shadow-lg p-3 hover:bg-primary/80 focus:outline-none transition-colors`}
    aria-label="Previous"
  >
    <FaArrowLeft size={20} className="text-white" />
  </button>
);

const ArrowRight = (props) => (
  <button
    {...props}
    type="button"
    className={`absolute z-10 -right-10 top-1/2 -translate-y-1/2 translate-x-1/3 bg-primary rounded-full shadow-lg p-3 hover:bg-primary/80 focus:outline-none transition-colors`}
    aria-label="Next"
  >
    <FaArrowRight size={20} className="text-white" />
  </button>
);

export function Timeline({ data }) {
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className="w-full h-full my-5 container slider-container relative px-8">
      <Slider {...settings}>
        {data2.map((item, i) => (
          <div className="flex-col items-center justify-center" key={item.year}>
            <div className="flex items-center justify-center">
              <div className={`w-fit p-8 ${i % 2 === 0 ? 'bg-amber-400' : 'bg-red-400'} mb-12 relative rounded-full`}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="w-36 aspect-square shadow-2xl rounded-full object-cover"
                  style={{ boxShadow: '0 0 10px 3px black' }}
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
