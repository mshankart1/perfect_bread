import {
  AboutSection,
  ContactSection,
  EComPartnerSection,
  FooterSection,
  HeroSection,
  JourneySection,
  MapSection,
  PartnersSections,
  ProductSection,
  RecipeSection,
  TeamSection,
} from '@/components';
import { CardContainer } from '@/icons/CardContainer';
import Image from 'next/image';

export default async function Home() {
  // Server-side API call
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
    cache: 'force-cache', // or 'force-cache' for static generation
  });
  const result = await res.json();
  return (
    <div>
      {/* <CardContainer /> */}
      <Image
        src="/banner/banner_1.jpg"
        width={2000}
        height={2000}
        priority
        alt="hero image"
        className="w-full aspect-[1.86/1] object-cover"
      />
      <Image src="/banner_2.jpg" width={2000} height={2000} priority alt="hero image" className="w-full object-cover" />
      {/* <hr className="border-t-[30px] border-amber-500" /> */}
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
