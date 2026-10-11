import Portfolio from '@/components/portfolio';
import { getSiteConfig } from '@/lib/site-config';

// The page is prerendered, then rebuilt in the background at most once a minute, so edits to the
// Global Config store show up within a minute or two without a deploy. The first visit after the
// minute is up may still get the old page while the new one is built.
export const revalidate = 60;

export default async function Page() {
  return <Portfolio config={await getSiteConfig()} />;
}
