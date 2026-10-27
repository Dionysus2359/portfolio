import Link from "next/link";
import Image from "next/image";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { Arrow } from "@/components/layout/Icons";
import { ExperienceClient } from "./ExperienceClient";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import styles from "./Experience.module.css";

export function ExperienceStage() {
  return (
    <section
      className={styles.stage}
      aria-label="Introduction and spatial project gallery"
      data-experience-stage
    >
      <div className={styles.sticky} data-stage-sticky>
        <div className={styles.hero} data-hero-copy>
          <div className={styles.heroMeta} data-hero-detail>
            <span className="eyebrow">Independent design & development</span>
            <span className={styles.availability}>
              <i data-availability-dot /> Open for select collaborations
            </span>
          </div>
          <div className={styles.headline}>
            <h1 aria-label="Websites with a pulse.">
              <span className={styles.lineMask} aria-hidden="true">
                <span data-hero-line>Websites</span>
              </span>
              <span className={styles.lineMask} aria-hidden="true">
                <span className={`serif ${styles.italicLine}`} data-hero-line>
                  with a
                </span>
              </span>
              <span className={styles.lineMask} aria-hidden="true">
                <span data-hero-line>
                  pulse<span className={styles.period}>.</span>
                </span>
              </span>
            </h1>
          </div>
          <div className={styles.heroIntro} data-hero-detail>
            <p>
              I’m Om. I turn ideas into memorable
              <br className={styles.desktopBreak} /> websites and useful web
              products.
            </p>
            <Link href="/#work" className="text-link">
              Explore my work <Arrow diagonal />
            </Link>
          </div>
          <div className={styles.objectLabel} data-hero-detail>
            <span className="eyebrow">O—01 / A study in possibility</span>
            <span>One form. A different perspective.</span>
          </div>
          <div className={styles.heroBottom}>
            <span>
              Creative developer
              <br />
              <span className="muted">Based in India · Working everywhere</span>
            </span>
            <a href="#work" className={styles.scrollHint}>
              <span>Scroll to explore</span>
              <span data-scroll-cue>↓</span>
            </a>
            <span className={styles.heroNumber}>Design × Code × Curiosity</span>
          </div>
          {profile.portrait && profile.heroPortrait && (
            <Link href="/#about" className={styles.heroPortrait}>
              <Image
                src={profile.portrait.src}
                alt="Meet Om"
                width={80}
                height={80}
              />
              Meet the person ↗
            </Link>
          )}
        </div>
        <div className={styles.poster} aria-hidden="true" data-ribbon-poster>
          <Image
            src="/media/experience/ribbon.svg"
            alt=""
            width={900}
            height={1000}
            priority
            sizes="(max-width: 700px) 70vw, 60vw"
          />
        </div>
        <div className={styles.galleryTitle} data-gallery-title>
          <span className="eyebrow">A few things I’ve put into the world</span>
          <h2>
            Different worlds.
            <br />
            <span className="serif">Same curiosity.</span>
          </h2>
          <span className={styles.galleryPrompt}>
            Choose a project, or keep scrolling ↓
          </span>
        </div>
        <div
          className={styles.projectLinks}
          data-project-links
          aria-label="Project gallery"
        >
          {projects.map((project) => (
            <Link
              className={styles.projectLink}
              href={`/work/${project.slug}/`}
              key={project.slug}
              data-project-link={project.slug}
              style={
                {
                  "--card-aspect": `${project.poster.width} / ${project.poster.height}`,
                } as React.CSSProperties
              }
            >
              <div className={styles.cardImage}>
                <Image
                  src={project.poster.src}
                  alt=""
                  width={project.poster.width}
                  height={project.poster.height}
                  sizes="(max-width: 700px) 85vw, 30vw"
                />
              </div>
              <div className={styles.cardLabel}>
                <span>
                  <small>
                    {project.number} / {project.category}
                  </small>
                  <strong>{project.shortTitle}</strong>
                </span>
                <Arrow diagonal />
              </div>
            </Link>
          ))}
        </div>
        <ExperienceClient />
        <div
          className={styles.stageProgress}
          data-stage-progress
          aria-hidden="true"
        >
          <span>INTRO</span>
          <div>
            <i data-progress-bar />
          </div>
          <span>WORK</span>
        </div>
      </div>
      <div className={styles.handoff} data-handoff>
        <div className={styles.handoffHeading}>
          <div>
            <span className="eyebrow muted">Selected work / 01</span>
            <h2>
              ACM SNU<span className="serif"> / A world of its own.</span>
            </h2>
          </div>
          <Link href="/work/acm/" className="text-link">
            Explore project <Arrow diagonal />
          </Link>
        </div>
        <Link href="/work/acm/" aria-label="Explore the ACM SNU case study">
          <ProjectMedia project={projects[0]} motion={false} />
        </Link>
      </div>
    </section>
  );
}
