import { MetadataRoute } from "next";
import { CITIES_DATA, DOMAIN } from "@/app/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const routes: MetadataRoute.Sitemap = [];

  // 1. 메인 홈
  routes.push({
    url: DOMAIN,
    lastModified,
    changeFrequency: "daily",
    priority: 1.0,
  });

  // 2. 단독 대전·청주 홈 랜딩
  routes.push(
    {
      url: `${DOMAIN}/daejeon`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/cheongju`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    }
  );

  // 3. 이벤트 메인 허브
  routes.push({
    url: `${DOMAIN}/event`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.9,
  });

  // 4. /massage 및 /event 전체 시·구·동 자동 루프 등록
  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    // [시] 마사지 & 이벤트
    routes.push(
      {
        url: `${DOMAIN}/massage/${citySlug}`,
        lastModified,
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${DOMAIN}/event/${citySlug}`,
        lastModified,
        changeFrequency: "daily",
        priority: 0.85,
      }
    );

    city.districts.forEach((district) => {
      // [구] 마사지 & 이벤트
      routes.push(
        {
          url: `${DOMAIN}/massage/${citySlug}/${district.slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.8,
        },
        {
          url: `${DOMAIN}/event/${citySlug}/${district.slug}`,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.8,
        }
      );

      // [동] 마사지 & 이벤트
      district.dongs.forEach((dong) => {
        routes.push(
          {
            url: `${DOMAIN}/massage/${citySlug}/${district.slug}/${dong.slug}`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
          },
          {
            url: `${DOMAIN}/event/${citySlug}/${district.slug}/${dong.slug}`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.75,
          }
        );
      });
    });
  });

  return routes;
}