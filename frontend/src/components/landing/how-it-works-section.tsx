"use client";

import { motion } from 'framer-motion';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-24 relative">
      <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)' }} />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          How <span className="gradient-text">LeadForge</span> Works
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
        {[
          {
            step: '01',
            title: 'Create Your Project',
            desc: 'Sign up, create a project, and define your custom AI agent’s behavior and knowledge base.',
            delay: 100
          },
          {
            step: '02',
            title: 'Embed the Widget',
            desc: 'Copy a single line of JavaScript and paste it into your website’s <head> tag.',
            delay: 200
          },
          {
            step: '03',
            title: 'Watch Leads Roll In',
            desc: 'The AI engages visitors 24/7, scores their intent, and sends qualified leads to your dashboard.',
            delay: 300
          }
        ].map((s, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: s.delay / 1000 }}
            whileHover={{ y: -8, transition: { duration: 0.2, delay: 0 } }}
            className={`glass p-4 lg:p-8 rounded-3xl text-center relative overflow-hidden hover:shadow-[0_15px_50px_rgba(124,58,237,0.15)] transition-shadow duration-300`} 
            style={{ background: 'var(--bg-elevated)' }}
          >
            <div className="step-number absolute -top-4 -right-4 opacity-5 text-8xl font-black italic" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}>
              {s.step}
            </div>
            <div className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center font-bold text-lg"
                 style={{ background: 'rgba(124,58,237,0.1)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)' }}>
              {s.step}
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>{s.title}</h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
