import type { MetadataRoute } from 'next';

const SITE = 'https://swash.studio';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep API routes and the post-submit thank-you page out of the index.
      disallow: ['/api/', '/brief/thanks'],
    },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
