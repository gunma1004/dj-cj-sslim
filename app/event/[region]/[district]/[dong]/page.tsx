import Link from "next/link";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// =========================================================================
// 1. 타이틀 패턴 풀 50종 (요청하신 구·동 스웨디시 마사지 추천 형식 기반)
// =========================================================================
const TITLE_PATTERN_POOL_50 = [
  "{{district}} {{dong}} 마사지 서비스 추천｜{{city}} 감성 마사지 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 타이 마사지 추천｜{{city}} 프리미엄 홈타이 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 아로마 마사지 추천｜{{city}} 24시 방문 힐링 테라피 총정리 - {{brand}}",
  "{{district}} {{dong}} 스웨디시 마사지 추천｜{{city}} 1:1 맞춤 바디케어 코스 총정리 - {{brand}}",
  "{{district}} {{dong}} 출장 마사지 추천｜{{city}} 안심 후불제 출장 홈케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 마사지 추천｜{{city}} 림프 순환 아로마 출장 테라피 총정리 - {{brand}}",
  "{{district}} {{dong}} 마사지 추천｜{{city}} 신속 방문 릴렉스 출장 가이드 총정리 - {{brand}}",
  "{{district}} {{dong}} 스웨디시 추천｜{{city}} 야간 심야 출장 힐링 마사지 총정리 - {{brand}}",
  "{{district}} {{dong}} 마사지 추천｜{{city}} 피로회복 출장 전문 홈타이 총정리 - {{brand}}",
  "{{district}} {{dong}} 스웨디시 마사지 추천｜{{city}} 내 주변 프라이빗 출장 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 감성 스웨디시 마사지 추천｜{{city}} 아로마 출장 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 프리미엄 스웨디시 마사지 추천｜{{city}} 홈타이 힐링 총정리 - {{brand}}",
  "{{district}} {{dong}} 24시 스웨디시 마사지 추천｜{{city}} 감성 아로마 테라피 총정리 - {{brand}}",
  "{{district}} {{dong}} 후불제 출장 마사지 추천｜{{city}} 프라이빗 홈케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 출장 스웨디시 마사지 추천｜{{city}} 전문 힐링 바디테라피 총정리 - {{brand}}",
  "{{district}} {{dong}} VIP 스웨디시 마사지 추천｜{{city}} 최고급 에센셜 아로마 총정리 - {{brand}}",
  "{{district}} {{dong}} 출장 스웨디시 마사지 추천｜{{city}} 뭉친 피로회복 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 출장 마사지 추천｜{{city}} 호텔·오피스텔 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 출장 타이 마사지 추천｜{{city}} 전신 아로마 림프순환 총정리 - {{brand}}",
  "{{district}} {{dong}} 출장 방문 마사지 추천｜{{city}} 정통 홈타이 가이드 총정리 - {{brand}}",
  "{{district}} {{dong}} 아로마 출장 스웨디시 마사지 추천｜{{city}} 감성 힐링 테라피 - {{brand}}",
  "{{district}} {{dong}} 프라이빗 스웨디시 출장 마사지 추천｜{{city}} 1:1 방문 홈케어 - {{brand}}",
  "{{district}} {{dong}} 전문 스웨디시 마사지 추천｜{{city}} 안심 현장결제 테라피 총정리 - {{brand}}",
  "{{district}} {{dong}} 야간 스웨디시 마사지 추천｜{{city}} 24시 감성 바디케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 명품 스웨디시 마사지 추천｜{{city}} 천연 오일 아로마 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 자택방문 스웨디시 마사지 추천｜{{city}} 피로회복 홈타이 총정리 - {{brand}}",
  "{{district}} {{dong}} 심신안정 스웨디시 마사지 추천｜{{city}} 감성 아로마 테라피 총정리 - {{brand}}",
  "{{district}} {{dong}} 인기 스웨디시 마사지 추천｜{{city}} 프리미엄 방문케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 웰니스 스웨디시 마사지 추천｜{{city}} 림프 순환 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 베스트 스웨디시 마사지 추천｜{{city}} 내 주변 힐링 마사지 총정리 - {{brand}}",
  "{{district}} {{dong}} 마사지 추천｜{{city}} 당일 빠른 출장 홈타이 총정리 - {{brand}}",
  "{{district}} {{dong}} 타이마사지 추천｜{{city}} 선입금 없는 출장 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 출장 스웨디시 마사지 추천｜{{city}} 부드러운 림프 테라피 총정리 - {{brand}}",
  "{{district}} {{dong}} 마사지 추천｜{{city}} 직장인 활력충전 출장 케어 정리 - {{brand}}",
  "{{district}} {{dong}} 마사지 추천｜{{city}} 심야 24시 출장홈타이 총정리 - {{brand}}",
  "{{district}} {{dong}} 아로마 마사지 추천｜{{city}} 출장 바디 컨디셔닝 총정리 - {{brand}}",
  "{{district}} {{dong}} 스웨디시 마사지 추천｜{{city}} 프라이빗 룸 홈 스파 총정리 - {{brand}}",
  "{{district}} {{dong}} 스웨디시 마사지 추천｜{{city}} 감성 릴렉스 프로그램 총정리 - {{brand}}",
  "{{district}} {{dong}} 스웨디시 마사지 추천｜{{city}} 전문 테라피스트 방문 총정리 - {{brand}}",
  "{{district}} {{dong}} 스웨디시 마사지 추천｜{{city}} 안심 100% 현장결제 총정리 - {{brand}}",
  "{{district}} {{dong}} 스웨디시 힐링 마사지 추천｜{{city}} 감성 아로마 코스 총정리 - {{brand}}",
  "{{district}} {{dong}} 1:1 스웨디시 마사지 추천｜{{city}} 홈 바디케어 가이드 총정리 - {{brand}}",
  "{{district}} {{dong}} 당일 스웨디시 마사지 추천｜{{city}} 30분 도착 힐링케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 친절 스웨디시 마사지 추천｜{{city}} 정통 감성 테라피 총정리 - {{brand}}",
  "{{district}} {{dong}} 딥티슈 스웨디시 마사지 추천｜{{city}} 아로마 피로회복 총정리 - {{brand}}",
  "{{district}} {{dong}} 무자극 스웨디시 마사지 추천｜{{city}} 천연 오일링 케어 총정리 - {{brand}}",
  "{{district}} {{dong}} 쾌적 스웨디시 마사지 추천｜{{city}} 내 방에서 즐기는 스파 총정리 - {{brand}}",
  "{{district}} {{dong}} 집중 스웨디시 마사지 추천｜{{city}} 전신 밸런스 회복 총정리 - {{brand}}",
  "{{district}} {{dong}} 안심 스웨디시 마사지 추천｜{{city}} 24시 홈타이 테라피 총정리 - {{brand}}",
  "{{district}} {{dong}} 최고급 스웨디시 마사지 추천｜{{city}} 감성 아로마 케어 총정리 - {{brand}}"
];

// =========================================================================
// 2. 메타 디스크립션 패턴 풀 50종 (동네 단위 모음 + 코스·시간·예약 가이드)
// =========================================================================
export const DESC_PATTERN_POOL_50 = [
  "{{city}} {{district}} {{dong}} 출장마사지·홈타이 업소를 동네 단위로 지금 부르기 좋게 모았어요. 코스·이용시간·예약 방법을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 스웨디시 및 아로마 테라피를 동네 단위로 엄선했어요. 추천 코스와 투명한 요금, 예약 절차를 확인해보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 전 지역 24시 실시간 안내를 동네별로 한곳에 모았습니다. 맞춤 케어 코스와 예약 팁을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 자택·오피스텔·호텔 30분 방문 정보! 관리 코스·이용시간·후불 예약 방법을 상세히 안내합니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 선입금 없는 안심 후불제 매칭을 동네 단위로 모았어요. 힐링 코스와 예약 절차를 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 주민분들을 위한 1:1 프라이빗 안내. 동네 기준으로 코스 구성·이용시간·간편 예약 방식을 정리했습니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 일대에서 지금 바로 부르기 편리한 샵 목록 모음! 스웨디시·아로마 코스와 실시간 예약 방법을 알아보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 30분 빠른 방문 케어를 동네 단위로 모았어요. 피로를 녹여줄 코스·시간·예약 절차를 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 야간에도 안심하고 부르는 24시 정보. 동네별 최적의 코스·이용시간·전화 예약 안내를 한눈에 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 전문 테라피스트 방문 안내를 동네 단위로 모아두었습니다. 선호 코스·소요시간·예약 노하우를 확인해보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 아로마 스웨디시 케어를 동네 맞춤형으로 모았어요. 다채로운 코스·이용안내·예약 방식을 전해드립니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 직장인과 거주민을 위한 1:1 방문 안내 모음. 코스별 특징·이용시간·예약 가이드를 지금 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 전역 어디든 신속 배차되는 업소를 동네 단위로 모았어요. 추천 힐링 코스·시간대·예약 요령을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 100% 현장 결제로 신뢰할 수 있는 홈케어! 동네 단위 코스 구성·운영시간·예약 안내를 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 림프 순환 스웨디시 및 홈타이를 동네 단위로 알기 쉽게 정리했습니다. 인기 코스·시간·예약 방법을 알아보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 자택에서 편하게 만나는 업소를 동네별로 깔끔하게 모았어요. 바디케어 코스·도착시간·예약 절차를 안내합니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 감성 아로마 테라피 모음. 동네 기준으로 편리하게 비교하는 코스·운영시간·예약 가이드입니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 24시간 연중무휴 방문 케어를 동네 단위로 준비했습니다. 상세 코스·이용시간·예약 혜택을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 인근 숙소와 주거지 어디서든 호출 가능한 리스트. 동네별 알찬 코스·이용시간·예약 가이드를 제공합니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 안심 홈스파 케어를 동네 단위로 모았습니다. 뭉친 근육을 부드럽게 푸는 코스·이용방법·예약을 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 프리미엄 방문 테라피를 동네 단위로 정리했어요. 대표 코스·이용시간·예약 절차를 쉽게 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 내 주변 제휴 정보를 동네 맞춤으로 모았습니다. 부드러운 스웨디시 코스·이용안내·예약 방법을 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 전 지역 프라이빗 힐링 안내! 동네 단위로 선별된 추천 코스·이용시간·예약 방법을 전합니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 퇴근 후 힐링하기 좋은 코스를 동네 단위로 모았어요. 맞춤형 관리·이용시간·예약 상담을 만나보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 1:1 밀착 바디케어 업소를 동네별로 모았습니다. 아로마 코스·이용시간·간편 예약 방식을 확인해보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 선입금 걱정 없는 안심 가이드. 동네 단위 추천 코스·이용시간·예약 방법을 자세히 안내합니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 30분 도착 보장 업소 정보를 동네 단위로 정리했어요. 힐링 코스·소요시간·예약 팁을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 스웨디시 감성 케어를 동네별로 정성껏 모았습니다. 릴렉싱 코스·이용시간·안심 예약 방법을 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 야간 심야 방문 업소를 동네 단위로 모았어요. 편안한 코스·이용시간·예약 방식을 알아보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 단독 힐링 정보를 동네 단위로 지금 부르기 좋게 정리했습니다. 코스·이용시간·예약법을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 중심 빠른 배차 업소를 동네 단위로 모아 제공합니다. 피로회복 코스·이용시간·예약 절차를 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 고품격 홈타이 케어를 동네 단위로 엄선했어요. 천연 오일 코스·운영시간·예약 방법을 안내해 드립니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 주민 추천 업소를 동네 단위로 모았습니다. 만족도 높은 코스·이용시간·예약 가이드를 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 오피스텔 및 자택 방문 동네별 모음. 전신 릴렉스 코스·이용시간·전화 예약 절차를 간편히 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 24시 웰니스 힐링을 동네 맞춤형으로 모았어요. 다양한 코스·이용시간·예약 방법을 확인해보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 후불 결제 샵 리스트를 동네 단위로 모았습니다. 타이·아로마 코스·이용시간·예약법을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 힐링 쉼터 방문 정보를 동네별로 한곳에 모았어요. 전문 테라피 코스·이용시간·예약 절차를 안내합니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 감성 바디케어를 동네 단위로 정리했습니다. 림프 순환 코스·이용시간·예약 혜택을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 심야 힐링 업소를 동네 기준으로 모았습니다. 숙련 관리사 코스·이용시간·예약 가이드를 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 전역 프라이빗 룸 테라피를 동네 단위로 모았어요. 스트레칭 코스·이용시간·예약 방법을 지금 확인해보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 실속형 업소를 동네 단위로 지금 부르기 좋게 모았어요. 코스·이용시간·예약 방법을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 부드러운 감성 테라피를 동네별로 모았습니다. 에센셜 오일 코스·이용시간·예약 가이드를 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 인근 빠른 도착 업소를 동네 맞춤형으로 모았습니다. 릴렉스 코스·이용시간·예약 방식을 한눈에 안내합니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 100% 현장결제 정보를 동네 단위로 정리했어요. 타이·스웨디시 코스·시간·예약법을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 컨디셔닝 케어 정보를 동네 단위로 모았습니다. 피로 해소 코스·이용시간·예약 절차를 확인해보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 자택 전용 방문을 동네 단위로 간편히 부르도록 모았어요. 맞춤 코스·소요시간·예약 팁을 안내합니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 24시간 안심 동네별 모음집. 안심 후불 코스·이용시간·예약 가이드를 지금 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 명품 에센셜 테라피를 동네 단위로 알차게 모았습니다. 전신 케어 코스·이용시간·예약 방법을 확인하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 일상 피로를 풀어줄 샵을 동네 단위로 신속하게 모았어요. 추천 관리 코스·이용시간·예약 요령을 살펴보세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 프리미엄 방문 업소를 동네 단위로 모았습니다. 힐링 코스·이용시간·예약 방법을 확인하세요."
];

// =========================================================================
// 3. 고유 해시 기반 50개 순환 결정 함수 (재빌드/새로고침 시에도 동일 동 고정 매핑)
// =========================================================================
function getRotatedDongSeo(cityName: string, districtName: string, dongName: string, seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const titleIndex = absHash % TITLE_PATTERN_POOL_50.length;
  // 디스크립션은 타이틀과 다른 주기로 순환하도록 오프셋 부여
  const descIndex = Math.floor(absHash / 7) % DESC_PATTERN_POOL_50.length;

  const title = TITLE_PATTERN_POOL_50[titleIndex]
    .replace(/\{\{city\}\}/g, cityName)
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{dong\}\}/g, dongName)
    .replace(/\{\{brand\}\}/g, BRAND_NAME);

  const description = DESC_PATTERN_POOL_50[descIndex]
    .replace(/\{\{city\}\}/g, cityName)
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{dong\}\}/g, dongName)
    .replace(/\{\{brand\}\}/g, BRAND_NAME);

  return { title, description };
}

// 정적 경로 생성 (SSG)
export async function generateStaticParams() {
  const paths: { city: string; district: string; dong: string }[] = [];
  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      district.dongs.forEach((dong) => {
        paths.push({ city: citySlug, district: district.slug, dong: dong.slug });
      });
    });
  });
  return paths;
}

export const dynamicParams = false;

// 메타데이터 동적 생성
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
  const { title, description } = getRotatedDongSeo(
    cityInfo.name,
    districtInfo.name,
    dongInfo.name,
    `${areaFullName}_rot50_seo`
  );

  const url = `${DOMAIN}/massage/${city}/${district}/${dong}`;

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

export default async function DongMassagePage({
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

  // 페이지 H1 제목에도 정확한 템플릿 타이틀 바인딩
  const { title: headingTitle, description: heroDesc } = getRotatedDongSeo(
    cityInfo.name,
    districtInfo.name,
    dongInfo.name,
    `${areaFullName}_rot50_seo`
  );

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* 상단 네비게이션 */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link
            href={`/massage/${city}/${district}`}
            className="text-xs text-gray-300 hover:text-white"
          >
            ← {districtInfo.name} 목록으로
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
            {areaFullName} CARE
          </span>

          {/* H1 본문 타이틀 (요청하신 형식) */}
          <h1 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
            {headingTitle}
          </h1>
          <p className="text-[#e1d9f5] text-sm sm:text-base max-w-[700px] mx-auto leading-relaxed">
            {heroDesc}
          </p>
        </div>

        {/* 샵 소개 및 맞춤형 테라피 안내 섹션 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {districtInfo.name} {dongInfo.name} 스웨디시 & 홈케어 테라피 안내
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {areaFullName} 인근 호텔, 오피스텔, 자택 등 고객님이 편안하게 휴식을 취하시는 공간으로 전문 테라피스트가 신속하게 방문하여 일상의 피로를 말끔히 풀어드립니다.
            </p>
            <p>
              엄선된 천연 아로마 오일과 림프 순환 케어를 통해 굳어진 근육을 부드럽게 이완해 드리며, 선입금 없는 100% 현장 후불제로 안심하고 편안하게 이용하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-[#00ff88]">COURSE 01</span>
              <h3 className="font-extrabold text-white text-base">감성 스웨디시 케어</h3>
              <p className="text-xs text-gray-400">부드러운 오일링과 림프 이완 중심</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-[#ba8cff]">COURSE 02</span>
              <h3 className="font-extrabold text-white text-base">천연 아로마 바디케어</h3>
              <p className="text-xs text-gray-400">지친 심신의 안정과 깊은 순환 테라피</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <span className="text-xs font-bold text-yellow-400">COURSE 03</span>
              <h3 className="font-extrabold text-white text-base">1:1 프라이빗 릴렉싱</h3>
              <p className="text-xs text-gray-400">체형과 컨디션에 맞춘 집중 힐링</p>
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
                return (
                  <Link
                    key={otherDong.slug}
                    href={`/massage/${city}/${district}/${otherDong.slug}`}
                    className="py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/25 transition-all truncate text-center"
                  >
                    {otherDong.name}
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