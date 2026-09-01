import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dj-cj-sslim.netlify.app"),
  title: {
    template: "%s | S슬림 프리미엄 홈 테라피",
    default: "S슬림 | 대전·청주 1:1 맞춤 프리미엄 홈 바디 테라피 & 릴렉싱",
  },
  description:
    "대전 및 청주 전 지역 프라이빗 방문 바디케어 안내. 유성구, 서구, 중구, 흥덕구, 청원구 1:1 맞춤 타이, 아로마, 스웨디시 힐링 릴렉스 예약 가이드.",
  alternates: {
    canonical: "https://dj-cj-sslim.netlify.app",
  },
  openGraph: {
    title: "S슬림 | 대전·청주 1:1 맞춤 프리미엄 홈 테라피",
    description:
      "대전·청주 전 지역 프라이빗 방문 힐링 케어 및 바디 컨디셔닝 서비스 안내.",
    url: "https://dj-cj-sslim.netlify.app",
    siteName: "S슬림 (S-Slim)",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "LA_pPxDDG8woTpUkC-go8lX1KK6GvlR9z0izx4KkUMM",
    other: {
      "naver-site-verification": "237250cfd7a803e3dbb1ff48464aaec4abf6a290",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#080611] text-white">
        {/* ─── 🖼️ 전 페이지 공통 메인 배너 ─── */}
        <div className="w-full max-w-[1160px] mx-auto pt-4 px-4">
          <div className="relative w-full h-[220px] sm:h-[320px] md:h-[380px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/main-banner.jpg"
              alt="S슬림 프리미엄 홈 테라피 배너"
              fill
              priority
              className="object-cover object-center"
            />
            {/* 배너 위 오버레이 문구 */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080611] via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <span className="inline-block w-fit px-3 py-1 rounded-full bg-[#ba8cff]/20 text-[#ba8cff] border border-[#ba8cff]/40 font-bold text-[11px] sm:text-xs mb-2">
                PREMIUM HOME RELAXING
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                지친 하루의 완벽한 힐링, <br />
                <span className="text-[#00ff88]">S슬림</span>이 함께합니다.
              </h2>
            </div>
          </div>
        </div>

        {/* 각 페이지 본문 (메인, 시/구/동 페이지) */}
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}