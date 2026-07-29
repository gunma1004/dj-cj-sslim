export interface DongData {
  slug: string;
  name: string;
}

export interface DistrictData {
  slug: string;
  name: string;
  dongs: DongData[];
}

export interface CityData {
  slug: string;
  name: string;
  phone: string;
  title: string;
  districts: DistrictData[];
}

export const DOMAIN = "https://gunmalove-djcj.shop"; // 실제 도메인 주소로 변경

export const CITIES_DATA: Record<string, CityData> = {
  daejeon: {
    slug: "daejeon",
    name: "대전",
    phone: "0507-1280-3335",
    title: "대전 출장마사지",
    districts: [
      {
        slug: "yuseong",
        name: "유성구",
        dongs: [
          { slug: "bongmyeong", name: "봉명동" },
          { slug: "guam", name: "구암동" },
          { slug: "gundong", name: "궁동" },
          { slug: "jangdae", name: "장대동" },
          { slug: "sinsung", name: "신성동" },
          { slug: "jeonmin", name: "전민동" },
          { slug: "gwanpyeong", name: "관평동" },
          { slug: "wonsinheung", name: "원신흥동" },
        ],
      },
      {
        slug: "seo",
        name: "서구",
        dongs: [
          { slug: "dunsan", name: "둔산동" },
          { slug: "wolpyeong", name: "월평동" },
          { slug: "galma", name: "갈마동" },
          { slug: "tanbang", name: "탄방동" },
          { slug: "gwejeong", name: "괴정동" },
          { slug: "yongmun", name: "용문동" },
          { slug: "gwanjeo", name: "관저동" },
          { slug: "doan", name: "도안동" },
        ],
      },
      {
        slug: "junggu",
        name: "중구",
        dongs: [
          { slug: "eunhaeng", name: "은행동" },
          { slug: "daeheung", name: "대흥동" },
          { slug: "seonhwa", name: "선화동" },
          { slug: "oryu", name: "오류동" },
          { slug: "taepyeong", name: "태평동" },
        ],
      },
    ],
  },
  cheongju: {
    slug: "cheongju",
    name: "청주",
    phone: "0507-1280-3336",
    title: "청주 출장마사지",
    districts: [
      {
        slug: "heungdeok",
        name: "흥덕구",
        dongs: [
          { slug: "bokdae", name: "복대동" },
          { slug: "gagyeong", name: "가경동" },
          { slug: "biha", name: "비하동" },
          { slug: "bongmyeong-cj", name: "봉명동" },
        ],
      },
      {
        slug: "cheongwon",
        name: "청원구",
        dongs: [
          { slug: "yullyang", name: "율량동" },
          { slug: "ochang", name: "오창읍" },
          { slug: "jujung", name: "주중동" },
        ],
      },
    ],
  },
};