const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        hostname: 'storage.googleapis.com',
      },
      {
        hostname: '*',
      },
    ],
  },
})