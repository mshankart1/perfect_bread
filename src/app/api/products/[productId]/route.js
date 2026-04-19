import { client } from '@/sanity/lib/client';
import { PRODUCT_BY_KEY_QUERY } from '@/sanity/lib/queries';

const fetchOptions = { next: { revalidate: 120 } };

export async function GET(request, { params }) {
  try {
    const { productId } = await params;
    const key = decodeURIComponent(String(productId));
    const product = await client.fetch(PRODUCT_BY_KEY_QUERY, { key }, fetchOptions);

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
