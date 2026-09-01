import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME, getKeywordModifier } from "@/app/data";
import { notFound } from "next/navigation";

// 1. 시 정적 경로 등록 (daejeon, cheongju)
export async function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((city) => ({
    city: city,
  }));
}

export const dynamicParams = false;

// 2. 시 단위 SEO 메타데이터 (동적 회피 키워드 적용)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return {};

  const cityMod = getKeywordModifier(`${cityInfo.name}_city_main`);
  const title = `${cityInfo.name} 출장 ${cityMod.prefix} 마사지 & 전신 케어 | ${BRAND_NAME}`;
  const description = `${cityInfo.name} 전 지역 24시간 출장 ${cityMod.prefix} 마사지 전문. ${cityMod.sub}. 30분 내 빠른 도착, 선입금 없는 100% 현장 후불제 안내.`;
  const url = `${DOMAIN}/${city}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${cityInfo.name}`,
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
  const cityMod = getKeywordModifier(`${cityInfo.name}_city_main`);

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* GNB */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt={`${BRAND_NAME} 홈케어`}
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
            📞 {cityInfo.name}지역 예약 문의
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
          {cityInfo.name.toUpperCase()} 24H CARE
        </span>

        {/* H1: 시 대표 회피 키워드 */}
        <h1 className="text-3xl sm:text-5xl font-black mb-4">
          {cityInfo.name} 출장 {cityMod.prefix} 마사지
        </h1>
        <p className="text-[#e1d9f5] text-base sm:text-lg mb-8 max-w-[650px] mx-auto leading-relaxed">
          {cityInfo.name} 전 지역 전문 테라피스트 30분 이내 방문! <br />
          {cityMod.sub}를 선입금 없는 100% 현장 후불제로 편안하게 이용해 보세요.
        </p>

        {/* 구별 선택 섹션 (구마다 다른 회피 키워드 노출) */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-left text-gray-300">
            📍 {cityInfo.name} 구별 상세 안내
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {cityInfo.districts.map((district) => {
              const districtMod = getKeywordModifier(`${cityInfo.name} ${district.name}`);

              return (
                <div
                  key={district.slug}
                  className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {district.name} 출장 {districtMod.prefix} 마사지
                      </h3>
                      <p className="text-[11px] text-gray-400">{districtMod.sub}</p>
                    </div>
                    <Link
                      href={`/${city}/${district.slug}`}
                      className="text-xs font-bold hover:underline shrink-0 ml-2"
                      style={{ color: mainColor }}
                    >
                      구 전체보기 →
                    </Link>
                  </div>

                  {/* 동 버튼 목록 (동마다 다른 회피 키워드 라벨) */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {district.dongs.map((dong) => {
                      const dongMod = getKeywordModifier(`${cityInfo.name} ${district.name} ${dong.name}`);

                      return (
                        <Link
                          key={dong.slug}
                          href={`/${city}/${district.slug}/${dong.slug}`}
                          className="py-2 px-1 text-center rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/20 transition-all truncate"
                          title={`${dong.name} 출장 ${dongMod.prefix} 마사지`}
                        >
                          {dong.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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
          📞 {cityInfo.name} 출장 {cityMod.prefix} 마사지 문의 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}