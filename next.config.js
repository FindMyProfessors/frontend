const execSync = require("child_process").execSync;

const lastCommitCommand = "git rev-parse HEAD";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  experimental: { appDir: true },
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return execSync(lastCommitCommand).toString().trim();
  },
};

module.exports = nextConfig;
