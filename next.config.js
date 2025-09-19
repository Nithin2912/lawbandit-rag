/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Next.js uses the correct project root
  outputFileTracingRoot: __dirname,

  // Recommended: strict TypeScript & App Router support
  reactStrictMode: true,
};

module.exports = nextConfig;
