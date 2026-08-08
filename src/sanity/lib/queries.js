import { defineQuery } from 'next-sanity';

export const TIMELINE_QUERY = defineQuery(`*[_type == "timeline" && !(_id in path("drafts.**"))] | order(year asc){
  year,
  title,
  description,
  "imageUrl": mainImage.asset->url
}`);

export const PRODUCT_QUERY = defineQuery(`*[_type == "product" && !(_id in path("drafts.**"))] | order(weight desc){
  _id,
  title,
  slug,
  category,
  "slug": slug.current,
  weight,
  description,
  "imageUrl": images[0].asset->url
}`);

export const SEO_ROUTES_QUERY = defineQuery(`{
  "products": *[
    _type == "product" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current)
  ]{
    "slug": slug.current,
    _updatedAt
  },
  "blogs": *[
    _type == "blog" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current)
  ]{
    "slug": slug.current,
    _updatedAt
  }
}`);

export const RECIPE_QUERY = defineQuery(`*[_type == "recipe" && !(_id in path("drafts.**"))] | order(sort asc, _createdAt asc){
  _id,
  title,
  card_color,
  description,
  image,
  url,
  "slug": slug.current
}`);

const PRODUCT_DETAIL_PROJECTION = `
    _id,
    title,
    heading,
    subtitle,
    color,
    nutritionalInformation,
    nutriInfo,
    ingredients,
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
        defined(*[_type == "product" && !(_id in path("drafts.**")) && category == ^.category && _id != ^._id][0])
          => *[_type == "product" && !(_id in path("drafts.**")) && category == ^.category && _id != ^._id][0...12]{
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
        *[_type == "product" && !(_id in path("drafts.**")) && _id != ^._id][0...12]{
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
`;

export const PRODUCT_BY_KEY_QUERY = defineQuery(`
  *[_type == "product" && !(_id in path("drafts.**")) && (slug.current == $key || _id == $key)][0]{
    ${PRODUCT_DETAIL_PROJECTION}
  }
`);

export const BANNER_QUERY = defineQuery(`*[_type == "banner" && !(_id in path("drafts.**"))] | order(_createdAt asc){
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

export const PLANTS_MANUFACTURERS_PAGE_QUERY = defineQuery(`{
  "page": *[
    _type == "plantsManufacturersPage" &&
    _id == "plantsManufacturersPage" &&
    !(_id in path("drafts.**"))
  ][0]{
    eyebrow,
    title,
    intro,
    features[]{
      _key,
      label,
      icon
    },
    searchPlaceholder,
    allStatesLabel,
    allUnitsLabel,
    notice,
    emptyState,
    directionsLabel
  },
  "plants": *[
    _type == "plantLocation" &&
    !(_id in path("drafts.**")) &&
    active != false
  ] | order(displayOrder asc, companyName asc){
    _id,
    unitLabel,
    companyName,
    state,
    productionCenter,
    address,
    certification,
    licenseText,
    mapUrl,
    displayOrder
  },
  "primaryBanner": *[
    _type == "banner" &&
    !(_id in path("drafts.**")) &&
    type == "first_banner"
  ] | order(_createdAt asc)[0]{
    images[]{
      _key,
      alt,
      asset->{
        url
      }
    }
  }
}`);

export const BLOG_QUERY = defineQuery(`*[_type == "blog" && !(_id in path("drafts.**"))] | order(_createdAt asc){
  _id,
  title,
  "slug": slug.current,
  image,
  color,
  description,
  date
}`);

export const BLOG_BY_SLUG_QUERY = defineQuery(`
  *[_type == "blog" && !(_id in path("drafts.**")) && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    image,
    color,
    description,
    date
  }
`);

export const AWARD_QUERY = defineQuery(`*[_type == "award" && !(_id in path("drafts.**"))] | order(date desc){
  _id,
  title,
  "slug": slug.current,
  image,
  organization,
  date,
  description
}`);

export const AWARD_BY_SLUG_QUERY = defineQuery(`
  *[_type == "award" && !(_id in path("drafts.**")) && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    image,
    organization,
    date,
    description
  }
`);