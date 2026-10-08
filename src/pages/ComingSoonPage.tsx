import React, { useState } from 'react';
import { NexisLogo } from '../components/NexisLogo';
import { ACADEMY_INFO } from '../data/academyData';
import { Sparkles, Mail, Send, CheckCircle2, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

export const ComingSoonPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setJoined(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col justify-between p-6 bg-grid-pattern relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#66FCF1]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center z-10">
        <NexisLogo size="md" />
        <span className="px-3 py-1 rounded-full text-xs font-bold text-[#66FCF1] bg-[#66FCF1]/10 border border-[#66FCF1]/30">
          Launch 2026
        </span>
      </div>

      {/* Main Waitlist Hero */}
      <div className="max-w-xl mx-auto text-center space-y-6 z-10 py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#66FCF1]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Tuition Platform</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white leading-tight">
          A Smarter Way to Learn.
        </h1>

        <p className="text-gray-300 text-sm sm:text-base">
          Our new tech-driven 3D glassmorphic learning experience is coming soon to <span className="text-[#66FCF1] font-semibold">{ACADEMY_INFO.primaryDomain}</span>.
        </p>

        {joined ? (
          <div className="p-4 rounded-xl bg-[#66FCF1]/20 border border-[#66FCF1] text-[#66FCF1] text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>You're on the Nexis VIP waitlist! We'll notify you first.</span>
          </div>
        ) : (
          <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#66FCF1]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-2 glow-cyan-sm"
            >
              <span>Join Waitlist</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>

      {/* Footer Socials */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-gray-500 space-y-3 z-10">
        <div className="flex justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-[#66FCF1]"><Instagram className="w-4 h-4" /></a>
          <a href="#" className="hover:text-[#66FCF1]"><Facebook className="w-4 h-4" /></a>
          <a href="#" className="hover:text-[#66FCF1]"><Youtube className="w-4 h-4" /></a>
          <a href="#" className="hover:text-[#66FCF1]"><Linkedin className="w-4 h-4" /></a>
        </div>
        <p>© 2026 Nexis Academy. All Rights Reserved.</p>
      </div>
    </div>
  );
};
