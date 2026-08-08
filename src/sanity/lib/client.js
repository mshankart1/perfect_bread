import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN caches reads at the edge; ISR/revalidate on fetch still controls freshness in Next.
  useCdn: process.env.NODE_ENV === 'production',
})
