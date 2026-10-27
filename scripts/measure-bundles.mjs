import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const html = await readFile('out/index.html', 'utf8');
const entry = [...new Set([...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(match => match[1]))];
const gzipBytes = async file => gzipSync(await readFile(file)).length;
const sum = values => values.reduce((a, b) => a + b, 0);
const kib = bytes => +(bytes / 1024).toFixed(1);
const core = sum(await Promise.all(entry.map(file => gzipBytes('out' + file))));
const chunks = (await readdir('out/_next/static/chunks')).filter(file => file.endsWith('.js'));
const total = sum(await Promise.all(chunks.map(file => gzipBytes(path.join('out/_next/static/chunks', file)))));
const css = [...new Set([...html.matchAll(/<link[^>]*href="([^"]+\.css)"/g)].map(match => match[1]))];
const cssBytes = sum(await Promise.all(css.map(file => gzipBytes('out' + file))));
const globals = await readFile('src/app/globals.css', 'utf8');
const fonts = [...new Set([...globals.matchAll(/url\(['"]?(\/fonts\/[^)'" ]+)/g)].map(match => match[1]))];
const fontBytes = sum(await Promise.all(fonts.map(async file => (await stat('public' + file)).size)));
const delivery = JSON.parse(await readFile('assets/source/green-studio/delivery.json', 'utf8'));
const desktop = delivery.find(asset => asset.file === '/media/studio/desktop-1672.avif').bytes;
const mobile = delivery.find(asset => asset.file === '/media/studio/portrait-600.avif').bytes;
console.log(JSON.stringify({
  coreRouteJavaScriptGzipKiB:kib(core), allJavaScriptChunksGzipKiB:kib(total),
  additionalChunksAndRoutesGzipKiB:kib(total-core), homeStylesGzipKiB:kib(cssBytes),
  referencedFonts:fonts, fontFilesKiB:kib(fontBytes),
  desktopHeroAvifKiB:kib(desktop), mobileHeroAvifKiB:kib(mobile),
  estimatedCriticalDesktopKiB:kib(core+cssBytes+fontBytes+desktop),
  estimatedCriticalMobileKiB:kib(core+cssBytes+fontBytes+mobile),
  note:'Critical estimates include initial script tags, home CSS, both referenced fonts and selected art. Browser request checks distinguish lazy/prefetch traffic.'
}, null, 2));
