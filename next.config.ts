import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media.dev.to',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'media2.dev.to',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        // Earlier client work no longer has case study pages; it is listed on the home page.
        source: "/work/:slug(finexis-ekyc|luxe-nomad|hoplite|watchtowr|turisvpn|clinger)",
        destination: "/#earlier",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
