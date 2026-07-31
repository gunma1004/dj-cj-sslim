import Link from "next/link";
import { CITIES_DATA, DOMAIN } from "@/app/data";

export const metadata = {
  title: "대전 출장마사지 & 청주 출장마사지 | 24시 방문 힐링케어",
  // 👇 80자 이내로 수정
  description:
    "대전 및 청주 전 지역 24시 출장마사지 전문. 유성구·서구·흥덕구·청원구 30분 내 방문, 스웨디시·아로마 100% 후불제.",
  alternates: {
    canonical: DOMAIN,
  },
  openGraph: {
    title: "대전 출장마사지 & 청주 출장마사지 | 24시 방문 힐링케어",
    // 👇 80자 이내로 수정
    description:
      "대전 및 청주 전 지역 24시 출장마사지 전문. 유성구·서구·흥덕구·청원구 30분 내 방문, 스웨디시·아로마 100% 후불제.",
    url: DOMAIN,
    siteName: "대전 & 청주 출장마사지",
    locale: "ko_KR",
    type: "website",
  },
};

export default function HomePage() {
  const slimPhone = "0507-1280-3335";     // 대전 전문
  const somebodyPhone = "0507-1280-3336"; // 청주 전문

  const allLinks = Object.values(CITIES_DATA).flatMap((city) =>
    city.districts.flatMap((district) =>
      district.dongs.map((dong) => ({
        cityName: city.name,
        districtName: district.name,
        dongName: dong.name,
        url: `/${city.slug}/${district.slug}/${dong.slug}`,
        title: `${city.name} ${district.name} ${dong.name}출장마사지`,
      }))
    )
  );

  /* JSON-LD 내 전화번호(telephone) 항목 완전히 제외 */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "대전 & 청주 출장마사지 24시 방문케어",
      url: DOMAIN,
      description: "대전 및 청주 전 지역 24시간 출장마사지 전문 서비스",
      priceRange: "60,000원-150,000원",
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "대전 청주 출장마사지 서비스 지역",
      itemListElement: allLinks.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: `${DOMAIN}${item.url}`,
      })),
    },
  ];

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* 네이버 수집용 숨김 캐러셀 DOM */}
      <div className="naver-carousel-dom" aria-hidden="true">
        <ul>
          {allLinks.map((item, idx) => (
            <li key={idx}>
              <a href={item.url}>
                <strong>{item.title}</strong>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* GNB (상단바) */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="font-black text-sm sm:text-xl tracking-tight text-white flex items-center gap-1.5">
            <span className="text-[#00ff88]">대전 출장마사지</span>
            <span className="text-gray-500 font-normal text-xs">|</span>
            <span className="text-[#ba8cff]">청주 출장마사지</span>
          </Link>
          <div className="flex gap-1.5 sm:gap-2">
            <a
              href={`tel:${slimPhone}`}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#00ff88] text-black font-black text-xs hover:scale-105 transition-transform"
            >
              📞 대전 문의
            </a>
            <a
              href={`tel:${somebodyPhone}`}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#ba8cff] text-black font-black text-xs hover:scale-105 transition-transform"
            >
              📞 청주 문의
            </a>
          </div>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="py-12 px-4 max-w-[900px] mx-auto text-center">
        <span className="inline-block px-3.5 py-1 rounded-full bg-[#ba8cff]/15 text-[#ba8cff] border border-[#ba8cff]/30 font-black text-xs mb-3">
          DAEJEON & CHEONGJU 24H CARE
        </span>
        <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight mb-4 text-white">
          대전 청주 출장마사지
        </h1>
        <p className="text-[#e1d9f5] text-base sm:text-lg mb-8 max-w-[700px] mx-auto leading-relaxed">
          대전 및 청주 전 지역 24시간 30분 이내 신속히 방문해 드립니다. <br />
          선입금 없는 100% 후불제로 안심하고 이용해 보세요.
        </p>

        {/* 지역 맞춤형 전화 & 문자 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[600px] mx-auto mb-6">
          {/* 대전지역담당 카드 */}
          <div className="p-5 rounded-2xl bg-[#140f24] border border-[#00ff88]/40 text-center space-y-3">
            <div className="flex items-center justify-between border-b border-[#00ff88]/20 pb-2">
              <span className="font-black text-[#00ff88] text-lg">📍 대전지역담당</span>
              <span className="text-[11px] bg-[#00ff88]/20 text-[#00ff88] px-2 py-0.5 rounded font-bold">24시 상담</span>
            </div>
            <p className="text-xs text-gray-300">대표번호: 0507-1280-3335</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${slimPhone}`}
                className="py-3 px-2 rounded-xl bg-[#00ff88] text-black font-black text-xs sm:text-sm flex items-center justify-center gap-1 hover:scale-105 transition-all shadow-md shadow-[#00ff88]/20"
              >
                📞 대전 전화
              </a>
              <a
                href={`sms:${slimPhone}`}
                className="py-3 px-2 rounded-xl bg-white text-black font-black text-xs sm:text-sm flex items-center justify-center gap-1 hover:scale-105 transition-all"
              >
                💬 대전 문자
              </a>
            </div>
          </div>

          {/* 청주지역담당 카드 */}
          <div className="p-5 rounded-2xl bg-[#140f24] border border-[#ba8cff]/40 text-center space-y-3">
            <div className="flex items-center justify-between border-b border-[#ba8cff]/20 pb-2">
              <span className="font-black text-[#ba8cff] text-lg">📍 청주지역담당</span>
              <span className="text-[11px] bg-[#ba8cff]/20 text-[#ba8cff] px-2 py-0.5 rounded font-bold">24시 상담</span>
            </div>
            <p className="text-xs text-gray-300">대표번호: 0507-1280-3336</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={`tel:${somebodyPhone}`}
                className="py-3 px-2 rounded-xl bg-[#ba8cff] text-black font-black text-xs sm:text-sm flex items-center justify-center gap-1 hover:scale-105 transition-all shadow-md shadow-[#ba8cff]/20"
              >
                📞 청주 전화
              </a>
              <a
                href={`sms:${somebodyPhone}`}
                className="py-3 px-2 rounded-xl bg-white text-black font-black text-xs sm:text-sm flex items-center justify-center gap-1 hover:scale-105 transition-all"
              >
                💬 청주 문자
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 스트립 */}
      <section className="bg-[#181228] border-y border-white/10 py-4 px-4">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs sm:text-sm font-bold">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">⏱</span>
            <span>지역별 30분 내 방문</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">💳</span>
            <span>선입금 없는 100% 후불제</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">📞</span>
            <span>24시간 실시간 상담</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#00ff88] text-lg">📍</span>
            <span>대전 & 청주 전지역 가능</span>
          </div>
        </div>
      </section>

      <main className="max-w-[960px] mx-auto px-4 mt-12 space-y-16">
        {/* 지역 선택 카테고리 */}
        <section id="area">
          <div className="text-center mb-8">
            <p className="text-[#ba8cff] font-extrabold text-xs tracking-widest mb-1">LOCATION</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">지역별 서비스 구·동 선택</h2>
            <p className="text-[#e1d9f5] text-sm mt-1">원하시는 지역(구/동)을 클릭해 상세 페이지를 확인하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* 대전 파트 */}
            <div className="p-6 rounded-3xl bg-[#140f24] border border-[#00ff88]/30 shadow-2xl">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                  <span className="text-[#00ff88]">📍 대전광역시</span>
                </h3>
                <span className="text-xs bg-[#00ff88]/20 text-[#00ff88] px-3 py-1 rounded-full font-bold border border-[#00ff88]/30">
                  대전지역담당
                </span>
              </div>

              <div className="space-y-5">
                {CITIES_DATA.daejeon.districts.map((district) => (
                  <div key={district.slug} className="bg-[#1c1630] p-4 rounded-2xl border border-white/10">
                    <Link
                      href={`/daejeon/${district.slug}`}
                      className="text-base font-extrabold text-[#00ff88] hover:text-white transition-colors flex items-center justify-between mb-3"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-4 bg-[#00ff88] rounded-full"></span>
                        대전 {district.name}
                      </span>
                      <span className="text-xs text-gray-400 font-normal hover:underline">전체보기 →</span>
                    </Link>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {district.dongs.map((dong) => (
                        <Link
                          key={dong.slug}
                          href={`/daejeon/${district.slug}/${dong.slug}`}
                          className="py-2 px-1 text-center rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-[#00ff88] hover:text-black transition-all truncate"
                        >
                          {dong.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 청주 파트 */}
            <div className="p-6 rounded-3xl bg-[#140f24] border border-[#ba8cff]/30 shadow-2xl">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                  <span className="text-[#ba8cff]">📍 청주시</span>
                </h3>
                <span className="text-xs bg-[#ba8cff]/20 text-[#ba8cff] px-3 py-1 rounded-full font-bold border border-[#ba8cff]/30">
                  청주지역담당
                </span>
              </div>

              <div className="space-y-5">
                {CITIES_DATA.cheongju.districts.map((district) => (
                  <div key={district.slug} className="bg-[#1c1630] p-4 rounded-2xl border border-white/10">
                    <Link
                      href={`/cheongju/${district.slug}`}
                      className="text-base font-extrabold text-[#ba8cff] hover:text-white transition-colors flex items-center justify-between mb-3"
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-4 bg-[#ba8cff] rounded-full"></span>
                        청주 {district.name}
                      </span>
                      <span className="text-xs text-gray-400 font-normal hover:underline">전체보기 →</span>
                    </Link>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {district.dongs.map((dong) => (
                        <Link
                          key={dong.slug}
                          href={`/cheongju/${district.slug}/${dong.slug}`}
                          className="py-2 px-1 text-center rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-bold hover:bg-[#ba8cff] hover:text-black transition-all truncate"
                        >
                          {dong.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 코스 및 요금 표 */}
        <section id="course">
          <div className="text-center mb-8">
            <p className="text-[#ba8cff] font-extrabold text-xs tracking-widest mb-1">COURSE & PRICE</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">관리 코스 안내</h2>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/15 bg-[#140f24] shadow-2xl">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#00ff88] via-[#ba8cff] to-[#6c5cff] text-black font-black text-sm">
                  <th className="py-4 px-4">코스</th>
                  <th className="py-4 px-3">60분</th>
                  <th className="py-4 px-3">90분</th>
                  <th className="py-4 px-3">120분</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                <tr>
                  <th className="py-4 px-4 font-extrabold text-left sm:text-center text-white">
                    건식 마사지
                    <span className="block text-xs font-normal text-gray-400">전신 스트레칭 중심</span>
                  </th>
                  <td className="py-4 px-3 text-gray-200 font-bold">70,000원</td>
                  <td className="py-4 px-3 text-gray-200 font-bold">70,000원</td>
                  <td className="py-4 px-3 text-gray-200 font-bold">80,000원</td>
                </tr>
                <tr>
                  <th className="py-4 px-4 font-extrabold text-left sm:text-center text-white">
                    아로마 마사지
                    <span className="block text-xs font-normal text-gray-400">촉촉한 아로마</span>
                  </th>
                  <td className="py-4 px-3 text-gray-200 font-bold">60,000원</td>
                  <td className="py-4 px-3 text-gray-200 font-bold">80,000원</td>
                  <td className="py-4 px-3 text-gray-200 font-bold">90,000원</td>
                </tr>
                <tr>
                  <th className="py-4 px-4 font-extrabold text-left sm:text-center text-white">
                    스페셜 마사지
                    <span className="block text-xs font-normal text-gray-400">타이 + 아로마 구성</span>
                  </th>
                  <td className="py-4 px-3 text-gray-200 font-bold">90,000원</td>
                  <td className="py-4 px-3 text-gray-200 font-bold">120,000원</td>
                  <td className="py-4 px-3 text-gray-200 font-bold">150,000원</td>
                </tr>
                <tr className="bg-[#ba8cff]/10">
                  <th className="py-4 px-4 font-extrabold text-left sm:text-center text-[#ba8cff]">
                    VIP 스웨디시
                    <span className="block text-xs font-normal text-gray-300">최상급 전신 스웨디시</span>
                  </th>
                  <td className="py-4 px-3 text-white font-black">100,000원</td>
                  <td className="py-4 px-3 text-white font-black">120,000원</td>
                  <td className="py-4 px-3 text-white font-black">150,000원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 이용 후기 & 실시간 문의 내역 & LIVE 현황 */}
        <section id="review">
          <div className="text-center mb-8">
            <p className="text-[#ba8cff] font-extrabold text-xs tracking-widest mb-1">REVIEW & LIVE</p>
            <h2 className="text-2xl sm:text-3xl font-black text-white">실시간 후기 및 현황</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* 1. 실제 고객 후기 */}
            <div className="p-6 rounded-3xl bg-[#140f24] border border-white/15 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <span>💬</span> 지역별 고객 후기
              </h3>
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-gray-200 mb-1">"대전 봉명동 출장마사지 이용했는데 엄청 빠르게 와주셨네요!"</p>
                  <span className="text-[#00ff88] font-bold">- 대전 이용 고객님</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-gray-200 mb-1">"청주 복대동 이용 후기입니다. 야간에 친절하게 관리해 주셨습니다."</p>
                  <span className="text-[#ba8cff] font-bold">- 청주 이용 고객님</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-gray-200 mb-1">"VIP 스웨디시 받고 감동했습니다. 선입금 없는 100% 후불제라 안심됩니다."</p>
                  <span className="text-gray-300 font-bold">- 대전 둔산동 고객님</span>
                </div>
              </div>
            </div>

            {/* 2. 실제 문의 내역 */}
            <div className="p-6 rounded-3xl bg-[#140f24] border border-white/15 space-y-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <span>📱</span> 실제 문의 내역
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="bg-white/10 p-2.5 rounded-xl rounded-tl-none max-w-[85%] text-gray-200">
                  청주 복대동 출장 문의 드립니다. 지금 예약 되나요?
                </div>
                <div className="bg-[#ba8cff]/20 text-[#ba8cff] p-2.5 rounded-xl rounded-tr-none ml-auto max-w-[85%] text-right font-bold">
                  네 고객님! 청주지역담당 기사님 바로 안내해 드리겠습니다. 😊
                </div>
                <div className="bg-white/10 p-2.5 rounded-xl rounded-tl-none max-w-[85%] text-gray-200">
                  대전 둔산동은 전용 번호로 문의하면 되나요?
                </div>
                <div className="bg-[#00ff88]/20 text-[#00ff88] p-2.5 rounded-xl rounded-tr-none ml-auto max-w-[85%] text-right font-bold">
                  네! 대전 지역은 전용 번호로 바로 연결됩니다.
                </div>
              </div>
            </div>

            {/* 3. 실시간 LIVE 이용 현황 */}
            <div className="p-6 rounded-3xl bg-[#140f24] border border-white/15 space-y-4">
              <h3 className="text-lg font-black text-white flex items-center justify-between border-b border-white/10 pb-3">
                <span>⚡ 실시간 이용 현황</span>
                <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold border border-red-500/30">
                  LIVE
                </span>
              </h3>
              <ul className="space-y-3 text-xs">
                <li className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="font-bold text-gray-200">대전 봉명동</span>
                  <span className="text-[#00ff88]">VIP 스웨디시 90분</span>
                  <span className="text-gray-400 text-[10px]">2분 전</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="font-bold text-gray-200">청주 복대동</span>
                  <span className="text-[#ba8cff]">VIP 스웨디시 60분</span>
                  <span className="text-gray-400 text-[10px]">6분 전</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="font-bold text-gray-200">대전 둔산동</span>
                  <span className="text-[#00ff88]">건식 마사지 60분</span>
                  <span className="text-gray-400 text-[10px]">12분 전</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded-xl bg-white/5">
                  <span className="font-bold text-gray-200">청주 율량동</span>
                  <span className="text-[#ba8cff]">아로마 120분</span>
                  <span className="text-gray-400 text-[10px]">20분 전</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="mt-20 py-8 px-4 border-t border-white/10 text-center text-xs text-gray-400">
        <p className="font-bold text-gray-300 mb-1">
          대전지역담당 & 청주지역담당 24시간 상담
        </p>
        <p>대전 및 청주 24시간 지역 맞춤 출장 케어 서비스 | 선입금 없는 100% 후불제 안내</p>
        <p className="mt-4 text-gray-500">© 2026 대전 & 청주 출장마사지. All rights reserved.</p>
      </footer>

      {/* 모바일 하단 고정 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50 space-y-1.5">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${slimPhone}`}
            className="py-2.5 rounded-xl bg-[#00ff88] text-black font-black text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
          >
            📞 대전 문의 (3335)
          </a>
          <a
            href={`tel:${somebodyPhone}`}
            className="py-2.5 rounded-xl bg-[#ba8cff] text-black font-black text-xs sm:text-sm flex items-center justify-center gap-1 shadow-md active:scale-95 transition-all"
          >
            📞 청주 문의 (3336)
          </a>
        </div>
      </div>
    </div>
  );
}