import type { NextConfig } from 'next'
import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Optionally add remark/rehype plugins here
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  // Allow .md and .mdx files to be treated as pages/routes
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  experimental: {
    // Enable turbopack MDX when using `next dev --turbopack`
    mdxRs: true,
  },
}

export default withMDX(nextConfig)
