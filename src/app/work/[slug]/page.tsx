import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { ProjectMedia, Photo } from "@/components/work/ProjectMedia";
import { Arrow } from "@/components/layout/Icons";
import { ContactSection } from "@/components/sections/ContactSection";
import { AuditEvidence } from "@/components/work/AuditEvidence";
import styles from "@/components/work/Work.module.css";

export const dynamicParams = false;
export const generateStaticParams = () =>
  projects.map(({ slug }) => ({ slug }));
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${slug}/` },
    openGraph: {
      title: `${project.title} — Om Tiwari`,
      description: project.summary,
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next =
    projects[
      (projects.findIndex((item) => item.slug === slug) + 1) % projects.length
    ];
  return (
    <>
      <section className={styles.caseHero}>
        <Link href="/#work" className={styles.back}>
          ← Back to selected work
        </Link>
        <p className="eyebrow" style={{ color: project.accent }} data-arrival>
          {project.number} / {project.category}
        </p>
        <h1 data-arrival>
          {project.title}
          <span style={{ color: project.accent }}>.</span>
        </h1>
        <div className={styles.caseIntro} data-arrival>
          <p>{project.summary}</p>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Visit live website <Arrow diagonal />
            </a>
          )}
        </div>
      </section>
      <div className={styles.caseVisual} data-arrival>
        <ProjectMedia project={project} priority />
      </div>
      <section className={styles.caseDetails} data-reveal-group>
        <aside className={styles.caseAside} data-reveal>
          <div>
            <h2 className="eyebrow">My role</h2>
            <p>{project.role}</p>
          </div>
          <div>
            <h2 className="eyebrow">Built with</h2>
            <ul>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow">The contribution</h2>
            <ul>
              {project.contribution.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
          </div>
        </aside>
        <div className={styles.caseCopy}>
          <h2 data-reveal>
            The idea behind
            <br />
            <span className="serif">the experience.</span>
          </h2>
          <p data-reveal>{project.problem}</p>
          {project.decisions.map((decision, index) => (
            <div key={decision.title} className={styles.decision} data-reveal-group data-reveal data-rule-reveal>
              <span>0{index + 1} / THE DECISION</span>
              <h3>{decision.title}</h3>
              <p>{decision.body}</p>
            </div>
          ))}
        </div>
      </section>
      {project.screenshots && project.screenshots.length > 0 && (
        <section
          className={styles.detailScreenshots}
          aria-label="More project views"
        >
          <div className={styles.detailHeading} data-reveal-group>
            <span className="eyebrow muted" data-reveal>
              A closer look
            </span>
            <h2 data-reveal>
              Beyond the <span className="serif">first impression.</span>
            </h2>
          </div>
          {project.screenshots.map((screenshot) => (
            <div key={screenshot.src} data-media-drift>
              <figure className={styles.detailFigure} data-media-reveal>
                <a
                  href={screenshot.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open full-size screenshot: ${screenshot.alt}`}
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={screenshot.width}
                    height={screenshot.height}
                    sizes="92vw"
                  />
                </a>
                <figcaption>
                  {screenshot.caption}
                  <span aria-hidden="true">OPEN IMAGE ↗</span>
                </figcaption>
              </figure>
            </div>
          ))}
        </section>
      )}
      {project.slug === "adobe" && <AuditEvidence />}
      {project.mobilePoster && (
        <section className={styles.supporting} data-reveal-group>
          <div data-reveal>
            <span className="eyebrow muted">Same world. Smaller screen.</span>
            <h2>
              A considered
              <br />
              <span className="serif">mobile experience.</span>
            </h2>
            <p>
              The project on a narrow screen, captured from the actual public
              website. Explore the live site to try its interactions.
            </p>
            {project.liveUrl && (
              <a
                className="text-link"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                See it for yourself <Arrow diagonal />
              </a>
            )}
          </div>
          <figure className={styles.mobileCapture} data-reveal>
            <Image
              src={project.mobilePoster.src}
              alt={project.mobilePoster.alt}
              width={project.mobilePoster.width}
              height={project.mobilePoster.height}
              sizes="300px"
            />
          </figure>
        </section>
      )}
      {project.photographs.length > 0 && (
        <section className={styles.photos} aria-label="Project photography">
          {project.photographs.map((photo) => (
            <Photo key={photo.src} photo={photo} />
          ))}
        </section>
      )}
      <section className={styles.evidence} data-reveal-group>
        <h2 className="eyebrow" data-reveal>Context & evidence</h2>
        <ul data-reveal>
          {project.evidenceNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>
      <section className={styles.nextProject} data-reveal-group data-rule-reveal>
        <span className="eyebrow muted" data-reveal>Next project / {next.number}</span>
        <Link href={`/work/${next.slug}/`} data-reveal>
          {next.shortTitle}
          <Arrow diagonal />
        </Link>
      </section>
      <ContactSection />
    </>
  );
}
