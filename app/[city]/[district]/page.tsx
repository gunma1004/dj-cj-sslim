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

// 구 단위 메타데이터 (타입 에러 방지 및 백틱 제거)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return {};

  const areaName = cityInfo.name + " " + districtInfo.name;
  const modifier = getKeywordModifier(areaName + "_district");
  
  // 1. 타이틀: 지역명 + 모디파이어 프리픽스 + 마사지 조합 (타입 안전)
  const title = areaName + " " + modifier.prefix + " 마사지 | " + BRAND_NAME;
  
  // 2. 메타 디스크립션: '출장'과 '마사지'를 멀리 분리
  const description = areaName + " 전 지역 전문 테라피스트가 진행하는 신속한 출장 서비스와 함께 일상의 피로를 녹여줄 편안한 힐링 마사지를 경험해 보세요. 선입금 없는 현장 후불제.";
  
  const url = DOMAIN + "/" + city + "/" + district;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND_NAME + " " + areaName,
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
  const areaName = cityInfo.name + " " + districtInfo.name;
  const modifier = getKeywordModifier(areaName + "_district");

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* GNB */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt={BRAND_NAME + " 홈케어"}
              width={300}
              height={80}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
            />
          </Link>
          <a
            href={"tel:" + cityInfo.phone}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
            style={{ backgroundColor: mainColor }}
          >
            📞 {districtInfo.name} 예약 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        <div>
          <span
            className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border"
            style={{
              color: mainColor,
              borderColor: mainColor + "40",
              backgroundColor: mainColor + "15",
            }}
          >
            {areaName} 24H CARE
          </span>

          {/* H1 본문 제목 */}
          <h1 className="text-3xl sm:text-5xl font-black mb-4">
            {areaName} {modifier.prefix} 마사지
          </h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {modifier.sub} <br />
            선입금 없는 100% 현장 후불제로 편안하고 안전하게 이용해 보세요.
          </p>
        </div>

        {/* 💡 구 페이지 추가 업체 내용 및 서비스 안내 섹션 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {areaName} 프리미엄 홈 바디케어 안내
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {areaName} 전 지역(호텔, 오피스텔, 주거지 등) 어디서나 고객님이 계신 곳으로 전문 테라피스트가 직접 찾아가는 맞춤형 방문 테라피 서비스입니다.
            </p>
            <p>
              지친 일상 속 누적된 피로와 뭉친 근육을 부드럽게 이완시켜 드리며, 철저한 위생 관리와 프라이버시 보호를 바탕으로 최상의 힐링 타임을 선사합니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <p className="font-bold text-white text-sm">⏱ 신속한 방문</p>
                <p className="text-xs text-gray-400">지역별 30분 이내 도착</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <p className="font-bold text-white text-sm">💳 100% 현장 후불</p>
                <p className="text-xs text-gray-400">선입금 없는 안전한 결제</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <p className="font-bold text-white text-sm">📞 24시간 연중무휴</p>
                <p className="text-xs text-gray-400">실시간 맞춤 예약 상담</p>
              </div>
            </div>
          </div>
        </section>

        {/* 동별 목록 */}
        <section className="text-left">
          <h2 className="text-xl font-bold mb-4 text-gray-300">
            📍 {districtInfo.name} 동별 맞춤 서비스 선택
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {districtInfo.dongs.map((dong) => {
              const dongAreaName = areaName + " " + dong.name;
              const dongMod = getKeywordModifier(dongAreaName);

              return (
                <Link
                  key={dong.slug}
                  href={"/" + city + "/" + district + "/" + dong.slug}
                  className="p-4 rounded-2xl bg-[#140f24] border border-white/10 hover:border-white/30 transition-all block group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-white text-base group-hover:text-[#00ff88]">
                      {dong.name} 바디케어
                    </span>
                    <span className="text-xs text-gray-400 font-bold">바로가기 →</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{dongMod.sub}</p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      {/* 모바일 하단 고정바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={"tel:" + cityInfo.phone}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {districtInfo.name} 빠른 예약 연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}