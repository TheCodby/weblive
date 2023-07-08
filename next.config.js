/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
  images: {
    domains: ["127.0.0.1", "weblive-1.s3.amazonaws.com"],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
