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

  // 2. 시, 구, 동 및 각각의 /massage 페이지 전체 자동 생성
  Object.entries(CITIES_DATA).forEach(([citySlug, city]) => {
    // 시 메인 페이지
    routes.push({
      url: DOMAIN + "/" + citySlug,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    });

    // 시 /massage 페이지
    routes.push({
      url: DOMAIN + "/" + citySlug + "/massage",
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    });

    city.districts.forEach((district) => {
      // 구 메인 페이지
      routes.push({
        url: DOMAIN + "/" + citySlug + "/" + district.slug,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // 구 /massage 페이지
      routes.push({
        url: DOMAIN + "/" + citySlug + "/" + district.slug + "/massage",
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
      });

      district.dongs.forEach((dong) => {
        // 동 메인 페이지
        routes.push({
          url: DOMAIN + "/" + citySlug + "/" + district.slug + "/" + dong.slug,
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        });

        // 동 /massage 페이지
        routes.push({
          url: DOMAIN + "/" + citySlug + "/" + district.slug + "/" + dong.slug + "/massage",
          lastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      });
    });
  });

  return routes;
}