// @ts-check

/* eslint-disable */

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    })
    return config
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_NOOB_SUPABASE_URL?.replace('https://','') || 'localhost:54321'],
  }
}
