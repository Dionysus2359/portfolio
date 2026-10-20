import Link from "next/link";
import type { CSSProperties } from "react";
import type { PortfolioProject } from "@/types/project";
import { Arrow } from "@/components/layout/Icons";
import { ProjectMedia } from "./ProjectMedia";
import styles from "./Work.module.css";

export function ProjectChapter({ project }: { project: PortfolioProject }) {
  return (
    <article
      className={styles.chapter}
      id={`project-${project.slug}`}
      style={{ "--project-accent": project.accent } as CSSProperties}
    >
      <div className={styles.chapterHeading}>
        <div className={styles.projectIndex}>
          <span>{project.number}</span>
          <span className="eyebrow">{project.category}</span>
        </div>
        <Link href={`/work/${project.slug}/`} className={styles.projectTitle}>
          <h3>{project.title}</h3>
          <span className={styles.roundArrow}>
            <Arrow diagonal />
          </span>
        </Link>
      </div>
      <Link
        href={`/work/${project.slug}/`}
        className={styles.mediaLink}
        aria-label={`Explore the ${project.title} case study`}
      >
        <ProjectMedia project={project} />
      </Link>
      <div className={styles.chapterBottom}>
        <p>{project.summary}</p>
        <div>
          <span className="eyebrow muted">My part</span>
          <p>{project.role}</p>
        </div>
        <Link href={`/work/${project.slug}/`} className="text-link">
          Explore project <Arrow diagonal />
        </Link>
      </div>
    </article>
  );
}
