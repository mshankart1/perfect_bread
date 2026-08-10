import {
  blocks,
  createImageCache,
  imageFromPublic,
  slugValue,
  upsertDocuments,
} from './helpers.mjs'

function nutritionRows(rows) {
  return rows.map((row, index) => ({
    _key: `nutri-${index + 1}`,
    name: row.name,
    quantity: row.quantity,
    rta: row.rta,
  }))
}

const BASE_NUTRITION = nutritionRows([
  { name: 'Energy', quantity: '265 kcal', rta: '13%' },
  { name: 'Protein', quantity: '8.2 g', rta: '15%' },
  { name: 'Carbohydrate', quantity: '49 g', rta: '16%' },
  { name: 'Total Fat', quantity: '3.5 g', rta: '5%' },
  { name: 'Saturated Fat', quantity: '1.1 g', rta: '6%' },
  { name: 'Dietary Fibre', quantity: '2.4 g', rta: '8%' },
  { name: 'Sodium', quantity: '420 mg', rta: '21%' },
])

/**
 * Sample products across each category used by the storefront.
 */
export async function seedProducts(client, { dryRun = false, skipImages = false } = {}) {
  const cache = createImageCache()

  async function productImage(path, alt, key) {
    return imageFromPublic(client, path, { alt, key, dryRun, skipImages, cache })
  }

  const whiteBreadImg = await productImage('bread.png', 'Perfect Classic White Bread', 'img-1')
  const wheatImg = await productImage('Wheat.png', 'Perfect Whole Wheat Bread', 'img-1')
  const breadsImg = await productImage('breads.png', 'Perfect bakery assortment', 'img-1')
  const bannerImg = await productImage('banner_2.jpg', 'Perfect bakery product', 'img-1')

  const documents = [
    {
      _id: 'product.classic-white-bread',
      _type: 'product',
      title: 'Classic White Bread',
      heading: 'Soft, fluffy white bread for everyday meals',
      subtitle: 'Freshly baked slices that stay soft from breakfast to dinner.',
      category: 'white bread',
      weight: 400,
      slug: slugValue('classic-white-bread'),
      description: blocks(
        'Our Classic White Bread is baked daily with carefully selected flour for a soft crumb and golden crust.',
        'Perfect for sandwiches, toast, and family breakfasts across India.',
      ),
      ingredients: blocks(
        'Refined wheat flour (maida), water, sugar, yeast, edible vegetable oil, salt, permitted emulsifiers and preservatives.',
      ),
      nutritionalInformation: BASE_NUTRITION,
      nutriInfo: 'Approximate values per 100 g. % RDA based on a 2000 kcal diet.',
      images: [whiteBreadImg].filter(Boolean),
      color: '#f5e6c8',
      redirectUrl: 'https://www.perfectbread.com',
      publishedAt: '2024-02-01T08:00:00.000Z',
    },
    {
      _id: 'product.soft-pav',
      _type: 'product',
      title: 'Soft Pav',
      heading: 'Pillowy pav buns for vada pav & beyond',
      subtitle: 'Light, soft, and ready for your favourite street-food fillings.',
      category: 'bun & pav',
      weight: 300,
      slug: slugValue('soft-pav'),
      description: blocks(
        'Soft Pav from Perfect Bread brings bakery freshness to Mumbai-style snacks and everyday meals.',
      ),
      ingredients: blocks(
        'Refined wheat flour, water, sugar, yeast, edible vegetable oil, salt, milk solids, permitted emulsifiers.',
      ),
      nutritionalInformation: BASE_NUTRITION,
      nutriInfo: 'Approximate values per 100 g.',
      images: [breadsImg].filter(Boolean),
      color: '#ffe8d6',
      publishedAt: '2024-02-02T08:00:00.000Z',
    },
    {
      _id: 'product.atta-bread',
      _type: 'product',
      title: 'Whole Wheat Atta Bread',
      heading: 'Wholesome atta bread for healthier choices',
      subtitle: 'Made with whole wheat flour for everyday nutrition.',
      category: 'health & wellness',
      weight: 400,
      slug: slugValue('whole-wheat-atta-bread'),
      description: blocks(
        'Whole Wheat Atta Bread combines the taste of Perfect Bread with the goodness of atta for a more wholesome loaf.',
      ),
      ingredients: blocks(
        'Whole wheat flour (atta), water, wheat gluten, yeast, sugar, edible vegetable oil, salt, permitted emulsifiers.',
      ),
      nutritionalInformation: nutritionRows([
        { name: 'Energy', quantity: '248 kcal', rta: '12%' },
        { name: 'Protein', quantity: '9.5 g', rta: '18%' },
        { name: 'Carbohydrate', quantity: '45 g', rta: '15%' },
        { name: 'Total Fat', quantity: '3.0 g', rta: '4%' },
        { name: 'Dietary Fibre', quantity: '5.8 g', rta: '19%' },
        { name: 'Sodium', quantity: '390 mg', rta: '20%' },
      ]),
      nutriInfo: 'Higher fibre than classic white bread. Values per 100 g.',
      images: [wheatImg].filter(Boolean),
      color: '#e8d4b8',
      publishedAt: '2024-02-03T08:00:00.000Z',
    },
    {
      _id: 'product.milk-rusk',
      _type: 'product',
      title: 'Milk Rusk',
      heading: 'Crisp milk rusk for tea-time',
      subtitle: 'Twice-baked for that signature crunch with chai.',
      category: 'rusk',
      weight: 200,
      slug: slugValue('milk-rusk'),
      description: blocks(
        'Milk Rusk is twice-baked for a crisp bite — the Perfect Bread companion to your evening tea.',
      ),
      ingredients: blocks(
        'Refined wheat flour, sugar, milk solids, edible vegetable oil, yeast, salt, permitted emulsifiers.',
      ),
      nutritionalInformation: BASE_NUTRITION,
      images: [bannerImg].filter(Boolean),
      color: '#f0d9b5',
      publishedAt: '2024-02-04T08:00:00.000Z',
    },
    {
      _id: 'product.fruit-bun',
      _type: 'product',
      title: 'Fruit Bun',
      heading: 'Sweet bakery bun with fruity notes',
      subtitle: 'A soft sweet bun for snacks and celebrations.',
      category: 'sweet bakery',
      weight: 250,
      slug: slugValue('fruit-bun'),
      description: blocks(
        'Our Fruit Bun is a soft sweet bakery treat with a hint of fruit flavour — great for lunchboxes and tea time.',
      ),
      ingredients: blocks(
        'Refined wheat flour, sugar, water, yeast, edible vegetable oil, fruit bits, milk solids, salt.',
      ),
      nutritionalInformation: BASE_NUTRITION,
      images: [breadsImg].filter(Boolean),
      color: '#ffd6e0',
      publishedAt: '2024-02-05T08:00:00.000Z',
    },
    {
      _id: 'product.plain-kulcha',
      _type: 'product',
      title: 'Plain Kulcha',
      heading: 'Soft flat bread for curries & rolls',
      subtitle: 'Ready-to-heat kulcha for quick North Indian meals.',
      category: 'flat bread',
      weight: 300,
      slug: slugValue('plain-kulcha'),
      description: blocks(
        'Plain Kulcha from Perfect Bread is soft, lightly layered flat bread that pairs perfectly with chole, paneer, and gravies.',
      ),
      ingredients: blocks(
        'Refined wheat flour, water, edible vegetable oil, yeast, sugar, salt, permitted emulsifiers.',
      ),
      nutritionalInformation: BASE_NUTRITION,
      images: [whiteBreadImg].filter(Boolean),
      color: '#fff1d6',
      publishedAt: '2024-02-06T08:00:00.000Z',
    },
  ]

  return upsertDocuments(client, documents, { dryRun, name: 'products' })
}

export const productsSeeder = {
  name: 'products',
  description: 'Sample products across Bun & Pav, Flat Bread, Health, Rusk, Sweet, White Bread',
  run: seedProducts,
}
