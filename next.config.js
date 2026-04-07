/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['onetapalert.com', 'blog.onetapalert.com'],
  },
};

module.exports = nextConfig;
