import { client } from '@/sanity/lib/client';
import { PRODUCT_QUERY } from '@/sanity/lib/queries';

export async function GET() {
  try {
    const data = await client.fetch(PRODUCT_QUERY);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch timeline data' }), { status: 500 });
  }
}
