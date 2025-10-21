/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['src', 'pages', 'components', 'lib', 'app'],
  },
};

export default nextConfig;