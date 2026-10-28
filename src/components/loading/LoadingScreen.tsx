import type { CSSProperties } from "react";
import { OPENING } from "@/lib/readiness";
import styles from "./LoadingScreen.module.css";

export function LoadingScreen() {
  return (
    <div className={styles.screen} data-experience-screen aria-label="Opening the studio"
      style={{ "--opening-exit": `${OPENING.exit}ms`, "--opening-hold": `${OPENING.minimum}ms` } as CSSProperties}>
      <div className={`${styles.panel} ${styles.left}`} aria-hidden="true" />
      <div className={`${styles.panel} ${styles.right}`} aria-hidden="true" />
      <div className={styles.identity} aria-hidden="true">
        <div className={styles.top}><span>Om / Creative developer</span><span>India</span></div>
        <p className={styles.signature}>Om<span>Tiwari.</span></p>
        <div className={styles.seam} />
        <div className={styles.bottom}><span>Opening the studio</span><span>Loading</span></div>
        <div className={styles.activity} />
      </div>
      <button type="button" className={styles.skip} data-experience-skip>Enter site <span aria-hidden="true">↗</span></button>
    </div>
  );
}
