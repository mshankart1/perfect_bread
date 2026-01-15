import { client } from '@/sanity/lib/client';
import { SINGLE_PRODUCT_QUERY, PRODUCT_BY_SLUG_QUERY } from '@/sanity/lib/queries';

export async function GET(request, { params }) {
  try {
    const { productId } = await params;

    let product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug: productId });

    if (!product) {
      product = await client.fetch(SINGLE_PRODUCT_QUERY, { id: productId });
    }

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
