'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Instagram, Send, MapPin, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('API failed');
      }
    } catch {
      // Fallback: open mailto
      const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`;
      window.open(mailto);
      setStatus('success');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  const CONTACT_ITEMS = [
    { icon: <Mail className="w-4 h-4" />, label: 'Email', value: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone}` },
    { icon: <MapPin className="w-4 h-4" />, label: 'Location', value: PERSONAL_INFO.location, href: undefined },
  ];

  const SOCIAL_LINKS = [
    { icon: <Github className="w-5 h-5" />, href: PERSONAL_INFO.socials.github, label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: PERSONAL_INFO.socials.linkedin, label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: PERSONAL_INFO.socials.instagram, label: 'Instagram' },
  ];

  const inputClass = "w-full px-4 py-3 rounded-xl glass border border-white/10 text-gray-200 text-sm placeholder-gray-600 outline-none focus:border-gold-500/50 focus:bg-gold-500/5 transition-all";

  return (
    <section id="contact" className="section-padding px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/20 text-gold-400 text-xs uppercase tracking-widest mb-4">
            <ChevronRight className="w-3 h-3" /> Get in Touch
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="max-w-lg mx-auto text-gray-500">
            Open to collaborations, hardware projects, internships, and technical discussions. Let&apos;s build something great together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <GlassCard>
              <h3 className="font-heading font-bold text-white mb-5">Contact Details</h3>
              <div className="space-y-4">
                {CONTACT_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gold-500/10 text-gold-500 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 uppercase tracking-widest">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-gray-300 hover:text-gold-400 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-300">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="font-heading font-bold text-white mb-4">Socials</h3>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex-1 flex items-center justify-center py-3 rounded-xl glass border border-white/10 text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="glass-gold">
              <p className="text-sm text-gray-400 leading-relaxed">
                Currently <span className="text-gold-400 font-semibold">open to opportunities</span> in Robotics, Embedded Systems, and AI/ML engineering roles.
              </p>
            </GlassCard>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <GlassCard glow>
              <h3 className="font-heading font-bold text-white mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs text-gray-500 mb-1.5 uppercase tracking-widest">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs text-gray-500 mb-1.5 uppercase tracking-widest">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs text-gray-500 mb-1.5 uppercase tracking-widest">Subject</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs text-gray-500 mb-1.5 uppercase tracking-widest">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Status */}
                {status === 'success' && (
                  <div className="flex items-center gap-2 text-sm text-green-400 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm text-red-400 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Something went wrong. Please try emailing directly.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 text-charcoal-950 font-semibold text-sm hover:bg-gold-400 transition-all shadow-lg hover:shadow-gold-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
