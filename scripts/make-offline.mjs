/**
 * Turns the `dist-offline/` build into something a plain double-click can open.
 *
 * Browsers fetch module scripts in CORS mode, and a `file://` page has an opaque ("null") origin,
 * so `<script type="module">` fails and the visitor gets a blank page. Same story for
 * `<link rel="stylesheet" crossorigin>` (CORS mode) and `<link rel="modulepreload">`.
 *
 * Stripping those attributes is only safe if the bundle truly is a single classic script, so this
 * script ASSERTS that first and refuses to write anything if it is not:
 *   1. exactly one external <script>
 *   2. no `import` / `export` statements in it (i.e. it really is IIFE output)
 *   3. no `import(...)` calls left (i.e. inlineDynamicImports actually inlined them)
 *
 * It then produces a ONE-FILE page: the single classic bundle and the single CSS file are
 * inlined directly into index.html, so there are no external asset fetches at all. That is
 * what makes the page bulletproof on file:// — a stale cache can never again mix the HTML
 * shell with a previous build's hashed assets, because JS/CSS now travel inside the HTML.
 *
 * Usage: node scripts/make-offline.mjs
 */
import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("dist-offline");
const htmlPath = path.join(outDir, "index.html");

const fail = (message) => {
  console.error(`\n  ✗ OFFLINE BUILD CHECK FAILED: ${message}\n`);
  process.exit(1);
};

if (!fs.existsSync(htmlPath)) {
  fail(`${htmlPath} not found - run "vite build --config vite.config.offline.js" first.`);
}

let html = fs.readFileSync(htmlPath, "utf8");

// --- 1. exactly one external script, and it must be the whole app -----------------------------
const scripts = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"[^>]*><\/script>/g)].map((match) => match[1]);
if (scripts.length !== 1) {
  fail(`expected exactly 1 external script in index.html, found ${scripts.length}.`);
}

const scriptPath = path.join(outDir, scripts[0].replace(/^\.\//, ""));
if (!fs.existsSync(scriptPath)) {
  fail(`referenced script does not exist: ${scripts[0]}`);
}

const js = fs.readFileSync(scriptPath, "utf8");

// --- 2. no ESM statements at all --------------------------------------------------------------
if (/^\s*(import|export)\s/m.test(js)) {
  fail("the bundle still contains ESM import/export statements - check output.format: 'iife'.");
}

// --- 3. no dynamic import left to fetch (would be blocked on file:// too) ---------------------
if (/\bimport\s*\(/.test(js)) {
  fail("the bundle still contains a dynamic import() call - check inlineDynamicImports: true.");
}

if (/modulepreload/.test(html)) {
  fail("index.html still contains a modulepreload link.");
}

// --- rewrite: classic script, no CORS-mode fetches ------------------------------------------------
html = html
  .replace(/<link rel="modulepreload"[^>]*>\s*/g, "")
  .replace(/\stype="module"/g, "")
  .replace(/\scrossorigin(="[^"]*")?/g, "");

// NOTE: the cleanliness check must run HERE, before the bundle is inlined below — the bundle's own
// source contains strings like `type="module"` / `crossorigin` (React DOM attribute handling), so
// scanning the final HTML would false-positive on the inlined code.
if (/type="module"|modulepreload/.test(html) || /\scrossorigin(="[^"]*")?/.test(html.replace(/<link rel="preconnect"[^>]*>/g, ""))) {
  fail("HTML rewriting left a module/CORS attribute behind.");
}

// Vite writes the entry script into <head>. That was harmless while it was a module script (module
// scripts are implicitly deferred), but a classic script there executes SYNCHRONOUSLY, before
// <div id="root"> has been parsed - createRoot(null) then throws and the page stays blank.
// An inline <script> cannot carry `defer`, so instead move the entry script to just before
// </body>: the DOM is fully parsed by then, which gives exactly the timing the module build had.
const inlineTag = (filePath, tag) => {
  const fullPath = path.join(outDir, filePath.replace(/^\.\//, ""));
  if (!fs.existsSync(fullPath)) fail(`referenced ${tag} does not exist: ${filePath}`);
  return fs.readFileSync(fullPath, "utf8");
};

const cssHrefs = [...html.matchAll(/<link[^>]*\srel="stylesheet"[^>]*>/g)]
  .map((match) => match[0])
  .filter((tag) => /\shref="\.\/assets\//.test(tag));
if (cssHrefs.length !== 1) fail(`expected exactly 1 local stylesheet link in index.html, found ${cssHrefs.length}.`);
const cssHref = cssHrefs[0].match(/href="([^"]+)"/)?.[1];
const css = inlineTag(cssHref, "stylesheet");
// A literal `</script>` inside the inlined JS would close the <script> element early and break the
// page (and `</style>` would do the same to the <style> element), so escape them the same way
// Vite's own asset inlining does.
const safeCss = css.replace(/<\/style/gi, "<\\/style");
html = html.replace(cssHrefs[0], () => `<style>\n${safeCss}\n</style>`);

html = html.replace(/<script([^>]*\ssrc="[^"]+")><\/script>/g, "");
if (!/<\/body>/.test(html)) fail("index.html has no </body> - cannot place the inline script.");
const safeJs = js.replace(/<\/script/gi, "<\\/script");
html = html.replace(
  "</body>",
  () =>
    `<script>\n/* inlined by scripts/make-offline.mjs: ${path.basename(scriptPath)} (${js.length} chars) */\n${safeJs}\n</script>\n</body>`,
);

if (/<script[^>]*\ssrc=/.test(html) || /<link[^>]*\srel="stylesheet"[^>]*href="\.\/assets\//.test(html)) {
  fail("an external assets/ reference survived - the offline page must be a single file.");
}

fs.writeFileSync(htmlPath, html, "utf8");

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;
console.log("  ✓ offline build is double-click safe (single file, no external assets)");
console.log(`    html    : index.html (${kb(fs.statSync(htmlPath).size)}) - JS+CSS inlined, no fetchable assets`);
console.log("    open it : dist-offline/index.html (double-click works, no server needed)\n");
