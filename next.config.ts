import type { NextConfig } from "next";

const config: NextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/embedded.html',
      },
    ];
  },
};

export default config;
