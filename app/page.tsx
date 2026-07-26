import ParticleBg from '@/components/canvas/ParticleBg';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import TechStack from '@/components/sections/TechStack';
import Experience from '@/components/sections/Experience';
import BlogSection from '@/components/sections/BlogSection';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-charcoal-950 bg-dot-pattern noise-overlay">
      {/* Particle background */}
      <ParticleBg />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <Hero />

      <section id="about" className="sr-only" aria-label="About">
        <span>About Purvik Prajapati — Robotics and Embedded Systems Engineer from Surat, Gujarat, India.</span>
      </section>

      <Projects />
      <TechStack />
      <Experience />
      <BlogSection />
      <Contact />
      <Footer />
    </main>
  );
}
