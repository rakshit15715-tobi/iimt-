import { createContext, useCallback, useContext, useMemo, useState } from "react";

import { ENQUIRY_INTENTS } from "../constants/enquiryIntents.js";

const EnquiryContext = createContext(null);

/**
 * Every admission CTA in the portal - navbar, hero, programme cards, footer, mobile drawer -
 * routes through this context, so there is a single dialog owner in <App /> and one shared form.
 */
export function EnquiryProvider({ children }) {
  const [state, setState] = useState({ open: false, intent: "enquiry", preset: null });

  /**
   * @param {string} intent  key of ENQUIRY_INTENTS - changes the dialog copy
   * @param {object|null} preset  optional pre-filled values, e.g. the programme card you clicked
   */
  const openEnquiry = useCallback((intent = "enquiry", preset = null) => {
    setState({ open: true, intent: ENQUIRY_INTENTS[intent] ? intent : "enquiry", preset });
  }, []);

  const closeEnquiry = useCallback(() => {
    setState((previous) => ({ ...previous, open: false }));
  }, []);

  const value = useMemo(
    () => ({ ...state, openEnquiry, closeEnquiry }),
    [state, openEnquiry, closeEnquiry],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  }
  return context;
}
