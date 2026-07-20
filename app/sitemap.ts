import type { MetadataRoute } from 'next';
import { POSTS } from '@/data/journal';

const SITE = 'https://swash.studio';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/services',
    '/process',
    '/preview',
    '/reviews',
    '/faq',
    '/about',
    '/journal',
    '/brief',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const journalRoutes = POSTS.map((post) => ({
    url: `${SITE}/journal/${post.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...journalRoutes];
}
