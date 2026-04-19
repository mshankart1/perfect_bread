import { FooterSection, Header } from '@/components';
import { SanityLive } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import { PRODUCT_QUERY } from '@/sanity/lib/queries';

export default async function RootLayout({ children }) {
  const products = await client.fetch(PRODUCT_QUERY, {}, { next: { revalidate: 120 } });
  return (
    <>
      <Header products={products} />
      {children}
      <SanityLive />
      <FooterSection />
    </>
  );
}
