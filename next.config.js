/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['127.0.0.1', 'frozen-bayou-75999.herokuapp.com']
  }
}

module.exports = nextConfig
