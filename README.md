# IIMT Group of Colleges — Cyber-Dark Glassmorphic Admission Portal

A **frontend-only** admission landing portal for IIMT Group of Colleges, Greater Noida
(Knowledge Park-III), built to the project SRS: deep dark slate foundation, frosted-glass
panels, neon-glow accents, typed hero headline, scroll-reveal sections, a category-filtered
academic showcase, an infinite campus gallery marquee and a translucent enquiry dialog that
celebrates a valid submission with confetti.

Built for the **B.Tech Computer Science & Engineering capstone / viva**.

**Stack:** React 19 · Vite 8 · Tailwind CSS 4 · Motion 13 · Typed.js 3 · AOS 2 · Vanilla-tilt 1.8 ·
canvas-confetti 1.9 · lucide-react 1.5 — plain JavaScript (JSX, no TypeScript), no backend.

---

## Quick start

```bash
cd iimt-portal
npm install
npm run dev            # http://localhost:5174  (port 5174 so it never clashes with AcadMate on 5173)
```

Production check:

```bash
npm run build          # emits dist/
npm run preview        # serves the built bundle on http://localhost:4174
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR on port 5174 |
| `npm run build` | Production bundle into `dist/` (relative asset URLs, see Deployment) |
| `npm run build:offline` | Portable bundle into `dist-offline/` that opens by **double-clicking `index.html`** — no server at all (see Deployment) |
| `npm run preview` | Serves the built bundle on port 4174 |
| `npm run lint` | ESLint flat config over the whole project |
| `npm test` | Unit tests for the pure logic via Node's built-in `node --test` |

---

## Project structure

```
iimt-portal/
  index.html                    meta/OG tags, Google Fonts, pre-paint dark theme, no-JS fallbacks
  vite.config.js                react + tailwind plugins, base "./", dev 5174 / preview 4174
  eslint.config.js              flat config (same shape as the sibling AcadMate app)
  public/
    favicon.svg                 crimson IIMT mark
    images/                     5 campus photographs (real intrinsic sizes recorded in data/gallery.js)
  src/
    main.jsx                    StrictMode + <App />, no router (single page)
    App.jsx                     section composition + the single enquiry dialog owner
    index.css                   design tokens -> @theme inline -> glass/marquee/field layers
    types.js                    JSDoc typedefs (documentation only)
    constants/                  site.js (institute, nav, approvals), enquiryIntents.js (dialog copy)
    data/                       programs, stats, recruiters+testimonials, gallery, events,
                                admissionSteps, researchCells, formOptions, index.js barrel
    hooks/                      useAos, useTyped, useTilt, useScrollState, useCountUp,
                                useMediaQuery, useBodyScrollLock
    utils/                      validation, format, confetti, motion, asset (+ 3 node --test suites)
    context/EnquiryContext.jsx  one dialog, many CTAs
    components/
      layout/                   IimtLogo, TopUtilityBar, Navbar, MobileDrawer, SiteFooter
      ui/                       Button, Badge, GlassCard, IconTile, Eyebrow, SectionHeading,
                                Section, Modal, FormField, Counter, Marquee, tones.js
      motion/                   Reveal (AOS wrapper), Tilt3D (VanillaTilt wrapper), revealEffects.js
      sections/                 Hero, TrustStrip, ImpactStats, Programs, CampusLife, GalleryMarquee,
                                ResearchStrip, Placements, AdmissionJourney, EnquirySection,
                                EnquiryForm, Events
```

---

## SRS requirement → implementation (viva map)

| SRS §2 feature | Where it lives | How it works |
| --- | --- | --- |
| Sticky Glass Navbar | `layout/Navbar.jsx`, `hooks/useScrollState.js` | `sticky top-0`, glass deepens once `scrollY > 28`, IntersectionObserver scroll-spy highlights the active section, glowing crimson CTA opens the dialog |
| Interactive Hero + typewriter | `sections/Hero.jsx`, `hooks/useTyped.js` | Typed.js 3 cycles *Leaders → Innovators → Entrepreneurs → Researchers*; `strings` compared by value so the effect never restarts on re-render |
| Staggered Impact Stats | `sections/ImpactStats.jsx`, `ui/Counter.jsx`, `hooks/useCountUp.js` | AOS staggering + rAF count-up + Vanilla-tilt 3D glossy cards |
| Academic Showcase + tab filter | `sections/Programs.jsx` | Real ARIA tab list (roving tabindex, Arrow/Home/End), DOM filtering, `refreshAos()` after every change |
| Campus Gallery Marquee | `ui/Marquee.jsx`, `index.css` | CSS `@keyframes marquee-scroll` `translate3d(-50%)` over a duplicated track; `animation-play-state: paused` on hover/focus |
| Enquiry Modal + celebration | `ui/Modal.jsx`, `sections/EnquiryForm.jsx`, `utils/confetti.js` | Escape/backdrop close, focus trap, scroll lock, inline validation, confetti burst on success |
| Performance (§6) | throughout | only `transform`/`opacity` animate; `will-change` scoped to the marquee; `translate3d`; intrinsic `width`/`height` + lazy images; canvas-confetti lazy-loaded via dynamic import |
| Responsive mobile-first | throughout | 360 → 1920 px audit, drawer navigation below `lg`, fluid type scale |

### The three integration rules this project enforces

Third-party animation libraries fight each other if you are careless. These rules are implemented
and commented in the code:

1. **One animation owner per node.** AOS and VanillaTilt both write inline `transform`, so a
   `data-aos` element is never the same node as a tilt target:
   `<Reveal><Tilt3D><GlassCard/></Tilt3D></Reveal>`.
2. **Motion is only for state-driven chrome** (drawer, dialog, nav underline) so it can never fight
   AOS. `<MotionConfig reducedMotion="user">` makes all Motion animation respect the OS setting.
3. **Every imperative library cleans up.** `typed.destroy()`, `node.vanillaTilt.destroy()`, and a
   module-level guard on `AOS.init()`. React 19 StrictMode mounts effects twice in development —
   without this you get two glare layers per card and a doubly-initialised AOS.

### Two details that are easy to miss (and are handled here)

- `aos.css` parks every `[data-aos]` node at `opacity: 0`. Until AOS boots — or if the bundle never
  runs — the page would be blank, so `index.css` keeps them visible via
  `html:not(.aos-ready) [data-aos]`, and `index.html` repeats the rule inside `<noscript>`.
- Filtering the programme grid swaps DOM nodes, so AOS must `refreshHard()` or the new cards stay
  invisible.

---

## Design system

One token set drives the whole portal: raw `--iimt-*` values on `:root` → `@theme inline`
(so Tailwind emits `var()` references) → the `.glass` / marquee / form layers.

| Token | Value | Used for |
| --- | --- | --- |
| `--iimt-canvas` | `#080C14` | page foundation |
| `--iimt-brand` / `-bright` | `#E11D2E` / `#FF3B52` | IIMT crimson: primary CTAs, active tile, glows |
| `--iimt-accent` | `#00F2FE` | neon cyan: technology / engineering accents |
| `--iimt-gold` | `#FF9900` | campus life, rankings, package figures |
| `--iimt-content` / `--iimt-muted` | `#FFFFFF` / `#94A3B8` | headings / secondary copy |

The exact SRS glass recipe lives in **one** class (`src/index.css`):

```css
.glass {
  @apply relative border border-white/10 bg-slate-900/40 shadow-2xl shadow-blue-500/5 backdrop-blur-md;
}
/* plus a ::before inner highlight, a hover border lift, and an @supports fallback for browsers
   without backdrop-filter */
```

`backdrop-blur-md` compiles to a 12 px blur — verified in the built CSS (`--blur-md:12px`).

**Switching to the SRS's cyan-dominant palette** is a two-line change: swap the `--iimt-brand-*`
values for cyan and `--iimt-accent` for crimson, and every component re-tints.

---

## Accessibility

- Semantic landmarks (`header` / `main` / `footer` / `address`), a skip-to-content link, logical
  `h1 → h3` heading order.
- Dialog: `role="dialog"`, `aria-modal`, `aria-labelledby` / `aria-describedby`, Tab focus trap,
  Escape + backdrop close, focus returned to the opening element, background scroll locked with
  scrollbar-width compensation.
- The programme filter is a real ARIA tab list (roving tabindex + Arrow/Home/End); the testimonial
  carousel is button-driven with `aria-label`s and no autoplay.
- Every form control is label-bound with `aria-invalid` and `aria-describedby` error wiring, and
  focus moves to the first invalid field after a failed submit.
- Animated numbers and the typed headline are `aria-hidden` with the final text exposed once through
  `sr-only`, so assistive tech never hears intermediate frames or half-typed words.
- `prefers-reduced-motion`: AOS is disabled at init, Typed.js and tilt never start, counters jump
  straight to their final value, Motion is capped by `MotionConfig reducedMotion="user"`, CSS
  animations/transitions collapse to ~0 ms, and the marquee unrolls into a static wrapped grid.
- Contrast: white and `#94A3B8` on `#080C14`; white on crimson for CTAs.

---

## Performance notes

- Only `transform` and `opacity` are animated. The marquee uses `translate3d` + `will-change`, the
  count-up runs on `requestAnimationFrame`, and the scroll-spy uses IntersectionObserver instead of
  `getBoundingClientRect()` per scroll event — no layout thrash, so scrolling stays at 60 FPS.
- Scroll listeners are `{ passive: true }` and only write state when the value actually flips.
- Images declare their intrinsic `width`/`height` and lazy-load below the fold → no layout shift.
- `canvas-confetti` is **dynamically imported on the first submit**, so it is not in the initial
  bundle. The build proves it: `dist/assets/confetti.module-*.js` is a separate 10.6 kB chunk.
- Measured production build: `index.html` 2.5 kB · CSS 78 kB (11.5 kB gzip) · JS 470 kB
  (148 kB gzip: React 19 + Motion + AOS + Typed.js + tilt + icons) + the lazy confetti chunk.

---

## Content, honesty and what to verify

- **Real institute data.** Address (Plot 19 & 20, Knowledge Park-III, Greater Noida 201310), all four
  published phone numbers, both e-mail addresses and the website (iimtindia.net) come from the
  institute's public contact page; the footer, `tel:`/`mailto:` links and dialog copy all read from
  `src/constants/site.js`.
- **No backend.** A valid submit validates, fires the confetti burst and shows the confirmation
  state — nothing is transmitted. The success panel says so, but only in dev builds
  (`import.meta.env.DEV`). Wire `POST /api/enquiry` into the form's `submit()` to go live.
- **Illustrative figures.** Headline statistics (28+ years, 45 LPA, 1,200+ recruiters, 25,000+
  students, "Ranked Top 15 in North India") follow the admission collateral and the design mock-up.
  Treat them as placeholders, replace them with audited data, and note that the UI already labels
  them as demonstrative.
- **Accreditations** listed are NAAC A+, AICTE, PCI, BCI (Law) and IIC. The mock-up's "AACSB Member"
  chip was deliberately dropped because no public source supports it for this institution.
- **Photographs** are the five supplied campus images, copied into `public/images/` under descriptive
  names (`campus-building`, `campus-sign`, `campus-entrance`, `digital-classroom`, `sports-arena`),
  with their real intrinsic pixel sizes recorded in `src/data/gallery.js`.
- **Testimonials** are quotes actually published by the IIMT Career Development Cell (Jaro Education,
  Indus Towers, Optimus Information) rather than an invented alumnus.
- **Social icons.** lucide-react 1.x removed its brand glyphs, so the footer uses the closest generic
  lucide marks with `aria-label`/`title` naming the platform. Swap in `simple-icons` or official
  brand SVGs if exact marks are required; confirm the handles with the institute before publishing.
- **Research strip** is a small, deliberate addition: the mock-up's navbar links to "Research", so
  `#research` maps to four real in-house centres instead of dead-ending.

---

## Deployment

`vite.config.js` sets `base: "./"` and every `public/` asset is resolved through `utils/asset.js`
(`import.meta.env.BASE_URL`). As a result `dist/` works from a domain root, from a sub-path (e.g. a
GitHub Pages project site) or straight off disk, with no path rewriting:

```bash
npm run build      # dist/ is a static bundle - drop it on Netlify, Vercel, S3 or IIS
```

### Two builds, because a plain double-click is stricter than a web server

`npm run build:offline` produces `dist-offline/`, which runs from disk with **no server and no
Node** — double-click `index.html` and the site works. It exists because a normal Vite build cannot
be opened that way, and that is worth understanding:

1. Vite emits `<script type="module" crossorigin>`. Browsers fetch module scripts in **CORS mode**,
   and a `file://` page has an opaque ("null") origin, so the fetch is refused and the page is blank.
2. The lazy `canvas-confetti` chunk would be a second module fetch — same problem.
3. Removing `type="module"` is not enough on its own: Vite puts the entry script in `<head>`, where a
   *classic* script runs **synchronously**, before `<div id="root">` exists, so `createRoot(null)`
   throws and the page stays blank again.

So `vite.config.offline.js` builds one classic bundle (`output.format: "iife"` +
`inlineDynamicImports: true` + `modulePreload: false`), and `scripts/make-offline.mjs` strips
`type="module"` / `crossorigin` / `modulepreload`, then **inlines** the bundle and the CSS into a
single-file `index.html` (entry script moved to just before `</body>`, so `#root` exists when it
runs — inline scripts cannot use `defer`). It then *asserts* the result before writing: exactly one
external script, no `import`/`export` statements, no `import(...)` left, and no `assets/`
references left. A single file means no stale-cache mismatch is ever possible: there are no
hashed JS/CSS files to go out of sync with the HTML. If any check fails the build stops with a
clear message instead of shipping a blank page.

Which to use: `dist/` for real hosting (keeps the code-split confetti chunk and HTTP caching),
`dist-offline/` for pen-drive/submission/viva demos where double-click must just work.

```bash
npm run build:offline   # -> dist-offline/index.html (double-click, no server)
npm run serve:offline   # serves dist-offline/ on http://localhost:5500 and opens the browser
```

### If a browser shows a blank or white page

Current `dist-offline/` / `website/index.html` builds are single-file (JS+CSS inlined), so a white
page cannot be a cache/asset mismatch anymore — it would mean the file itself failed to run.
Quick checks, best first:

1. Confirm the copy you opened is the single-file build: `index.html` should be ~550 kB and the
   `website/` folder should contain **no `assets/` folder** (only `index.html`, `favicon.svg`
   and `images/`). An old copy will have `website/assets/` next to a small `index.html`.
2. `Ctrl+Shift+R` (hard reload), or close the tab and open `index.html` again.
3. Double-click **`START-WEBSITE.bat`** — it serves the build over `http://localhost:5500` with
   `cache-control: no-store`. It has no dependencies (Node only) and falls back to opening
   `index.html` directly if Node is missing.
4. `npm run serve:offline` — the same launcher from the project folder.

---

## Tests and lint

```bash
npm test      # 20 tests, all passing
npm run lint  # 0 errors (1 warning: the data hook exported beside its provider)
```

The three suites cover the pure logic only — no DOM, no test framework:

- `utils/validation.test.js` — required fields, e-mail shapes, Indian mobile normalisation
  (`+91 98765 43210`, `098765-43210`, 9- and 11-digit rejects), consent, the optional-city rule and
  `firstErrorField()` returning DOM order.
- `utils/format.test.js` — `tel:` hrefs, UTC-safe event dates (timezone-proof by construction),
  sorting without mutation, initials, digit grouping.
- `utils/confetti.test.js` — the module imports safely outside a browser and the palette matches the
  design tokens.

---

## Notes on this repository

- This app is self-contained in `acadmate/iimt-portal/` with its own `package.json`, lockfile, ESLint
  config and dev port (5174). It does not import from — or modify — the sibling AcadMate app.
- There is no router: sections are in-page anchors plus one context-owned dialog. Adding react-router
  later is a contained change because every section is already an isolated component.
- The theme follows the supplied mock-up (crimson-dominant). Flipping the primary token to the SRS's
  neon cyan is the two-line edit described under *Design system*.