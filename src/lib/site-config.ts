import 'server-only';
import { createClient } from '@vercel/global-config';

// Values that live only in the Vercel Global Config store connected to the project (the GLOBAL_CONFIG
// connection string), so they can change without a deploy. They're read when the page is built and
// on each refresh (see `revalidate` in src/app/page.tsx).
// Each one is optional: if its key is missing or empty, or the store can't be reached, whatever it
// feeds is not rendered at all. There is deliberately no fallback in data.ts.
export type SiteConfig = {
  status?: string; // "Open to work" dot on the hero photo
  location?: string; // map pin line under the hero title
  resume?: string; // Resume buttons in the hero and the Summary dialog (https only)
};

const KEYS = ['status', 'location', 'resume'] as const satisfies readonly (keyof SiteConfig)[];

// Only the resume key is a link; anything other than an https URL is ignored rather than rendered.
const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!process.env.GLOBAL_CONFIG) return {};
  try {
    // force-cache lets the page stay static; it's refreshed on the page's revalidate interval.
    const store = createClient(process.env.GLOBAL_CONFIG, { cache: 'force-cache' });
    const items = await store.getAll<Record<string, unknown>>([...KEYS]);
    const config: SiteConfig = {};
    for (const key of KEYS) {
      const value = typeof items[key] === 'string' ? items[key].trim() : '';
      if (value) config[key] = value;
    }
    if (config.resume && !isHttpsUrl(config.resume)) delete config.resume;
    return config;
  } catch (error) {
    console.error('Global Config could not be read; its items are hidden', error);
    return {};
  }
}
