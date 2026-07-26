'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Code, User, Briefcase, BookOpen, Mail, FileText, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    { id: 'about', label: 'Go to About', icon: <User className="w-4 h-4" />, category: 'Navigation', action: () => { scrollTo('#about'); onClose(); } },
    { id: 'projects', label: 'Go to Projects', icon: <Code className="w-4 h-4" />, category: 'Navigation', action: () => { scrollTo('#projects'); onClose(); } },
    { id: 'skills', label: 'Go to Skills', icon: <Terminal className="w-4 h-4" />, category: 'Navigation', action: () => { scrollTo('#skills'); onClose(); } },
    { id: 'experience', label: 'Go to Experience', icon: <Briefcase className="w-4 h-4" />, category: 'Navigation', action: () => { scrollTo('#experience'); onClose(); } },
    { id: 'contact', label: 'Go to Contact', icon: <Mail className="w-4 h-4" />, category: 'Navigation', action: () => { scrollTo('#contact'); onClose(); } },
    { id: 'resume', label: 'Download Resume', icon: <FileText className="w-4 h-4" />, category: 'Actions', action: () => { window.open(PERSONAL_INFO.resumePath, '_blank'); onClose(); } },
    { id: 'github', label: 'Open GitHub', icon: <Github className="w-4 h-4" />, category: 'Links', action: () => { window.open(PERSONAL_INFO.socials.github, '_blank'); onClose(); } },
    { id: 'linkedin', label: 'Open LinkedIn', icon: <Linkedin className="w-4 h-4" />, category: 'Links', action: () => { window.open(PERSONAL_INFO.socials.linkedin, '_blank'); onClose(); } },
  ];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = query.trim()
    ? commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  const grouped = filtered.reduce((acc: Record<string, CommandItem[]>, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute top-1/4 left-1/2 w-full max-w-lg -translate-x-1/2 rounded-2xl glass border border-white/10 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="w-4 h-4 text-gold-500 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search commands..."
                className="flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
              />
              <kbd className="text-xs text-gray-600 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {Object.entries(grouped).length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">No commands found</div>
              ) : (
                Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <div className="px-3 py-1.5 text-xs text-gray-600 uppercase tracking-widest">{category}</div>
                    {items.map(cmd => (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm text-gray-300 hover:bg-gold-500/10 hover:text-gold-400 transition-colors group"
                      >
                        <span className="text-gray-500 group-hover:text-gold-500 transition-colors">{cmd.icon}</span>
                        {cmd.label}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/10 text-xs text-gray-600">
              <span><kbd className="border border-white/10 rounded px-1">↑↓</kbd> Navigate</span>
              <span><kbd className="border border-white/10 rounded px-1">↵</kbd> Select</span>
              <span><kbd className="border border-white/10 rounded px-1">ESC</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
