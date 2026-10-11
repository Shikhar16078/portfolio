import type { MetadataRoute } from 'next';
import { personalData } from '@/lib/data';

// Served as /robots.txt: lets every crawler index the whole site and points them to the sitemap.
// Vercel preview deployments add their own noindex header, so only the production domain is indexed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${personalData.siteUrl}/sitemap.xml`,
  };
}
