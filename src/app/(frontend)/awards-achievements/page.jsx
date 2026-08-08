import { client } from "@/sanity/lib/client";
import { AWARD_QUERY } from "@/sanity/lib/queries";
import { PromoCard, ComingSoon } from "@/components";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: 'Awards & Achievements',
  description:
    "Explore Perfect Bread's awards, certifications, and milestones earned through years of baking excellence.",
  path: '/awards-achievements',
});

export default async function AwardsPage() {
  const result = await client.fetch(AWARD_QUERY, {}, { next: { revalidate: 120 } });

  return (
    <div className="bg-[#fff9ef] min-h-screen">
      <div className="container py-16 px-4 mx-auto">
        <h1 className="text-5xl max-md:text-4xl font-bold text-neutral-800 text-center mb-8 font-archivo">AWARDS & ACHIEVEMENTS</h1>
        {result?.length > 0 ? (
          <div className="flex flex-col gap-8 max-w-5xl mx-auto">
            {result.map((award) => (
              <div key={award._id} className="group relative">
                <PromoCard
                  title={award.title}
                  date={award.date}
                  image={award.image}
                  description={award.description}
                  organization={award.organization}
                  className="border-none pr-0"
                />
              </div>
            ))}
          </div>
        ) : (
          <ComingSoon message="Our trophy cabinet is being polished. Check back soon for our latest milestones." />
        )}
      </div>
    </div>
  );
}
