import {
  AboutSection,
  ContactSection,
  EComPartnerSection,
  FooterSection,
  JourneySection,
  MapSection,
  PartnersSections,
  ProductSection,
  RecipeSection,
  TeamSection,
} from '@/components';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { PRODUCT_QUERY } from '@/sanity/lib/queries';

export default async function Home() {
  let result = [];
  try {
    result = await client.fetch(PRODUCT_QUERY);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  return (
    <div>
      <Image
        src="/banner/banner_1.jpg"
        width={2000}
        height={2000}
        priority
        alt="hero image"
        className="w-full aspect-[1.86/1] object-cover"
      />
      <Image src="/banner_2.jpg" width={2000} height={2000} priority alt="hero image" className="w-full object-cover" />
      <AboutSection />
      <hr className="border-t-[30px] border-amber-500" />
      <JourneySection />
      <hr className="border-t-[30px] border-amber-500" />
      <TeamSection />
      <hr className="border-t-[30px] border-red-600" />
      <ProductSection products={result} />
      <hr className="border-t-[30px] border-amber-500" />
      <MapSection />
      <PartnersSections />
      <EComPartnerSection />
      <hr className="border-t-[30px] border-amber-500" />
      <RecipeSection />
      <hr className="border-t-[30px] border-amber-500" />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
