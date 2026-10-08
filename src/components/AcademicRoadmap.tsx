import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  Award, 
  BookOpen, 
  Zap, 
  Compass, 
  Star, 
  ChevronRight, 
  Flame,
  ShieldCheck,
  Trophy
} from 'lucide-react';
import { PageRoute } from '../types';

interface AcademicRoadmapProps {
  onOpenDemoModal?: (subject?: string) => void;
  onNavigate?: (route: PageRoute) => void;
}

interface RoadmapStage {
  id: string;
  stepNumber: string;
  phaseTitle: string;
  classes: string;
  ageRange: string;
  subtitle: string;
  accentColor: string;
  glowColor: string;
  badgeBg: string;
  icon: React.ReactNode;
  description: string;
  keyTargets: string[];
  pillars: { title: string; desc: string }[];
  milestone: string;
  duration: string;
  stats: { label: string; value: string }[];
}

export const AcademicRoadmap: React.FC<AcademicRoadmapProps> = ({
  onOpenDemoModal,
  onNavigate
}) => {
  const stages: RoadmapStage[] = [
    {
      id: 'foundation',
      stepNumber: 'STAGE 01',
      phaseTitle: 'Junior Foundation & Aptitude',
      classes: 'Classes 6 – 8',
      ageRange: 'Ages 11-13',
      subtitle: 'Building Logical Reasoning & Scientific Curiosity',
      accentColor: '#66FCF1',
      glowColor: 'rgba(102, 252, 241, 0.4)',
      badgeBg: 'bg-[#66FCF1]/10 text-[#66FCF1] border-[#66FCF1]/30',
      icon: <Compass className="w-5 h-5 text-[#66FCF1]" />,
      description: 'Ignite logical thinking, spatial visualization, and mathematical intuition before high school. Students transition from rote learning to inquiry-driven analytical problem solving.',
      keyTargets: ['IMO & NSO Junior Olympiads', 'Mental Aptitude & Reasoning', '3D Spatial Geometry Basics', 'Hands-On Physics Concepts'],
      pillars: [
        { title: 'Interactive 3D Visualizations', desc: 'Abstract math & physics concepts brought to life visually.' },
        { title: 'Micro-Batch Attention', desc: 'Maximum 12 students per batch to ensure foundational clarity.' },
        { title: 'Curiosity Experiments', desc: 'Real-world application of scientific principles.' }
      ],
      milestone: 'Top 5% Rank in Regional Math Olympiad & Rock-Solid Conceptual Foundation',
      duration: '1 - 3 Years',
      stats: [
        { label: 'Olympiad Rankers', value: '88%' },
        { label: 'Math Aptitude Jump', value: '+3.5x' },
        { label: 'Batch Size', value: 'Max 12' }
      ]
    },
    {
      id: 'boards',
      stepNumber: 'STAGE 02',
      phaseTitle: 'Board Sprint & NTSE Gateway',
      classes: 'Classes 9 – 10',
      ageRange: 'Ages 14-15',
      subtitle: 'Class 10 Board Exam Dominance & Early Competitive Edge',
      accentColor: '#45A29E',
      glowColor: 'rgba(69, 162, 158, 0.4)',
      badgeBg: 'bg-[#45A29E]/15 text-[#66FCF1] border-[#45A29E]/40',
      icon: <Target className="w-5 h-5 text-[#45A29E]" />,
      description: 'Master Class 10 Board Exam answer writing with surgical accuracy while establishing a high-speed foundation for future JEE/NEET competitive exams.',
      keyTargets: ['Class 10 Board Exam (95%+ Target)', 'NTSE & State Science Talent', 'Advanced Physics Numericals', 'Calculus-Prep Mathematics'],
      pillars: [
        { title: 'Board Marking Scheme Drills', desc: 'Step-by-step guidance to secure 100/100 marks in Science & Math.' },
        { title: 'Speed & Accuracy Vaults', desc: 'Weekly timed numerical solving sessions.' },
        { title: '1-on-1 Faculty Mentorship', desc: 'Individual diagnostic tracking for every student.' }
      ],
      milestone: '95%+ Board Exam Aggregate & Early JEE/NEET Readiness Certificate',
      duration: '2 Years',
      stats: [
        { label: 'Avg Board Score', value: '94.8%' },
        { label: '100/100 Marks Scored', value: '42%' },
        { label: 'Weekly Mock Tests', value: 'Every Sat' }
      ]
    },
    {
      id: 'competitive',
      stepNumber: 'STAGE 03',
      phaseTitle: 'Competitive Launchpad',
      classes: 'Classes 11 – 12',
      ageRange: 'Ages 16-17',
      subtitle: 'JEE Main, JEE Advanced & NEET Medical Dominance',
      accentColor: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
      icon: <Zap className="w-5 h-5 text-purple-400" />,
      description: 'Rigorous 2-year integrated training engineered for top AIR ranks in JEE Main/Advanced and NEET Medical. Includes CBT test series, error analysis desks, and rank booster drills.',
      keyTargets: ['JEE Main & JEE Advanced AIR Ranks', 'NEET-UG Medical Entrance', 'Class 12 Board Centum (100%)', 'KVPY & Olympiad Gold'],
      pillars: [
        { title: 'All-India CBT Test Series', desc: 'Simulated computer-based exams matching real exam software.' },
        { title: 'Error-Desk Elimination', desc: 'Deep analytics pinpointing conceptual gaps.' },
        { title: 'Ex-IITian & Doctor Faculty', desc: 'Direct learning from veteran subject specialists.' }
      ],
      milestone: 'Top 1% Percentile Qualification in JEE / NEET & Class 12 Board Distinction',
      duration: '2 Years',
      stats: [
        { label: 'JEE/NEET Qualified', value: '91.4%' },
        { label: 'Top 1000 AIR Ranks', value: '18 Students' },
        { label: 'CBT Practice Tests', value: '120+' }
      ]
    },
    {
      id: 'university',
      stepNumber: 'STAGE 04',
      phaseTitle: 'Premier University & Career Triumph',
      classes: 'Higher Education',
      ageRange: 'Post Class 12',
      subtitle: 'Admissions into IITs, NITs, AIIMS & Top Global Institutes',
      accentColor: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
      icon: <Trophy className="w-5 h-5 text-emerald-400" />,
      description: 'The culmination of academic dedication: admission to premier tier-1 engineering, medical, and scientific research universities across India and internationally.',
      keyTargets: ['IIT Bombay, Delhi, Madras, Kanpur', 'AIIMS New Delhi & Top Govt Medical', 'NITs, BITS Pilani, IISc Bangalore', 'Global Tech & Scientific Leadership'],
      pillars: [
        { title: 'Counseling & Choice Filling', desc: 'Strategic JOSAA & MCC counseling assistance.' },
        { title: 'Alumni Network Mentorship', desc: 'Connect with Nexis seniors thriving at IITs & AIIMS.' },
        { title: 'Lifelong Learning Guild', desc: 'Continued guidance for higher research and careers.' }
      ],
      milestone: 'Direct Tier-1 University Selection & High-Impact Career Launch',
      duration: 'Lifelong Network',
      stats: [
        { label: 'Tier-1 Admission', value: '96.2%' },
        { label: 'IIT/AIIMS Selections', value: '350+' },
        { label: 'Alumni Network', value: '1,200+' }
      ]
    }
  ];

  const [activeStageId, setActiveStageId] = useState<string>('boards');
  const activeStage = stages.find((s) => s.id === activeStageId) || stages[1];

  return (
    <section className="py-24 bg-[#0B0C10] text-white relative overflow-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#66FCF1]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#45A29E]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <motion.div 
          className="text-center space-y-4 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] text-xs font-mono font-bold tracking-wider uppercase glow-cyan-sm">
            <Sparkles className="w-4 h-4 text-[#66FCF1]" />
            <span>3D ACADEMIC JOURNEY & CAREER ROADMAP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight">
            From Foundational Curiosity to <span className="text-gradient">Top University Triumph</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Every ranker's journey follows a battle-tested progression. Explore how Nexis Academy systematically transforms school students into competitive exam champions.
          </p>
        </motion.div>

        {/* 3D Timeline Visual Track */}
        <div className="space-y-10">
          
          {/* Horizontal Desktop / Vertical Mobile Timeline Nodes */}
          <div className="relative">
            
            {/* Connecting Neon Beam Line */}
            <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-[#66FCF1] via-purple-500 to-emerald-400 -translate-y-1/2 rounded-full opacity-30 pointer-events-none" />

            {/* Stage Selector Nodes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {stages.map((stage, idx) => {
                const isActive = stage.id === activeStageId;
                return (
                  <motion.button
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    className={`relative text-left p-5 rounded-2xl transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#1F2833] border-[#66FCF1] shadow-[0_0_25px_rgba(102,252,241,0.25)] scale-[1.02]'
                        : 'bg-black/40 hover:bg-[#1F2833]/60 border-white/10 hover:border-white/25'
                    }`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active Pulse Glow Bar */}
                    {isActive && (
                      <div 
                        className="absolute -top-1 left-4 right-4 h-1 rounded-full glow-cyan-sm"
                        style={{ backgroundColor: stage.accentColor }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${stage.badgeBg}`}>
                        {stage.stepNumber}
                      </span>
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                        {stage.icon}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-gray-400 block">{stage.classes}</span>
                      <h3 className="font-heading font-extrabold text-base text-white group-hover:text-[#66FCF1]">
                        {stage.phaseTitle}
                      </h3>
                      <p className="text-[11px] text-gray-400 line-clamp-1">{stage.subtitle}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#66FCF1]">
                      <span>{stage.ageRange}</span>
                      <div className="flex items-center gap-1 font-bold">
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

          </div>

          {/* ACTIVE STAGE SPOTLIGHT CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="seo-3d-card p-6 sm:p-10 border border-white/20 bg-gradient-to-br from-[#1F2833]/90 via-[#0B0C10] to-[#1F2833]/80 space-y-8 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: activeStage.accentColor }}
              />

              {/* Stage Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${activeStage.badgeBg}`}>
                      {activeStage.stepNumber} • {activeStage.classes}
                    </span>
                    <span className="text-xs font-mono text-gray-400">Duration: {activeStage.duration}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                    {activeStage.phaseTitle}
                  </h3>
                  <p className="text-sm text-gray-300 max-w-2xl">{activeStage.description}</p>
                </div>

                {/* Quick Stat Pill Highlights */}
                <div className="grid grid-cols-3 gap-3 shrink-0">
                  {activeStage.stats.map((st, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-black/50 border border-white/10 text-center space-y-0.5">
                      <span className="text-lg sm:text-xl font-heading font-extrabold text-[#66FCF1] block">{st.value}</span>
                      <span className="text-[10px] text-gray-400 font-mono uppercase block">{st.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid: Key Curriculum Targets & Pedagogical Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Target Focus Exams & Competitions */}
                <div className="space-y-4">
                  <h4 className="text-sm font-mono font-bold text-[#66FCF1] uppercase tracking-wider flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span>Target Exams & Competitions</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStage.keyTargets.map((target, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-semibold text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-[#66FCF1] shrink-0" />
                        <span>{target}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pedagogical Pillars */}
                <div className="space-y-4">
                  <h4 className="text-sm font-mono font-bold text-[#45A29E] uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Nexis Methodology & Support</span>
                  </h4>

                  <div className="space-y-2.5">
                    {activeStage.pillars.map((pillar, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs space-y-1">
                        <span className="font-bold text-white block">{pillar.title}</span>
                        <p className="text-gray-400 text-[11px]">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Milestone Banner & CTA */}
              <div className="p-5 rounded-2xl bg-black/60 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">STAGE MILESTONE</span>
                    <p className="text-xs sm:text-sm font-bold text-white">{activeStage.milestone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                  {onOpenDemoModal && (
                    <button
                      onClick={() => onOpenDemoModal(activeStage.phaseTitle)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(102,252,241,0.3)] hover:scale-102 transition-all cursor-pointer"
                    >
                      <span>Enroll / Book Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};
