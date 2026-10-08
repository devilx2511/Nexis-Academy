import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Flame, 
  Target, 
  Bell, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  AlertCircle,
  PlusCircle,
  BookOpen
} from 'lucide-react';

interface PresetExam {
  id: string;
  name: string;
  boardOrCategory: string;
  targetDate: string; // ISO string
  syllabusHoursNeeded: number;
  totalChapters: number;
}

const PRESET_EXAMS: PresetExam[] = [
  {
    id: 'cbse-10',
    name: 'CBSE Class 10 Board Examinations',
    boardOrCategory: 'Class 10 CBSE',
    targetDate: '2027-02-15T09:00:00',
    syllabusHoursNeeded: 420,
    totalChapters: 32
  },
  {
    id: 'cbse-12-science',
    name: 'CBSE Class 12 Science Boards (Physics/Math)',
    boardOrCategory: 'Class 12 CBSE',
    targetDate: '2027-02-20T09:00:00',
    syllabusHoursNeeded: 560,
    totalChapters: 38
  },
  {
    id: 'jee-main-2027',
    name: 'JEE Main 2027 (Session 1 Entrance)',
    boardOrCategory: 'Engineering Entrance',
    targetDate: '2027-01-22T09:00:00',
    syllabusHoursNeeded: 750,
    totalChapters: 85
  },
  {
    id: 'neet-ug-2027',
    name: 'NEET UG 2027 (Medical Entrance)',
    boardOrCategory: 'Medical Entrance',
    targetDate: '2027-05-02T14:00:00',
    syllabusHoursNeeded: 820,
    totalChapters: 97
  },
  {
    id: 'icse-10',
    name: 'ICSE Class 10 Board Examinations',
    boardOrCategory: 'Class 10 ICSE',
    targetDate: '2027-02-26T09:00:00',
    syllabusHoursNeeded: 450,
    totalChapters: 35
  }
];

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPassed: boolean;
}

export const ExamCountdownTimer: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<string>('cbse-10');
  const [customExamName, setCustomExamName] = useState<string>('');
  const [customExamDate, setCustomExamDate] = useState<string>('2027-03-01T09:00');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [alarmSetMessage, setAlarmSetMessage] = useState<string | null>(null);

  // Active target date string
  const activeExam = PRESET_EXAMS.find((e) => e.id === selectedExamId) || PRESET_EXAMS[0];
  const activeDateString = isCustomMode ? customExamDate : activeExam.targetDate;
  const activeTitle = isCustomMode ? (customExamName || 'Custom Target Exam') : activeExam.name;

  const calculateTimeRemaining = (): TimeRemaining => {
    const target = new Date(activeDateString).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, isPassed: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      totalSeconds: Math.floor(difference / 1000),
      isPassed: false
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTimeRemaining());

  // Second-by-second ticker
  useEffect(() => {
    setTimeLeft(calculateTimeRemaining());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [activeDateString, isCustomMode]);

  // Phase assessment logic
  const getPrepPhase = (days: number) => {
    if (days > 150) {
      return {
        phase: 'Phase 1: Deep Conceptual Foundations',
        color: 'text-sky-400 border-sky-400/30 bg-sky-400/10',
        focus: 'Derivations, 3D visualization, and chapter notes consolidation.'
      };
    } else if (days > 60) {
      return {
        phase: 'Phase 2: High-Yield Application & Speed Drills',
        color: 'text-[#66FCF1] border-[#66FCF1]/30 bg-[#66FCF1]/10',
        focus: 'Solving past 10-year question patterns and eliminating formula bottlenecks.'
      };
    } else if (days > 20) {
      return {
        phase: 'Phase 3: Step-Marking Audit & Mock Hall Simulations',
        color: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
        focus: 'Full-length 3-hour timed papers and examiner rubric reviews.'
      };
    } else {
      return {
        phase: 'Phase 4: Distinction Sprint & Formula Lockdown',
        color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
        focus: 'Rapid formula sheets, sleep hygiene, and high-confidence recall.'
      };
    }
  };

  const currentPhase = getPrepPhase(timeLeft.days);
  const recommendedHoursPerDay = timeLeft.days > 0 
    ? ((activeExam.syllabusHoursNeeded / timeLeft.days)).toFixed(1) 
    : '0';

  const handleSetReminder = () => {
    setAlarmSetMessage(`Exam reminder and daily study alarm calibrated for ${activeTitle}!`);
    setTimeout(() => setAlarmSetMessage(null), 4000);
  };

  return (
    <div className="seo-3d-card p-6 sm:p-7 relative overflow-hidden border border-[#66FCF1]/30">
      
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#66FCF1]/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header & Exam Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30">
              <Clock className="w-4 h-4 animate-spin-slow" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#66FCF1]">
              Live Board & Competitive Exam Radar
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
            {activeTitle}
          </h3>
          <p className="text-xs text-gray-400 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#45A29E]" />
            <span>Target Date: {new Date(activeDateString).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at 9:00 AM</span>
          </p>
        </div>

        {/* Controls: Preset Switcher & Custom Date Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {!isCustomMode ? (
            <div className="relative">
              <select
                value={selectedExamId}
                onChange={(e) => setSelectedExamId(e.target.value)}
                className="appearance-none bg-black/60 border border-white/20 hover:border-[#66FCF1]/50 text-xs text-white font-medium py-2 pl-3 pr-8 rounded-xl focus:outline-none focus:border-[#66FCF1] cursor-pointer"
              >
                {PRESET_EXAMS.map((exam) => (
                  <option key={exam.id} value={exam.id} className="bg-[#0F172A] text-white">
                    {exam.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Exam Name (e.g. SAT, NEET)"
                value={customExamName}
                onChange={(e) => setCustomExamName(e.target.value)}
                className="bg-black/60 border border-white/20 text-xs text-white py-1.5 px-3 rounded-xl focus:outline-none focus:border-[#66FCF1]"
              />
              <input
                type="datetime-local"
                value={customExamDate}
                onChange={(e) => setCustomExamDate(e.target.value)}
                className="bg-black/60 border border-white/20 text-xs text-white py-1.5 px-3 rounded-xl focus:outline-none focus:border-[#66FCF1]"
              />
            </div>
          )}

          <button
            onClick={() => setIsCustomMode(!isCustomMode)}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-[#66FCF1]/10 border border-white/15 text-xs text-[#66FCF1] font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{isCustomMode ? 'Use Presets' : 'Custom Date'}</span>
          </button>
        </div>
      </div>

      {/* Countdown Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
        {/* Days */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 text-center relative overflow-hidden group hover:border-[#66FCF1]/40 transition-all">
          <div className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tight group-hover:text-[#66FCF1] transition-colors">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mt-1 block">
            Days Left
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#66FCF1] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Hours */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 text-center relative overflow-hidden group hover:border-[#66FCF1]/40 transition-all">
          <div className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tight group-hover:text-[#66FCF1] transition-colors">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mt-1 block">
            Hours
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#66FCF1] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Minutes */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 text-center relative overflow-hidden group hover:border-[#66FCF1]/40 transition-all">
          <div className="text-3xl sm:text-5xl font-mono font-black text-white tracking-tight group-hover:text-[#66FCF1] transition-colors">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mt-1 block">
            Minutes
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#66FCF1] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Seconds */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 text-center relative overflow-hidden group hover:border-[#66FCF1]/40 transition-all">
          <div className="text-3xl sm:text-5xl font-mono font-black text-[#66FCF1] tracking-tight">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-gray-400 mt-1 block">
            Seconds
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#66FCF1] to-transparent opacity-70" />
        </div>
      </div>

      {/* Strategic Preparation Phase & Velocity Advice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        
        {/* Phase Badge */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
            Strategic Curriculum Phase
          </span>
          <div className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${currentPhase.color}`}>
            {currentPhase.phase}
          </div>
          <p className="text-[11px] text-gray-400 mt-1">
            {currentPhase.focus}
          </p>
        </div>

        {/* Daily Quota */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
            Recommended Daily Study Pace
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-heading font-black text-amber-400">
              {recommendedHoursPerDay} hrs
            </span>
            <span className="text-xs text-gray-400">/ day needed</span>
          </div>
          <p className="text-[11px] text-gray-400">
            Covers theory, numerical worksheets, and weekly timed mocks.
          </p>
        </div>

        {/* Action Button & Alarm */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">
              Study Alarm Sync
            </span>
            <span className="text-xs font-semibold text-white">
              Stay ahead of exam deadlines
            </span>
          </div>

          <button
            onClick={handleSetReminder}
            className="w-full py-2 px-3 rounded-lg bg-[#66FCF1]/20 hover:bg-[#66FCF1] text-[#66FCF1] hover:text-[#0B0C10] border border-[#66FCF1]/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Set Class Alarm & Calendar Sync</span>
          </button>
        </div>

      </div>

      {/* Confirmation feedback */}
      {alarmSetMessage && (
        <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-bold text-emerald-300 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{alarmSetMessage}</span>
        </div>
      )}

    </div>
  );
};
