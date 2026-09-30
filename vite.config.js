import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Tailwind v4 is configured in CSS (src/index.css) - there is no tailwind.config.js.
 *
 * base "./" produces relative asset URLs, so the built dist/ folder can be served from a
 * sub-path, dragged onto Netlify/Vercel, or even opened over file:// without rewriting paths.
 * The dev server stays on 5174 so it never collides with the AcadMate app on 5173.
 */
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: { port: 5174 },
  preview: { port: 4174 },
});
