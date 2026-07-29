import { MetadataRoute } from 'next';
import { CITIES_DATA, DOMAIN } from '@/app/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // CITIES_DATA의 모든 구 및 동 경로 자동 추출
  Object.values(CITIES_DATA).forEach((city) => {
    city.districts.forEach((district) => {
      // '구' 페이지 URL 추가
      routes.push({
        url: `${DOMAIN}/${city.slug}/${district.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      // '동' 페이지 URL 추가
      district.dongs.forEach((dong) => {
        routes.push({
          url: `${DOMAIN}/${city.slug}/${district.slug}/${dong.slug}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    });
  });

  return routes;
}