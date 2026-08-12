import Link from "next/link";
import Image from "next/image";
import { CITIES_DATA, DOMAIN } from "@/app/data";
import { notFound } from "next/navigation";

// 1. 빌드 타임에 정적 생성할 [city]/[district] 경로 목록 등록 (SSG)
export async function generateStaticParams() {
  const paths: { city: string; district: string }[] = [];

  Object.values(CITIES_DATA).forEach((city) => {
    city.districts.forEach((district) => {
      paths.push({
        city: city.slug,
        district: district.slug,
      });
    });
  });

  return paths;
}

export const dynamicParams = false;

// 2. 구별 메타데이터 생성 (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city: citySlug, district: districtSlug } = await params;
  const cityInfo = CITIES_DATA[citySlug];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === districtSlug);

  if (!cityInfo || !districtInfo) return {};

  const title = `${cityInfo.name} ${districtInfo.name} 출장마사지 | 24시 방문 힐링케어`;
  const description = `${cityInfo.name} ${districtInfo.name} 24시 출장마사지 전문. ${districtInfo.name} 전 지역 30분 내 신속 방문, 건식·아로마·스웨디시 100% 후불제.`;
  const url = `${DOMAIN}/${citySlug}/${districtSlug}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: `${cityInfo.name} 출장마사지`,
      locale: "ko_KR",
      type: "website",
    },
  };
}

// 3. 구 페이지 본문 컴포넌트
export default async function DistrictPage({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city: citySlug, district: districtSlug } = await params;
  const cityInfo = CITIES_DATA[citySlug];
  if (!cityInfo) return notFound();

  const districtInfo = cityInfo.districts.find((d) => d.slug === districtSlug);
  if (!districtInfo) return notFound();

  const isDaejeon = citySlug === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* 네이버 수집용 우회 DOM */}
      <div className="naver-carousel-dom sr-only" aria-hidden="true">
        <ul>
          {districtInfo.dongs.map((dong) => (
            <li key={dong.slug}>
              <a href={`/${citySlug}/${districtSlug}/${dong.slug}`}>
                <strong>
                  {cityInfo.name} {districtInfo.name} {dong.name} 출장마사지
                </strong>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="대전 청주 출장마사지"
              width={300}
              height={80}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
            />
          </Link>
          <a
            href={`tel:${cityInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black transition-transform hover:scale-105"
            style={{ backgroundColor: mainColor }}
          >
            📞 {cityInfo.name}지역담당 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center">
        {/* 구 페이지용 빵부순(Breadcrumb) */}
        <nav className="text-xs text-gray-400 space-x-2 text-left mb-6">
          <Link href="/" className="hover:underline">홈</Link> &gt; 
          <span className="text-white font-bold">{cityInfo.name} {districtInfo.name}</span>
        </nav>

        <span
          className="inline-block px-3.5 py-1 rounded-full text-xs font-black mb-3 border"
          style={{
            color: mainColor,
            borderColor: `${mainColor}40`,
            backgroundColor: `${mainColor}15`,
          }}
        >
          {cityInfo.name} {districtInfo.name} 24시 방문 서비스
        </span>
        <h1 className="text-3xl sm:text-5xl font-black mb-4">
          {cityInfo.name} {districtInfo.name} 출장마사지
        </h1>
        <p className="text-[#e1d9f5] text-base sm:text-lg mb-8 max-w-[650px] mx-auto leading-relaxed">
          {cityInfo.name} {districtInfo.name} 내 전 동 지역 20~30분 이내 신속 방문! <br />
          선입금 없는 100% 후불제로 안전하게 관리받으세요.
        </p>

        {/* 동 이동 카드 그리드 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-left text-gray-300">
            📍 {districtInfo.name} 동별 바로가기
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            {districtInfo.dongs.map((dong) => (
              <Link
                key={dong.slug}
                href={`/${citySlug}/${districtSlug}/${dong.slug}`}
                className="p-4 rounded-2xl bg-[#140f24] border border-white/10 hover:border-[#00ff88] transition-all text-center block group"
              >
                <span className="text-base font-bold text-white block mb-1 group-hover:text-[#00ff88]">
                  {dong.name}
                </span>
                <span className="text-xs text-gray-400 block">바로가기 →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 요금 표 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-left text-gray-300">
            💳 {districtInfo.name} 이용 코스 및 요금
          </h2>
          <div className="overflow-x-auto rounded-3xl border border-white/15 bg-[#140f24] shadow-2xl">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr
                  className="text-black font-black text-sm"
                  style={{ backgroundColor: mainColor }}
                >
                  <th className="py-4 px-4">코스</th>
                  <th className="py-4 px-3">60분</th>
                  <th className="py-4 px-3">90분</th>
                  <th className="py-4 px-3">120분</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                <tr>
                  <th className="py-4 px-4 font-extrabold text-left sm:text-center text-white">건식 마사지</th>
                  <td className="py-4 px-3 font-bold">60,000원</td>
                  <td className="py-4 px-3 font-bold">70,000원</td>
                  <td className="py-4 px-3 font-bold">80,000원</td>
                </tr>
                <tr>
                  <th className="py-4 px-4 font-extrabold text-left sm:text-center text-white">아로마 마사지</th>
                  <td className="py-4 px-3 font-bold">60,000원</td>
                  <td className="py-4 px-3 font-bold">80,000원</td>
                  <td className="py-4 px-3 font-bold">90,000원</td>
                </tr>
                <tr>
                  <th className="py-4 px-4 font-extrabold text-left sm:text-center text-white">스페셜 마사지</th>
                  <td className="py-4 px-3 font-bold">90,000원</td>
                  <td className="py-4 px-3 font-bold">120,000원</td>
                  <td className="py-4 px-3 font-bold">150,000원</td>
                </tr>
                <tr className="bg-[#ba8cff]/10">
                  <th className="py-4 px-4 font-extrabold text-left sm:text-center text-[#ba8cff]">VIP 스웨디시</th>
                  <td className="py-4 px-3 font-black text-white">100,000원</td>
                  <td className="py-4 px-3 font-black text-white">120,000원</td>
                  <td className="py-4 px-3 font-black text-white">150,000원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 문의 버튼 */}
        <div className="grid grid-cols-2 gap-3 max-w-[480px] mx-auto">
          <a
            href={`tel:${cityInfo.phone}`}
            className="py-4 rounded-2xl font-black text-black text-base shadow-lg hover:scale-105 transition-all"
            style={{ backgroundColor: mainColor }}
          >
            📞 {districtInfo.name} 전화하기
          </a>
          <a
            href={`sms:${cityInfo.phone}`}
            className="py-4 rounded-2xl bg-white text-black font-black text-base shadow-lg hover:scale-105 transition-all"
          >
            💬 {districtInfo.name} 문자하기
          </a>
        </div>
      </main>

      {/* 모바일 하단 고정바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1 active:scale-95 transition-all"
          style={{ backgroundColor: mainColor }}
        >
          📞 {cityInfo.name}지역담당 바로연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}