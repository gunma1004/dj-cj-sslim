import { MetadataRoute } from "next";

const DOMAIN = "https://dj-cj-sslim.netlify.app";

// 외부 import 깨짐을 방지하는 안전 내장 데이터
const SITEMAP_CITIES_DATA = {
  daejeon: {
    slug: "daejeon",
    districts: [
      {
        slug: "seo",
        dongs: [
          "dunsan", "wolpyeong", "tanbang", "galma", "mannyeon", "gwejeong",
          "yongmun", "gajang", "nae", "byeon", "doma", "jeongnim", "boksu",
          "gwanjeo", "doan", "gasuwon", "giseong"
        ],
      },
      {
        slug: "yuseong",
        dongs: [
          "bongmyeong", "gundong", "jangdae", "guam", "sangdae", "wonsinheung",
          "noeun", "jijok", "banseok", "sinsung", "jeonmin", "gwanpyeong",
          "yongsan", "taprip", "deokmyeong", "hakhwa", "jinjam"
        ],
      },
      {
        slug: "junggu",
        dongs: [
          "eunhaeng", "seonhwa", "daeheung", "oryu", "taepyeong", "yucheon",
          "munhwa", "sanseong", "yongdu", "mok", "jungchon"
        ],
      },
      {
        slug: "donggu",
        dongs: [
          "yongjeon", "gayang", "hondo", "seongnam", "zayang", "panam",
          "sinan", "indong", "hyodong", "daedong"
        ],
      },
      {
        slug: "daedeokgu",
        dongs: [
          "songchon", "jungni", "birae", "beopdong", "sintanjin", "seokbong",
          "moksang", "ojeong", "daehwa"
        ],
      },
    ],
  },
  cheongju: {
    slug: "cheongju",
    districts: [
      {
        slug: "sangdang",
        dongs: [
          "seongan", "jungang", "tapdaeseong", "yeongun", "geumcheon",
          "yongdam_myeongam_sanseong", "yongam"
        ],
      },
      {
        slug: "seowon",
        dongs: [
          "sajik", "sachang", "mochung", "sannam", "bunpyeong", "sugok",
          "seonghwa_gaeshin_jukrim"
        ],
      },
      {
        slug: "heungdeok",
        dongs: [
          "bokdae", "gagyeong", "biha", "bongmyeong-cj", "uncheon_sinbong",
          "gangseo", "songjeol"
        ],
      },
      {
        slug: "cheongwon",
        dongs: [
          "yullyang", "ochang", "jujung", "uwam", "naedeok", "ogunjang", "naesu"
        ],
      },
    ],
  },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: MetadataRoute.Sitemap = [];

  // 1. 메인 및 단독 시 페이지
  routes.push({
    url: DOMAIN,
    lastModified,
    changeFrequency: "daily",
    priority: 1.0,
  });

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

  // 2. 이벤트 메인 허브
  routes.push({
    url: `${DOMAIN}/event`,
    lastModified,
    changeFrequency: "daily",
    priority: 0.9,
  });

  // 3. /massage 및 /event [시 / 구 / 동] 전체 자동 루프 생성
  Object.entries(SITEMAP_CITIES_DATA).forEach(([citySlug, city]) => {
    // [시] 레벨
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
      // [구] 레벨
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

      // [동] 레벨
      district.dongs.forEach((dongSlug) => {
        routes.push(
          {
            url: `${DOMAIN}/massage/${citySlug}/${district.slug}/${dongSlug}`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
          },
          {
            url: `${DOMAIN}/event/${citySlug}/${district.slug}/${dongSlug}`,
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