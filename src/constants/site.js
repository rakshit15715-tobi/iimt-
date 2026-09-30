import { AtSign, Briefcase, Camera, Play, Users } from "lucide-react";

/**
 * Institute-wide configuration and the two navigation models.
 *
 * Address, phone numbers, e-mail addresses and the social handle are the institute's real,
 * publicly published contact details (iimtindia.net), so the portal footer is not placeholder
 * text. Swap them here and every section, the footer and the tel: links follow automatically.
 */
export const INSTITUTE = {
  name: "IIMT Group of Colleges",
  shortName: "IIMT",
  campus: "Greater Noida",
  region: "Delhi-NCR",
  accreditation: "NAAC A+ Accredited",
  accreditationNote: "Accredited campus, approved programmes",
  tagline: "Shaping Tomorrow's Leaders Through Excellence & Innovation.",
  intro:
    "A premier educational institution in North India for Engineering, Management, Pharmacy, Computer Applications and Legal Studies. Explore a campus engineered for innovation, academic rigour and complete placement assistance.",
  address: {
    line1: "Plot No. 19 & 20, Knowledge Park - III",
    city: "Greater Noida",
    pin: "201310",
    state: "Uttar Pradesh",
    country: "India",
  },
  /** Ordered as printed on the institute's contact page. */
  phones: ["0120-2322655", "0120-2475000", "+91 9717015300", "+91 9911009144"],
  admissionDesk: ["0120-2322655", "+91 9717015300"],
  emails: ["enquires@iimtindia.net", "contact_gn@iimtindia.net"],
  website: "https://www.iimtindia.net",
  /**
   * Handles published by the institute; verify before going live.
   *
   * Note on the icons: lucide-react 1.x removed its brand glyphs (Facebook, Instagram, X,
   * YouTube, LinkedIn are no longer exported), so these use the closest generic lucide marks and
   * rely on `aria-label` / `title` for the platform name. Swap in `simple-icons` or the official
   * brand SVGs if exact marks are required.
   */
  socials: [
    { id: "facebook", label: "Facebook", href: "https://www.facebook.com/iimtindia", Icon: Users },
    { id: "instagram", label: "Instagram", href: "https://www.instagram.com/iimtnoida", Icon: Camera },
    { id: "twitter", label: "X (Twitter)", href: "https://twitter.com/iimtnoida", Icon: AtSign },
    { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@iimtnoida", Icon: Play },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/school/iimt-group-of-colleges",
      Icon: Briefcase,
    },
  ],
  /** Shown on the enquiry form and the hero badge. */
  admissionYear: "2026",
};

/** Primary navigation. Every href is an in-page anchor handled by the scroll-spy navbar. */
export const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "academics", label: "Academics", href: "#academics" },
  { id: "admissions", label: "Admissions", href: "#admissions" },
  { id: "campus", label: "Campus", href: "#campus" },
  { id: "research", label: "Research", href: "#research" },
  { id: "placements", label: "Placements", href: "#placements" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/** Section ids the navbar highlights as you scroll (anchors above, in document order). */
export const SECTION_IDS = [
  "home",
  "about",
  "academics",
  "campus",
  "research",
  "placements",
  "admissions",
  "events",
  "contact",
];

/**
 * Thin utility bar above the navbar. `action` links open the enquiry modal instead of
 * navigating, which keeps every admission CTA wired to one place.
 */
export const UTILITY_LINKS = [
  { id: "apply", label: "Apply Now", action: "apply" },
  { id: "calendar", label: "Academic Calendar", href: "#events" },
  { id: "login", label: "Student Login", href: "https://www.iimtindia.net" },
  { id: "pay-fee", label: "Online Fee Payment", href: "https://www.iimtindia.net" },
];

/** Trust strip under the hero. Only approvals the institute actually holds are listed. */
export const ACCREDITATIONS = [
  "NAAC A+ Accredited",
  "AICTE Approved",
  "PCI Approved",
  "BCI Approved (Law)",
  "IIC Recognised",
];

/** Quick facts for the hero glass chips. */
export const HERO_HIGHLIGHTS = [
  { id: "legacy", value: "28+", label: "Years of Excellence" },
  { id: "campus-life", value: "10,000+", label: "Campus Life" },
];
