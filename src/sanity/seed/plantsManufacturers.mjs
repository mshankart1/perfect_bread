/**
 * Seed payloads for Plants & Manufacturers CMS content.
 * Document ids are stable so re-runs upsert via createOrReplace.
 */

import { upsertDocuments } from './helpers.mjs'

const DEFAULT_CERTIFICATION = 'AN ISO 9001:2015 & HACCP CERTIFIED COMPANY'

/** @typedef {{ _id: string, unitLabel: string, companyName: string, state: string, productionCenter?: string, address: string, certification?: string, licenseText?: string, mapUrl?: string, displayOrder?: number, active?: boolean }} PlantSeed */

/** @type {PlantSeed[]} */
const PLANT_LOCATIONS = [
  {
    _id: 'plantLocation.unit-01-thane',
    unitLabel: 'Unit 01',
    companyName: 'Perfect Bread Foods Pvt. Ltd.',
    state: 'Maharashtra',
    productionCenter: 'Thane Production Centre',
    address:
      'Plot No. A-14, MIDC Industrial Area, Wagle Estate, Thane West, Maharashtra 400604',
    certification: DEFAULT_CERTIFICATION,
    licenseText: 'FSSAI Lic. No. 10015022000123',
    mapUrl: 'https://maps.google.com/?q=Thane+MIDC+Wagle+Estate',
    displayOrder: 10,
    active: true,
  },
  {
    _id: 'plantLocation.unit-02-pune',
    unitLabel: 'Unit 02',
    companyName: 'Perfect Bread Foods Pvt. Ltd.',
    state: 'Maharashtra',
    productionCenter: 'Pune Production Centre',
    address:
      'Gat No. 312, Chakan Industrial Area, Phase II, Pune, Maharashtra 410501',
    certification: DEFAULT_CERTIFICATION,
    licenseText: 'FSSAI Lic. No. 10015022000456',
    mapUrl: 'https://maps.google.com/?q=Chakan+Industrial+Area+Pune',
    displayOrder: 20,
    active: true,
  },
  {
    _id: 'plantLocation.unit-03-ahmedabad',
    unitLabel: 'Unit 03',
    companyName: 'Perfect Bread Gujarat Unit',
    state: 'Gujarat',
    productionCenter: 'Ahmedabad Production Centre',
    address:
      'Survey No. 48, Changodar Industrial Estate, Sarkhej-Bavla Highway, Ahmedabad, Gujarat 382213',
    certification: DEFAULT_CERTIFICATION,
    licenseText: 'FSSAI Lic. No. 10021011000789',
    mapUrl: 'https://maps.google.com/?q=Changodar+Industrial+Estate+Ahmedabad',
    displayOrder: 30,
    active: true,
  },
  {
    _id: 'plantLocation.unit-04-bengaluru',
    unitLabel: 'Unit 04',
    companyName: 'Perfect Bread South India Pvt. Ltd.',
    state: 'Karnataka',
    productionCenter: 'Bengaluru Production Centre',
    address:
      'No. 27, KIADB Industrial Area, Bommasandra, Bengaluru, Karnataka 560099',
    certification: DEFAULT_CERTIFICATION,
    licenseText: 'FSSAI Lic. No. 10012031000147',
    mapUrl: 'https://maps.google.com/?q=Bommasandra+Industrial+Area+Bengaluru',
    displayOrder: 40,
    active: true,
  },
  {
    _id: 'plantLocation.unit-05-chennai',
    unitLabel: 'Unit 05',
    companyName: 'Perfect Bread South India Pvt. Ltd.',
    state: 'Tamil Nadu',
    productionCenter: 'Chennai Production Centre',
    address:
      'Plot B-9, SIPCOT Industrial Park, Irungattukottai, Sriperumbudur, Tamil Nadu 602117',
    certification: DEFAULT_CERTIFICATION,
    licenseText: 'FSSAI Lic. No. 10013042000358',
    mapUrl: 'https://maps.google.com/?q=SIPCOT+Irungattukottai+Sriperumbudur',
    displayOrder: 50,
    active: true,
  },
  {
    _id: 'plantLocation.unit-06-gurugram',
    unitLabel: 'Unit 06',
    companyName: 'Perfect Bread North India Pvt. Ltd.',
    state: 'Haryana',
    productionCenter: 'Gurugram Production Centre',
    address:
      'Plot 18, Sector 37, Pace Industrial Area, Gurugram, Haryana 122001',
    certification: DEFAULT_CERTIFICATION,
    licenseText: 'FSSAI Lic. No. 10016051000624',
    mapUrl: 'https://maps.google.com/?q=Sector+37+Pace+City+Gurugram',
    displayOrder: 60,
    active: true,
  },
  {
    _id: 'plantLocation.unit-07-jaipur',
    unitLabel: 'Unit 07',
    companyName: 'Perfect Bread North India Pvt. Ltd.',
    state: 'Rajasthan',
    productionCenter: 'Jaipur Production Centre',
    address:
      'SP-2, RIICO Industrial Area, Sitapura, Jaipur, Rajasthan 302022',
    certification: DEFAULT_CERTIFICATION,
    licenseText: 'FSSAI Lic. No. 10017061000891',
    mapUrl: 'https://maps.google.com/?q=RIICO+Sitapura+Jaipur',
    displayOrder: 70,
    active: true,
  },
  {
    _id: 'plantLocation.unit-08-howrah',
    unitLabel: 'Unit 08',
    companyName: 'Perfect Bread East India Pvt. Ltd.',
    state: 'West Bengal',
    productionCenter: 'Howrah Production Centre',
    address:
      'JL No. 12, Domjur Industrial Estate, Howrah, West Bengal 711405',
    certification: DEFAULT_CERTIFICATION,
    licenseText: 'FSSAI Lic. No. 10019072000215',
    mapUrl: 'https://maps.google.com/?q=Domjur+Industrial+Estate+Howrah',
    displayOrder: 80,
    active: true,
  },
]

function buildPageDocument() {
  return {
    _id: 'plantsManufacturersPage',
    _type: 'plantsManufacturersPage',
    eyebrow: 'Manufacturing Units',
    title: 'Plant & Manufacturing Addresses',
    intro:
      'Locate Perfect Bread manufacturing units across India. Filter by state or unit code to find addresses, certifications, and FSSAI licence details.',
    features: [
      {
        _key: 'manufacturing-network',
        _type: 'object',
        label: 'Manufacturing Network',
        icon: 'manufacturing-network',
      },
      {
        _key: 'plant-locator',
        _type: 'object',
        label: 'Plant Locator',
        icon: 'plant-locator',
      },
      {
        _key: 'quality-information',
        _type: 'object',
        label: 'Quality Information',
        icon: 'quality-information',
      },
      {
        _key: 'fresh-dispatch',
        _type: 'object',
        label: 'Fresh Dispatch',
        icon: 'fresh-dispatch',
      },
    ],
    searchPlaceholder: 'Search city, state or company',
    allStatesLabel: 'All States',
    allUnitsLabel: 'All Unit Status',
    notice:
      'For manufacturing unit address and FSSAI Lic. No., please verify the latest details with the unit or on the FSSAI portal.',
    emptyState: 'No manufacturing units match your filters.',
    directionsLabel: 'Get Directions',
  }
}

function buildPlantDocument(plant) {
  return {
    _id: plant._id,
    _type: 'plantLocation',
    unitLabel: plant.unitLabel,
    companyName: plant.companyName,
    state: plant.state,
    productionCenter: plant.productionCenter,
    address: plant.address,
    certification: plant.certification || DEFAULT_CERTIFICATION,
    licenseText: plant.licenseText,
    mapUrl: plant.mapUrl,
    displayOrder: plant.displayOrder ?? 0,
    active: plant.active !== false,
  }
}

/**
 * Upsert Plants & Manufacturers page singleton + plantLocation docs.
 * @param {import('@sanity/client').SanityClient} client
 * @param {{ dryRun?: boolean }} [options]
 */
export async function seedPlantsManufacturers(client, { dryRun = false } = {}) {
  const documents = [
    buildPageDocument(),
    ...PLANT_LOCATIONS.map(buildPlantDocument),
  ]

  return upsertDocuments(client, documents, {
    dryRun,
    name: 'plants-manufacturers',
  })
}

export const plantsManufacturersSeeder = {
  name: 'plants-manufacturers',
  description:
    'Singleton plantsManufacturersPage + plantLocation manufacturing units',
  run: seedPlantsManufacturers,
}
