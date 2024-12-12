/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_REDIS_CONNECTION_URL: process.env.NEXT_REDIS_CONNECTION_URL,
      },
};

export default nextConfig;
