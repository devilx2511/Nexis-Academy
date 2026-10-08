import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { 
  UserCheck, 
  Eye, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { PageRoute } from '../types';

interface DualDashboardPreviewProps {
  onOpenDemoModal: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const DualDashboardPreview: React.FC<DualDashboardPreviewProps> = ({
  onOpenDemoModal,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'student' | 'parent'>('student');

  const progressData = [
    { week: 'W1', score: 68, benchmark: 75 },
    { week: 'W3', score: 74, benchmark: 78 },
    { week: 'W5', score: 81, benchmark: 82 },
    { week: 'W7', score: 87, benchmark: 86 },
    { week: 'W9', score: 92, benchmark: 90 },
    { week: 'W11', score: 96, benchmark: 93 },
    { week: 'W12', score: 98, benchmark: 95 },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0C10] dark:bg-[#0B0C10] light:bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Command Center Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white dark:text-white light:text-slate-900">
            One Platform. Dual Perspectives.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-600">
            Empowering students with deep analytical clarity while providing parents with 100% transparent session audits and real-time score milestones.
          </p>

          {/* Perspective Switcher Buttons */}
          <div className="inline-flex p-1.5 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-md text-xs sm:text-sm font-heading font-bold shadow-xl">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'student'
                  ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_20px_rgba(102,252,241,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>Student Command Center</span>
            </button>

            <button
              onClick={() => setActiveTab('parent')}
              className={`px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'parent'
                  ? 'bg-amber-400 text-[#0B0C10] shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Parent Oversight Portal</span>
            </button>
          </div>
        </div>

        {/* Dashboard Frame Container */}
        <div className="seo-3d-card p-6 sm:p-10 rounded-3xl border border-white/20 bg-gradient-to-b from-[#1F2833]/80 via-[#0B0C10] to-black shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-left">
          
          {activeTab === 'student' ? (
            /* STUDENT VIEW */
            <div className="space-y-8 animate-fadeIn">
              
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-mono text-[#66FCF1] font-bold uppercase tracking-wider block">
                    Welcome Back, Scholar Alex
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Class 10 CBSE Sprint • Section Alpha
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold">
                    🔥 24 Days Streak
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                    Top 1% Cohort Rank
                  </span>
                </div>
              </div>

              {/* Grid: Recharts Score Curve & Daily Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left 7 cols: Interactive Recharts Graph */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold">
                        Diagnostic Score Progression
                      </h4>
                      <div className="text-lg font-bold text-white mt-0.5">
                        68% Baseline → 98% Distinction Mastery
                      </div>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      +30% Leap Achieved
                    </span>
                  </div>

                  <div className="h-56 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#66FCF1" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#66FCF1" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                        <XAxis dataKey="week" stroke="#94A3B8" fontSize={11} tickLine={false} />
                        <YAxis domain={[50, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#0B0C10', 
                            borderColor: 'rgba(102,252,241,0.4)',
                            borderRadius: '10px',
                            color: '#fff',
                            fontSize: '11px',
                            fontFamily: 'monospace'
                          }}
                        />
                        <Area type="monotone" dataKey="score" stroke="#66FCF1" strokeWidth={3} fill="url(#cyanGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right 5 cols: Today's Action Checklist */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                    Today's Academic Priority List
                  </h4>

                  <div className="space-y-2 text-xs">
                    {[
                      { title: 'Live 1-on-1: Ray Optics Step Marking', time: '5:00 PM', status: 'Upcoming' },
                      { title: 'Calculus BC Speed Drill (15 PYQs)', time: 'Completed', status: 'Done' },
                      { title: 'Organic Chemistry Functional Group Quiz', time: 'Due 9 PM', status: 'Pending' }
                    ].map((t, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${t.status === 'Done' ? 'text-emerald-400' : 'text-slate-500'}`} />
                          <span className="text-slate-200 font-medium">{t.title}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          t.status === 'Done' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : t.status === 'Upcoming'
                            ? 'bg-amber-400/20 text-amber-300'
                            : 'bg-white/10 text-slate-400'
                        }`}>
                          {t.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => onNavigate('portal')}
                    className="w-full mt-2 py-2.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-black text-xs flex items-center justify-center gap-1.5 hover:bg-[#66FCF1]/90 transition-all cursor-pointer"
                  >
                    <span>Enter Full Student Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ) : (
            /* PARENT VIEW */
            <div className="space-y-8 animate-fadeIn">
              
              {/* Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                    Parent Command & Audit Portal
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Alex Sharma • Academic Audit Report
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert("Downloading verified student performance audit report (PDF)...")}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono font-bold text-white flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Download Monthly PDF</span>
                  </button>
                </div>
              </div>

              {/* Grid: Key Audits & Mentor Voice Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400">Live Attendance Audit</div>
                  <div className="text-3xl font-heading font-black text-emerald-400">100%</div>
                  <p className="text-xs text-slate-400">All 16 scheduled 1-on-1 sessions attended with active audio engagement.</p>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400">Projected Board Distinction</div>
                  <div className="text-3xl font-heading font-black text-amber-400">97.4%</div>
                  <p className="text-xs text-slate-400">Calculated across 8 proctored CBSE mock exam step-marking audits.</p>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-2">
                  <div className="text-[11px] font-mono text-slate-400">Homework Compliance</div>
                  <div className="text-3xl font-heading font-black text-[#66FCF1]">98.2%</div>
                  <p className="text-xs text-slate-400">Average submission speed: 4 hours ahead of mentor deadline.</p>
                </div>

              </div>

              {/* Mentor Direct Log */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-black to-black border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold text-amber-300">
                      Weekly Mentor Audio & Written Memo
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Yesterday at 6:30 PM</span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "Dear Mrs. Sharma, Alex has conquered the optics numerical section. His step-by-step layout now precisely fulfills the 5-mark CBSE criteria. We are shifting emphasis to time-bounded 3-mark conceptual proofs for next week."
                </p>

                <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-400">
                  <span>Mentor: Dr. Sarah Jenkins (MIT)</span>
                  <button
                    onClick={onOpenDemoModal}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Request Alignment Call →
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
