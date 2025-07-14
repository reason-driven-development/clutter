/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15의 새로운 기능들
  experimental: {
    // 새로운 이미지 최적화
  },
  // 이미지 최적화 설정
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // 컴파일러 설정
  compiler: {
    // React 18의 새로운 기능들 지원
    reactRemoveProperties: true,
  },
  // Turbopack 설정 (Next.js 15에서 stable)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // 서버 외부 패키지 설정
  serverExternalPackages: [],
};

export default nextConfig;
