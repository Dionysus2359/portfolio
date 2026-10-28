import Image from "next/image";
import type { PortfolioProject, EditorialPhoto } from "@/types/project";
import styles from "./Work.module.css";
import type { CSSProperties } from "react";

export function ProjectMedia({
  project,
  priority = false,
  motion = true,
}: {
  project: PortfolioProject;
  priority?: boolean;
  motion?: boolean;
}) {
  return (
    <div
      className={styles.mediaDrift}
      data-media-drift={motion ? "" : undefined}
    >
      <figure
        className={[styles.media, styles[project.slug]].filter(Boolean).join(" ")}
        data-media-reveal={motion ? "" : undefined}
        style={
          {
            "--media-aspect": `${project.poster.width} / ${project.poster.height}`,
          } as CSSProperties
        }
      >
        <Image
          src={project.poster.src}
          alt={project.poster.alt}
          width={project.poster.width}
          height={project.poster.height}
          sizes="(max-width: 700px) 100vw, 92vw"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          data-critical-image={priority ? "" : undefined}
        />
        <figcaption className={styles.mediaCaption}>
          {project.poster.kind === "capture"
            ? project.poster.caption || "Live-site capture · October 2026"
            : "Project architecture · explanatory diagram"}
          <span>
            {project.poster.kind === "capture"
              ? "DESKTOP VIEW"
              : "READ-ONLY WORKFLOW"}
          </span>
        </figcaption>
      </figure>
    </div>
  );
}

export function Photo({
  photo,
  portrait = false,
}: {
  photo: EditorialPhoto;
  portrait?: boolean;
}) {
  return (
    <figure
      className={`${styles.editorialPhoto} ${portrait ? styles.portrait : ""}`}
      style={
        {
          "--crop-desktop": photo.crop.desktop,
          "--crop-mobile": photo.crop.mobile,
        } as CSSProperties
      }
    >
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt={photo.alt}
        sizes={
          portrait
            ? "(max-width: 700px) 90vw, 38vw"
            : "(max-width: 700px) 90vw, 45vw"
        }
      />
      {(photo.caption || photo.credit) && (
        <figcaption>
          {photo.caption}
          {photo.credit && <span>Photography: {photo.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
