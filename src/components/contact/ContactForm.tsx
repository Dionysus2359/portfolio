"use client";
import { useRef, useState } from "react";
import { profile } from "@/content/profile";
import { emailDraft } from "@/lib/contact";
import { Arrow } from "@/components/layout/Icons";
import styles from "./Contact.module.css";

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  const prepare = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.current?.reportValidity()) return;
    const data = new FormData(form.current);
    const read = (key: string) => String(data.get(key) || "");
    const enquiry = {
      name: read("name"),
      email: read("email"),
      message: read("message"),
      projectType: read("projectType"),
      timeline: read("timeline"),
      budget: read("budget"),
    };
    setDraft(emailDraft(profile.email, enquiry));
    setMessage(
      `To: ${profile.email}\n\nHi Om,\n\n${enquiry.message}\n\nFrom: ${enquiry.name} <${enquiry.email}>\nProject: ${enquiry.projectType || "Not specified"}\nTimeline: ${enquiry.timeline || "Not specified"}\nBudget: ${enquiry.budget || "Not specified"}`,
    );
    setCopied(false);
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return (
    <form
      ref={form}
      onSubmit={prepare}
      className={styles.form}
      onChange={() => {
        if (draft) setDraft(null);
      }}
    >
      <div className={styles.formRow}>
        <label>
          Your name <span>*</span>
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="How should I call you?"
          />
        </label>
        <label>
          Your email <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={180}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label>
        What are you thinking? <span>*</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={4}
          placeholder="A little about your idea, your business and what you’d like to make happen."
        />
      </label>
      <div className={styles.formRow}>
        <label>
          Project type <span className={styles.optional}>optional</span>
          <select name="projectType" defaultValue="">
            <option value="">Let’s figure it out</option>
            <option>New website</option>
            <option>Website redesign</option>
            <option>Web product</option>
            <option>Creative collaboration</option>
          </select>
        </label>
        <label>
          Timeline <span className={styles.optional}>optional</span>
          <select name="timeline" defaultValue="">
            <option value="">Still exploring</option>
            <option>Within a month</option>
            <option>1–3 months</option>
            <option>Flexible</option>
          </select>
        </label>
      </div>
      <label>
        Budget in mind <span className={styles.optional}>optional</span>
        <input
          name="budget"
          maxLength={100}
          placeholder="Your comfortable range, in any currency"
        />
      </label>
      <div className={styles.formAction}>
        <button type="submit" className="button-link">
          Prepare email draft <Arrow diagonal />
        </button>
        <p>
          This prepares a draft for your email app.
          <br />
          Nothing is sent or stored by this website.
        </p>
      </div>
      {draft && (
        <div className={styles.draft} role="status">
          <h2>Your draft is ready.</h2>
          <p>
            Open it in your email app, review it, then send it there. If no
            email app is configured, copy the text below into your preferred
            email service.
          </p>
          <div>
            <a className="button-link" href={draft}>
              Open email draft <Arrow diagonal />
            </a>
            <button type="button" onClick={copy}>
              {copied ? "Draft copied ✓" : "Copy draft text"}
            </button>
          </div>
          <details>
            <summary>View draft text</summary>
            <pre>{message}</pre>
          </details>
        </div>
      )}
      <noscript>
        <p>
          To get in touch, email{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>. Preparing a
          formatted draft needs JavaScript.
        </p>
      </noscript>
    </form>
  );
}
