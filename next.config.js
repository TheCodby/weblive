/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  images: {
    domains: [
      "127.0.0.1",
      "weblive-1.s3.us-east-1.amazonaws.com",
      "weblive-1.s3.amazonaws.com",
      "cdn.discordapp.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
