import { readFile, writeFile, unlink } from "node:fs/promises";
import sharp from "sharp";
import { existsSync } from "node:fs";

// Only transform source captures created for this portfolio, never source projects.
for (const slug of ["acm", "surge"]) {
  for (const format of ["desktop", "mobile"]) {
    const input = `public/media/projects/${slug}/${format}.jpg`;
    if (!existsSync(input)) continue;
    try {
      const metadata = await sharp(input).metadata();
      await sharp(input)
        .resize(
          format === "desktop" ? 1440 : 390,
          format === "desktop" ? 900 : 844,
          { fit: "cover", position: "north" },
        )
        .webp({ quality: 84 })
        .toFile(input.replace(".jpg", ".webp"));
      console.log(`${slug}/${format}: ${metadata.width}×${metadata.height}`);
      await unlink(input);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
}

const workflow = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900">
<defs><radialGradient id="glow"><stop stop-color="#7d3525" stop-opacity=".25"/><stop offset="1" stop-color="#1c1816" stop-opacity="0"/></radialGradient><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#f2f0e8" stroke-opacity=".035"/></pattern></defs>
<rect width="1440" height="900" fill="#1c1816"/><rect width="1440" height="900" fill="url(#grid)"/><ellipse cx="980" cy="400" rx="650" ry="550" fill="url(#glow)"/>
<g font-family="Arial,sans-serif"><text x="80" y="82" fill="#ff866b" font-size="12" letter-spacing="3">BRAND AI-READINESS AUDIT / PROJECT ARCHITECTURE</text><text x="80" y="213" fill="#f2f0e8" font-size="76" letter-spacing="-4">Less guesswork.</text><text x="80" y="296" fill="#f2f0e8" font-size="76" letter-spacing="-4">More evidence.</text><text x="84" y="356" fill="#b8b6ae" font-size="18">A bounded, read-only workflow. From website to useful next steps.</text>
<g stroke="#ff866b" stroke-opacity=".6" fill="none"><path d="M355 543h75m-12-7 12 7-12 7M705 543h75m-12-7 12 7-12 7M1055 543h75m-12-7 12 7-12 7"/></g>
<g fill="#241e1b" stroke="#776158" stroke-width="1"><rect x="80" y="452" width="275" height="210"/><rect x="430" y="452" width="275" height="210"/><rect x="780" y="452" width="275" height="210"/><rect x="1130" y="452" width="230" height="210"/></g>
<g fill="#ff866b" font-size="12" letter-spacing="2"><text x="104" y="490">01 / ACQUIRE</text><text x="454" y="490">02 / ANALYSE</text><text x="804" y="490">03 / PRIORITISE</text><text x="1154" y="490">04 / RECOMMEND</text></g>
<g fill="#f2f0e8" font-size="25"><text x="104" y="546">One snapshot.</text><text x="454" y="546">Shared evidence.</text><text x="804" y="546">Clear findings.</text><text x="1154" y="546">Next steps.</text></g>
<g fill="#b8b6ae" font-size="14"><text x="104" y="593">HTML · robots · sitemap</text><text x="104" y="619">Bounded acquisition</text><text x="454" y="593">Crawlability · content · identity</text><text x="454" y="619">Engagement · corroboration</text><text x="804" y="593">Merge · deduplicate · validate</text><text x="804" y="619">Evidence and confidence</text><text x="1154" y="593">Structured report</text><text x="1154" y="619">Prioritised actions</text></g>
<path d="M80 772h1280" stroke="#f2f0e8" stroke-opacity=".15"/><text x="80" y="817" fill="#b8b6ae" font-size="12">An explanatory diagram of the actual project workflow. Not a dashboard screenshot.</text><text x="1360" y="817" text-anchor="end" fill="#ff866b" font-size="12">EVIDENCE → ACTION</text></g></svg>`;
await writeFile("public/media/projects/adobe/workflow.svg", workflow);

// An original vector poster of the open, folded O. Real 3D uses procedural mesh geometry.
const quads = [];
const point = (t, w, d) => {
  const twist = 0.3 + Math.sin(t * 1.15 + 0.3) * 0.85,
    r = 1.53 + Math.sin(t * 2 + 0.5) * 0.09;
  let x =
    Math.cos(t) * r +
    w * Math.cos(t) * Math.cos(twist) -
    d * Math.cos(t) * Math.sin(twist);
  let y =
    Math.sin(t) * r * 1.13 +
    w * Math.sin(t) * Math.cos(twist) -
    d * Math.sin(t) * Math.sin(twist);
  let z =
    Math.sin(t * 2 - 0.6) * 0.22 + w * Math.sin(twist) + d * Math.cos(twist);
  const yaw = -0.38,
    roll = -0.32,
    pitch = 0.18;
  [x, z] = [
    x * Math.cos(yaw) + z * Math.sin(yaw),
    -x * Math.sin(yaw) + z * Math.cos(yaw),
  ];
  [y, z] = [
    y * Math.cos(pitch) - z * Math.sin(pitch),
    y * Math.sin(pitch) + z * Math.cos(pitch),
  ];
  [x, y] = [
    x * Math.cos(roll) - y * Math.sin(roll),
    x * Math.sin(roll) + y * Math.cos(roll),
  ];
  const scale = 210 / (1 - z * 0.11);
  return { x: 450 + x * scale, y: 445 - y * scale, z };
};
for (let i = 0; i < 200; i++) {
  const t = 0.12 + ((Math.PI * 2 - 0.32) * i) / 200,
    t2 = 0.12 + ((Math.PI * 2 - 0.32) * (i + 1)) / 200;
  for (let face = 0; face < 4; face++) {
    const cross = [
        [-0.46, -0.045],
        [0.46, -0.045],
        [0.46, 0.045],
        [-0.46, 0.045],
      ],
      a = cross[face],
      b = cross[(face + 1) % 4];
    const p = [
      point(t, ...a),
      point(t2, ...a),
      point(t2, ...b),
      point(t, ...b),
    ];
    const light = Math.pow(Math.max(0, Math.sin(t * 2 + 0.9)), 8),
      base = 50 + Math.max(0, Math.cos(t + 0.5)) * 95 + light * 105;
    const color =
      face === 0
        ? `rgb(${Math.min(255, base + 90)},${Math.round(base * 0.32)},${Math.round(base * 0.2)})`
        : `rgb(${Math.round(base)},${Math.round(base * 1.01)},${Math.round(Math.min(255, base * 1.06))})`;
    quads.push({
      z: p.reduce((sum, a) => sum + a.z, 0) / 4,
      svg: `<path d="M${p.map((a) => `${a.x.toFixed(2)},${a.y.toFixed(2)}`).join("L")}Z" fill="${color}" stroke="${color}" stroke-width=".8"/>`,
    });
  }
}
quads.sort((a, b) => a.z - b.z);
await writeFile(
  "public/media/experience/ribbon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1000" viewBox="0 0 900 1000"><defs><radialGradient id="shadow"><stop stop-color="#ff6546" stop-opacity=".12"/><stop offset="1" stop-color="#ff6546" stop-opacity="0"/></radialGradient></defs><ellipse cx="470" cy="820" rx="330" ry="70" fill="url(#shadow)"/>${quads.map((q) => q.svg).join("")}</svg>`,
);
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#121212"/><path d="M60 90h1080M60 550h1080" stroke="#f2f0e8" stroke-opacity=".2"/><g font-family="Arial,sans-serif"><text x="60" y="63" fill="#f2f0e8" font-size="22">OM TIWARI</text><text x="1140" y="63" text-anchor="end" fill="#b8b6ae" font-size="14">CREATIVE DEVELOPER</text><text x="60" y="260" fill="#f2f0e8" font-size="105" letter-spacing="-6">Websites</text><text x="60" y="370" fill="#f2f0e8" font-size="105" letter-spacing="-6">with a pulse<tspan fill="#ff6546">.</tspan></text><text x="60" y="465" fill="#b8b6ae" font-size="22">Independent design &amp; development.</text><text x="60" y="590" fill="#b8b6ae" font-size="14">DESIGN × CODE × CURIOSITY</text></g><circle cx="970" cy="290" r="125" fill="none" stroke="#ff6546" stroke-width="45" stroke-dasharray="700 100" transform="rotate(-35 970 290)"/></svg>`;
await sharp(Buffer.from(social)).png().toFile("public/social-preview.png");
console.log(
  "Original ribbon poster, process diagram and social preview prepared.",
);
