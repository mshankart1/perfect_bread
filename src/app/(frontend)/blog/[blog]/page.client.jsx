import { getBlockContentHtml, urlFor } from "@/helpers";
import Image from "next/image";

export function BlogClient({ blog }) {
    return <div className="container max-lg:px-4 py-16"  style={{color: blog.color}}>
        <div>
            <h1 className="text-5xl max-md:text-4xl font-bold whitespace-pre-line text-center mb-8">{blog.title}</h1>
            <div className="text-right">{new Date(blog.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
            <Image src={urlFor(blog.image).url()} alt={blog.image.alt} width={1000} height={1000} className="w-full h-auto mb-8 rounded-lg"/>
            <div dangerouslySetInnerHTML={{ __html: getBlockContentHtml(blog.description, '#cb1f2b') }} className="flex flex-col gap-4" />
        </div>
</div>;
}
