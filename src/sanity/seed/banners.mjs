import { createImageCache, imageFromPublic, upsertDocuments } from './helpers.mjs'

/**
 * Banner types used by the homepage:
 * - first_banner (hero carousel)
 * - second_banner (single promo image)
 * - team_section (team / leadership gallery)
 *
 * Schema field is `name` (BANNER_QUERY historically also selects `title`).
 */
export async function seedBanners(client, { dryRun = false, skipImages = false } = {}) {
  const cache = createImageCache()

  const firstImages = (
    await Promise.all([
      imageFromPublic(client, 'perfect-banner.jpg', {
        alt: 'Perfect Bread — fresh bakery hero',
        key: 'first-1',
        dryRun,
        skipImages,
        cache,
      }),
      imageFromPublic(client, 'banner_2.jpg', {
        alt: 'Perfect Bread product showcase',
        key: 'first-2',
        dryRun,
        skipImages,
        cache,
      }),
      imageFromPublic(client, 'breads.png', {
        alt: 'Assorted Perfect Bread loaves',
        key: 'first-3',
        dryRun,
        skipImages,
        cache,
      }),
    ])
  ).filter(Boolean)

  const secondImages = (
    await Promise.all([
      imageFromPublic(client, 'about_us.png', {
        alt: 'About Perfect Bread',
        key: 'second-1',
        dryRun,
        skipImages,
        cache,
      }),
    ])
  ).filter(Boolean)

  const teamImages = (
    await Promise.all([
      imageFromPublic(client, 'ceo.png', {
        alt: 'Perfect Bread leadership',
        key: 'team-1',
        dryRun,
        skipImages,
        cache,
      }),
      imageFromPublic(client, 'about_us.png', {
        alt: 'Perfect Bread team',
        key: 'team-2',
        dryRun,
        skipImages,
        cache,
      }),
    ])
  ).filter(Boolean)

  const documents = [
    {
      _id: 'banner.first',
      _type: 'banner',
      name: 'Home Hero Banner',
      type: 'first_banner',
      images: firstImages,
      publishedAt: '2024-01-15T10:00:00.000Z',
    },
    {
      _id: 'banner.second',
      _type: 'banner',
      name: 'Home Second Banner',
      type: 'second_banner',
      images: secondImages,
      publishedAt: '2024-01-15T10:05:00.000Z',
    },
    {
      _id: 'banner.team',
      _type: 'banner',
      name: 'Team Section Banner',
      type: 'team_section',
      images: teamImages,
      publishedAt: '2024-01-15T10:10:00.000Z',
    },
  ]

  return upsertDocuments(client, documents, { dryRun, name: 'banners' })
}

export const bannersSeeder = {
  name: 'banners',
  description: 'first_banner, second_banner, and team_section banners with images',
  run: seedBanners,
}
