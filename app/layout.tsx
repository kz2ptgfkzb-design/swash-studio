import type { Metadata } from 'next';
import { Inter_Tight, Bricolage_Grotesque, JetBrains_Mono, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';
import { CursorTrail } from '@/components/CursorTrail';
import { CursorLabel } from '@/components/CursorLabel';
import { Preloader } from '@/components/Preloader';
import { AmbientFluid } from '@/components/AmbientFluid';

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

const DESCRIPTION =
  'A boutique studio that builds websites, brands, and the motion that ties them together. Tell us the brief and get a working video demo of your site within 48 hours.';

export const metadata: Metadata = {
  metadataBase: new URL('https://swash.studio'),
  title: {
    default: 'Swash - websites, brands, and motion',
    template: '%s · Swash',
  },
  description: DESCRIPTION,
  applicationName: 'Swash Studio',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Swash - websites, brands, and motion',
    description: DESCRIPTION,
    url: '/',
    siteName: 'Swash Studio',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swash - websites, brands, and motion',
    description: DESCRIPTION,
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
        <AmbientFluid />
        <CursorTrail />
        <CursorLabel />
        <Preloader />
        <NavBar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
