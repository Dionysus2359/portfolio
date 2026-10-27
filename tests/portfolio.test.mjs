import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { emailDraft } from "../src/lib/contact.ts";
import { projects } from "../src/content/projects.ts";
import sharp from "sharp";

test("email drafts encode visitor text without creating extra mail headers", () => {
  const url = emailDraft("omtiwari2359@gmail.com", {
    name: "A & B\nBcc: other@example.com",
    email: "visitor@example.com",
    message: "A website? Budget ₹6,000 & a gallery.\nPlease call it ‘Pulse’.",
    projectType: "Website redesign",
    timeline: "Flexible",
    budget: "₹6,000",
  });
  assert.ok(url.startsWith("mailto:omtiwari2359@gmail.com?subject="));
  assert.equal(url.split("&").length, 2);
  const params = new URLSearchParams(url.split("?")[1]);
  assert.match(params.get("body"), /Budget ₹6,000 & a gallery/);
  assert.match(params.get("body"), /Reply to: visitor@example.com/);
  assert.equal(params.has("bcc"), false);
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
        `canonical\" href=\"https://om-tiwari-studio.open-cloud-8145.chatgpt.site/work/${project.slug}/`,
      ),
    );
  }
});

test("the exported HTML contains identity, work and contact without executing JavaScript", async () => {
  const html = await readFile("out/index.html", "utf8");
  const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  for (const text of [
    "Om Tiwari",
    "Websites",
    "pulse",
    "ACM SNU",
    "Surge",
    "mailto:omtiwari2359@gmail.com",
  ])
    assert.ok(visibleHtml.includes(text), text);
  for (const slug of ["acm", "surge", "adobe"])
    assert.ok(visibleHtml.includes(`/work/${slug}/`));
  assert.ok(!visibleHtml.includes('data-enhanced="true"'));
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
