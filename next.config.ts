import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/anniversaries/unlock", destination: "/me/unlock", permanent: true },
      { source: "/admin/unlock", destination: "/me/unlock", permanent: true },
      { source: "/anniversaries", destination: "/me/anniversaries", permanent: true },
      { source: "/anniversaries/:path*", destination: "/me/anniversaries/:path*", permanent: true },
      { source: "/admin", destination: "/me/admin", permanent: true },
      { source: "/admin/:path*", destination: "/me/admin/:path*", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thuhue-website-bucket-1.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
