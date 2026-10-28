"use client";
import { useRef, useState } from "react";
import { profile } from "@/content/profile";
import { createEmailDraft } from "@/lib/contact";
import { Arrow } from "@/components/layout/Icons";
import styles from "./Contact.module.css";

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [draft, setDraft] = useState<ReturnType<typeof createEmailDraft> | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const [appRequested, setAppRequested] = useState(false);
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
    setDraft(createEmailDraft(profile.email, enquiry));
    setCopyStatus("idle");
    setAppRequested(false);
  };
  const copy = async () => {
    try {
      if (!draft) return;
      await navigator.clipboard.writeText(draft.text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
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
          Choose Gmail or your email app to review and send.
          <br />
          Nothing is sent or stored by this website.
        </p>
      </div>
      <p className="sr-only" role="status">
        {draft ? "Your email draft is ready to review below." : ""}
      </p>
      {draft && (
        <div className={styles.draft}>
          <h2>Your draft is ready.</h2>
          <p>
            Open it in Gmail or your email app, review it, then send it there.
            You can also copy the full draft into another email service.
          </p>
          <dl className={styles.draftHeaders}>
            <div><dt>To</dt><dd>{draft.to}</dd></div>
            <div><dt>Subject</dt><dd>{draft.subject}</dd></div>
          </dl>
          <div className={styles.draftActions}>
            <a className="button-link" href={draft.gmail} target="_blank" rel="noreferrer">
              Open in Gmail <Arrow diagonal />
            </a>
            <a className={styles.emailApp} href={draft.mailto} onClick={() => setAppRequested(true)}>
              Use email app <Arrow diagonal />
            </a>
            <button type="button" onClick={copy}>
              {copyStatus === "copied" ? "Draft copied ✓" : "Copy draft text"}
            </button>
          </div>
          {appRequested && <p role="status">If your email app didn’t open, use Gmail or copy the draft. This option needs a default email app set up in your browser.</p>}
          {copyStatus === "failed" && <p role="status">Copy isn’t available here. Select and copy the full draft below.</p>}
          <details open={copyStatus === "failed" || undefined}>
            <summary>View full draft text</summary>
            <pre>{draft.text}</pre>
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
