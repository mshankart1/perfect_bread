import { createReadStream, existsSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { createHash } from 'node:crypto'

const PUBLIC_ROOT = resolve(process.cwd(), 'public')

/** Portable Text: one normal paragraph */
export function blockParagraph(text, key = 'p1') {
  return {
    _type: 'block',
    _key: key,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `${key}-span`,
        text,
        marks: [],
      },
    ],
  }
}

/** Portable Text from one or more paragraph strings */
export function blocks(...paragraphs) {
  return paragraphs
    .filter((text) => typeof text === 'string' && text.trim())
    .map((text, index) => blockParagraph(text.trim(), `b${index + 1}`))
}

export function slugValue(current) {
  return { _type: 'slug', current }
}

/**
 * Normalize a path that may be "bread.png", "/bread.png", or "public/bread.png".
 * @param {string} relativePath
 */
export function normalizePublicRelativePath(relativePath) {
  return String(relativePath || '')
    .replace(/^\/+/, '')
    .replace(/^public\/+/i, '')
}

/**
 * Resolve a path under /public. Returns absolute path or null if missing.
 * @param {string} relativePath e.g. "bread.png", "public/bread.png", or "partners/partners_1.jpg"
 */
export function publicAssetPath(relativePath) {
  const cleaned = normalizePublicRelativePath(relativePath)
  if (!cleaned) return null
  const absolute = resolve(PUBLIC_ROOT, cleaned)
  if (!absolute.startsWith(PUBLIC_ROOT)) return null
  if (!existsSync(absolute)) return null
  return absolute
}

/**
 * Stable seed asset filename so re-runs can reuse existing Sanity assets.
 * @param {string} relativePath
 */
export function seedAssetFilename(relativePath) {
  const cleaned = normalizePublicRelativePath(relativePath)
  const base = basename(cleaned).replace(/[^a-zA-Z0-9._-]/g, '-')
  const hash = createHash('sha1').update(cleaned).digest('hex').slice(0, 8)
  return `seed-${hash}-${base}`
}

/**
 * Upload (or reuse) a public/ image and return an image field value.
 * @param {import('@sanity/client').SanityClient | null} client
 * @param {string} relativePath path under public/
 * @param {{ alt?: string, key?: string, dryRun?: boolean, cache?: Map<string, string> }} options
 */
export async function imageFromPublic(
  client,
  relativePath,
  {
    alt = '',
    key,
    dryRun = false,
    skipImages = false,
    cache = new Map(),
  } = {},
) {
  if (skipImages) return null

  const cleaned = normalizePublicRelativePath(relativePath)
  const absolute = publicAssetPath(cleaned)
  if (!absolute) {
    console.warn(`  ! missing local image: public/${cleaned}`)
    return null
  }

  const filename = seedAssetFilename(cleaned)

  if (dryRun || !client) {
    return {
      _type: 'image',
      _key: key,
      alt,
      _seedLocalPath: `public/${cleaned}`,
      _seedFilename: filename,
    }
  }

  let assetId = cache.get(filename)
  if (!assetId) {
    const existing = await client.fetch(
      `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
      { filename },
    )
    if (existing) {
      assetId = existing
    } else {
      const asset = await client.assets.upload('image', createReadStream(absolute), {
        filename,
        contentType: guessContentType(filename),
      })
      assetId = asset._id
    }
    cache.set(filename, assetId)
  }

  const image = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: assetId,
    },
    alt,
  }
  if (key) image._key = key
  return image
}

function guessContentType(filename) {
  const lower = filename.toLowerCase()
  if (lower.endsWith('.png')) return 'image/png'
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) return 'image/jpeg'
  if (lower.endsWith('.webp')) return 'image/webp'
  if (lower.endsWith('.avif')) return 'image/avif'
  if (lower.endsWith('.gif')) return 'image/gif'
  return undefined
}

/**
 * Strip dry-run-only metadata and null image slots before writing.
 * @param {Record<string, unknown>} doc
 */
export function stripSeedMeta(doc) {
  return JSON.parse(
    JSON.stringify(doc, (key, value) => {
      if (key.startsWith('_seed')) return undefined
      if (value === null) return undefined
      if (Array.isArray(value)) {
        return value.filter((item) => item != null)
      }
      return value
    }),
  )
}

/**
 * Upsert documents via a single transaction.
 * @param {import('@sanity/client').SanityClient | null} client
 * @param {Array<Record<string, unknown>>} documents
 * @param {{ dryRun?: boolean, name?: string }} options
 */
export async function upsertDocuments(
  client,
  documents,
  { dryRun = false, name } = {},
) {
  const summary = documents.map((doc) => ({
    _id: doc._id,
    _type: doc._type,
  }))

  const base = name ? { name } : {}

  if (dryRun) {
    return { ...base, dryRun: true, documents: summary, full: documents }
  }

  if (!client) {
    throw new Error('Sanity client is required for write mode')
  }

  const transaction = client.transaction()
  for (const doc of documents) {
    transaction.createOrReplace(stripSeedMeta(doc))
  }
  await transaction.commit({ visibility: 'async' })

  return { ...base, dryRun: false, upserted: summary }
}

/** Shared image upload cache for one seed run */
export function createImageCache() {
  return new Map()
}
