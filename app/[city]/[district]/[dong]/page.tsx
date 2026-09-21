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

// 동 단위 메타데이터 (타이틀: '마사지'만 포함 + 1000개 이상 순차 랜덤 / 메타디스크립션: '출장' 포함하되 키워드 분리)
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

  // 1. 타이틀: 스팸 및 불필요한 단어를 빼고 '마사지'와 1000개 이상 순차 랜덤 수식어만 조합
  const title = `${dongInfo.name} ${modifier.prefix} 마사지 | ${BRAND_NAME} ${cityInfo.name}`;
  
  // 2. 메타 디스크립션: '출장' 단어를 포함하되, 문장 내에서 거리를 두어 '마사지'와 절대 붙지 않게 분리
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

        {/* H1: 동별 고유 1000개 이상 순차 랜덤 '마사지' 타이틀 적용 */}
        <h1 className="text-3xl sm:text-5xl font-black mb-4">
          {dongInfo.name} {modifier.prefix} 마사지
        </h1>
        <p className="text-[#e1d9f5] text-base sm:text-lg mb-8 max-w-[650px] mx-auto leading-relaxed">
          {areaFullName} 30분 이내 방문! {modifier.sub} <br />
          선입금 요구 없는 100% 안전 현장 후불제로 안심하고 이용하세요.
        </p>

        {/* 케어 코스 안내 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-12">
          <div className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400">PROGRAM 01</span>
            <h3 className="font-extrabold text-white text-base">맞춤형 건식 케어</h3>
            <p className="text-xs text-gray-300">뭉친 근육을 부드럽게 풀어주는 스트레칭 중심 케어</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400">PROGRAM 02</span>
            <h3 className="font-extrabold text-white text-base">천연 아로마 바디케어</h3>
            <p className="text-xs text-gray-300">천연 아로마 오일로 심신 안정 및 피로 해소</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-2">
            <span className="text-xs font-bold text-gray-400">PROGRAM 03</span>
            <h3 className="font-extrabold text-white text-base">프리미엄 릴렉싱 케어</h3>
            <p className="text-xs text-gray-300">부드러운 터치와 림프 순환을 돕는 프리미엄 프로그램</p>
          </div>
        </div>

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