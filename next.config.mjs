/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const repo = '/portfolio';

const nextConfig = {
  output: 'export',
  basePath: isProd ? repo : '',
  assetPrefix: isProd ? `${repo}/` : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
