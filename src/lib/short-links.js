// Every short link on the site, in one list that feeds both next.config.js (which creates them) and
// the /help page (which shows them), so the two can't disagree. To add a name, add it to a list; the
// first name in each list is the one /help shows first. It's plain JS because next.config.js loads it.

// Links out of the site. Each first name is a route handler in src/app that reads its target from
// the Global Config store.
const profileLinks = [
  { label: 'Resume', names: ['resume', 'resumes', 'res', 'cv'] },
  { label: 'LinkedIn', names: ['linkedin', 'linked-in', 'li', 'in'] },
  { label: 'GitHub', names: ['github', 'git', 'gh'] },
  { label: 'LinkedIn recommendations', names: ['recommendations', 'recommendation', 'recs', 'rec', 'references', 'testimonials'] },
];

// Links to a section of the homepage. `section` is the section's id.
const sectionLinks = [
  { label: 'About', section: 'home', names: ['about', 'home'] },
  { label: 'Experience', section: 'experience', names: ['experience', 'experiences', 'exp', 'work', 'jobs', 'career'] },
  { label: 'Projects', section: 'projects', names: ['projects', 'project', 'proj'] },
  { label: 'Education', section: 'education', names: ['education', 'edu', 'school', 'college', 'university', 'degree', 'degrees'] },
  { label: 'Skills', section: 'skills', names: ['skills', 'skill', 'tech', 'stack'] },
  { label: 'Awards', section: 'awards', names: ['awards', 'award', 'achievements', 'achievement', 'honors'] },
  { label: 'Contact', section: 'contact', names: ['contact', 'contacts', 'connect', 'email', 'mail'] },
];

// Other names for the /help page itself.
const helpNames = ['help', 'redirects', 'redirect', 'red', 'links', 'link', 'shortcuts', 'shortcut'];

module.exports = { profileLinks, sectionLinks, helpNames };
