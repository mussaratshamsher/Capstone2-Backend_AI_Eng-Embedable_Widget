'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';

export function FloatingArrow() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The hero section is usually around 500-800px tall. We show it after 600px of scrolling.
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <Link
        href="/"
        onClick={(e) => {
          if (window.location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg group transition-all duration-300 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.9), rgba(99,102,241,0.9))',
          border: '1px solid rgba(139,92,246,0.4)',
          boxShadow: '0 0 20px rgba(124,58,237,0.4)',
        }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform duration-300" />
      </Link>
    </div>
  );
}
