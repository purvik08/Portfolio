'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, ExternalLink, ChevronRight, Tag } from 'lucide-react';
import { RESEARCH_ITEMS, ResearchItem } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

function ResearchCard({ item, index }: { item: ResearchItem; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard glow className="h-full card-hover">
        {/* Year badge */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <Badge variant="gold">{item.year}</Badge>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-gray-500 hover:text-gold-400 transition-colors"
              aria-label="View research"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Venue */}
        <div className="flex items-center gap-1.5 text-xs text-cyan-400 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          {item.venue}
        </div>

        {/* Title */}
        <h3 className="font-heading text-base font-bold text-white mb-3 leading-snug">
          {item.title}
        </h3>

        {/* Abstract */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {item.abstract}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 tag-pill">
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function Research() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section id="research" className="section-padding px-6">
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
            <ChevronRight className="w-3 h-3" /> Publications & Research
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            Research & <span className="gradient-text">Findings</span>
          </h2>
          <p className="max-w-lg mx-auto text-gray-500">
            Deep dives into hardware-software co-design, embedded AI, and human-computer interaction on constrained devices.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_ITEMS.map((item, i) => (
            <ResearchCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm mb-4">More research and technical writeups coming soon.</p>
          <a
            href={`mailto:sumritprajapati@gmail.com`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-gold-500/20 text-gold-400 text-sm font-medium hover:border-gold-500/40 hover:bg-gold-500/5 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Collaborate on Research
          </a>
        </motion.div>
      </div>
    </section>
  );
}
