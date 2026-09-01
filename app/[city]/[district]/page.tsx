import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME, getKeywordModifier } from "@/app/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const paths: { city: string; district: string }[] = [];

  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      paths.push({
        city: citySlug,
        district: district.slug,
      });
    });
  });

  return paths;
}

export const dynamicParams = false;

// 구 단위 메타데이터 (동적 회피 키워드 적용)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return {};

  const modifier = getKeywordModifier(`${districtInfo.name}_district`);
  const title = `${cityInfo.name} ${districtInfo.name} 출장 ${modifier.prefix} 마사지 | ${BRAND_NAME}`;
  const description = `${cityInfo.name} ${districtInfo.name} 전 지역 24시간 출장 ${modifier.prefix} 마사지 전문 안내. ${modifier.sub}. 30분 내 신속 도착 및 100% 현장 후불제.`;
  const url = `${DOMAIN}/${city}/${district}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${cityInfo.name} ${districtInfo.name}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const modifier = getKeywordModifier(`${districtInfo.name}_district`);
  const areaFullName = `${cityInfo.name} ${districtInfo.name}`;

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
            📞 {districtInfo.name} 예약 문의
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
          {areaFullName} 24H CARE
        </span>

        <h1 className="text-3xl sm:text-5xl font-black mb-4">
          {areaFullName} 출장 {modifier.prefix} 마사지
        </h1>
        <p className="text-[#e1d9f5] text-base sm:text-lg mb-8 max-w-[650px] mx-auto leading-relaxed">
          {areaFullName} 전 지역 30분 이내 방문 테라피! <br />
          {modifier.sub}를 선입금 없는 100% 현장 후불제로 편안하게 만나보세요.
        </p>

        {/* 동별 목록 (각 동마다 고유 회피 키워드 뱃지 표시) */}
        <section className="mb-12 text-left">
          <h2 className="text-xl font-bold mb-4 text-gray-300">
            📍 {districtInfo.name} 동별 맞춤 서비스 선택
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {districtInfo.dongs.map((dong) => {
              const dongMod = getKeywordModifier(`${areaFullName}_${dong.name}`);
              return (
                <Link
                  key={dong.slug}
                  href={`/${city}/${district}/${dong.slug}`}
                  className="p-4 rounded-2xl bg-[#140f24] border border-white/10 hover:border-white/30 transition-all block group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-white text-base group-hover:text-[#00ff88]">
                      {dong.name} 출장 {dongMod.prefix} 마사지
                    </span>
                    <span className="text-xs text-gray-400 font-bold">바로가기 →</span>
                  </div>
                  <p className="text-xs text-gray-400">{dongMod.sub}</p>
                </Link>
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
          📞 {districtInfo.name} 빠른 예약 연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}