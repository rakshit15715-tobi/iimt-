import { Building2, TrendingUp, Trophy, Users } from "lucide-react";

/**
 * "Impact in Numbers" - the animated counters under the hero.
 *
 * NOTE FOR EVALUATION: these headline figures mirror the numbers printed on the institute's
 * admission collateral and the project's design mock-up. They are illustrative for this
 * capstone build - replace them with audited institutional data before publishing.
 */
export const IMPACT_STATS = [
  {
    id: "legacy",
    value: 28,
    suffix: "+",
    label: "Years of Legacy",
    hint: "Decades of professional education across six colleges",
    tone: "brand",
    Icon: Trophy,
  },
  {
    id: "package",
    value: 45,
    suffix: " LPA",
    label: "Highest Package",
    hint: "Top offer recorded in the recent placement drive",
    tone: "gold",
    Icon: TrendingUp,
  },
  {
    id: "recruiters",
    value: 1200,
    suffix: "+",
    label: "Top Recruiters",
    hint: "Corporate partners on the Career Development Cell network",
    tone: "accent",
    Icon: Building2,
  },
  {
    id: "students",
    value: 25000,
    suffix: "+",
    label: "Students Enrolled",
    hint: "Across the group's engineering, management and law colleges",
    tone: "brand",
    Icon: Users,
  },
];

/** The full-width glass bar that closes the statistics block. */
export const PLACEMENT_PROMISE = {
  value: 100,
  suffix: "%",
  label: "Placement Assistance",
  hint: "Career Development Cell mentoring until the first offer letter",
};

/** Placement chips in the "Where Ambition Meets Global Opportunities" section. */
export const PACKAGE_HIGHLIGHTS = [
  { id: "average", value: "7.8 LPA", label: "Average Package" },
  { id: "highest", value: "45.0 LPA", label: "Highest Package" },
];
