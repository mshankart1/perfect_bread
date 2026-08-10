#!/usr/bin/env node
/**
 * Sanity CMS seed for Perfect Bread (idempotent createOrReplace).
 *
 * Approach: Node + @sanity/client (preferred over `sanity dataset import` for
 * modular seeders, fixed `_id` upserts, and optional public/ image uploads).
 *
 * Required env (.env / .env.local or shell):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN   (Editor+; aliases: SANITY_WRITE_TOKEN, SANITY_API_TOKEN)
 *
 * Optional:
 *   NEXT_PUBLIC_SANITY_API_VERSION  (default: 2025-05-04)
 *
 * Usage:
 *   npm run seed:sanity
 *   npm run seed:sanity -- --dry-run
 *   npm run seed:sanity -- --only=products
 *   npm run seed:sanity -- --only=banners,products,recipes
 *   npm run sanity:seed   (alias)
 *
 * Images: uploaded from public/ when present; reuses assets by seed filename.
 * Never commit .env files or real tokens.
 * blockContent is an embedded type (not seeded as standalone documents).
 */

import { createSeedClient } from './client.mjs'
import { loadEnvFiles } from './loadEnv.mjs'
import { awardsSeeder } from './awards.mjs'
import { bannersSeeder } from './banners.mjs'
import { blogsSeeder } from './blogs.mjs'
import { plantsManufacturersSeeder } from './plantsManufacturers.mjs'
import { productsSeeder } from './products.mjs'
import { recipesSeeder } from './recipes.mjs'
import { timelineSeeder } from './timeline.mjs'

/** @type {Array<{ name: string, description: string, run: Function }>} */
const seeders = [
  bannersSeeder,
  productsSeeder,
  recipesSeeder,
  timelineSeeder,
  blogsSeeder,
  awardsSeeder,
  plantsManufacturersSeeder,
]

function parseArgs(argv) {
  const flags = {
    dryRun: false,
    skipImages: false,
    only: null,
    help: false,
  }

  for (const arg of argv) {
    if (arg === '--dry-run') flags.dryRun = true
    else if (arg === '--skip-images') flags.skipImages = true
    else if (arg === '--help' || arg === '-h') flags.help = true
    else if (arg.startsWith('--only=')) {
      flags.only = arg
        .slice('--only='.length)
        .split(',')
        .map((name) => name.trim())
        .filter(Boolean)
    }
  }

  return flags
}

function printHelp() {
  const list = seeders
    .map((s) => `  - ${s.name}: ${s.description}`)
    .join('\n')

  console.log(`Sanity seed for Perfect Bread

Seeders:
${list}

Options:
  --dry-run                 Print planned documents without writing (no token needed)
  --skip-images             Seed text/fields only; leave image fields empty
  --only=<a,b>              Run one or more seeders (comma-separated)
  -h, --help                Show this help

Examples:
  npm run seed:sanity -- --dry-run
  npm run seed:sanity -- --skip-images
  npm run seed:sanity -- --only=plants-manufacturers
  npm run seed:sanity -- --only=banners,products
`)
}

function selectSeeders(onlyNames) {
  if (!onlyNames?.length) return seeders

  const selected = []
  const unknown = []

  for (const name of onlyNames) {
    const match = seeders.find((s) => s.name === name)
    if (match) selected.push(match)
    else unknown.push(name)
  }

  if (unknown.length) {
    console.error(
      `Unknown seeder(s): ${unknown.join(', ')}. Available: ${seeders
        .map((s) => s.name)
        .join(', ')}`,
    )
    process.exit(1)
  }

  return selected
}

function countByType(docs) {
  /** @type {Record<string, number>} */
  const counts = {}
  for (const doc of docs) {
    counts[doc._type] = (counts[doc._type] || 0) + 1
  }
  return counts
}

async function main() {
  loadEnvFiles()

  const flags = parseArgs(process.argv.slice(2))
  if (flags.help) {
    printHelp()
    process.exit(0)
  }

  const selected = selectSeeders(flags.only)

  const { client, projectId, dataset, apiVersion, tokenSource } =
    createSeedClient({ requireWriteToken: !flags.dryRun })

  console.log(
    [
      'Sanity seed starting',
      `  project: ${projectId}`,
      `  dataset: ${dataset}`,
      `  apiVersion: ${apiVersion}`,
      `  token: ${tokenSource ? `${tokenSource} (value hidden)` : 'none (dry-run)'}`,
      `  mode: ${flags.dryRun ? 'dry-run' : 'write'}`,
      `  images: ${flags.skipImages ? 'skipped' : 'upload/reuse from public/'}`,
      `  seeders: ${selected.map((s) => s.name).join(', ')}`,
    ].join('\n'),
  )

  const runOptions = {
    dryRun: flags.dryRun,
    skipImages: flags.skipImages,
  }

  /** @type {Array<{ _id: string, _type: string }>} */
  const allDocs = []

  for (const seeder of selected) {
    const result = await seeder.run(client, runOptions)
    const docs = result.documents || result.upserted || []
    allDocs.push(...docs)
    console.log(
      `\n[${result.name || seeder.name}] ${flags.dryRun ? 'Would upsert' : 'Upserted'} ${docs.length} document(s):`,
    )
    for (const doc of docs) {
      console.log(`  - ${doc._type}  ${doc._id}`)
    }
  }

  const counts = countByType(allDocs)
  console.log('\nSummary by type:')
  for (const [type, count] of Object.entries(counts).sort()) {
    console.log(`  ${type}: ${count}`)
  }
  console.log(`  total: ${allDocs.length}`)
  console.log('\nDone.')
}

main().catch((error) => {
  if (error?.code === 'MISSING_ENV') {
    console.error(error.message)
  } else {
    console.error('Seed failed:', error?.message || error)
  }
  process.exit(1)
})
