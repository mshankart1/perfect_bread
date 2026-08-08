import { AppProvider } from '@/components/context/AppContext';
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo';
import localFont from 'next/font/local';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const lightmoon = localFont({
  src: [
    { path: '../fonts/Lightmoon.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/LightmoonItalic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-lightmoon',
  display: 'swap',
});

const impact = localFont({
  src: '../fonts/impact.ttf',
  variable: '--font-impact',
  display: 'swap',
});

const storyMilky = localFont({
  src: '../fonts/Story_Milky.ttf',
  variable: '--font-story-milky',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    'Perfect Bread',
    'bread',
    'bakery products',
    'buns',
    'rusks',
    'bread manufacturer India',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: '/perfect_logo.png',
    apple: '/perfect_logo.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: '/perfect-banner.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: ['/perfect-banner.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lightmoon.variable} ${impact.variable} ${storyMilky.variable}`}
    >
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}