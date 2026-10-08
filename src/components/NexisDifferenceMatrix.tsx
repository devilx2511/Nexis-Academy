import React, { useState } from 'react';
import { 
  BrainCircuit, 
  UserCheck, 
  Activity, 
  Award, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Target, 
  Eye, 
  TrendingUp, 
  Clock 
} from 'lucide-react';
import { PageRoute } from '../types';

interface NexisDifferenceMatrixProps {
  onOpenDemoModal: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const NexisDifferenceMatrix: React.FC<NexisDifferenceMatrixProps> = ({
  onOpenDemoModal,
  onNavigate
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const pillars = [
    {
      id: 'diag',
      icon: BrainCircuit,
      color: '#66FCF1',
      badge: 'Micro-Targeted',
      title: 'AI-Powered Diagnostics',
      tagline: 'Pinpoints specific concept gaps down to formula steps in under 15 minutes.',
      description: 'Before a single class begins, our proprietary diagnostic engine tests theoretical retention, problem velocity, and step marking. We isolate weak sub-topics so study time is 100% targeted.',
      metric: '99.4% Diagnostic Accuracy',
      bullets: ['Step-by-step marking audit', 'Algorithmic formula recall tracker', 'Personalized remediation worksheets']
    },
    {
      id: 'mentor',
      icon: UserCheck,
      color: '#F59E0B',
      badge: 'Top 1% Faculty',
      title: '1-on-1 Elite Mentorship',
      tagline: 'Vetted IITians, Stanford & MIT fellows matched to the student’s learning pace.',
      description: 'No generic recorded videos or 50-student zoom calls. Every student is paired with a dedicated subject specialist who adapts derivations to their individual speed.',
      metric: '1:10 Maximum Batch Cap',
      bullets: ['Ivy & Top Tier Olympiad rankers', 'Real-time whiteboard step correction', 'Direct 24/7 WhatsApp academic desk']
    },
    {
      id: 'parent',
      icon: Eye,
      color: '#6366F1',
      badge: 'Total Visibility',
      title: 'Parent Command Center',
      tagline: 'Instant mobile insight into live attendance, weekly score trends, and mentor notes.',
      description: 'Parents receive post-session audio summaries, weekly proctored mock rank charts, and direct access to schedule parent-faculty alignment conferences.',
      metric: '100% Transparent Audits',
      bullets: ['Live attendance confirmation pings', 'Weekly score leap curve tracking', 'Monthly PDF academic report cards']
    },
    {
      id: 'guarantee',
      icon: Award,
      color: '#10B981',
      badge: 'Proven Track Record',
      title: 'Guaranteed Outcome Pathways',
      tagline: 'Empowering students to achieve 95%+ Board scores and top 1% competitive percentiles.',
      description: 'Backed by structured 12-week sprint benchmarks, our curriculum is engineered for tangible grade leap transformations across CBSE, ICSE, IB, and competitive exams.',
      metric: '+24% Avg Score Boost',
      bullets: ['Distinction guarantee framework', 'Scholarship merit waivers up to 40%', 'Unconditional 3-class refund policy']
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#070A12] dark:bg-[#070A12] light:bg-slate-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 text-left">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[#66FCF1] text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/30">
              The Nexis Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white dark:text-white light:text-slate-900">
              Engineered for Academic Superiority.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600">
              Traditional tuition relies on passive lecture halls. Nexis Academy re-engineers learning into an active, diagnostic-driven feedback loop.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDemoModal}
              className="px-5 py-2.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(102,252,241,0.4)] cursor-pointer"
            >
              Book Diagnostic Assessment
            </button>
          </div>
        </div>

        {/* 4 Interactive Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isActive = activeCardIndex === idx;

            return (
              <div
                key={p.id}
                onMouseEnter={() => setActiveCardIndex(idx)}
                onClick={() => setActiveCardIndex(idx)}
                className={`seo-3d-card p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-6 text-left group ${
                  isActive 
                    ? 'border-[#66FCF1]/60 shadow-[0_20px_40px_rgba(102,252,241,0.2)] -translate-y-2' 
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg"
                      style={{ 
                        backgroundColor: `${p.color}18`, 
                        borderColor: `${p.color}40`,
                        borderWidth: '1px'
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: p.color }} />
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300">
                      {p.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-heading font-black text-white dark:text-white light:text-slate-900 group-hover:text-[#66FCF1] transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-300 dark:text-slate-300 light:text-slate-600 mt-1.5 leading-relaxed">
                      {p.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Bullets */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    {p.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom Metric Pill */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold" style={{ color: p.color }}>
                    {p.metric}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
