export const dynamic = "force-static";

import type { Metadata } from "next";
import Link from "next/link";

const BRAND_NAME = "S슬림";
const DOMAIN = "https://dj-cj-sslim.netlify.app";

export const metadata: Metadata = {
  title: "대전·청주 전 지역 마사지 특별 할인 이벤트 총정리 | S슬림",
  description:
    "대전 및 청주 전 지역 첫 방문 10,000원 즉시 할인, 30분 안심 배차, 천연 아로마 업그레이드 혜택 총정리! 선입금 없는 100% 현장 후불제 홈타이를 경험해보세요.",
  alternates: {
    canonical: `${DOMAIN}/event`,
  },
  openGraph: {
    title: "대전·청주 전 지역 마사지 특별 할인 이벤트 총정리 | S슬림",
    description: "첫 방문 1만원 할인, 동별 단독 프로모션 및 안심 후불제 가이드",
    url: `${DOMAIN}/event`,
    siteName: BRAND_NAME,
    locale: "ko_KR",
    type: "website",
  },
};

// ⚠️ 대전 5개 구(66개 동) + 청주 4개 구(28개 동) = 총 94개 동 전체 내장 데이터
const EVENT_ALL_CITIES_DATA = {
  daejeon: {
    slug: "daejeon",
    name: "대전",
    phone: "0507-1280-3335",
    districts: [
      {
        slug: "seo",
        name: "서구",
        dongs: [
          { slug: "dunsan", name: "둔산동" },
          { slug: "wolpyeong", name: "월평동" },
          { slug: "tanbang", name: "탄방동" },
          { slug: "galma", name: "갈마동" },
          { slug: "mannyeon", name: "만년동" },
          { slug: "gwejeong", name: "괴정동" },
          { slug: "yongmun", name: "용문동" },
          { slug: "gajang", name: "가장동" },
          { slug: "nae", name: "내동" },
          { slug: "byeon", name: "변동" },
          { slug: "doma", name: "도마동" },
          { slug: "jeongnim", name: "정림동" },
          { slug: "boksu", name: "복수동" },
          { slug: "gwanjeo", name: "관저동" },
          { slug: "doan", name: "도안동" },
          { slug: "gasuwon", name: "가수원동" },
          { slug: "giseong", name: "기성동" },
        ],
      },
      {
        slug: "yuseong",
        name: "유성구",
        dongs: [
          { slug: "bongmyeong", name: "봉명동" },
          { slug: "gundong", name: "궁동" },
          { slug: "jangdae", name: "장대동" },
          { slug: "guam", name: "구암동" },
          { slug: "sangdae", name: "상대동" },
          { slug: "wonsinheung", name: "원신흥동" },
          { slug: "noeun", name: "노은동" },
          { slug: "jijok", name: "지족동" },
          { slug: "banseok", name: "반석동" },
          { slug: "sinsung", name: "신성동" },
          { slug: "jeonmin", name: "전민동" },
          { slug: "gwanpyeong", name: "관평동" },
          { slug: "yongsan", name: "용산동" },
          { slug: "taprip", name: "탑립동" },
          { slug: "deokmyeong", name: "덕명동" },
          { slug: "hakhwa", name: "학하동" },
          { slug: "jinjam", name: "진잠동" },
        ],
      },
      {
        slug: "junggu",
        name: "중구",
        dongs: [
          { slug: "eunhaeng", name: "은행동" },
          { slug: "seonhwa", name: "선화동" },
          { slug: "daeheung", name: "대흥동" },
          { slug: "oryu", name: "오류동" },
          { slug: "taepyeong", name: "태평동" },
          { slug: "yucheon", name: "유천동" },
          { slug: "munhwa", name: "문화동" },
          { slug: "sanseong", name: "산성동" },
          { slug: "yongdu", name: "용두동" },
          { slug: "mok", name: "목동" },
          { slug: "jungchon", name: "중촌동" },
        ],
      },
      {
        slug: "donggu",
        name: "동구",
        dongs: [
          { slug: "yongjeon", name: "용전동" },
          { slug: "gayang", name: "가양동" },
          { slug: "hondo", name: "홍도동" },
          { slug: "seongnam", name: "성남동" },
          { slug: "zayang", name: "자양동" },
          { slug: "panam", name: "판암동" },
          { slug: "sinan", name: "신안동" },
          { slug: "indong", name: "인동" },
          { slug: "hyodong", name: "효동" },
          { slug: "daedong", name: "대동" },
        ],
      },
      {
        slug: "daedeokgu",
        name: "대덕구",
        dongs: [
          { slug: "songchon", name: "송촌동" },
          { slug: "jungni", name: "중리동" },
          { slug: "birae", name: "비래동" },
          { slug: "beopdong", name: "법동" },
          { slug: "sintanjin", name: "신탄진동" },
          { slug: "seokbong", name: "석봉동" },
          { slug: "moksang", name: "목상동" },
          { slug: "ojeong", name: "오정동" },
          { slug: "daehwa", name: "대화동" },
        ],
      },
    ],
  },
  cheongju: {
    slug: "cheongju",
    name: "청주",
    phone: "0507-1280-3336",
    districts: [
      {
        slug: "sangdang",
        name: "상당구",
        dongs: [
          { slug: "seongan", name: "성안동" },
          { slug: "jungang", name: "중앙동" },
          { slug: "tapdaeseong", name: "탑대성동" },
          { slug: "yeongun", name: "영운동" },
          { slug: "geumcheon", name: "금천동" },
          { slug: "yongdam_myeongam_sanseong", name: "용담명암산성동" },
          { slug: "yongam", name: "용암동" },
        ],
      },
      {
        slug: "seowon",
        name: "서원구",
        dongs: [
          { slug: "sajik", name: "사직동" },
          { slug: "sachang", name: "사창동" },
          { slug: "mochung", name: "모충동" },
          { slug: "sannam", name: "산남동" },
          { slug: "bunpyeong", name: "분평동" },
          { slug: "sugok", name: "수곡동" },
          { slug: "seonghwa_gaeshin_jukrim", name: "성화개신죽림동" },
        ],
      },
      {
        slug: "heungdeok",
        name: "흥덕구",
        dongs: [
          { slug: "bokdae", name: "복대동" },
          { slug: "gagyeong", name: "가경동" },
          { slug: "biha", name: "비하동" },
          { slug: "bongmyeong-cj", name: "봉명동" },
          { slug: "uncheon_sinbong", name: "운천신봉동" },
          { slug: "gangseo", name: "강서동" },
          { slug: "songjeol", name: "송절동" },
        ],
      },
      {
        slug: "cheongwon",
        name: "청원구",
        dongs: [
          { slug: "yullyang", name: "율량동" },
          { slug: "ochang", name: "오창읍" },
          { slug: "jujung", name: "주중동" },
          { slug: "uwam", name: "우암동" },
          { slug: "naedeok", name: "내덕동" },
          { slug: "ogunjang", name: "오근장동" },
          { slug: "naesu", name: "내수읍" },
        ],
      },
    ],
  },
};

export default function EventHubPage() {
  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen pb-24">
      {/* 상단 헤더 배너 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rose-950 via-slate-900 to-indigo-950 text-white py-16 md:py-24 px-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            대전·청주 전 지역 프로모션
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-slate-100">
            대전·청주 특별 할인 이벤트 총정리
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            원하시는 동네를 선택하시면 동별 첫 방문 10,000원 즉시 할인과 단독 제휴 프로모션을 확인하실 수 있습니다.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:0507-1280-3335"
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-all shadow-lg shadow-rose-600/30"
            >
              📞 대전 이벤트 예약 (0507-1280-3335)
            </a>
            <a
              href="tel:0507-1280-3336"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-600/30"
            >
              📞 청주 이벤트 예약 (0507-1280-3336)
            </a>
          </div>
        </div>
      </section>

      {/* 대전 5개 구 + 청주 4개 구 & 94개 동 전체 네비게이션 그리드 */}
      <main className="py-12 px-4 max-w-[1160px] mx-auto space-y-16">
        <div className="text-center space-y-2">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-rose-500/15 text-rose-400 border border-rose-500/30">
            EVENT NAVIGATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            권역별 마사지 할인 이벤트 바로가기
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">
            해당 동네를 클릭하시면 동 단위 1만원 할인 혜택 페이지로 이동합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(EVENT_ALL_CITIES_DATA).map(([citySlug, city]) => {
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
                    <Link
                      href={`/event/${citySlug}`}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 transition-all text-center"
                    >
                      🎁 {city.name} 이벤트 전체보기 →
                    </Link>
                    <Link
                      href={`/massage/${citySlug}`}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-black transition-transform hover:scale-105 text-center"
                      style={{ backgroundColor: accentColor }}
                    >
                      서비스 안내 →
                    </Link>
                  </div>
                </div>

                {/* 📍 구별 / 동별 이벤트 링크 목록 */}
                <div className="space-y-4">
                  {city.districts.map((district) => (
                    <div key={district.slug} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/event/${citySlug}/${district.slug}`}
                          className="text-sm font-bold text-gray-200 hover:text-white flex items-center gap-1 group"
                        >
                          <span style={{ color: accentColor }}>📍</span>
                          <span className="group-hover:underline">
                            {district.name} 마사지 이벤트
                          </span>
                        </Link>
                        <span className="text-[11px] text-gray-500">
                          {district.dongs.length}개 동
                        </span>
                      </div>

                      {/* 하위 동 버튼들 (모두 /event/... 주소로 연결) */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 pt-1">
                        {district.dongs.map((dong) => (
                          <Link
                            key={dong.slug}
                            href={`/event/${citySlug}/${district.slug}/${dong.slug}`}
                            className="py-1.5 px-1 text-center rounded-lg bg-white/5 border border-white/5 text-[11px] text-gray-300 font-medium hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30 transition-all truncate"
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