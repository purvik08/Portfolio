'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '@/data/portfolioData';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

const CATEGORY_VARIANTS: Record<string, 'gold' | 'cyan' | 'outline'> = {
  Robotics: 'gold',
  Embedded: 'cyan',
  'AI/ML': 'cyan',
  Android: 'outline',
};

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <GlassCard glow className="h-full card-hover">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <Badge variant={CATEGORY_VARIANTS[post.category] || 'outline'}>
            {post.category}
          </Badge>
          <span className="text-gray-600 text-xs">·</span>
          <div className="flex items-center gap-1 text-gray-600 text-xs">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading text-base font-bold text-white mb-3 leading-snug">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <button className="flex items-center gap-1 text-xs font-medium text-gold-400 hover:text-gold-300 transition-colors group">
            Read more
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </GlassCard>
    </motion.article>
  );
}

export default function BlogSection() {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section id="blog" className="section-padding px-6">
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
            <ChevronRight className="w-3 h-3" /> Engineering Blog
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            Technical <span className="gradient-text">Writeups</span>
          </h2>
          <p className="max-w-lg mx-auto text-gray-500">
            Deep dives into embedded systems, robotics engineering, and AI/ML implementation challenges.
          </p>
        </motion.div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 text-gray-600 text-sm"
        >
          More articles coming soon — documenting builds in real-time.
        </motion.div>
      </div>
    </section>
  );
}
