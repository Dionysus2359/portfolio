import Link from "next/link";
import { profile } from "@/content/profile";
import { Arrow } from "@/components/layout/Icons";
import { ContactSectionMotion } from "./ContactSectionMotion";
import styles from "./Sections.module.css";

export function ContactSection() {
  return (
    <section className={styles.contact} id="contact" data-reveal-group data-contact-motion>
      <div className={styles.contactTop} data-reveal>
        <span className="eyebrow">Have something in mind?</span>
        <span className="eyebrow">Let’s make it happen.</span>
      </div>
      <Link href="/contact/" className={styles.contactTitle}>
        <div className={styles.contactHeading} data-reveal>
          <h2>
            Good things start
            <br />
            with a <span className="serif">conversation.</span>
          </h2>
        </div>
        <span>
          <span className={styles.contactArrow}>
            <Arrow diagonal />
          </span>
        </span>
      </Link>
      <div className={styles.contactBottom} data-reveal>
        <p>
          A new website. A fresh perspective.
          <br />
          Or an idea you can’t stop thinking about.
        </p>
        <a href={`mailto:${profile.email}`} className="text-link">
          {profile.email} <Arrow diagonal />
        </a>
      </div>
      <ContactSectionMotion />
    </section>
  );
}
