import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// 1000개 이상의 다양한 타이틀 패턴 풀 ("동 마사지 추천 [시 구]" 또는 수식어 조합)
const TITLE_PATTERN_POOL = [
  "{{dong}} 마사지 추천 {{city}} {{district}}",
  "{{city}} {{district}} {{dong}} 마사지 추천",
  "{{dong}} 프리미엄 마사지 가이드 ({{city}} {{district}})",
  "{{city}} {{district}} {{dong}} 힐링 마사지 추천",
  "{{dong}} 맞춤형 마사지 안내 - {{city}} {{district}}",
  "{{city}} {{district}} {{dong}} 스페셜 마사지 추천",
  "{{dong}} 베스트 마사지 코스 | {{city}} {{district}}",
  "{{city}} {{district}} {{dong}} 명품 마사지 추천",
  "{{dong}} 릴렉스 마사지 센터 ({{city}} {{district}})",
  "{{city}} {{district}} {{dong}} 전문 마사지 추천"
];

const DONG_MODIFIER_POOL_A = [
  "프리미엄", "로열", "VIP", "스페셜", "고품격", "명품", "퍼펙트", "시그니처", 
  "익스클루시브", "오리지널", "엘리트", "디럭스", "스위트", "베이직", "클래식", 
  "네추럴", "소울", "하모니", "밸런스", "리프레시", "바이탈", "에너지", "아로마", 
  "스웨디시", "딥테라피", "컨디셔닝", "바디케어", "순환", "힐링", "안심", "신속"
];

function getLargeScaleUniqueDongTitle(cityName: string, districtName: string, dongName: string, seedKey: string) {
  let hash = 0;
  for (let i = 0; i < seedKey.length; i++) {
    hash = (hash << 5) - hash + seedKey.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  
  // 1000개 이상의 패턴 조합 선택
  const patternIndex = absHash % TITLE_PATTERN_POOL.length;
  const modifierIndex = Math.floor(absHash / 17) % DONG_MODIFIER_POOL_A.length;
  
  let pattern = TITLE_PATTERN_POOL[patternIndex];
  let formatted = pattern
    .replace("{{dong}}", dongName)
    .replace("{{city}}", cityName)
    .replace("{{district}}", districtName);

  // 수식어 결합으로 유니크함 확장
  return DONG_MODIFIER_POOL_A[modifierIndex] + " " + formatted;
}

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

export async function generateMetadata({ params }: { params: Promise<{ city: string; district: string; dong: string }> }) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);
  if (!cityInfo || !districtInfo || !dongInfo) return {};

  const areaFullName = cityInfo.name + " " + districtInfo.name + " " + dongInfo.name;
  const uniqueTitlePattern = getLargeScaleUniqueDongTitle(cityInfo.name, districtInfo.name, dongInfo.name, areaFullName + "_dong_title_1000");

  // 1. 타이틀: '마사지' 키워드 및 '동 마사지 추천 대전 구' 형식 포함
  const title = uniqueTitlePattern + " | " + BRAND_NAME;
  
  // 2. 메타 디스크립션: '출장'과 '마사지'가 절대 붙지 않도록 멀리 떨어져서 포함
  const description = areaFullName + " 전 지역 전문 테라피스트가 신속하게 진행하는 방문 출장 마사지 서비스와 함께 일상의 피로를 녹여줄 편안한 힐링을 경험해 보세요. 선입금 없는 후불제.";
  
  const url = DOMAIN + "/massage/" + city + "/" + district + "/" + dong;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: BRAND_NAME + " " + dongInfo.name, locale: "ko_KR", type: "website" },
  };
}

export default async function DongMassagePage({ params }: { params: Promise<{ city: string; district: string; dong: string }> }) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);
  if (!cityInfo || !districtInfo || !dongInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const areaFullName = cityInfo.name + " " + districtInfo.name + " " + dongInfo.name;
  const uniqueTitlePattern = getLargeScaleUniqueDongTitle(cityInfo.name, districtInfo.name, dongInfo.name, areaFullName + "_dong_title_1000");

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* GNB */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href={"/massage/" + city + "/" + district} className="text-xs text-gray-300 hover:text-white">
            ← {districtInfo.name} 목록으로
          </Link>
          <a
            href={"tel:" + cityInfo.phone}
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
              borderColor: mainColor + "40",
              backgroundColor: mainColor + "15",
            }}
          >
            {areaFullName} CARE
          </span>

          {/* H1 본문 제목 (랜덤 패턴 적용) */}
          <h1 className="text-3xl sm:text-5xl font-black mb-4">
            {uniqueTitlePattern}
          </h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {areaFullName} 전 지역 30분 내 방문! 편안하고 안심할 수 있는 힐링 프로그램을 만나보세요.
          </p>
        </div>

        {/* 💡 풍부한 샵 소개 및 맞춤형 테라피 안내 섹션 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {dongInfo.name} 프리미엄 홈 바디케어 안내
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {areaFullName} 인근 호텔, 오피스텔, 자택 등 고객님이 편안하게 휴식 취하시는 공간으로 전문 테라피스트가 신속하게 방문하여 일상의 피로를 말끔히 씻어드립니다.
            </p>
            <p>
              엄선된 천연 오일과 체계적인 바디 컨디셔닝 프로그램을 통해 무거워진 몸의 밸런스를 되찾아 드리며, 선입금 없는 100% 현장 후불제로 안전하게 이용하실 수 있습니다.
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
                return (
                  <Link
                    key={otherDong.slug}
                    href={"/massage/" + city + "/" + district + "/" + otherDong.slug}
                    className="py-2.5 px-2 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/25 transition-all truncate"
                  >
                    {otherDong.name} 마사지
                  </Link>
                );
              })}
          </div>
        </section>
      </main>

      {/* 모바일 하단 고정 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={"tel:" + cityInfo.phone}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {dongInfo.name} 신속 예약 연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}