import { PROGRAMS } from "./programs.js";

/** Select options for the admission enquiry form, kept next to the programme data. */
export const ADMISSION_CATEGORIES = [
  "Undergraduate (UG)",
  "Postgraduate (PG)",
  "Diploma / Lateral Entry",
  "Ph.D. / Research",
];

export const PROGRAM_OPTIONS = [
  ...PROGRAMS.map((program) => `${program.faculty} (${program.degree})`),
  "Not decided yet - please advise me",
];

export const QUALIFICATIONS = [
  "Class 12 (Appearing)",
  "Class 12 (Passed)",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
];

export const STREAMS = [
  "Science (PCM)",
  "Science (PCB)",
  "Commerce",
  "Arts / Humanities",
  "Engineering Diploma",
  "Other",
];

export const STATES = [
  "Uttar Pradesh",
  "Delhi NCR",
  "Haryana",
  "Uttarakhand",
  "Bihar",
  "Madhya Pradesh",
  "Rajasthan",
  "Punjab",
  "Jharkhand",
  "West Bengal",
  "Other",
];

/** Field metadata drives both the rendered inputs and the validation pass. */
export const ENQUIRY_FIELDS = [
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "As printed on your Class 12 marksheet", autoComplete: "name", column: "half" },
  { name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com", autoComplete: "email", column: "half" },
  { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "+91 98765 43210", autoComplete: "tel", column: "half" },
  { name: "category", label: "Admission Category", type: "select", required: true, options: ADMISSION_CATEGORIES, column: "half" },
  { name: "program", label: "Interested Programme", type: "select", required: true, options: PROGRAM_OPTIONS, column: "full" },
  { name: "qualification", label: "Highest Qualification", type: "select", required: true, options: QUALIFICATIONS, column: "half" },
  { name: "stream", label: "Stream", type: "select", required: false, options: STREAMS, column: "half" },
  { name: "state", label: "State", type: "select", required: false, options: STATES, column: "half" },
  { name: "city", label: "City", type: "text", required: false, placeholder: "Your city", autoComplete: "address-level2", column: "half" },
];
