import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you requested could not be found.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-[#fff9ef] px-4 py-24 text-center">
      <h1 className="text-5xl font-bold text-neutral-800">Page Not Found</h1>
      <p className="mt-4 text-lg text-neutral-600">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white"
      >
        Return Home
      </Link>
    </main>
  );
}
