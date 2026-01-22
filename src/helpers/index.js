import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { toHTML } from '@portabletext/to-html';

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

/*
  Do you need to assign "break" in contentType?
  - If your Sanity blockContent schema includes line breaks (soft/hard break),
    and you want to control how <br /> appears in your HTML, you can define it here.
  - By default, Portable Text serializes soft breaks to <br />. 
  - If your schema does NOT include a "break" (type: 'break' or similar) in "of", you don't need to.
  - If you don't handle it here, the default renderer will be used.
*/

export function getBlockContentHtml(content, color) {
  return toHTML(content, {
    components: {
      block: {
        h1: ({ children }) => `<h1 style="font-size: 2.25rem;">${children}</h1>`,
        h2: ({ children }) => `<h2 style="font-size: 1.875rem;">${children}</h2>`,
        h3: ({ children }) => `<h3 style="font-size: 1.5rem;">${children}</h3>`,
        h4: ({ children }) => `<h4 style="font-size: 1.25rem;">${children}</h4>`,
        h5: ({ children }) => `<h5 style="font-size: 1.125rem;">${children}</h5>`,
        h6: ({ children }) => `<h6 style="font-size: 1rem;">${children}</h6>`,
        normal: ({ children }) => `<p style="font-size: 1rem;">${children}</p>`,
        // By default, soft breaks (from shift+enter in block text) are rendered as <br /> by @portabletext/to-html.
        // However, the `block` mapping here does not let you override the rendering of soft breaks.
        // If you want to force <br /> rendering or custom HTML for line breaks, you need to use a custom serializer,
        // but @portabletext/to-html (as of v2) doesn't give direct control.
        // If <br /> is not appearing, check your Portable Text content. Soft breaks are only inserted if users entered them (shift+enter) in Sanity Studio.
        // There's NOT a 'break' block type by default; line breaks are just `\n` inside a block's children and should be auto-rendered.
      },
      marks: {
        strong: ({ children }) => `<strong style="font-weight: 600;">${children}</strong>`,
        highlight: ({ children }) =>
          `<div style="background-color: ${color}; color: white; padding: 10px 15px; border-radius: 5px;">${children}</div>`,
      },
      types: {
        image: ({ value }) => {
          const alt = value.alt || '';
          const url = urlFor(value).url();
          return `<img src="${url}" alt="${alt}" style="width:100%;height:auto;border-radius:0.5rem;" loading="lazy" />`;
        },
        break: () => `<br />`,
      }
    },
  });
}