import { MetadataRoute } from "next";
import { CITIES_DATA, DOMAIN } from "@/app/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const routes: MetadataRoute.Sitemap = [];

  // 1. 메인 페이지
  routes.push({
    url: DOMAIN,
    lastModified,
    changeFrequency: "daily",
    priority: 1.0,
  });

  // 2. /massage/시/구/동 구조에 맞춘 전체 경로 자동 생성
  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    // 시 레벨 페이지 (/massage/city)
    routes.push({
      url: DOMAIN + "/massage/" + citySlug,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    });

    city.districts.forEach((district) => {
      // 구 레벨 페이지 (/massage/city/district)
      routes.push({
        url: DOMAIN + "/massage/" + citySlug + "/" + district.slug,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      district.dongs.forEach((dong) => {
        // 동 레벨 페이지 (/massage/city/district/dong)
        routes.push({
          url: DOMAIN + "/massage/" + citySlug + "/" + district.slug + "/" + dong.slug,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    });
  });

  return routes;
}