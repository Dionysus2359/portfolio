import Link from "next/link";
import { profile } from "@/content/profile";
import { Arrow, Mark } from "./Icons";
import styles from "./Layout.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link href="/" className={styles.wordmark}>
          <Mark />
          <span>Om Tiwari</span>
        </Link>
        <p>Independent mind. Thoughtful websites.</p>
        <a href="#top">Back to top ↑</a>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} Om Tiwari</span>
        <div>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub <Arrow diagonal />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Arrow diagonal />
          </a>
          <Link href="/privacy/">Privacy</Link>
        </div>
        <span>Designed & built with intent.</span>
      </div>
    </footer>
  );
}
