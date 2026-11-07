import { notFound, redirect } from 'next/navigation';
import { getSiteConfig } from '@/lib/site-config';

// shikharkumar.in/resume: a temporary redirect (307), because the target can change. Dynamic so that
// a change in the store applies right away; see getSiteConfig.
export const dynamic = 'force-dynamic';

export async function GET() {
  const { resume } = await getSiteConfig({ fresh: true });
  if (!resume) notFound();
  redirect(resume);
}
