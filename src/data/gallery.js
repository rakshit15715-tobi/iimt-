import { assetUrl } from "../utils/asset.js";

/**
 * Campus photography. `width`/`height` are the real intrinsic pixel sizes of each file, so the
 * browser reserves the correct box before the JPEG arrives (zero layout shift / good CLS).
 */
export const GALLERY_ITEMS = [
  {
    id: "campus-sign",
    src: assetUrl("images/campus-sign.jpg"),
    width: 547,
    height: 365,
    title: "The Iconic IIMT Campus",
    story:
      "The landmark campus gateway at Knowledge Park-III, where every batch photographs its first and last day.",
    tag: "Campus",
  },
  {
    id: "digital-classroom",
    src: assetUrl("images/digital-classroom.jpg"),
    width: 481,
    height: 415,
    title: "Tiered Digital Classrooms",
    story:
      "Air-conditioned tiered lecture theatres with smart projection and campus-wide Wi-Fi for hybrid sessions.",
    tag: "Academics",
  },
  {
    id: "sports-arena",
    src: assetUrl("images/sports-arena.jpg"),
    width: 547,
    height: 365,
    title: "Inter-College Sporting Arena",
    story:
      "Volleyball, cricket, basketball and annual inter-college tournaments run by the student sports council.",
    tag: "Sports",
  },
  {
    id: "campus-entrance",
    src: assetUrl("images/campus-entrance.jpg"),
    width: 678,
    height: 452,
    title: "Flora Gardens & Research Park",
    story:
      "Landscaped gardens, medicinal plant beds and the green research park that surrounds the academic blocks.",
    tag: "Campus Life",
  },
  {
    id: "campus-building",
    src: assetUrl("images/campus-building.jpg"),
    width: 1024,
    height: 683,
    title: "The Knowledge Park Campus",
    story:
      "Academic blocks, central library, innovation incubator and hostels within one secured Greater Noida campus.",
    tag: "Infrastructure",
  },
];

/** The 2x2 masonry grid in the Campus Life section (first four photographs). */
export const CAMPUS_TILES = GALLERY_ITEMS.slice(0, 4);

/** Hero art - the campus drive view. */
export const HERO_IMAGE = GALLERY_ITEMS[4];
