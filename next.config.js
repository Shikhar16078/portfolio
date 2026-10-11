/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't generate AGENTS.md on `next dev`; CLAUDE.md covers it.
  agentRules: false,
};

module.exports = nextConfig;
