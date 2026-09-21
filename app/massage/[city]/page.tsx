import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// 정확히 60개의 겹치지 않는 순차적 타이틀 풀
const DISTRICT_EXACT_60_TITLES = [
  "{{district}} 출장 전문 프리미엄 마사지 안내",
  "{{city}} {{district}} 맞춤형 출장 스페셜 마사지",
  "{{district}} 힐링 출장 테라피와 명품 마사지",
  "{{city}} {{district}} 신속 출장 방문 마사지 가이드",
  "{{district}} 프리미엄 출장 케어 및 마사지 서비스",
  "{{city}} {{district}} 로열 출장 바디케어 마사지",
  "{{district}} 안심 출장 전문 릴렉스 마사지",
  "{{city}} {{district}} VIP 출장 맞춤형 마사지 코스",
  "{{district}} 감동 출장 테라피 마사지 솔루션",
  "{{city}} {{district}} 최고급 출장 힐링 마사지 센터",
  "{{district}} 스마트 출장 바디 마사지 안내",
  "{{city}} {{district}} 스위트 출장 케어 마사지",
  "{{district}} 디럭스 출장 전문 마사지 프로그램",
  "{{city}} {{district}} 퍼펙트 출장 방문 마사지",
  "{{district}} 시그니처 출장 릴렉싱 마사지",
  "{{city}} {{district}} 오리지널 출장 마사지 가이드",
  "{{district}} 엘리트 출장 테라피 마사지 서비스",
  "{{city}} {{district}} 클래식 출장 바디케어 마사지",
  "{{district}} 소울 출장 맞춤 마사지 센터",
  "{{city}} {{district}} 하모니 출장 힐링 마사지",
  "{{district}} 밸런스 출장 스페셜 마사지 안내",
  "{{city}} {{district}} 리프레시 출장 방문 마사지",
  "{{district}} 바이탈 출장 케어 마사지 코스",
  "{{city}} {{district}} 에너지 출장 릴렉스 마사지",
  "{{district}} 아로마 출장 전문 마사지 솔루션",
  "{{city}} {{district}} 스웨디시 출장 바디 마사지",
  "{{district}} 딥테라피 출장 마사지 프로그램",
  "{{district}} 순환 출장 맞춤형 마사지 가이드",
  "{{city}} {{district}} 쉼터 출장 힐링 마사지 서비스",
  "{{district}} 안식처 출장 전문 마사지 센터",
  "{{city}} {{district}} 재충전 출장 바디케어 마사지",
  "{{district}} 피로회복 출장 스페셜 마사지",
  "{{city}} {{district}} 심신이완 출장 방문 마사지",
  "{{district}} 포레스트 출장 릴렉스 마사지",
  "{{city}} {{district}} 오션 출장 케어 마사지 코스",
  "{{city}} {{district}} 스카이 출장 맞춤 마사지 솔루션",
  "{{district}} 스타 출장 힐링 마사지 안내",
  "{{district}} 빛고을 출장 전문 마사지",
  "{{district}} 가람 출장 바디 마사지 프로그램",
  "{{city}} {{district}} 나루 출장 스페셜 마사지",
  "{{district}} 미르 출장 릴렉싱 마사지 가이드",
  "{{city}} {{district}} 누리 출장 방문 마사지 서비스",
  "{{district}} 아라 출장 맞춤형 마사지 센터",
  "{{city}} {{district}} 마루 출장 힐링 마사지 코스",
  "{{district}} 한울 출장 전문 바디케어 마사지",
  "{{city}} {{district}} 온누리 출장 스페셜 마사지",
  "{{district}} 체인지 출장 케어 마사지 솔루션",
  "{{city}} {{district}} 리부트 출장 릴렉스 마사지",
  "{{district}} 나이트 출장 방문 마사지 가이드",
  "{{city}} {{district}} 모닝 출장 맞춤 마사지 서비스",
  "{{district}} 데일리 출장 힐링 마사지 센터",
  "{{district}} 위클리 출장 전문 바디 마사지",
  "{{district}} 그린 출장 스페셜 마사지 코스",
  "{{city}} {{district}} 블루 출장 릴렉싱 마사지",
  "{{district}} 골드 출장 방문 마사지 솔루션",
  "{{district}} 실버 출장 맞춤형 마사지 안내",
  "{{district}} 퍼플 출장 힐링 마사지 가이드",
  "{{city}} {{district}} 로즈 출장 전문 바디케어",
  "{{district}} 샌드 출장 스페셜 마사지 서비스",
  "{{city}} {{district}} 정성 출장 릴렉스 마사지 코스"
];

// 정확히 60개의 겹치지 않는 순차적 메타 디스크립션 풀 (출장 및 마사지 분리 포함)
const DISTRICT_EXACT_60_DESCRIPTIONS = [
  "{{city}} {{district}} 전 지역에서 진행하는 신속한 출장 서비스로, 뭉친 근육을 풀어드리는 편안한 마사지 테라피입니다. 100% 현장 후불제.",
  "{{city}} {{district}} 고객님들께 찾아가는 출장 방문 시스템과 함께 힐링을 선사하는 전문 마사지 프로그램을 안내해 드립니다.",
  "{{district}} 전역 완벽한 출장 케어를 통해 일상의 피로를 녹여줄 품격 있는 맞춤형 마사지 서비스를 지금 경험해 보세요.",
  "{{city}} {{district}} 어디서나 편리하게 부를 수 있는 출장 테라피와 지친 심신을 달래줄 릴렉스 마사지를 만나보세요.",
  "{{district}} 신속한 출장 방문으로 편안함을 더하고, 전문적인 손길로 진행되는 마사지로 최고의 만족을 드립니다.",
  "{{city}} {{district}} 프라이빗한 출장 서비스를 바탕으로 누적된 피로를 말끔히 해소해 주는 전문 마사지 안내입니다.",
  "{{district}} 안심하고 이용하실 수 있는 출장 프로그램과 함께 맑고 건강한 바디 컨디션을 되찾아 주는 마사지 코스.",
  "{{city}} {{district}} VIP 고객 맞춤형 출장 케어 서비스. 지친 하루를 완벽하게 채워줄 힐링 마사지를 제공합니다.",
  "{{district}} 감동을 전하는 전문 출장 방문 시스템과 세심한 테라피스트의 손길이 닿는 마사지 프로그램.",
  "{{city}} {{district}} 최고급 출장 방문 솔루션. 일상의 무거움을 날려버릴 프리미엄 마사지 테라피를 만나보세요.",
  "{{district}} 스마트한 출장 예약 시스템을 통해 빠르고 정확하게 진행되는 맞춤형 마사지 바디케어 서비스.",
  "{{city}} {{district}} 스위트한 휴식을 선물하는 출장 방문 테라피와 함께 몸과 마음을 정돈하는 마사지 안내.",
  "{{district}} 디럭스급 출장 케어 서비스로 고객님의 계신 곳까지 직접 찾아가 편안한 마사지를 선사합니다.",
  "{{city}} {{district}} 퍼펙트한 출장 방문 솔루션. 지친 일상에 활력을 불어넣는 전문 마사지 프로그램.",
  "{{district}} 시그니처 출장 방문 테라피로 프라이빗하고 안심할 수 있는 릴렉싱 마사지를 경험해 보세요.",
  "{{city}} {{district}} 오리지널 출장 케어의 진수. 몸의 밸런스를 되찾아 주는 전문 마사지 안내.",
  "{{district}} 엘리트 테라피스트의 신속한 출장 방문과 함께 깊은 휴식을 안겨주는 품격 있는 마사지 서비스.",
  "{{city}} {{district}} 클래식한 출장 바디케어 시스템으로 뭉친 피로를 부드럽게 이완시키는 마사지 코스.",
  "{{district}} 소울풀한 힐링을 더해주는 출장 방문 테라피. 지친 몸을 치유하는 전문 마사지 솔루션.",
  "{{city}} {{district}} 완벽한 조화를 이루는 출장 케어 서비스와 함께 심신을 평온하게 만드는 마사지 안내.",
  "{{district}} 밸런스 유지를 위한 전문 출장 방문 프로그램과 피로 회복을 위한 릴렉스 마사지.",
  "{{city}} {{district}} 리프레시를 선사하는 출장 테라피 서비스로 가벼운 몸을 만들어주는 전문 마사지.",
  "{{district}} 바이탈 에너지를 채워주는 출장 방문 케어와 일상의 스트레스를 날리는 마사지 프로그램.",
  "{{city}} {{district}} 활력 넘치는 하루를 위한 출장 테라피 서비스 및 편안한 바디 마사지 안내.",
  "{{district}} 아로마 향기와 함께 찾아가는 출장 방문 시스템으로 심신의 안정을 찾는 마사지 코스.",
  "{{city}} {{district}} 스웨디시 감성의 부드러운 출장 케어와 품격 있는 힐링 마사지를 경험해 보세요.",
  "{{district}} 딥테라피 전문 출장 방문 서비스를 통해 깊은 근육의 피로까지 확실하게 풀어주는 마사지.",
  "{{city}} {{district}} 순환을 돕는 전문 출장 케어 시스템과 편안한 휴식을 약속하는 마사지 안내.",
  "{{district}} 쉼이 필요한 순간 찾아가는 출장 방문 테라피로 재충전의 시간을 갖는 마사지 프로그램.",
  "{{city}} {{district}} 안식처 같은 편안함을 드리는 출장 케어 서비스 및 전문 바디 마사지.",
  "{{district}} 확실한 재충전을 위한 출장 방문 테라피와 뭉친 근육을 부드럽게 관리하는 마사지.",
  "{{city}} {{district}} 피로 회복에 특화된 출장 케어 서비스와 함께 최상의 힐링 마사지를 만나보세요.",
  "{{district}} 심신 이완을 돕는 출장 방문 시스템으로 가벼운 발걸음을 선사하는 전문 마사지 안내.",
  "{{district}} 포레스트의 싱그러움을 담은 출장 케어 서비스와 편안한 힐링 마사지 프로그램.",
  "{{city}} {{district}} 오션뷰처럼 시원한 휴식을 드리는 출장 방문 테라피 및 맞춤 마사지 코스.",
  "{{district}} 스카이급 만족도를 선사하는 전문 출장 케어와 일상의 피로를 씻어내는 마사지.",
  "{{city}} {{district}} 스타 베테랑 테라피스트의 신속한 출장 방문 서비스와 고품격 힐링 마사지.",
  "{{district}} 빛고을의 정성을 담은 출장 방문 테라피로 몸과 마음을 치유하는 전문 마사지.",
  "{{district}} 가람처럼 유연한 바디를 만들어주는 출장 케어 서비스와 맞춤형 마사지 안내.",
  "{{city}} {{district}} 새로운 시작을 돕는 출장 방문 테라피와 함께 가벼워지는 마사지 코스.",
  "{{district}} 미르의 신비로운 휴식을 선사하는 출장 케어 서비스 및 전문 바디 마사지.",
  "{{city}} {{district}} 온 누리에 편안함을 전하는 출장 방문 시스템과 힐링 마사지 프로그램.",
  "{{district}} 아라처럼 넓고 깊은 휴식을 드리는 출장 케어 서비스 및 맞춤 마사지 안내.",
  "{{city}} {{district}} 든든한 마루 같은 안심 출장 방문 테라피로 피로를 날리는 마사지.",
  "{{district}} 한울타리 같은 정성으로 찾아가는 출장 케어 서비스와 전문 힐링 마사지.",
  "{{city}} {{district}} 온누리 전역에서 만나는 신속한 출장 방문 테라피 및 바디 마사지.",
  "{{district}} 확실한 변화를 체감하는 출장 케어 서비스와 일상의 피로를 지우는 마사지.",
  "{{city}} {{district}} 리부트 타임을 선사하는 출장 방문 테라피와 전문 맞춤 마사지 코스.",
  "{{district}} 나이트 시간대에도 편리하게 이용하는 출장 케어 서비스와 편안한 마사지.",
  "{{city}} {{district}} 상쾌한 모닝 힐링을 전하는 출장 방문 테라피 및 바디 마사지 안내.",
  "{{district}} 데일리 피로 누적을 해결하는 전문 출장 케어와 품격 있는 힐링 마사지.",
  "{{city}} {{district}} 위클리 스트레스를 날려버리는 출장 방문 테라피와 맞춤 마사지.",
  "{{district}} 그린빛 휴식을 선물하는 출장 케어 서비스와 편안한 바디 마사지 프로그램.",
  "{{city}} {{district}} 블루 컬러의 안정감을 주는 출장 방문 테라피 및 릴렉스 마사지.",
  "{{district}} 골드급 만족도를 자랑하는 전문 출장 케어와 최고급 힐링 마사지 코스.",
  "{{city}} {{district}} 실버 세대부터 젊은층까지 만족하는 출장 방문 테라피 및 맞춤 마사지.",
  "{{district}} 퍼플빛 로맨틱한 휴식을 드리는 출장 케어 서비스와 전문 바디 마사지.",
  "{{city}} {{district}} 장미꽃 같은 편안함을 안겨주는 출장 방문 테라피와 힐링 마사지.",
  "{{district}} 부드러운 모래결 같은 손길의 출장 케어 서비스와 편안한 마사지 프로그램.",
  "{{city}} {{district}} 정성을 다해 찾아가는 출장 방문 시스템으로 감동을 주는 마사지 안내."
];

// 전역 순차 인덱스 추출 함수 (60개 고유 패턴 1:1 매칭)
function getSequentialDistrictContent(cityName: string, districtName: string) {
  const allDistricts: { city: string; district: string }[] = [];
  Object.entries(CITIES_DATA).forEach(([cSlug, cData]) => {
    cData.districts.forEach((dData) => {
      allDistricts.push({ city: cData.name, district: dData.name });
    });
  });

  const currentIndex = allDistricts.findIndex(
    (item) => item.city === cityName && item.district === districtName
  );
  
  const targetIndex = currentIndex !== -1 ? currentIndex : 0;
  const safeIndex = targetIndex % DISTRICT_EXACT_60_TITLES.length;

  const rawTitle = DISTRICT_EXACT_60_TITLES[safeIndex];
  const rawDesc = DISTRICT_EXACT_60_DESCRIPTIONS[safeIndex];

  const title = rawTitle
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{city\}\}/g, cityName);

  const description = rawDesc
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{city\}\}/g, cityName);

  return { title, description };
}

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

export async function generateMetadata({ params }: { params: Promise<{ city: string; district: string }> }) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  if (!cityInfo || !districtInfo) return {};

  const content = getSequentialDistrictContent(cityInfo.name, districtInfo.name);

  // 1. 타이틀: '출장'과 '마사지' 포함, 60개 고유 순차 회전
  const title = content.title + " | " + BRAND_NAME;
  
  // 2. 메타 디스크립션: '출장'과 '마사지'가 절대 붙지 않고 넓게 분리된 60개 고유 순차 회전
  const description = content.description + " 선입금 없는 안전한 100% 현장 후불제.";
  
  const url = DOMAIN + "/massage/" + city + "/" + district;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: BRAND_NAME + " " + cityInfo.name + " " + districtInfo.name, locale: "ko_KR", type: "website" },
  };
}

export default async function DistrictMassagePage({ params }: { params: Promise<{ city: string; district: string }> }) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  if (!cityInfo || !districtInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const areaName = cityInfo.name + " " + districtInfo.name;
  const content = getSequentialDistrictContent(cityInfo.name, districtInfo.name);

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href={"/massage/" + city} className="text-xs text-gray-300 hover:text-white">← {cityInfo.name} 전체보기</Link>
          <a href={"tel:" + cityInfo.phone} className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105" style={{ backgroundColor: mainColor }}>
            📞 {districtInfo.name} 예약 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        <div>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border" style={{ color: mainColor, borderColor: mainColor + "40", backgroundColor: mainColor + "15" }}>
            {areaName} PROGRAM
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-4">{content.title}</h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* 샵 소개 및 안내 섹션 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {areaName} 프리미엄 홈 바디케어 안내
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {areaName} 전 지역(호텔, 오피스텔, 주거지 등) 어디서나 편안하게 휴식하실 수 있도록 전문 테라피스트가 직접 방문하여 힐링 케어를 선사합니다.
            </p>
            <p>
              누적된 피로와 뭉친 근육을 부드럽게 이완시켜 드리며, 선입금 없는 100% 현장 후불제로 안전하고 투명하게 이용하실 수 있습니다.
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

        {/* 동별 이동 링크 섹션 */}
        <section className="text-left space-y-4">
          <h2 className="text-xl font-bold text-gray-300">📍 {districtInfo.name} 동별 상세 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {districtInfo.dongs.map((dong) => (
              <Link key={dong.slug} href={"/massage/" + city + "/" + district + "/" + dong.slug} className="py-2.5 px-3 rounded-xl bg-[#140f24] border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/20 transition-all text-center truncate">
                {dong.name} 마사지
              </Link>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a href={"tel:" + cityInfo.phone} className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all" style={{ backgroundColor: mainColor }}>
          📞 {districtInfo.name} 빠른 예약 연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}