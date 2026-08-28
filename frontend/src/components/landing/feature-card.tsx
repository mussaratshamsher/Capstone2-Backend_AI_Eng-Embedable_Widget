'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function FeatureCard({
  icon, title, description, delay
}: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ y: -5, transition: { duration: 0.2, delay: 0 } }}
      className={`glass rounded-2xl p-7 hover:shadow-[0_12px_40px_rgba(124,58,237,0.2)] hover:border-[rgba(139,92,246,0.4)] transition-colors duration-300`}
    >
      <div className="feature-icon w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <span style={{ color: '#a78bfa' }}>{icon}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
    </motion.div>
  );
}
