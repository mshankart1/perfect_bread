import {
  blocks,
  createImageCache,
  imageFromPublic,
  slugValue,
  upsertDocuments,
} from './helpers.mjs'

export async function seedAwards(client, { dryRun = false, skipImages = false } = {}) {
  const cache = createImageCache()

  const documents = [
    {
      _id: 'award.quality-excellence',
      _type: 'award',
      title: 'Quality Excellence Award',
      slug: slugValue('quality-excellence-award'),
      image: await imageFromPublic(client, 'partners/partners_1.jpg', {
        alt: 'Quality Excellence Award',
        dryRun,
        skipImages,
        cache,
      }),
      organization: 'Indian Bakery Association',
      date: '2023-11-18',
      description: blocks(
        'Recognised for consistent product quality and food-safety practices across Perfect Bread manufacturing units.',
      ),
    },
    {
      _id: 'award.best-packaged-bread',
      _type: 'award',
      title: 'Best Packaged Bread Brand',
      slug: slugValue('best-packaged-bread-brand'),
      image: await imageFromPublic(client, 'partners/partners_2.jpg', {
        alt: 'Best Packaged Bread Brand award',
        dryRun,
        skipImages,
        cache,
      }),
      organization: 'Retail Food Awards India',
      date: '2024-02-09',
      description: blocks(
        'Awarded for brand preference and distribution reach in the packaged bread category.',
      ),
    },
    {
      _id: 'award.iso-haccp-recognition',
      _type: 'award',
      title: 'ISO & HACCP Compliance Recognition',
      slug: slugValue('iso-haccp-compliance-recognition'),
      image: await imageFromPublic(client, 'logo.png', {
        alt: 'ISO and HACCP recognition',
        dryRun,
        skipImages,
        cache,
      }),
      organization: 'Food Safety Council',
      date: '2024-05-22',
      description: blocks(
        'Acknowledged for maintaining ISO 9001:2015 and HACCP certified processes at Perfect Bread plants.',
      ),
    },
  ]

  return upsertDocuments(client, documents, { dryRun, name: 'awards' })
}

export const awardsSeeder = {
  name: 'awards',
  description: 'Awards & achievements with organisations, dates, and images',
  run: seedAwards,
}
