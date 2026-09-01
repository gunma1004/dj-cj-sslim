import Link from "next/link";

interface MainBannerProps {
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function MainBanner({
  badge = "프리미엄 1:1 맞춤 홈 케어",
  title = "대전·청주 전 지역\n프라이빗 홈 바디 테라피",
  description = "지친 일상에 편안한 휴식을 선사합니다. 계신 곳 어디서나 전문 테라피스트의 맞춤 힐링 케어를 경험해보세요.",
  primaryCtaText = "예약 및 코스 문의",
  primaryCtaLink = "tel:010-0000-0000",
  secondaryCtaText = "지역별 서비스 안내",
  secondaryCtaLink = "/daejeon",
}: MainBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-20 md:py-28 px-6">
      {/* 배경 장식 원형 그라디언트 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* 상단 뱃지 */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            {badge}
          </div>
        )}

        {/* 메인 타이틀 */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight whitespace-pre-line text-slate-100">
          {title}
        </h1>

        {/* 서브 설명 문구 */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* CTA 버튼 그룹 */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryCtaLink}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors duration-200 shadow-lg shadow-indigo-600/30 text-center"
          >
            {primaryCtaText}
          </Link>
          <Link
            href={secondaryCtaLink}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-medium transition-colors duration-200 text-center"
          >
            {secondaryCtaText}
          </Link>
        </div>
      </div>
    </section>
  );
}