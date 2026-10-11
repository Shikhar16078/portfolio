import { experienceData, projectsData, skillAliases, usedEverywhere } from './data';

// Where each skill was used: the experience entries whose `stack` and the projects whose `technologies`
// mention it, by its own name or one of its `skillAliases` (case-insensitive), plus any entry listing it
// in `alsoUsed` (skills used there that its card doesn't show as badges). Skills in `usedEverywhere`
// match every entry. Feeds the skill popovers.

export interface SkillUse {
  /** id of the card on the page (see experienceCardId / projectCardId). */
  id: string;
  label: string;
  detail: string;
  kind: 'experience' | 'project';
}

const slug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const experienceCardId = (item: { role: string; company: string }) =>
  `experience-${slug(item.company)}-${slug(item.role)}`;
export const projectCardId = (project: { title: string }) => `project-${slug(project.title)}`;

export function skillUses(skill: string): SkillUse[] {
  const names = new Set([skill, ...(skillAliases[skill] ?? [])].map((name) => name.toLowerCase()));
  const everywhere = usedEverywhere.some((name) => names.has(name.toLowerCase()));
  const mentions = (list: readonly string[]) => everywhere || list.some((name) => names.has(name.toLowerCase()));
  const alsoUsed = (entry: object): readonly string[] =>
    'alsoUsed' in entry && Array.isArray(entry.alsoUsed) ? entry.alsoUsed : [];

  return [
    ...experienceData
      .filter((item) => mentions([...item.stack, ...alsoUsed(item)]))
      .map((item) => ({ id: experienceCardId(item), label: item.role, detail: item.company, kind: 'experience' as const })),
    ...projectsData
      .filter((project) => mentions([...project.technologies, ...alsoUsed(project)]))
      .map((project) => ({ id: projectCardId(project), label: project.title, detail: 'Project', kind: 'project' as const })),
  ];
}
