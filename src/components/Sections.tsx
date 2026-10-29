import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Reveal from "./Reveal";
import { experience, profile, projects, skills, stats, testimonials, type Project } from "../data";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------- Marquee ---------- */
export function Marquee() {
  const words = ["PHP", "React", "TypeScript", "WordPress", "UI/UX", "Shopware", "MySQL", "Responsive Design"];
  const row = [...words, ...words];
  return (
    <div className="marquee" aria-hidden>
      <motion.div
        className="marquee-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {row.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- About ---------- */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.6, ease, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <div className="eyebrow">About</div>
          <h2 className="title">
            Design sense, <em>engineering</em> discipline.
          </h2>
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-text" delay={0.1}>
            <p>{profile.summary}</p>
            <p>
              I care about interfaces that are clear, fast and accessible — and about code the next developer
              can pick up without a manual. Outside work I'm improving my German (B1) and volunteering in Berlin.
            </p>
          </Reveal>
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.15 + i * 0.1}>
                <div className="stat">
                  <div className="num">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="label">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
function ProjectCard({ p, index }: { p: Project; index: number }) {
  // 3D tilt that follows the pointer
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const [hover, setHover] = useState(false);
  // Links starting with "/" are pages of this site (case studies) and open in the same tab.
  const internal = p.link?.startsWith("/") ?? false;
  const cta = !p.link ? null : internal ? "Read case study" : "Visit website";

  return (
    <Reveal delay={(index % 2) * 0.12}>
      <motion.a
        href={p.link}
        target={p.link && !internal ? "_blank" : undefined}
        rel={p.link && !internal ? "noopener noreferrer" : undefined}
        className="project"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => {
          setHover(false);
          mx.set(0.5);
          my.set(0.5);
        }}
      >
        <div
          className="project-visual"
          style={{ background: `radial-gradient(circle at 30% 30%, ${p.accent}, ${p.accent}33 70%)` }}
        >
          {p.image ? (
            <motion.img
              src={p.image}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              animate={{ scale: hover ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease }}
            />
          ) : (
            <>
              <motion.div className="ring" animate={{ scale: hover ? 1.25 : 1, opacity: hover ? 0.2 : 0.6 }} transition={{ duration: 0.6, ease }} />
              <motion.span className="glyph" animate={{ scale: hover ? 1.12 : 1, rotate: hover ? -6 : 0 }} transition={{ duration: 0.6, ease }}>
                {p.title.charAt(0)}
              </motion.span>
            </>
          )}
        </div>
        {p.link && (
          <motion.span
            className="arrow"
            aria-hidden
            animate={{ scale: hover ? 1 : 0, rotate: hover ? 0 : -45 }}
            transition={{ duration: 0.35, ease }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M7 17L17 7M8 7h9v9" /></svg>
          </motion.span>
        )}
        <div className="project-body">
          <div className="project-meta">
            <span>{p.client}</span>
            <span>{p.year}</span>
          </div>
          <h3>{p.title}</h3>
          <p>{p.blurb}</p>
          <div className="tags">
            {p.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
          {cta && (
            <span className="project-cta">
              {cta} <motion.span aria-hidden animate={{ x: hover ? 6 : 0 }} transition={{ duration: 0.3 }}>→</motion.span>
            </span>
          )}
        </div>
      </motion.a>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="work" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">Selected work</div>
          <h2 className="title">
            Projects I've <em>shipped</em>.
          </h2>
        </Reveal>
        <div className="projects">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="experience">
      <div className="container">
        <Reveal>
          <div className="eyebrow">Experience</div>
          <h2 className="title">
            Thirteen years, <em>three</em> countries.
          </h2>
        </Reveal>
        <div className="timeline" ref={ref}>
          <div className="timeline-line" />
          <motion.div className="timeline-fill" style={{ scaleY, bottom: 8 }} />
          {experience.map((job, i) => (
            <Reveal key={job.company + job.period} delay={i * 0.05} y={30}>
              <div className="job">
                <div className="job-head">
                  <h3>{job.role}</h3>
                  <span className="period">{job.period}</span>
                </div>
                <div className="company">
                  {job.company} · {job.place}
                </div>
                <ul>
                  {job.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
export function Skills() {
  return (
    <section id="skills" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow">Toolkit</div>
          <h2 className="title">
            What I <em>work</em> with.
          </h2>
        </Reveal>
        <div className="skills">
          {skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 0.08}>
              <motion.div
                className="skill-card"
                whileHover={{ y: -6, borderColor: "rgba(63,182,168,0.6)" }}
                transition={{ duration: 0.25 }}
              >
                <h3>{s.group}</h3>
                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 + i * 0.08 } } }}
                >
                  {s.items.map((it) => (
                    <motion.li
                      key={it}
                      variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                    >
                      {it}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, [paused]);
  const q = testimonials[i];

  return (
    <section id="testimonials">
      <div className="container">
        <Reveal>
          <div className="eyebrow">Kind words</div>
        </Reveal>
        <div
          className="quote-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
              transition={{ duration: 0.6, ease }}
            >
              <blockquote>{q.quote}</blockquote>
              <div className="quote-by">
                <strong>{q.name}</strong> · {q.title}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="quote-dots">
            {testimonials.map((t, n) => (
              <button
                key={t.name}
                className={n === i ? "on" : ""}
                aria-label={`Show testimonial from ${t.name}`}
                onClick={() => setI(n)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function Contact() {
  return (
    <section id="contact" className="contact" style={{ background: "var(--bg-2)" }}>
      <div className="container">
        <Reveal>
          <div className="eyebrow" style={{ justifyContent: "center" }}>Contact</div>
          <h2>
            Let's build <br />
            <em>something good.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p>
            I'm looking for web developer roles in Germany — full-time, working student or freelance. The fastest way to
            reach me is email.
          </p>
          <motion.a href={`mailto:${profile.email}`} className="email" whileHover={{ letterSpacing: "0.02em" }}>
            {profile.email}
          </motion.a>
          <div className="socials">
            <a className="btn ghost" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn ghost" href={profile.cv} download>Download CV</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
