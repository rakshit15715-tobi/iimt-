import { useState } from "react";
import { CheckCircle2, Mail, MapPin, PhoneCall, Send } from "lucide-react";

import { INSTITUTE, NAV_LINKS } from "../../constants/site.js";
import { useEnquiry } from "../../context/EnquiryContext.jsx";
import { PROGRAMS } from "../../data/programs.js";
import { mailtoHref, telHref } from "../../utils/format.js";
import { isValidEmail } from "../../utils/validation.js";
import { IimtLogo } from "./IimtLogo.jsx";

const LEGAL_LINKS = ["Privacy Policy", "Terms of Use", "Anti-Ragging", "Grievance Cell", "Sitemap"];

/** Must match the strings in PROGRAM_OPTIONS so the enquiry select accepts the pre-selected value. */
const programOption = (program) => `${program.faculty} (${program.degree})`;

/**
 * Site footer with the contact block (also the #contact scroll target), the academic-school links,
 * a newsletter capture and the legal row.
 *
 * School links open the enquiry dialog with that faculty pre-selected rather than pretending to
 * navigate somewhere that does not exist in this single-page build.
 */
export default function SiteFooter() {
  const { openEnquiry } = useEnquiry();
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState({ status: "idle", message: "" });

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setNewsletter({ status: "error", message: "Please enter a valid e-mail address." });
      return;
    }
    // Frontend-only build: the confirmation is local, nothing is transmitted.
    setNewsletter({ status: "done", message: `Thank you - ${INSTITUTE.name} updates will reach ${email}.` });
    setEmail("");
  };

  return (
    <footer
      id="contact"
      aria-labelledby="footer-title"
      className="relative mt-8 scroll-mt-32 border-t border-white/10 bg-canvas-2/70"
    >
      <div className="decor-glow-brand pointer-events-none absolute inset-x-0 top-0 h-40" aria-hidden="true" />

      <div className="section-shell relative py-14">
        <h2 id="footer-title" className="sr-only">
          Contact {INSTITUTE.name}
        </h2>

        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <IimtLogo size="lg" />
            <p className="mt-5 text-xs leading-relaxed text-muted">
              {INSTITUTE.name} is a multi-college group in {INSTITUTE.campus} offering AICTE, PCI and BCI
              approved programmes in Engineering, Management, Pharmacy, Law and Computer Applications.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {INSTITUTE.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${INSTITUTE.shortName} on ${social.label}`}
                    title={`${INSTITUTE.shortName} on ${social.label}`}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted transition hover:border-brand/45 hover:text-content"
                  >
                    <social.Icon size={15} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-schools">
            <h3 id="footer-schools" className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted">
              Academic Schools
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {PROGRAMS.map((program) => (
                <li key={program.id}>
                  <button
                    type="button"
                    onClick={() => openEnquiry("apply", { program: programOption(program) })}
                    className="text-left text-xs font-medium text-body transition hover:text-brand-ink"
                  >
                    {program.faculty}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted">Campus &amp; Location</h3>
            <address className="mt-5 flex flex-col gap-3 text-xs not-italic text-muted">
              <span className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-bright" aria-hidden="true" />
                <span>
                  {INSTITUTE.address.line1}
                  <br />
                  {INSTITUTE.address.city} - {INSTITUTE.address.pin}, {INSTITUTE.address.state}
                </span>
              </span>
              {INSTITUTE.phones.map((phone) => (
                <a key={phone} href={telHref(phone)} className="flex items-center gap-2 hover:text-content">
                  <PhoneCall size={14} className="shrink-0 text-brand-bright" aria-hidden="true" />
                  {phone}
                </a>
              ))}
              {INSTITUTE.emails.map((address) => (
                <a key={address} href={mailtoHref(address)} className="flex items-center gap-2 hover:text-content">
                  <Mail size={14} className="shrink-0 text-brand-bright" aria-hidden="true" />
                  {address}
                </a>
              ))}
            </address>
          </div>

          <div>
            <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-muted">Newsletter</h3>
            <p className="mt-5 text-xs leading-relaxed text-muted">
              Admission deadlines, scholarship windows and event invitations - straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-3" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                E-mail address
              </label>
              <input
                id="newsletter-email"
                name="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={newsletter.status === "error" ? true : undefined}
                aria-describedby={newsletter.message ? "newsletter-status" : undefined}
                className={`field-control ${newsletter.status === "error" ? "field-control--invalid" : ""}`}
              />
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-pill bg-gradient-to-r from-brand-bright to-brand text-sm font-semibold text-white shadow-glow-brand transition hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send size={15} aria-hidden="true" />
                Subscribe
              </button>
            </form>

            {newsletter.message ? (
              <p
                id="newsletter-status"
                role="status"
                className={`mt-3 flex items-start gap-2 text-[0.72rem] ${
                  newsletter.status === "error" ? "text-brand-bright" : "text-success"
                }`}
              >
                <CheckCircle2 size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                {newsletter.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[0.72rem] text-muted">
            &copy; {new Date().getFullYear()} {INSTITUTE.name}, {INSTITUTE.campus}. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {LEGAL_LINKS.map((label) => (
              <li key={label}>
                <a
                  href={INSTITUTE.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.72rem] text-muted transition hover:text-content"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-[0.68rem] leading-relaxed text-muted/80">
          Front-end capstone build - B.Tech Computer Science &amp; Engineering. Design language:
          cyber-dark glassmorphism. Content is a demonstration and is not an official
          {` ${INSTITUTE.shortName} `}
          publication. Verify approvals, fees and placement figures with the admission office before
          publishing.
        </p>
      </div>
    </footer>
  );
}
