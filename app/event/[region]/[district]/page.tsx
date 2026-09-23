import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";

// =========================================================================
// 1. 구 페이지 전용 타이틀 패턴 풀 40종
// =========================================================================
const DISTRICT_TITLE_POOL_40 = [
  "{{city}} {{district}} 마사지 추천 총정리｜후기 좋은 전국 마사지샵 안내 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜내 주변 검증된 프리미엄 홈케어 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜선입금 없는 100% 후불제 홈타이 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜감성 스웨디시 & 아로마 테라피 샵 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜24시간 신속 방문 바디케어 가이드 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜만족도 높은 1:1 맞춤 힐링 코스 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜자택·오피스텔·호텔 빠른 배차 안내 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜피로를 녹이는 정통 홈 바디 테라피 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜친절하고 섬세한 전문 테라피스트 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜동네별 실시간 코스 및 요금 비교 - {{brand}}",
  "{{city}} {{district}} 스웨디시 마사지 추천 총정리｜후기 좋은 감성 테라피 안내 - {{brand}}",
  "{{city}} {{district}} 홈타이 마사지 추천 총정리｜24시 실시간 안심 예약 센터 - {{brand}}",
  "{{city}} {{district}} 아로마 마사지 추천 총정리｜천연 에센셜 림프 이완 케어 - {{brand}}",
  "{{city}} {{district}} 방문 마사지 추천 총정리｜선입금 일체 없는 안전 결제 - {{brand}}",
  "{{city}} {{district}} VIP 마사지 추천 총정리｜전국 최고 수준의 힐링 바디스파 - {{brand}}",
  "{{city}} {{district}} 힐링 마사지 추천 총정리｜직장인 야근 피로회복 전문 가이드 - {{brand}}",
  "{{city}} {{district}} 24시 마사지 추천 총정리｜야간 심야 빠른 도착 홈타이 - {{brand}}",
  "{{city}} {{district}} 맞춤 마사지 추천 총정리｜뭉친 근육 이완 타이 스트레칭 - {{brand}}",
  "{{city}} {{district}} 프라이빗 마사지 추천 총정리｜후기 좋은 전국 마사지샵 안내 - {{brand}}",
  "{{city}} {{district}} 프리미엄 마사지 추천 총정리｜내 공간에서 누리는 호텔식 스파 - {{brand}}",
  "{{city}} {{district}} 마사지 샵 추천 총정리｜후기 좋은 전국 홈케어 힐링 안내 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜동네별 제휴 샵 및 할인 정보 모음 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜언제든 믿고 부르는 방문 케어 리스트 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜체형별 맞춤 림프 순환 케어 총정리 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜30분 도착 보장 실속 홈타이 코스 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜정직하고 투명한 정찰제 요금 가이드 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜심신 안정을 돕는 감성 릴렉스 스파 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜후기 좋은 전국 방문 테라피 명가 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜단골들이 강력 추천하는 바디케어 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 총정리｜당일 바로 이용하는 24시간 안심 케어 - {{brand}}",
  "{{city}} {{district}} 안심 마사지 추천 총정리｜후기 좋은 전국 마사지샵 안내 - {{brand}}",
  "{{city}} {{district}} 감성 마사지 추천 총정리｜최고급 아로마 오일 테라피 안내 - {{brand}}",
  "{{city}} {{district}} 급행 마사지 추천 총정리｜전 지역 30분 내외 빠른 방문 - {{brand}}",
  "{{city}} {{district}} 베스트 마사지 추천 총정리｜후기 평점 높은 힐링 샵 모음 - {{brand}}",
  "{{city}} {{district}} 출장 마사지 추천 총정리｜100% 현장 후불제 안심 예약 - {{brand}}",
  "{{city}} {{district}} 건식 마사지 추천 총정리｜전신 스트레칭 활력 충전 코스 - {{brand}}",
  "{{city}} {{district}} 심야 마사지 추천 총정리｜새벽에도 편안하게 부르는 홈타이 - {{brand}}",
  "{{city}} {{district}} 릴렉스 마사지 추천 총정리｜후기 좋은 전국 마사지샵 안내 - {{brand}}",
  "{{city}} {{district}} 명품 마사지 추천 총정리｜엄선된 테라피스트 1:1 방문 - {{brand}}",
  "{{city}} {{district}} 추천 마사지 총정리｜편안한 휴식을 약속하는 홈 바디케어 - {{brand}}"
];

// =========================================================================
// 2. 구 페이지 전용 메타 디스크립션 패턴 풀 40종
// =========================================================================
const DISTRICT_DESC_POOL_40 = [
  "{{city}} {{district}} 출장 마사지·홈타이 추천 업소를 한곳에 모았어요. 동네별 상세 코스·이용시간·안전 후불제 예약 방법을 지금 살펴보세요.",
  "{{city}} {{district}} 출장 마사지 전 지역 24시간 실시간 방문 안내! 감성 스웨디시부터 시원한 타이 코스까지 후기 좋은 샵을 비교해보세요.",
  "선입금 없는 100% 현장 후불제! {{city}} {{district}} 출장마사지 샵 리스트를 동네 단위로 엄선했어요. 프로그램별 요금과 예약 안내를 확인하세요.",
  "{{city}} {{district}} 출장 마사지 자택·오피스텔·호텔 어디서나 30분 내외 빠른 도착! 지친 피로를 풀어줄 추천 코스와 이용시간을 전해드립니다.",
  "후기 좋은 전국 마사지샵 가이드, {{city}} {{district}} 출장마사지 편! 동별 검증된 테라피스트의 방문 힐링 케어를 지금 바로 확인해보세요.",
  "{{city}} {{district}} 출장 마사지 주민과 직장인분들을 위한 1:1 맞춤 추천 총정리. 뭉친 근육을 부드럽게 이완하는 최적의 코스를 안내합니다.",
  "{{city}} {{district}} 출장 마사지 내 주변 빠른 방문 업소 정보 모음. 아로마, 건식, 스웨디시 코스와 간편한 전화 예약 방법을 살펴보세요.",
  "야간·심야 24시간 연중무휴로 운영되는 {{city}} {{district}} 출장마사지! 번거로운 이동 없이 집에서 즐기는 홈스파 혜택을 확인하세요.",
  "{{city}} {{district}} 출장 마사지 코스별 특징과 투명한 정찰제 가격 비교. 믿고 부르는 전문 테라피스트의 정성 어린 손길을 경험해보세요.",
  "{{city}} {{district}} 출장 마사지 관내 모든 동의 방문 업소를 총정리했습니다. 원하는 시간과 장소에 맞춰 신속하게 찾아갑니다.",
  "{{city}} {{district}} 출장 마사지 프라이빗 방문 케어 완벽 가이드! 림프 순환 스웨디시와 힐링 아로마 케어로 컨디션을 되찾아보세요.",
  "{{city}} {{district}} 출장 마사지 전역 어디든 전화 한 통으로 예약 완료! 후기 평점 높은 코스와 이용 요령을 동네별로 확인하세요.",
  "단골 고객이 보증하는 {{city}} {{district}} 출장마사지 추천 안내. 선입금 요구가 전혀 없는 안전한 시스템으로 편안히 휴식하세요.",
  "{{city}} {{district}} 출장 마사지 바디 컨디셔닝 & 힐링 스파 총집합! 피로 회복에 탁월한 코스 안내와 빠른 배차 서비스를 제공합니다.",
  "{{city}} {{district}} 출장 마사지 중심 신속 도착 샵 안내. 오피스텔 및 자택으로 찾아가는 고품격 테라피를 동네별로 확인해보세요.",
  "{{city}} {{district}} 출장 마사지 감성 스웨디시 및 정통 타이 추천 총정리. 1:1 밀착 케어로 일상의 활력을 재충전하세요.",
  "퇴근 후 힐링하기 딱 좋은 {{city}} {{district}} 출장마사지 업소 모음. 상세한 이용시간과 코스별 소요 시간을 쉽게 살펴보세요.",
  "{{city}} {{district}} 출장 마사지 직장인 추천 가이드! 굳은 어깨와 허리를 가볍게 만들어줄 체계적인 프로그램을 안내해 드립니다.",
  "{{city}} {{district}} 출장 마사지 24시 안심 방문 케어 정보. 동네별 최적의 동선으로 신속하게 방문하는 전문 테라피를 경험하세요.",
  "{{city}} {{district}} 출장 마사지 호텔식 홈케어 추천! 최고급 천연 에센셜 오일과 정성 가득한 테라피로 깊은 이완을 선물합니다.",
  "{{city}} {{district}} 출장 마사지 전역을 커버하는 추천 총정리. 후기 좋은 샵들의 코스 구성과 예약 노하우를 한눈에 둘러보세요.",
  "{{city}} {{district}} 출장 마사지 내 동네에서 지금 바로 부르기 편리한 샵 리스트. 투명한 가격과 안심 후불 예약 제도를 안내합니다.",
  "{{city}} {{district}} 출장 마사지 힐링 쉼터 방문 안내. 24시간 상시 상담으로 고객님의 컨디션에 딱 맞는 코스를 추천해 드립니다.",
  "{{city}} {{district}} 출장 마사지 업소 정보가 필요할 때! 동네 단위로 깔끔하게 정리된 코스·소요시간·예약법을 확인해 보세요.",
  "선입금 없는 안전 결제! {{city}} {{district}} 출장마사지 추천 및 동네별 상세 안내로 집에서 편안한 홈 스파를 즐기세요.",
  "{{city}} {{district}} 출장 마사지 프라이빗 홈타이 & 힐링 케어 총정리. 내 공간에서 안심하고 받는 최고 수준의 바디케어를 안내합니다.",
  "{{city}} {{district}} 출장 마사지 스웨디시 명가 모음. 림프 순환과 부드러운 터칭으로 쌓인 피로를 말끔히 지워드립니다.",
  "{{city}} {{district}} 출장 마사지 실시간 배차 안내! 전화 한 통이면 30분 내외로 전문 관리사가 직접 찾아갑니다.",
  "{{city}} {{district}} 출장 마사지 거주민을 위한 안심 가이드. 군더더기 없는 투명한 가격과 최상의 만족도를 약속드립니다.",
  "{{city}} {{district}} 출장 마사지 야간 힐링 추천 총정리. 하루의 끝을 완벽한 휴식으로 마무리하는 최적의 코스를 살펴보세요.",
  "{{city}} {{district}} 출장 마사지 명품 아로마 정보 모음. 동네별 상세 위치와 코스, 빠른 예약 방법을 친절하게 안내합니다.",
  "{{city}} {{district}} 출장 마사지 맞춤형 방문 테라피 서비스! 남녀노소 누구나 편안하게 이용할 수 있는 정통 홈케어 안내입니다.",
  "{{city}} {{district}} 출장 마사지 24시간 안심 예약 센터. 동네별 제휴 테라피스트의 빠른 방문과 정성 어린 케어를 누려보세요.",
  "{{city}} {{district}} 출장 마사지 샵 평점 및 코스 총정리. 이동할 필요 없이 내 방에서 편하게 이용하는 안심 힐링 테라피.",
  "{{city}} {{district}} 출장 마사지 피로 회복 전문 추천 가이드. 체형 맞춤형 스트레칭과 오일 테라피 코스를 확인하세요.",
  "{{city}} {{district}} 출장마사지 전 지역 신속 출동 안내! 정직한 후불제와 숙련된 솜씨로 최고의 힐링 시간을 선물합니다.",
  "{{city}} {{district}} 출장 마사지 동네별 알짜 정보 모음집. 코스 안내부터 이용 꿀팁까지 지금 상세히 살펴보세요.",
  "{{city}} {{district}} 출장 마사지 1:1 방문 추천! 조용하고 아늑한 내 공간에서 품격 높은 전신 케어를 받아보세요.",
  "{{city}} {{district}} 출장 마사지 후기 좋은 샵 총정리. 첫 방문 고객도 부담 없이 선택할 수 있는 인기 코스를 안내합니다.",
  "{{city}} {{district}} 출장 마사지 24시 홈타이 & 릴렉스 총정리. 언제 어디서든 편안한 쉼표를 찍어줄 최상의 휴식을 만나보세요."
];

// 고유 해시 기반 40개 순환 결정 함수
function getRotatedDistrictSeo(cityName: string, districtName: string, seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const titleIndex = absHash % DISTRICT_TITLE_POOL_40.length;
  const descIndex = Math.floor(absHash / 5) % DISTRICT_DESC_POOL_40.length;

  const title = DISTRICT_TITLE_POOL_40[titleIndex]
    .replace(/\{\{city\}\}/g, cityName)
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{brand\}\}/g, BRAND_NAME);

  const description = DISTRICT_DESC_POOL_40[descIndex]
    .replace(/\{\{city\}\}/g, cityName)
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{brand\}\}/g, BRAND_NAME);

  return { title, description };
}

// 정적 경로 생성 (SSG)
export async function generateStaticParams() {
  const paths: { city: string; district: string }[] = [];
  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      paths.push({ city: citySlug, district: district.slug });
    });
  });
  return paths;
}

export const dynamicParams = false;

// 메타데이터 동적 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  if (!cityInfo || !districtInfo) return {};

  const districtFullName = `${cityInfo.name} ${districtInfo.name}`;
  const { title, description } = getRotatedDistrictSeo(
    cityInfo.name,
    districtInfo.name,
    `${districtFullName}_rot40_district_seo`
  );

  const url = `${DOMAIN}/massage/${city}/${district}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${districtInfo.name}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictMassagePage({
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
  const districtFullName = `${cityInfo.name} ${districtInfo.name}`;

  const { title: headingTitle, description: heroDesc } = getRotatedDistrictSeo(
    cityInfo.name,
    districtInfo.name,
    `${districtFullName}_rot40_district_seo`
  );

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* 상단 네비게이션 */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link
            href={`/massage/${city}`}
            className="text-xs text-gray-300 hover:text-white"
          >
            ← {cityInfo.name} 전체 구 목록
          </Link>
          <a
            href={`tel:${cityInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
            style={{ backgroundColor: mainColor }}
          >
            📞 {districtInfo.name} 신속 상담
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        {/* 히어로 헤더 */}
        <div>
          <span
            className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border"
            style={{
              color: mainColor,
              borderColor: `${mainColor}40`,
              backgroundColor: `${mainColor}15`,
            }}
          >
            {districtFullName} DISTRICT GUIDE
          </span>

          <h1 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
            {headingTitle}
          </h1>
          <p className="text-[#e1d9f5] text-sm sm:text-base max-w-[700px] mx-auto leading-relaxed">
            {heroDesc}
          </p>
        </div>

        {/* 💡 구 단위 동네(동) 바로가기 그리드 (SEO 내부 링크 확장 핵심) */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>📍</span> {districtInfo.name} 동별 마사지 추천 바로가기
            </h2>
            <span className="text-xs text-gray-400">
              총 {districtInfo.dongs.length}개 동네 안내
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {districtInfo.dongs.map((dong) => (
              <Link
                key={dong.slug}
                href={`/massage/${city}/${district}/${dong.slug}`}
                className="group p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-center flex flex-col items-center justify-center gap-1"
              >
                <span className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors">
                  {dong.name}
                </span>
                <span className="text-[11px] text-gray-400">
                  스웨디시·홈타이 →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 안내 및 서비스 특장점 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {districtFullName} 프리미엄 방문 테라피 특징
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {districtFullName} 전 지역 어디든 고객님이 계신 곳(자택, 오피스텔, 호텔)으로 전문 테라피스트가 30분 내외로 빠르게 출동합니다.
            </p>
            <p>
              선입금 및 예약금을 요구하는 사기 행위를 일체 하지 않으며, 관리사가 도착한 후 직접 확인하고 결제하는 <strong>100% 현장 후불제</strong>를 고수하여 안전하고 편안하게 힐링을 누리실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-[#00ff88]">POINT 01</span>
              <h3 className="font-extrabold text-white text-base">30분 내외 신속 배차</h3>
              <p className="text-xs text-gray-400">{districtInfo.name} 전역 상시 대기 및 빠른 방문</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-[#ba8cff]">POINT 02</span>
              <h3 className="font-extrabold text-white text-base">100% 안심 후불제</h3>
              <p className="text-xs text-gray-400">선입금 없는 현장 결제로 신뢰도 보장</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-yellow-400">POINT 03</span>
              <h3 className="font-extrabold text-white text-base">맞춤 힐링 프로그램</h3>
              <p className="text-xs text-gray-400">타이, 천연 아로마, 감성 스웨디시 완비</p>
            </div>
          </div>
        </section>

        {/* 같은 시 내 다른 구 둘러보기 */}
        <section className="text-left bg-[#140f24] p-6 rounded-3xl border border-white/10">
          <h3 className="text-base font-bold text-white mb-3">
            📍 {cityInfo.name} 다른 구 마사지 둘러보기
          </h3>
          <div className="flex flex-wrap gap-2">
            {cityInfo.districts
              .filter((d) => d.slug !== district)
              .map((otherDist) => (
                <Link
                  key={otherDist.slug}
                  href={`/massage/${city}/${otherDist.slug}`}
                  className="py-2 px-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-bold hover:bg-white/20 hover:text-white transition-all"
                >
                  {cityInfo.name} {otherDist.name} 마사지
                </Link>
              ))}
          </div>
        </section>
      </main>

      {/* 모바일 하단 플로팅 예약 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {districtInfo.name} 마사지 실시간 상담 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}