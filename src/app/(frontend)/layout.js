import { Header } from '@/components';
import { SanityLive } from '@/sanity/lib/live';
import Head from 'next/head';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <SanityLive />
    </>
  );
}
