import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN } from "@/app/data";
import { notFound } from "next/navigation";

// 1. 시 정적 경로 등록 (daejeon, cheongju)
export async function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((city) => ({
    city: city,
  }));
}

export const dynamicParams = false;

// 2. 시 SEO 메타데이터
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return {};

  const title = `${cityInfo.name} 출장마사지 | 24시 방문 힐링케어`;
  const description = `${cityInfo.name} 전 지역 24시간 출장마사지 전문. 30분 내 신속 방문, 스웨디시·아로마·건식 마사지 100% 후불제.`;
  const url = `${DOMAIN}/${city}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${cityInfo.name} 출장마사지`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

// 3. 시 페이지 본문
export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* GNB (로고 적용) */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="대전 청주 출장마사지"
              width={300}
              height={80}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
            />
          </Link>
          <a
            href={`tel:${cityInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
            style={{ backgroundColor: mainColor }}
          >
            📞 {cityInfo.name}지역담당 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center">
        <span
          className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border"
          style={{
            color: mainColor,
            borderColor: `${mainColor}40`,
            backgroundColor: `${mainColor}15`,
          }}
        >
          {cityInfo.name} 24H CARE SERVICE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black mb-4">
          {cityInfo.name} 출장마사지
        </h1>
        <p className="text-[#e1d9f5] text-base sm:text-lg mb-8 max-w-[650px] mx-auto leading-relaxed">
          {cityInfo.name} 전 지역 30분 이내 신속 방문! <br />
          선입금 요구 없는 100% 안전 후불제로 편안하게 받아보세요.
        </p>

        {/* 구 선택 카드 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-left text-gray-300">
            📍 {cityInfo.name} 구별 선택
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {cityInfo.districts.map((district) => (
              <div
                key={district.slug}
                className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-lg font-bold text-white">
                    {cityInfo.name} {district.name}
                  </h3>
                  <Link
                    href={`/${city}/${district.slug}`}
                    className="text-xs font-bold hover:underline"
                    style={{ color: mainColor }}
                  >
                    구 페이지 보기 →
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {district.dongs.map((dong) => (
                    <Link
                      key={dong.slug}
                      href={`/${city}/${district.slug}/${dong.slug}`}
                      className="py-2 px-1 text-center rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/20 transition-all truncate"
                    >
                      {dong.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 모바일 하단 고정바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {cityInfo.name}지역담당 바로연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}