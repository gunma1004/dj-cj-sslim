import Link from "next/link";
import { CITIES_DATA, BRAND_NAME } from "@/app/data";

export default function HomePage() {
  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen pb-24">
      {/* 상단 배너 섹션 (컴포넌트 의존성 제거) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-20 md:py-28 px-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            대전·청주 전 지역 프라이빗 케어
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight whitespace-pre-line text-slate-100">
            지친 하루의 완벽한 힐링,{"\n"}프리미엄 홈 테라피
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            전문 테라피스트가 계신 곳으로 신속하게 방문하여 편안한 바디 컨디셔닝을 도와드립니다.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:0507-1280-3335"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200 shadow-lg shadow-indigo-600/30 text-center"
            >
              📞 실시간 예약 문의
            </a>
            <a
              href="#area"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-medium transition-colors duration-200 text-center"
            >
              지역별 서비스 안내 보기
            </a>
          </div>
        </div>
      </section>

      {/* 지역별 /massage 페이지 바로가기 섹션 */}
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
                      {city.name} 지역
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