import { ClipboardList, FileCheck2, MessagesSquare, Wallet } from "lucide-react";

/** The four-step "Start your journey at IIMT" track beside the enquiry form. */
export const ADMISSION_STEPS = [
  {
    id: "apply",
    step: 1,
    title: "Submit Online Application",
    description:
      "Register on the admission portal, pick your faculty and course, and pay the nominal application fee online.",
    Icon: ClipboardList,
  },
  {
    id: "counselling",
    step: 2,
    title: "Meet Admission Counselling",
    description:
      "A counsellor reviews your eligibility and stream fit on call or over a scheduled campus visit.",
    Icon: MessagesSquare,
  },
  {
    id: "documents",
    step: 3,
    title: "Submit Scholarship Documents",
    description:
      "Upload marksheets, category and income certificates so merit, minority and state scholarships can be applied.",
    Icon: FileCheck2,
  },
  {
    id: "confirm",
    step: 4,
    title: "Confirm & Pay Fees",
    description:
      "Accept the seat offer, complete the first-semester fee payment and collect your roll number and ERP login.",
    Icon: Wallet,
  },
];
