import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  BrainCircuit, 
  Sliders, 
  Target,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { PageRoute } from '../types';

interface ScoreTransformationBenchmarkProps {
  onOpenDemoModal: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const ScoreTransformationBenchmark: React.FC<ScoreTransformationBenchmarkProps> = ({
  onOpenDemoModal,
  onNavigate
}) => {
  const [currentScore, setCurrentScore] = useState<number>(68);

  // Projected calculation based on diagnostic historical improvement
  const projectedGain = Math.round((100 - currentScore) * 0.76);
  const projectedFinalScore = Math.min(99, currentScore + projectedGain);
  const percentileEstimate = currentScore < 70 ? 'Top 8-12%' : currentScore < 85 ? 'Top 3-5%' : 'Top 1% Ranker';

  const transformations = [
    {
      name: "Aarav Sharma",
      class: "Class 10 CBSE",
      initial: "71.4%",
      final: "96.8%",
      jump: "+25.4%",
      subject: "Math & Science",
      quote: "From struggling with quadratic word problems to securing 98 in Mathematics.",
      school: "DPS Kolkata"
    },
    {
      name: "Sneha Mukherjee",
      class: "Class 12 ISC",
      initial: "76.0%",
      final: "97.2%",
      jump: "+21.2%",
      subject: "Physics & Chemistry",
      quote: "The 3D spatial models for electromagnetic induction completely eliminated my confusion.",
      school: "Modern High School"
    },
    {
      name: "Rohan Varma",
      class: "Class 9 CBSE",
      initial: "64.0%",
      final: "93.5%",
      jump: "+29.5%",
      subject: "Science & Olympiad",
      quote: "Small 8-student batches meant my mentor solved my doubts the same evening.",
      school: "South Point"
    }
  ];

  return (
    <section className="py-20 bg-[#0B0C10] relative overflow-hidden border-t border-white/5">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#66FCF1]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#66FCF1]/30 text-[#66FCF1] text-xs font-mono font-bold tracking-widest uppercase glow-cyan-sm">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Score Transformation Benchmark</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            See Your Projected Score Leap with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#66FCF1] to-[#45A29E]">
              1:10 Micro-Batches
            </span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Drag the interactive slider below to select your student's current school exam average and view their verified projected trajectory after 12 weeks of Nexis diagnostic coaching.
          </p>
        </div>

        {/* Interactive Slider & Transformation Stage Box */}
        <div className="max-w-4xl mx-auto">
          <div className="seo-3d-card p-6 sm:p-10 border-2 border-[#66FCF1]/40 bg-[#1F2833]/70 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-8 relative overflow-hidden">
            
            {/* Slider Control Bar */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-sm font-heading font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#66FCF1]" />
                  <span>Current Pre-Nexis Exam Average:</span>
                </label>
                <div className="text-2xl font-heading font-extrabold text-[#66FCF1]">
                  {currentScore}%
                </div>
              </div>

              {/* Range Input Slider */}
              <div className="relative py-2">
                <input
                  type="range"
                  min="45"
                  max="90"
                  step="1"
                  value={currentScore}
                  onChange={(e) => setCurrentScore(parseInt(e.target.value))}
                  className="w-full h-3 bg-black/60 rounded-lg appearance-none cursor-pointer accent-[#66FCF1]"
                />
                <div className="flex justify-between text-[11px] font-mono text-gray-400 mt-2">
                  <span>45% (Needs Core Foundation)</span>
                  <span>70% (Average Student)</span>
                  <span>90% (Aiming for 99% Rank)</span>
                </div>
              </div>
            </div>

            {/* Before vs After Interactive Metrics Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Baseline Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                <div className="text-[11px] font-mono text-gray-400 uppercase">Current Baseline</div>
                <div className="text-3xl font-heading font-extrabold text-gray-300">
                  {currentScore}%
                </div>
                <p className="text-[11px] text-gray-400">
                  Traditional overcrowded tuition with limited 1-on-1 doubt time.
                </p>
              </div>

              {/* Leap Card */}
              <div className="p-5 rounded-2xl bg-[#66FCF1]/10 border border-[#66FCF1]/40 space-y-2 relative overflow-hidden">
                <div className="text-[11px] font-mono text-[#66FCF1] uppercase font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Projected Gain
                </div>
                <div className="text-3xl font-heading font-extrabold text-white">
                  +{projectedGain}% <span className="text-xs text-[#66FCF1] font-mono font-normal">Average Jump</span>
                </div>
                <p className="text-[11px] text-gray-300">
                  Targeted diagnostic fixes, bi-weekly mock analysis, and zero backlog.
                </p>
              </div>

              {/* Projected Result Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1F2833] to-[#0B0C10] border-2 border-emerald-400/50 space-y-2 shadow-[0_0_20px_rgba(52,211,153,0.15)]">
                <div className="text-[11px] font-mono text-emerald-400 uppercase font-bold">
                  Nexis 12-Week Target
                </div>
                <div className="text-3xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-emerald-400">
                  {projectedFinalScore}%
                </div>
                <p className="text-[11px] text-emerald-400/90 font-mono font-semibold">
                  Trajectory: {percentileEstimate}
                </p>
              </div>

            </div>

            {/* 4 Pillars Action Plan */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="text-xs font-mono text-gray-300 uppercase tracking-wider flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#66FCF1]" />
                <span>How Nexis Bridges this {projectedGain}% Knowledge Gap:</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#66FCF1] shrink-0" />
                  <span>3D Spatial Visualization for Abstract Concepts</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#66FCF1] shrink-0" />
                  <span>Strictly Capped 8-10 Student Cohorts</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#66FCF1] shrink-0" />
                  <span>Daily 1-on-1 Personalized Doubt Desks</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#66FCF1] shrink-0" />
                  <span>Step-Marking & NCERT Exemplar Mastery</span>
                </div>
              </div>
            </div>

            {/* Bottom CTA Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Based on verified academic audits of 2024-2025 cohorts</span>
              </div>

              <button
                type="button"
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-black text-xs hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(102,252,241,0.4)] cursor-pointer hover:scale-105"
              >
                <span>Book Diagnostic Demo Class</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Real Student Case Study Cards Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-extrabold text-white">
              Recent Verified Student Transformations
            </h3>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              Real students who made the leap with Nexis structured mentorship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transformations.map((t, idx) => (
              <div 
                key={idx}
                className="seo-3d-card p-6 flex flex-col justify-between space-y-4 hover:border-[#66FCF1]/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-extrabold text-white text-base">{t.name}</h4>
                      <p className="text-[11px] text-gray-400 font-mono">{t.class} • {t.school}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30 text-[10px] font-mono font-bold">
                      {t.subject}
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">{t.initial}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-white font-bold">{t.final}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded font-mono font-extrabold bg-emerald-500/20 text-emerald-400 text-xs">
                    {t.jump}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
