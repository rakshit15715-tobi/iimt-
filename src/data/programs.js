import {
  Briefcase,
  Cpu,
  FlaskConical,
  MonitorSmartphone,
  Pill,
  Scale,
} from "lucide-react";

/**
 * The academic showcase: six faculties, each rendered as a glowing glass card.
 *
 * `filter` drives the tab strip (SRS §2 "Academic Showcase"), `tone` picks the accent colour
 * family for the card glow, and `courses` are the real programme names published by the
 * institute's admission cell.
 */
export const PROGRAM_FILTERS = [
  { id: "all", label: "All Faculties" },
  { id: "engineering", label: "Engineering" },
  { id: "management", label: "Management" },
  { id: "pharmacy", label: "Pharmacy" },
  { id: "law", label: "Law" },
  { id: "computer-applications", label: "Computer Applications" },
  { id: "applied-science", label: "Applied Sciences" },
];

export const PROGRAMS = [
  {
    id: "engineering",
    filter: "engineering",
    faculty: "School of Engineering & Technology",
    degree: "B.Tech / M.Tech",
    tone: "accent",
    Icon: Cpu,
    blurb:
      "Outcome-based AKTU curriculum with industry-certified labs, live projects and a dedicated coding incubator.",
    courses: [
      "Computer Science & Engineering",
      "CSE (Artificial Intelligence & Machine Learning)",
      "CSE (Artificial Intelligence & Data Science)",
      "Information Technology",
      "Electronics & Communication",
      "Mechanical / Civil Engineering",
    ],
    action: "Explore engineering",
  },
  {
    id: "management",
    filter: "management",
    faculty: "School of Management",
    degree: "MBA / BBA",
    tone: "brand",
    Icon: Briefcase,
    blurb:
      "Case-study driven learning with business analytics, live industry sprints and summer internships from year one.",
    courses: [
      "Master of Business Administration (MBA)",
      "MBA (Business Analytics)",
      "Bachelor of Business Administration (BBA)",
      "Finance & Marketing specialisations",
      "Entrepreneurship & Family Business",
    ],
    action: "Explore management",
  },
  {
    id: "pharmacy",
    filter: "pharmacy",
    faculty: "College of Pharmacy",
    degree: "B.Pharm / M.Pharm",
    tone: "gold",
    Icon: Pill,
    blurb:
      "PCI-approved pharmacy programmes supported by instrumentation labs, medicinal plant research and hospital training.",
    courses: [
      "Bachelor of Pharmacy (B.Pharm)",
      "Diploma in Pharmacy (D.Pharm)",
      "M.Pharm (Pharmaceutics)",
      "B.Pharm (Lateral Entry)",
      "Pharmaceutical Chemistry & Analysis",
    ],
    action: "Explore pharmacy",
  },
  {
    id: "law",
    filter: "law",
    faculty: "College of Law & Legal Studies",
    degree: "LLB / BA-LLB",
    tone: "accent",
    Icon: Scale,
    blurb:
      "Moot-court training, judgment-writing labs and internship placements with district and high court chambers.",
    courses: [
      "BA-LLB (5 Year Integrated)",
      "LLB (3 Year)",
      "B.Com LLB (5 Year Integrated)",
      "Corporate & Commercial Law electives",
      "Cyber Law & Intellectual Property electives",
    ],
    action: "Explore law",
  },
  {
    id: "computer-applications",
    filter: "computer-applications",
    faculty: "School of Computer Applications",
    degree: "BCA / MCA",
    tone: "accent",
    Icon: MonitorSmartphone,
    blurb:
      "Application-first track: full-stack development, cloud delivery pipelines and a placement-focused coding bootcamp.",
    courses: [
      "Bachelor of Computer Applications (BCA)",
      "Master of Computer Applications (MCA)",
      "B.Sc. (Computer Science)",
      "Cyber Security & Forensics electives",
      "Cloud, DevOps & Full-Stack electives",
    ],
    action: "Explore computer applications",
  },
  {
    id: "applied-science",
    filter: "applied-science",
    faculty: "Applied Sciences & Humanities",
    degree: "Foundation / Research",
    tone: "brand",
    Icon: FlaskConical,
    blurb:
      "The foundation departments that carry first-year engineering, doctoral research support and interdisciplinary labs.",
    courses: [
      "Physics & Materials Science",
      "Chemistry & Environmental Studies",
      "Mathematics & Scientific Computing",
      "Humanities & Social Sciences",
      "Research & Doctoral Support",
    ],
    action: "Explore applied sciences",
  },
];
