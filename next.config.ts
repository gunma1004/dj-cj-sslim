import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 👈 정적 HTML 추출 (500 에러 원천 차단)
  images: {
    unoptimized: true, // 정적 빌드 시 필수 설정
  },
};

export default nextConfig;