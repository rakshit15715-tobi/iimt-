import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * "Open by double-click" build.
 *
 * A normal Vite build emits `<script type="module" crossorigin>`, and browsers fetch module
 * scripts in CORS mode. A page opened straight from disk (`file://`) has an opaque "null" origin,
 * so that fetch is blocked and the visitor sees a blank page.
 *
 * This config therefore produces a bundle that needs no module loading at all:
 *   - `format: "iife"`            one classic script, no import/export statements
 *   - `inlineDynamicImports: true` the lazy canvas-confetti chunk is folded into that script, so
 *                                 there is no second module fetch either
 *   - `modulePreload: false`      no <link rel="modulepreload">
 * and `scripts/make-offline.mjs` then removes `type="module"` / `crossorigin` from the HTML and
 * asserts that no ESM syntax survived.
 *
 * The regular `npm run build` (vite.config.js) is untouched and remains the deployable build with
 * canvas-confetti code-split into its own chunk.
 */
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist-offline",
    emptyOutDir: true,
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        format: "iife",
        inlineDynamicImports: true,
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
