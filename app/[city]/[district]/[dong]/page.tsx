import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME, getKeywordModifier } from "@/app/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const paths: { city: string; district: string; dong: string }[] = [];

  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      district.dongs.forEach((dong) => {
        paths.push({
          city: citySlug,
          district: district.slug,
          dong: dong.slug,
        });
      });
    });
  });

  return paths;
}

export const dynamicParams = false;

// 동 단위 메타데이터 (타이틀: '마사지' 필수 포함 / 메타디스크립션: '출장'과 '마사지' 키워드 완전히 분리)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string; dong: string }>;
}) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);

  if (!cityInfo || !districtInfo || !dongInfo) return {};

  const areaFullName = `${cityInfo.name} ${districtInfo.name} ${dongInfo.name}`;
  const modifier = getKeywordModifier(areaFullName);

  // 1. 타이틀: '마사지' 키워드 필수 포함 (데이터의 seoTitle 활용 또는 조합)
  const title = dongInfo.seoTitle || `${dongInfo.name} ${modifier.prefix} 마사지 | ${BRAND_NAME} ${cityInfo.name}`;
  
  // 2. 메타 디스크립션: '출장'과 '마사지'가 절대 붙어 있지 않도록 문장 중간에 충분한 거리를 두어 분리
  const description = `${areaFullName} 전 지역 24시간 신속한 출장 서비스와 함께 일상의 피로를 녹여줄 편안한 힐링 마사지를 경험해 보세요. 선입금 없는 현장 후불제.`;
  
  const url = `${DOMAIN}/${city}/${district}/${dong}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${dongInfo.name}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongPage({
  params,
}: {
  params: Promise<{ city: string; district: string; dong: string }>;
}) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);

  if (!cityInfo || !districtInfo || !dongInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const areaFullName = `${cityInfo.name} ${districtInfo.name} ${dongInfo.name}`;
  const modifier = getKeywordModifier(areaFullName);

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
            📞 {dongInfo.name} 상담 연결
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        <div>
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

          {/* H1 본문 제목 (마사지 키워드 포함) */}
          <h1 className="text-3xl sm:text-5xl font-black mb-4">
            {dongInfo.contentHeading || `${dongInfo.name} ${modifier.prefix} 마사지 안내`}
          </h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {dongInfo.contentBody || `${areaFullName} 30분 이내 방문! 선입금 요구 없는 100% 안전 현장 후불제로 안심하고 이용하세요.`}
          </p>
        </div>

        {/* 동 페이지 상세 업체 소개 및 케어 코스 안내 섹션 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {dongInfo.name} 맞춤형 방문 테라피 안내
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {areaFullName} 인근 호텔, 오피스텔, 자택 등 고객님이 편안하게 휴식 취하시는 공간으로 전문 테라피스트가 신속하게 방문하여 일상의 피로를 말끔히 씻어드립니다.
            </p>
            <p>
              엄선된 천연 오일과 체계적인 바디 컨디셔닝 프로그램을 통해 무거워진 몸의 밸런스를 되찾아 드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-[#00ff88]">PROGRAM 01</span>
              <h3 className="font-extrabold text-white text-base">맞춤형 건식 케어</h3>
              <p className="text-xs text-gray-400">뭉친 근육을 부드럽게 풀어주는 스트레칭 중심</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-[#ba8cff]">PROGRAM 02</span>
              <h3 className="font-extrabold text-white text-base">천연 아로마 바디케어</h3>
              <p className="text-xs text-gray-400">부드러운 오일링을 통한 심신 안정 및 순환</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-yellow-400">PROGRAM 03</span>
              <h3 className="font-extrabold text-white text-base">프리미엄 릴렉싱 케어</h3>
              <p className="text-xs text-gray-400">최상의 편안함을 선사하는 1:1 집중 프로그램</p>
            </div>
          </div>
        </section>

        {/* 인근 다른 동 링크 */}
        <section className="text-left bg-[#140f24] p-6 rounded-3xl border border-white/10">
          <h3 className="text-base font-bold text-white mb-3">
            📍 {districtInfo.name} 인근 다른 지역 안내
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {districtInfo.dongs
              .filter((d) => d.slug !== dong)
              .map((otherDong) => {
                const otherMod = getKeywordModifier(`${cityInfo.name} ${districtInfo.name} ${otherDong.name}`);
                return (
                  <Link
                    key={otherDong.slug}
                    href={`/${city}/${district}/${otherDong.slug}`}
                    className="py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/20 transition-all truncate"
                  >
                    {otherDong.name} {otherMod.prefix} 마사지
                  </Link>
                );
              })}
          </div>
        </section>
      </main>

      {/* 모바일 하단 고정 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {dongInfo.name} 신속 예약 연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}