import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createEmailDraft } from "../src/lib/contact.ts";
import { projects } from "../src/content/projects.ts";
import sharp from "sharp";
import { profile } from "../src/content/profile.ts";
import { parseMotionChoice, shouldReduceMotion } from "../src/lib/motion.ts";

test("email drafts encode visitor text without creating extra mail headers", () => {
  const draft = createEmailDraft("omtiwari2359@gmail.com", {
    name: "A & B\nBcc: other@example.com",
    email: "visitor@example.com",
    message: "A website? Budget ₹6,000 & a gallery.\nPlease call it ‘Pulse’.",
    projectType: "Website redesign",
    timeline: "Flexible",
    budget: "₹6,000",
  });
  assert.ok(draft.mailto.startsWith("mailto:omtiwari2359@gmail.com?subject="));
  assert.equal(draft.mailto.split("&").length, 2);
  const params = new URLSearchParams(draft.mailto.split("?")[1]);
  assert.match(params.get("body"), /Budget ₹6,000 & a gallery/);
  assert.match(params.get("body"), /Reply to: visitor@example.com/);
  assert.equal(params.has("bcc"), false);
  assert.equal(params.get("subject"), "Website enquiry from A & B Bcc: other@example.com");
  assert.equal(params.get("subject"), draft.subject);
  assert.equal(params.get("body"), draft.body);
  assert.equal(draft.text, `To: ${draft.to}\nSubject: ${draft.subject}\n\n${draft.body}`);
  const gmail = new URL(draft.gmail);
  assert.equal(gmail.origin, "https://mail.google.com");
  assert.equal(gmail.searchParams.get("extsrc"), "mailto");
  assert.equal(gmail.searchParams.get("url"), draft.mailto);
});

test("every project has real local media and a complete independent case-study route", async () => {
  assert.deepEqual(
    projects.map((p) => p.slug),
    ["acm", "surge", "adobe"],
  );
  for (const project of projects) {
    await access(`public${project.poster.src}`);
    if (project.mobilePoster) await access(`public${project.mobilePoster.src}`);
    for (const media of [project.poster, ...(project.screenshots || [])]) {
      const actual = await sharp(`public${media.src}`).metadata();
      assert.equal(actual.width, media.width, `${media.src} width`);
      assert.equal(actual.height, media.height, `${media.src} height`);
    }
    assert.ok(project.decisions.length >= 3);
    assert.ok(project.evidenceNotes.length >= 2);
    const html = await readFile(`out/work/${project.slug}/index.html`, "utf8");
    assert.ok(html.includes(project.title));
    assert.ok(html.includes("The idea behind"));
    for (const screenshot of project.screenshots || []) {
      assert.ok(html.includes(screenshot.src));
      assert.ok(html.includes(screenshot.alt));
    }
    assert.ok(
      html.includes(
        `canonical\" href=\"${profile.origin}/work/${project.slug}/`,
      ),
    );
  }
});

test("the exported HTML contains identity, work and contact without executing JavaScript", async () => {
  const html = await readFile("out/index.html", "utf8");
  const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  for (const text of [
    "Om Tiwari",
    "Made to",
    "different.",
    "ACM SNU",
    "Surge",
    "mailto:omtiwari2359@gmail.com",
  ])
    assert.ok(visibleHtml.includes(text), text);
  for (const slug of ["acm", "surge", "adobe"])
    assert.ok(visibleHtml.includes(`/work/${slug}/`));
  assert.ok(!visibleHtml.includes('data-enhanced="true"'));
  assert.equal((visibleHtml.match(/<h1\b/g) || []).length, 1);
  assert.ok(visibleHtml.includes('<picture>'));
  assert.ok(!visibleHtml.includes('/media/experience/'));
});

test("hero delivery files match their declared dimensions and contain no upscaled masters", async () => {
  const delivery = JSON.parse(await readFile('assets/source/green-studio/delivery.json', 'utf8'));
  assert.equal(delivery.length, 8);
  for (const asset of delivery) {
    const metadata = await sharp(`public${asset.file}`).metadata();
    assert.equal(metadata.width, asset.width);
    assert.equal(metadata.height, asset.height);
    assert.ok(asset.width <= (asset.file.includes('portrait') ? 941 : 1672));
    assert.ok(asset.bytes < 220 * 1024);
  }
});

test("device motion preferences take precedence and invalid stored values fall back safely", () => {
  assert.equal(parseMotionChoice('reduced'), 'reduced');
  assert.equal(parseMotionChoice(null), 'full');
  assert.equal(parseMotionChoice('invalid'), 'full');
  assert.equal(shouldReduceMotion(true, 'full'), true);
  assert.equal(shouldReduceMotion(false, 'reduced'), true);
  assert.equal(shouldReduceMotion(false, 'full'), false);
});

test("contact and recovery pages exist and do not claim email delivery", async () => {
  const contact = await readFile("out/contact/index.html", "utf8");
  assert.ok(contact.includes("Prepare email draft"));
  assert.ok(contact.includes("Nothing is sent or stored"));
  const recovery = await readFile("out/404.html", "utf8");
  assert.ok(recovery.includes("Lost in"));
  await access("out/privacy/index.html");
  await access("out/robots.txt");
  await access("out/sitemap.xml");
});
