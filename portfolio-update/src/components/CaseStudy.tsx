import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Reveal from "./Reveal";
import type { Block, CaseStudy as CaseStudyType } from "../caseStudies";

const ease = [0.22, 1, 0.36, 1] as const;

type LightboxImage = { src: string; alt: string };

/* ---------- Lightbox: click an image to see it full size ---------- */
function Lightbox({ image, onClose }: { image: LightboxImage | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!image) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={image.src}
            alt={image.alt}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          />
          <button ref={closeRef} className="lightbox-close" onClick={onClose} aria-label="Close image">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Content blocks ---------- */
function ZoomImage({ src, alt, caption, narrow, onOpen }: LightboxImage & { caption?: string; narrow?: boolean; onOpen: (img: LightboxImage) => void }) {
  return (
    <Reveal>
      <figure className={`cs-figure ${narrow ? "narrow" : ""}`}>
        <button className="cs-zoom" onClick={() => onOpen({ src, alt })} aria-label={`Enlarge: ${alt}`}>
          <motion.img src={src} alt={alt} loading="lazy" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4, ease }} />
          <span className="cs-zoom-hint" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
          </span>
        </button>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}

function BlockView({ block, onOpen }: { block: Block; onOpen: (img: LightboxImage) => void }) {
  switch (block.type) {
    case "text":
      return (
        <Reveal className="cs-text">
          {block.heading && <h3>{block.heading}</h3>}
          {block.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </Reveal>
      );

    case "list":
      return (
        <Reveal className="cs-text">
          {block.heading && <h3>{block.heading}</h3>}
          <ul className="cs-list">
            {block.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </Reveal>
      );

    case "image":
      return <ZoomImage {...block} onOpen={onOpen} />;

    case "personas":
      return (
        <div>
          {block.heading && (
            <Reveal className="cs-text">
              <h3>{block.heading}</h3>
            </Reveal>
          )}
          <div className="cs-cards">
            {block.items.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <motion.article className="cs-card" whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
                  <span className="cs-card-num">0{i + 1}</span>
                  <h4>{p.name}</h4>
                  <p>{p.description}</p>
                  <p className="cs-needs">
                    <strong>Needs</strong> {p.needs}
                  </p>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      );

    case "painSolution":
      return (
        <div className="cs-pains">
          {block.items.map((row, i) => (
            <Reveal key={row.persona} delay={i * 0.08}>
              <article className="cs-pain-row">
                <h3>{row.persona}</h3>
                <div className="cs-pain-cols">
                  <div className="cs-col pain">
                    <span className="cs-col-label">Pain points</span>
                    <ul>
                      {row.pains.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <div className="cs-arrow" aria-hidden>→</div>
                  <div className="cs-col solution">
                    <span className="cs-col-label">Design solutions</span>
                    <ul>
                      {row.solutions.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      );
  }
}

/* ---------- Gallery of final screens ---------- */
function Gallery({ heading, images, onOpen }: { heading: string; images: LightboxImage[]; onOpen: (img: LightboxImage) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="cs-gallery" aria-label={heading}>
      <div className="container cs-gallery-head">
        <Reveal>
          <div className="eyebrow">Result</div>
          <h2 className="title" style={{ marginBottom: 0 }}>{heading}</h2>
        </Reveal>
        <div className="cs-gallery-btns">
          <button className="btn ghost" onClick={() => scroll(-1)} aria-label="Previous screens">←</button>
          <button className="btn ghost" onClick={() => scroll(1)} aria-label="Next screens">→</button>
        </div>
      </div>
      <div className="cs-track" ref={track} tabIndex={0} aria-label="Scrollable list of app screens">
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            className="cs-screen"
            onClick={() => onOpen(img)}
            aria-label={`Enlarge: ${img.alt}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: Math.min(i, 4) * 0.08, ease }}
            whileHover={{ y: -10 }}
          >
            <img src={img.src} alt={img.alt} loading="lazy" />
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default function CaseStudy({ study }: { study: CaseStudyType }) {
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const [active, setActive] = useState(study.stages[0]?.id);

  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ["start end", "end start"] });
  const coverScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const coverY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    document.title = `${study.title} · Case study · Zin Min Aung`;
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    study.stages.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [study]);

  return (
    <>
      {/* Intro */}
      <section className="cs-hero">
        <div className="container">
          <motion.a
            href="/#work"
            className="cs-back"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            ← All projects
          </motion.a>

          <div className="cs-hero-grid">
            <div>
              <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                Case study · {study.location}
              </motion.div>
              <h1 className="cs-title">
                <span className="line">
                  <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.4, ease }}>
                    {study.title}
                  </motion.span>
                </span>
              </h1>
              <motion.p className="cs-subtitle" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}>
                {study.subtitle}
              </motion.p>
              <motion.p className="cs-summary" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.7 }}>
                {study.summary}
              </motion.p>
            </div>
            {study.logo && (
              <motion.img
                className="cs-logo"
                src={study.logo}
                alt={`${study.title} logo`}
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, duration: 0.9, ease }}
              />
            )}
          </div>

          <motion.dl
            className="cs-overview"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1 } } }}
          >
            {study.overview.map((o) => (
              <motion.div key={o.label} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <dt>{o.label}</dt>
                <dd>{o.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* Cover */}
      <div className="container" ref={coverRef}>
        <motion.div className="cs-cover" style={{ scale: coverScale }}>
          <motion.img src={study.cover} alt={study.coverAlt} style={{ y: coverY }} />
        </motion.div>
      </div>

      {/* Stages with sticky side navigation */}
      <div className="container cs-body">
        <nav className="cs-steps" aria-label="Case study stages">
          <ol>
            {study.stages.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? "on" : ""} aria-current={active === s.id ? "step" : undefined}>
                  <span className="cs-step-num">0{i + 1}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="cs-stages">
          {study.stages.map((s, i) => (
            <section key={s.id} id={s.id} className="cs-stage">
              <Reveal>
                <div className="cs-stage-head">
                  <span className="cs-stage-num" style={{ color: study.accent }}>0{i + 1}</span>
                  <div>
                    <div className="eyebrow">Stage {i + 1} · {s.label}</div>
                    <h2>{s.title}</h2>
                  </div>
                </div>
              </Reveal>
              <div className="cs-blocks">
                {s.blocks.map((b, n) => (
                  <BlockView key={n} block={b} onOpen={setLightbox} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {study.gallery && <Gallery {...study.gallery} onOpen={setLightbox} />}

      {/* Next step */}
      <section className="contact" style={{ background: "var(--bg-2)", padding: "120px 0" }}>
        <div className="container">
          <Reveal>
            <h2>
              Like what <em>you see?</em>
            </h2>
            <div className="socials">
              <a className="btn primary" href="/#contact">Get in touch</a>
              <a className="btn ghost" href="/#work">More projects</a>
            </div>
          </Reveal>
        </div>
      </section>

      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
