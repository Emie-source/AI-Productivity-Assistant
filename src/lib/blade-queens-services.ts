export type Service = {
  slug: string;
  name: string;
  detail: string;
  price: string;
  priceValue: number;
  duration: string;
};

export const SERVICES: Service[] = [
  {
    slug: "queens-cut",
    name: "Queens Cut",
    detail: "Classic scissor & clipper cut with styling",
    price: "R150",
    priceValue: 150,
    duration: "45 min",
  },
  {
    slug: "skin-fade",
    name: "Skin Fade",
    detail: "Precision fade, razor-finished edges",
    price: "R180",
    priceValue: 180,
    duration: "50 min",
  },
  {
    slug: "beard-trim",
    name: "Beard Trim & Shape",
    detail: "Line-up, trim and beard oil finish",
    price: "R80",
    priceValue: 80,
    duration: "25 min",
  },
  {
    slug: "hot-towel-shave",
    name: "Hot Towel Shave",
    detail: "Traditional straight-razor shave",
    price: "R160",
    priceValue: 160,
    duration: "40 min",
  },
  {
    slug: "cut-beard-combo",
    name: "Cut & Beard Combo",
    detail: "Queens Cut plus full beard sculpt",
    price: "R210",
    priceValue: 210,
    duration: "70 min",
  },
  {
    slug: "kids-cut",
    name: "Kids Cut (under 12)",
    detail: "Gentle, quick cut for young clients",
    price: "R100",
    priceValue: 100,
    duration: "30 min",
  },
  {
    slug: "head-shave",
    name: "Head Shave",
    detail: "Full razor head shave with aftercare",
    price: "R130",
    priceValue: 130,
    duration: "35 min",
  },
  {
    slug: "line-up",
    name: "Line-Up / Edge-Up",
    detail: "Sharp hairline clean-up",
    price: "R60",
    priceValue: 60,
    duration: "15 min",
  },
];

export const TIME_SLOTS = [
  "08:30",
  "09:30",
  "10:30",
  "11:30",
  "12:30",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export const getService = (slug?: string) =>
  SERVICES.find((s) => s.slug === slug);

export const formatRand = (value: number) => `R${value.toLocaleString("en-ZA")}`;
