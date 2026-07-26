'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Heart, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socials = [
    { href: PERSONAL_INFO.socials.github, icon: <Github className="w-4 h-4" />, label: 'GitHub' },
    { href: PERSONAL_INFO.socials.linkedin, icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
    { href: PERSONAL_INFO.socials.instagram, icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
    { href: `mailto:${PERSONAL_INFO.email}`, icon: <Mail className="w-4 h-4" />, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/5 py-10 px-6">
      {/* Glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + copy */}
        <div className="text-center md:text-left">
          <div className="font-heading font-bold text-xl mb-1">
            <span className="gradient-text-gold">PP</span>
            <span className="text-white/30">.</span>
          </div>
          <p className="text-xs text-gray-600 flex items-center gap-1 justify-center md:justify-start">
            Built with <Heart className="w-3 h-3 text-gold-500" /> by Purvik Prajapati
          </p>
          <p className="text-xs text-gray-700 mt-0.5">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="p-2 rounded-lg text-gray-600 hover:text-gold-400 hover:bg-gold-500/10 transition-all"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Back to top */}
        <motion.button
          onClick={scrollTop}
          whileHover={{ y: -2 }}
          className="p-2.5 rounded-xl glass border border-white/10 text-gray-500 hover:text-gold-400 hover:border-gold-500/30 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>
    </footer>
  );
}
