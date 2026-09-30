/** Sticky-chrome less landing page: every section in the order the design mock-up presents. */
import { MotionConfig } from "motion/react";

import { ENQUIRY_INTENTS } from "./constants/enquiryIntents.js";
import { EnquiryProvider, useEnquiry } from "./context/EnquiryContext.jsx";
import { useAosBootstrap } from "./hooks/useAos.js";
import { useScrollState } from "./hooks/useScrollState.js";
import { SECTION_IDS } from "./constants/site.js";
import TopUtilityBar from "./components/layout/TopUtilityBar.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import SiteFooter from "./components/layout/SiteFooter.jsx";
import Hero from "./components/sections/Hero.jsx";
import TrustStrip from "./components/sections/TrustStrip.jsx";
import ImpactStats from "./components/sections/ImpactStats.jsx";
import Programs from "./components/sections/Programs.jsx";
import CampusLife from "./components/sections/CampusLife.jsx";
import GalleryMarquee from "./components/sections/GalleryMarquee.jsx";
import ResearchStrip from "./components/sections/ResearchStrip.jsx";
import Placements from "./components/sections/Placements.jsx";
import EnquirySection from "./components/sections/EnquirySection.jsx";
import Events from "./components/sections/Events.jsx";
import { Modal } from "./components/ui/Modal.jsx";
import { EnquiryForm } from "./components/sections/EnquiryForm.jsx";

/**
 * Page composition.
 *
 * <App /> owns two things the sections cannot own themselves: the AOS bootstrap (it must run after
 * React has mounted the [data-aos] nodes) and the single enquiry dialog, which the context lets any
 * section or CTA open. MotionConfig reducedMotion="user" makes every Motion animation respect the
 * visitor's OS preference automatically.
 */
export default function App() {
  return (
    <EnquiryProvider>
      <MotionConfig reducedMotion="user">
        <PortalShell />
      </MotionConfig>
    </EnquiryProvider>
  );
}

function PortalShell() {
  const { scrolled, activeId } = useScrollState(SECTION_IDS);
  const { open, intent, preset, closeEnquiry } = useEnquiry();
  const config = ENQUIRY_INTENTS[intent] ?? ENQUIRY_INTENTS.enquiry;

  // AOS must initialise after the sections exist, otherwise it has nothing to observe.
  useAosBootstrap();

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-pill focus:bg-brand focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <TopUtilityBar />
      <Navbar scrolled={scrolled} activeId={activeId} />

      <main>
        <Hero />
        <TrustStrip />
        <ImpactStats />
        <Programs />
        <CampusLife />
        <GalleryMarquee />
        <ResearchStrip />
        <Placements />
        <EnquirySection />
        <Events />
      </main>

      <SiteFooter />

      <Modal
        open={open}
        onClose={closeEnquiry}
        title={config.title}
        description={config.description}
        size="lg"
      >
        <EnquiryForm intent={intent} presetProgram={preset?.program ?? ""} />
      </Modal>
    </div>
  );
}
