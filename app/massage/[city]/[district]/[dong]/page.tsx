import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN, BRAND_NAME, getKeywordModifier } from "@/app/data";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const paths: { city: string; district: string; dong: string }[] = [];
  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    city.districts.forEach((district) => {
      district.dongs.forEach((dong) => {
        paths.push({ city: citySlug, district: district.slug, dong: dong.slug });
      });
    });
  });
  return paths;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ city: string; district: string; dong: string }> }) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);
  if (!cityInfo || !districtInfo || !dongInfo) return {};

  const areaFullName = cityInfo.name + " " + districtInfo.name + " " + dongInfo.name;
  const modifier = getKeywordModifier(areaFullName);

  const title = dongInfo.name + " " + modifier.prefix + " 마사지 집중 안내 | " + BRAND_NAME + " " + cityInfo.name;
  const description = areaFullName + " 전 지역 24시간 신속한 출장 서비스와 맞춤형 힐링 마사지 프로그램. 선입금 없는 안전한 100% 현장 후불제.";
  const url = DOMAIN + "/massage/" + city + "/" + district + "/" + dong;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: BRAND_NAME + " " + dongInfo.name, locale: "ko_KR", type: "website" },
  };
}

export default async function DongMassagePage({ params }: { params: Promise<{ city: string; district: string; dong: string }> }) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);
  if (!cityInfo || !districtInfo || !dongInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";
  const areaFullName = cityInfo.name + " " + districtInfo.name + " " + dongInfo.name;
  const modifier = getKeywordModifier(areaFullName);

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href={"/massage/" + city + "/" + district} className="text-xs text-gray-300 hover:text-white">← {districtInfo.name} 목록으로</Link>
          <a href={"tel:" + cityInfo.phone} className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105" style={{ backgroundColor: mainColor }}>
            📞 {dongInfo.name} 상담 연결
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center space-y-12">
        <div>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border" style={{ color: mainColor, borderColor: mainColor + "40", backgroundColor: mainColor + "15" }}>
            {areaFullName} CARE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mb-4">{dongInfo.name} {modifier.prefix} 마사지 집중 케어</h1>
          <p className="text-[#e1d9f5] text-base sm:text-lg max-w-[650px] mx-auto leading-relaxed">
            {areaFullName} 전 지역 30분 내 방문! 편안하고 안심할 수 있는 힐링 프로그램을 만나보세요.
          </p>
        </div>
      </main>
    </div>
  );
}