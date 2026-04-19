import { ProductClient } from './page.client';
import { client } from '@/sanity/lib/client';
import { PRODUCT_BY_KEY_QUERY } from '@/sanity/lib/queries';
import { getBlockContentHtml } from '@/helpers';

const fetchOptions = { next: { revalidate: 120 } };

export const revalidate = 120;

export default async function Page({ params }) {
  const { productId } = await params;
  const key = decodeURIComponent(productId);
  let product;
  try {
    product = await client.fetch(PRODUCT_BY_KEY_QUERY, { key }, fetchOptions);
  } catch (error) {
    console.error('Error fetching product:', error);
    product = null;
  }
  if (!product) {
    return <div>Product not found</div>;
  }
  const color = product?.color || '#cb1f2b';
  const ingredientsHtml = product?.ingredients?.length
    ? getBlockContentHtml(product.ingredients, color)
    : '';
  return <ProductClient product={product} ingredientsHtml={ingredientsHtml} />;
}
