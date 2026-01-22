import { client } from "@/sanity/lib/client";
import { BLOG_QUERY } from "@/sanity/lib/queries";
import { PromoCard } from "@/components";

export default async function BlogPage() {
  const result = await client.fetch(BLOG_QUERY, {}, { next: { revalidate: 120 } });

  return (
    <>
      <div className="container max-md:mx-5 my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-8 bg-[#fff9ef]">
      {result.map((blog) => (
        <PromoCard key={blog._id} title={blog.title} date={blog.date} image={blog.image} readMoreLink={`/blog/${blog.slug}`} />
      ))}
      </div>
    </>
  );
}