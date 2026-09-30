import { Sparkles } from "lucide-react";

import { INSTITUTE } from "../../constants/site.js";
import { Reveal } from "../motion/Reveal.jsx";
import { Badge } from "../ui/Badge.jsx";
import { GlassCard } from "../ui/GlassCard.jsx";
import { Section } from "../ui/Section.jsx";
import { SectionHeading } from "../ui/SectionHeading.jsx";
import AdmissionJourney from "./AdmissionJourney.jsx";
import { EnquiryForm } from "./EnquiryForm.jsx";

/**
 * "Get in touch" (SRS §2): the admission journey on the left, the inquiry form on the right.
 * The same <EnquiryForm> also renders inside the modal that the navbar and hero CTAs open.
 */
export default function EnquirySection() {
  return (
    <Section id="admissions" labelledBy="admissions-title">
      <SectionHeading
        id="admissions-title"
        eyebrow="Get in touch"
        title={`Start Your Journey at IIMT Group of Colleges`}
        description={`Take the first step towards a transformative ${INSTITUTE.admissionYear} admission. Our counsellors guide you through eligibility, scholarships and fee planning - on call or over a campus visit.`}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <AdmissionJourney />

        <Reveal effect="left" delay={80}>
          <GlassCard tone="brand" padding="lg" className="h-full">
            <Badge tone="brand" Icon={Sparkles}>
              Express Admission Inquiry {INSTITUTE.admissionYear}
            </Badge>
            <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-content">
              Tell us about yourself
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Fields marked <span className="text-brand-bright">*</span> are required. Everything else helps
              us shortlist the right scholarship for you.
            </p>

            <EnquiryForm intent="enquiry" className="mt-6" />
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
