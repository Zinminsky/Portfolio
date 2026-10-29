import { MotionConfig } from "motion/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { About, Contact, Experience, Marquee, Projects, Skills, Testimonials } from "./components/Sections";
import { profile } from "./data";

export default function App() {
  return (
    // reducedMotion="user" turns off movement for visitors who ask their OS for less motion
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <footer>
        <div className="container">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React, TypeScript & Motion</span>
        </div>
      </footer>
    </MotionConfig>
  );
}
