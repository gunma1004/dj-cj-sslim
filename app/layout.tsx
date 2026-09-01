import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://dj-cj-touchon.netlify.app"),
  title: {
    template: "%s | S슬림 프리미엄 홈 테라피",
    default: "S슬림 | 대전·청주 1:1 맞춤 프리미엄 홈 바디 테라피 & 릴렉싱",
  },
  description:
    "대전 및 청주 전 지역 프라이빗 방문 바디케어 안내. 유성구, 서구, 중구, 흥덕구, 청원구 1:1 맞춤 타이, 아로마, 스웨디시 힐링 릴렉스 예약 가이드.",
  alternates: {
    canonical: "https://dj-cj-touchon.netlify.app",
  },
  openGraph: {
    title: "S슬림 | 대전·청주 1:1 맞춤 프리미엄 홈 테라피",
    description:
      "대전·청주 전 지역 프라이빗 방문 힐링 케어 및 바디 컨디셔닝 서비스 안내.",
    url: "https://dj-cj-touchon.netlify.app",
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
      "naver-site-verification": "82adf43836ecf406bc29b138d2ebacb1e096c8e4",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}