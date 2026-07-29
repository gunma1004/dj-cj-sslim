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
  title: "대전 출장마사지 & 청주 출장마사지 | 24시 방문 힐링케어",
  description:
    "대전 및 청주 전 지역 24시 출장마사지 전문. 대전 유성구, 서구, 청주 흥덕구, 청원구 30분 내 빠른 방문, 건식·아로마·스페셜·VIP스웨디시 후불제 안내.",
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
      <head>
        {/* 네이버 서치어드바이저 소유확인 태그 직접 삽입 */}
        <meta
          name="naver-site-verification"
          content="93619e854ae0d429d3dab505e6a4ff1679eb4832"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}