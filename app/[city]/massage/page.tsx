import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME } from "@/app/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return Object.keys(CITIES_DATA).map((city) => ({
    city: city,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return {};

  const title = cityInfo.name + " 전 지역 마사지 프로그램 안내 | " + BRAND_NAME;
  const description = cityInfo.name + " 전 지역 신속한 출장 서비스와 함께 지친 심신을 달래줄 편안한 힐링 마사지 종합 안내. 선입금 없는 후불제.";
  const url = DOMAIN + "/" + city + "/massage";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND_NAME + " " + cityInfo.name,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function CityMassagePage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const cityInfo = CITIES_DATA[city];

  if (!cityInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href={"/" + city} className="text-xs text-gray-300 hover:text-white">
            ← {cityInfo.name} 메인으로 돌아가기
          </Link>
          <a
            href={"tel:" + cityInfo.phone}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
            style={{ backgroundColor: mainColor }}
          >
            📞 {cityInfo.name} 예약 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        <div>
          <span
            className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border"
            style={{
              color: mainColor,
              borderColor: mainColor + "40",
              backgroundColor: mainColor + "15",
            }}
          >
            {cityInfo.name.toUpperCase()} TOTAL CARE
          </span>

          <h1 className="text-3xl sm:text-5xl font-black mb-4">
            {cityInfo.name} 전 지역 마사지 서비스 안내
          </h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {cityInfo.name} 전 지역 전문 테라피스트의 체계적인 방문 프로그램으로 일상의 피로를 회복하세요.
          </p>
        </div>

        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4">
            ✨ {cityInfo.name} 권역별 맞춤 테라피 특징
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {cityInfo.name} 시내 전 구역 및 동별 상세 맞춤형 방문 테라피를 제공하고 있습니다. 선입금 없는 100% 현장 후불제로 안전합니다.
            </p>
          </div>
        </section>
      </main>

      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={"tel:" + cityInfo.phone}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {cityInfo.name} 마사지 예약 문의 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}