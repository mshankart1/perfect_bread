'use client';

import { Collapse } from '@/components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaDroplet } from 'react-icons/fa6';
import { FaFlask } from 'react-icons/fa';
import { GiPalmTree } from 'react-icons/gi';
import { useRouter } from 'next/navigation';

export function ProductClient({ product }) {
  const router = useRouter();
  const [currentImage, setCurrentImage] = useState(product?.images?.[0]);
  const color = product?.color || '#cb1f2b';
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-2 max-md:grid-cols-1 max-lg:px-4 my-5 mt-30 gap-x-10 max-md:mt-16">
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
          <div className="w-full flex flex-col max-md:mt-10">
            <h1 className="text-5xl max-lg:text-4xl font-bold whitespace-pre-line" style={{ color: color }}>
              {product?.heading}
            </h1>
            <p className="text-lg mt-2 whitespace-pre-line" style={{ color: color }}>
              {product?.subtitle}
            </p>
            <div className="grid grid-cols-3 max-lg:grid-cols-2 [&>div]:pt-5 mt-3">
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
            <div
              href={product?.redirectUrl || null}
              target="_blank"
              className="btn px-4 py-2 text-white rounded-lg w-fit my-8 max-lg:my-6 max-md:my-4 min-w-32 text-center font-semibold text-2xl max-lg:text-lg cursor-pointer"
              style={{ backgroundColor: color }}
            >
              BUY NOW
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
              <Collapse heading={'INGREDIENTS'}></Collapse>
              {product?.nutritionalInformation?.length > 0 && (
                <Collapse heading={'NUTRITIONAL - INFORMATION'}>
                  <div className="flex flex-col mb-3">
                    {product?.nutritionalInformation?.map((info) => (
                      <div
                        key={info._key}
                        className="flex justify-between items-center border-b px-2 border-gray-400 py-1"
                      >
                        <span className="text-lg text-wrap">{info.name}</span>
                        <p className="text-base text-gray-500">{info.quantity}</p>
                      </div>
                    ))}
                  </div>
                </Collapse>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-yellow-400 pt-16 max-md:pt-10 max-sm:pt-8 pb-4">
        <div className="w-full px-16 max-md:px-10 max-sm:px-6 bg-white container rounded-t-4xl grid grid-cols-3 gap-6">
          <h2 className="text-4xl col-span-3 mt-6 font-bold text-center" style={{ color: color }}>
            SIMILAR PRODUCTS
          </h2>
          {product?.related?.map((related, index) => (
            <div
              key={related.name + '-' + index}
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
                <span className="font-bold text-lg mask-clip-fill  text-center">{related.title.split(' - ')[0]}</span>
                <span className="text-lg text-gray-700 min-h-5 text-center">
                  {`(${related.weight ? related.weight + ' gms' : ''})`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
