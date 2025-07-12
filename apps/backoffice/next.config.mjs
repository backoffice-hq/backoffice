/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@backoffice/ui", "@backoffice/database"],
  serverExternalPackages: ["better-sqlite3"],
}

export default nextConfig
