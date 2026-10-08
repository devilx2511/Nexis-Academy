import React, { useState } from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Flame, 
  Zap, 
  Sparkles, 
  TrendingUp, 
  Star, 
  Award, 
  ShieldCheck, 
  ChevronRight, 
  User as UserIcon,
  CheckCircle2
} from 'lucide-react';

interface StudentLeader {
  id: string;
  rank: number;
  name: string;
  school: string;
  avatar: string;
  subject: string;
  xp: number;
  streakDays: number;
  accuracy: string;
  badgeTitle: string;
  trend: 'up' | 'down' | 'same';
  trendCount: number;
  isCurrentUser?: boolean;
}

export const GamificationLeaderboard: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'alltime'>('weekly');

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'SAT / Olympiad'];

  // Mocked top-performing students dataset
  const allLeaders: StudentLeader[] = [
    {
      id: 'L-1',
      rank: 1,
      name: 'Rohan Deshmukh',
      school: 'Delhi Public School (R.K. Puram)',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
      subject: 'Physics',
      xp: 4280,
      streakDays: 42,
      accuracy: '98.6%',
      badgeTitle: 'Quantum Grandmaster',
      trend: 'same',
      trendCount: 0
    },
    {
      id: 'L-2',
      rank: 2,
      name: 'Priya Narayanan',
      school: 'National Public School (Indiranagar)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      subject: 'Mathematics',
      xp: 3950,
      streakDays: 38,
      accuracy: '97.8%',
      badgeTitle: 'Calculus Titan',
      trend: 'up',
      trendCount: 2
    },
    {
      id: 'L-3',
      rank: 3,
      name: 'Aditya Sen',
      school: 'The Doon School (Dehradun)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      subject: 'Chemistry',
      xp: 3620,
      streakDays: 31,
      accuracy: '96.9%',
      badgeTitle: 'Organic Virtuoso',
      trend: 'up',
      trendCount: 1
    },
    {
      id: 'L-4',
      rank: 4,
      name: 'Alex Sharma (You)',
      school: 'Nexis Scholar (CBSE Class 10)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      subject: 'Mathematics',
      xp: 3450,
      streakDays: 24,
      accuracy: '96.2%',
      badgeTitle: 'Algebra Champion',
      trend: 'up',
      trendCount: 3,
      isCurrentUser: true
    },
    {
      id: 'L-5',
      rank: 5,
      name: 'Ananya Verma',
      school: 'Bombay Scottish School (Mumbai)',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      subject: 'Biology',
      xp: 3210,
      streakDays: 29,
      accuracy: '95.5%',
      badgeTitle: 'Genetics Wizard',
      trend: 'down',
      trendCount: 1
    },
    {
      id: 'L-6',
      rank: 6,
      name: 'Kabir Mehta',
      school: 'St. Xavier’s Collegiate (Kolkata)',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
      subject: 'SAT / Olympiad',
      xp: 2980,
      streakDays: 19,
      accuracy: '94.8%',
      badgeTitle: 'Olympiad Prodigy',
      trend: 'up',
      trendCount: 1
    },
    {
      id: 'L-7',
      rank: 7,
      name: 'Ishaan Kulkarni',
      school: 'Bishop Cotton Boys’ (Bengaluru)',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
      subject: 'Physics',
      xp: 2840,
      streakDays: 17,
      accuracy: '94.1%',
      badgeTitle: 'Mechanics Ace',
      trend: 'same',
      trendCount: 0
    }
  ];

  const filteredLeaders = selectedSubject === 'All'
    ? allLeaders
    : allLeaders.filter((l) => l.subject.toLowerCase().includes(selectedSubject.toLowerCase()));

  const top3 = filteredLeaders.slice(0, 3);
  const remainingLeaders = filteredLeaders.slice(3);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header with Title & Filter Controls */}
      <div className="seo-3d-card p-6 sm:p-8 rounded-3xl border border-white/15 bg-gradient-to-r from-[#1F2833]/90 via-[#0B0C10] to-[#1F2833]/90 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                <Trophy className="w-3 h-3" />
                <span>Nexis Premier Arena</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">Season 4 • Week 8</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Student Gamification Leaderboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Climb the ranks through proctored mock test scores, daily problem streaks, and active 1-on-1 participation.
            </p>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10 shrink-0 text-xs font-mono">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeframe === 'weekly' ? 'bg-[#66FCF1] text-[#0B0C10] font-bold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekly Sprint
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeframe === 'monthly' ? 'bg-[#66FCF1] text-[#0B0C10] font-bold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly League
            </button>
            <button
              onClick={() => setTimeframe('alltime')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeframe === 'alltime' ? 'bg-[#66FCF1] text-[#0B0C10] font-bold shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              All-Time Hall
            </button>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-white/10 pt-4 no-scrollbar">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-gradient-to-r from-[#6366F1] to-[#66FCF1] text-white shadow-[0_0_12px_rgba(102,252,241,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium View */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-6">
          
          {/* Rank 2 (Silver) */}
          <div className="order-2 md:order-1 seo-3d-card p-6 rounded-3xl border border-slate-300/30 bg-gradient-to-b from-slate-800/60 to-black/80 space-y-4 text-center relative hover:-translate-y-2 transition-transform">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-300 text-slate-900 font-heading font-black text-sm flex items-center justify-center shadow-[0_0_15px_rgba(203,213,225,0.6)]">
              #2
            </div>
            <div className="relative mx-auto w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-300/60 mt-2">
              <img src={top3[1].avatar} alt={top3[1].name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-white">{top3[1].name}</h3>
              <p className="text-[11px] text-slate-400 truncate">{top3[1].school}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
              <div className="text-xs font-mono font-bold text-slate-200">{top3[1].xp.toLocaleString()} XP</div>
              <div className="text-[10px] text-[#66FCF1] flex items-center justify-center gap-1 font-mono">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>{top3[1].streakDays} Days Streak</span>
                <span>• {top3[1].accuracy}</span>
              </div>
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-400/20 text-slate-300 border border-slate-400/30">
              {top3[1].badgeTitle}
            </span>
          </div>

          {/* Rank 1 (Gold / Champion) */}
          <div className="order-1 md:order-2 seo-3d-card p-8 rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-amber-950/40 via-black to-black space-y-5 text-center relative md:-translate-y-4 shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:-translate-y-6 transition-transform">
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <Crown className="w-8 h-8 text-amber-400 animate-bounce" />
              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-heading font-black text-base flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.8)]">
                #1
              </div>
            </div>
            <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-400 mt-5 ring-4 ring-amber-400/20">
              <img src={top3[0].avatar} alt={top3[0].name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Cohort Leader</span>
              </div>
              <h3 className="text-lg font-heading font-extrabold text-white">{top3[0].name}</h3>
              <p className="text-xs text-slate-300 truncate">{top3[0].school}</p>
            </div>
            <div className="p-3 rounded-xl bg-black/60 border border-amber-400/30 space-y-1">
              <div className="text-base font-mono font-black text-amber-400">{top3[0].xp.toLocaleString()} XP</div>
              <div className="text-xs text-slate-300 flex items-center justify-center gap-2 font-mono">
                <span className="flex items-center text-amber-400 font-bold">
                  <Flame className="w-3.5 h-3.5 mr-0.5" />
                  {top3[0].streakDays}d Streak
                </span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{top3[0].accuracy} Acc</span>
              </div>
            </div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-amber-400/30 to-amber-500/30 text-amber-200 border border-amber-400/50">
              {top3[0].badgeTitle}
            </span>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="order-3 md:order-3 seo-3d-card p-6 rounded-3xl border border-amber-700/40 bg-gradient-to-b from-amber-950/20 to-black/80 space-y-4 text-center relative hover:-translate-y-2 transition-transform">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-amber-700 text-amber-100 font-heading font-black text-sm flex items-center justify-center shadow-[0_0_15px_rgba(180,83,9,0.5)]">
              #3
            </div>
            <div className="relative mx-auto w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-700/60 mt-2">
              <img src={top3[2].avatar} alt={top3[2].name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-white">{top3[2].name}</h3>
              <p className="text-[11px] text-slate-400 truncate">{top3[2].school}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
              <div className="text-xs font-mono font-bold text-slate-200">{top3[2].xp.toLocaleString()} XP</div>
              <div className="text-[10px] text-[#66FCF1] flex items-center justify-center gap-1 font-mono">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>{top3[2].streakDays} Days Streak</span>
                <span>• {top3[2].accuracy}</span>
              </div>
            </div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-800/20 text-amber-300 border border-amber-700/30">
              {top3[2].badgeTitle}
            </span>
          </div>

        </div>
      )}

      {/* User Current Position Callout Pill */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#6366F1]/30 via-[#66FCF1]/20 to-black border-2 border-[#66FCF1]/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(102,252,241,0.2)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-black text-base flex items-center justify-center shrink-0 shadow-md">
            #4
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-heading font-bold text-white">Your Current Position: Rank 4</h4>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ▲ Moved Up 3 Ranks
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Only <strong className="text-[#66FCF1]">170 XP</strong> needed to claim Rank 3 podium! Solve 2 mock tests to pass.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
          <div className="text-right">
            <span className="text-slate-400 block text-[10px]">Your Score</span>
            <span className="text-base font-bold text-[#66FCF1]">3,450 XP</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[10px]">Active Streak</span>
            <span className="text-base font-bold text-amber-400">🔥 24 Days</span>
          </div>
        </div>
      </div>

      {/* Full Leaderboard Table (Ranks 4-7+) */}
      <div className="seo-3d-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-bold text-white">
            Top Academic Achievers
          </h3>
          <span className="text-xs text-slate-400 font-mono">Live Sync</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300 border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student & School</th>
                <th className="py-3 px-4">Subject Focus</th>
                <th className="py-3 px-4">Accuracy</th>
                <th className="py-3 px-4">Study Streak</th>
                <th className="py-3 px-4">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {remainingLeaders.map((lead) => (
                <tr 
                  key={lead.id} 
                  className={`transition-colors ${
                    lead.isCurrentUser 
                      ? 'bg-[#66FCF1]/10 border-l-4 border-[#66FCF1]' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-6 text-sm">#{lead.rank}</span>
                      {lead.trend === 'up' && (
                        <span className="text-[10px] text-emerald-400 font-bold">▲{lead.trendCount}</span>
                      )}
                      {lead.trend === 'down' && (
                        <span className="text-[10px] text-rose-400 font-bold">▼{lead.trendCount}</span>
                      )}
                      {lead.trend === 'same' && (
                        <span className="text-[10px] text-slate-500 font-bold">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-white/15">
                        <img src={lead.avatar} alt={lead.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{lead.name}</span>
                          {lead.isCurrentUser && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#66FCF1] text-[#0B0C10] font-bold">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{lead.school}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300">
                      {lead.subject}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">{lead.accuracy}</td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      {lead.streakDays}d
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#66FCF1] text-sm">{lead.xp.toLocaleString()} XP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
