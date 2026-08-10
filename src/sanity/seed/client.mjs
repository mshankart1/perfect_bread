import { createClient } from '@sanity/client'

const WRITE_TOKEN_KEYS = [
  'SANITY_API_WRITE_TOKEN',
  'SANITY_WRITE_TOKEN',
  'SANITY_API_TOKEN',
]

export function getWriteToken() {
  for (const key of WRITE_TOKEN_KEYS) {
    const value = process.env[key]?.trim()
    if (value) return { token: value, source: key }
  }
  return { token: null, source: null }
}

/**
 * @param {{ requireWriteToken?: boolean }} [options]
 */
export function createSeedClient({ requireWriteToken = true } = {}) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim()
  const apiVersion =
    process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2025-05-04'
  const { token, source } = getWriteToken()

  const missing = []
  if (!projectId) missing.push('NEXT_PUBLIC_SANITY_PROJECT_ID')
  if (!dataset) missing.push('NEXT_PUBLIC_SANITY_DATASET')
  if (requireWriteToken && !token) {
    missing.push(
      'SANITY_API_WRITE_TOKEN (or SANITY_WRITE_TOKEN / SANITY_API_TOKEN)',
    )
  }

  if (missing.length > 0) {
    const error = new Error(
      [
        'Missing required environment variables for Sanity seed:',
        ...missing.map((name) => `  - ${name}`),
        '',
        'Add them to .env or .env.local (never commit tokens), then run:',
        '  npm run seed:sanity',
        '',
        'Create a write token at https://www.sanity.io/manage → Project → API → Tokens',
        '(Editor or higher permissions).',
        '',
        'Preview without writing (no token needed):',
        '  npm run seed:sanity -- --dry-run',
      ].join('\n'),
    )
    error.code = 'MISSING_ENV'
    throw error
  }

  const client = token
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        token,
        useCdn: false,
      })
    : null

  return { client, projectId, dataset, apiVersion, tokenSource: source }
}
