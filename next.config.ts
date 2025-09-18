import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';
const repo = '/portfolio'; // your repo name with a leading slash

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? repo : '',
  assetPrefix: isProd ? `${repo}/` : undefined, // <-- add this
  images: {
    unoptimized: true,
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
