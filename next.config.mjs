/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const repo = '/portfolio'; // your repo name with a leading slash

const nextConfig = {
  output: 'export',
  basePath: isProd ? repo : '',
  assetPrefix: isProd ? `${repo}/` : undefined, // <-- add this
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
};

export default nextConfig;
