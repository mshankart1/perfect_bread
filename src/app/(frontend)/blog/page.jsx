import { client } from "@/sanity/lib/client";
import { BLOG_QUERY } from "@/sanity/lib/queries";
import { PromoCard, ComingSoon } from "@/components";

export default async function BlogPage() {
  const result = await client.fetch(BLOG_QUERY, {}, { next: { revalidate: 120 } });

  return (
    <div className="bg-[#fff9ef]">
      <div className="container py-16 px-4">
        <h2 className="text-4xl font-bold text-neutral-800 text-center mb-8 underline underline-offset-8">BLOGS</h2>

        {result?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [&>*]:px-4 gap-y-8">
            {result.map((blog) => (
              <PromoCard key={blog._id} title={blog.title} date={blog.date} image={blog.image} readMoreLink={`/blog/${blog.slug}`} />
            ))}
          </div>
        ) : (
          <ComingSoon message="We're baking up some fresh stories for you." />
        )}
      </div>
    </div>
  );
}