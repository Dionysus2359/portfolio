export const OPENING = {
  minimum: 1100,
  exit: 500,
  deadline: 4500,
  failSafe: 6000,
} as const;

export const EXPERIENCE_READY = "om:experience-ready";

export type OpeningReason = "assets" | "deadline" | "skip" | "restore" | "route" | "failsafe" | "late";
export type OpeningState = {
  startedAt: number;
  readyAt: number;
  phase: "loading" | "exiting" | "ready";
  reduced: boolean;
  interacted: boolean;
  reason?: OpeningReason;
  release: (reason: OpeningReason, immediately?: boolean) => void;
};

declare global {
  interface Window { __omExperience?: OpeningState }
}

/** The deadline always wins, including when a resource never settles. */
export function openingReleaseDelay(elapsed: number, assetsSettled: boolean, reduced: boolean) {
  const remaining = Math.max(0, OPENING.deadline - elapsed);
  return assetsSettled
    ? Math.min(remaining, Math.max(0, (reduced ? 0 : OPENING.minimum) - elapsed))
    : remaining;
}

export type ImageReadiness = { status: "ready" | "failed" | "cancelled"; src: string };

/** Observe the real picture/img selection; never start a duplicate image request. */
export function waitForImage(image: HTMLImageElement, signal: AbortSignal): Promise<ImageReadiness> {
  return new Promise(resolve => {
    let finished = false;
    let decoding = "";
    let generation = 0;
    const viewport = image.ownerDocument.defaultView;
    const source = () => image.currentSrc || image.src;
    const finish = (status: ImageReadiness["status"]) => {
      if (finished) return;
      finished = true;
      image.removeEventListener("load", check);
      image.removeEventListener("error", fail);
      viewport?.removeEventListener("resize", check);
      signal.removeEventListener("abort", cancel);
      resolve({ status, src: source() });
    };
    const cancel = () => finish("cancelled");
    const fail = () => finish("failed");
    const check = () => {
      if (finished) return;
      if (signal.aborted) return cancel();
      if (!image.complete) return;
      if (!image.naturalWidth) return fail();
      const selected = source();
      if (selected === decoding) return;
      decoding = selected;
      const current = ++generation;
      // decode() may reject for a replaced candidate; only settle the current one.
      void Promise.resolve().then(() => image.decode()).then(() => {
        if (finished || current !== generation) return;
        if (selected !== source()) { decoding = ""; check(); return; }
        finish("ready");
      }, () => {
        if (finished || current !== generation) return;
        if (selected !== source()) { decoding = ""; check(); return; }
        fail();
      });
    };
    image.addEventListener("load", check);
    image.addEventListener("error", fail);
    viewport?.addEventListener("resize", check);
    signal.addEventListener("abort", cancel, { once: true });
    check();
  });
}

/** Runs while the document is parsed, before React or the motion library. */
export function experienceBootstrap() {
  return `(() => {
    if (window.__omExperience) return;
    const root = document.documentElement;
    let reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    try { reduced = reduced || localStorage.getItem('om-effects') === 'reduced'; } catch {}
    const state = window.__omExperience = {
      startedAt: performance.now(), readyAt: 0, phase: 'loading', reduced,
      interacted: false, release
    };
    let exitTimer, failTimer;
    function finish(reason) {
      if (state.phase === 'ready') return;
      clearTimeout(exitTimer); clearTimeout(failTimer);
      state.phase = 'ready'; state.reason = reason; state.readyAt = performance.now();
      root.dataset.experience = 'ready';
      const content = document.querySelector('[data-experience-content]');
      if (content) { content.removeAttribute('inert'); content.removeAttribute('aria-busy'); }
      const focused = document.activeElement;
      if (focused && focused.closest('[data-experience-screen]')) {
        document.getElementById('main')?.focus({ preventScroll: true });
      }
      document.removeEventListener('keydown', key);
      document.removeEventListener('click', click);
      document.removeEventListener('pointerdown', interact);
      window.dispatchEvent(new Event('${EXPERIENCE_READY}'));
    }
    function release(reason, immediately) {
      if (state.phase === 'ready') return;
      if (immediately || state.reduced || document.hidden) { finish(reason); return; }
      if (state.phase === 'exiting') return;
      state.phase = 'exiting'; state.reason = reason;
      root.dataset.experience = 'exiting';
      exitTimer = setTimeout(() => finish(reason), ${OPENING.exit});
    }
    function interact() { state.interacted = true; }
    function key(event) {
      interact();
      if (event.key === 'Escape') { event.preventDefault(); release('skip', true); }
    }
    function click(event) {
      if (event.target instanceof Element && event.target.closest('[data-experience-skip]')) {
        event.preventDefault(); interact(); release('skip', true);
      }
    }
    // A delayed bootstrap must never cover content that has already been painted.
    if (performance.getEntriesByType('paint').length) { finish('late'); return; }
    root.dataset.motion = reduced ? 'reduced' : 'full';
    root.dataset.experience = 'loading';
    document.addEventListener('keydown', key);
    document.addEventListener('click', click);
    document.addEventListener('pointerdown', interact, { passive: true });
    failTimer = setTimeout(() => finish('failsafe'), ${OPENING.failSafe});
    window.addEventListener('pagehide', () => finish('restore'));
    window.addEventListener('pageshow', event => { if (event.persisted) finish('restore'); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && state.phase === 'exiting') finish(state.reason);
    });
  })();`;
}
