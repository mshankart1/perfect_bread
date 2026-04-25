"use client";
import Image from "next/image";
import { urlFor, getBlockContentHtml } from "@/helpers";

export function PromoCard({
  title,
  image,
  description = "",
  organization = "",
  date = "",
  className = ""
}) {
  return (
    <div
      className={`
        ${className} group bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row gap-4 w-full
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out
      `}
    >
      {/* Image (smaller) */}
      <div className="flex-shrink-0 w-full md:w-48 h-48 relative overflow-hidden rounded-md">
        <Image
          src={urlFor(image).url()}
          alt={image.alt || title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-2xl font-archivo font-bold text-neutral-800 mb-2 line-clamp-2">
          {title}
        </h2>
        {organization && (
          <p className="text-primary font-semibold mb-1">{organization}</p>
        )}
        {date && (
          <p className="text-sm text-neutral-600 mb-2">
            {new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
          </p>
        )}
        {description && (
          <div
            className="text-neutral-700 text-sm"
            dangerouslySetInnerHTML={{ __html: getBlockContentHtml(description, '#cb1f2b') }}
          />
        )}
      </div>
    </div>
  );
}

