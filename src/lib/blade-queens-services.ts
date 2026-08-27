export type Service = {
  slug: string;
  name: string;
  detail: string;
  price: string;
  priceValue: number;
  duration: string;
  fullDescription: string;
  includes: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "queens-cut",
    name: "Queens Cut",
    detail: "Classic scissor & clipper cut with styling",
    price: "R150",
    priceValue: 150,
    duration: "45 min",
    fullDescription:
      "Our signature cut. A personalised scissor-and-clipper cut tailored to your face shape, hair type and style goals, finished with a clean style and light product.",
    includes: [
      "Consultation & face-shape assessment",
      "Scissor & clipper cut",
      "Wash and style",
      "Hot towel finish",
    ],
  },
  {
    slug: "skin-fade",
    name: "Skin Fade",
    detail: "Precision fade, razor-finished edges",
    price: "R180",
    priceValue: 180,
    duration: "50 min",
    fullDescription:
      "A razor-sharp, blended fade from skin to length — low, mid, high or burst. Edges are lined with a straight razor for a crisp, long-lasting finish.",
    includes: [
      "Consultation & fade design",
      "Skin fade blend",
      "Razor line-up",
      "Style and finish",
    ],
  },
  {
    slug: "beard-trim",
    name: "Beard Trim & Shape",
    detail: "Line-up, trim and beard oil finish",
    price: "R80",
    priceValue: 80,
    duration: "25 min",
    fullDescription:
      "Shape, trim and define your beard to suit your face. Finished with a hot towel and beard oil to condition and add a clean sheen.",
    includes: [
      "Beard shape & trim",
      "Razor line-up",
      "Hot towel treatment",
      "Beard oil finish",
    ],
  },
  {
    slug: "hot-towel-shave",
    name: "Hot Towel Shave",
    detail: "Traditional straight-razor shave",
    price: "R160",
    priceValue: 160,
    duration: "40 min",
    fullDescription:
      "A classic barbershop ritual: hot towels, rich lather and a straight-razor shave for the closest, smoothest finish. Soothing aftercare included.",
    includes: [
      "Two hot towel wraps",
      "Cut-throat razor shave",
      "Soothing aftershave balm",
      "Light face massage",
    ],
  },
  {
    slug: "cut-beard-combo",
    name: "Cut & Beard Combo",
    detail: "Queens Cut plus full beard sculpt",
    price: "R210",
    priceValue: 210,
    duration: "70 min",
    fullDescription:
      "The full package — a Queens Cut paired with a full beard sculpt and line-up. One seat, a complete, sharp look from hair to jawline.",
    includes: [
      "Queens Cut (scissor & clipper)",
      "Beard trim & shape",
      "Razor line-up",
      "Wash, style & finish",
    ],
  },
  {
    slug: "kids-cut",
    name: "Kids Cut (under 12)",
    detail: "Gentle, quick cut for young clients",
    price: "R100",
    priceValue: 100,
    duration: "30 min",
    fullDescription:
      "A calm, patient cut for young clients. Our barbers make the chair fun and gentle so kids leave smiling and sharp.",
    includes: [
      "Friendly consultation",
      "Simple cut or fade",
      "Light style",
      "High-five included",
    ],
  },
  {
    slug: "head-shave",
    name: "Head Shave",
    detail: "Full razor head shave with aftercare",
    price: "R130",
    priceValue: 130,
    duration: "35 min",
    fullDescription:
      "A smooth, full razor head shave with hot towels and aftercare. Clean, comfortable and built to last with the right upkeep advice.",
    includes: [
      "Hot towel prep",
      "Straight-razor head shave",
      "Soothing aftercare",
      "Upkeep tips",
    ],
  },
  {
    slug: "line-up",
    name: "Line-Up / Edge-Up",
    detail: "Sharp hairline clean-up",
    price: "R60",
    priceValue: 60,
    duration: "15 min",
    fullDescription:
      "A quick, sharp hairline refresh between cuts. We clean up your edges and line your hairline so you leave looking freshly groomed.",
    includes: [
      "Hairline line-up",
      "Edge clean-up",
      "Neck tidy",
      "Quick finish",
    ],
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
