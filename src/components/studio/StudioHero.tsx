import Link from "next/link";
import type { CSSProperties } from "react";
import { studio, sceneSrcSet } from "@/content/studio";
import { projects } from "@/content/projects";
import { Arrow } from "@/components/layout/Icons";
import { StudioHeroMotion } from "./StudioHeroMotion";
import styles from "./StudioHero.module.css";

export function StudioHero() {
  return (
    <section className={styles.hero} aria-labelledby="studio-headline" data-studio-hero
      style={{ "--scene-position-desktop": studio.artwork.desktop.focalPoint, "--scene-position-mobile": studio.artwork.portrait.focalPoint } as CSSProperties}>
      <div className={styles.artwork} aria-hidden="true" data-studio-art>
        <picture>
          <source media="(max-width: 767px)" type="image/avif" srcSet={sceneSrcSet("portrait", "avif")} sizes="100vw" />
          <source media="(max-width: 767px)" type="image/webp" srcSet={sceneSrcSet("portrait", "webp")} sizes="100vw" />
          <source type="image/avif" srcSet={sceneSrcSet("desktop", "avif")} sizes="100vw" />
          <source type="image/webp" srcSet={sceneSrcSet("desktop", "webp")} sizes="100vw" />
          {/* Precomputed art direction for the static export; one selected image request. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/studio/desktop-1672.webp" width={1672} height={941} alt="" fetchPriority="high" loading="eager" data-studio-image />
        </picture>
        <div className={styles.light} data-studio-light />
      </div>
      <div className={styles.content}>
        <div className={styles.headingWrap}>
          <h1 id="studio-headline" className={styles.headline}>
            <span data-studio-line>{studio.headline.opening}</span>{" "}
            <span data-studio-line>{studio.headline.bridge} <span className={styles.lastWord}>{studio.headline.ending}</span></span>
          </h1>
          <div className={`${styles.headline} ${styles.headlineLight}`} aria-hidden="true" data-studio-type-light>
            <span>{studio.headline.opening}</span>{" "}<span>{studio.headline.bridge} <span className={styles.lastWord}>{studio.headline.ending}</span></span>
          </div>
        </div>
        <div className={styles.details} data-studio-detail>
          <p className={styles.introduction}>{studio.introduction[0]}<br className={styles.desktopBreak} /> {studio.introduction[1]}</p>
          <p className={styles.descriptor}>{studio.descriptor}</p>
          <a href="#work" className={styles.cta}>{studio.cta}<span data-magnetic><Arrow /></span></a>
        </div>
      </div>
      <div className={styles.bottom} data-studio-detail>
        <nav className={styles.projectIndex} aria-label="Selected projects">
          {projects.map(project => (
            <Link href={`/work/${project.slug}/`} key={project.slug} prefetch={false}>
              <span className={styles.number}>{project.number}</span>
              <span className={styles.indexName}>{project.shortTitle}<Arrow diagonal /></span>
            </Link>
          ))}
        </nav>
        <span className={styles.scrollNote} aria-hidden="true">Scroll to discover <span>↓</span></span>
      </div>
      <StudioHeroMotion />
    </section>
  );
}
