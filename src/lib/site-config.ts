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
  email?: string; // "Email Me" button in the Contact section
  linkedin?: string; // LinkedIn icon in the hero and footer, "Message Me" button in Contact (https only)
  github?: string; // GitHub icon in the hero and footer (https only)
  recommendations?: Recommendation[]; // Recommendations carousel, in `id` order
};

// `profile` ("View Profile" button) and `photo` are https only. An optional field that's missing just
// isn't shown.
export type Recommendation = { author: string; quote: string; title?: string; profile?: string; photo?: string };

const TEXT_KEYS = ['status', 'location', 'resume', 'email', 'linkedin', 'github'] as const satisfies readonly (keyof SiteConfig)[];

const isEmail = (value: string) => /^[^\s@?&]+@[^\s@?&]+$/.test(value);

// Links that aren't https URLs are ignored rather than rendered.
const isHttpsUrl = (value: string) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;

const readHttpsUrl = (value: unknown) => {
  const url = typeof value === 'string' ? value.trim() : '';
  return isHttpsUrl(url) ? url : undefined;
};

const readText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

// The `recommendations` list sorted by `id` (entries without one go last). An entry needs at least
// an author and a quote; anything else is dropped.
function readRecommendations(value: unknown): Recommendation[] {
  if (!Array.isArray(value)) return [];
  const order = (entry: Record<string, unknown>) => (typeof entry.id === 'number' ? entry.id : Number.MAX_VALUE);
  return value
    .filter(isObject)
    .filter((entry) => readText(entry.author) && readText(entry.quote))
    .sort((a, b) => order(a) - order(b))
    .map((entry) => ({
      author: readText(entry.author),
      quote: readText(entry.quote),
      title: readText(entry.title) || undefined,
      profile: readHttpsUrl(entry.profile),
      photo: readHttpsUrl(entry.photo),
    }));
}

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!process.env.GLOBAL_CONFIG) return {};
  try {
    // force-cache lets the page stay static; it's refreshed on the page's revalidate interval.
    const store = createClient(process.env.GLOBAL_CONFIG, { cache: 'force-cache' });
    const items = await store.getAll<Record<string, unknown>>([...TEXT_KEYS, 'recommendations']);
    const config: SiteConfig = { recommendations: readRecommendations(items.recommendations) };
    for (const key of TEXT_KEYS) {
      const value = readText(items[key]);
      if (value) config[key] = value;
    }
    if (config.resume && !isHttpsUrl(config.resume)) delete config.resume;
    if (config.linkedin && !isHttpsUrl(config.linkedin)) delete config.linkedin;
    if (config.github && !isHttpsUrl(config.github)) delete config.github;
    if (config.email && !isEmail(config.email)) delete config.email;
    return config;
  } catch (error) {
    console.error('Global Config could not be read; its items are hidden', error);
    return {};
  }
}
