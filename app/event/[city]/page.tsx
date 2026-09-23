import Link from "next/link";
import { notFound } from "next/navigation";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

// 1. 빌드 시 대전, 청주 정적 페이지 자동 생성 (SSG)
export async function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((citySlug) => ({
    city: citySlug,
  }));
}

export const dynamicParams = false;

// 2. 도시(대전/청주) 동적 SEO 메타데이터
export async function generateMetadata({ params }: PageProps) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];
  if (!cityInfo) return {};

  const title = `${cityInfo.name} 스웨디시 마사지 이벤트 추천｜전국 아로마 홈타이 할인 총정리 - ${BRAND_NAME}`;
  const districtNames = cityInfo.districts.map((d) => d.name).join(", ");
  const description = `${BRAND_NAME}에서 ${cityInfo.name} 출장마사지 및 스웨디시 홈케어 오픈 할인 이벤트를 만나보세요. 100% 현장 후불제로 ${districtNames} 전 지역 첫 방문 1만원 할인 혜택과 실시간 전화 예약 안내.`;
  const url = `${DOMAIN}/event/${city}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${cityInfo.name} 이벤트`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CityEventPage({ params }: PageProps) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return notFound();

  // 대전은 네온 그린, 청주는 소프트 퍼플 컬러로 자동 분기
  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";

  const seoTitle = `${cityInfo.name} 스웨디시 마사지 이벤트 추천｜전국 아로마 홈타이 할인 총정리`;
  const seoDesc = `${BRAND_NAME}에서 ${cityInfo.name} 출장마사지 및 감성 스웨디시 특별 프로모션을 경험하세요. 전문 테라피스트가 30분 내외로 직접 방문하며 선입금 없는 100% 현장 후불제로 안전하게 진행됩니다.`;

  // 도시별 맞춤형 이벤트 혜택 리스트
  const cityEvents = [
    {
      id: 1,
      badge: "신규 고객 웰컴",
      title: `${cityInfo.name} 전 지역 첫 방문 즉시 10,000원 할인`,
      desc: `${cityInfo.name} ${cityInfo.districts.map((d) => d.name).join(", ")} 어디서나 첫 예약 시 기본 코스에서 10,000원을 즉시 차감해 드립니다.`,
      reward: "10,000원 즉시 할인",
      condition: `예약 접수 시 [${cityInfo.name} 첫방문] 코드 전달`,
    },
    {
      id: 2,
      badge: "타임 특가",
      title: "낮 시간대 & 심야 나이트 얼리버드 케어",
      desc: "여유로운 낮 시간(12시~18시) 또는 늦은 심야 예약 시 최고급 천연 에센셜 아로마 오일로 무상 업그레이드해 드립니다.",
      reward: "프리미엄 오일 무료 UP",
      condition: "60분 이상 전 코스 예약 적용",
    },
    {
      id: 3,
      badge: "지인 추천 & 리뷰",
      title: "정성 후기 작성 및 지인 소개 더블 캐시백",
      desc: `케어 후 만족스러운 이용 후기를 남겨주시거나 ${cityInfo.name} 지인을 소개해 주시면 다음 이용 시 사용 가능한 10분 연장권을 증정합니다.`,
      reward: "+10분 코스 연장권",
      condition: "후기 확인 또는 동반/소개 시 지급",
    },
  ];

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* GNB 헤더 */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/event" className="text-xs text-gray-300 hover:text-white transition">
            ← 전체 이벤트 목록
          </Link>
          <a
            href={`tel:${cityInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
            style={{ backgroundColor: mainColor }}
          >
            📞 {cityInfo.name} 이벤트 실시간 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        {/* 상단 타이틀 섹션 */}
        <div>
          <span
            className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border tracking-wider"
            style={{
              color: mainColor,
              borderColor: `${mainColor}40`,
              backgroundColor: `${mainColor}15`,
            }}
          >
            {cityInfo.name.toUpperCase()} SPECIAL EVENT
          </span>
          <h1 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
            {seoTitle}
          </h1>
          <p className="text-[#e1d9f5] text-sm sm:text-base max-w-[680px] mx-auto leading-relaxed">
            {seoDesc}
          </p>
        </div>

        {/* 🎁 진행 중인 프로모션 카드 섹션 */}
        <section className="space-y-4 text-left">
          {cityEvents.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#140f24] border border-white/10 hover:border-white/25 transition shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full font-bold border inline-block"
                  style={{
                    color: mainColor,
                    borderColor: `${mainColor}40`,
                    backgroundColor: `${mainColor}15`,
                  }}
                >
                  {item.badge}
                </span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-300 max-w-xl leading-relaxed">
                  {item.desc}
                </p>
                <p className="text-xs text-gray-400">
                  조건: <span className="text-gray-300">{item.condition}</span>
                </p>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between pt-3 md:pt-0 border-t border-white/5 md:border-0 shrink-0">
                <span className="text-xs text-gray-400 md:mb-1">혜택</span>
                <span className="text-base sm:text-lg font-extrabold" style={{ color: mainColor }}>
                  {item.reward}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* 도시 전용 안심 보장 안내 섹션 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {cityInfo.name} 이벤트 이용 고객 안심 가이드
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {cityInfo.name} 전 지역 어디든 고객님이 계신 자택, 오피스텔, 호텔 등으로 전문 테라피스트가 30분 내외 신속하게 방문합니다.
            </p>
            <p>
              어떠한 경우에도 <strong>선입금이나 예약금을 요구하지 않는 100% 현장 후불제</strong>로 운영되므로 입금 피해 걱정 없이 안전하고 편안하게 혜택을 누리실 수 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <p className="font-bold text-white text-sm">⏱ 30분 신속 도착</p>
              <p className="text-xs text-gray-400">{cityInfo.name} 전역 상시 기동 대기</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <p className="font-bold text-white text-sm">💳 100% 현장 후불</p>
              <p className="text-xs text-gray-400">관리사 도착 후 직접 확인 결제</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <p className="font-bold text-white text-sm">🎁 중복 혜택 상담</p>
              <p className="text-xs text-gray-400">24시 실시간 최적 코스 추천</p>
            </div>
          </div>
        </section>

        {/* 📍 구별 이벤트 세부 페이지 링크 섹션 */}
        <section className="text-left space-y-4">
          <h2 className="text-xl font-bold text-gray-300">
            📍 {cityInfo.name} 구별 단독 이벤트 확인하기
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cityInfo.districts.map((district) => (
              <div
                key={district.slug}
                className="p-5 rounded-2xl bg-[#140f24] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-extrabold text-white text-base">
                      {district.name} 이벤트
                    </span>
                    <span className="text-xs text-gray-400">
                      {district.dongs.length}개 동 진행 중
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-1">
                    {district.dongs.slice(0, 4).map((d) => d.name).join(", ")} 등
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {district.dongs.slice(0, 3).map((dong) => (
                    <Link
                      key={dong.slug}
                      href={`/event/${city}/${district.slug}/${dong.slug}`}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 transition"
                    >
                      {dong.name} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 다른 도시 이벤트 링크 버튼 */}
        <div className="flex justify-center pt-2">
          {Object.entries(CITIES_DATA)
            .filter(([slug]) => slug !== city)
            .map(([otherSlug, otherCity]) => (
              <Link
                key={otherSlug}
                href={`/event/${otherSlug}`}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-white/5 text-gray-300 hover:bg-white/15 border border-white/10 transition"
              >
                {otherCity.name} 이벤트 바로가기 →
              </Link>
            ))}
        </div>
      </main>

      {/* 모바일 하단 플로팅 예약 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {cityInfo.name} 이벤트 즉시 할인 적용 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}