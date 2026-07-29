import Link from "next/link";
import { CITIES_DATA, DOMAIN } from "@/app/data";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; district: string; dong: string }>;
}) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  const districtInfo = cityInfo?.districts.find((d) => d.slug === district);
  const dongInfo = districtInfo?.dongs.find((d) => d.slug === dong);

  if (!cityInfo || !districtInfo || !dongInfo) return {};

  return {
    title: `${cityInfo.name} ${districtInfo.name} ${dongInfo.name} 출장마사지 | 24시 방문`,
    description: `${cityInfo.name} ${dongInfo.name} 출장마사지 24시 신속 방문. ${dongInfo.name} 어디든 20~30분 이내 도착, 건식·아로마·VIP스웨디시 선입금 없는 100% 후불제.`,
    alternates: {
      canonical: `${DOMAIN}/${city}/${district}/${dong}`,
    },
  };
}

export default async function DongPage({
  params,
}: {
  params: Promise<{ city: string; district: string; dong: string }>;
}) {
  const { city, district, dong } = await params;
  const cityInfo = CITIES_DATA[city];
  if (!cityInfo) return notFound();

  const districtInfo = cityInfo.districts.find((d) => d.slug === district);
  if (!districtInfo) return notFound();

  const dongInfo = districtInfo.dongs.find((d) => d.slug === dong);
  if (!dongInfo) return notFound();

  const isDaejeon = city === "daejeon";
  const mainColor = isDaejeon ? "#00ff88" : "#ba8cff";

  return (
    <div className="bg-[#080611] text-white font-sans min-h-screen relative overflow-x-hidden pb-36">
      {/* 상단바 */}
      <header className="sticky top-0 z-40 bg-[#080611]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1160px] mx-auto h-[66px] px-4 flex items-center justify-between">
          <Link
            href={`/${city}/${district}`}
            className="font-extrabold text-sm sm:text-base text-gray-300 hover:text-white"
          >
            ← {districtInfo.name} 전체보기
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
          {cityInfo.name} {dongInfo.name} 맞춤 방문 케어
        </span>
        <h1 className="text-3xl sm:text-5xl font-black mb-4">
          {cityInfo.name} {dongInfo.name} 출장마사지
        </h1>
        <p className="text-[#e1d9f5] text-base sm:text-lg mb-8 max-w-[650px] mx-auto leading-relaxed">
          {dongInfo.name} 전 지역 어디든 계신 곳으로 20~30분 이내 출발합니다. <br />
          선입금 없는 100% 후불제로 안심하고 편안하게 관리받으세요.
        </p>

        {/* 상세 안내 정보 카드 */}
        <section className="p-6 rounded-3xl bg-[#140f24] border border-white/15 text-left mb-10 max-w-[600px] mx-auto space-y-3">
          <h2 className="text-lg font-black" style={{ color: mainColor }}>
            📍 {dongInfo.name} 서비스 안내
          </h2>
          <ul className="text-sm text-gray-200 space-y-2 leading-relaxed">
            <li>• <strong>방문 가능 지역:</strong> {dongInfo.name} 전 지역 (자택, 오피스텔, 호텔 등)</li>
            <li>• <strong>평균 도착 시간:</strong> 예약 확인 후 20~30분 이내</li>
            <li>• <strong>결제 방식:</strong> 선입금 없는 100% 현장 후불제</li>
            <li>• <strong>운영 시간:</strong> 24시간 365일 연중무휴</li>
          </ul>
        </section>

        {/* 요금 표 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-left text-gray-300">
            💳 {dongInfo.name} 코스 및 요금
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

        {/* CTA 버튼 */}
        <div className="grid grid-cols-2 gap-3 max-w-[480px] mx-auto">
          <a
            href={`tel:${cityInfo.phone}`}
            className="py-4 rounded-2xl font-black text-black text-base shadow-lg"
            style={{ backgroundColor: mainColor }}
          >
            📞 {dongInfo.name} 전화예약
          </a>
          <a
            href={`sms:${cityInfo.phone}`}
            className="py-4 rounded-2xl bg-white text-black font-black text-base shadow-lg"
          >
            💬 {dongInfo.name} 문자문의
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
          📞 {dongInfo.name} 전화 연결하기 ({cityInfo.phone.slice(-4)})
        </a>
      </div>
    </div>
  );
}