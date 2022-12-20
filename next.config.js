/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["files.cdn.printful.com"],
  },
}

module.exports = nextConfig
