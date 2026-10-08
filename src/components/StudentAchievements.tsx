import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Award, 
  Star, 
  Flame, 
  Zap, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  X, 
  Share2, 
  Download, 
  ShieldCheck,
  Crown
} from 'lucide-react';
import { AchievementBadge } from '../types';

export const StudentAchievements: React.FC = () => {
  const [badges, setBadges] = useState<AchievementBadge[]>([
    {
      id: 'badge-1',
      title: 'Math Mastermind',
      category: 'Exam Excellence',
      description: 'Secured a flawless 100% score in the Class 10 Algebra & Geometry Diagnostic Assessment.',
      iconName: 'trophy',
      isUnlocked: true,
      dateUnlocked: 'August 02, 2026',
      progressPercent: 100,
      xpReward: 500,
      rarity: 'Epic'
    },
    {
      id: 'badge-2',
      title: '14-Day Study Streak',
      category: 'Dedication',
      description: 'Logged into the Nexis Portal and completed study hours for 14 consecutive days.',
      iconName: 'flame',
      isUnlocked: true,
      dateUnlocked: 'August 10, 2026',
      progressPercent: 100,
      xpReward: 350,
      rarity: 'Rare'
    },
    {
      id: 'badge-3',
      title: 'Physics Numerical Titan',
      category: 'Problem Solving',
      description: 'Solved over 50+ advanced Physics numericals in Optics & Vector Mechanics.',
      iconName: 'zap',
      isUnlocked: true,
      dateUnlocked: 'July 28, 2026',
      progressPercent: 100,
      xpReward: 450,
      rarity: 'Rare'
    },
    {
      id: 'badge-4',
      title: 'Olympiad Junior Gold',
      category: 'Competitive',
      description: 'Achieved High Distinction in the IMO Regional Junior Foundation Olympiad.',
      iconName: 'crown',
      isUnlocked: true,
      dateUnlocked: 'June 15, 2026',
      progressPercent: 100,
      xpReward: 1000,
      rarity: 'Legendary'
    },
    {
      id: 'badge-5',
      title: 'Class 10 Board Centum',
      category: 'Board Sprint',
      description: 'Target 95%+ aggregate in the full-length simulated Class 10 Board Mock Examination.',
      iconName: 'award',
      isUnlocked: false,
      progressPercent: 85,
      xpReward: 800,
      rarity: 'Legendary'
    },
    {
      id: 'badge-6',
      title: 'Quantum Scholar',
      category: '3D Learning',
      description: 'Complete all 3D spatial visualization modules for Electrodynamics & Atomic Models.',
      iconName: 'star',
      isUnlocked: false,
      progressPercent: 60,
      xpReward: 400,
      rarity: 'Rare'
    },
    {
      id: 'badge-7',
      title: 'Top 1% Percentile AIR',
      category: 'All-India CBT',
      description: 'Rank among the Top 10 students across India in the monthly CBT Entrance Series.',
      iconName: 'sparkles',
      isUnlocked: false,
      progressPercent: 40,
      xpReward: 1200,
      rarity: 'Legendary'
    },
    {
      id: 'badge-8',
      title: 'Knowledge Guild Scholar',
      category: 'Resource Vault',
      description: 'Downloaded and revised all 12 chapter-wise formula flashcards and summary notes.',
      iconName: 'shield',
      isUnlocked: true,
      dateUnlocked: 'July 10, 2026',
      progressPercent: 100,
      xpReward: 200,
      rarity: 'Common'
    }
  ]);

  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);

  // Calculate total XP earned
  const totalXpEarned = badges
    .filter((b) => b.isUnlocked)
    .reduce((sum, b) => sum + b.xpReward, 0);

  const totalUnlockedCount = badges.filter((b) => b.isUnlocked).length;

  const unlockBadgeInstantly = (badgeId: string) => {
    setBadges((prev) =>
      prev.map((b) =>
        b.id === badgeId
          ? {
              ...b,
              isUnlocked: true,
              progressPercent: 100,
              dateUnlocked: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }
          : b
      )
    );
    if (selectedBadge && selectedBadge.id === badgeId) {
      setSelectedBadge({
        ...selectedBadge,
        isUnlocked: true,
        progressPercent: 100,
        dateUnlocked: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    }
  };

  const getRarityBadgeStyle = (rarity: AchievementBadge['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]';
      case 'Epic':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
      case 'Rare':
        return 'bg-[#66FCF1]/20 text-[#66FCF1] border-[#66FCF1]/50 shadow-[0_0_15px_rgba(102,252,241,0.3)]';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/50';
    }
  };

  const renderBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const iconClass = `w-7 h-7 ${isUnlocked ? 'text-[#66FCF1]' : 'text-gray-500'}`;
    switch (iconName) {
      case 'trophy':
        return <Trophy className={iconClass} />;
      case 'flame':
        return <Flame className={`w-7 h-7 ${isUnlocked ? 'text-amber-400 animate-pulse' : 'text-gray-500'}`} />;
      case 'zap':
        return <Zap className={iconClass} />;
      case 'crown':
        return <Crown className={`w-7 h-7 ${isUnlocked ? 'text-amber-300' : 'text-gray-500'}`} />;
      case 'sparkles':
        return <Sparkles className={iconClass} />;
      case 'award':
        return <Award className={iconClass} />;
      default:
        return <Star className={iconClass} />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* XP & Level Summary Bar */}
      <div className="seo-3d-card p-6 border border-white/15 bg-gradient-to-r from-[#1F2833] via-[#0B0C10] to-[#1F2833] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#66FCF1]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-[#66FCF1]/10 border border-[#66FCF1]/40 text-[#66FCF1] shadow-[0_0_20px_rgba(102,252,241,0.3)]">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#66FCF1] uppercase tracking-wider">ACADEMIC PROFILE MILESTONES</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-400/40">
                LEVEL 7 SCHOLAR
              </span>
            </div>
            <h3 className="text-2xl font-heading font-extrabold text-white">
              {totalUnlockedCount} of {badges.length} Digital Badges Unlocked
            </h3>
            <p className="text-xs text-gray-300 font-mono">
              Earn XP by completing diagnostic tests, maintaining study streaks, and solving challenge modules
            </p>
          </div>
        </div>

        {/* XP Counter Pill */}
        <div className="flex items-center gap-4 bg-black/60 p-4 rounded-2xl border border-white/10 shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-mono text-gray-400 uppercase block">Total Earned XP</span>
            <span className="text-2xl font-heading font-extrabold text-[#66FCF1] block">
              {totalXpEarned.toLocaleString()} <span className="text-xs font-normal text-gray-400">XP</span>
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-[#66FCF1] flex items-center justify-center text-[#66FCF1] font-extrabold text-xs shadow-[0_0_15px_rgba(102,252,241,0.4)]">
            +XP
          </div>
        </div>

      </div>

      {/* Badges 3D Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className={`seo-3d-card p-6 flex flex-col justify-between space-y-4 cursor-pointer relative group transition-all border ${
              badge.isUnlocked
                ? 'bg-gradient-to-br from-[#1F2833]/90 via-[#0B0C10] to-[#1F2833]/80 border-white/20 hover:border-[#66FCF1] shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(102,252,241,0.3)] hover:-translate-y-1.5'
                : 'bg-black/40 border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Top Rarity & Status Badge */}
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${getRarityBadgeStyle(badge.rarity)}`}>
                {badge.rarity}
              </span>

              {badge.isUnlocked ? (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Unlocked</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>{badge.progressPercent}%</span>
                </span>
              )}
            </div>

            {/* Icon Emblem Container */}
            <div className="flex justify-center my-2">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center relative transition-transform group-hover:scale-110 ${
                badge.isUnlocked
                  ? 'bg-gradient-to-tr from-[#66FCF1]/20 via-black to-[#45A29E]/30 border-2 border-[#66FCF1]/50 shadow-[0_0_25px_rgba(102,252,241,0.3)]'
                  : 'bg-black/60 border border-white/10'
              }`}>
                {renderBadgeIcon(badge.iconName, badge.isUnlocked)}

                {/* Metallic Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl pointer-events-none" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="text-center space-y-1">
              <h4 className="font-heading font-extrabold text-base text-white group-hover:text-[#66FCF1] transition-colors">
                {badge.title}
              </h4>
              <p className="text-[11px] text-gray-300 line-clamp-2 leading-relaxed">
                {badge.description}
              </p>
            </div>

            {/* Progress / XP Footer */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              {badge.isUnlocked ? (
                <div className="flex items-center justify-between text-[10px] font-mono text-[#66FCF1]">
                  <span>Earned: {badge.dateUnlocked}</span>
                  <span className="font-bold text-amber-300">+{badge.xpReward} XP</span>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-gray-400">
                    <span>Milestone Progress</span>
                    <span>{badge.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#66FCF1] h-full rounded-full" style={{ width: `${badge.progressPercent}%` }} />
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        ))}
      </div>

      {/* 3D Glass Badge Inspect Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#1F2833] border-2 border-[#66FCF1]/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(102,252,241,0.3)] space-y-6 relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Rarity Tag */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${getRarityBadgeStyle(selectedBadge.rarity)}`}>
                  {selectedBadge.rarity} Badge
                </span>
                <span className="text-xs font-mono text-gray-400">{selectedBadge.category}</span>
              </div>

              {/* Holographic 3D Icon Container */}
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <div className={`w-28 h-28 rounded-3xl flex items-center justify-center relative border-2 shadow-2xl ${
                  selectedBadge.isUnlocked
                    ? 'bg-gradient-to-tr from-[#66FCF1]/30 via-black to-[#45A29E]/40 border-[#66FCF1] shadow-[0_0_40px_rgba(102,252,241,0.4)]'
                    : 'bg-black/60 border-white/20'
                }`}>
                  {renderBadgeIcon(selectedBadge.iconName, selectedBadge.isUnlocked)}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-3xl pointer-events-none" />
                </div>

                <h3 className="text-2xl font-heading font-extrabold text-white text-center">
                  {selectedBadge.title}
                </h3>
                <p className="text-xs text-gray-300 text-center max-w-md leading-relaxed">
                  {selectedBadge.description}
                </p>
              </div>

              {/* Details & Reward Card */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-400">XP Reward Value:</span>
                  <span className="font-extrabold text-amber-300">+{selectedBadge.xpReward} XP</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-400">Unlock Status:</span>
                  <span className={`font-bold ${selectedBadge.isUnlocked ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {selectedBadge.isUnlocked ? `Earned on ${selectedBadge.dateUnlocked}` : `In Progress (${selectedBadge.progressPercent}%)`}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {selectedBadge.isUnlocked ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => alert(`Certificate of ${selectedBadge.title} downloaded to your device!`)}
                      className="py-3 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(102,252,241,0.3)] hover:scale-102 transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Certificate</span>
                    </button>

                    <button
                      onClick={() => alert(`Badge link for ${selectedBadge.title} copied to clipboard!`)}
                      className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-[#66FCF1]" />
                      <span>Share Achievement</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => unlockBadgeInstantly(selectedBadge.id)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#66FCF1] to-[#45A29E] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(102,252,241,0.4)] hover:scale-102 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Complete Test Milestone & Unlock Badge Now</span>
                  </button>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
