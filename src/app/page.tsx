import { ExperienceStage } from "@/components/experience/ExperienceStage";
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
      <ExperienceStage />
      <section className={styles.work} id="work">
        <div className={styles.sectionHeading} data-reveal-group>
          <div data-reveal>
            <span className="eyebrow muted">Selected work / 01—03</span>
            <h2>
              Made with intent.
              <br />
              <span className="serif">Built to be felt.</span>
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
