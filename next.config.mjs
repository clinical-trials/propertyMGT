// static export for github pages. the full-stack pieces (api routes, prisma)
// stay in the repo for a later vercel deploy; pages serves the static front door.
//
// basePath is only applied for production builds so local `next dev` still
// serves at the root (http://localhost:3000).

const isProd = process.env.NODE_ENV === "production";
const repo = "propertyMGT";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : "",
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: true,
};

export default nextConfig;
