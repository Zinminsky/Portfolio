import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CaseStudy from "./components/CaseStudy";
import { About, Contact, Experience, Marquee, Projects, Skills, Testimonials } from "./components/Sections";
import { findCaseStudy } from "./caseStudies";
import { profile } from "./data";

function Home() {
  // Coming from a case study via a link like "/#work": scroll there once the page has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Testimonials />
      <Contact />
    </>
  );
}

export default function App() {
  // Simple routing: /casestudy-zupermart shows that case study, everything else shows the home page.
  // netlify.toml sends every URL to index.html, so these addresses work when opened directly.
  const study = findCaseStudy(window.location.pathname);

  return (
    // reducedMotion="user" turns off movement for visitors who ask their OS for less motion
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>{study ? <CaseStudy study={study} /> : <Home />}</main>
      <footer>
        <div className="container">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React, TypeScript & Motion</span>
        </div>
      </footer>
    </MotionConfig>
  );
}
