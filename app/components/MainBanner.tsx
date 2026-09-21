import MainBanner from "../components/MainBanner";

export default function HomePage() {
  return (
    <div>
      {/* 상단 메인 배너 컴포넌트 삽입 */}
      <MainBanner 
        badge="대전·청주 전 지역 프라이빗 케어"
        title="지친 하루의 완벽한 힐링,\n프리미엄 홈 테라피"
        description="전문 테라피스트가 계신 곳으로 신속하게 방문하여 편안한 바디 컨디셔닝을 도와드립니다."
        primaryCtaText="📞 실시간 예약 문의"
        primaryCtaLink="tel:0507-1280-3335"
        secondaryCtaText="지역별 서비스 안내 보기"
        secondaryCtaLink="#area"
      />
      
      {/* 이후 기존 본문 내용 이어지기 */}
    </div>
  );
}