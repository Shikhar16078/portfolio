// eslint-disable-next-line @typescript-eslint/no-require-imports -- this config is a CommonJS file
const { profileLinks, sectionLinks, helpNames } = require('./src/lib/short-links');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't generate AGENTS.md on `next dev`; CLAUDE.md covers it.
  agentRules: false,
  // Dev only: let a phone on the same Wi-Fi load the dev server. Next blocks other hosts by default,
  // and the page then never hydrates. Update the IP if the Mac's local address changes.
  allowedDevOrigins: ['10.0.0.36', 'iBook.local'],
  // The names in src/lib/short-links.js for routes in src/app. A route's own name is included because
  // rewrites ignore capitals but routes don't, so this is what makes /LinkedIn work.
  async rewrites() {
    return [...profileLinks.map((link) => link.names), helpNames].flatMap((names) =>
      names.map((name) => ({ source: `/${name}`, destination: `/${names[0]}` }))
    );
  },
  // The names in src/lib/short-links.js for sections of the homepage.
  async redirects() {
    return sectionLinks.flatMap(({ section, names }) =>
      names.map((name) => ({ source: `/${name}`, destination: `/#${section}`, permanent: false }))
    );
  },
};

module.exports = nextConfig;
