import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';
import { 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Flame, 
  Target, 
  BookOpen, 
  Calendar,
  Filter,
  Sparkles
} from 'lucide-react';

interface StudyDayData {
  day: string;
  math: number;
  physics: number;
  chemistry: number;
  selfStudy: number;
  total: number;
}

interface SubjectAssignmentData {
  subject: string;
  completed: number;
  total: number;
  accuracy: number;
  color: string;
}

export const PortalProgressTracker: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'current' | 'previous' | 'monthly'>('current');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Seed study hours dataset based on selected time range
  const currentWeekData: StudyDayData[] = [
    { day: 'Mon', math: 2.5, physics: 1.5, chemistry: 1.0, selfStudy: 1.5, total: 6.5 },
    { day: 'Tue', math: 2.0, physics: 2.0, chemistry: 1.5, selfStudy: 1.0, total: 6.5 },
    { day: 'Wed', math: 3.0, physics: 1.0, chemistry: 2.0, selfStudy: 2.0, total: 8.0 },
    { day: 'Thu', math: 1.5, physics: 2.5, chemistry: 1.0, selfStudy: 1.5, total: 6.5 },
    { day: 'Fri', math: 2.0, physics: 2.0, chemistry: 2.5, selfStudy: 2.0, total: 8.5 },
    { day: 'Sat', math: 3.5, physics: 3.0, chemistry: 2.0, selfStudy: 3.0, total: 11.5 },
    { day: 'Sun', math: 1.5, physics: 1.5, chemistry: 1.0, selfStudy: 2.0, total: 6.0 }
  ];

  const previousWeekData: StudyDayData[] = [
    { day: 'Mon', math: 2.0, physics: 1.0, chemistry: 1.5, selfStudy: 1.0, total: 5.5 },
    { day: 'Tue', math: 1.5, physics: 2.0, chemistry: 1.0, selfStudy: 1.5, total: 6.0 },
    { day: 'Wed', math: 2.5, physics: 1.5, chemistry: 1.5, selfStudy: 1.5, total: 7.0 },
    { day: 'Thu', math: 2.0, physics: 2.0, chemistry: 1.0, selfStudy: 1.0, total: 6.0 },
    { day: 'Fri', math: 2.5, physics: 1.5, chemistry: 2.0, selfStudy: 1.5, total: 7.5 },
    { day: 'Sat', math: 3.0, physics: 2.5, chemistry: 2.5, selfStudy: 2.5, total: 10.5 },
    { day: 'Sun', math: 1.0, physics: 1.0, chemistry: 1.0, selfStudy: 1.5, total: 4.5 }
  ];

  const monthlyAverageData: StudyDayData[] = [
    { day: 'Week 1', math: 14.5, physics: 12.0, chemistry: 10.5, selfStudy: 11.0, total: 48.0 },
    { day: 'Week 2', math: 16.0, physics: 13.5, chemistry: 11.0, selfStudy: 12.5, total: 53.0 },
    { day: 'Week 3', math: 15.0, physics: 14.0, chemistry: 12.0, selfStudy: 13.0, total: 54.0 },
    { day: 'Week 4', math: 18.0, physics: 15.5, chemistry: 13.0, selfStudy: 15.0, total: 61.5 }
  ];

  const activeStudyData = timeRange === 'current' 
    ? currentWeekData 
    : timeRange === 'previous' 
      ? previousWeekData 
      : monthlyAverageData;

  // Assignment completion dataset
  const subjectAssignments: SubjectAssignmentData[] = [
    { subject: 'Mathematics', completed: 15, total: 15, accuracy: 96, color: '#66FCF1' },
    { subject: 'Physics', completed: 13, total: 14, accuracy: 92, color: '#45A29E' },
    { subject: 'Chemistry', completed: 11, total: 12, accuracy: 89, color: '#a855f7' },
    { subject: 'Biology / Aptitude', completed: 9, total: 9, accuracy: 95, color: '#10b981' }
  ];

  // Calculate high-level summary metrics
  const totalStudyHours = activeStudyData.reduce((acc, curr) => acc + curr.total, 0);
  const totalAssignmentsCompleted = subjectAssignments.reduce((acc, curr) => acc + curr.completed, 0);
  const totalAssignmentsAssigned = subjectAssignments.reduce((acc, curr) => acc + curr.total, 0);
  const overallCompletionPercentage = Math.round((totalAssignmentsCompleted / totalAssignmentsAssigned) * 100);
  const averageAccuracy = Math.round(subjectAssignments.reduce((acc, curr) => acc + curr.accuracy, 0) / subjectAssignments.length);

  // Custom Glassmorphic Tooltip for Recharts
  const CustomGlassTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3.5 rounded-xl bg-[#1F2833]/95 border border-[#66FCF1]/40 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1.5">
          <p className="font-bold text-white border-b border-white/10 pb-1 flex items-center justify-between gap-4">
            <span>{label}</span>
            <span className="text-[#66FCF1] font-extrabold">{payload.reduce((sum: number, p: any) => sum + (Number(p.value) || 0), 0).toFixed(1)} hrs</span>
          </p>
          <div className="space-y-1 pt-1">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center justify-between gap-6 text-[11px]">
                <span className="flex items-center gap-1.5 capitalize text-gray-300">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}:
                </span>
                <span className="font-bold text-white">{entry.value} hrs</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header Controls & Metrics */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-heading font-extrabold text-white">Study Hours & Assignment Tracker</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#66FCF1]/15 border border-[#66FCF1]/30 text-[#66FCF1] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Real-time Sync</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono mt-0.5">
            Visualize subject-wise study velocity, daily dedication, and assignment completion accuracy
          </p>
        </div>

        {/* Time Range Filter Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#66FCF1]" />
            <span>Range:</span>
          </span>
          <div className="p-1 rounded-xl bg-black/60 border border-white/15 flex items-center text-xs">
            {[
              { id: 'current', label: 'This Week' },
              { id: 'previous', label: 'Last Week' },
              { id: 'monthly', label: '4-Week View' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeRange(tab.id as any)}
                className={`px-3 py-1 rounded-lg font-bold font-mono transition-all cursor-pointer ${
                  timeRange === tab.id
                    ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_12px_rgba(102,252,241,0.3)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="seo-3d-card p-5 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#66FCF1]" /> TOTAL STUDY TIME</span>
            <span className="text-emerald-400 font-bold">95% Goal</span>
          </div>
          <div className="text-3xl font-heading font-extrabold text-white">
            {totalStudyHours.toFixed(1)} <span className="text-sm font-normal text-gray-400 font-mono">hrs</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#66FCF1] h-full rounded-full" style={{ width: '95%' }} />
          </div>
          <p className="text-[11px] text-gray-400 font-mono">Target: 30 hrs/week • Avg: 4.1 hrs/day</p>
        </div>

        <div className="seo-3d-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#45A29E]" /> ASSIGNMENT RATE</span>
            <span className="text-[#66FCF1] font-bold">{overallCompletionPercentage}%</span>
          </div>
          <div className="text-3xl font-heading font-extrabold text-[#66FCF1]">
            {totalAssignmentsCompleted} / {totalAssignmentsAssigned}
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#45A29E] h-full rounded-full" style={{ width: `${overallCompletionPercentage}%` }} />
          </div>
          <p className="text-[11px] text-gray-400 font-mono">Only 2 assignments pending review</p>
        </div>

        <div className="seo-3d-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-purple-400" /> ACCURACY ACCELERATION</span>
            <span className="text-emerald-400 font-bold">+14.2%</span>
          </div>
          <div className="text-3xl font-heading font-extrabold text-white">
            {averageAccuracy}% <span className="text-sm font-normal text-gray-400 font-mono">Avg Score</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full" style={{ width: `${averageAccuracy}%` }} />
          </div>
          <p className="text-[11px] text-gray-400 font-mono">Top percentile in Class 10 Board Sprint</p>
        </div>

        <div className="seo-3d-card p-5 space-y-2 bg-gradient-to-br from-[#1F2833] to-[#0B0C10]">
          <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
            <span className="flex items-center gap-1.5 text-amber-400"><Flame className="w-4 h-4 text-amber-400 animate-bounce" /> STUDY STREAK</span>
            <span className="text-amber-400 font-bold font-mono">FIRE STREAK</span>
          </div>
          <div className="text-3xl font-heading font-extrabold text-amber-300">
            14 Days <span className="text-sm font-normal text-gray-400 font-mono">Active</span>
          </div>
          <p className="text-[11px] text-gray-300 font-mono">Personal best! Keep completing daily practice modules.</p>
        </div>

      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CHART 1: Area Chart for Study Hours */}
        <div className="lg:col-span-7 seo-3d-card p-6 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#66FCF1]" />
                <span>Daily Subject Dedicated Hours</span>
              </h3>
              <p className="text-xs text-gray-400 font-mono">
                {timeRange === 'current' ? 'Current Week Breakdown' : timeRange === 'previous' ? 'Previous Week Log' : '4-Week Aggregate'}
              </p>
            </div>

            {/* Legend Indicators */}
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-gray-300"><span className="w-2.5 h-2.5 rounded-full bg-[#66FCF1]" /> Math</span>
              <span className="flex items-center gap-1 text-gray-300"><span className="w-2.5 h-2.5 rounded-full bg-[#45A29E]" /> Physics</span>
              <span className="flex items-center gap-1 text-gray-300"><span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Chemistry</span>
              <span className="flex items-center gap-1 text-gray-300"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Practice</span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeStudyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="mathGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#66FCF1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#66FCF1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="physicsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#45A29E" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#45A29E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="chemGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="practiceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="day" stroke="#888" tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'monospace' }} />
                <YAxis stroke="#888" tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'monospace' }} />
                <Tooltip content={<CustomGlassTooltip />} />
                <Area type="monotone" dataKey="math" name="Mathematics" stackId="1" stroke="#66FCF1" fillOpacity={1} fill="url(#mathGradient)" />
                <Area type="monotone" dataKey="physics" name="Physics" stackId="1" stroke="#45A29E" fillOpacity={1} fill="url(#physicsGradient)" />
                <Area type="monotone" dataKey="chemistry" name="Chemistry" stackId="1" stroke="#a855f7" fillOpacity={1} fill="url(#chemGradient)" />
                <Area type="monotone" dataKey="selfStudy" name="Self Practice" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#practiceGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* CHART 2: Bar Chart for Subject Assignments */}
        <div className="lg:col-span-5 seo-3d-card p-6 space-y-4">
          
          <div>
            <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#45A29E]" />
              <span>Assignment Mastery & Completion</span>
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Completed assignments vs total assigned per subject
            </p>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAssignments} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" horizontal={false} />
                <XAxis type="number" stroke="#888" tick={{ fill: '#9ca3af', fontSize: 11, fontFamily: 'monospace' }} domain={[0, 16]} />
                <YAxis dataKey="subject" type="category" stroke="#888" tick={{ fill: '#ffffff', fontSize: 11, fontFamily: 'monospace' }} width={110} />
                <Tooltip
                  cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as SubjectAssignmentData;
                      return (
                        <div className="p-3 rounded-xl bg-[#1F2833]/95 border border-[#66FCF1]/40 shadow-2xl backdrop-blur-md text-xs font-mono space-y-1">
                          <p className="font-bold text-white">{data.subject}</p>
                          <p className="text-gray-300">Completed: <span className="font-bold text-[#66FCF1]">{data.completed} / {data.total}</span></p>
                          <p className="text-gray-300">Accuracy Score: <span className="font-bold text-emerald-400">{data.accuracy}%</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="completed" name="Completed" radius={[0, 8, 8, 0]}>
                  {subjectAssignments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>

      {/* Detailed Subject Assignment Cards Breakdown */}
      <div className="seo-3d-card p-6 space-y-4">
        <h3 className="text-lg font-heading font-bold text-white flex items-center justify-between">
          <span>Subject Assignment Completion Status</span>
          <span className="text-xs text-[#66FCF1] font-mono">4 Modules Active</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectAssignments.map((item, idx) => {
            const percent = Math.round((item.completed / item.total) * 100);
            return (
              <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 hover:border-[#66FCF1]/40 transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{item.subject}</span>
                  <span 
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
                    style={{ backgroundColor: `${item.color}20`, color: item.color, border: `1px solid ${item.color}40` }}
                  >
                    {percent}% Complete
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-gray-400">
                    <span>Assignments: {item.completed}/{item.total}</span>
                    <span>Accuracy: {item.accuracy}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percent}%`, backgroundColor: item.color }} />
                  </div>
                </div>

                <div className="text-[10px] text-gray-400 font-mono pt-1 border-t border-white/5 flex items-center justify-between">
                  <span>Status: {percent === 100 ? 'All Cleared' : '1 Pending'}</span>
                  <span className="text-[#66FCF1]">Review →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
