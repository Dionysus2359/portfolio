import type { Metadata } from "next";
import { profile } from "@/content/profile";
import styles from "../Document.module.css";
export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How this portfolio handles contact information and local preferences.",
  alternates: { canonical: "/privacy/" },
};
export default function PrivacyPage() {
  return (
    <article className={styles.document}>
      <span className="eyebrow muted">Last updated / 20 October 2026</span>
      <h1>
        A little clarity
        <br />
        <span className="serif">on privacy.</span>
      </h1>
      <p>
        This is Om Tiwari’s personal portfolio. The site does not use analytics,
        advertising trackers or a visitor account system.
      </p>
      <h2>Contacting me</h2>
      <p>
        The contact form prepares an email draft locally in your browser. Form
        details are not submitted to this website, saved in browser storage or
        sent to a server. Choosing “Open email draft” hands the draft to your
        configured email app, where you can review and send it. Your email
        provider handles any email you choose to send.
      </p>
      <p>
        When you email me, I use your message and contact details to respond and
        discuss your enquiry. Please avoid sending sensitive information in an
        initial enquiry.
      </p>
      <h2>Local preferences</h2>
      <p>
        If you choose reduced effects, the site saves a single preference in
        your browser’s local storage under “om-effects”. It helps the site
        remember your graphics preference and is not sent to a server. Clearing
        this site’s browser storage removes it. Your operating system’s
        reduced-motion preference is also respected.
      </p>
      <h2>Hosting and external links</h2>
      <p>
        The hosting provider may process standard request information, such as
        an IP address and requested URL, to serve and protect the website. Links
        to GitHub, LinkedIn and project websites take you to services with their
        own privacy practices. Fonts and portfolio media are served from this
        site.
      </p>
      <h2>Questions</h2>
      <p>
        Contact <a href={`mailto:${profile.email}`}>{profile.email}</a> about
        this portfolio or your enquiry.
      </p>
    </article>
  );
}
