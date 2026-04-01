import path from 'node:path';
import { fileURLToPath } from 'node:url';

const isGithubPages =
  process.env.GITHUB_ACTIONS === 'true' || process.env.GITHUB_PAGES === 'true';
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'kanji-master';
const basePath = isGithubPages ? `/${repositoryName}` : '';
const workspaceRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  outputFileTracingRoot: workspaceRoot,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
