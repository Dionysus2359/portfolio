import { profile } from "@/content/profile";
import { Arrow } from "@/components/layout/Icons";
import { Photo } from "@/components/work/ProjectMedia";
import styles from "./Sections.module.css";

export function AboutSection() {
  return (
    <section
      id="about"
      className={`${styles.about} ${profile.portrait ? styles.withPortrait : ""}`}
    >
      <div className={styles.aboutLabel}>
        <span className="eyebrow">A little about the person</span>
        <span className={styles.smallStar} aria-hidden="true">
          ✳
        </span>
        {profile.portrait && <Photo photo={profile.portrait} portrait />}
      </div>
      <div className={styles.aboutContent}>
        <h2>
          A curious mind.
          <br />A builder’s instinct.
          <br />
          <span className="serif">A thing for the details.</span>
        </h2>
        <div className={styles.aboutCopy}>
          <p>
            I’m Om Tiwari, a creative developer at Shiv Nadar University. I like
            the space where design and engineering meet — where an idea becomes
            something you can actually use.
          </p>
          <p>
            From a playful computing community to a full festival platform, I
            care about how a website feels and how well it works. I bring both
            sides to the same table.
          </p>
        </div>
        <a
          href={profile.linkedin}
          className="text-link"
          target="_blank"
          rel="noreferrer"
        >
          More about me <Arrow diagonal />
        </a>
        <div className={styles.approach}>
          <div>
            <span>01</span>
            <h3>Find the idea.</h3>
            <p>The audience, the purpose, the thing that makes it yours.</p>
          </div>
          <div>
            <span>02</span>
            <h3>Make it feel right.</h3>
            <p>
              Type, space and interaction, with a reason behind each choice.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Build it properly.</h3>
            <p>Responsive development, careful checks and room to grow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
