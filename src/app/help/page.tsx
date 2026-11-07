import type { Metadata } from 'next';
import HelpPage from '@/components/help-page';
import { personalData } from '@/lib/data';
import { getSiteConfig } from '@/lib/site-config';

// shikharkumar.in/help. Refreshed like the homepage, because its header and footer use live values.
export const revalidate = 60;

export const metadata: Metadata = {
  title: `Short Links | ${personalData.name}`,
  description: `Short addresses for ${personalData.name}'s resume, profiles and portfolio sections.`,
  alternates: { canonical: '/help' },
  robots: { index: false },
};

export default async function Page() {
  return <HelpPage config={await getSiteConfig()} />;
}
