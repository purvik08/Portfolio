'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowDown, Download, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

const TYPING_STRINGS = PERSONAL_INFO.subtitles;

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typing animation
  useEffect(() => {
    const current = TYPING_STRINGS[titleIndex];
    if (!deleting) {
      if (charIndex < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, 35);
      } else {
        timeoutRef.current = setTimeout(() => {
          setDeleting(false);
          setTitleIndex(i => (i + 1) % TYPING_STRINGS.length);
        }, 35);
      }
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [charIndex, deleting, titleIndex]);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const SOCIALS = [
    { href: PERSONAL_INFO.socials.github, icon: <Github className="w-5 h-5" />, label: 'GitHub' },
    { href: PERSONAL_INFO.socials.linkedin, icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
    { href: PERSONAL_INFO.socials.instagram, icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
    { href: `mailto:${PERSONAL_INFO.email}`, icon: <Mail className="w-5 h-5" />, label: 'Email' },
  ];

  const STATS = [
    { label: 'Projects Built', value: '5+' },
    { label: 'Tech Stack Items', value: '20+' },
    { label: 'Drone Flight Time', value: '20m' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Radial glow behind hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gold-500/5 blur-3xl" />
        <div className="absolute top-2/3 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold-500/20 text-xs text-gold-400 font-medium mb-8 tracking-widest uppercase"
        >
          <MapPin className="w-3 h-3" />
          {PERSONAL_INFO.location}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-6xl md:text-8xl font-extrabold mb-4 tracking-tight"
        >
          <span className="text-white">{PERSONAL_INFO.name.split(' ')[0]} </span>
          <span className="gradient-text">{PERSONAL_INFO.name.split(' ')[1]}</span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-10 mb-8 flex items-center justify-center"
        >
          <p className="text-lg md:text-xl text-gray-400 font-medium typing-cursor">
            {displayText}
          </p>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-2xl mx-auto text-gray-500 text-base md:text-lg leading-relaxed mb-10"
        >
          I design, build, and program intelligent robotic systems — from autonomous drones and warehouse automation to embedded IoT hardware. Focused on applying edge AI and ROS 2 for real-world hardware control.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-3.5 rounded-xl bg-gold-500 text-charcoal-950 font-semibold text-sm hover:bg-gold-400 transition-all shadow-lg hover:shadow-gold-500/30 hover:-translate-y-0.5"
          >
            View My Work
          </button>
          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl glass border border-white/10 text-white font-semibold text-sm hover:border-gold-500/40 hover:text-gold-400 transition-all hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          {SOCIALS.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="p-2.5 rounded-xl glass border border-white/10 text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all hover:-translate-y-0.5"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="flex flex-wrap items-center justify-center gap-8 mb-12"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-heading font-extrabold gradient-text-gold">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 hover:text-gold-400 transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.button>
    </section>
  );
}
