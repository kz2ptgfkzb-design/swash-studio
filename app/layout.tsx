import type { Metadata } from 'next';
import { Inter_Tight, Bricolage_Grotesque, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CursorTrail } from '@/components/CursorTrail';
import { Preloader } from '@/components/Preloader';

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const editorial = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-editorial',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Swash — websites for every business',
  description:
    'A boutique studio that builds websites, brands, and the motion that ties them together. HVAC to luxury DTC. Tell us the brief — we deliver.',
  metadataBase: new URL('https://swash.studio'),
  openGraph: {
    title: 'Swash — websites for every business',
    description:
      'A boutique studio that builds websites, brands, and the motion that ties them together. HVAC to luxury DTC. Tell us the brief — we deliver.',
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
      className={`${sans.variable} ${display.variable} ${mono.variable} ${editorial.variable}`}
    >
      <body className="bg-paper-100 text-ink-700 antialiased">
        <SmoothScroll />
        <CursorTrail />
        <Preloader />
        <NavBar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
