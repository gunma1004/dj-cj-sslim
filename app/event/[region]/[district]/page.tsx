import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

// =========================================================================
// 1. 이벤트 구 페이지 전용 타이틀 패턴 풀 60종 (구 바로 뒤 "마사지" 고정)
// =========================================================================
const DISTRICT_EVENT_TITLE_POOL_60 = [
  "{{city}} {{district}} 마사지 할인 이벤트 총정리｜첫방문 10,000원 즉시 차감 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 업소 가이드｜선입금 없는 100% 안심 후불제 - {{brand}}",
  "{{city}} {{district}} 마사지 단독 프로모션｜감성 스웨디시 & 아로마 힐링 샵 - {{brand}}",
  "{{city}} {{district}} 마사지 24시 신속 방문｜직장인 야근 피로회복 전문 - {{brand}}",
  "{{city}} {{district}} 마사지 가격 & 코스 비교｜전 지역 30분 도착 보장 - {{brand}}",
  "{{city}} {{district}} 마사지 후기 좋은 샵 모음｜1:1 맞춤 프라이빗 바디스파 - {{brand}}",
  "{{city}} {{district}} 마사지 혜택 모아보기｜야간·심야 24시 안심 예약 센터 - {{brand}}",
  "{{city}} {{district}} 마사지 프리미엄 안내｜자택·오피스텔 호텔식 테라피 - {{brand}}",
  "{{city}} {{district}} 마사지 베스트 리스트｜단골들이 보증하는 홈 바디케어 - {{brand}}",
  "{{city}} {{district}} 마사지 전문 힐링 가이드｜굳은 어깨 림프 이완 스트레칭 - {{brand}}",
  "{{city}} {{district}} 마사지 실속 예약 가이드｜투명한 정찰제와 신속 배차 - {{brand}}",
  "{{city}} {{district}} 마사지 스웨디시 이벤트｜부드러운 오일 림프 순환 케어 - {{brand}}",
  "{{city}} {{district}} 마사지 홈타이 추천 1위｜동네별 상주 관리사 빠른 출동 - {{brand}}",
  "{{city}} {{district}} 마사지 천연 아로마 코스｜최고급 에센셜 오일 무상 업그레이드 - {{brand}}",
  "{{city}} {{district}} 마사지 안심 결제 시스템｜예약금 요구 없는 현장 정산 - {{brand}}",
  "{{city}} {{district}} 마사지 오픈 기념 특가｜첫 이용 고객 단독 할인 쿠폰 - {{brand}}",
  "{{city}} {{district}} 마사지 24시간 연중무휴｜새벽에도 편안하게 부르는 홈스파 - {{brand}}",
  "{{city}} {{district}} 마사지 VIP 힐링 프로그램｜품격 높은 전신 컨디셔닝 - {{brand}}",
  "{{city}} {{district}} 마사지 정통 건식 타이｜뭉친 근육을 풀어주는 활력 코스 - {{brand}}",
  "{{city}} {{district}} 마사지 감성 릴렉스 스파｜하루의 피로를 녹이는 맞춤 케어 - {{brand}}",
  "{{city}} {{district}} 마사지 특별 혜택 가이드｜동네별 제휴 테라피스트 안내 - {{brand}}",
  "{{city}} {{district}} 마사지 신속 배차 약속｜전화 한 통으로 간편 예약 완료 - {{brand}}",
  "{{city}} {{district}} 마사지 이벤트 모아보기｜첫 예약 1만원 특별 할인권 증정 - {{brand}}",
  "{{city}} {{district}} 마사지 검증 업소 총집합｜믿고 이용하는 1:1 방문 케어 - {{brand}}",
  "{{city}} {{district}} 마사지 맞춤 코스 안내｜체형별 최적화된 바디 힐링 프로그램 - {{brand}}",
  "{{city}} {{district}} 마사지 간편 예약 센터｜이동 없는 내 집 안방 힐링 휴식 - {{brand}}",
  "{{city}} {{district}} 마사지 이용 후기 추천｜재이용률 높은 고품격 홈타이 - {{brand}}",
  "{{city}} {{district}} 마사지 당일 즉시 방문｜24시간 대기 관리사 우선 배차 - {{brand}}",
  "{{city}} {{district}} 마사지 피로회복 솔루션｜목·등 집중 케어로 가벼운 몸 - {{brand}}",
  "{{city}} {{district}} 마사지 프라이빗 케어｜위생적이고 쾌적한 1인 힐링 공간 - {{brand}}",
  "{{city}} {{district}} 마사지 안심 케어 센터｜사기 걱정 없는 정직한 후불 결제 - {{brand}}",
  "{{city}} {{district}} 마사지 스웨디시 추천｜감각적인 힐링 터칭과 림프 배농 - {{brand}}",
  "{{city}} {{district}} 마사지 홈타이 코스 비교｜시원한 전신 지압과 스트레칭 - {{brand}}",
  "{{city}} {{district}} 마사지 아로마 테라피｜은은한 향기로 심신 안정 돕는 케어 - {{brand}}",
  "{{city}} {{district}} 마사지 심야 안심 예약｜야근 후 늦은 시간에도 빠른 출동 - {{brand}}",
  "{{city}} {{district}} 마사지 인기 코스 총정리｜고객 평점 높은 최상위 테라피 - {{brand}}",
  "{{city}} {{district}} 마사지 얼리버드 프로모션｜낮 시간대 이용 시 추가 혜택 - {{brand}}",
  "{{city}} {{district}} 마사지 정성 가득 케어｜지인 소개 만족도 1위 방문 홈케어 - {{brand}}",
  "{{city}} {{district}} 마사지 급행 방문 안내｜관내 전 지역 30분 도착 보장 - {{brand}}",
  "{{city}} {{district}} 마사지 힐링 추천 안내｜숙련된 관리사의 정성 어린 손길 - {{brand}}",
  "{{city}} {{district}} 마사지 명품 바디스파｜최고급 오일과 함께하는 깊은 휴식 - {{brand}}",
  "{{city}} {{district}} 마사지 1:1 맞춤 예약｜내 컨디션에 맞춘 압 조절 테라피 - {{brand}}",
  "{{city}} {{district}} 마사지 단독 혜택 리스트｜오픈 기념 풍성한 이벤트 모음 - {{brand}}",
  "{{city}} {{district}} 마사지 림프 순환 가이드｜붓기 완화와 가벼운 전신 컨디션 - {{brand}}",
  "{{city}} {{district}} 마사지 홈스파 가이드｜호텔 스위트룸 느낌의 방문 테라피 - {{brand}}",
  "{{city}} {{district}} 마사지 신속 출동 서비스｜관내 주요 거점 상시 대기 시스템 - {{brand}}",
  "{{city}} {{district}} 마사지 스트레스 해소 코스｜지친 직장인을 위한 바디 리셋 - {{brand}}",
  "{{city}} {{district}} 마사지 24시 홈케어 센터｜주말 및 공휴일 정상 배차 운영 - {{brand}}",
  "{{city}} {{district}} 마사지 클린 예약 안내｜선입금 일절 없는 100% 현장 결제 - {{brand}}",
  "{{city}} {{district}} 마사지 전 코스 안내｜건식·아로마·스웨디시 완벽 구성 - {{brand}}",
  "{{city}} {{district}} 마사지 최고 만족도 보장｜정성 가득한 방문 힐링 서비스 - {{brand}}",
  "{{city}} {{district}} 마사지 힐링 가이드북｜동별 상세 위치 및 실시간 코스 - {{brand}}",
  "{{city}} {{district}} 마사지 단독 특별가｜첫 방문 10,000원 즉시 할인 혜택 - {{brand}}",
  "{{city}} {{district}} 마사지 섬세한 손길｜피로를 말끔히 지워주는 맞춤 힐링 - {{brand}}",
  "{{city}} {{district}} 마사지 추천 코스 리스트｜단골들이 찾는 가성비 1등 케어 - {{brand}}",
  "{{city}} {{district}} 마사지 웰니스 라이프｜내 방에서 안전하게 누리는 안식처 - {{brand}}",
  "{{city}} {{district}} 마사지 전신 피로 리셋｜뭉친 근육을 부드럽게 푸는 시간 - {{brand}}",
  "{{city}} {{district}} 마사지 실시간 상담｜원하는 시간대에 딱 맞춘 방문 테라피 - {{brand}}",
  "{{city}} {{district}} 마사지 프리미엄 홈타이｜합리적인 가격과 차별화된 만족감 - {{brand}}",
  "{{city}} {{district}} 마사지 완벽한 휴식 코스｜일상 속 편안한 쉼표를 찍는 케어 - {{brand}}"
];

// =========================================================================
// 2. 이벤트 구 페이지 전용 메타 디스크립션 패턴 풀 40종 (구 바로 뒤 "출장 마사지" 고정)
// =========================================================================
const DISTRICT_EVENT_DESC_POOL_40 = [
  "{{city}} {{district}} 출장 마사지 단독 오픈 이벤트! 첫 예약 고객 10,000원 즉시 할인 혜택과 선입금 없는 100% 현장 후불제 안심 케어를 확인해보세요.",
  "{{city}} {{district}} 출장 마사지 추천 업소 안내! 스웨디시, 타이, 천연 아로마 코스를 관내 어디든 30분 내외로 빠르게 방문하여 정성껏 관리해 드립니다.",
  "선입금 없는 100% 후불제! {{city}} {{district}} 출장 마사지에서 안전하고 편안하게 피로를 풀어보세요. 첫 방문 단독 할인 프로모션을 진행 중입니다.",
  "{{city}} {{district}} 출장 마사지 24시간 실시간 예약 안내. 자택, 오피스텔 어디든 전문 테라피스트가 신속 방문하여 1:1 맞춤 바디케어를 선사합니다.",
  "{{city}} {{district}} 출장 마사지 만족도 1위! 뭉친 근육을 부드럽게 이완하는 감성 스웨디시와 타이 코스를 동네 최저가 혜택으로 만나보세요.",
  "퇴근 후 힐링은 {{city}} {{district}} 출장 마사지와 함께! 전 지역 신속 배차로 지체 없이 찾아가 지친 몸과 마음에 활력을 충전해 드립니다.",
  "{{city}} {{district}} 출장 마사지 특별 프로모션! 첫 방문 1만원 할인부터 최고급 천연 에센셜 오일 무상 업그레이드까지 풍성한 혜택을 전해드립니다.",
  "{{city}} {{district}} 출장 마사지 코스 및 투명한 가격 안내. 예약금 요구가 전혀 없는 안전한 현장 후불 결제로 편안하게 휴식을 즐기세요.",
  "후기 좋은 {{city}} {{district}} 출장 마사지 명가! 숙련된 테라피스트의 섬세한 손길로 전신 피로와 림프 순환을 돕는 호텔식 홈스파를 누려보세요.",
  "{{city}} {{district}} 출장 마사지 야간·심야 24시 정상 운영! 늦은 시간에도 관내 전역 어디든 30분 내외로 신속하게 방문해 드립니다.",
  "{{city}} {{district}} 출장 마사지 직장인 맞춤 안내. 굳은 목과 어깨를 집중 관리하는 체계적인 프로그램으로 완벽한 숙면을 도와드립니다.",
  "{{city}} {{district}} 출장 마사지 단독 제휴 혜택 총정리! 선입금 사기 걱정 없는 신뢰할 수 있는 예약 시스템과 빠른 배차 서비스를 확인하세요.",
  "호텔식 프리미엄 테라피를 내 방에서! {{city}} {{district}} 출장 마사지 1:1 방문 서비스로 번거로운 이동 없이 최고의 휴식을 경험해 보세요.",
  "{{city}} {{district}} 출장 마사지 추천 1순위! 부드러운 스웨디시부터 시원한 정통 타이까지 취향에 맞춰 선택하는 맞춤형 프로그램을 안내합니다.",
  "{{city}} {{district}} 출장 마사지 실시간 할인 상담 센터. 지금 예약하시면 첫 방문 10,000원 즉시 차감 혜택이 바로 적용됩니다.",
  "단골이 강력 추천하는 {{city}} {{district}} 출장 마사지! 청결한 소독 관리와 최고급 천연 오일 사용으로 위생적이고 쾌적한 힐링을 보장합니다.",
  "{{city}} {{district}} 출장 마사지 24시 안심 케어. 관내 어디서나 전화 한 통이면 검증된 테라피스트가 고객님 계신 곳으로 빠르게 찾아갑니다.",
  "피로 회복 전문 {{city}} {{district}} 출장 마사지 가이드! 체계적인 스트레칭과 오일 테라피 코스로 일상 속 무거운 몸을 가볍게 회복하세요.",
  "{{city}} {{district}} 출장 마사지 투명 정찰제 안내. 군더더기 없는 정직한 코스 요금과 친절하고 섬세한 1:1 케어를 약속드립니다.",
  "{{city}} {{district}} 출장 마사지 얼리버드 & 나이트 프로모션 진행 중! 관내 주민 및 직장인분들을 위한 풍성한 리워드 혜택을 놓치지 마세요.",
  "바쁜 일상 속 프라이빗 힐링, {{city}} {{district}} 출장 마사지! 관내 아파트 및 오피스텔 어디든 30분 도착 보장 시스템을 운영합니다.",
  "{{city}} {{district}} 출장 마사지 감성 테라피 추천. 따뜻한 에센셜 오일과 부드러운 터칭으로 누적된 스트레스를 편안하게 녹여드립니다.",
  "선입금 없는 안심 클린 예약! {{city}} {{district}} 출장 마사지는 관리사 도착 후 결제하는 100% 현장 후불제로 신뢰를 최우선으로 합니다.",
  "{{city}} {{district}} 출장 마사지 샵 평점 및 코스 비교. 관내에서 후기 좋은 방문 테라피를 집에서 가장 편안한 자세로 받아보세요.",
  "지친 하루의 완벽한 쉼표, {{city}} {{district}} 출장 마사지! 전 지역 당일 즉시 예약 및 신속 배차로 빠르게 찾아갑니다.",
  "{{city}} {{district}} 출장 마사지 맞춤 림프 순환 케어. 붓기 완화와 혈액순환에 탁월한 프리미엄 스웨디시 코스를 경험해보세요.",
  "{{city}} {{district}} 출장 마사지 첫 예약 10,000원 즉시 할인 코드 제공! 고객님을 위해 준비된 실속 만점 홈케어 프로모션을 만나보세요.",
  "품격이 다른 바디 컨디셔닝, {{city}} {{district}} 출장 마사지! 엄선된 전문 테라피스트가 관내 전역으로 지체 없이 방문합니다.",
  "{{city}} {{district}} 출장 마사지 24시간 연중무휴 안내. 주말, 공휴일, 늦은 새벽에도 원하는 시간에 편안하게 이용하실 수 있습니다.",
  "집에서 만나는 5성급 힐링 스파, {{city}} {{district}} 출장 마사지! 어디든 전문 도구를 갖추고 깔끔하고 위생적으로 찾아갑니다.",
  "{{city}} {{district}} 출장 마사지 솔직 리뷰 추천! 내 집 안방에서 누리는 프라이빗 테라피로 하루의 피로를 상쾌하게 씻어내세요.",
  "{{city}} {{district}} 출장 마사지 빠른 배차 안내. 인근 상주 관리사 우선 배치로 대기 시간을 줄이고 빠른 힐링 케어를 제공합니다.",
  "선입금 0원, 예약금 사기 걱정 없는 {{city}} {{district}} 출장 마사지! 투명하고 안전한 100% 후불제 시스템으로 안심하고 이용하세요.",
  "{{city}} {{district}} 출장 마사지 추천 코스 총정리! 건식 타이 스트레칭부터 은은한 아로마 테라피까지 관내 최상의 프로그램을 안내합니다.",
  "몸이 무겁고 결릴 땐 {{city}} {{district}} 출장 마사지! 전 지역 30분 안심 방문으로 뭉친 근육을 시원하게 풀어드립니다.",
  "{{city}} {{district}} 출장 마사지 프리미엄 홈타이 & 스웨디시. 프라이빗한 휴식을 원하는 고객님께 최고의 힐링 시간을 선물합니다.",
  "{{city}} {{district}} 출장 마사지 오픈 기념 특별 이벤트! 첫 방문 할인 혜택과 정성 가득한 케어로 일상의 활력을 되찾아보세요.",
  "후기 만족도 높은 {{city}} {{district}} 출장 마사지. 전문 테라피스트의 정성스러운 1:1 방문 케어를 지금 만나보세요.",
  "{{city}} {{district}} 출장 마사지 24시간 실시간 상담 가능! 부담 없는 가격과 투명한 정찰제로 관내 전 지역을 찾아갑니다.",
  "최고의 휴식을 약속하는 {{city}} {{district}} 출장 마사지! 지친 몸을 위한 깊은 이완과 힐링 케어를 선입금 없는 후불제로 경험하세요."
];

const BRAND_NAME = "S슬림";
const DOMAIN = "https://dj-cj-sslim.netlify.app";

// 고유 해시 기반 순환 결정 함수
function getRotatedDistrictEventSeo(cityName: string, districtName: string, seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const titleIndex = absHash % DISTRICT_EVENT_TITLE_POOL_60.length;
  const descIndex = Math.floor(absHash / 7) % DISTRICT_EVENT_DESC_POOL_40.length;

  const title = DISTRICT_EVENT_TITLE_POOL_60[titleIndex]
    .replace(/\{\{city\}\}/g, cityName)
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{brand\}\}/g, BRAND_NAME);

  const description = DISTRICT_EVENT_DESC_POOL_40[descIndex]
    .replace(/\{\{city\}\}/g, cityName)
    .replace(/\{\{district\}\}/g, districtName)
    .replace(/\{\{brand\}\}/g, BRAND_NAME);

  return { title, description };
}

// 안전 내장 데이터 (대전 5개 구, 청주 4개 구)
const EVENT_DISTRICT_DATA: Record<
  string,
  {
    name: string;
    phone: string;
    districts: Record<string, { name: string; dongs: { slug: string; name: string }[] }>;
  }
> = {
  daejeon: {
    name: "대전",
    phone: "0507-1280-3335",
    districts: {
      seo: {
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
          { slug: "giseong", name: "기성동" }
        ],
      },
      yuseong: {
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
          { slug: "jinjam", name: "진잠동" }
        ],
      },
      junggu: {
        name: "중구",
        dongs: [
          { slug: "eunhaeng", name: "은행동" }, { slug: "seonhwa", name: "선화동" },
          { slug: "daeheung", name: "대흥동" }, { slug: "oryu", name: "오류동" },
          { slug: "taepyeong", name: "태평동" }, { slug: "yucheon", name: "유천동" },
          { slug: "munhwa", name: "문화동" }, { slug: "sanseong", name: "산성동" },
          { slug: "yongdu", name: "용두동" }, { slug: "mok", name: "목동" },
          { slug: "jungchon", name: "중촌동" }
        ],
      },
      donggu: {
        name: "동구",
        dongs: [
          { slug: "yongjeon", name: "용전동" }, { slug: "gayang", name: "가양동" },
          { slug: "hondo", name: "홍도동" }, { slug: "seongnam", name: "성남동" },
          { slug: "zayang", name: "자양동" }, { slug: "panam", name: "판암동" },
          { slug: "sinan", name: "신안동" }, { slug: "indong", name: "인동" },
          { slug: "hyodong", name: "효동" }, { slug: "daedong", name: "대동" }
        ],
      },
      daedeokgu: {
        name: "대덕구",
        dongs: [
          { slug: "songchon", name: "송촌동" }, { slug: "jungni", name: "중리동" },
          { slug: "birae", name: "비래동" }, { slug: "beopdong", name: "법동" },
          { slug: "sintanjin", name: "신탄진동" }, { slug: "seokbong", name: "석봉동" },
          { slug: "moksang", name: "목상동" }, { slug: "ojeong", name: "오정동" },
          { slug: "daehwa", name: "대화동" }
        ],
      },
    },
  },
  cheongju: {
    name: "청주",
    phone: "0507-1280-3336",
    districts: {
      sangdang: {
        name: "상당구",
        dongs: [
          { slug: "seongan", name: "성안동" }, { slug: "jungang", name: "중앙동" },
          { slug: "tapdaeseong", name: "탑대성동" }, { slug: "yeongun", name: "영운동" },
          { slug: "geumcheon", name: "금천동" }, { slug: "yongdam_myeongam_sanseong", name: "용담명암산성동" },
          { slug: "yongam", name: "용암동" }
        ],
      },
      seowon: {
        name: "서원구",
        dongs: [
          { slug: "sajik", name: "사직동" }, { slug: "sachang", name: "사창동" },
          { slug: "mochung", name: "모충동" }, { slug: "sannam", name: "산남동" },
          { slug: "bunpyeong", name: "분평동" }, { slug: "sugok", name: "수곡동" },
          { slug: "seonghwa_gaeshin_jukrim", name: "성화개신죽림동" }
        ],
      },
      heungdeok: {
        name: "흥덕구",
        dongs: [
          { slug: "bokdae", name: "복대동" }, { slug: "gagyeong", name: "가경동" },
          { slug: "biha", name: "비하동" }, { slug: "bongmyeong-cj", name: "봉명동" },
          { slug: "uncheon_sinbong", name: "운천신봉동" }, { slug: "gangseo", name: "강서동" },
          { slug: "songjeol", name: "송절동" }
        ],
      },
      cheongwon: {
        name: "청원구",
        dongs: [
          { slug: "yullyang", name: "율량동" }, { slug: "ochang", name: "오창읍" },
          { slug: "jujung", name: "주중동" }, { slug: "uwam", name: "우암동" },
          { slug: "naedeok", name: "내덕동" }, { slug: "ogunjang", name: "오근장동" },
          { slug: "naesu", name: "내수읍" }
        ],
      },
    },
  },
};

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
}

// ⚠️ output: export 필수 함수 (대전 5개 구 + 청주 4개 구 사전 렌더링)
export async function generateStaticParams() {
  const paths: { region: string; district: string }[] = [];

  Object.entries(EVENT_DISTRICT_DATA).forEach(([regionSlug, region]) => {
    Object.keys(region.districts).forEach((districtSlug) => {
      paths.push({
        region: regionSlug,
        district: districtSlug,
      });
    });
  });

  return paths;
}

export const dynamicParams = false;

// 60종 타이틀 (구+마사지) & 40종 디스크립션 (구+출장 마사지) 적용
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district } = await params;
  const regionInfo = EVENT_DISTRICT_DATA[region];
  const distInfo = regionInfo?.districts[district];

  if (!regionInfo || !distInfo) return {};

  const fullDistName = `${regionInfo.name} ${distInfo.name}`;
  const { title, description } = getRotatedDistrictEventSeo(
    regionInfo.name,
    distInfo.name,
    `${fullDistName}_event_district_seo`
  );

  const url = `${DOMAIN}/event/${region}/${district}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${BRAND_NAME} ${fullDistName} 이벤트`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictEventPage({ params }: PageProps) {
  const { region, district } = await params;
  const regionInfo = EVENT_DISTRICT_DATA[region];
  const distInfo = regionInfo?.districts[district];

  if (!regionInfo || !distInfo) return notFound();

  const isDaejeon = region === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const fullDistName = `${regionInfo.name} ${distInfo.name}`;

  const { title: headingTitle, description: heroDesc } = getRotatedDistrictEventSeo(
    regionInfo.name,
    distInfo.name,
    `${fullDistName}_event_district_seo`
  );

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen pb-36">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link
            href={`/event/${region}`}
            className="text-xs text-gray-300 hover:text-white"
          >
            ← {regionInfo.name} 이벤트 목록
          </Link>
          <a
            href={`tel:${regionInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs text-black"
            style={{ backgroundColor: mainColor }}
          >
            📞 {distInfo.name} 실시간 문의
          </a>
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
            {fullDistName.toUpperCase()} EVENT
          </span>
          <h1 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
            {headingTitle}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-[680px] mx-auto leading-relaxed">
            {heroDesc}
          </p>
        </div>

        {/* 이벤트 안내 카드 */}
        <section className="space-y-4 text-left">
          <div className="p-6 rounded-2xl bg-[#140f24] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                PROMOTION 01
              </span>
              <h2 className="text-lg font-bold text-white">{distInfo.name} 첫 이용 고객 10,000원 즉시 할인</h2>
              <p className="text-xs sm:text-sm text-gray-300">
                {distInfo.name} 전 지역 어디서나 첫 방문 예약 시 10,000원을 즉시 차감해 드립니다.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-base sm:text-lg font-black text-[#00ff88]">10,000원 할인</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#140f24] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                PROMOTION 02
              </span>
              <h2 className="text-lg font-bold text-white">{distInfo.name} 30분 도착 보장 &amp; 천연 아로마 UP</h2>
              <p className="text-xs sm:text-sm text-gray-300">
                상주 테라피스트 우선 배차로 빠른 도착과 함께 천연 에센셜 오일 업그레이드를 무상 제공합니다.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="text-base sm:text-lg font-black text-[#ba8cff]">오일 무상 UP</span>
            </div>
          </div>
        </section>

        {/* 💡 동별 이벤트 바로가기 그리드 */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>📍</span> {distInfo.name} 동별 단독 이벤트 바로가기
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              동네를 선택하시면 동별 특화된 프로모션과 할인 혜택을 확인하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {distInfo.dongs.map((dong) => (
              <Link
                key={dong.slug}
                href={`/event/${region}/${district}/${dong.slug}`}
                className="group p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-center flex flex-col items-center justify-center gap-1"
              >
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors">
                  {dong.name}
                </span>
                <span className="text-[10px] text-gray-400">1만원 할인 받기 →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* 하단 플로팅 예약 바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${regionInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {distInfo.name} 이벤트 실시간 예약
        </a>
      </div>
    </div>
  );
}