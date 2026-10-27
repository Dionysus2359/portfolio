import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Lossless masters remain outside public. Never upscale or crop project captures.
await mkdir('public/media/studio', { recursive: true });
const records = [];
for (const [composition, widths] of [['desktop', [1280, 1672]], ['portrait', [600, 941]]]) {
  const input = `assets/source/green-studio/architecture-${composition}.png`;
  const source = await sharp(input).metadata();
  for (const width of widths) {
    if (width > source.width) continue;
    for (const format of ['avif', 'webp']) {
      const file = `public/media/studio/${composition}-${width}.${format}`;
      const pipeline = sharp(input).resize({ width, withoutEnlargement: true });
      const info = await pipeline[format]({ quality: format === 'avif' ? 63 : 83, effort: 6 }).toFile(file);
      records.push({ file: file.replace('public', ''), width: info.width, height: info.height, bytes: info.size });
    }
  }
}
await writeFile('assets/source/green-studio/delivery.json', JSON.stringify(records, null, 2) + '\n');
// This original explanatory SVG is code-native artwork, not a product screenshot.
const diagramPath = 'public/media/projects/adobe/workflow.svg';
let diagram = await readFile(diagramPath, 'utf8');
for (const [from, to] of Object.entries({ '#1c1816':'#041b18', '#241e1b':'#082a25', '#7d3525':'#a4bfb0', '#ff866b':'#a4bfb0', '#f2f0e8':'#f2edde', '#b8b6ae':'#b7c7bc', '#776158':'#577b69' })) diagram = diagram.replaceAll(from, to);
await writeFile(diagramPath, diagram);
console.log(JSON.stringify(records, null, 2));
