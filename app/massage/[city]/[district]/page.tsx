import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME, getKeywordModifier } from "@/app/data";
import { notFound } from "next/navigation";

// 1000개 이상의 유니크한 조합을 만들기 위한 대규모 수식어 풀
const DISTRICT_MODIFIER_POOL_A = [
  "프리미엄", "로열", "VIP", "스페셜", "고품격", "명품", "퍼펙트", "시그니처", 
  "익스클루시브", "오리지널", "엘리트", "디럭스", "스위트", "베이직", "클래식", 
  "네추럴", "소울", "하모니", "밸런스", "리프레시", "바이탈", "에너지", "아로마", 
  "스웨디시", "딥테라피", "컨디셔닝", "바디케어", "순환", "힐링", "안심", "신속",
  "정성", "집중", "맞춤", "프로페셔널", "메디컬", "스마트", "그린", "블루", "골드"
];

const DISTRICT_MODIFIER_POOL_B = [
  "힐링", "테라피", "바디케어", "릴렉싱", "케어", "스파", "컨디셔닝", "쉼터", 
  "안식처", "재충전", "피로회복", "심신이완", "밸런스", "순환", "리프레시", "포레스트",
  "오션", "스카이", "스타", "빛고을", "가람", "나루", "미르", "누리", "아라", "마루"
];

function getLargeScaleUniqueDistrictModifier(seedKey: string) {
  let hash = 0;
  for (let i = 0; i < seedKey.length; i++) {
    hash = (hash << 5) - hash + seedKey.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const indexA = absHash % DISTRICT_MODIFIER_POOL_A.length;
  const indexB = Math.floor(absHash / 13) % DISTRICT_MODIFIER_POOL_B.length;
  const indexC = Math.floor(absHash / 31) % DISTRICT_MODIFIER_POOL_A.length;

  // 3중 조합으로 1000개 이상의 고유 패턴 생성
  return DISTRICT_MODIFIER_POOL_A[indexA] + " " + DISTRICT_MODIFIER_POOL_B[indexB] + " " + DISTRICT_MODIFIER_POOL_A[indexC];
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

  const areaName = cityInfo.name + " " + districtInfo.name;
  const uniquePrefix = getLargeScaleUniqueDistrictModifier(areaName + "_district_1000_seed");
  
  // 1. 타이틀: '마사지' 키워드 필수 포함, 1000개 이상 순차적 유니크 조합
  const title = areaName + " " + uniquePrefix + " 마사지 안내 | " + BRAND_NAME;
  
  // 2. 메타 디스크립션: '출장' 단어 포함, '마사지'와 절대 붙지 않도록 넓게 분리
  const description = areaName + " 전 지역 전문 테라피스트가 신속하게 진행하는 방문 출장 서비스와 함께 일상의 피로를 녹여줄 편안한 힐링 마사지를 경험해 보세요. 선입금 없는 후불제.";
  
  const url = DOMAIN + "/massage/" + city + "/" + district;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: BRAND_NAME + " " + areaName, locale: "ko_KR", type: "website" },
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
  const uniquePrefix = getLargeScaleUniqueDistrictModifier(areaName + "_district_1000_seed");

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
          <h1 className="text-3xl sm:text-5xl font-black mb-4">{areaName} {uniquePrefix} 마사지 안내</h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {areaName} 전 지역 고객님이 계신 곳으로 30분 내 신속하게 찾아가는 맞춤형 방문 프로그램입니다.
          </p>
        </div>

        {/* 💡 구 페이지 샵 소개 및 안내 섹션 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {areaName} 프리미엄 홈 바디케어 안내
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {areaName} 전 지역(호텔, 오피스텔, 주거지 등) 어디서나 편안하게 휴식하실 수 있도록 전문 테라피스트가 직접 방문하여 힐링 마사지를 선사합니다.
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