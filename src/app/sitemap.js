import { SITE_URL } from '@/lib/seo';
import { client } from '@/sanity/lib/client';
import { SEO_ROUTES_QUERY } from '@/sanity/lib/queries';

export const revalidate = 120;

const staticRoutes = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/awards-achievements', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/plants-manufacturers', changeFrequency: 'monthly', priority: 0.8 },
];

export default async function sitemap() {
  const lastModified = new Date();
  let routes = { products: [], blogs: [] };

  try {
    routes = await client.fetch(
      SEO_ROUTES_QUERY,
      {},
      { next: { revalidate: 120 } },
    );
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return [
    ...staticRoutes.map(({ path, ...route }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      ...route,
    })),
    ...(routes?.products || []).map((product) => ({
      url: `${SITE_URL}/product/${encodeURIComponent(product.slug)}`,
      lastModified: new Date(product._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    ...(routes?.blogs || []).map((blog) => ({
      url: `${SITE_URL}/blog/${encodeURIComponent(blog.slug)}`,
      lastModified: new Date(blog._updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
