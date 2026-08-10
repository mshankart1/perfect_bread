import { createImageCache, imageFromPublic, upsertDocuments } from './helpers.mjs'

export async function seedTimeline(client, { dryRun = false, skipImages = false } = {}) {
  const cache = createImageCache()

  const documents = [
    {
      _id: 'timeline.1998',
      _type: 'timeline',
      year: 1998,
      title: 'The Perfect Beginning',
      description:
        'Perfect Bread starts its journey with a focus on soft, fresh bakery staples for Indian homes.',
      mainImage: await imageFromPublic(client, 'about_us.png', {
        alt: 'Perfect Bread beginnings',
        dryRun,
        skipImages,
        cache,
      }),
    },
    {
      _id: 'timeline.2008',
      _type: 'timeline',
      year: 2008,
      title: 'Expanding the Network',
      description:
        'New production centres open, bringing Perfect Bread closer to more cities across India.',
      mainImage: await imageFromPublic(client, 'map.png', {
        alt: 'Manufacturing network expansion',
        dryRun,
        skipImages,
        cache,
      }),
    },
    {
      _id: 'timeline.2015',
      _type: 'timeline',
      year: 2015,
      title: 'Quality Certified',
      description:
        'Plants strengthen food-safety systems with ISO 9001:2015 and HACCP certified processes.',
      mainImage: await imageFromPublic(client, 'logo.png', {
        alt: 'Quality certification milestone',
        dryRun,
        skipImages,
        cache,
      }),
    },
    {
      _id: 'timeline.2020',
      _type: 'timeline',
      year: 2020,
      title: 'Wider Range, Same Freshness',
      description:
        'Portfolio grows with atta breads, pav, rusk, and sweet bakery — still baked for everyday freshness.',
      mainImage: await imageFromPublic(client, 'breads.png', {
        alt: 'Expanded Perfect Bread range',
        dryRun,
        skipImages,
        cache,
      }),
    },
    {
      _id: 'timeline.2024',
      _type: 'timeline',
      year: 2024,
      title: 'Serving India Daily',
      description:
        'Perfect Bread continues to deliver bakery favourites through retail and quick-commerce partners nationwide.',
      mainImage: await imageFromPublic(client, 'perfect-banner.jpg', {
        alt: 'Perfect Bread today',
        dryRun,
        skipImages,
        cache,
      }),
    },
  ]

  return upsertDocuments(client, documents, { dryRun, name: 'timeline' })
}

export const timelineSeeder = {
  name: 'timeline',
  description: 'Brand history timeline milestones with images',
  run: seedTimeline,
}
