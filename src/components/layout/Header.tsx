import Link from "next/link";
import { SectionNavLink } from "./SectionNavLink";
import styles from "./Layout.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.wordmark} aria-label="Om Tiwari — home">
        <span>Om Tiwari</span>
      </Link>
      <nav aria-label="Main navigation" className={styles.nav}>
        <SectionNavLink section="work">Work</SectionNavLink>
        <SectionNavLink section="about">About</SectionNavLink>
        <Link href="/contact/">Let’s talk</Link>
      </nav>
    </header>
  );
}
