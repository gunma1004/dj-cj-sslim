import { MetadataRoute } from 'next';
import { CITIES_DATA, DOMAIN } from '@/app/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // 1. 메인 홈페이지 경로
  const routes: MetadataRoute.Sitemap = [
    {
      url: DOMAIN,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // 2. 시, 구, 동 전체 데이터 순회 및 등록
  Object.values(CITIES_DATA).forEach((city) => {
    // 시 페이지 (/daejeon, /cheongju)
    routes.push({
      url: `${DOMAIN}/${city.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    city.districts.forEach((district) => {
      // 구 페이지 (/daejeon/yuseong 등)
      routes.push({
        url: `${DOMAIN}/${city.slug}/${district.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      district.dongs.forEach((dong) => {
        // 동 페이지 (/daejeon/yuseong/bongmyeong 등)
        routes.push({
          url: `${DOMAIN}/${city.slug}/${district.slug}/${dong.slug}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    });
  });

  return routes;
}