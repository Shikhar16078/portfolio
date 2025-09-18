import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
export const repo = '/portfolio';

const nextConfig: NextConfig = {
  basePath: isProd ? repo : '',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
