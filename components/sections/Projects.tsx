'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Linkedin, ChevronRight, Cpu, Bot, Brain, Smartphone } from 'lucide-react';
import { PROJECTS, Project } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

const CATEGORIES = ['All', 'Robotics & ROS', 'AI / ML', 'Embedded Systems', 'Android / Apps'];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Robotics & ROS': <Bot className="w-3.5 h-3.5" />,
  'AI / ML': <Brain className="w-3.5 h-3.5" />,
  'Embedded Systems': <Cpu className="w-3.5 h-3.5" />,
  'Android / Apps': <Smartphone className="w-3.5 h-3.5" />,
};

const BADGE_VARIANT: Record<string, 'gold' | 'cyan' | 'outline'> = {
  'Robotics & ROS': 'gold',
  'AI / ML': 'cyan',
  'Embedded Systems': 'outline',
  'Android / Apps': 'outline',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <GlassCard glow className="h-full card-hover flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <Badge variant={BADGE_VARIANT[project.category] || 'outline'} className="mb-2">
              {project.badge}
            </Badge>
            <h3 className="font-heading text-lg font-bold text-white leading-tight">
              {project.title}
            </h3>
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title}`}
            className="shrink-0 p-2 rounded-lg glass border border-white/10 text-gray-400 hover:text-gold-400 hover:border-gold-500/30 transition-all"
          >
            {project.link.includes('linkedin') ? (
              <Linkedin className="w-4 h-4" />
            ) : project.link.includes('github') ? (
              <Github className="w-4 h-4" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
          </a>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Architecture diagram */}
        {project.architectureDiagram && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-charcoal-800/60 border border-white/5 font-mono text-xs text-gold-400/80 leading-relaxed break-all">
            {project.architectureDiagram}
          </div>
        )}

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {project.metrics.map((m, i) => (
              <div key={i} className="text-center px-2 py-2 rounded-lg bg-charcoal-800/60 border border-white/5">
                <div className="text-gold-400 font-bold text-sm font-heading">{m.value}</div>
                <div className="text-gray-600 text-xs mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Hardware */}
        {project.hardware && project.hardware.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.hardware.map(hw => (
              <span
                key={hw}
                className="text-xs px-2 py-0.5 rounded-full border border-cyan-500/20 text-cyan-400/80 bg-cyan-500/5"
              >
                {hw}
              </span>
            ))}
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 5).map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors mt-auto group"
        >
          {project.linkText}
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </GlassCard>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  const filtered = PROJECTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="projects" className="section-padding px-6">
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
            <ChevronRight className="w-3 h-3" /> Featured Work
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            Projects & <span className="gradient-text">Builds</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-500">
            Real hardware, real code. From flying drones to warehouse bots — each project is a deep dive into engineering challenges.
          </p>
        </motion.div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 flex-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  activeCategory === cat
                    ? 'bg-gold-500 text-charcoal-950 border-gold-500'
                    : 'glass border-white/10 text-gray-400 hover:border-gold-500/30 hover:text-gold-400'
                }`}
              >
                {CATEGORY_ICONS[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="search"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="glass border border-white/10 rounded-xl px-4 py-2 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-gold-500/40 w-full sm:w-56"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">No projects match your search.</div>
        )}
      </div>
    </section>
  );
}
