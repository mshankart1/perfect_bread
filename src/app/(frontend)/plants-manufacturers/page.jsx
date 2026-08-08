import Image from 'next/image';
import { PlantsManufacturersPage } from '@/components/PlantsManufacturersPage';
import { createMetadata } from '@/lib/seo';
import { client } from '@/sanity/lib/client';
import { PLANTS_MANUFACTURERS_PAGE_QUERY } from '@/sanity/lib/queries';

export const metadata = createMetadata({
  title: 'Plants & Manufacturers',
  description:
    'Find Perfect Bread manufacturing units across India, including addresses, FSSAI details, and directions to our production centres.',
  path: '/plants-manufacturers',
});

const PAGE_FALLBACKS = {
  eyebrow: 'Manufacturing Units',
  title: 'Plant & Manufacturing Addresses',
  intro: '',
  features: [
    {
      _key: 'manufacturing-network',
      label: 'Manufacturing Network',
      icon: 'manufacturing-network',
    },
    { _key: 'plant-locator', label: 'Plant Locator', icon: 'plant-locator' },
    {
      _key: 'quality-information',
      label: 'Quality Information',
      icon: 'quality-information',
    },
    { _key: 'fresh-dispatch', label: 'Fresh Dispatch', icon: 'fresh-dispatch' },
  ],
  searchPlaceholder: 'Search city, state or company',
  allStatesLabel: 'All States',
  allUnitsLabel: 'All Unit Status',
  notice:
    'For manufacturing unit address and FSSAI Lic. No., please verify the latest details with the unit or on the FSSAI portal.',
  emptyState: 'No manufacturing units match your filters.',
  directionsLabel: 'Get Directions',
};

function PlantsManufacturersBanner() {
  return (
    <header className="relative w-full overflow-hidden">
      <h1 className="sr-only">Plants &amp; Manufacturers</h1>
      <Image
        src="/plant_banner.jpeg"
        alt="Perfect Bread plants and manufacturers — freshness across India"
        width={1920}
        height={950}
        priority
        sizes="100vw"
        className="block h-auto w-full object-cover object-center"
      />
    </header>
  );
}

export default async function PlantsManufacturersRoute() {
  let data = null;

  try {
    data = await client.fetch(
      PLANTS_MANUFACTURERS_PAGE_QUERY,
      {},
      { next: { revalidate: 120 } },
    );
  } catch (error) {
    console.error('Error fetching plants and manufacturers:', error);
  }

  const configuredPage = Object.fromEntries(
    Object.entries(data?.page || {}).filter(([, value]) => value != null),
  );
  const page = { ...PAGE_FALLBACKS, ...configuredPage };
  const plants = Array.isArray(data?.plants) ? data.plants : [];

  return (
    <div className="overflow-x-hidden">
      <PlantsManufacturersBanner />
      <PlantsManufacturersPage page={page} plants={plants} />
    </div>
  );
}
