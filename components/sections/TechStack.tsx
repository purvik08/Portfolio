'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, Brain, Cpu, Code, ChevronRight } from 'lucide-react';
import { SKILL_CATEGORIES, SkillCategory } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';

const ICON_MAP: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Code: <Code className="w-5 h-5" />,
};

const LEVEL_COLOR = (level: number) => {
  if (level >= 88) return 'bg-gradient-to-r from-gold-500 to-gold-400';
  if (level >= 75) return 'bg-gradient-to-r from-cyan-500 to-cyan-400';
  return 'bg-gradient-to-r from-gray-500 to-gray-400';
};

function SkillBar({ name, level, category, delay }: { name: string; level: number; category: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">{name}</span>
          <span className="text-xs text-gray-600 hidden sm:block">· {category}</span>
        </div>
        <span className="text-xs font-bold text-gold-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-charcoal-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${LEVEL_COLOR(level)}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.1 + delay * 0.08, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ cat, index }: { cat: SkillCategory; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard className="h-full">
        {/* Category header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20">
            {ICON_MAP[cat.icon] || <Code className="w-5 h-5" />}
          </div>
          <h3 className="font-heading font-bold text-white text-base">{cat.title}</h3>
        </div>

        {/* Skills */}
        {cat.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            category={skill.category}
            delay={i}
          />
        ))}
      </GlassCard>
    </motion.div>
  );
}

// Tech marquee strip
const TECH_STACK = [
  'ESP32-S3', 'ROS 2', 'Python', 'OpenCV', 'MediaPipe', 'KiCad', 'FreeRTOS',
  'C++', 'TensorFlow', 'Android', 'MQTT', 'I2C / SPI', 'Java', 'Linux', 'Git', 'Three.js'
];

export default function TechStack() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section id="skills" className="section-padding px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/20 text-gold-400 text-xs uppercase tracking-widest mb-4">
            <ChevronRight className="w-3 h-3" /> Technical Skills
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            Skills & <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="max-w-lg mx-auto text-gray-500">
            From microcontrollers to ML models, spanning the full spectrum of hardware and software engineering.
          </p>
        </motion.div>

        {/* Marquee */}
        <div className="relative mb-12 overflow-hidden py-3">
          <div className="flex gap-4 animate-marquee w-max">
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <span
                key={i}
                className="shrink-0 px-4 py-2 rounded-full glass border border-white/10 text-sm text-gray-400 font-medium hover:text-gold-400 hover:border-gold-500/30 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-charcoal-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-charcoal-950 to-transparent pointer-events-none" />
        </div>

        {/* Skill category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
