import { useEffect, useRef } from 'react';
import heroImage from '@/assets/port.jpg';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Subtle parallax on scroll ── */
  useEffect(() => {
    const img = sectionRef.current?.querySelector<HTMLImageElement>('.hero-parallax-img');
    if (!img) return;

    const onScroll = () => {
      const y = window.scrollY;
      img.style.transform = `translateY(${y * 0.22}px) scale(1.08)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero — Introduction"
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={heroImage}
          alt=""
          className="hero-parallax-img hero-bg-image w-full h-full object-cover scale-105"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'var(--gradient-hero)' }}
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, hsl(222 20% 5% / 0.55) 100%)',
          }}
        />
      </div>

      {/* ── Decorative orbs ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'hsl(var(--primary))' }}
      />
      

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="max-w-3xl">

          {/* Label */}
          <div className="hero-text-line mb-6">
            <span className="section-label">Backend &amp; Full-Stack Developer</span>
          </div>

          {/* Name */}
          <div className="hero-text-line mb-2">
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-[hsl(var(--foreground))] leading-none"
              style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}
            >
              Eyob
            </h1>
          </div>
          <div className="hero-text-line mb-8">
            <h1
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-none"
              style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.04em' }}
            >
              <span className="gradient-text">Wasihun</span>
            </h1>
          </div>

          {/* Tagline */}
          <div className="hero-text-line mb-10">
            <p
              className="text-lg lg:text-xl text-[hsl(var(--muted-foreground))] max-w-lg leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Specializing in <span className="text-[hsl(var(--foreground))]">Django</span>, scalable REST APIs,
              and distributed systems. ERP platforms, transportation systems, ML-powered apps — based in&nbsp;
              <span className="text-[hsl(var(--foreground))]">Addis Ababa, Ethiopia</span>.
            </p>
          </div>

          {/* CTAs */}
          <div className="hero-text-line flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
              aria-label="View my work"
            >
              View My Work
              <ArrowDown size={16} />
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline"
              aria-label="Get in touch"
            >
              Get In Touch
            </button>
          </div>
        </div>

        {/* ── Social icons — bottom left ── */}
        <div
          className="flex items-center gap-5 mt-16"
          aria-label="Social links"
        >
          {[
            {
              href: 'https://github.com/BOLT4L',
              label: 'GitHub',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              ),
            },
            {
              href: 'https://www.linkedin.com/in/eyob-wasihun-62108a304',
              label: 'LinkedIn',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
            },
            {
              href: 'https://x.com/Wnonamenoman',
              label: 'Twitter / X',
              icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              ),
            },
          ].map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.5)] hover:bg-[hsl(var(--primary)/0.08)]"
              style={{ borderColor: 'hsl(var(--border))' }}
            >
              {icon}
            </a>
          ))}

          {/* Separator + availability badge */}
          <div
            className="w-px h-8 hidden sm:block"
            style={{ background: 'hsl(var(--border))' }}
            aria-hidden="true"
          />
          <span
            className="hidden sm:inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border"
            style={{
              color: 'hsl(142 70% 50%)',
              borderColor: 'hsl(142 70% 50% / 0.3)',
              background: 'hsl(142 70% 50% / 0.08)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: 'hsl(142 70% 50%)',
                animation: 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
              }}
            />
            Available for opportunities
          </span>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="scroll-indicator absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'hsl(var(--muted-foreground))', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem' }}
        >
          Scroll
        </span>
        <div
          className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5"
          style={{ borderColor: 'hsl(var(--primary) / 0.5)' }}
        >
          <div
            className="w-0.5 h-2 rounded-full"
            style={{
              background: 'hsl(var(--primary))',
              animation: 'float 1.8s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
