import Link from "next/link";
import { CITIES_DATA, DOMAIN } from "@/app/data";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);

  if (!cityInfo || !districtInfo) return {};

  const title = `${cityInfo.name} ${districtInfo.name} 출장마사지 | 24시 방문 힐링케어`;
  // 👇 80자 이내로 문구 가듬기 (약 62자)
  const description = `${cityInfo.name} ${districtInfo.name} 24시 출장마사지 전문. ${districtInfo.name} 전 지역 30분 내 신속 방문, 건식·아로마·스웨디시 100% 후불제.`;
  const url = `${DOMAIN}/${city}/${district}`;

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

export default async function DistrictPage({
  params,
}: {
  params: Promise<{ city: string; district: string }>;
}) {
  const { city, district } = await params;
  const cityInfo = CITIES_DATA[city];
  if (!cityInfo) return notFound();

  const districtInfo = cityInfo.districts.find((d) => d.slug === district);
  if (!districtInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* 네이버 수집용 우회 DOM */}
      <div className="naver-carousel-dom" aria-hidden="true">
        <ul>
          {districtInfo.dongs.map((dong) => (
            <li key={dong.slug}>
              <a href={`/${city}/${district}/${dong.slug}`}>
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
          <Link href="/" className="font-extrabold text-sm sm:text-base text-gray-300 hover:text-white">
            ← 전체 메인으로
          </Link>
          <a
            href={`tel:${cityInfo.phone}`}
            className="px-4 py-2 rounded-full font-black text-xs sm:text-sm text-black"
            style={{ backgroundColor: mainColor }}
          >
            📞 {cityInfo.name}지역담당 문의
          </a>
        </div>
      </header>

      <main className="py-12 px-4 max-w-[900px] mx-auto text-center">
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
                href={`/${city}/${district}/${dong.slug}`}
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
                  <td className="py-4 px-3 font-bold">70,000원</td>
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
            className="py-4 rounded-2xl font-black text-black text-base shadow-lg"
            style={{ backgroundColor: mainColor }}
          >
            📞 {districtInfo.name} 전화하기
          </a>
          <a
            href={`sms:${cityInfo.phone}`}
            className="py-4 rounded-2xl bg-white text-black font-black text-base shadow-lg"
          >
            💬 {districtInfo.name} 문자하기
          </a>
        </div>
      </main>

      {/* 모바일 하단 고정바 */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-[500px] bg-[#080611]/95 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl z-50">
        <a
          href={`tel:${cityInfo.phone}`}
          className="py-3 rounded-xl font-black text-black text-sm flex items-center justify-center gap-1"
          style={{ backgroundColor: mainColor }}
        >
          📞 {cityInfo.name}지역담당 바로연결 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}