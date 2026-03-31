import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'
import { toHTML } from '@portabletext/to-html';

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

function sanitizeHex(hex) {
  if (typeof hex !== 'string') return ''
  const t = hex.trim()
  if (/^#[0-9A-Fa-f]{3}$/.test(t) || /^#[0-9A-Fa-f]{6}$/.test(t)) return t
  return ''
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
      },
      list: {
        bullet: ({ children }) =>
          `<ul style="list-style-type: disc; padding-left: 1.5rem; margin: 0.75rem 0; text-align: left;">${children}</ul>`,
        number: ({ children }) =>
          `<ol style="list-style-type: decimal; padding-left: 1.5rem; margin: 0.75rem 0; text-align: left;">${children}</ol>`,
      },
      listItem: {
        bullet: ({ children }) => `<li style="margin: 0.25rem 0;">${children}</li>`,
        number: ({ children }) => `<li style="margin: 0.25rem 0;">${children}</li>`,
      },
      marks: {
        strong: ({ children }) => `<strong style="font-weight: 600;">${children}</strong>`,
        highlight: ({ children }) =>
          `<div style="background-color: ${color}; color: white; padding: 10px 15px; border-radius: 5px;">${children}</div>`,
        textColor: ({ children, value }) => {
          const hex = sanitizeHex(value?.hex)
          if (!hex) return children
          return `<span style="color: ${hex}">${children}</span>`
        },
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