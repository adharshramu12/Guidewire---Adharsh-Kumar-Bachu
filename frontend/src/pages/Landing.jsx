import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticleCanvas from '../components/ParticleCanvas';
import Hero3DScene from '../components/Hero3DScene';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Animated Counter ──────────────────────────────────────────── */
function AnimatedCounter({ target, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: counterRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.5,
          ease: "power3.out",
          onUpdate: function () {
            setCount(Math.floor(this.targets()[0].val));
          }
        });
      },
      once: true
    });
  }, { scope: counterRef });

  return <span ref={counterRef}>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>;
}

/* ── Feature Data ──────────────────────────────────────────────── */
const FEATURES = [
  {
    title: 'Parametric Logic',
    desc: 'No paperwork. Every disruption is automatically detected and settled by our climate simulation engine in under 15 milliseconds.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Fraud Suppression',
    desc: 'Proprietary spatial-temporal AI verifies every claim against live GPS telemetry, shielding the pool from exploitation.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Portable GigScore',
    desc: 'A financial passport for gig workers. Maintain high trust to unlock micro-loans, premium discounts, and cross-platform credit.',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const STEPS = [
  { num: '01', title: 'Verify Identity', desc: 'Workers verify via WhatsApp OTP in under 30 seconds.' },
  { num: '02', title: 'Activate Shield', desc: 'Choose coverage zone and pay ₹29/week via UPI auto-pay.' },
  { num: '03', title: 'Auto-Detection', desc: 'Our engine monitors rainfall, heat, AQI, and LPG supply in real-time.' },
  { num: '04', title: 'Instant Payout', desc: 'When thresholds breach, ₹400 is settled to UPI within 14ms. Zero paperwork.' },
];

export default function Landing() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Hero Text Entrance
    gsap.fromTo('.hero-text-line', 
      { y: 50, opacity: 0, rotateX: -20 }, 
      { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.15, ease: "power4.out", delay: 0.2 }
    );

    // Parallax scene pinning
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: '+=100%',
      pin: '.hero-3d-container',
      scrub: 1,
    });

    // Trusted By Banner
    gsap.fromTo('.partner-logo',
      { opacity: 0, y: 20 },
      { opacity: 0.2, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: '.partners-section', start: 'top 85%' }
      }
    );

    // Features Stagger
    gsap.fromTo('.feature-card',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: '.features-grid', start: 'top 80%' }
      }
    );

    // Steps Stagger
    gsap.fromTo('.pipeline-step',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, stagger: 0.2, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: '.pipeline-section', start: 'top 75%' }
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#0c1324] text-[#dce2fa] overflow-x-hidden font-body" style={{ backgroundColor: '#0c1324' }}>
      
      {/* Heavy 3D Background - Pinned layer */}
      <div className="hero-3d-container fixed top-0 left-0 w-full h-[120vh] pointer-events-none z-0">
        <ParticleCanvas />
        <Hero3DScene />
        {/* Deep aura glows */}
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-[#06b6d4] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 -left-1/4 w-[600px] h-[600px] bg-[#10b981] opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Main Scroll Content */}
      <div className="relative z-10">

        {/* ══ HERO ═══════════════════════════════════════════════════ */}
        <section className="hero-section min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-20 relative">
          <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Asymmetrical Left Content area */}
            <div className="lg:col-span-7 flex flex-col justify-center items-start perspective-1000">
              
              <div className="hero-text-line hud-badge mb-10 bg-[#293042]/30 border-white/5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400">Parametric Insurance Infrastructure</span>
              </div>

              <h1 className="font-display font-extrabold text-6xl md:text-8xl tracking-[-0.04em] leading-[0.95] mb-8">
                <div className="hero-text-line text-[#dce2fa]">Deliver without</div>
                <div className="hero-text-line text-emerald-glow">Disruption.</div>
              </h1>

              <p className="hero-text-line text-[#bbcabf] text-lg md:text-xl max-w-xl mb-12 font-medium leading-[1.6]">
                The first automated income guarantee for the Indian gig economy.
                Powered by hyper-local climate simulation and instant UPI settlements.
              </p>

              <div className="hero-text-line flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
                <Link to="/onboarding">
                  <button className="btn-primary w-full sm:w-auto group">
                    Get Income Protection
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </Link>
                <Link to="/admin">
                  <button className="btn-secondary w-full sm:w-auto">
                    Explore Enterprise Ops
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Right side left empty for the 3D sphere to inhabit visually */}
            <div className="lg:col-span-5 hidden lg:block" />
          </div>
        </section>

        {/* ══ TRUSTED BY STRIP ═══════════════════════════════════════ */}
        <section className="partners-section py-16 border-y border-white/5 bg-[#0c1324]/80 backdrop-blur-xl relative z-10">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center gap-8">
            <p className="text-[10px] font-bold text-[#86948a] uppercase tracking-[0.2em]">Securing millions for</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20">
              {['ZOMATO', 'SWIGGY', 'PORTER', 'DELHIVERY', 'GUIDEWIRE'].map(b => (
                <span key={b} className="partner-logo font-display font-extrabold text-2xl md:text-3xl italic tracking-tighter text-white opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-default">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STATS COUNTER BAR ══════════════════════════════════════ */}
        <section className="py-24 relative z-10 bg-[#0c1324]/90 backdrop-blur-md">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
              {[
                { target: 420000, prefix: '', suffix: '+', label: 'Active Riders' },
                { target: 99.9, prefix: '', suffix: '%', label: 'Claims Accuracy' },
                { target: 0.4, prefix: '', suffix: 's', label: 'Network Velocity' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#141b2c] p-12 text-center hover:bg-[#181f31] transition-colors duration-500">
                  <p className="text-4xl md:text-5xl font-display font-extrabold text-white tracking-tighter mb-2">
                    <AnimatedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs font-bold text-[#4cd7f6] uppercase tracking-[0.15em]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES ═══════════════════════════════════════════════ */}
        <section className="py-32 px-6 relative z-10 bg-[#0c1324]">
          <div className="max-w-[1400px] mx-auto features-grid">
            <div className="mb-20 max-w-2xl">
              <p className="text-xs font-bold text-[#4cd7f6] uppercase tracking-[0.2em] mb-4">Core Infrastructure</p>
              <h2 className="text-5xl font-display font-extrabold text-white tracking-[-0.03em] leading-[1.1]">
                Intelligence at scale.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className="feature-card bg-[#141b2c]/80 backdrop-blur-xl border border-[#10b981]/15 rounded-2xl p-10 hover:border-[#4edea3]/40 transition-colors duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#10b981] opacity-0 group-hover:opacity-[0.05] rounded-full blur-[40px] transition-opacity duration-700" />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-10 bg-gradient-to-br from-[#10b981] to-[#059669] text-white shadow-[0_8px_24px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform duration-500">
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-[#dce2fa] mb-4 tracking-[-0.02em]">{f.title}</h3>
                  <p className="text-[#86948a] leading-[1.6] text-[15px]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ═══════════════════════════════════════════ */}
        <section className="pipeline-section py-32 px-6 relative z-10 bg-[#070e1e] border-t border-white/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMwLjUgMjEuNWgtdi0yaDJ2Mm0tMTIgMGgtdi0yaDJ2Mm0yNCAwaC12LTJoMnYybS0xMiAwaC12LTJoMnYybTI0IDBoLXYtMmgydjJtLTEyIDBoLXYtMmgydjJtLTI0LTIyaC12LTJoMnYybS0xMiAwaC12LTJoMnYyIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] opacity-30" />
          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="mb-24 flex flex-col items-center text-center">
              <p className="text-xs font-bold text-[#10b981] uppercase tracking-[0.2em] mb-4">Process Pipeline</p>
              <h2 className="text-5xl md:text-6xl font-display font-extrabold text-white tracking-[-0.03em]">
                From Risk to Recovery in 14ms.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative">
              {/* Connecting line for desktop */}
              <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#10b981]/20 to-transparent" />
              
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className="pipeline-step bg-[#141b2c] border border-white/5 rounded-2xl p-8 relative hover:border-[#4cd7f6]/30 transition-colors duration-500"
                >
                  <div className="w-12 h-12 bg-[#0c1324] border border-white/10 rounded-full flex items-center justify-center text-[#4cd7f6] font-display font-bold text-xl mb-8 relative z-10">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 tracking-[-0.02em]">{step.title}</h3>
                  <p className="text-[#86948a] text-sm leading-[1.6]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FOOTER ═════════════════════════════════════════════════ */}
        <footer className="py-12 bg-[#0c1324] border-t border-white/5 relative z-10">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center text-white font-display font-extrabold text-sm">G</div>
              <span className="font-display font-bold text-white">GigShield Infrastructure</span>
            </div>
            <p className="text-[#86948a] text-xs font-bold uppercase tracking-[0.2em]">
              DevTrails 2026 Winner
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
