/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't generate AGENTS.md on `next dev`; CLAUDE.md covers it.
  agentRules: false,
  // Dev only: let a phone on the same Wi-Fi load the dev server. Next blocks other hosts by default,
  // and the page then never hydrates. Update the IP if the Mac's local address changes.
  allowedDevOrigins: ['10.0.0.36', 'iBook.local'],
  // Shorter names for the short links in src/app (resume, linkedin, github).
  async rewrites() {
    return [
      { source: '/cv', destination: '/resume' },
      { source: '/li', destination: '/linkedin' },
      { source: '/git', destination: '/github' },
      { source: '/gh', destination: '/github' },
    ];
  },
};

module.exports = nextConfig;
