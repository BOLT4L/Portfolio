import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

/* ── Global reveal observer — fires once for any .reveal element ── */
function useGlobalReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all current reveal elements
    const observe = () => {
      document
        .querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-scale:not(.visible)')
        .forEach((el) => io.observe(el));
    };

    observe();

    // Also re-observe after a tick to catch dynamically rendered content
    const timer = setTimeout(observe, 200);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);
}

const Index = () => {
  useGlobalReveal();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        {/* The AboutSection internally renders #about, #skills (tab), #projects (tab) */}
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
