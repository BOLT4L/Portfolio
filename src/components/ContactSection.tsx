import { useState, useRef, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

/* ── Reveal hook (same pattern as AboutSection) ── */
function useRevealOnScroll(ref: React.RefObject<Element>) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const targets = container.querySelectorAll<HTMLElement>('.reveal, .reveal-left, .reveal-scale');
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [ref]);
}

/* ================================================================
   CONTACT FORM MODAL
   ================================================================ */
function ConversationModal({ onClose }: { onClose: () => void }) {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');

    emailjs
      .send(
        'service_56su66l',
        'template_xhvdwl5',
        { from_name: form.name, from_email: form.email, reply_to: form.email, message: `From: ${form.name} <${form.email}>\n\n${form.message}` },
        'qaxwhwo1u9zYJLnAI'
      )
      .then(() => {
        setSending(false);
        setSent(true);
        setForm({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setSending(false);
        setError('Failed to send. Please try again later.');
      });
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Send a message"
    >
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--secondary))]"
          aria-label="Close"
        >
          ✕
        </button>

        {sent ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
            <CheckCircle size={48} style={{ color: 'hsl(142 70% 50%)' }} />
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: 'Syne, sans-serif', color: 'hsl(var(--foreground))' }}
            >
              Message Sent!
            </h3>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Thanks for reaching out — I'll get back to you soon.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3
                className="text-2xl font-extrabold mb-1"
                style={{ fontFamily: 'Syne, sans-serif', color: 'hsl(var(--foreground))' }}
              >
                Start a Conversation
              </h3>
              <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Drop me a message and I'll respond within 24 hours.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div>
                <label
                  htmlFor="msg-name"
                  className="block text-xs font-semibold mb-1.5 tracking-wide uppercase"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  Name
                </label>
                <input
                  id="msg-name"
                  type="text"
                  className="form-input"
                  placeholder="Eyob Wasihun"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="msg-email"
                  className="block text-xs font-semibold mb-1.5 tracking-wide uppercase"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  Email
                </label>
                <input
                  id="msg-email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="msg-message"
                  className="block text-xs font-semibold mb-1.5 tracking-wide uppercase"
                  style={{ color: 'hsl(var(--muted-foreground))' }}
                >
                  Message
                </label>
                <textarea
                  id="msg-message"
                  className="form-input resize-none"
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm" style={{ color: 'hsl(0 72% 51%)' }}>
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-full justify-center"
                disabled={sending}
                aria-busy={sending}
              >
                {sending ? (
                  <>
                    <span
                      className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
                      style={{ animation: 'spinSlow 0.7s linear infinite' }}
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   MAIN CONTACT / FOOTER SECTION
   ================================================================ */
const ContactSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useRevealOnScroll(sectionRef as React.RefObject<Element>);

  const CONTACT_ITEMS = [
    {
      icon: <Mail size={20} style={{ color: 'hsl(var(--primary))' }} />,
      label: 'Email',
      value: 'eyobwasihun21@gmail.com',
      href: 'mailto:eyobwasihun21@gmail.com',
    },
    {
      icon: <Phone size={20} style={{ color: 'hsl(var(--accent))' }} />,
      label: 'Phone',
      value: '+251 993 131 591',
      href: 'tel:+251993131591',
    },
    {
      icon: <MapPin size={20} style={{ color: 'hsl(var(--primary))' }} />,
      label: 'Location',
      value: 'Addis Ababa, Ethiopia',
      href: null,
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'hsl(var(--accent))' }}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      value: '@eyobwasihun',
      href: 'https://www.linkedin.com/in/eyob-wasihun-62108a304',
    },
  ];

  return (
    <footer
      id="contact"
      ref={sectionRef}
      aria-label="Contact and footer"
      style={{ background: 'hsl(var(--card))', borderTop: '1px solid hsl(var(--border))' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

        {/* ── Section header ── */}
        <div className="mb-16 reveal">
          <span className="section-label mb-4 block">Let's build together</span>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-5xl lg:text-6xl font-extrabold"
              style={{ fontFamily: 'Syne, sans-serif', color: 'hsl(var(--foreground))' }}
            >
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p
              className="text-base max-w-sm"
              style={{ color: 'hsl(var(--muted-foreground))', fontFamily: 'Inter, sans-serif' }}
            >
              Ready to bring your ideas to life? I'm always open to discussing new projects,
              creative ideas, or opportunities.
            </p>
          </div>
        </div>

        {/* ── Main content grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">

          {/* Contact info — left col */}
          <div className="lg:col-span-2 space-y-4 stagger-children">
            {CONTACT_ITEMS.map(({ icon, label, value, href }) => (
              <div key={label} className="contact-item reveal">
                <div className="contact-icon-wrap">{icon}</div>
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm font-medium truncate block transition-colors hover:text-[hsl(var(--primary))]"
                      style={{ color: 'hsl(var(--foreground))' }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA panel — right col */}
          <div className="lg:col-span-3 reveal">
            <div
              className="relative overflow-hidden rounded-3xl p-8 lg:p-10 h-full flex flex-col justify-between min-h-[280px]"
              style={{
                background: 'linear-gradient(145deg, hsl(222 18% 12%), hsl(222 18% 9%))',
                border: '1px solid hsl(var(--border))',
              }}
            >
              {/* Decorative blob */}
              <div
                className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
                style={{ background: 'hsl(var(--primary))' }}
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ background: 'hsl(var(--accent))' }}
                aria-hidden="true"
              />

              <div className="relative">
                <h3
                  className="text-3xl font-extrabold mb-3"
                  style={{ fontFamily: 'Syne, sans-serif', color: 'hsl(var(--foreground))' }}
                >
                  Ready to Start?
                </h3>
                <p className="text-base mb-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  I'm available for freelance projects, internships, and full-time roles. Let's
                  create something exceptional together.
                </p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="btn-primary"
                >
                  <Send size={15} />
                  Start a Conversation
                </button>
              </div>

              {/* Stats row */}
              <div className="relative flex gap-8 pt-8 border-t mt-8" style={{ borderColor: 'hsl(var(--border))' }}>
                {[
                  { num: '6+', label: 'Projects Shipped' },
                  { num: '5',  label: 'Work Experiences' },
                  { num: '7+', label: 'Tech Stacks' },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <p
                      className="text-2xl font-extrabold gradient-text"
                      style={{ fontFamily: 'Syne, sans-serif' }}
                    >
                      {num}
                    </p>
                    <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer bottom bar ── */}
        <div className="footer-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            © 2025 <span style={{ color: 'hsl(var(--foreground))' }}>Eyob Wasihun</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-4" aria-label="Social links">
            {[
              {
                href: 'https://x.com/Wnonamenoman',
                label: 'Twitter / X',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                ),
              },
              {
                href: 'https://github.com/BOLT4L',
                label: 'GitHub',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                href: 'https://www.linkedin.com/in/eyob-wasihun-62108a304',
                label: 'LinkedIn',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary)/0.4)] hover:bg-[hsl(var(--primary)/0.08)]"
                style={{ borderColor: 'hsl(var(--border))' }}
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Built with React + Tailwind
          </p>
        </div>
      </div>

      {modalOpen && <ConversationModal onClose={() => setModalOpen(false)} />}
    </footer>
  );
};

export default ContactSection;
