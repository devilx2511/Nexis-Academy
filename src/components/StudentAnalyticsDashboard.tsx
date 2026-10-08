import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  BrainCircuit, 
  BarChart3, 
  Sparkles, 
  Download, 
  Filter, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';

interface StudentAnalyticsDashboardProps {
  studentName?: string;
  studentClass?: string;
  onOpenDemoModal?: () => void;
}

export const StudentAnalyticsDashboard: React.FC<StudentAnalyticsDashboardProps> = ({
  studentName = 'Alex Sharma',
  studentClass = 'Class 10 CBSE (Board Sprint)',
  onOpenDemoModal
}) => {
  const [activeMetricView, setActiveMetricView] = useState<'overall' | 'physics' | 'math' | 'chemistry'>('overall');
  const [timeframe, setTimeframe] = useState<'12weeks' | '6months' | 'all'>('12weeks');
  const [viewPerspective, setViewPerspective] = useState<'student' | 'parent'>('student');

  // Diagnostic Test Progression Data over 12 weeks
  const scoreTrendData = [
    { week: 'Wk 1', score: 68, benchmark: 75, avgBatch: 70, hours: 8 },
    { week: 'Wk 2', score: 72, benchmark: 76, avgBatch: 71, hours: 9 },
    { week: 'Wk 3', score: 71, benchmark: 78, avgBatch: 73, hours: 8.5 },
    { week: 'Wk 4', score: 76, benchmark: 80, avgBatch: 75, hours: 10 },
    { week: 'Wk 5', score: 81, benchmark: 82, avgBatch: 77, hours: 11 },
    { week: 'Wk 6', score: 84, benchmark: 85, avgBatch: 78, hours: 10.5 },
    { week: 'Wk 7', score: 86, benchmark: 87, avgBatch: 80, hours: 12 },
    { week: 'Wk 8', score: 89, benchmark: 88, avgBatch: 82, hours: 11.5 },
    { week: 'Wk 9', score: 91, benchmark: 90, avgBatch: 83, hours: 13 },
    { week: 'Wk 10', score: 94, benchmark: 92, avgBatch: 85, hours: 12 },
    { week: 'Wk 11', score: 95, benchmark: 93, avgBatch: 86, hours: 14 },
    { week: 'Wk 12', score: 97, benchmark: 95, avgBatch: 88, hours: 13.5 },
  ];

  // Subject Cognitive Skill Radar Data
  const radarSkillData = [
    { subject: 'Concept Clarity', score: 96, fullMark: 100 },
    { subject: 'Numerical Speed', score: 90, fullMark: 100 },
    { subject: 'Step Writing', score: 88, fullMark: 100 },
    { subject: 'Formula Recall', score: 95, fullMark: 100 },
    { subject: 'PYQ Accuracy', score: 94, fullMark: 100 },
    { subject: 'Time Pressure', score: 89, fullMark: 100 },
  ];

  // Weekly Attendance & Homework Compliance Data
  const weeklyEffortData = [
    { day: 'Mon', attendance: 100, homeworkRate: 100, studyHours: 2.5 },
    { day: 'Tue', attendance: 100, homeworkRate: 90, studyHours: 3.0 },
    { day: 'Wed', attendance: 100, homeworkRate: 100, studyHours: 2.0 },
    { day: 'Thu', attendance: 100, homeworkRate: 95, studyHours: 3.5 },
    { day: 'Fri', attendance: 100, homeworkRate: 100, studyHours: 2.5 },
    { day: 'Sat', attendance: 100, homeworkRate: 100, studyHours: 4.0 },
    { day: 'Sun', attendance: 100, homeworkRate: 100, studyHours: 3.0 },
  ];

  // Recent Proctored Test Records
  const recentTests = [
    {
      id: 'T-104',
      title: 'Full Mock: Quadratic Equations & AP Physics Mechanics',
      date: '28 Aug 2026',
      score: '97 / 100',
      percentile: '99.2%',
      rank: 'Rank 1 / 18',
      status: 'Distinction Mastery',
      notes: 'Exceptional working steps; 1 minor calculation slip in Q14.'
    },
    {
      id: 'T-103',
      title: 'Optics & Ray Diagrams Step-Marking Test',
      date: '21 Aug 2026',
      score: '94 / 100',
      percentile: '98.5%',
      rank: 'Rank 2 / 18',
      status: 'Top Tier',
      notes: 'Mirror formula derivations were pristine.'
    },
    {
      id: 'T-102',
      title: 'Surface Areas & Volumes 3D Spatial Geometry',
      date: '14 Aug 2026',
      score: '91 / 100',
      percentile: '96.8%',
      rank: 'Rank 3 / 18',
      status: 'Mastery',
      notes: 'Frustum volume formula application verified.'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Header Card with Quick Stats & Perspective Toggle */}
      <div className="seo-3d-card p-6 sm:p-8 rounded-3xl border border-white/15 bg-gradient-to-r from-[#1F2833]/90 via-[#0B0C10] to-[#1F2833]/90 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40">
                Diagnostic Progress Center
              </span>
              <span className="text-xs text-slate-400 font-mono">Academic Session 2026-2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              {studentName} • <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] to-amber-400">{studentClass}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Verified analytics tracked across live micro-batches, weekly mock diagnostics, and 1-on-1 mentor desks.
            </p>
          </div>

          {/* Perspective & Timeframe Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="p-1 rounded-xl bg-black/60 border border-white/10 flex text-xs font-mono font-semibold">
              <button
                type="button"
                onClick={() => setViewPerspective('student')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewPerspective === 'student' ? 'bg-[#66FCF1] text-[#0B0C10] font-bold shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Student View
              </button>
              <button
                type="button"
                onClick={() => setViewPerspective('parent')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewPerspective === 'parent' ? 'bg-amber-400 text-[#0B0C10] font-bold shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Parent Oversight
              </button>
            </div>

            <button
              type="button"
              onClick={() => alert("Downloading verified student performance audit report (PDF)...")}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-mono font-bold text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#66FCF1]" />
              <span>Export PDF Audit</span>
            </button>
          </div>
        </div>

        {/* 4 High-Impact Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Current Score Average</span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-black text-white">
              96.8%
            </div>
            <div className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
              <span>+28.8% vs Baseline (68%)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#66FCF1]" />
              <span>Cohort Standing</span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-black text-[#66FCF1]">
              Top 1%
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Rank #1 in Section Alpha
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Attendance</span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-black text-amber-400">
              99.2%
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              36 of 36 sessions attended
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>Daily Study Streak</span>
            </div>
            <div className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-1">
              24 <span className="text-base text-amber-400">🔥 Days</span>
            </div>
            <div className="text-[11px] font-mono text-purple-300">
              2,850 XP earned
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid: Recharts Performance Trajectory & Skill Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Interactive Area & Line Chart */}
        <div className="lg:col-span-8 seo-3d-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#66FCF1] font-bold flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4" />
                <span>12-Week Test Score Trajectory vs Benchmark</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-white mt-1">
                Continuous Improvement Velocity
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                <span className="w-3 h-3 rounded-full bg-[#66FCF1]"></span>
                <span>Alex Score</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono ml-3">
                <span className="w-3 h-0.5 bg-amber-400"></span>
                <span>Target 95%</span>
              </span>
            </div>
          </div>

          {/* Recharts Area Container */}
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={scoreTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#66FCF1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#66FCF1" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="benchmarkColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis 
                  dataKey="week" 
                  stroke="#94A3B8" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  domain={[50, 100]} 
                  stroke="#94A3B8" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(11, 12, 16, 0.95)', 
                    borderColor: 'rgba(102, 252, 241, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                  formatter={(value: any, name: any) => [
                    `${value}%`, 
                    name === 'score' ? 'Student Score' : name === 'benchmark' ? 'Nexis 95% Benchmark' : 'Batch Avg'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#66FCF1" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#scoreColor)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#F59E0B" 
                  strokeWidth={2} 
                  strokeDasharray="4 4" 
                  dot={false} 
                />
                <Line 
                  type="monotone" 
                  dataKey="avgBatch" 
                  stroke="#94A3B8" 
                  strokeWidth={1.5} 
                  strokeDasharray="2 2" 
                  dot={false} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Academic Milestone Achieved:</strong> Crossed the 95% Board distinction threshold in Week 11.
              </span>
            </div>
            <span className="font-mono text-[#66FCF1] font-bold shrink-0">
              Confidence Index: 99.4%
            </span>
          </div>
        </div>

        {/* Right Column (4 cols): Recharts Radar Cognitive Profile */}
        <div className="lg:col-span-4 seo-3d-card p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#66FCF1] font-bold flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4" />
              <span>Cognitive Mastery Matrix</span>
            </div>
            <h3 className="text-lg font-heading font-bold text-white mt-1">
              Multi-Dimensional Competency
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Evaluated across theoretical recall, derivation speed, and step accuracy.
            </p>
          </div>

          {/* Recharts Radar Chart */}
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarSkillData}>
                <PolarGrid stroke="rgba(255,255,255,0.12)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  stroke="#94A3B8" 
                  fontSize={10} 
                  tick={{ fill: '#CBD5E1' }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  stroke="rgba(255,255,255,0.15)" 
                  fontSize={9}
                />
                <Radar 
                  name="Skill Score" 
                  dataKey="score" 
                  stroke="#66FCF1" 
                  fill="#66FCF1" 
                  fillOpacity={0.35} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center text-xs text-slate-300">
            <span className="text-[#66FCF1] font-bold font-mono">Strongest Pillar:</span> Concept Clarity (96%)
          </div>
        </div>

      </div>

      {/* Effort & Attendance Bar Chart + Mentor Feedback Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left (6 cols): Weekly Study Hours & Compliance Bar Chart */}
        <div className="lg:col-span-6 seo-3d-card p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                Weekly Engagement Rhythm
              </div>
              <h3 className="text-lg font-heading font-bold text-white mt-1">
                Active Study Hours by Day
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              100% Homework Completed
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyEffortData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" vertical={false} />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0B0C10', 
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    color: '#fff',
                    fontSize: '11px',
                    fontFamily: 'monospace'
                  }}
                  formatter={(val: any) => [`${val} hrs`, 'Guided Study Hours']}
                />
                <Bar dataKey="studyHours" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right (6 cols): Mentor Notes & Action Items */}
        <div className="lg:col-span-6 seo-3d-card p-6 sm:p-8 rounded-3xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#66FCF1] font-bold">
                Assigned Mentor Diagnostic Note
              </span>
              <span className="text-xs text-slate-400 font-mono">Updated 2 days ago</span>
            </div>

            <h3 className="text-lg font-heading font-bold text-white">
              Observations by Dr. Sarah Jenkins (MIT)
            </h3>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2 italic text-xs text-slate-300 leading-relaxed">
              "Alex has demonstrated tremendous breakthrough in electromagnetic induction and ray optics diagrams. His answers reflect standard CBSE step-marking guidelines with immaculate derivations. For the upcoming week, we will focus on solving 15-minute speed drills for 4-mark word problems."
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Next 1-on-1 Review: Thursday 5:00 PM</span>
            </div>

            {onOpenDemoModal && (
              <button
                type="button"
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-bold text-xs hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Schedule Mentor Chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Proctored Test Log Table */}
      <div className="seo-3d-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Official Diagnostic Records
            </div>
            <h3 className="text-lg font-heading font-bold text-white mt-0.5">
              Recent Proctored Mock Test Results
            </h3>
          </div>
          <span className="text-xs font-mono text-[#66FCF1]">Showing last 3 examinations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Test Code & Title</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Percentile</th>
                <th className="py-3 px-4">Cohort Rank</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {recentTests.map((t) => (
                <tr key={t.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white font-sans">
                    <span className="text-slate-400 font-mono mr-2">[{t.id}]</span>
                    {t.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">{t.date}</td>
                  <td className="py-3.5 px-4 font-bold text-[#66FCF1]">{t.score}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">{t.percentile}</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">{t.rank}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
