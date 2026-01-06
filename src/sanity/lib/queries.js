import { defineQuery } from 'next-sanity';

export const POST_QUERY = defineQuery(`*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  body,
  "imageUrl": mainImage.asset->url
}`);

export const TIMELINE_QUERY = defineQuery(`*[_type == "timeline"] | order(_createdAt asc, year asc){
  year,
  title,
  description,
  "imageUrl": mainImage.asset->url
}`);

export const PRODUCT_QUERY = defineQuery(`*[_type == "product"] | order(_createdAt asc){
  _id,
  title,
  category,
  "slug": slug.current,
  weight,
  description,
  "imageUrl": image.asset->url
}`);
