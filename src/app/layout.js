import { AppProvider } from '@/components/context/AppContext';
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