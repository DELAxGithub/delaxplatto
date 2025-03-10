/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // ESLintによるビルドの失敗を防ぐ
    ignoreDuringBuilds: true,
  },
  // 静的エクスポートの制御
  output: 'standalone',
  // 型チェックも無効化する
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;