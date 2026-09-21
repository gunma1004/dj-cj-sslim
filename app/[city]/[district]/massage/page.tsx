import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME, getKeywordModifier } from "@/app/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const paths: { city: string; district: string }[] = [];
  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      paths.push({ city: citySlug, district: district.slug });
    });
  });
  return paths;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return {};

  const areaName = cityInfo.name + " " + districtInfo.name;
  const modifier = getKeywordModifier(areaName + "_district");
  
  const title = areaName + " " + modifier.prefix + " 마사지 전문 프로그램 | " + BRAND_NAME;
  const description = areaName + " 전 지역 신속한 출장 서비스와 함께 지친 심신을 달래줄 편안한 힐링 마사지 프로그램 안내. 선입금 없는 후불제.";
  const url = DOMAIN + "/" + city + "/" + district + "/massage";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND_NAME + " " + areaName,
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function DistrictMassagePage({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const areaName = cityInfo.name + " " + districtInfo.name;
  const modifier = getKeywordModifier(areaName + "_district");

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href={"/" + city + "/" + district} className="text-xs text-gray-300 hover:text-white">
            ← {districtInfo.name} 메인으로 돌아가기
          </Link>
          <a
            href={"tel:" + cityInfo.phone}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
            style={{ backgroundColor: mainColor }}
          >
            📞 {districtInfo.name} 예약 문의
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
            {areaName} PROGRAM
          </span>

          <h1 className="text-3xl sm:text-5xl font-black mb-4">
            {areaName} {modifier.prefix} 마사지 안내
          </h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {modifier.sub} <br />
            전문 테라피스트의 섬세한 케어로 일상의 피로를 말끔히 해소해 드립니다.
          </p>
        </div>

        <section className="p-6 sm:p-8 rounded-3xl bg-[#140f24] border border-white/10 text-left space-y-6 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-black text-white border-b border-white/10 pb-4">
            ✨ {districtInfo.name} 세부 프로그램 안내
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
            <p>
              {areaName} 내 오피스텔, 주거지, 호텔 등 원하시는 장소로 빠르고 안전하게 방문하여 최상의 컨디셔닝을 제공합니다. 선입금 없는 현장 후불제.
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
          📞 {districtInfo.name} 빠른 예약 연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}