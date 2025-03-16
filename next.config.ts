import createMdx from '@next/mdx';
import './src/env.js';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

const withMDX = createMdx({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
