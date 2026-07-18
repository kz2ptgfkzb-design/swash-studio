/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
  async redirects() {
    // The fictional case-study portfolio was removed; live builds live at /preview.
    return [
      { source: '/work', destination: '/preview', permanent: true },
      { source: '/work/:slug*', destination: '/preview', permanent: true },
    ];
  },
};

module.exports = nextConfig;
