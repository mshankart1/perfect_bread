import { ProductClient } from './page.client';
import { headers } from 'next/headers';

async function getProduct(productId) {
  try {
    const headersList = await headers();
    const host = headersList.get('host');
    const protocol = 'http';
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/products/${productId}`, {
      next: { revalidate: 120 },
    });

    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function Page({ params }) {
  const { productId } = await params;
  const product = await getProduct(decodeURIComponent(productId));
  if (!product) {
    return <div>Product not found</div>;
  }
  return <ProductClient product={product} />;
}
