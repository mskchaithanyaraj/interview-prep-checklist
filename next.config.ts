import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://interviewprep.chaithanyaraj.live/:path*",
        permanent: true,
      },
    ];
  },
  // other config options if any
};

export default nextConfig;
