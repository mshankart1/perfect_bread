import {
  blocks,
  createImageCache,
  imageFromPublic,
  slugValue,
  upsertDocuments,
} from './helpers.mjs'

export async function seedBlogs(client, { dryRun = false, skipImages = false } = {}) {
  const cache = createImageCache()

  const documents = [
    {
      _id: 'blog.freshness-matters',
      _type: 'blog',
      title: 'Why Freshness Matters in Everyday Bread',
      slug: slugValue('why-freshness-matters'),
      image: await imageFromPublic(client, 'bread.png', {
        alt: 'Fresh Perfect Bread loaf',
        dryRun,
        skipImages,
        cache,
      }),
      color: '#cb1f2b',
      description: blocks(
        'From dough to dispatch, Perfect Bread focuses on short production-to-shelf journeys so your loaf tastes bakery-fresh.',
        'Here is how our manufacturing network and cold-chain partners help keep bread soft across cities.',
      ),
      date: '2024-06-12',
    },
    {
      _id: 'blog.atta-vs-white',
      _type: 'blog',
      title: 'Atta Bread vs White Bread: What Should You Choose?',
      slug: slugValue('atta-vs-white-bread'),
      image: await imageFromPublic(client, 'Wheat.png', {
        alt: 'Whole wheat bread',
        dryRun,
        skipImages,
        cache,
      }),
      color: '#8b5a2b',
      description: blocks(
        'Both styles have a place on the Indian table. Atta bread brings more fibre, while classic white bread stays soft and versatile.',
        'Choose based on your meal — sandwiches, toast, or wholesome breakfasts — and enjoy Perfect Bread either way.',
      ),
      date: '2024-07-08',
    },
    {
      _id: 'blog.tea-time-rusk',
      _type: 'blog',
      title: 'Tea-Time Favourites: Making the Most of Milk Rusk',
      slug: slugValue('tea-time-milk-rusk'),
      image: await imageFromPublic(client, 'banner_2.jpg', {
        alt: 'Milk rusk with tea',
        dryRun,
        skipImages,
        cache,
      }),
      color: '#c45c26',
      description: blocks(
        'Crisp milk rusk is a chai-time classic. Pair it with masala chai, dunk lightly, or crush over desserts for texture.',
        'Store in an airtight tin to keep that Perfect Bread crunch longer.',
      ),
      date: '2024-08-20',
    },
  ]

  return upsertDocuments(client, documents, { dryRun, name: 'blogs' })
}

export const blogsSeeder = {
  name: 'blogs',
  description: 'Sample blog posts with slugs, colours, and cover images',
  run: seedBlogs,
}
