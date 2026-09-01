import { MetadataRoute } from 'next';
import { CITIES_DATA, DOMAIN } from '@/app/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: DOMAIN,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  Object.values(CITIES_DATA).forEach((city) => {
    // 1. '시' 페이지 URL (/daejeon, /cheongju)
    routes.push({
      url: `${DOMAIN}/${city.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    city.districts.forEach((district) => {
      // 2. '구' 페이지 URL (/daejeon/yuseong 등)
      routes.push({
        url: `${DOMAIN}/${city.slug}/${district.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.8,
      });

      // 3. '동' 페이지 URL (/daejeon/yuseong/bongmyeong 등)
      district.dongs.forEach((dong) => {
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