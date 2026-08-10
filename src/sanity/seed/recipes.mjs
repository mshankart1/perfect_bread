import { createImageCache, imageFromPublic, upsertDocuments } from './helpers.mjs'

/** Recipe schema has no slug; homepage uses title, card_color, description, url, image, sort. */
export async function seedRecipes(client, { dryRun = false, skipImages = false } = {}) {
  const cache = createImageCache()

  const recipesBg = await imageFromPublic(client, 'recipes-bg.jpg', {
    alt: 'Recipe background',
    dryRun,
    skipImages,
    cache,
  })
  const breadImg = await imageFromPublic(client, 'bread.png', {
    alt: 'Bread recipe',
    dryRun,
    skipImages,
    cache,
  })
  const breadsImg = await imageFromPublic(client, 'breads.png', {
    alt: 'Bakery recipes',
    dryRun,
    skipImages,
    cache,
  })
  const bannerImg = await imageFromPublic(client, 'banner_2.jpg', {
    alt: 'Snack recipe',
    dryRun,
    skipImages,
    cache,
  })

  const documents = [
    {
      _id: 'recipe.masala-toast',
      _type: 'recipe',
      title: 'Masala Toast Sandwich',
      card_color: '#cb1f2b',
      description:
        'Crispy toasted Perfect Bread loaded with spiced potato filling — a classic Mumbai-style snack.',
      url: 'https://www.perfectbread.com',
      image: breadImg,
      sort: 1,
      publishedAt: '2024-03-01T09:00:00.000Z',
    },
    {
      _id: 'recipe.vada-pav',
      _type: 'recipe',
      title: 'Classic Vada Pav',
      card_color: '#e8a317',
      description:
        'Street-style vada tucked into soft Perfect Pav with garlic chutney and green chilli.',
      url: 'https://www.perfectbread.com',
      image: breadsImg,
      sort: 2,
      publishedAt: '2024-03-02T09:00:00.000Z',
    },
    {
      _id: 'recipe.bread-upma',
      _type: 'recipe',
      title: 'Bread Upma',
      card_color: '#2f6f4e',
      description:
        'A quick savoury upma made with cubed Perfect Bread, tempering, and fresh veggies.',
      url: 'https://www.perfectbread.com',
      image: recipesBg,
      sort: 3,
      publishedAt: '2024-03-03T09:00:00.000Z',
    },
    {
      _id: 'recipe.cheese-garlic-toast',
      _type: 'recipe',
      title: 'Cheese Garlic Toast',
      card_color: '#3d5a80',
      description:
        'Golden garlic butter toast topped with melted cheese — ready in minutes with Perfect Bread.',
      url: 'https://www.perfectbread.com',
      image: bannerImg,
      sort: 4,
      publishedAt: '2024-03-04T09:00:00.000Z',
    },
  ]

  return upsertDocuments(client, documents, { dryRun, name: 'recipes' })
}

export const recipesSeeder = {
  name: 'recipes',
  description: 'Home recipe cards with colours, sort order, and images',
  run: seedRecipes,
}
