import { ProductClient } from './page.client';

async function getProduct(productId) {
  try {
    const baseUrl = typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin;
    const res = await fetch(`${baseUrl}/api/products/${productId}`, {
      cache: 'no-store',
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
  const product = await getProduct(productId);
  if (!product) {
    return <div>Product not found</div>;
  }
  return <ProductClient product={product} />;
}
