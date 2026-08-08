import { client } from "@/sanity/lib/client";
import { BlogClient } from "./page.client";
import { BLOG_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { createDescription, createMetadata } from "@/lib/seo";
import { urlFor } from "@/helpers";
import { notFound } from "next/navigation";
import { cache } from "react";

const getBlog = cache((slug) =>
    client.fetch(BLOG_BY_SLUG_QUERY, { slug }, { next: { revalidate: 120 } }),
);

export async function generateMetadata({ params }) {
    const { blog: slug } = await params;
    const blog = await getBlog(slug);

    if (!blog) {
        return {
            title: 'Blog Not Found',
            robots: { index: false, follow: false },
        };
    }

    const image = blog.image ? urlFor(blog.image).width(1200).height(630).url() : undefined;

    return createMetadata({
        title: blog.title,
        description: createDescription(blog.description),
        path: `/blog/${encodeURIComponent(slug)}`,
        image,
    });
}

export default async function BlogPage({ params }) {
    const { blog } = await params;
    const blogData = await getBlog(blog);
    if (!blogData) notFound();

    return <div className="bg-[#fff9ef]"><BlogClient blog={blogData} /></div>;
}