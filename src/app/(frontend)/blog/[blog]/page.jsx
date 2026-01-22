import { client } from "@/sanity/lib/client";
import { BlogClient } from "./page.client";
import { BLOG_BY_SLUG_QUERY } from "@/sanity/lib/queries";

export default async function BlogPage({ params }) {
    const { blog } = await params;
    const blogData = await client.fetch(BLOG_BY_SLUG_QUERY, { slug: blog }, { next: { revalidate: 120 } });
    return <BlogClient blog={blogData} />;
}