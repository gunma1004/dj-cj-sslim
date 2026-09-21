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

export async function generateMetadata({ params }: { params: Promise<{ city: string; district: string }> }) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  if (!cityInfo || !districtInfo) return {};

  const areaName = cityInfo.name + " " + districtInfo.name;
  const modifier = getKeywordModifier(areaName + "_district");
  
  const title = areaName + " " + modifier.prefix + " 마사지 전문 프로그램 | " + BRAND_NAME;
  const description = areaName + " 전 지역 신속한 출장 서비스와 함께 지친 심신을 달래줄 편안한 힐링 마사지 프로그램 안내. 선입금 없는 후불제.";
  const url = DOMAIN + "/massage/" + city + "/" + district;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: BRAND_NAME + " " + areaName, locale: "ko_KR", type: "website" },
  };
}

export default async function DistrictMassagePage({ params }: { params: Promise<{ city: string; district: string }> }) {
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
          <Link href={"/massage/" + city} className="text-xs text-gray-300 hover:text-white">← {cityInfo.name} 전체보기</Link>
          <a href={"tel:" + cityInfo.phone} className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105" style={{ backgroundColor: mainColor }}>
            📞 {districtInfo.name} 예약 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        <div>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border" style={{ color: mainColor, borderColor: mainColor + "40", backgroundColor: mainColor + "15" }}>
            {areaName} PROGRAM
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-4">{areaName} {modifier.prefix} 마사지 안내</h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">{modifier.sub}</p>
        </div>

        {/* 동별 이동 링크 섹션 */}
        <section className="text-left space-y-4">
          <h2 className="text-xl font-bold text-gray-300">📍 {districtInfo.name} 동별 상세 선택</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {districtInfo.dongs.map((dong) => (
              <Link key={dong.slug} href={"/massage/" + city + "/" + district + "/" + dong.slug} className="py-2.5 px-3 rounded-xl bg-[#140f24] border border-white/10 text-xs text-gray-200 font-bold hover:bg-white/20 transition-all text-center truncate">
                {dong.name} 마사지
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}