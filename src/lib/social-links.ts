import { Github, Linkedin } from '@/components/icons';
import type { SocialLink } from '@/lib/data';
import type { SiteConfig } from '@/lib/site-config';

// The icon links in the hero and footer, from the Global Config store. A missing one has no icon.
export function getSocialLinks(config: SiteConfig) {
  const links: SocialLink[] = [];
  if (config.linkedin) links.push({ name: 'LinkedIn', url: config.linkedin, icon: Linkedin });
  if (config.github) links.push({ name: 'GitHub', url: config.github, icon: Github });
  return links;
}
