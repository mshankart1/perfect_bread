'use client';

import { Collapse, SwiperNavButton } from '@/components';
import Image from 'next/image';
import { useState } from 'react';
import { FaDroplet } from 'react-icons/fa6';
import { FaFlask } from 'react-icons/fa';
import { GiPalmTree } from 'react-icons/gi';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { toHTML } from '@portabletext/to-html';
import { getBlockContentHtml } from '@/helpers';

export function ProductClient({ product }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(product?.images?.[0]);
  const color = product?.color || '#cb1f2b';



  const html = getBlockContentHtml(product.ingredients, color);

  return (
    <>
      <div className="container">
        <div className="grid grid-cols-2 max-md:grid-cols-1 max-lg:px-4 my-5 mt-20 gap-x-10 max-md:mt-14">
          <div className="w-full">
            <Image
              src={currentImage?.asset?.url || null}
              alt={currentImage?.alt || currentImage?._key}
              priority
              height={1000}
              width={1000}
              className="w-full aspect-square object-cover border-2"
              style={{ borderColor: color }}
            />
            <div className="grid grid-cols-5 max-lg:grid-cols-4 max-xs:grid-cols-3 gap-2 mt-4">
              {product?.images?.length > 0 &&
                product?.images?.map((image) => (
                  <Image
                    key={image?._key}
                    src={image?.asset?.url || null}
                    alt={image?.alt || image?._key}
                    priority
                    onClick={() => setCurrentImage(image)}
                    height={1000}
                    width={1000}
                    className={`w-full cursor-pointer aspect-square object-cover ${image._key == currentImage._key ? 'border-2' : 'border-1'}`}
                    style={{ borderColor: image._key == currentImage._key ? 'var(--color-primary)' : color }}
                  />
                ))}
            </div>
          </div>
          <div className="w-full flex flex-col max-md:mt-6">
            <h1 className="text-5xl max-lg:text-4xl font-bold whitespace-pre-line" style={{ color: color }}>
              {product?.heading}
            </h1>
            <h3 className="text-3xl font-bold" style={{ color: color }}>
              ({product?.weight ? product?.weight + ' gms' : ''})
            </h3>
            <p className="text-lg mt-2 whitespace-pre-line" style={{ color: color }}>
              {product?.subtitle}
            </p>
            {/* Health Benefits */}
            {product.category.toLowerCase() !== 'rusk' && (
              <div className="grid grid-cols-3 max-lg:grid-cols-2 [&>div]:pt-5 mt-1">
                <div
                  className="flex flex-col border-primary items-center px-4 justify-center gap-5 border-2 border-l-0 max-xs:border-r-0 max-xs:col-span-1"
                // style={{ borderColor: color }}
                >
                  <div className="relative bg-primary text-white rounded-full w-fit p-3">
                    <FaFlask size={20} />
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rotate-45 rounded-full z-2 w-8 h-0.5 flex items-center justify-center"></div>
                  </div>
                  <span className="text-lg text-center min-h-16">No Preservatives</span>
                </div>
                <div
                  className="flex flex-col items-center px-4 border-primary justify-center gap-5 border-2 border-l-0 max-lg:border-r-0 max-xs:border-t-0 max-xs:col-span-1"
                // style={{ borderColor: color }}
                >
                  <div className="relative bg-primary text-white rounded-full w-fit p-3">
                    <FaDroplet size={20} />
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rotate-45 rounded-full z-2 w-8 h-0.5 flex items-center  justify-center"></div>
                  </div>
                  <span className="text-lg text-center min-h-16">Zero Cholesterol Trans Fat</span>
                </div>
                <div
                  className="flex flex-col items-center px-4 justify-center gap-5 border-2 border-primary border-x-0 max-lg:border-t-0 max-lg:col-span-2 max-xs:col-span-1"
                // style={{ borderColor: color }}
                >
                  <div className="relative bg-primary text-white rounded-full w-fit p-3">
                    <GiPalmTree size={20} />
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rotate-45 rounded-full z-2 w-8 h-0.5 flex items-center justify-center"></div>
                  </div>
                  <span className="text-lg text-center min-h-16">No Palm Oil</span>
                </div>
              </div>
            )}
            <div
              className="btn px-4 py-2 text-white rounded-lg w-fit my-8 max-lg:my-6 max-md:my-4 min-w-32 text-center font-semibold text-2xl max-lg:text-lg cursor-default"
              style={{ backgroundColor: color }}
            >
              AVAILABLE ON
            </div>
            <div className="grid grid-cols-4 max-lg:grid-cols-2 max-lg:px-6 max-xs:px-3 gap-6 mb-8 max-lg:mb-6 max-md:mb-4 [&>img]:self-center">
              <Image
                src={'/ecom-partners/instamart.png'}
                alt="Instamart"
                priority
                width={500}
                height={500}
                className="w-full aspect-video object-contain"
              />
              <Image
                src={'/ecom-partners/flipkart-minutes.png'}
                alt="Flipkart Minutes"
                priority
                width={500}
                height={500}
                className="w-full aspect-video object-contain"
              />
              <Image
                src={'/ecom-partners/big-basket.png'}
                alt="Big Basket"
                priority
                width={500}
                height={500}
                className="w-full aspect-video object-contain"
              />
              <Image
                src={'/ecom-partners/blinkit.png'}
                alt="Blinkit"
                priority
                width={500}
                height={500}
                className="w-full aspect-video object-contain"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Collapse heading={'INGREDIENTS'}>
                <div dangerouslySetInnerHTML={{ __html: html }} className="text-center flex flex-col gap-3 px-4 py-3" />
              </Collapse>
              {product?.nutritionalInformation?.length > 0 && (
                <Collapse heading={'NUTRITIONAL - INFORMATION'}>
                  <div className="overflow-x-auto mb-3">
                    <table className="min-w-full overflow-hidden">
                      <thead>
                        <tr className="bg-gray-200 font-semibold text-gray-900">
                          <th className="px-4 py-2 border-b text-lg text-left">Parameters</th>
                          <th className="px-4 py-2 border-b text-base text-right">Typical Value Per 100 g</th>
                          <th className="px-4 py-2 border-b text-base text-right">Per Serve % Contribution to RDA#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product?.nutritionalInformation?.map((info) => (
                          <tr key={info._key} className="even:bg-gray-50 odd:bg-white">
                            <td className="px-4 py-2 border-b border-gray-400 text-lg text-wrap text-left">{info.name}</td>
                            <td className="px-4 py-2 border-b text-base border-gray-400 text-gray-500 text-right">{info.quantity}</td>
                            <td className="px-4 py-2 border-b text-base border-gray-400 text-gray-500 text-right">{info.rta || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-center md:px-6 px-2 font-semibold whitespace-pre-line mb-4">
                    {product?.nutriInfo}
                  </div>
                </Collapse>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-yellow-400 pt-16 max-md:pt-10 max-sm:pt-8 pb-4">
        <div className="w-full px-16 max-md:px-10 max-sm:px-6 bg-white container rounded-t-4xl grid grid-cols-3 max-sm:grid-cols-1 gap-6">
          <h2 className="text-4xl col-span-3 mt-6 font-bold text-center" style={{ color: color }}>
            SIMILAR PRODUCTS
          </h2>
          <div className="col-span-3 slider-container w-full m-0 p-0 overflow-hidden relative">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={2}
              navigation={{
                prevEl: '.swiper-button-prev-product',
                nextEl: '.swiper-button-next-product',
              }}
              loop={true}
              speed={500}
              breakpoints={{
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
              }}
              className="w-full"
            >
              {product?.related?.map((related, index) => (
                <SwiperSlide key={related.name + '-' + index}>
                  <div
                    className="hover:scale-[1.02] cursor-pointer transition-all duration-300 border border-gray-400 mb-4"
                    onClick={() => router.push(`/${related?.slug || related?._id}`)}
                  >
                    <Image
                      src={related.imageUrl || null}
                      alt={related?._id}
                      width={500}
                      height={500}
                      priority
                      className="w-full object-cover aspect-[1]"
                    />
                    <div className="flex flex-col pt-2 px-2 pb-4 max-md:min-h-28 min-h-26 justify-center">
                      <span className="font-bold text-lg mask-clip-fill  text-center">
                        {related.title.split(' - ')[0]}
                      </span>
                      <span className="text-lg text-gray-700 min-h-5 text-center">
                        {`(${related.weight ? related.weight + ' gms' : ''})`}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <SwiperNavButton direction="prev" swiperClass="swiper-button-prev-product" />
            <SwiperNavButton direction="next" swiperClass="swiper-button-next-product" />
          </div>
        </div>
      </div>
    </>
  );
}
