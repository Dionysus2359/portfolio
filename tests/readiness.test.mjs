import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { getEventListeners } from "node:events";
import { OPENING, EXPERIENCE_READY, experienceBootstrap, openingReleaseDelay, waitForImage } from "../src/lib/readiness.ts";
import { contactPointerOffset } from "../src/lib/motion.ts";

// Deterministic DOM/event doubles exercise recovery without a browser or network.
class ElementDouble extends EventTarget {
  constructor(attributes = {}, parent = null) {
    super();
    this.attributes = new Map(Object.entries(attributes));
    this.parent = parent;
    this.focusCount = 0;
  }
  removeAttribute(name) { this.attributes.delete(name); }
  closest(selector) {
    const attribute = selector.slice(1, -1);
    return this.attributes.has(attribute) ? this : this.parent?.closest(selector) || null;
  }
  focus() { this.focusCount++; }
}

function openingEnvironment({ systemReduced = false, stored = null, painted = false, storageBlocked = false } = {}) {
  let now = 0, sequence = 0;
  const timers = new Map();
  const changes = [];
  const dataset = new Proxy({}, { set(target, key, value) { changes.push([key, value]); target[key] = value; return true; } });
  const content = new ElementDouble({ inert: "", "aria-busy": "true" });
  const main = new ElementDouble();
  const document = Object.assign(new EventTarget(), {
    documentElement: { dataset }, hidden: false, activeElement: null,
    querySelector: selector => selector === "[data-experience-content]" ? content : null,
    getElementById: id => id === "main" ? main : null,
  });
  const window = new EventTarget();
  const setTimeout = (callback, delay) => {
    const id = ++sequence;
    timers.set(id, { callback, at: now + delay });
    return id;
  };
  const clearTimeout = id => timers.delete(id);
  const context = vm.createContext({
    window, document, Event, Element: ElementDouble, setTimeout, clearTimeout,
    performance: { now: () => now, getEntriesByType: () => painted ? [{ name: "first-paint" }] : [] },
    matchMedia: () => ({ matches: systemReduced }),
    localStorage: { getItem: () => { if (storageBlocked) throw Error("Blocked storage"); return stored; } },
  });
  vm.runInContext(experienceBootstrap(), context);
  const advance = milliseconds => {
    const end = now + milliseconds;
    let calls = 0;
    while (true) {
      const next = [...timers.entries()].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!next) break;
      assert.ok(++calls < 100, "timer loop must terminate");
      now = next[1].at;
      timers.delete(next[0]);
      next[1].callback();
    }
    now = end;
  };
  return { window, document, dataset, content, main, changes, timers, advance, state: window.__omExperience };
}

test("cached assets still receive the minimum; slow/missing assets cannot extend the deadline", () => {
  assert.equal(openingReleaseDelay(0, true, false), 1100);
  assert.equal(openingReleaseDelay(400, true, false), 700);
  assert.equal(openingReleaseDelay(1099, true, false), 1);
  assert.equal(openingReleaseDelay(1100, true, false), 0);
  assert.equal(openingReleaseDelay(3000, true, false), 0);
  assert.equal(openingReleaseDelay(3000, false, false), 1500);
  assert.equal(openingReleaseDelay(4500, false, false), 0);
  assert.equal(openingReleaseDelay(9000, false, false), 0);
  assert.equal(openingReleaseDelay(0, true, true), 0);
});

test("the opening exits once, takes 500ms, and releases the underlying content", () => {
  const env = openingEnvironment();
  let notifications = 0;
  env.window.addEventListener(EXPERIENCE_READY, () => notifications++);
  assert.equal(env.dataset.experience, "loading");
  env.advance(OPENING.minimum);
  env.state.release("assets");
  assert.equal(env.dataset.experience, "exiting");
  env.advance(250);
  env.state.release("assets"); // repeated completion must not restart the exit
  env.advance(249);
  assert.equal(env.state.phase, "exiting");
  env.advance(1);
  assert.equal(env.state.phase, "ready");
  assert.equal(env.state.readyAt, 1600);
  assert.equal(env.content.attributes.has("inert"), false);
  assert.equal(env.content.attributes.has("aria-busy"), false);
  assert.equal(notifications, 1);
  env.advance(10000);
  env.state.release("assets");
  assert.equal(notifications, 1);
  assert.equal(env.timers.size, 0);
});

test("failed hydration/controller cannot trap input behind the loading screen", () => {
  const env = openingEnvironment();
  env.advance(OPENING.failSafe - 1);
  assert.equal(env.state.phase, "loading");
  env.advance(1);
  assert.equal(env.dataset.experience, "ready");
  assert.equal(env.state.reason, "failsafe");
  assert.equal(env.content.attributes.has("inert"), false);
  assert.equal(getEventListeners(env.document, "keydown").length, 0);
  assert.equal(getEventListeners(env.document, "click").length, 0);
  assert.equal(getEventListeners(env.document, "pointerdown").length, 0);
});

test("Escape and the pre-hydration skip action bypass the hold and restore focus", () => {
  for (const method of ["escape", "click"]) {
    const env = openingEnvironment();
    const screen = new ElementDouble({ "data-experience-screen": "" });
    const skip = new ElementDouble({ "data-experience-skip": "" }, screen);
    env.document.activeElement = skip;
    const event = new Event(method === "escape" ? "keydown" : "click", { cancelable: true });
    if (method === "escape") Object.defineProperty(event, "key", { value: "Escape" });
    else Object.defineProperty(event, "target", { value: skip });
    env.document.dispatchEvent(event);
    assert.equal(env.state.phase, "ready", method);
    assert.equal(env.state.reason, "skip");
    assert.equal(env.state.interacted, true);
    assert.equal(env.main.focusCount, 1);
    assert.equal(event.defaultPrevented, true);
    assert.equal(env.timers.size, 0);
  }
});

test("history restoration and hidden exits finish without replaying or leaving locks", () => {
  const env = openingEnvironment();
  env.state.release("assets");
  env.window.dispatchEvent(new Event("pagehide"));
  assert.equal(env.state.phase, "ready");
  assert.equal(env.state.reason, "restore");
  const restored = new Event("pageshow");
  Object.defineProperty(restored, "persisted", { value: true });
  env.window.dispatchEvent(restored);
  assert.equal(env.state.phase, "ready");
  assert.equal(env.changes.filter(([key, value]) => key === "experience" && value === "loading").length, 1);

  const hidden = openingEnvironment();
  hidden.state.release("deadline");
  hidden.document.hidden = true;
  hidden.document.dispatchEvent(new Event("visibilitychange"));
  assert.equal(hidden.state.phase, "ready");
  assert.equal(hidden.content.attributes.has("inert"), false);
});

test("reduced motion, unavailable storage, and a late bootstrap all fail open appropriately", () => {
  for (const preference of [{ systemReduced: true }, { stored: "reduced" }]) {
    const env = openingEnvironment(preference);
    assert.equal(env.state.reduced, true);
    assert.equal(env.dataset.motion, "reduced");
    env.state.release("assets");
    assert.equal(env.state.phase, "ready");
    assert.equal(env.state.readyAt, 0);
  }
  const blocked = openingEnvironment({ storageBlocked: true });
  assert.equal(blocked.state.phase, "loading");
  blocked.advance(OPENING.failSafe);
  assert.equal(blocked.state.phase, "ready");
  const late = openingEnvironment({ painted: true });
  assert.equal(late.state.reason, "late");
  assert.equal(late.state.phase, "ready");
  assert.equal(late.changes.some(([key, value]) => key === "experience" && value === "loading"), false);
  assert.equal(late.timers.size, 0);
});

class ImageDouble extends EventTarget {
  constructor({ complete = false, naturalWidth = 0, src = "/portrait.avif" } = {}) {
    super();
    this.ownerDocument = { defaultView: new EventTarget() };
    this.currentSrc = this.src = src;
    this.complete = complete;
    this.naturalWidth = naturalWidth;
    this.decodeCount = 0;
    this.decode = async () => { this.decodeCount++; };
  }
}

test("image readiness observes load AND decode on the existing selected image", async () => {
  const image = new ImageDouble();
  const pending = waitForImage(image, new AbortController().signal);
  assert.equal(getEventListeners(image, "load").length, 1);
  image.complete = true;
  image.naturalWidth = 600;
  image.dispatchEvent(new Event("load"));
  assert.deepEqual(await pending, { status: "ready", src: "/portrait.avif" });
  assert.equal(image.decodeCount, 1);
  assert.equal(getEventListeners(image, "load").length, 0);
  assert.equal(getEventListeners(image.ownerDocument.defaultView, "resize").length, 0);
});

test("broken and corrupt images settle; cancellation detaches listeners even during decode", async () => {
  const missing = new ImageDouble({ complete: true });
  assert.equal((await waitForImage(missing, new AbortController().signal)).status, "failed");
  const unavailable = new ImageDouble();
  const failedRequest = waitForImage(unavailable, new AbortController().signal);
  unavailable.dispatchEvent(new Event("error"));
  assert.equal((await failedRequest).status, "failed");
  const corrupt = new ImageDouble({ complete: true, naturalWidth: 600 });
  corrupt.decode = () => Promise.reject(Error("Cannot decode"));
  assert.equal((await waitForImage(corrupt, new AbortController().signal)).status, "failed");
  const cancelled = new ImageDouble({ complete: true, naturalWidth: 600 });
  let finishDecode;
  cancelled.decode = () => new Promise(resolve => { finishDecode = resolve; });
  const controller = new AbortController();
  const pending = waitForImage(cancelled, controller.signal);
  await Promise.resolve();
  controller.abort();
  assert.equal((await pending).status, "cancelled");
  assert.equal(getEventListeners(cancelled, "error").length, 0);
  assert.equal(getEventListeners(cancelled.ownerDocument.defaultView, "resize").length, 0);
  finishDecode();
  const alreadyAborted = new AbortController();
  alreadyAborted.abort();
  assert.equal((await waitForImage(new ImageDouble(), alreadyAborted.signal)).status, "cancelled");
});

test("a resize during decode waits for the new responsive candidate, not the stale one", async () => {
  const image = new ImageDouble({ complete: true, naturalWidth: 1672, src: "/desktop.avif" });
  const decodes = [];
  image.decode = () => new Promise(resolve => decodes.push({ src: image.currentSrc, resolve }));
  const pending = waitForImage(image, new AbortController().signal);
  let done = false;
  void pending.then(() => { done = true; });
  await Promise.resolve();
  image.currentSrc = "/portrait.avif";
  image.dispatchEvent(new Event("load"));
  await Promise.resolve();
  assert.equal(decodes.length, 2);
  decodes[0].resolve();
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(done, false);
  decodes[1].resolve();
  assert.deepEqual(await pending, { status: "ready", src: "/portrait.avif" });
  assert.equal(decodes.length, 2);
});

test("contact pull covers broad section bounds while keeping displacement bounded", () => {
  const section = { left: 80, top: 200, width: 1600, height: 560 };
  assert.deepEqual(contactPointerOffset(880, 480, section), { x: 0, y: 0, arrowX: 0, arrowY: 0 });
  const corner = contactPointerOffset(1680, 760, section);
  assert.equal(corner.x, 14);
  assert.equal(corner.y, 7);
  assert.ok(Math.hypot(corner.arrowX, corner.arrowY) <= 21.000001);
  const opposite = contactPointerOffset(80, 200, section);
  assert.equal(opposite.x, -14);
  assert.equal(opposite.y, -7);
  const expanded = contactPointerOffset(3200, 1120, { left: 0, top: 0, width: 3200, height: 1120 });
  assert.equal(expanded.x, 14);
  assert.equal(expanded.y, 7);
  const clamped = contactPointerOffset(9000, -9000, section);
  assert.equal(clamped.x, 14);
  assert.equal(clamped.y, -7);
});
