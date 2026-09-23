import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const BRAND_NAME = "S슬림";
const DOMAIN = "https://dj-cj-sslim.netlify.app";

// ⚠️ 외부 import 오류를 원천 차단하는 완전체 내장 데이터 (대전 5개 구 + 청주 4개 구 전역 94개 동)
const CITIES_DATA: Record<
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
          { slug: "dunsan", name: "둔산동" }, { slug: "wolpyeong", name: "월평동" },
          { slug: "tanbang", name: "탄방동" }, { slug: "galma", name: "갈마동" },
          { slug: "mannyeon", name: "만년동" }, { slug: "gwejeong", name: "괴정동" },
          { slug: "yongmun", name: "용문동" }, { slug: "gajang", name: "가장동" },
          { slug: "nae", name: "내동" }, { slug: "byeon", name: "변동" },
          { slug: "doma", name: "도마동" }, { slug: "jeongnim", name: "정림동" },
          { slug: "boksu", name: "복수동" }, { slug: "gwanjeo", name: "관저동" },
          { slug: "doan", name: "도안동" }, { slug: "gasuwon", name: "가수원동" },
          { slug: "giseong", name: "기성동" },
        ],
      },
      {
        slug: "yuseong",
        name: "유성구",
        dongs: [
          { slug: "bongmyeong", name: "봉명동" }, { slug: "gundong", name: "궁동" },
          { slug: "jangdae", name: "장대동" }, { slug: "guam", name: "구암동" },
          { slug: "sangdae", name: "상대동" }, { slug: "wonsinheung", name: "원신흥동" },
          { slug: "noeun", name: "노은동" }, { slug: "jijok", name: "지족동" },
          { slug: "banseok", name: "반석동" }, { slug: "sinsung", name: "신성동" },
          { slug: "jeonmin", name: "전민동" }, { slug: "gwanpyeong", name: "관평동" },
          { slug: "yongsan", name: "용산동" }, { slug: "taprip", name: "탑립동" },
          { slug: "deokmyeong", name: "덕명동" }, { slug: "hakhwa", name: "학하동" },
          { slug: "jinjam", name: "진잠동" },
        ],
      },
      {
        slug: "junggu",
        name: "중구",
        dongs: [
          { slug: "eunhaeng", name: "은행동" }, { slug: "seonhwa", name: "선화동" },
          { slug: "daeheung", name: "대흥동" }, { slug: "oryu", name: "오류동" },
          { slug: "taepyeong", name: "태평동" }, { slug: "yucheon", name: "유천동" },
          { slug: "munhwa", name: "문화동" }, { slug: "sanseong", name: "산성동" },
          { slug: "yongdu", name: "용두동" }, { slug: "mok", name: "목동" },
          { slug: "jungchon", name: "중촌동" },
        ],
      },
      {
        slug: "donggu",
        name: "동구",
        dongs: [
          { slug: "yongjeon", name: "용전동" }, { slug: "gayang", name: "가양동" },
          { slug: "hondo", name: "홍도동" }, { slug: "seongnam", name: "성남동" },
          { slug: "zayang", name: "자양동" }, { slug: "panam", name: "판암동" },
          { slug: "sinan", name: "신안동" }, { slug: "indong", name: "인동" },
          { slug: "hyodong", name: "효동" }, { slug: "daedong", name: "대동" },
        ],
      },
      {
        slug: "daedeokgu",
        name: "대덕구",
        dongs: [
          { slug: "songchon", name: "송촌동" }, { slug: "jungni", name: "중리동" },
          { slug: "birae", name: "비래동" }, { slug: "beopdong", name: "법동" },
          { slug: "sintanjin", name: "신탄진동" }, { slug: "seokbong", name: "석봉동" },
          { slug: "moksang", name: "목상동" }, { slug: "ojeong", name: "오정동" },
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
          { slug: "seongan", name: "성안동" }, { slug: "jungang", name: "중앙동" },
          { slug: "tapdaeseong", name: "탑대성동" }, { slug: "yeongun", name: "영운동" },
          { slug: "geumcheon", name: "금천동" }, { slug: "yongdam_myeongam_sanseong", name: "용담명암산성동" },
          { slug: "yongam", name: "용암동" },
        ],
      },
      {
        slug: "seowon",
        name: "서원구",
        dongs: [
          { slug: "sajik", name: "사직동" }, { slug: "sachang", name: "사창동" },
          { slug: "mochung", name: "모충동" }, { slug: "sannam", name: "산남동" },
          { slug: "bunpyeong", name: "분평동" }, { slug: "sugok", name: "수곡동" },
          { slug: "seonghwa_gaeshin_jukrim", name: "성화개신죽림동" },
        ],
      },
      {
        slug: "heungdeok",
        name: "흥덕구",
        dongs: [
          { slug: "bokdae", name: "복대동" }, { slug: "gagyeong", name: "가경동" },
          { slug: "biha", name: "비하동" }, { slug: "bongmyeong-cj", name: "봉명동" },
          { slug: "uncheon_sinbong", name: "운천신봉동" }, { slug: "gangseo", name: "강서동" },
          { slug: "songjeol", name: "송절동" },
        ],
      },
      {
        slug: "cheongwon",
        name: "청원구",
        dongs: [
          { slug: "yullyang", name: "율량동" }, { slug: "ochang", name: "오창읍" },
          { slug: "jujung", name: "주중동" }, { slug: "uwam", name: "우암동" },
          { slug: "naedeok", name: "내덕동" }, { slug: "ogunjang", name: "오근장동" },
          { slug: "naesu", name: "내수읍" },
        ],
      },
    ],
  },
};

// 1000개 이상의 유니크한 조합을 만들기 위한 수식어 풀
const DISTRICT_TITLE_POOL = [
  "{{district}} 출장 전문 프리미엄 마사지 안내",
  "{{city}} {{district}} 맞춤형 출장 스페셜 마사지",
  "{{district}} 힐링 출장 테라피와 명품 마사지",
  "{{city}} {{district}} 신속 출장 방문 마사지 가이드",
  "{{district}} 프리미엄 출장 케어 및 마사지 서비스",
  "{{city}} {{district}} 로열 출장 바디케어 마사지",
  "{{district}} 안심 출장 전문 릴렉스 마사지",
  "{{city}} {{district}} VIP 출장 맞춤형 마사지 코스",
];

const MODIFIER_POOL = [
  "퍼펙트", "시그니처", "익스클루시브", "오리지널", "엘리트", "디럭스",
  "스위트", "베이직", "클래식", "소울", "하모니", "밸런스", "리프레시",
];

function getLargeScaleUniqueDistrictTitle(cityName: string, districtName: string, seedKey: string) {
  let hash = 0;
  for (let i = 0; i < seedKey.length; i++) {
    hash = (hash << 5) - hash + seedKey.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  const patternIndex = absHash % DISTRICT_TITLE_POOL.length;
  const modIndex = Math.floor(absHash / 13) % MODIFIER_POOL.length;

  const pattern = DISTRICT_TITLE_POOL[patternIndex];
  const formatted = pattern
    .replace("{{district}}", districtName)
    .replace("{{city}}", cityName);

  return MODIFIER_POOL[modIndex] + " " + formatted;
}

interface PageProps {
  params: Promise<{
    region?: string;
    city?: string;
    district: string;
  }>;
}

// ⚠️ output: export 필수 함수 (폴더 구조 [region]과 [city] 모두 호환 지원)
export async function generateStaticParams() {
  const paths: { region: string; city: string; district: string }[] = [];

  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      paths.push({
        region: citySlug,
        city: citySlug,
        district: district.slug,
      });
    });
  });

  return paths;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const currentKey = resolved.region || resolved.city || "daejeon";
  const cityInfo = CITIES_DATA[currentKey];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === resolved.district);
  if (!cityInfo || !districtInfo) return {};

  const areaName = `${cityInfo.name} ${districtInfo.name}`;
  const uniqueTitle = getLargeScaleUniqueDistrictTitle(
    cityInfo.name,
    districtInfo.name,
    `${areaName}_district_title_1000`
  );

  const title = `${uniqueTitle} | ${BRAND_NAME}`;
  const description = `${areaName} 전 지역 신속한 출장 마사지 서비스를 통해, 지친 일상의 피로를 말끔히 풀어드릴 품격 있는 힐링을 제공합니다. 100% 현장 후불제.`;
  const url = `${DOMAIN}/massage/${currentKey}/${resolved.district}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${areaName}`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictMassagePage({ params }: PageProps) {
  const resolved = await params;
  const currentKey = resolved.region || resolved.city || "daejeon";
  const cityInfo = CITIES_DATA[currentKey];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === resolved.district);
  if (!cityInfo || !districtInfo) return notFound();

  const isDaejeon = currentKey === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const areaName = `${cityInfo.name} ${districtInfo.name}`;
  const uniqueTitle = getLargeScaleUniqueDistrictTitle(
    cityInfo.name,
    districtInfo.name,
    `${areaName}_district_title_1000`
  );

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href={`/massage/${currentKey}`} className="text-xs text-gray-300 hover:text-white">
            ← {cityInfo.name} 전체보기
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/event/${currentKey}/${districtInfo.slug}`}
              className="px-3 py-1.5 rounded-full font-bold text-xs text-rose-300 bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 transition"
            >
              🎁 {districtInfo.name} 이벤트
            </Link>
            <a
              href={`tel:${cityInfo.phone}`}
              className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
              style={{ backgroundColor: mainColor }}
            >
              📞 {districtInfo.name} 예약 문의
            </a>
          </div>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        {/* 상단 타이틀 */}
        <div>
          <span
            className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border tracking-wider"
            style={{
              color: mainColor,
              borderColor: `${mainColor}40`,
              backgroundColor: `${mainColor}15`,
            }}
          >
            {areaName.toUpperCase()} PROGRAM
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">{uniqueTitle}</h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {areaName} 전 지역 고객님이 계신 곳으로 30분 내 신속하게 찾아가는 맞춤형 방문 프로그램입니다.
          </p>
        </div>

        {/* 샵 소개 및 안내 섹션 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4 flex items-center gap-2">
            <span>✨</span> {areaName} 프리미엄 홈 바디케어 안내
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {areaName} 전 지역(호텔, 오피스텔, 주거지 등) 어디서나 편안하게 휴식하실 수 있도록 전문 테라피스트가 직접 방문하여 힐링 케어를 선사합니다.
            </p>
            <p>
              누적된 피로와 뭉친 근육을 부드럽게 이완시켜 드리며, 선입금 없는 100% 현장 후불제로 안전하고 투명하게 이용하실 수 있습니다.
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

        {/* 동별 이동 링크 섹션 */}
        <section className="text-left space-y-4">
          <div className="border-b border-white/10 pb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-200">📍 {districtInfo.name} 동별 상세 선택</h2>
            <span className="text-xs text-gray-400">{districtInfo.dongs.length}개 동네</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {districtInfo.dongs.map((dong) => (
              <Link
                key={dong.slug}
                href={`/massage/${currentKey}/${districtInfo.slug}/${dong.slug}`}
                className="py-2.5 px-3 rounded-xl bg-[#140f24] border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/20 hover:text-white transition-all text-center truncate"
              >
                {dong.name} 마사지
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 플로팅 예약 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {districtInfo.name} 빠른 예약 연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}