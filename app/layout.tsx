import type { Metadata } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SmoothScroll } from '@/components/SmoothScroll';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aurora Editions — Winter 26',
  description:
    'A seasonal showcase of every new release, refinement, and breakthrough — bundled into one drop.',
  metadataBase: new URL('https://aurora-editions.example.com'),
  openGraph: {
    title: 'Aurora Editions — Winter 26',
    description:
      'A seasonal showcase of every new release, refinement, and breakthrough — bundled into one drop.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="bg-ink-950 text-bone-100 antialiased">
        <SmoothScroll />
        <ScrollProgress />
        <NavBar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
