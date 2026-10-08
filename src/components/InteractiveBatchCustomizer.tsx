import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Users, 
  Zap, 
  TrendingUp, 
  Award,
  ShieldCheck,
  Calendar,
  Target
} from 'lucide-react';
import { PageRoute } from '../types';

interface InteractiveBatchCustomizerProps {
  onOpenDemoForCourse: (courseName: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const InteractiveBatchCustomizer: React.FC<InteractiveBatchCustomizerProps> = ({
  onOpenDemoForCourse,
  onNavigate
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('Class 10');
  const [selectedBoard, setSelectedBoard] = useState<string>('CBSE');
  const [selectedGoal, setSelectedGoal] = useState<'board' | 'jee' | 'neet' | 'foundation'>('board');
  const [selectedPace, setSelectedPace] = useState<'standard' | 'intensive'>('intensive');

  const classOptions = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Dropper'];
  const boardOptions = ['CBSE', 'ICSE / ISC', 'State Board'];

  const goalData = {
    board: {
      title: '95%+ Board Distinction Sprint',
      subjects: ['Mathematics (Standard)', 'Physics', 'Chemistry', 'Biology / Comp. Sc.'],
      weeklyHours: selectedPace === 'intensive' ? 10 : 6,
      batchCap: 8,
      doubtDesks: 'Daily 1-on-1 Unlimited',
      diagnostics: 'Bi-Weekly Board Pattern Mocks',
      projectedLeap: '+26% to +34%',
      targetExam: '2026 Board Final Examination',
      badgeColor: 'text-[#66FCF1] border-[#66FCF1]/40 bg-[#66FCF1]/10'
    },
    jee: {
      title: 'JEE Main & Advanced Foundation',
      subjects: ['Advanced Calculus & Algebra', 'Mechanics & Modern Physics', 'Physical & Organic Chemistry'],
      weeklyHours: selectedPace === 'intensive' ? 14 : 9,
      batchCap: 6,
      doubtDesks: '24/7 IITian Mentor Access',
      diagnostics: 'NTA CBT Simulation Software',
      projectedLeap: 'Top 1% Percentile Trajectory',
      targetExam: 'JEE Main 2026/2027',
      badgeColor: 'text-amber-400 border-amber-400/40 bg-amber-400/10'
    },
    neet: {
      title: 'NEET-UG Medical Excellence Track',
      subjects: ['NCERT Line-by-Line Biology', 'High-Yield Physics Numericals', 'Organic & Inorganic Chemistry'],
      weeklyHours: selectedPace === 'intensive' ? 14 : 9,
      batchCap: 6,
      doubtDesks: 'Doctor-Led Concept Desks',
      diagnostics: 'OMR Speed & Accuracy Drills',
      projectedLeap: '680+ Target Score Roadmap',
      targetExam: 'NEET-UG 2026/2027',
      badgeColor: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10'
    },
    foundation: {
      title: 'Early Science & Math Olympiad Core',
      subjects: ['Conceptual Physics', 'Experimental Chemistry', 'Mathematical Olympiad Logic'],
      weeklyHours: selectedPace === 'intensive' ? 8 : 5,
      batchCap: 8,
      doubtDesks: 'Visual Diagnostic Orientation',
      diagnostics: 'Chapter Concept Masteries',
      projectedLeap: 'First-Principles Fluency',
      targetExam: 'School Topper & Olympiads',
      badgeColor: 'text-purple-400 border-purple-400/40 bg-purple-400/10'
    }
  };

  const activePlan = goalData[selectedGoal];

  return (
    <section className="py-20 bg-radial-mesh relative overflow-hidden border-t border-white/10">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#66FCF1]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#45A29E]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#66FCF1]/30 text-[#66FCF1] text-xs font-mono font-bold tracking-widest uppercase glow-cyan-sm">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Course & Batch Customizer</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-heading font-black text-white tracking-tight">
            Build Your Student's{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#66FCF1] to-[#45A29E]">
              Custom Academic Blueprint
            </span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Select your target grade, curriculum board, and academic goal to instantly generate your personalized learning schedule, micro-batch size, and mentor roadmap.
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Class */}
            <div className="seo-3d-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#66FCF1]/20 text-[#66FCF1] flex items-center justify-center text-[11px] font-bold">1</span>
                  Select Academic Standard
                </label>
                <span className="text-xs text-[#66FCF1] font-mono font-semibold">{selectedClass}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {classOptions.map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClass(cls)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
                      selectedClass === cls
                        ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_15px_rgba(102,252,241,0.4)] scale-105'
                        : 'bg-black/40 text-gray-300 hover:text-white border border-white/10 hover:border-white/25'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Board & Stream */}
            <div className="seo-3d-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#66FCF1]/20 text-[#66FCF1] flex items-center justify-center text-[11px] font-bold">2</span>
                  Select Examination Board
                </label>
                <span className="text-xs text-[#66FCF1] font-mono font-semibold">{selectedBoard}</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {boardOptions.map((board) => (
                  <button
                    key={board}
                    type="button"
                    onClick={() => setSelectedBoard(board)}
                    className={`py-3 px-3 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
                      selectedBoard === board
                        ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_15px_rgba(102,252,241,0.4)]'
                        : 'bg-black/40 text-gray-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {board}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Focus Goal */}
            <div className="seo-3d-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#66FCF1]/20 text-[#66FCF1] flex items-center justify-center text-[11px] font-bold">3</span>
                  Select Primary Academic Target
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'board', title: 'Board Exam Distinction (95%+)', sub: 'Structured NCERT, PYQs & Answer Crafting', icon: Award },
                  { id: 'jee', title: 'JEE Main & Advanced Core', sub: 'High-order problem solving & speed mastery', icon: Zap },
                  { id: 'neet', title: 'NEET-UG Medical Track', sub: 'Diagrammatic Bio & Numerical Precision', icon: Target },
                  { id: 'foundation', title: 'Early Olympiad & School Lead', sub: 'Critical thinking & concept depth', icon: Sparkles }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedGoal === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedGoal(item.id as any)}
                      className={`p-4 rounded-2xl text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1F2833] border-2 border-[#66FCF1] shadow-[0_0_20px_rgba(102,252,241,0.25)]'
                          : 'bg-black/40 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#66FCF1] text-[#0B0C10]' : 'bg-white/5 text-gray-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-heading font-extrabold text-white">{item.title}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{item.sub}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Pace Selection */}
            <div className="seo-3d-card p-4 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#66FCF1]" />
                <div>
                  <div className="text-xs font-heading font-bold text-white">Batch Intensity Setting</div>
                  <div className="text-[11px] text-gray-400">Choose between balanced regular pace or rigorous sprint</div>
                </div>
              </div>

              <div className="flex p-1 rounded-xl bg-black/60 border border-white/15 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setSelectedPace('standard')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedPace === 'standard' ? 'bg-[#66FCF1] text-[#0B0C10]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Balanced
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPace('intensive')}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    selectedPace === 'intensive' ? 'bg-[#66FCF1] text-[#0B0C10]' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Intensive
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Live Projected Custom Blueprint Output (5 cols) */}
          <div className="lg:col-span-5">
            <div className="seo-3d-card p-6 sm:p-8 border-2 border-[#66FCF1]/40 bg-[#0B0C10]/95 backdrop-blur-2xl space-y-6 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
              
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#66FCF1]/15 rounded-full blur-[60px] pointer-events-none" />

              {/* Blueprint Header */}
              <div className="space-y-2 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#66FCF1] font-bold">
                    GENERATED BLUEPRINT
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold border ${activePlan.badgeColor}`}>
                    {selectedClass} • {selectedBoard}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-black text-white leading-snug">
                  {activePlan.title}
                </h3>
              </div>

              {/* Core Blueprint Metrics */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#66FCF1]" />
                    Weekly Hours
                  </div>
                  <div className="text-xl font-heading font-extrabold text-white mt-1">
                    {activePlan.weeklyHours} hrs <span className="text-xs text-gray-400 font-normal">/ week</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Live interactive mentor sessions</div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10">
                  <div className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-[#66FCF1]" />
                    Max Batch Cap
                  </div>
                  <div className="text-xl font-heading font-extrabold text-[#66FCF1] mt-1">
                    1 : {activePlan.batchCap}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Guaranteed micro-batch</div>
                </div>
              </div>

              {/* Curriculum Subjects Included */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#66FCF1]" />
                  <span>Integrated Subject Modules:</span>
                </div>
                <div className="space-y-1.5">
                  {activePlan.subjects.map((sub, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-between text-xs text-white">
                      <span className="font-semibold">{sub}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#66FCF1]" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Projected Transformation & Support */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1F2833] to-[#0B0C10] border border-[#66FCF1]/30 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-300 font-medium">Expected Score Trajectory</span>
                  <span className="font-heading font-extrabold text-[#66FCF1] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {activePlan.projectedLeap}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-white/10">
                  <span>Doubt Resolution</span>
                  <span className="text-white font-mono">{activePlan.doubtDesks}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>Diagnostic Testing</span>
                  <span className="text-white font-mono">{activePlan.diagnostics}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenDemoForCourse(`${selectedClass} - ${activePlan.title} (${selectedBoard})`)}
                  className="w-full py-4 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-black text-sm hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(102,252,241,0.45)] hover:scale-105 cursor-pointer"
                >
                  <span>Book Free Demo in This Custom Batch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-semibold text-gray-300 hover:text-white transition-all cursor-pointer text-center"
                >
                  View Full Syllabus & Download PDF Blueprint
                </button>
              </div>

              {/* Trust Tag */}
              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-gray-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Admission Commitment for Demo Class</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
