import Link from "next/link";
import { Arrow, Mark } from "./Icons";
import styles from "./Layout.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.wordmark} aria-label="Om Tiwari — home">
        <Mark />
        <span>
          Om Tiwari<span className={styles.wordmarkDot}>↗</span>
        </span>
      </Link>
      <nav aria-label="Main navigation" className={styles.nav}>
        <Link href="/#work">
          Work<span className={styles.navIndex}>03</span>
        </Link>
        <Link href="/#about">About</Link>
        <Link href="/contact/" className={styles.talk}>
          Let’s talk <Arrow diagonal />
        </Link>
      </nav>
    </header>
  );
}
