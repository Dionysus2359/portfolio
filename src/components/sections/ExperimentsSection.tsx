"use client";

import { useId, useState } from "react";
import styles from "./Sections.module.css";

const auditExamples = [
  {
    label: "Accessible names",
    evidence: '<a href="/contact"><svg>…</svg></a>',
    finding: "An icon-only link has no accessible name.",
    recommendation:
      'Give it a descriptive label: aria-label="Contact us". Then check it with a keyboard and accessibility tree.',
    badge: "INSPECTABLE HTML",
  },
  {
    label: "Business information",
    evidence: "Opening hours appear only inside a menu image.",
    finding: "Useful information is unavailable as ordinary page text.",
    recommendation:
      "Add the same verified hours as visible HTML text beside the image. Keep the two versions consistent.",
    badge: "ILLUSTRATIVE OBSERVATION",
  },
  {
    label: "Search crawler access",
    evidence: "User-agent: OAI-SearchBot\nDisallow: /",
    finding: "The example policy blocks this named search crawler.",
    recommendation:
      "Review whether the block is intentional before changing the policy. This alone does not measure live answer visibility.",
    badge: "ILLUSTRATIVE POLICY",
  },
];

export function ExperimentsSection() {
  const [weight, setWeight] = useState(600);
  const [sample, setSample] = useState(0);
  const id = useId();
  return (
    <section className={styles.experiments} id="experiments">
      <div className={styles.experimentsHeading} data-reveal-group>
        <span className="eyebrow" data-reveal>
          The playground / 02 experiments
        </span>
        <h2 data-reveal>
          Because <span className="serif">what if?</span>
        </h2>
        <p data-reveal>
          Small ideas. Real interactions. A little room to play.
        </p>
      </div>
      <div className={styles.experimentGrid} data-reveal-group>
        <article className={styles.typeExperiment} data-reveal>
          <div className={styles.experimentMeta}>
            <span>01 / VARIABLE TYPE</span>
            <span>INTERACTIVE STUDY ↙</span>
          </div>
          <div className={styles.pulseType} style={{ fontWeight: weight }}>
            feel<span>.</span>
          </div>
          <div className={styles.rangeLabel}>
            <label htmlFor={`${id}-weight`}>Find your weight.</label>
            <output htmlFor={`${id}-weight`}>{weight}</output>
          </div>
          <input
            id={`${id}-weight`}
            type="range"
            min="400"
            max="900"
            step="1"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            aria-label="Typography weight"
          />
          <div className={styles.experimentFoot}>
            <h3>A feeling, in type.</h3>
            <p>
              One word. A whole range of personalities.
              <br />
              Drag the slider or use the arrow keys.
            </p>
          </div>
        </article>
        <article className={styles.auditExperiment} data-reveal>
          <div className={styles.experimentMeta}>
            <span>02 / EVIDENCE TO ACTION</span>
            <span>LOCAL SAMPLE</span>
          </div>
          <label className="sr-only" htmlFor={`${id}-sample`}>
            Choose an audit example
          </label>
          <select
            id={`${id}-sample`}
            value={sample}
            onChange={(e) => setSample(Number(e.target.value))}
          >
            {auditExamples.map((item, i) => (
              <option key={item.label} value={i}>
                {item.label}
              </option>
            ))}
          </select>
          <div className={styles.auditFlow} aria-live="polite">
            {auditExamples.map((example, index) => (
              <div key={example.label} className={`${styles.auditPanel} ${sample === index ? styles.auditPanelActive : ""}`} aria-hidden={sample !== index}>
                <div>
                  <span>01 / EVIDENCE</span>
                  <code>{example.evidence}</code>
                </div>
                <div>
                  <span>02 / FINDING</span>
                  <p>{example.finding}</p>
                </div>
                <div>
                  <span>03 / NEXT STEP</span>
                  <p>{example.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.experimentFoot}>
            <h3>Show your working.</h3>
            <p>
              Illustrative data explaining an audit approach.
              <br />
              This does not scan a website or call an AI service.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
