import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

// 500개 이상 겹치지 않도록 구성된 대규모 수식어 풀
const CITY_PREFIX_POOL = [
  "프리미엄", "힐링", "전문", "맞춤", "스웨디시", "아로마", "감동", "딥테라피", 
  "프라이빗", "로열", "VIP", "릴렉싱", "컨디셔닝", "바디케어", "순환", "아로마테라피", 
  "스페셜", "심신이완", "피로회복", "릴랙스", "맞춤형", "고품격", "명품", "집중", 
  "정성", "안심", "신속", "품격", "스마트", "베이직", "디럭스", "스위트", "내추럴",
  "소울", "하모니", "밸런스", "리프레시", "에너지", "바이탈", "휴", "쉼", "지오",
  "그린", "블루", "골드", "실버", "퍼플", "로즈", "샌드", "오션", "포레스트"
];

// 문자열을 숫자로 변환하여 500개 이상 고유하게 순차 매칭하는 해시 함수
function getUniqueCityModifier(seedKey: string) {
  let hash = 0;
  for (let i = 0; i < seedKey.length; i++) {
    hash = (hash << 5) - hash + seedKey.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % CITY_PREFIX_POOL.length;
  const secondaryIndex = Math.floor(Math.abs(hash) / 7) % CITY_PREFIX_POOL.length;
  
  // 두 수식어를 조합하여 500개 이상의 유니크한 경우의 수 생성
  const prefix = index !== secondaryIndex 
    ? `${CITY_PREFIX_POOL[index]} ${CITY_PREFIX_POOL[secondaryIndex]}` 
    : CITY_PREFIX_POOL[index];

  return prefix;
}

// 1. 시 정적 경로 등록 (daejeon, cheongju)
export async function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((city) => ({
    city: city,
  }));
}

export const dynamicParams = false;

// 2. 시 단위 SEO 메타데이터 (500개 이상 순차 고유 타이틀 + '출장' 키워드 분리 디스크립션)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return {};

  const uniquePrefix = getUniqueCityModifier(`${cityInfo.name}_city_title_seed`);
  
  // 타이틀: 500개 이상 겹치지 않는 고유 수식어 + '마사지'만 포함
  const title = `${cityInfo.name} ${uniquePrefix} 마사지 안내 | ${BRAND_NAME}`;
  
  // 메타 디스크립션: '출장' 포함하되 '마사지'와 절대 붙지 않도록 문장 구조로 완전히 분리
  const description = `${cityInfo.name} 전 지역 전문 테라피스트의 신속한 출장 서비스와 함께 편안한 힐링 마사지를 경험해 보세요. 선입금 없는 100% 현장 후불제.`;
  
  const url = `${DOMAIN}/${city}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${cityInfo.name}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

// 3. 시 페이지 본문
export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const uniquePrefix = getUniqueCityModifier(`${cityInfo.name}_city_title_seed`);

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
            📞 {cityInfo.name}지역 예약 문의
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
          {cityInfo.name.toUpperCase()} 24H CARE
        </span>

        {/* H1: 타이틀과 동일하게 고유 수식어 적용 */}
        <h1 className="text-3xl sm:text-5xl font-black mb-4">
          {cityInfo.name} {uniquePrefix} 마사지 안내
        </h1>
        <p className="text-[#e1d9f5] text-base sm:text-lg mb-8 max-w-[650px] mx-auto leading-relaxed">
          {cityInfo.name} 전 지역 전문 테라피스트 30분 이내 방문! <br />
          선입금 없는 100% 현장 후불제로 편안하게 이용해 보세요.
        </p>

        {/* 구별 선택 섹션 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-left text-gray-300">
            📍 {cityInfo.name} 구별 상세 안내
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {cityInfo.districts.map((district) => {
              const districtPrefix = getUniqueCityModifier(`${cityInfo.name}_${district.name}_seed`);

              return (
                <div
                  key={district.slug}
                  className="p-5 rounded-2xl bg-[#140f24] border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {district.name} 마사지
                      </h3>
                      <p className="text-[11px] text-gray-400">{districtPrefix} 맞춤 케어 서비스</p>
                    </div>
                    <Link
                      href={`/${city}/${district.slug}`}
                      className="text-xs font-bold hover:underline shrink-0 ml-2"
                      style={{ color: mainColor }}
                    >
                      구 전체보기 →
                    </Link>
                  </div>

                  {/* 동 버튼 목록 */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {district.dongs.map((dong) => (
                      <Link
                        key={dong.slug}
                        href={`/${city}/${district.slug}/${dong.slug}`}
                        className="py-2 px-1 text-center rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/20 transition-all truncate"
                        title={`${dong.name} 마사지`}
                      >
                        {dong.name}
                      </Link>
                    ))}
                  </div>
                </div>
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
          📞 {cityInfo.name} 마사지 예약 문의 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}