/**
 * Copy presets for the single admission enquiry dialog.
 *
 * `intent` only changes the dialog heading, description and submit label - never the markup or the
 * validation - so there is one form to maintain. Kept in a plain module (not in the context file)
 * so the provider file only exports components and hooks.
 *
 * `program` optionally pre-selects the programme dropdown.
 */
export const ENQUIRY_INTENTS = {
  apply: {
    title: "Apply Online",
    description:
      "Start your 2026 application - a counsellor confirms your eligibility within one working day.",
    program: "",
    submitLabel: "Start my application",
  },
  enquiry: {
    title: "Express Admission Inquiry 2026",
    description:
      "Share a few details and the admission desk calls you back with fees, scholarships and deadlines.",
    program: "",
    submitLabel: "Submit admission inquiry",
  },
  brochure: {
    title: "Download the 2026 Prospectus",
    description: "We e-mail the programme brochure, fee structure and scholarship sheet to this address.",
    program: "",
    submitLabel: "Email me the prospectus",
  },
  visit: {
    title: "Book a Campus Visit",
    description:
      "Pick a slot and we confirm a guided tour of the labs, library, hostels and sports arena.",
    program: "",
    submitLabel: "Request a campus visit",
  },
};
