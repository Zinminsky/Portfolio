import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { profile } from "../data";

const ease = [0.22, 1, 0.36, 1] as const;

function RoleTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="role-ticker" aria-label={`I'm a ${profile.roles.join(", ")}`}>
      <span aria-hidden>I'm a</span>
      <span className="role-slot" aria-hidden>
        <AnimatePresence mode="wait">
          <motion.strong
            key={profile.roles[i]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            {profile.roles[i]}
          </motion.strong>
        </AnimatePresence>
      </span>
    </div>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="portrait">
      {failed ? (
        <div className="initials">ZA</div>
      ) : (
        <img src={profile.photo} alt="Portrait of Zin Min Aung" onError={() => setFailed(true)} />
      )}
    </div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 600], [0, 120]);
  const imgY = useTransform(scrollY, [0, 600], [0, -60]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.2]);

  const line = (text: React.ReactNode, delay: number) => (
    <span className="line">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section className="hero" id="top">
      <motion.div
        className="blob"
        style={{ width: 520, height: 520, background: "#3fb6a8", top: "-10%", right: "-10%" }}
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob"
        style={{ width: 420, height: 420, background: "#f2cc8f", bottom: "-15%", left: "-8%" }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container hero-grid">
        <motion.div style={{ y: textY, opacity: fade }}>
          <h1>
            {line("Zin Min", 0.3)}
            {line(<em>Aung.</em>, 0.45)}
          </h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
            <RoleTicker />
            <p className="lead">{profile.intro}</p>
            <div className="hero-actions">
              <motion.a href="#work" className="btn primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                See my work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
              </motion.a>
              <motion.a href={profile.cv} className="btn ghost" download whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="portrait-wrap"
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease }}
        >
          <motion.div
            className="orbit"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          <Portrait />
          <motion.div
            className="badge b1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 1.4 }, x: { delay: 1.4 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          >
            <span className="dot" /> Open to work · Germany
          </motion.div>
          <motion.div
            className="badge b2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
            transition={{ opacity: { delay: 1.6 }, x: { delay: 1.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
          >
            13+ years · PHP & CMS
          </motion.div>
        </motion.div>
      </div>

      <div className="scroll-hint" aria-hidden>
        Scroll
        <div className="bar">
          <motion.span animate={{ y: [-14, 44] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </div>
      </div>
    </section>
  );
}
