import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";
import { resolveSiteOrigin, siteOrigin } from "../src/lib/site-origin.ts";
import { redactMonitoringUrl } from "../src/lib/monitoring.ts";

test("canonical origins prefer an explicit real domain and otherwise use Vercel production", () => {
  assert.equal(resolveSiteOrigin(" https://om.example/ ", "portfolio.vercel.app"), "https://om.example");
  assert.equal(resolveSiteOrigin(undefined, "portfolio.vercel.app"), "https://portfolio.vercel.app");
  assert.equal(resolveSiteOrigin("", "portfolio.vercel.app"), "https://portfolio.vercel.app");
  assert.equal(resolveSiteOrigin(), "http://localhost:3001");
});

test("placeholder and malformed origins cannot silently publish incorrect metadata", () => {
  for (const invalid of [
    "https://your-project.vercel.app",
    "[https://your-project.vercel.app](https://your-project.vercel.app)",
    "https://om.example/work/", "https://om.example/?email=private", "https://om.example/#work",
    "https://user:password@om.example", "javascript:alert(1)", "not a URL",
  ]) {
    assert.equal(resolveSiteOrigin(invalid, "portfolio.vercel.app"), "https://portfolio.vercel.app");
    assert.throws(() => resolveSiteOrigin(invalid), /plain http\(s\) origin/);
  }
});

test("monitoring redacts page query, fragment and credentials without mutating events", () => {
  for (const type of ["pageview", "vital"]) {
    const event = { type, url: "https://user:secret@om.example/contact/?email=visitor%40example.com#private", route: "/contact" };
    const clean = redactMonitoringUrl(event);
    assert.deepEqual(clean, { type, url: "https://om.example/contact/", route: "/contact" });
    assert.match(event.url, /visitor/);
    assert.notEqual(clean, event);
  }
  for (const url of ["not a URL", "mailto:visitor@example.com", "javascript:alert(1)"]) {
    assert.equal(redactMonitoringUrl({ url }), null);
  }
});

test("exported canonical, social, structured data and sitemap URLs share the chosen origin", async () => {
  const html = await readFile("out/index.html", "utf8");
  assert.ok(html.includes(`rel="canonical" href="${siteOrigin}/"`));
  assert.ok(html.includes(`property="og:image" content="${siteOrigin}/social-preview.png"`));
  assert.ok(html.includes(`"@id":"${siteOrigin}/#person"`));
  const sitemap = await readFile("out/sitemap.xml", "utf8");
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  assert.equal(locations.length, 6);
  for (const url of locations) assert.equal(new URL(url).origin, siteOrigin);
  assert.ok((await readFile("out/robots.txt", "utf8")).includes(`Sitemap: ${siteOrigin}/sitemap.xml`));
});

test("an empty arrival list creates no tween and media reveals keep captions fully opaque", async () => {
  const source = await readFile("src/components/motion/MotionDirector.tsx", "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const image = {};
  const figure = {
    getBoundingClientRect: () => ({ top: 1600, height: 300 }),
    querySelector: () => image,
    closest: () => null,
    addEventListener() {}, removeEventListener() {},
  };
  const tweens = [];
  const gsap = {
    registerPlugin() {},
    matchMedia: () => ({ add: (_queries, setup) => setup({ conditions: { full: true, desktop: false } }), revert() {} }),
    utils: { toArray: selector => selector === "[data-media-reveal]" ? [figure] : [] },
    fromTo: (target, from, to) => {
      assert.ok(!Array.isArray(target) || target.length, "GSAP must never receive an empty target list");
      tweens.push({ target, from, to });
      return { progress() {} };
    },
  };
  const mocks = {
    "next/navigation": { usePathname: () => "/" },
    react: { useEffect: setup => setup() },
    "./MotionPreferences": { useMotionPreferences: () => ({ ready: true, reduced: false }) },
    "@/components/loading/useExperienceReady": { useExperienceReady: () => true },
    gsap: { gsap },
    "gsap/ScrollTrigger": { ScrollTrigger: { refresh() {} } },
  };
  const exports = {};
  vm.runInNewContext(compiled, {
    exports,
    require: name => { assert.ok(name in mocks, name); return mocks[name]; },
    performance: { now: () => 0 },
    location: { hash: "" }, window: { scrollY: 0 }, innerHeight: 800,
    document: { activeElement: null, addEventListener() {}, removeEventListener() {} },
  });
  exports.MotionDirector();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(tweens.length, 2);
  assert.equal(tweens[0].target, figure);
  assert.equal("opacity" in tweens[0].from, false);
  assert.equal("opacity" in tweens[0].to, false);
  assert.equal(tweens[1].target, image);
  assert.equal(tweens[1].from.opacity, .35);
});
