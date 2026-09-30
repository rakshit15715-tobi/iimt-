import { CalendarClock, GraduationCap, Newspaper } from "lucide-react";

/**
 * Campus Pulse - forthcoming events. Dates are ISO strings; the UI formats them through
 * `formatEventDate()` so the copy, the <time datetime> attribute and the sort order can never
 * drift apart. Today's date for this build: 2026-09-30.
 */
export const EVENTS = [
  {
    id: "guest-lecture",
    title: "Guest Lecture by a Senior IIMT Alumnus",
    date: "2026-10-05",
    time: "11:00 AM - 1:00 PM",
    venue: "Central Auditorium, Knowledge Park-III Campus",
    category: "Lecture",
    tone: "accent",
    Icon: GraduationCap,
    description:
      "An alumnus now leading a product engineering team walks through interview loops, portfolio building and the first 90 days at work.",
  },
  {
    id: "mock-test",
    title: "Dr. Sarvepalli National Level Mock Test",
    date: "2026-10-18",
    time: "10:00 AM - 1:00 PM",
    venue: "Examination Blocks A & B (all colleges)",
    category: "Assessment",
    tone: "gold",
    Icon: CalendarClock,
    description:
      "Open mock test for Class 12 aspirants across Science, Commerce and Humanities streams, followed by a free counselling session.",
  },
  {
    id: "swalakshya",
    title: "Swa Lakshya - Tech Fest & Cultural Fest 2026",
    date: "2026-11-14",
    time: "9:30 AM onwards (3 days)",
    venue: "Main Campus Grounds & Open Air Theatre",
    category: "Fest",
    tone: "brand",
    Icon: Newspaper,
    description:
      "The annual student fest: hackathon, robotics arena, project expo, startup pitch, star night and inter-college cultural battles.",
  },
];
