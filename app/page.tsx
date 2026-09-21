import Link from "next/link";
import MainBanner from "@/components/MainBanner";
import { CITIES_DATA, BRAND_NAME } from "@/app/data";

export default function HomePage() {
  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen pb-24">
      {/* 상단 메인 배너 컴포넌트 */}
      <MainBanner 
        badge="대전·청주 전 지역 프라이빗 케어"
        title="지친 하루의 완벽한 힐링,\n프리미엄 홈 테라피"
        description="전문 테라피스트가 계신 곳으로 신속하게 방문하여 편안한 바디 컨디셔닝을 도와드립니다."
        primaryCtaText="📞 실시간 예약 문의"
        primaryCtaLink="tel:0507-1280-3335"
        secondaryCtaText="지역별 서비스 안내 보기"
        secondaryCtaLink="#area"
      />
      
      {/* 💡 새로 추가된 지역별 /massage 페이지 바로가기 섹션 */}
      <main id="area" className="py-16 px-4 max-w-[1160px] mx-auto space-y-16">
        <div className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-indigo-500/15 text-[#00ff88] border border-[#00ff88]/30">
            QUICK NAVIGATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            전국 주요 권역별 마사지 서비스 안내
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            원하시는 지역을 선택하시면 상세한 맞춤형 케어 프로그램을 확인하실 수 있습니다.
          </p>
        </div>

        {/* 시 단위 및 하위 구/동 마사지 페이지 링크 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(CITIES_DATA).map(([citySlug, city]) => {
            const isDaejeon = citySlug === "daejeon";
            const accentColor = isDaejeon ? "#00ff88" : "#ba8cff";

            return (
              <div 
                key={citySlug}
                className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 space-y-6 shadow-xl"
              >
                {/* 시 바로가기 헤더 */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-white">
                      {cityInfoName(city.name)} 지역
                    </h3>
                    <p className="text-xs text-gray-400">24시간 신속 방문 홈 테라피</p>
                  </div>
                  <Link
                    href={"/" + citySlug + "/massage"}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-black transition-transform hover:scale-105"
                    style={{ backgroundColor: accentColor }}
                  >
                    {city.name} 마사지 전체보기 →
                  </Link>
                </div>

                {/* 구별 / 동별 마사지 페이지 링크 목록 */}
                <div className="space-y-4">
                  {city.districts.map((district) => (
                    <div key={district.slug} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={"/" + citySlug + "/" + district.slug + "/massage"}
                          className="text-sm font-bold text-gray-200 hover:text-white flex items-center gap-1"
                        >
                          <span style={{ color: accentColor }}>📍</span> {district.name} 마사지
                        </Link>
                      </div>

                      {/* 하위 동 버튼들 */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 pt-1">
                        {district.dongs.map((dong) => (
                          <Link
                            key={dong.slug}
                            href={"/" + citySlug + "/" + district.slug + "/" + dong.slug + "/massage"}
                            className="py-1.5 px-1 text-center rounded-lg bg-white/5 border border-white/5 text-[11px] text-gray-300 font-medium hover:bg-white/20 transition-all truncate"
                          >
                            {dong.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function cityInfoName(name: string) {
  return name;
}