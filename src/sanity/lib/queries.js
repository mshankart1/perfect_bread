import { defineQuery } from 'next-sanity';

export const POST_QUERY = defineQuery(`*[_type == "post"]{
  _id,
  title,
  "slug": slug.current,
  body,
  "imageUrl": mainImage.asset->url
}`);

export const TIMELINE_QUERY = defineQuery(`*[_type == "timeline"] | order(year asc){
  year,
  title,
  description,
  "imageUrl": mainImage.asset->url
}`);

export const PRODUCT_QUERY = defineQuery(`*[_type == "product"] | order(_createdAt asc){
  _id,
  title,
  slug,
  category,
  "slug": slug.current,
  weight,
  description,
  "imageUrl": images[0].asset->url
}`);

export const RECIPE_QUERY = defineQuery(`*[_type == "recipe"] | order(_createdAt asc){
  _id,
  name,
  card_color,
  description,
  "imageUrl": image.asset->url,
  "slug": slug.current
}`);

export const SINGLE_PRODUCT_QUERY = defineQuery(`
  *[_type == "product" && _id == $id][0]{
    _id,
    title,
    heading,
    subtitle,
    color,
    nutritionalInformation,
    category,
    "slug": slug.current,
    weight,
    redirectUrl,
    description,
    images[]{
      _key,
      asset->{
        url
      }
    },
    "related":
      select(
        count(*[_type == "product" && category == ^.category && _id != $id]) > 0 
          => *[_type == "product" && category == ^.category && _id != $id][0...3]{
              _id,
              title,
              heading,
              subtitle,
              nutritionalInformation,
              category,
              "slug": slug.current,
              weight,
              description,
             "imageUrl": images[0].asset->url
            },
        *[_type == "product" && _id != $id][0...3]{
          _id,
          title,
          heading,
          subtitle,
          nutritionalInformation,
          category,
          "slug": slug.current,
          weight,
          description,
          "imageUrl": images[0].asset->url
        }
      )
  }
`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    heading,
    subtitle,
    color,
    nutritionalInformation,
    category,
    "slug": slug.current,
    weight,
    redirectUrl,
    description,
    images[]{
      _key,
      asset->{
        url
      }
    },
    "related": 
      select(
        count(*[_type == "product" && category == ^.category && slug.current != $slug]) > 0 
          => *[_type == "product" && category == ^.category && slug.current != $slug][0...3]{
              _id,
              title,
              heading,
              subtitle,
              nutritionalInformation,
              category,
              "slug": slug.current,
              weight,
              description,
              "imageUrl": images[0].asset->url
            },
        *[_type == "product" && slug.current != $slug][0...3]{
          _id,
          title,
          heading,
          subtitle,
          nutritionalInformation,
          category,
          "slug": slug.current,
          weight,
          description,
          "imageUrl": images[0].asset->url
        }
      )
  }
`);

export const BANNER_QUERY = defineQuery(`*[_type == "banner"] | order(_createdAt asc){
  _id,
  title,
  type,
  images[]{
    _key,
    asset->{
      url
    }
  }
}`);
