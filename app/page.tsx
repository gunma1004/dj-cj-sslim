import Link from "next/link";
import { CITIES_DATA } from "@/app/data";

export default function HomePage() {
  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen pb-24">
      {/* 상단 퀵 알림 바: 이벤트 전용 바로가기 */}
      <div className="bg-gradient-to-r from-rose-950 via-purple-950 to-indigo-950 border-b border-rose-500/30 px-4 py-2 text-center text-xs sm:text-sm font-medium">
        <Link
          href="/event"
          className="inline-flex items-center gap-2 text-rose-300 hover:text-white transition"
        >
          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold border border-rose-500/30">
            EVENT
          </span>
          <span>대전·청주 오픈 기념 첫 방문 10,000원 즉시 할인 &amp; 제휴 혜택 진행 중!</span>
          <span className="text-white/60">자세히 보기 →</span>
        </Link>
      </div>

      {/* 상단 히어로 배너 섹션 */}
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
            {/* 이벤트 페이지 바로가기 버튼 */}
            <Link
              href="/event"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-semibold transition-all duration-200 shadow-lg shadow-rose-600/20 text-center flex items-center justify-center gap-2"
            >
              🎁 특별 할인 이벤트 확인
            </Link>
            <a
              href="#area"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-medium transition-colors duration-200 text-center"
            >
              지역별 서비스 안내
            </a>
          </div>
        </div>
      </section>

      {/* 🎁 메인 중간: 진행 중인 이벤트 퀵 하이라이트 섹션 */}
      <section className="py-12 px-4 max-w-[1160px] mx-auto">
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-[#140f24] border border-rose-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block text-xs font-bold text-rose-400 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full">
              SPECIAL PROMOTIONS
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              대전·청주 고객님을 위한 단독 프로모션
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
              첫 방문 고객 1만원 즉시 차감, 낮 시간대 얼리버드 오일 업그레이드, 리뷰 작성 시 10분 연장권까지 풍성한 혜택을 놓치지 마세요.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/event/daejeon"
              className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-[#00ff88]/15 border border-[#00ff88]/40 text-[#00ff88] font-bold text-xs sm:text-sm hover:bg-[#00ff88]/25 text-center transition"
            >
              대전 이벤트 보기 →
            </Link>
            <Link
              href="/event/cheongju"
              className="flex-1 md:flex-initial px-5 py-3 rounded-xl bg-[#ba8cff]/15 border border-[#ba8cff]/40 text-[#ba8cff] font-bold text-xs sm:text-sm hover:bg-[#ba8cff]/25 text-center transition"
            >
              청주 이벤트 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* 권역별 바로가기 섹션 */}
      <main id="area" className="py-10 px-4 max-w-[1160px] mx-auto space-y-16">
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
                className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 space-y-6 shadow-xl relative overflow-hidden"
              >
                {/* 시 바로가기 헤더 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                      {city.name} 지역
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">24시간 신속 방문 홈 테라피</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* 해당 시 이벤트 페이지 바로가기 버튼 */}
                    <Link
                      href={"/event/" + citySlug}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 transition-all text-center"
                    >
                      🎁 {city.name} 이벤트
                    </Link>
                    {/* 해당 시 마사지 서비스 바로가기 버튼 */}
                    <Link
                      href={"/massage/" + citySlug}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-black transition-transform hover:scale-105 text-center"
                      style={{ backgroundColor: accentColor }}
                    >
                      서비스 안내 →
                    </Link>
                  </div>
                </div>

                {/* 구별 / 동별 마사지 페이지 링크 목록 */}
                <div className="space-y-4">
                  {city.districts.map((district) => (
                    <div key={district.slug} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={"/massage/" + citySlug + "/" + district.slug}
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
                            href={"/massage/" + citySlug + "/" + district.slug + "/" + dong.slug}
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