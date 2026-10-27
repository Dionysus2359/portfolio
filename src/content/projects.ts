import type { PortfolioProject } from "@/types/project";

export const projects: PortfolioProject[] = [
  {
    slug: "acm",
    number: "01",
    title: "ACM SNU",
    shortTitle: "ACM SNU",
    category: "Community, reimagined",
    summary:
      "A home for the people who build things. An official chapter website with a playful world of its own.",
    role: "Independent design & development",
    contribution: [
      "Designed and built the official ACM SNU website independently.",
      "Brought chapter information, events and people into one cohesive experience.",
      "Built a distinctive interactive identity around a pixel-art world.",
    ],
    technologies: ["React", "Creative frontend", "Responsive design"],
    liveUrl: "https://snu.acm.org/",
    poster: {
      src: "/media/projects/acm/desktop.webp",
      alt: "The actual ACM SNIoE homepage, with a pixel-art character, purple clouds and an invitation to the computing community",
      width: 1600,
      height: 904,
      kind: "capture",
      caption: "Screenshot supplied by Om · October 2026",
    },
    screenshots: [
      {
        src: "/media/projects/acm/events.webp",
        alt: "ACM SNIoE featured-events section, showing the ICPC Preparation Series on a pixel-art parchment board",
        width: 1600,
        height: 900,
        caption:
          "Featured events, presented as quests inside the chapter’s pixel-art world. Screenshot supplied by Om.",
      },
    ],
    mobilePoster: {
      src: "/media/projects/acm/mobile.webp",
      alt: "ACM SNIoE homepage on a narrow screen",
      width: 390,
      height: 844,
    },
    accent: "#bda7f5",
    problem:
      "A computing community needs more than a list of links. The chapter needed a recognisable home where students could find events, meet the team and get a feel for the people behind it.",
    decisions: [
      {
        title: "Give the community a world.",
        body: "The pixel-art direction turns a conventional student chapter website into an invitation. Characters, clouds and playful type carry the same visual language through the page.",
      },
      {
        title: "Make the useful things easy to find.",
        body: "Events, chapter information, team profiles and the arcade have clear destinations. The character of the opening leads into practical content.",
      },
      {
        title: "Build beyond the opening screen.",
        body: "The site includes responsive layouts, event navigation and team interactions. The live site is linked so the complete experience can be inspected.",
      },
    ],
    evidenceNotes: [
      "Desktop and events screenshots supplied by Om on 20 October 2026; mobile view captured from the live site. The website may evolve.",
      "Independent authorship is supplied by Om and credited in the live site's footer.",
      "A separately deployed historical archive and recordings are not yet available.",
    ],
    photographs: [],
  },
  {
    slug: "surge",
    number: "02",
    title: "Surge",
    shortTitle: "Surge",
    category: "Built for the big game",
    summary:
      "A bold festival platform, redesigned and rearchitected to bring the energy of sport to the screen.",
    role: "Redesign, rearchitecture & maintenance",
    contribution: [
      "Redesigned and rearchitected an existing festival platform.",
      "Developed and maintained the Next.js website end to end.",
      "Worked within an existing platform rather than claiming its original creation.",
    ],
    technologies: ["Next.js", "TypeScript", "Full-stack development"],
    liveUrl: "https://surgesnu.com/",
    poster: {
      src: "/media/projects/surge/desktop.webp",
      alt: "The actual Surge sports festival website with its bold sports identity and event navigation",
      width: 1600,
      height: 900,
      kind: "capture",
      caption: "Screenshot supplied by Om · October 2026",
    },
    screenshots: [
      {
        src: "/media/projects/surge/campus-map.webp",
        alt: "Surge campus guide showing a three-dimensional campus map, place filters and details for the Indoor Sports Complex",
        width: 1600,
        height: 899,
        caption:
          "The campus guide, with place search, category filters and venue details visible in Om’s supplied capture.",
      },
    ],
    mobilePoster: {
      src: "/media/projects/surge/mobile.webp",
      alt: "Surge sports festival homepage on a narrow screen",
      width: 390,
      height: 844,
    },
    accent: "#d4f66a",
    problem:
      "A festival platform has to hold up as a working product. My work started with an existing website and focused on its design, architecture and continued development.",
    decisions: [
      {
        title: "Turn the energy up.",
        body: "A confident sports-led visual direction gives the festival an immediate identity while keeping event discovery central to the experience.",
      },
      {
        title: "Work through the platform.",
        body: "The redesign was paired with rearchitecture and end-to-end development in Next.js. This was work on an existing platform, including its ongoing maintenance.",
      },
      {
        title: "Show the shipped experience.",
        body: "The opening sets the festival’s tone; the supplied campus-guide view shows the more practical side of the platform, with place filters and venue details. The public site is linked for exploration.",
      },
    ],
    evidenceNotes: [
      "Desktop and campus-guide screenshots supplied by Om on 20 October 2026; mobile view captured from the live site. These are not a frozen archive.",
      "The original platform predates Om's redesign and rearchitecture.",
      "Operational integrations remain on the real site; none are replicated in this portfolio.",
    ],
    photographs: [],
  },
  {
    slug: "adobe",
    number: "03",
    title: "Brand AI-Readiness Audit",
    shortTitle: "Brand Audit",
    category: "From evidence to action",
    summary:
      "An evidence-led website audit that turns crawlability, content and engagement findings into useful next steps.",
    role: "Team project · audit tooling",
    contribution: [
      "Contributed to a team-built website audit tool for the Adobe hackathon.",
      "The project examines bounded website evidence and produces prioritised recommendations.",
      "The team won first prize, as reported by Om; exact event wording and individual responsibilities await final verification.",
    ],
    technologies: ["Python", "Structured reports", "Agent workflows"],
    poster: {
      src: "/media/projects/adobe/workflow.svg",
      alt: "Original process diagram explaining the real audit architecture: acquire once, analyse evidence, prioritise findings, recommend actions",
      width: 1440,
      height: 900,
      kind: "process-diagram",
    },
    accent: "#ff866b",
    problem:
      "A list of warnings is only useful when someone can understand the evidence behind it and decide what to fix. This team project connects a bounded website acquisition to structured findings and recommendations.",
    decisions: [
      {
        title: "Acquire once. Inspect together.",
        body: "The orchestrator acquires a bounded, read-only website snapshot. Specialist stages inspect crawlability, content freshness, entity signals and on-site engagement against that shared evidence.",
      },
      {
        title: "Keep findings traceable.",
        body: "The project composes and deduplicates findings, records supporting evidence, prioritises actions and emits structured reports. The portfolio experiment below uses explicitly illustrative local data.",
      },
      {
        title: "Be precise about what is known.",
        body: "A website audit can identify inspectable issues. It cannot, on its own, prove live AI-answer visibility, ranking gains or sales impact. Team and award photography will be added when supplied.",
      },
    ],
    evidenceNotes: [
      "Architecture checked against the project's local README on 20 October 2026.",
      "Team first-prize result is user-reported. Exact event title, award evidence and Om's individual contribution need confirmation before final public release.",
      "The visual is an explanatory process diagram, not a screenshot of an audit dashboard.",
      "Adobe is the hackathon context; no employment or endorsement is implied.",
    ],
    photographs: [],
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
