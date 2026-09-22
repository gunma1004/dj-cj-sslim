import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// 시 페이지 전용 순차적 수식어 풀 (스팸 키워드 및 '마사지' 완전 배제)
const CITY_EXACT_TITLES = [
  "{{city}} 프리미엄 홈 바디케어 가이드",
  "{{city}} 전 지역 로열 힐링 컨디셔닝 안내",
  "{{city}} 맞춤형 스페셜 리프레시 센터",
  "{{city}} 고품격 방문 케어 솔루션",
  "{{city}} 안심 릴렉스 바디케어 안내"
];

function getSequentialCityTitle(cityName: string) {
  const cityKeys = Object.keys(CITIES_DATA);
  const currentIndex = cityKeys.findIndex((key) => CITIES_DATA[key].name === cityName);
  const targetIndex = currentIndex !== -1 ? currentIndex : 0;
  
  const pattern = CITY_EXACT_TITLES[targetIndex % CITY_EXACT_TITLES.length];
  return pattern.replace(/\{\{city\}\}/g, cityName);
}

export async function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((city) => ({ city }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];
  if (!cityInfo) return {};

  const sequentialTitle = getSequentialCityTitle(cityInfo.name);

  // 1. 타이틀: 스팸 및 '마사지' 단어 완전 배제
  const title = sequentialTitle + " | " + BRAND_NAME;
  
  // 2. 메타 디스크립션: '출장'과 '마사지'가 모두 들어가되 절대 붙지 않도록 넓게 분리
  const description = cityInfo.name + " 전 지역 전문 테라피스트의 신속한 출장 서비스를 통해 지친 일상의 피로를 말끔히 풀어드릴 편안한 힐링 마사지를 경험해 보세요. 선입금 없는 후불제.";
  
  const url = DOMAIN + "/massage/" + city;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: BRAND_NAME + " " + cityInfo.name, locale: "ko_KR", type: "website" },
  };
}

export default async function CityMassagePage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];
  if (!cityInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const sequentialTitle = getSequentialCityTitle(cityInfo.name);

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="text-xs text-gray-300 hover:text-white">← 홈으로 돌아가기</Link>
          <a href={"tel:" + cityInfo.phone} className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105" style={{ backgroundColor: mainColor }}>
            📞 {cityInfo.name} 예약 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        <div>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border" style={{ color: mainColor, borderColor: mainColor + "40", backgroundColor: mainColor + "15" }}>
            {cityInfo.name.toUpperCase()} TOTAL CARE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-4">{sequentialTitle}</h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {cityInfo.name} 전 지역 전문 테라피스트의 체계적인 방문 프로그램으로 일상의 피로를 회복하세요.
          </p>
        </div>

        {/* 샵 소개 및 안내 섹션 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {cityInfo.name} 전역 프리미엄 홈 바디케어 안내
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {cityInfo.name} 전 지역(호텔, 오피스텔, 주거지 등) 어디서나 고객님이 계신 곳으로 전문 테라피스트가 직접 찾아가는 맞춤형 방문 테라피 서비스입니다.
            </p>
            <p>
              지친 일상 속 누적된 피로와 뭉친 근육을 부드럽게 이완시켜 드리며, 철저한 위생 관리와 프라이버시 보호를 바탕으로 선입금 없는 100% 현장 후불제 서비스를 제공합니다.
            </p>
          </div>
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
        </section>

        {/* 구별 이동 링크 섹션 */}
        <section className="text-left space-y-4">
          <h2 className="text-xl font-bold text-gray-300">📍 {cityInfo.name} 구별 상세 선택</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cityInfo.districts.map((district) => (
              <Link key={district.slug} href={"/massage/" + city + "/" + district.slug} className="p-4 rounded-2xl bg-[#140f24] border border-white/10 hover:border-white/30 transition-all block">
                <span className="font-extrabold text-white text-base">{district.name} 홈케어 바로가기 →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a href={"tel:" + cityInfo.phone} className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all" style={{ backgroundColor: mainColor }}>
          📞 {cityInfo.name} 예약 문의 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}