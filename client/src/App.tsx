import { Analytics } from "@vercel/analytics/react";
import { useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";

type ProjectSlide =
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "detail"; eyebrow: string; title: string; body: string; points: string[] };

type Project = {
  number: string;
  year: string;
  type: string;
  title: string;
  image: string;
  description: string;
  stack: string[];
  slides: ProjectSlide[];
};

const projects: Project[] = [
  {
    number: "01",
    year: "2024",
    type: "Mobile app / Capstone",
    title: "NotiFire",
    image: "/assets/notifire.jpg",
    description:
      "An IoT-based fire detection system that connects ESP32 hardware to Firebase Realtime Database and delivers real-time push notifications through Firebase Cloud Messaging.",
    stack: ["ESP32", "Firebase", "FCM"],
    slides: [
      { type: "image", src: "/assets/notifire-phone/1.png", alt: "NotiFire home dashboard", caption: "01 / home dashboard" },
      { type: "image", src: "/assets/notifire-phone/2.png", alt: "NotiFire reports dashboard", caption: "02 / reports" },
      { type: "image", src: "/assets/notifire-phone/3.png", alt: "NotiFire floor tabs", caption: "03 / floor tabs" },
      { type: "image", src: "/assets/notifire-phone/4.png", alt: "NotiFire room history summary", caption: "04 / room history" },
      { type: "image", src: "/assets/notifire-phone/5.png", alt: "NotiFire floor tabs alternate view", caption: "05 / room overview" },
      { type: "image", src: "/assets/notifire-phone/6.png", alt: "NotiFire room details and alarm history", caption: "06 / room details" },
    ],
  },
  {
    number: "02",
    year: "2026",
    type: "Point of sale system",
    title: "Armi Vida’s Mart",
    image: "/assets/armi.png",
    description:
      "A full-stack POS application for faster checkout, organized inventory tracking, product management, sales processing, and transaction records.",
    stack: ["React", "Supabase", "TypeScript"],
    slides: [
      { type: "image", src: "/assets/armi-mart/1.png", alt: "Armi Vida's Mart sign-in screen", caption: "01 / sign in" },
      { type: "image", src: "/assets/armi-mart/2.png", alt: "Armi Vida's Mart cashier screen", caption: "02 / cashier" },
      { type: "image", src: "/assets/armi-mart/3.png", alt: "Armi Vida's Mart inventory screen", caption: "03 / inventory" },
      { type: "image", src: "/assets/armi-mart/4.png", alt: "Armi Vida's Mart statistics screen", caption: "04 / statistics" },
    ],
  },
  {
    number: "03",
    year: "2026",
    type: "Web app / Operations",
    title: "TDIP",
    image: "/assets/tdip.png",
    description:
      "A centralized portal that streamlines TESDA regional office operations across CACS, Finance, Scholarship, UTPRAS, and Administration through role-based workflows.",
    stack: ["React", "Supabase", "Workflows"],
    slides: [
      { type: "image", src: "/assets/tdip-preview/1.png", alt: "TDIP sign-in screen", caption: "01 / sign in" },
      { type: "image", src: "/assets/tdip-preview/2.png", alt: "TDIP dashboard", caption: "02 / dashboard" },
      { type: "image", src: "/assets/tdip-preview/3.png", alt: "TDIP CACS sections", caption: "03 / CACS sections" },
      { type: "image", src: "/assets/tdip-preview/4.png", alt: "TDIP assessment schedule", caption: "04 / assessment schedule" },
      { type: "image", src: "/assets/tdip-preview/5.png", alt: "TDIP UTPRAS monitoring", caption: "05 / UTPRAS monitoring" },
      { type: "image", src: "/assets/tdip-preview/6.png", alt: "TDIP scholarship training monitoring", caption: "06 / training monitoring" },
    ],
  },
];

const certificates = [
  ["Introduction to Front-End Development", "Coursera · 01", "/assets/intro-front-end.pdf"],
  ["HTML and CSS In Depth", "Coursera · 02", "/assets/html-css.pdf"],
  ["Programming with JavaScript", "Coursera · 03", "/assets/javascript.pdf"],
  ["Version Control", "Coursera · 04", "/assets/version-control.pdf"],
  ["React Basics", "Coursera · 05", "/assets/react-basics.pdf"],
  ["Advanced React", "Coursera · 06", "/assets/advanced-react.pdf"],
  ["Web Content Management Using WordPress", "Certificate · 07", "/assets/certificate-wordpress.jpg"],
];

const navItems = [
  ["about", "01"],
  ["projects", "02"],
  ["certificates", "03"],
  ["contact", "04"],
];

const contactEmail = "lopezjoshuaceazar@gmail.com";

function sectionPath(section: string) {
  return section ? `/${section}` : "/";
}

function sectionFromPath(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") return "";
  const section = path.slice(1);
  return navItems.some(([id]) => id === section) ? section : "";
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return <div className="section-label reveal-on-scroll"><span>{number}</span><span>{children}</span></div>;
}

function SplashScreen({ finished }: { finished: boolean }) {
  return (
    <div className={finished ? "splash-screen is-done" : "splash-screen"} aria-hidden={finished}>
      <div className="splash-inner">
        <div className="splash-top"><span>joshua.</span><span>portfolio / 2026</span></div>
        <div className="splash-center"><span className="splash-kicker">hello, world!</span><strong>J</strong></div>
        <div className="splash-progress"><span /></div>
      </div>
    </div>
  );
}

function ProjectCarousel({ project, onClose }: { project: Project; onClose: () => void }) {
  const [slide, setSlide] = useState(0);
  const current = project.slides[slide];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setSlide((currentSlide) => (currentSlide + 1) % project.slides.length);
      if (event.key === "ArrowLeft") setSlide((currentSlide) => (currentSlide - 1 + project.slides.length) % project.slides.length);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; };
  }, [onClose, project.slides.length]);

  return (
    <div className="lightbox" role="presentation" onClick={onClose}>
      <div className="lightbox-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onClick={(event) => event.stopPropagation()}>
        <div className="lightbox-head"><div><span className="lightbox-eyebrow">{project.number} / selected work</span><h2 id="project-dialog-title">{project.title}</h2></div><button className="lightbox-close" onClick={onClose} aria-label="Close project preview"><X size={20} /></button></div>
        <div className="lightbox-stage">
          {current.type === "image" ? <div key={`${project.title}-${slide}`} className="lightbox-image-wrap project-preview"><img src={current.src} alt={current.alt} /><span className="lightbox-image-caption">{current.caption}</span></div> : <div key={`${project.title}-${slide}`} className="detail-slide"><span className="lightbox-eyebrow">{current.eyebrow}</span><h3>{current.title}</h3><p>{current.body}</p><ul>{current.points.map((point) => <li key={point}>{point}</li>)}</ul><span className="detail-period">{project.year} / {project.type}</span></div>}
          <button className="carousel-button carousel-prev" onClick={() => setSlide((currentSlide) => (currentSlide - 1 + project.slides.length) % project.slides.length)} aria-label="Previous project slide"><ArrowLeft size={18} /></button>
          <button className="carousel-button carousel-next" onClick={() => setSlide((currentSlide) => (currentSlide + 1) % project.slides.length)} aria-label="Next project slide"><ArrowRight size={18} /></button>
        </div>
        <div className="lightbox-foot"><span>use ← → to explore / esc to close</span><div className="carousel-dots" aria-label="Project slides">{project.slides.map((_, index) => <button key={index} className={index === slide ? "carousel-dot is-active" : "carousel-dot"} onClick={() => setSlide(index)} aria-label={`Show slide ${index + 1}`} aria-current={index === slide ? "true" : undefined} />)}</div><span>{String(slide + 1).padStart(2, "0")} / {String(project.slides.length).padStart(2, "0")}</span></div>
      </div>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState(() => sectionFromPath(window.location.pathname));
  const [menuOpen, setMenuOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const pendingSection = useRef<string | null>(null);

  const updateSectionUrl = (section: string, replace: boolean) => {
    const nextPath = sectionPath(section);
    if (window.location.pathname === nextPath) return;
    window.history[replace ? "replaceState" : "pushState"]({}, "", nextPath);
  };

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setSplashDone(true), 1850);
    const updateScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    const sections = ["landing", ...navItems.map(([id]) => id)].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const revealItems = Array.from(document.querySelectorAll(".reveal-on-scroll"));
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible && sections.includes(visible.target as HTMLElement)) {
        const visibleSection = visible.target.id === "landing" ? "" : visible.target.id;
        const targetSection = pendingSection.current;
        if (targetSection !== null) {
          setActiveSection(targetSection);
          if (visibleSection === targetSection) pendingSection.current = null;
        } else {
          setActiveSection(visibleSection);
          updateSectionUrl(visibleSection, true);
        }
      }
    }, { rootMargin: "-18% 0px -58% 0px", threshold: [0, 0.12, 0.5] });
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.01 });
    sections.forEach((section) => sectionObserver.observe(section));
    revealItems.forEach((item) => revealObserver.observe(item));
    const initialSection = sectionFromPath(window.location.pathname);
    if (initialSection) {
      pendingSection.current = initialSection;
      window.requestAnimationFrame(() => document.getElementById(initialSection)?.scrollIntoView({ behavior: "auto", block: "start" }));
    }
    const handlePopState = () => {
      const nextSection = sectionFromPath(window.location.pathname);
      pendingSection.current = nextSection;
      setActiveSection(nextSection);
      document.getElementById(nextSection || "landing")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => { window.clearTimeout(splashTimer); window.removeEventListener("scroll", updateScrollProgress); window.removeEventListener("popstate", handlePopState); sectionObserver.disconnect(); revealObserver.disconnect(); };
  }, []);

  const goTo = (id: string) => {
    const nextSection = id === "landing" ? "" : id;
    pendingSection.current = nextSection;
    setActiveSection(nextSection);
    updateSectionUrl(nextSection, false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };
  const openProject = (project: Project) => setSelectedProject(project);
  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1800);
    } catch {
      // Mailto still opens when clipboard access is unavailable.
    }
  };

  const analyticsPath = sectionPath(activeSection);

  return (
    <div className="site-shell">
      <Analytics route={analyticsPath} path={analyticsPath} />
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
      <SplashScreen finished={splashDone} />
      <header className="site-header"><button className="wordmark" onClick={() => goTo("landing")} aria-label="Back to the top">joshua<span>.</span></button><button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="site-nav"><span>{menuOpen ? "close" : "index"}</span>{menuOpen ? <X size={18} /> : <Menu size={18} />}</button><nav id="site-nav" className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">{navItems.map(([id, number]) => <button key={id} className={activeSection === id ? "nav-link is-active" : "nav-link"} onClick={() => goTo(id)}><span>{number}</span>{id}</button>)}</nav></header>

      <main>
        <section className="hero" id="landing" aria-labelledby="hero-title"><div className="hero-grid-glow" /><div className="hero-copy reveal reveal-on-scroll"><p className="eyebrow">hello world!</p><h1 id="hero-title">i am <em>joshua</em><span className="period">.</span></h1><p className="hero-role"><span className="scribble">↳</span> junior web developer</p></div><div className="hero-portrait reveal reveal-delay reveal-on-scroll"><div className="portrait-frame"><img src="/assets/headshot.png" alt="Joshua wearing a traditional barong shirt" /><span className="portrait-scan" /></div><p className="portrait-caption">based in Tagum City, Davao del Norte, Philippines</p></div><div className="hero-foot"><span>scroll to explore</span><ArrowDownRight size={19} /></div><div className="hero-index">001 — 004</div></section>

        <section className="intro-section section-grid reveal-on-scroll" id="about" aria-labelledby="about-title"><SectionLabel number="01" children="about" /><div className="intro-content"><h2 id="about-title">Useful things,<br /><em>carefully made.</em></h2><div className="intro-columns"><p className="lead-copy">I'm Joshua — a junior web developer who loves to develop responsive websites that have <strong>purpose</strong>.</p><div className="quick-facts" aria-label="Quick facts"><div className="reveal-on-scroll"><span>location</span><strong>Tagum City, Davao del Norte, Philippines</strong></div><div className="reveal-on-scroll"><span>focus</span><strong>React · TypeScript · Supabase · PostgreSQL · Vercel · NodeJS · JavaScript</strong></div><div className="reveal-on-scroll"><span>status</span><strong className="status"><i /> open to work</strong></div></div></div><div className="timeline-block"><div className="timeline-heading"><span>education</span><span>01</span></div><div className="timeline-row reveal-on-scroll"><h3>Bachelor of Science<br />in Information Technology</h3><p>University of Mindanao<br />Tagum College</p><time>2021 — 2025</time></div><div className="timeline-heading"><span>professional experience</span><span>02</span></div><div className="timeline-row reveal-on-scroll"><h3>Frontend Developer Intern</h3><p>AIMHI<br />(Artificial Intelligence Meets Human Intelligence)</p><time>Apr — Jul 2025</time></div><div className="timeline-row reveal-on-scroll"><h3>Full Stack Web Developer (Contract of Service)</h3><p>TESDA · Davao del Norte<br />Provincial Office</p><time>March 2026 - September 2026</time></div></div></div></section>

        <section className="projects-section section-grid" id="projects" aria-labelledby="projects-title"><SectionLabel number="02" children="work" /><div className="section-content"><div className="section-intro reveal-on-scroll"><h2 id="projects-title">projects<span className="period">.</span></h2><p>Selected work, with the problem left in view.</p></div><div className="projects-list">{projects.map((project) => <article className="project-card reveal-on-scroll" key={project.title} onClick={(event) => { if (!(event.target as HTMLElement).closest("a")) openProject(project); }} onKeyDown={(event) => { if ((event.key === "Enter" || event.key === " ") && !(event.target as HTMLElement).closest("a")) { event.preventDefault(); openProject(project); } }} role="button" tabIndex={0} aria-label={`Open ${project.title} project preview`}><button className="project-image" onClick={() => openProject(project)} aria-label={`Open ${project.title} carousel`}><img src={project.image} alt={`${project.title} project thumbnail`} /><span className="project-number">{project.number}</span><span className="project-view">view case study <ArrowUpRight size={15} /></span></button><div className="project-detail"><div className="project-meta"><span>{project.type}</span><time>{project.year}</time></div><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><button className="text-link" onClick={() => openProject(project)}>open preview <ArrowUpRight size={16} /></button></div></div></article>)}</div></div></section>

        <section className="certificates-section section-grid reveal-on-scroll" id="certificates" aria-labelledby="certificates-title"><SectionLabel number="03" children="credentials" /><div className="section-content"><div className="section-intro"><h2 id="certificates-title">certificates<span className="period">.</span></h2><p>A growing record of the tools behind the work.</p></div><div className="certificate-list">{certificates.map(([name, issuer, href], index) => <a className="certificate-row reveal-on-scroll" href={href} target="_blank" rel="noreferrer" key={name}><span className="certificate-index">0{index + 1}</span><span className="certificate-name">{name}</span><span className="certificate-issuer">{issuer}</span><ArrowUpRight size={18} /></a>)}</div></div></section>

        <section className="contact-section reveal-on-scroll" id="contact" aria-labelledby="contact-title"><div className="contact-top"><SectionLabel number="04" children="hire me" /><span className="contact-stamp">available for good work <i /></span></div><div className="contact-body"><h2 id="contact-title">let's make<br /><em>something useful.</em></h2><a className="email-link" href={`mailto:${contactEmail}?subject=Portfolio%20inquiry`} onClick={() => void handleEmailClick()} title="Open your email app" aria-label={`Email ${contactEmail}`}>{emailCopied ? "email copied" : contactEmail} <ArrowUpRight size={26} /></a></div><div className="contact-footer"><div className="social-links"><a href="https://github.com/foundnemooo" target="_blank" rel="noreferrer">github <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/joshua-ceazar-lopez-071723359/" target="_blank" rel="noreferrer">linkedin <ArrowUpRight size={14} /></a><a href="/assets/Joshua_Ceazar_Lopez_Resume.pdf" target="_blank" rel="noreferrer">resume <ArrowUpRight size={14} /></a></div><p>© 2026 joshua ceazar lopez.</p></div></section>
      </main>
      {selectedProject && <ProjectCarousel project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}

export default App;
