import type { MetadataRoute } from 'next';
import { personalData } from '@/lib/data';

// Served as /sitemap.xml. The portfolio is a single page; lastModified is the build time.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: personalData.siteUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
