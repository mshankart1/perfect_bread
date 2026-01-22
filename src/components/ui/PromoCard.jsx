"use client";
import Image from "next/image";
import { urlFor } from "@/helpers";
import { useRouter } from "next/navigation";

export function PromoCard({ 
  title,
  image,
  readMoreLink,
  className = ""
}) {
  const router = useRouter();
  return (
    <div
      className={`
        overflow-hidden ${className} group border-r-gray-400 border-r pr-4
        md:[&:nth-child(3n)]:border-r
        md:[&:nth-child(2n)]:border-r-0
        lg:[&:nth-child(2n)]:border-r
        lg:[&:nth-child(3n)]:border-r-0
      `}
    >
      <div className="aspect-square rounded-lg overflow-hidden cursor-pointer" onClick={() => router.push(readMoreLink)}>
        <Image
          src={urlFor(image).url()}
          alt={image.alt || "Promotional content"}
          width={800}
          height={600}
          className="w-full h-auto object-cover object-center group-hover:scale-105 transition-all duration-300 aspect-square"
        />
      </div>
      {/* Bottom Text Section */}
      <div className="px-4 py-5">
        <h2 className="text-xl md:text-2xl font-archivo font-bold tracking-tight text-amber-900 text-center mb-4 line-clamp-2 text-ellipsis overflow-hidden cursor-pointer" onClick={() => router.push(readMoreLink)}>
          {title}
        </h2>
        <div className="text-center">
          <div
            onClick={() => router.push(readMoreLink)}
            className="text-amber-900 font-medium text-lg underline hover:text-amber-700 transition-colors cursor-pointer"
          >
            READ MORE
          </div>
        </div>
      </div>
    </div>
  );
}
