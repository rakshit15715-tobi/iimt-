import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

/**
 * The portal is a single page, so there is no router: navigation is in-page anchors plus the
 * enquiry dialog. Adding react-router later is a small change because every section is already an
 * isolated component.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
