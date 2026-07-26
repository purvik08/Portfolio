'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Wrench, ChevronRight } from 'lucide-react';
import { EXPERIENCES, ExperienceItem } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';

const TYPE_CONFIG = {
  education: {
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'text-gold-400',
    border: 'border-gold-500/30',
    bg: 'bg-gold-500/10',
    dot: 'bg-gold-500',
  },
  diploma: {
    icon: <Wrench className="w-5 h-5" />,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    dot: 'bg-cyan-500',
  },
  work: {
    icon: <Wrench className="w-5 h-5" />,
    color: 'text-gray-400',
    border: 'border-gray-500/30',
    bg: 'bg-gray-500/10',
    dot: 'bg-gray-500',
  },
};

function ExperienceCard({ exp, index }: { exp: ExperienceItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const cfg = TYPE_CONFIG[exp.type];
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-12`}
    >
      {/* Content */}
      <div className="flex-1">
        <GlassCard glow>
          {/* Period badge */}
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest mb-4 ${cfg.border} ${cfg.color} ${cfg.bg}`}>
            {cfg.icon}
            {exp.period}
          </div>

          <h3 className="font-heading text-xl font-bold text-white mb-1">{exp.title}</h3>
          <p className={`text-sm font-medium mb-1 ${cfg.color}`}>{exp.organization}</p>
          <p className="text-xs text-gray-600 mb-4">{exp.location}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.description}</p>

          {/* Highlights */}
          <ul className="space-y-2">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <ChevronRight className={`w-4 h-4 mt-0.5 shrink-0 ${cfg.color}`} />
                {h}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>

      {/* Center dot (hidden on mobile) */}
      <div className="hidden md:flex flex-col items-center w-12 pt-6">
        <div className={`w-4 h-4 rounded-full ${cfg.dot} shadow-lg z-10`} />
        {index < EXPERIENCES.length - 1 && (
          <div className="flex-1 w-px bg-gradient-to-b from-gold-500/40 to-transparent mt-2" />
        )}
      </div>

      {/* Empty side */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}

export default function Experience() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section id="experience" className="section-padding px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/20 text-gold-400 text-xs uppercase tracking-widest mb-4">
            <ChevronRight className="w-3 h-3" /> Education & Background
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="max-w-lg mx-auto text-gray-500">
            From industrial robotics diploma to AI/ML specialization — a continuous commitment to hardware and intelligent systems.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
