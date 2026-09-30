import { Lightbulb, Microscope, Rocket, ShieldCheck } from "lucide-react";

/**
 * Compact Research & Innovation strip. It exists because the navbar (faithful to the design
 * mock-up) links to "Research" - this keeps that anchor honest instead of pointing nowhere.
 * Every cell maps to a real centre listed on the institute's website.
 */
export const RESEARCH_CELLS = [
  {
    id: "rnd",
    title: "Research & Development Cell",
    description: "Seed grants, publication support and faculty-student research clusters.",
    Icon: Microscope,
    tone: "accent",
  },
  {
    id: "iedc",
    title: "Innovation & Entrepreneurship Development Cell",
    description:
      "Ministry of Education IIC activities, ideathons and a pre-incubation cohort for student startups.",
    Icon: Rocket,
    tone: "brand",
  },
  {
    id: "ipr",
    title: "IPR & Technology Transfer Centre",
    description: "Patent filing assistance, design registrations and industry licensing support.",
    Icon: Lightbulb,
    tone: "gold",
  },
  {
    id: "incubation",
    title: "MSME Incubation Centre",
    description: "Prototyping bay, mentor network and MSME-linked funding for product teams.",
    Icon: ShieldCheck,
    tone: "accent",
  },
];
