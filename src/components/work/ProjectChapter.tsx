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
      <div className={styles.chapterHeading} data-reveal-group>
        <div className={styles.projectIndex} data-reveal>
          <span>{project.number}</span>
          <span className="eyebrow">{project.category}</span>
        </div>
        <Link
          href={`/work/${project.slug}/`}
          className={styles.projectTitle}
          data-reveal
        >
          <h3>{project.title}</h3>
          <span className={styles.roundArrow}>
            <span data-magnetic>
              <Arrow diagonal />
            </span>
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
      <div className={styles.chapterBottom} data-reveal-group>
        <p data-reveal>{project.summary}</p>
        <div data-reveal>
          <span className="eyebrow muted">My part</span>
          <p>{project.role}</p>
        </div>
        <Link href={`/work/${project.slug}/`} className="text-link" data-reveal>
          Explore project <Arrow diagonal />
        </Link>
      </div>
    </article>
  );
}
