/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // Polyfill __dirname for Edge Runtime (required by next-auth v5 beta internals)
  webpack: (config, { nextRuntime, webpack }) => {
    if (nextRuntime === 'edge') {
      config.plugins.push(
        new webpack.DefinePlugin({ __dirname: JSON.stringify('/') })
      );
    }
    return config;
  },
}

export default nextConfig
