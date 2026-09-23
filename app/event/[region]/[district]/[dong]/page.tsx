import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// =========================================================================
// 1. 동 페이지 전용 타이틀 패턴 풀 60종 ("마사지" 키워드 100% 필수 포함)
// =========================================================================
const DONG_TITLE_POOL_60 = [
  "{{city}} {{district}} {{dong}} 마사지 추천 할인 이벤트｜첫방문 1만원 즉시 차감 - {{brand}}",
  "{{dong}} 마사지 1등 힐링 케어｜{{city}} {{district}} 선입금 없는 안심 후불제 - {{brand}}",
  "{{dong}} 마사지 잘하는 곳 추천｜{{city}} {{district}} 감성 스웨디시 & 아로마 - {{brand}}",
  "{{dong}} 마사지 24시 신속 방문｜{{city}} {{district}} 직장인 피로회복 전문 - {{brand}}",
  "{{dong}} 마사지 가격 & 코스 비교｜{{city}} {{district}} 전 지역 30분 도착 보장 - {{brand}}",
  "{{dong}} 마사지 후기 좋은 홈케어｜{{city}} {{district}} 1:1 맞춤 프라이빗 바디스파 - {{brand}}",
  "{{dong}} 마사지 할인 혜택 총정리｜{{city}} {{district}} 야간·심야 안심 예약 센터 - {{brand}}",
  "{{dong}} 마사지 추천 업소 안내｜{{city}} {{district}} 내 공간에서 즐기는 호텔식 테라피 - {{brand}}",
  "{{dong}} 마사지 샵 베스트 모음｜{{city}} {{district}} 단골이 보증하는 바디케어 - {{brand}}",
  "{{dong}} 마사지 전문 힐링 가이드｜{{city}} {{district}} 뭉친 근육 이완 타이 스트레칭 - {{brand}}",
  "{{city}} {{dong}} 마사지 추천｜{{district}} 전 지역 빠른 배차와 정직한 정찰제 - {{brand}}",
  "{{dong}} 스웨디시 마사지 할인 이벤트｜{{city}} {{district}} 부드러운 림프 순환 케어 - {{brand}}",
  "{{dong}} 홈타이 마사지 추천 1위｜{{city}} {{district}} 자택·오피스텔 신속 출동 - {{brand}}",
  "{{dong}} 아로마 마사지 안내｜{{city}} {{district}} 천연 에센셜 오일 무상 업그레이드 - {{brand}}",
  "{{dong}} 출장 마사지 안심 예약｜{{city}} {{district}} 100% 현장 결제 시스템 - {{brand}}",
  "{{dong}} 힐링 마사지 단독 프로모션｜{{city}} {{district}} 첫 예약 특별 할인 혜택 - {{brand}}",
  "{{dong}} 24시 마사지 완벽 가이드｜{{city}} {{district}} 새벽에도 부르는 편안한 홈케어 - {{brand}}",
  "{{dong}} VIP 마사지 프로그램｜{{city}} {{district}} 품격 높은 프리미엄 1:1 케어 - {{brand}}",
  "{{dong}} 건식 타이 마사지 추천｜{{city}} {{district}} 활력을 되찾아주는 전신 관리 - {{brand}}",
  "{{dong}} 감성 마사지 명가｜{{city}} {{district}} 일상의 피로를 녹여내는 릴렉스 스파 - {{brand}}",
  "{{dong}} 마사지 혜택 가이드｜{{city}} {{district}} 후기 평점 높은 제휴 테라피 - {{brand}}",
  "{{dong}} 마사지 신속 도착 보장｜{{city}} {{district}} 전화 한 통으로 간편 예약 - {{brand}}",
  "{{dong}} 마사지 오픈 기념 이벤트｜{{city}} {{district}} 10,000원 즉시 할인 쿠폰 - {{brand}}",
  "{{dong}} 마사지 추천 리스트｜{{city}} {{district}} 믿을 수 있는 검증된 테라피스트 - {{brand}}",
  "{{dong}} 마사지 코스 안내｜{{city}} {{district}} 체형 맞춤형 힐링 바디 테라피 - {{brand}}",
  "{{dong}} 마사지 예약 안내｜{{city}} {{district}} 이동 없이 누리는 프라이빗 휴식 - {{brand}}",
  "{{dong}} 마사지 솔직 후기 모음｜{{city}} {{district}} 재이용률 높은 방문 케어 - {{brand}}",
  "{{dong}} 마사지 당일 예약｜{{city}} {{district}} 24시간 실시간 상담 및 배차 - {{brand}}",
  "{{dong}} 마사지 힐링 추천｜{{city}} {{district}} 굳은 어깨와 목을 풀어주는 손길 - {{brand}}",
  "{{dong}} 마사지 프리미엄 안내｜{{city}} {{district}} 쾌적하고 안전한 홈 바디컨디셔닝 - {{brand}}",
  "{{city}} {{district}} {{dong}} 스웨디시 마사지｜감성 가득한 감각적 힐링 코스 - {{brand}}",
  "{{city}} {{district}} {{dong}} 홈타이 마사지｜정통 스트레칭과 전신 피로회복 - {{brand}}",
  "{{city}} {{district}} {{dong}} 아로마 마사지｜은은한 향기와 깊은 이완 효과 - {{brand}}",
  "{{city}} {{district}} {{dong}} 24시 마사지｜야간 퇴근 후 편안하게 받는 힐링 - {{brand}}",
  "{{city}} {{district}} {{dong}} 안심 마사지｜사기 없는 100% 현장 후불 결제 - {{brand}}",
  "{{dong}} 마사지 인기 코스｜{{city}} {{district}} 고객 만족도 최상위 프로그램 - {{brand}}",
  "{{dong}} 마사지 얼리버드 이벤트｜{{city}} {{district}} 낮 시간대 추가 혜택 증정 - {{brand}}",
  "{{dong}} 마사지 리뷰 이벤트｜{{city}} {{district}} 후기 작성 시 연장 혜택 제공 - {{brand}}",
  "{{dong}} 마사지 지인 추천 1위｜{{city}} {{district}} 검증된 테라피스트 1:1 케어 - {{brand}}",
  "{{dong}} 마사지 빠른 출장 안내｜{{city}} {{district}} 관내 전역 30분 안심 배차 - {{brand}}",
  "{{dong}} 프리미엄 마사지 이벤트｜{{city}} {{district}} 첫 방문 할인 프로모션 - {{brand}}",
  "{{dong}} 프라이빗 마사지 안내｜{{city}} {{district}} 내 방에서 누리는 힐링 타임 - {{brand}}",
  "{{dong}} 단독 할인 마사지｜{{city}} {{district}} 선입금 걱정 없는 클린 예약 - {{brand}}",
  "{{dong}} 릴렉스 마사지 추천｜{{city}} {{district}} 심신 안정을 돕는 에센셜 케어 - {{brand}}",
  "{{dong}} 명품 바디 마사지｜{{city}} {{district}} 전문 교육을 수료한 테라피스트 - {{brand}}",
  "{{dong}} 맞춤 케어 마사지｜{{city}} {{district}} 피로도에 따른 맞춤 강도 조절 - {{brand}}",
  "{{dong}} 심야 방문 마사지｜{{city}} {{district}} 새벽에도 친절하고 빠른 방문 - {{brand}}",
  "{{dong}} 무상 업그레이드 마사지｜{{city}} {{district}} 천연 아로마 오일 이벤트 - {{brand}}",
  "{{dong}} 급행 마사지 서비스｜{{city}} {{district}} 지체 없는 빠른 방문 약속 - {{brand}}",
  "{{dong}} 정통 테라피 마사지｜{{city}} {{district}} 쌓인 스트레스를 말끔히 해소 - {{brand}}",
  "{{dong}} 힐링 쉼터 마사지｜{{city}} {{district}} 조용하고 아늑한 나만의 휴식 공간 - {{brand}}",
  "{{dong}} 림프 순환 마사지｜{{city}} {{district}} 부종 완화와 가벼운 바디라인 - {{brand}}",
  "{{dong}} 건식 & 습식 마사지｜{{city}} {{district}} 취향에 맞게 선택하는 힐링 코스 - {{brand}}",
  "{{dong}} 가성비 최고 마사지｜{{city}} {{district}} 합리적인 요금과 최상의 만족도 - {{brand}}",
  "{{dong}} 럭셔리 홈 마사지｜{{city}} {{district}} 5성급 호텔 스파를 집에서 경험 - {{brand}}",
  "{{dong}} 24시간 열린 마사지｜{{city}} {{district}} 언제든 편안하게 부르는 홈타이 - {{brand}}",
  "{{dong}} 피로 싹 마사지｜{{city}} {{district}} 무거운 몸을 가볍게 리셋하는 시간 - {{brand}}",
  "{{dong}} 후불제 안심 마사지｜{{city}} {{district}} 예약금 0원, 도착 후 직접 결제 - {{brand}}",
  "{{dong}} 특별 기획 마사지｜{{city}} {{district}} 오픈 기념 단독 할인 혜택 모음 - {{brand}}",
  "{{dong}} 완벽한 휴식 마사지｜{{city}} {{district}} 지친 하루를 달래주는 힐링 케어 - {{brand}}"
];

// =========================================================================
// 2. 동 페이지 전용 메타 디스크립션 패턴 풀 40종
// =========================================================================
const DONG_DESC_POOL_40 = [
  "{{city}} {{district}} {{dong}} 출장 마사지 단독 오픈 이벤트! 첫 예약 고객 10,000원 즉시 할인 혜택과 100% 현장 후불제 안심 케어를 경험해보세요.",
  "{{dong}} 출장 마사지 추천 업소 안내! 스웨디시, 타이, 천연 아로마 코스를 {{city}} {{district}} 관내 30분 내외로 빠르게 방문하여 관리해 드립니다.",
  "선입금 없는 100% 후불제! {{city}} {{district}} {{dong}} 출장 마사지에서 안전하고 편안하게 피로를 풀어보세요. 첫 방문 특별 할인 진행 중입니다.",
  "{{dong}} 출장 마사지 24시간 실시간 예약 안내. 자택, 오피스텔 어디든 전문 테라피스트가 신속 방문하여 정성 어린 1:1 맞춤 바디케어를 선사합니다.",
  "{{city}} {{district}} {{dong}} 출장 마사지 만족도 1위! 뭉친 근육을 부드럽게 이완하는 감성 스웨디시와 타이 마사지 프로그램을 동네 최저가로 만나보세요.",
  "퇴근 후 힐링은 {{dong}} 출장마사지와 함께! {{city}} {{district}} 전 지역 신속 배차로 지체 없이 찾아가 지친 몸과 마음에 활력을 충전해 드립니다.",
  "{{dong}} 출장마사지 특별 프로모션! 첫 방문 할인부터 천연 최고급 에센셜 오일 무상 업그레이드까지 {{city}} {{district}} 고객님을 위한 혜택 모음.",
  "{{city}} {{district}} {{dong}} 출장마사지 코스 및 투명한 가격 안내. 예약금 요구가 일체 없는 안전한 후불 결제로 편안하게 휴식을 즐기세요.",
  "후기 좋은 {{dong}} 출장마사지 명가! 숙련된 테라피스트의 섬세한 손길로 전신 피로와 림프 순환을 돕는 고품격 홈스파를 집에서 누려보세요.",
  "{{dong}} 출장마사지 야간·심야 24시 정상 운영! 늦은 시간에도 {{city}} {{district}} 전역 어디든 30분 내외로 신속하게 방문해 드립니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 맞춤 안내. 직장인 굳은 목·어깨 집중 케어와 아늑한 힐링 테라피로 완벽한 숙면을 도와드립니다.",
  "{{dong}} 출장마사지 단독 제휴 혜택 총정리! 선입금 걱정 없는 믿을 수 있는 예약 시스템과 {{city}} {{district}} 전 지역 빠른 배차 서비스를 확인하세요.",
  "호텔식 프리미엄 테라피를 집에서! {{city}} {{district}} {{dong}} 출장마사지 1:1 방문 서비스로 번거로운 이동 없이 최고의 휴식을 누려보세요.",
  "{{dong}} 출장마사지 추천 1순위! 부드러운 스웨디시부터 시원한 정통 타이까지 취향에 맞춰 선택하는 맞춤형 프로그램을 안내해 드립니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 실시간 할인 상담 센터. 지금 예약하시면 첫 이용 1만원 즉시 차감 혜택이 바로 적용됩니다.",
  "단골이 강력 추천하는 {{dong}} 출장마사지! 깨끗한 타월과 최고급 천연 오일 사용으로 위생적이고 쾌적한 힐링 시간을 보장합니다.",
  "{{dong}} 출장마사지 24시 안심 케어. {{city}} {{district}} 관내 어디서나 전화 한 통이면 검증된 테라피스트가 고객님 계신 곳으로 찾아갑니다.",
  "피로 회복 전문 {{dong}} 출장마사지 가이드! 체계적인 스트레칭과 오일 테라피 코스로 일상 속 무거운 바디 컨디션을 가볍게 회복하세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 투명 정찰제 안내. 군더더기 없는 정직한 코스 요금과 친절하고 섬세한 1:1 케어를 약속드립니다.",
  "{{dong}} 출장마사지 얼리버드 & 나이트 할인 이벤트 진행 중! {{city}} {{district}} 주민분들을 위한 풍성한 리워드 혜택을 놓치지 마세요.",
  "바쁜 일상 속 프라이빗 힐링, {{dong}} 출장마사지! {{city}} {{district}} 관내 아파트 및 오피스텔 어디든 30분 도착 보장 시스템을 운영합니다.",
  "{{city}} {{district}} {{dong}} 출장 마사지 감성 테라피 추천. 따뜻한 오일과 부드러운 터칭으로 스트레스를 편안하게 녹여드립니다.",
  "선입금 없는 안전 클린 예약! {{dong}} 출장마사지는 관리사 도착 후 결제하는 100% 현장 후불제로 고객님의 신뢰를 최우선으로 합니다.",
  "{{dong}} 출장마사지 샵 평점 및 코스 비교. {{city}} {{district}}에서 후기 좋은 방문 테라피를 집에서 가장 편안한 자세로 받아보세요.",
  "지친 하루의 완벽한 쉼표, {{dong}} 출장마사지! {{city}} {{district}} 전 지역 당일 즉시 예약 및 신속 배차로 빠르게 찾아갑니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 맞춤 림프 순환 케어. 붓기 완화와 혈액순환에 탁월한 프리미엄 스웨디시 코스를 경험해보세요.",
  "{{dong}} 출장 마사지 첫 예약 10,000원 즉시 할인 코드 제공! {{city}} {{district}} 고객님을 위해 준비된 실속 만점 홈케어 프로모션.",
  "품격이 다른 바디 컨디셔닝, {{dong}} 출장 마사지! 엄선된 전문 테라피스트가 {{city}} {{district}} 전역으로 신속히 방문합니다.",
  "{{city}} {{district}} {{dong}} 출장 마사지 24시간 연중무휴 안내. 주말, 공휴일, 늦은 새벽에도 원하는 시간에 편안하게 이용하실 수 있습니다.",
  "집에서 만나는 5성급 힐링 스파, {{dong}} 출장마사지! {{city}} {{district}} 어디든 전문 도구를 갖추고 깔끔하게 찾아갑니다.",
  "{{dong}} 출장마사지 솔직 리뷰 추천! 내 집 안방에서 누리는 프라이빗 테라피로 하루의 피로를 상쾌하게 씻어내세요.",
  "{{city}} {{district}} {{dong}} 출장마사지 빠른 배차 안내. 인근 상주 관리사 우선 배치로 기다림 없이 빠른 케어를 제공합니다.",
  "선입금 0원, 예약금 사기 걱정 없는 {{dong}} 출장 마사지! 투명하고 안전한 100% 후불제 시스템으로 안심하고 힐링하세요.",
  "{{dong}} 출장마사지 추천 코스 총정리! 건식 타이 스트레칭부터 은은한 아로마 테라피까지 {{city}} {{district}} 최고의 프로그램을 안내합니다.",
  "몸이 무겁고 결릴 땐 {{dong}} 출장마사지! {{city}} {{district}} 전 지역 30분 안심 방문으로 뭉친 근육을 시원하게 풀어드립니다.",
  "{{city}} {{district}} {{dong}} 출장마사지 프리미엄 홈타이 & 스웨디시. 프라이빗한 휴식을 원하는 고객님께 최고의 힐링을 선물합니다.",
  "{{dong}} 출장마사지 오픈 기념 특별 이벤트! 첫 방문 할인 혜택과 정성 가득한 케어로 일상의 활력을 되찾아보세요.",
  "후기 만족도 높은 {{city}} {{district}} {{dong}} 출장마사지. 전문 테라피스트의 정성스러운 1:1 방문 케어를 지금 만나보세요.",
  "{{dong}} 출장 마사지 24시간 실시간 상담 가능! 부담 없는 가격과 투명한 정찰제로 {{city}} {{district}} 전 지역을 찾아갑니다.",
  "최고의 휴식을 약속하는 {{dong}} 출장 마사지! 지친 몸을 위한 깊은 이완과 힐링 케어를 선입금 없는 후불제로 경험하세요."
];

const BRAND_NAME = "S슬림";
const DOMAIN = "https://dj-cj-sslim.netlify.app";

// 고유 해시 기반으로 60종 타이틀과 40종 디스크립션을 순환 매칭하는 함수
function getRotatedDongSeo(cityName: string, districtName: string, dongName: string, seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const titleIndex = absHash % DONG_TITLE_POOL_60.length;
  const descIndex = Math.floor(absHash / 7) % DONG_DESC_POOL_40.length;

  const title = DONG_TITLE_POOL_60[titleIndex]
    .replace(/\{\{city\}\}/g, cityName)
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{dong\}\}/g, dongName)
    .replace(/\{\{brand\}\}/g, BRAND_NAME);

  const description = DONG_DESC_POOL_40[descIndex]
    .replace(/\{\{city\}\}/g, cityName)
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{dong\}\}/g, dongName)
    .replace(/\{\{brand\}\}/g, BRAND_NAME);

  return { title, description };
}

// 94개 동 데이터
const EVENT_DONG_DATA: Record<
  string,
  {
    name: string;
    phone: string;
    districts: Record<string, { name: string; dongs: Record<string, string> }>;
  }
> = {
  daejeon: {
    name: "대전",
    phone: "0507-1280-3335",
    districts: {
      seo: {
        name: "서구",
        dongs: {
          dunsan: "둔산동", wolpyeong: "월평동", tanbang: "탄방동", galma: "갈마동",
          mannyeon: "만년동", gwejeong: "괴정동", yongmun: "용문동", gajang: "가장동",
          nae: "내동", byeon: "변동", doma: "도마동", jeongnim: "정림동",
          boksu: "복수동", gwanjeo: "관저동", doan: "도안동", gasuwon: "가수원동", giseong: "기성동"
        },
      },
      yuseong: {
        name: "유성구",
        dongs: {
          bongmyeong: "봉명동", gundong: "궁동", jangdae: "장대동", guam: "구암동",
          sangdae: "상대동", wonsinheung: "원신흥동", noeun: "노은동", jijok: "지족동",
          banseok: "반석동", sinsung: "신성동", jeonmin: "전민동", gwanpyeong: "관평동",
          yongsan: "용산동", taprip: "탑립동", deokmyeong: "덕명동", hakhwa: "학하동", jinjam: "진잠동"
        },
      },
      junggu: {
        name: "중구",
        dongs: {
          eunhaeng: "은행동", seonhwa: "선화동", daeheung: "대흥동", oryu: "오류동",
          taepyeong: "태평동", yucheon: "유천동", munhwa: "문화동", sanseong: "산성동",
          yongdu: "용두동", mok: "목동", jungchon: "중촌동"
        },
      },
      donggu: {
        name: "동구",
        dongs: {
          yongjeon: "용전동", gayang: "가양동", hondo: "홍도동", seongnam: "성남동",
          zayang: "자양동", panam: "판암동", sinan: "신안동", indong: "인동",
          hyodong: "효동", daedong: "대동"
        },
      },
      daedeokgu: {
        name: "대덕구",
        dongs: {
          songchon: "송촌동", jungni: "중리동", birae: "비래동", beopdong: "법동",
          sintanjin: "신탄진동", seokbong: "석봉동", moksang: "목상동", ojeong: "오정동", daehwa: "대화동"
        },
      },
    },
  },
  cheongju: {
    name: "청주",
    phone: "0507-1280-3336",
    districts: {
      sangdang: {
        name: "상당구",
        dongs: {
          seongan: "성안동", jungang: "중앙동", tapdaeseong: "탑대성동", yeongun: "영운동",
          geumcheon: "금천동", yongdam_myeongam_sanseong: "용담명암산성동", yongam: "용암동"
        },
      },
      seowon: {
        name: "서원구",
        dongs: {
          sajik: "사직동", sachang: "사창동", mochung: "모충동", sannam: "산남동",
          bunpyeong: "분평동", sugok: "수곡동", seonghwa_gaeshin_juk림: "성화개신죽림동"
        },
      },
      heungdeok: {
        name: "흥덕구",
        dongs: {
          bokdae: "복대동", gagyeong: "가경동", biha: "비하동", "bongmyeong-cj": "봉명동",
          uncheon_sinbong: "운천신봉동", gangseo: "강서동", songjeol: "송절동"
        },
      },
      cheongwon: {
        name: "청원구",
        dongs: {
          yullyang: "율량동", ochang: "오창읍", jujung: "주중동", uwam: "우암동",
          naedeok: "내덕동", ogunjang: "오근장동", naesu: "내수읍"
        },
      },
    },
  },
};

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

// 94개 동 정적 HTML 생성
export async function generateStaticParams() {
  const paths: { region: string; district: string; dong: string }[] = [];

  Object.entries(EVENT_DONG_DATA).forEach(([regionSlug, region]) => {
    Object.entries(region.districts).forEach(([distSlug, dist]) => {
      Object.keys(dist.dongs).forEach((dongSlug) => {
        paths.push({
          region: regionSlug,
          district: distSlug,
          dong: dongSlug,
        });
      });
    });
  });

  return paths;
}

export const dynamicParams = false;

// 60종 타이틀 / 40종 디스크립션 자동 적용 메타데이터
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district, dong } = await params;
  const regionInfo = EVENT_DONG_DATA[region];
  const distInfo = regionInfo?.districts[district];
  const dongName = distInfo?.dongs[dong];

  if (!regionInfo || !distInfo || !dongName) return {};

  const fullLocation = `${regionInfo.name} ${distInfo.name} ${dongName}`;
  const { title, description } = getRotatedDongSeo(
    regionInfo.name,
    distInfo.name,
    dongName,
    `${fullLocation}_dong_seo_seed`
  );

  const url = `${DOMAIN}/event/${region}/${district}/${dong}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${dongName} 이벤트`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DongEventPage({ params }: PageProps) {
  const { region, district, dong } = await params;
  const regionInfo = EVENT_DONG_DATA[region];
  const distInfo = regionInfo?.districts[district];
  const dongName = distInfo?.dongs[dong];

  if (!regionInfo || !distInfo || !dongName) return notFound();

  const isDaejeon = region === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const fullLocation = `${regionInfo.name} ${distInfo.name} ${dongName}`;

  const { title: headingTitle, description: heroDesc } = getRotatedDongSeo(
    regionInfo.name,
    distInfo.name,
    dongName,
    `${fullLocation}_dong_seo_seed`
  );

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen pb-32">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link
            href={`/massage/${region}/${district}/${dong}`}
            className="text-xs text-gray-300 hover:text-white"
          >
            ← {dongName} 마사지 안내 보기
          </Link>
          <a
            href={`tel:${regionInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs text-black"
            style={{ backgroundColor: mainColor }}
          >
            📞 {dongName} 이벤트 상담
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[800px] mx-auto text-center space-y-10">
        <div>
          <span
            className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border tracking-wider"
            style={{
              color: mainColor,
              borderColor: `${mainColor}40`,
              backgroundColor: `${mainColor}15`,
            }}
          >
            {dongName.toUpperCase()} SPECIAL EVENT
          </span>
          <h1 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
            {headingTitle}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-[620px] mx-auto leading-relaxed">
            {heroDesc}
          </p>
        </div>

        {/* 이벤트 카드 */}
        <div className="space-y-4 text-left">
          <div className="p-6 rounded-2xl bg-[#140f24] border border-white/10 shadow-xl space-y-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              EVENT 01
            </span>
            <h2 className="text-lg font-bold text-white">{dongName} 첫 예약 고객 10,000원 즉시 할인</h2>
            <p className="text-xs sm:text-sm text-gray-300">
              {dongName} 관내 자택, 오피스텔 어디든 첫 이용 시 1만원을 즉시 차감해 드립니다. (예약 시 &quot;{dongName} 이벤트&quot; 말씀해 주세요)
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#140f24] border border-white/10 shadow-xl space-y-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              EVENT 02
            </span>
            <h2 className="text-lg font-bold text-white">{dongName} 30분 도착 보장 &amp; 천연 아로마 UP</h2>
            <p className="text-xs sm:text-sm text-gray-300">
              인근 상주 관리사 우선 배차로 빠르게 도착하며, 고급 에센셜 오일 업그레이드를 무상 제공합니다.
            </p>
          </div>
        </div>

        {/* 바로가기 */}
        <div className="pt-6">
          <Link
            href={`/massage/${region}/${district}/${dong}`}
            className="inline-block px-6 py-3 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 text-sm font-bold text-white transition"
          >
            {dongName} 정규 마사지 코스 및 가격 보기 →
          </Link>
        </div>
      </main>

      {/* 하단 플로팅 예약 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${regionInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {dongName} 1만원 할인 적용 예약하기
        </a>
      </div>
    </div>
  );
}