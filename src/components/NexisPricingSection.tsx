import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, HelpCircle } from 'lucide-react';
import { PageRoute } from '../types';

interface NexisPricingSectionProps {
  onOpenDemoModal: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const NexisPricingSection: React.FC<NexisPricingSectionProps> = ({
  onOpenDemoModal,
  onNavigate
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const tiers = [
    {
      id: 'essential',
      name: 'Essential Mentorship',
      badge: 'Core Foundation',
      popular: false,
      monthlyPrice: '₹4,500',
      annualPrice: '₹3,600',
      description: 'Ideal for students seeking regular syllabus mastery and structured weekly homework assistance.',
      features: [
        '2 Guided Sessions per week (Micro-Batch 1:8)',
        'Comprehensive NCERT & Board Syllabus Coverage',
        'Weekly Chapter-Wise Diagnostic Tests',
        'Direct Doubt Clearing on WhatsApp',
        'Parent Monthly Attendance Report'
      ],
      ctaText: 'Start with Essential',
      highlightColor: '#66FCF1'
    },
    {
      id: 'premier',
      name: 'Nexis Premier',
      badge: 'Most Popular • Distinction Track',
      popular: true,
      monthlyPrice: '₹7,500',
      annualPrice: '₹5,900',
      description: 'Our flagship 1-on-1 personalized pathway engineered for 95%+ Board distinction and top percentiles.',
      features: [
        '3 to 4 Guided Sessions per week (1-on-1 + 1:5 Lab)',
        'Full AI Diagnostic Step-Marking Audit Engine',
        'Proctored Full Mock Exams with Rank Benchmarking',
        'Dedicated Stanford / MIT / IIT Specialist Mentor',
        'Real-Time Parent Command Center & WhatsApp Desk',
        'Unconditional 3-Class Full Refund Guarantee'
      ],
      ctaText: 'Claim Premier Scholarship',
      highlightColor: '#F59E0B'
    },
    {
      id: 'elite',
      name: 'Ivy & Elite Track',
      badge: 'Olympiad & Top 0.1%',
      popular: false,
      monthlyPrice: '₹12,000',
      annualPrice: '₹9,800',
      description: 'Ultra-intensive tailored mentorship for JEE Advanced, NEET top-rankers, and International Olympiads.',
      features: [
        'Unlimited 1-on-1 On-Demand Faculty Access',
        'Advanced Problem Solving & Research Methodology',
        'Curated Ivy League & Top Tier Mentorship Network',
        'Personalized Study Blueprint & Stress Optimization',
        'Priority Diagnostic Alarms & 24/7 Hotline'
      ],
      ctaText: 'Apply for Elite Track',
      highlightColor: '#6366F1'
    }
  ];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#070A12] dark:bg-[#070A12] light:bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Investment in Excellence</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white dark:text-white light:text-slate-900">
            Investment in Verified Academic Outcomes.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600">
            Capped micro-batches, dedicated Ivy & IIT vetted mentors, and merit scholarship waivers up to 40%.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-md text-xs font-mono font-bold">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Plan (Save 20%)</span>
              <span className="ml-1.5 px-1.5 py-0.2 rounded bg-black/30 text-[10px] text-black font-extrabold">
                Recommended
              </span>
            </button>

            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white/20 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => {
            const isPopular = tier.popular;

            return (
              <div
                key={tier.id}
                className={`seo-3d-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-amber-400/80 bg-gradient-to-b from-amber-950/30 via-black to-black shadow-[0_0_40px_rgba(245,158,11,0.25)] lg:-translate-y-4'
                    : 'border-white/10 hover:border-white/25 bg-black/50'
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-heading font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.6)]">
                    {tier.badge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Badge */}
                  <div>
                    {!isPopular && (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                        {tier.badge}
                      </span>
                    )}
                    <h3 className="text-2xl font-heading font-extrabold text-white mt-2">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-heading font-black text-white">
                        {billingCycle === 'annual' ? tier.annualPrice : tier.monthlyPrice}
                      </span>
                      <span className="text-xs font-mono text-slate-400">/ month</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-400 block mt-1">
                      {billingCycle === 'annual' ? 'Billed annually with scholarship waiver' : 'Billed monthly, cancel anytime'}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block font-bold">
                      Everything Included:
                    </span>
                    {tier.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-[#66FCF1] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-8">
                  <button
                    onClick={onOpenDemoModal}
                    className={`w-full py-3.5 rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:scale-102'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-[#66FCF1]/50'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400 mt-3">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Includes 1-on-1 Diagnostic Class</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
