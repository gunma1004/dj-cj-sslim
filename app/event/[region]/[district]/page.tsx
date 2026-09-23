import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// ⚠️ 대전 5개 구(66개 동) + 청주 4개 구(28개 동) 100% 완전체 데이터
const REGION_FULL_DATA: Record<
  string,
  {
    name: string;
    phone: string;
    districts: {
      slug: string;
      name: string;
      dongs: { slug: string; name: string }[];
    }[];
  }
> = {
  daejeon: {
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

const BRAND_NAME = "S슬림";
const DOMAIN = "https://dj-cj-sslim.netlify.app";

interface PageProps {
  params: Promise<{
    region: string;
  }>;
}

// ⚠️ output: export 필수 함수 (daejeon, cheongju 정적 생성)
export async function generateStaticParams() {
  return [{ region: "daejeon" }, { region: "cheongju" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region } = await params;
  const regionInfo = REGION_FULL_DATA[region];
  if (!regionInfo) return {};

  const title = `${regionInfo.name} 마사지·홈타이 특별 할인 이벤트 총정리 | ${BRAND_NAME}`;
  const description = `${regionInfo.name} 전 지역 단독 할인 프로모션 안내! 첫 방문 10,000원 즉시 할인, 30분 도착 보장, 100% 현장 후불제 혜택을 확인해보세요.`;
  const url = `${DOMAIN}/event/${region}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${regionInfo.name} 이벤트`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function RegionEventPage({ params }: PageProps) {
  const { region } = await params;
  const regionInfo = REGION_FULL_DATA[region];
  if (!regionInfo) return notFound();

  const isDaejeon = region === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen pb-36">
      {/* 상단 네비게이션 헤더 */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/event" className="text-xs text-gray-300 hover:text-white">
            ← 전체 이벤트 허브로 돌아가기
          </Link>
          <a
            href={`tel:${regionInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs text-black transition-transform hover:scale-105"
            style={{ backgroundColor: mainColor }}
          >
            📞 {regionInfo.name} 이벤트 직통 예약
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[1000px] mx-auto space-y-12">
        {/* 상단 배너 */}
        <div className="text-center space-y-4">
          <span
            className="inline-block px-3.5 py-1 rounded-full text-xs font-black border tracking-wider"
            style={{
              color: mainColor,
              borderColor: `${mainColor}40`,
              backgroundColor: `${mainColor}15`,
            }}
          >
            {regionInfo.name.toUpperCase()} SPECIAL EVENT
          </span>
          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            {regionInfo.name} 전 지역 마사지 할인 프로모션
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-[640px] mx-auto leading-relaxed">
            원하시는 구와 동네를 선택하시면 동별 단독 첫 방문 10,000원 즉시 할인 및 제휴 혜택을 확인하실 수 있습니다.
          </p>
        </div>

        {/* 📍 해당 시의 모든 구와 하위 동네 전체 렌더링 그리드 */}
        <div className="space-y-8">
          {regionInfo.districts.map((district) => (
            <div
              key={district.slug}
              className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 space-y-6 shadow-xl"
            >
              {/* 구 헤더 및 구 이벤트 바로가기 버튼 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-3">
                <div>
                  <h2 className="text-xl font-black text-white flex items-center gap-2">
                    <span style={{ color: mainColor }}>📍</span> {regionInfo.name} {district.name} 마사지 이벤트
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {district.name} 관내 {district.dongs.length}개 동네 30분 안심 배차
                  </p>
                </div>

                <Link
                  href={`/event/${region}/${district.slug}`}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all text-center inline-block"
                  style={{
                    backgroundColor: `${mainColor}20`,
                    color: mainColor,
                    border: `1px solid ${mainColor}40`,
                  }}
                >
                  {district.name} 이벤트 상세 보기 →
                </Link>
              </div>

              {/* 💡 구에 속한 모든 동네 버튼 그리드 (클릭 시 /event/시/구/동 으로 즉시 이동) */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {district.dongs.map((dong) => (
                  <Link
                    key={dong.slug}
                    href={`/event/${region}/${district.slug}/${dong.slug}`}
                    className="py-2.5 px-2 text-center rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 font-semibold hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/40 transition-all truncate"
                  >
                    {dong.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 모바일 하단 예약 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${regionInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {regionInfo.name} 이벤트 실시간 예약 ({regionInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}