import { StudioHero } from "@/components/studio/StudioHero";
import { ProjectChapter } from "@/components/work/ProjectChapter";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperimentsSection } from "@/components/sections/ExperimentsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import styles from "@/components/work/Work.module.css";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${profile.origin}/#person`,
        name: profile.name,
        url: profile.origin,
        jobTitle: profile.descriptor,
        sameAs: [profile.github, profile.linkedin],
      },
      {
        "@type": "WebSite",
        name: "Om Tiwari",
        url: profile.origin,
        author: { "@id": `${profile.origin}/#person` },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <StudioHero />
      <section className={styles.work} id="work">
        <div className={styles.sectionHeading} data-reveal-group>
          <div>
            <span className="eyebrow muted" data-reveal>Selected work / 01—03</span>
            <h2>
              <span className={styles.headingLine}><span data-reveal data-reveal-line>A little character.</span></span>
              <span className={styles.headingLine}><span className="serif" data-reveal data-reveal-line>A lot of intent.</span></span>
            </h2>
          </div>
          <p data-reveal>
            Different challenges, a shared belief:
            <br />
            the details make the difference.
          </p>
        </div>
        {projects.map((project) => (
          <ProjectChapter key={project.slug} project={project} />
        ))}
      </section>
      <AboutSection />
      <ExperimentsSection />
      <ContactSection />
    </>
  );
}
