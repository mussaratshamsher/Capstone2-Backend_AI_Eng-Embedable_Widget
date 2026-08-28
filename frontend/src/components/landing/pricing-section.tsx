"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (plan: string) => {
    setLoadingPlan(plan);
    try {
      // Step 1: Call your Next.js backend API to generate a Safepay Tracker
      const res = await fetch('/api/checkout/safepay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      });
      
      const data = await res.json();
      
      if (data.tracker) {
        // Step 2: Redirect user to Safepay's secure checkout page
        window.location.href = `https://sandbox.api.getsafepay.com/checkout/pay?env=sandbox&beacon=${data.tracker}&source=custom&order_id=ORD-${Math.floor(Math.random() * 10000)}&redirect_url=${encodeURIComponent(window.location.origin + '/dashboard')}&cancel_url=${encodeURIComponent(window.location.origin + '/')}`;
      } else {
        alert("Failed to initialize payment.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong with the checkout process.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Simple, <span className="gradient-text">transparent</span> pricing
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1 - Free */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="glass rounded-3xl p-8 flex flex-col hover:shadow-[0_15px_50px_rgba(124,58,237,0.1)] transition-all duration-300" 
          style={{ border: '1px solid var(--border-default)' }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Starter</h3>
          <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>$0</p>
          <p className="text-sm mb-6 pb-6" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>Forever free for individuals</p>
          <ul className="space-y-4 mb-8 flex-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> 1 Project</li>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> 100 AI Conversations/mo</li>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> Basic Dashboard</li>
          </ul>
          {/* Free Tier: No payment logic */}
          <button className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-[rgba(139,92,246,0.2)]" style={{ background: 'rgba(139,92,246,0.1)', color: '#c4b5fd' }}>
            Get Started
          </button>
        </motion.div>

        {/* Tier 2 - Pro (Payment Integration) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="glass rounded-3xl p-8 flex flex-col relative shadow-2xl hover:shadow-[0_15px_60px_rgba(124,58,237,0.2)] transition-all duration-300" 
          style={{ border: '1px solid var(--border-strong)', background: 'rgba(124,58,237,0.05)' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1 rounded-full text-xs font-bold text-white shadow-lg shadow-violet-500/30">
            MOST POPULAR
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Pro</h3>
          <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>$49<span className="text-sm font-normal text-zinc-400">/mo</span></p>
          <p className="text-sm mb-6 pb-6" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>For growing startups</p>
          <ul className="space-y-4 mb-8 flex-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> 5 Projects</li>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> 2,000 AI Conversations/mo</li>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> Custom AI Training</li>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> CRM Integrations</li>
          </ul>
          {/* Pro Tier: Triggers Safepay Checkout */}
          <button 
            onClick={() => handleCheckout('pro')}
            disabled={loadingPlan === 'pro'}
            className="btn-brand w-full py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {loadingPlan === 'pro' ? 'Processing...' : 'Subscribe via Safepay'}
          </button>
        </motion.div>

        {/* Tier 3 - Custom/Enterprise (Payment Integration) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="glass rounded-3xl p-8 flex flex-col hover:shadow-[0_15px_50px_rgba(124,58,237,0.1)] transition-all duration-300" 
          style={{ border: '1px solid var(--border-default)' }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Enterprise</h3>
          <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-space-grotesk), sans-serif' }}>Custom</p>
          <p className="text-sm mb-6 pb-6" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>For large organizations</p>
          <ul className="space-y-4 mb-8 flex-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> Unlimited Projects</li>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> Unlimited Conversations</li>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> White-labeling</li>
            <li className="flex items-center gap-3"><span style={{ color: '#a78bfa' }}>✓</span> Dedicated Success Manager</li>
          </ul>
          {/* Enterprise Tier: Triggers Safepay Checkout */}
          <button 
            onClick={() => handleCheckout('enterprise')}
            disabled={loadingPlan === 'enterprise'}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 hover:bg-[rgba(139,92,246,0.2)]" 
            style={{ background: 'rgba(139,92,246,0.1)', color: '#c4b5fd' }}
          >
            {loadingPlan === 'enterprise' ? 'Processing...' : 'Pay via Safepay'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
