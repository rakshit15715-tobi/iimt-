/**
 * Resolves a file that lives in `public/` against Vite's base URL.
 *
 * Why not just write "/images/campus-sign.jpg"? Because the production build uses
 * `base: "./"` so `dist/` can be served from a sub-path, dropped on Netlify/Vercel or even
 * opened directly from disk - an absolute "/images/..." URL breaks in all three cases.
 * BASE_URL is "./" there and "/" in a root deployment, so one helper covers both.
 */
export function assetUrl(publicPath) {
  const clean = String(publicPath).replace(/^\/+/, "");
  const base = import.meta.env?.BASE_URL ?? "/";
  return `${base}${clean}`;
}
