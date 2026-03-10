/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tell Next.js/Vercel NOT to bundle these CJS-only packages.
  // They will be require()'d natively by Node.js at runtime instead.
  serverExternalPackages: ['sslcommerz-lts'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
