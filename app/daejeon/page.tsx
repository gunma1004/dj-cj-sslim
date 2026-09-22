import Link from "next/link";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

const CITY_KEY = "daejeon";

export async function generateMetadata() {
  const cityInfo = CITIES_DATA[CITY_KEY];
  if (!cityInfo) return {};

  const title = "대전 스웨디시 마사지 추천 전국 타이 아로마 케어 총정리 | " + BRAND_NAME;
  const description = `${BRAND_NAME}에서 대전 출장마사지 와 스웨디시마사지를 경험하세요 전문적인 테라피스트가 고객님의 집 호텔 오피스로 직접 방문 코스 가격과 관리사 정보를 확인하고 전화 ,문자로 예약하세요`;
  const url = DOMAIN + "/" + CITY_KEY;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { 
      title, 
      description, 
      url, 
      siteName: BRAND_NAME + " " + cityInfo.name, 
      locale: "ko_KR", 
      type: "website" 
    },
  };
}

export default async function DaejeonPage() {
  const cityInfo = CITIES_DATA[CITY_KEY];
  if (!cityInfo) return notFound();

  const mainColor = "#00ff88"; // 대전 전용 포인트 컬러
  const seoTitle = "대전 스웨디시 마사지 추천 전국 타이 아로마 케어 총정리";
  const seoDesc = `${BRAND_NAME}에서 대전 출장마사지 와 스웨디시마사지를 경험하세요 전문적인 테라피스트가 고객님의 집 호텔 오피스로 직접 방문 코스 가격과 관리사 정보를 확인하고 전화 ,문자로 예약하세요`;

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
          <h1 className="text-3xl sm:text-5xl font-black mb-4">{seoTitle}</h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {seoDesc}
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
              <Link key={district.slug} href={"/massage/" + CITY_KEY + "/" + district.slug} className="p-4 rounded-2xl bg-[#140f24] border border-white/10 hover:border-white/30 transition-all block">
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