import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  Zap, 
  ShieldCheck, 
  Video, 
  Clock, 
  Calendar, 
  Flame, 
  ChevronRight,
  Play,
  Volume2
} from 'lucide-react';
import { PageRoute, Course } from '../types';
import { AutoSuggestCourseSearch } from './AutoSuggestCourseSearch';

interface NexisLuxuryHeroProps {
  onOpenDemoModal: () => void;
  onNavigate: (route: PageRoute) => void;
  onSelectCourse?: (course: Course) => void;
}

export const NexisLuxuryHero: React.FC<NexisLuxuryHeroProps> = ({
  onOpenDemoModal,
  onNavigate,
  onSelectCourse
}) => {
  const [selectedGrade, setSelectedGrade] = useState('Class 10 (Board Sprint)');
  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [selectedGoal, setSelectedGoal] = useState('95%+ Distinction');
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  // Audio wave visualizer state simulation
  const [waveHeights, setWaveHeights] = useState<number[]>([40, 75, 55, 90, 60, 80, 45, 95, 70, 50, 85, 65]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 65) + 30));
    }, 180);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-hidden bg-radial-mesh">
      
      {/* Background ambient lighting orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-[#6366F1]/15 via-[#66FCF1]/10 to-amber-400/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split View: Left Content & Filter Dock / Right Interactive Classroom Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Authority, Value Proposition, Real-Time AutoSuggest Dock */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Micro-badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/30 backdrop-blur-md text-[#66FCF1] text-xs font-mono font-bold tracking-wide shadow-[0_0_15px_rgba(102,252,241,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Rated #1 Elite Tutoring Platform for K-12 & Test Prep</span>
            </div>

            {/* Main Luxury Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-heading font-black tracking-tight leading-[1.1] text-white dark:text-white light:text-slate-950">
              Personalized Mentorship Engineered for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] via-[#6366F1] to-amber-400">
                Top 1% Outcomes.
              </span>
            </h1>

            {/* Authoritative Subtext */}
            <p className="text-base sm:text-lg text-slate-300 dark:text-slate-300 light:text-slate-600 max-w-2xl leading-relaxed font-sans">
              1-on-1 mentorship engineered for top 1% outcomes. Adaptive diagnostic engines, Ivy-League vetted mentors, and complete parent oversight dashboards ensure measurable rank leaps.
            </p>

            {/* INTERACTIVE COURSE FINDER & AUTO-SUGGEST DOCK */}
            <div className="seo-3d-card p-4 sm:p-5 rounded-3xl border border-white/20 dark:border-white/20 light:border-slate-200 bg-[#0B0C10]/80 dark:bg-[#0B0C10]/80 light:bg-white shadow-2xl space-y-4">
              
              {/* Auto-suggest Search Bar */}
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                  Instant Course & Syllabus Finder
                </span>
                <AutoSuggestCourseSearch
                  dockMode={true}
                  onSelectCourse={onSelectCourse}
                  onOpenDemoForCourse={() => onOpenDemoModal()}
                  placeholder="Filter by subject or exam (e.g. AP Physics, Class 10 Math, NEET)..."
                />
              </div>

              {/* 3 Quick-Selector Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Grade Level
                  </label>
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 dark:bg-black/60 light:bg-slate-100 border border-white/10 dark:border-white/15 light:border-slate-300 text-xs font-semibold text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-[#66FCF1]"
                  >
                    <option value="Class 8-9 (Foundation)">Class 8-9 (Foundation)</option>
                    <option value="Class 10 (Board Sprint)">Class 10 (Board Sprint)</option>
                    <option value="Class 11 (JEE / NEET)">Class 11 (JEE / NEET)</option>
                    <option value="Class 12 (Board & Rank)">Class 12 (Board & Rank)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Core Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 dark:bg-black/60 light:bg-slate-100 border border-white/10 dark:border-white/15 light:border-slate-300 text-xs font-semibold text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-[#66FCF1]"
                  >
                    <option value="Physics">Physics (Optics & Mechanics)</option>
                    <option value="Mathematics">Mathematics (Calculus & Algebra)</option>
                    <option value="Chemistry">Chemistry (Organic & Physical)</option>
                    <option value="Biology">Biology (NEET Genetics)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Learning Goal
                  </label>
                  <select
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 dark:bg-black/60 light:bg-slate-100 border border-white/10 dark:border-white/15 light:border-slate-300 text-xs font-semibold text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-[#66FCF1]"
                  >
                    <option value="95%+ Distinction">95%+ Distinction</option>
                    <option value="Olympiad Gold">Olympiad & SAT 1550+</option>
                    <option value="Concept Mastery">Concept Mastery</option>
                    <option value="Score Leap +25%">Score Leap +25%</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0B0C10] font-heading font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-102 transition-all cursor-pointer"
                  id="hero-book-diagnostic-btn"
                >
                  <Sparkles className="w-4 h-4 text-[#0B0C10]" />
                  <span>Book Free Diagnostic Session</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Explore 18 Programs</span>
                  <ChevronRight className="w-4 h-4 text-[#66FCF1]" />
                </button>
              </div>

            </div>

            {/* Social Proof Strip */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex -space-x-2.5">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
                ].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="Nexis Scholar"
                    className="w-9 h-9 rounded-full border-2 border-[#0B0C10] object-cover ring-2 ring-[#66FCF1]/40"
                  />
                ))}
              </div>

              <div className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700">
                <span className="font-extrabold text-[#66FCF1] font-mono">98.4%</span> Score Enhancement across{' '}
                <strong className="text-white dark:text-white light:text-slate-900 font-bold">5,000+ Enrolled Students</strong>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Simulated Classroom & Floating Metric Widgets */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Interactive Live Video Class Card */}
            <div className="seo-3d-card p-5 sm:p-6 rounded-3xl border border-white/20 bg-gradient-to-b from-[#1F2833]/90 via-[#0B0C10] to-black shadow-[0_25px_60px_rgba(0,0,0,0.8)] space-y-4">
              
              {/* Card Top: Live Badge, Mentor Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#66FCF1] ring-2 ring-[#66FCF1]/30">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                        alt="Dr. Sarah Jenkins"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-heading font-bold text-white">Dr. Sarah Jenkins</h4>
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/15 px-1.5 py-0.2 rounded border border-amber-400/30">
                        MIT
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono">Senior Physics & Mechanics Fellow</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-mono font-bold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>LIVE 1-ON-1</span>
                </div>
              </div>

              {/* Video Simulation Canvas / Window */}
              <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 flex flex-col justify-between p-4 group">
                {/* Background Image of Mentor in Studio */}
                <img 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" 
                  alt="Live Interactive Class Session"
                  className="absolute inset-0 w-full h-full object-cover opacity-35 filter contrast-125"
                />
                
                {/* Top overlay pills */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#66FCF1] border border-[#66FCF1]/30">
                    Topic: Advanced Wave Optics & Snell's Law
                  </span>
                  <div className="flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded-md text-[10px] font-mono text-emerald-400">
                    <Clock className="w-3 h-3" />
                    <span>34:12</span>
                  </div>
                </div>

                {/* Animated Audio Spectrum Waveform */}
                <div className="relative z-10 flex items-end justify-center gap-1 h-12">
                  {waveHeights.map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-full bg-gradient-to-t from-[#6366F1] to-[#66FCF1] transition-all duration-150 shadow-[0_0_8px_#66FCF1]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                {/* Bottom Formula overlay banner */}
                <div className="relative z-10 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono text-white">
                  <span className="text-[#66FCF1]">n₁ sin(θ₁) = n₂ sin(θ₂)</span>
                  <span className="text-amber-400 text-[10px] font-bold">Step 3 Verified</span>
                </div>
              </div>

              {/* Classroom Control Strip */}
              <div className="flex items-center justify-between pt-1 text-xs text-slate-300">
                <span className="font-mono text-[11px] text-slate-400">
                  Whiteboard: <strong className="text-white">Active Synced</strong>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold">
                  Latency: 14ms (Ultra-Low)
                </span>
              </div>

            </div>

            {/* FLOATING CARD 1: Score Boost Analytics */}
            <div className="absolute -top-6 -right-3 sm:-right-6 seo-3d-card p-3 sm:p-4 rounded-2xl border border-emerald-500/40 bg-black/90 shadow-[0_15px_30px_rgba(16,185,129,0.25)] flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-left font-mono">
                <span className="text-[10px] text-slate-400 block">AP Physics Diagnostic</span>
                <span className="text-sm font-heading font-black text-emerald-400">+24% Score Boost</span>
              </div>
            </div>

            {/* FLOATING CARD 2: Countdown / Next Session */}
            <div className="absolute -bottom-6 -left-3 sm:-left-6 seo-3d-card p-3 sm:p-4 rounded-2xl border border-amber-400/40 bg-black/90 shadow-[0_15px_30px_rgba(245,158,11,0.25)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left font-mono">
                <span className="text-[10px] text-slate-400 block">Next 1-on-1 Mentorship</span>
                <span className="text-xs font-bold text-white">Today at 5:00 PM</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
