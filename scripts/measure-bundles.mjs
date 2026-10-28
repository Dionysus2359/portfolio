import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { studio } from "../src/content/studio.ts";

// Walk the export instead of assuming a particular Next.js chunk layout.
async function javascriptFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return javascriptFiles(file);
    return entry.name.endsWith(".js") ? [file] : [];
  }));
  return files.flat();
}

const html = await readFile("out/index.html", "utf8");
const entry = [...new Set(
  [...html.matchAll(/<script[^>]*src="([^"]+)"/g)]
    .map(match => match[1])
    .filter(file => file.startsWith("/_next/")),
)];
const gzipBytes = async file => gzipSync(await readFile(file)).length;
const sum = values => values.reduce((total, bytes) => total + bytes, 0);
const kib = bytes => +(bytes / 1024).toFixed(1);
const core = sum(await Promise.all(entry.map(file => gzipBytes("out" + file))));
const chunks = (await javascriptFiles("out/_next/static"))
  .filter(file => file.split(path.sep).includes("chunks"));
const total = sum(await Promise.all(chunks.map(gzipBytes)));
const css = [...new Set(
  [...html.matchAll(/<link[^>]*href="([^"]+\.css)"/g)].map(match => match[1]),
)];
const cssBytes = sum(await Promise.all(css.map(file => gzipBytes("out" + file))));
const globals = await readFile("src/app/globals.css", "utf8");
const fonts = [...new Set(
  [...globals.matchAll(/url\(['"]?(\/fonts\/[^)'" ]+)/g)].map(match => match[1]),
)];
const fontBytes = sum(await Promise.all(fonts.map(async file => (await stat("public" + file)).size)));
const desktopWidth = studio.artwork.desktop.width;
const mobileWidth = Math.min(...studio.artwork.portrait.widths);
const desktop = (await stat(`public/media/studio/desktop-${desktopWidth}.avif`)).size;
const mobile = (await stat(`public/media/studio/portrait-${mobileWidth}.avif`)).size;

console.log(JSON.stringify({
  coreRouteJavaScriptGzipKiB: kib(core),
  allJavaScriptChunksGzipKiB: kib(total),
  additionalChunksAndRoutesGzipKiB: kib(total - core),
  homeStylesGzipKiB: kib(cssBytes),
  referencedFonts: fonts,
  fontFilesKiB: kib(fontBytes),
  desktopHeroAvifKiB: kib(desktop),
  mobileHeroAvifKiB: kib(mobile),
  estimatedCriticalDesktopKiB: kib(core + cssBytes + fontBytes + desktop),
  estimatedCriticalMobileKiB: kib(core + cssBytes + fontBytes + mobile),
  note: "File-size estimates include initial scripts, home CSS, both fonts and one art candidate. These are not browser timings or Lighthouse scores.",
}, null, 2));
