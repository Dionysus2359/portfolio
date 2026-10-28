import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { Arrow } from "@/components/layout/Icons";
import { profile } from "@/content/profile";
import styles from "@/components/contact/Contact.module.css";

export const metadata: Metadata = {
  title: "Let’s make something good",
  description:
    "Have a website or web product in mind? Start a conversation with Om Tiwari.",
  alternates: { canonical: "/contact/" },
};
export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.intro} data-arrival>
        <div>
          <span className="eyebrow muted">
            An idea is a good place to start.
          </span>
          <h1>
            Let’s make
            <br />
            <span className="serif">something good.</span>
          </h1>
          <p>
            Tell me what you have in mind. A few details are enough to get the
            conversation going.
          </p>
        </div>
        <div className={styles.contactInfo}>
          <p>Or, keep it simple.</p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <Arrow diagonal />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <Arrow diagonal />
            </a>
          </div>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
