import Link from "next/link";
import { Arrow } from "@/components/layout/Icons";
import styles from "./Document.module.css";
export default function NotFound() {
  return (
    <section className={styles.error}>
      <span className="eyebrow" style={{ color: "var(--accent)" }}>
        404 / A small detour
      </span>
      <h1>
        Lost in
        <br />
        <span className="serif">possibility.</span>
      </h1>
      <p>
        This page isn’t here, but there’s plenty to explore. Let’s get you back
        to something good.
      </p>
      <div>
        <Link href="/#work" className="button-link">
          Explore the work <Arrow diagonal />
        </Link>
        <Link href="/contact/" className="text-link">
          Say hello <Arrow diagonal />
        </Link>
      </div>
    </section>
  );
}
