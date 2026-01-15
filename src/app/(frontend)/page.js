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
import { BANNER_QUERY, PRODUCT_QUERY, RECIPE_QUERY, TIMELINE_QUERY } from '@/sanity/lib/queries';
import { Banner } from '@/components/Banner';

export default async function Home() {
  let result = [];
  let recipes = [];
  let banners = [];
  let timeline = [];
  try {
    result = await client.fetch(PRODUCT_QUERY);
    recipes = await client.fetch(RECIPE_QUERY);
    banners = await client.fetch(BANNER_QUERY);
    timeline = await client.fetch(TIMELINE_QUERY);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  return (
    <div className="overflow-y-hidden w-full">
      <Banner banners={banners?.[0]?.images || []} />
      {/* <Image src="/banner_2.jpg" width={2000} height={2000} priority alt="hero image" className="w-full object-cover" /> */}
      <AboutSection />
      <hr className="border-t-[30px] lg:border-t-[50px] border-amber-500" />
      <JourneySection timeline={timeline} />
      <hr className="border-t-[30px] lg:border-t-[50px] border-amber-500" />
      <TeamSection />
      <hr className="border-t-[30px] lg:border-t-[50px] border-primary" />
      <ProductSection products={result} />
      <hr className="border-t-[30px] lg:border-t-[50px] border-amber-500" />
      <MapSection />
      <hr className="border-t-[30px] lg:border-t-[50px] border-primary" />
      <PartnersSections />
      <hr className="border-t-[30px] lg:border-t-[50px] border-primary" />
      <EComPartnerSection />
      <hr className="border-t-[30px] lg:border-t-[50px] border-amber-500" />
      <RecipeSection recipes={recipes} />
      <hr className="border-t-[30px] lg:border-t-[50px] border-amber-500" />
      <ContactSection />
    </div>
  );
}
