// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    })
    return config
  },
}
