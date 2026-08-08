export const SITE_NAME = 'Perfect Bread';
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://perfectbread.com'
).replace(/\/$/, '');

export const DEFAULT_DESCRIPTION =
  "Discover Perfect Bread's fresh breads, buns, rusks, recipes, manufacturing network, and more.";

export function portableTextToPlainText(value) {
  if (typeof value === 'string') return value;
  if (!Array.isArray(value)) return '';

  return value
    .filter((block) => block?._type === 'block' && Array.isArray(block.children))
    .map((block) =>
      block.children
        .map((child) => (typeof child?.text === 'string' ? child.text : ''))
        .join(''),
    )
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function createDescription(value, fallback = DEFAULT_DESCRIPTION) {
  const text = portableTextToPlainText(value) || fallback;
  return text.length > 160 ? `${text.slice(0, 157).trimEnd()}...` : text;
}

export function createMetadata({ title, description, path = '/', image }) {
  const canonical = path.startsWith('/') ? path : `/${path}`;
  const images = image ? [{ url: image }] : [{ url: '/perfect-banner.jpg' }];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}
