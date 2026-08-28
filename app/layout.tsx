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
  title: "대전 출장마사지 & 청주 출장마사지 | 24시 방문 힐링케어",
  description:
    "대전 및 청주 전 지역 24시 출장마사지 전문. 대전 유성구, 서구, 청주 흥덕구, 청원구 30분 내 빠른 방문, 건식·아로마·스페셜·VIP스웨디시 후불제 안내.",
  alternates: {
    canonical: "https://dj-cj-touchon.netlify.app",
  },
  openGraph: {
    title: "대전 출장마사지 & 청주 출장마사지 | 24시 방문 힐링케어",
    description:
      "대전 및 청주 전 지역 24시 출장마사지 전문. 대전 유성구, 서구, 청주 흥덕구, 청원구 30분 내 빠른 방문.",
    url: "https://dj-cj-touchon.netlify.app",
    siteName: "대전·청주 터치온 출장마사지",
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
      "naver-site-verification": "57a5a96e71ce6d64d06f09340b6f4ee2d481a055",
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