import styles from "./Work.module.css";

export function AuditEvidence() {
  return (
    <section
      className={styles.auditEvidence}
      aria-labelledby="saved-evidence-title"
      data-reveal-group
    >
      <div data-reveal>
        <span className="eyebrow" style={{ color: "var(--accent-soft)" }}>
          From the actual saved report
        </span>
        <h2 id="saved-evidence-title">
          A finding you can
          <br />
          <span className="serif">follow back.</span>
        </h2>
        <p>
          This excerpt comes from the project’s example report, captured on 13
          October 2026. It describes that saved sample, rather than the current
          state of the website.
        </p>
      </div>
      <div className={styles.reportExcerpt} data-reveal>
        <div>
          <span>OBSERVED PAGE</span>
          <code>python.org/about/</code>
        </div>
        <div>
          <span>F-003 / RECORDED EVIDENCE</span>
          <code>&lt;a href=/community/lists&gt; with no content</code>
        </div>
        <div>
          <span>FINDING</span>
          <p>The sampled control has no accessible name.</p>
        </div>
        <div>
          <span>RECOMMENDED ACTION</span>
          <p>
            Add a descriptive accessible label or visually hidden text, then
            verify the control with an accessibility checker.
          </p>
        </div>
        <small>
          Source: examples/final-report.md · saved audit sample · not a live
          scan
        </small>
      </div>
    </section>
  );
}
