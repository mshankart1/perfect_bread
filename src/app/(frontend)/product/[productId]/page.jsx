import { ProductClient } from './page.client';
import { client } from '@/sanity/lib/client';
import { PRODUCT_BY_KEY_QUERY } from '@/sanity/lib/queries';
import { getBlockContentHtml } from '@/helpers';
import { createDescription, createMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const fetchOptions = { next: { revalidate: 120 } };
const getProduct = cache((key) =>
  client.fetch(PRODUCT_BY_KEY_QUERY, { key }, fetchOptions),
);

export const revalidate = 120;

export async function generateMetadata({ params }) {
  const { productId } = await params;
  const key = decodeURIComponent(productId);
  const product = await getProduct(key);

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: { index: false, follow: false },
    };
  }

  return createMetadata({
    title: product.title || product.heading,
    description: createDescription(product.subtitle || product.description),
    path: `/product/${encodeURIComponent(product.slug || key)}`,
    image: product.images?.[0]?.asset?.url,
  });
}

export default async function Page({ params }) {
  const { productId } = await params;
  const key = decodeURIComponent(productId);
  let product;
  try {
    product = await getProduct(key);
  } catch (error) {
    console.error('Error fetching product:', error);
    product = null;
  }
  if (!product) {
    notFound();
  }
  const color = product?.color || '#cb1f2b';
  const ingredientsHtml = product?.ingredients?.length
    ? getBlockContentHtml(product.ingredients, color)
    : '';
  return <ProductClient product={product} ingredientsHtml={ingredientsHtml} />;
}
