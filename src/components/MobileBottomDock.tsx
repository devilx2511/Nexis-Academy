import React, { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  Bot, 
  Calendar, 
  Menu, 
  X, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Star, 
  HelpCircle, 
  FileText, 
  Phone, 
  UserCheck, 
  Terminal, 
  ChevronRight, 
  Sun, 
  Moon, 
  Shield, 
  MessageSquare,
  Flame,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { PageRoute } from '../types';
import { NexisLogo } from './NexisLogo';

interface MobileBottomDockProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenDemoModal: (subject?: string) => void;
  onOpenAITutor: () => void;
  isAITutorOpen?: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isLoggedIn?: boolean;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  currentRoute,
  onNavigate,
  onOpenDemoModal,
  onOpenAITutor,
  isAITutorOpen = false,
  isDarkMode,
  onToggleTheme,
  isLoggedIn = false,
}) => {
  const [isExploreDrawerOpen, setIsExploreDrawerOpen] = useState(false);

  const handleTabClick = (action: () => void) => {
    action();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: Array<{ label: string; route: PageRoute; icon: React.FC<{ className?: string }> }> = [
    { label: 'Home Page', route: 'home', icon: Compass },
    { label: 'All Courses & Batches', route: 'courses', icon: BookOpen },
    { label: 'About & Vision', route: 'about', icon: Sparkles },
    { label: 'Expert Faculty', route: 'faculty', icon: GraduationCap },
    { label: 'Results & Ranks', route: 'results', icon: Award },
    { label: 'Testimonials & Reviews', route: 'testimonials', icon: Star },
    { label: 'FAQs & Answers', route: 'faq', icon: HelpCircle },
    { label: 'Articles & Study Blog', route: 'blog', icon: FileText },
    { label: 'Contact & Campus', route: 'contact', icon: Phone },
  ];

  return (
    <>
      {/* ============================================================ */}
      {/* FLOATING MOBILE & TABLET BOTTOM DOCK (Hidden on Laptop lg:hidden) */}
      {/* ============================================================ */}
      <div className="lg:hidden fixed bottom-3 sm:bottom-4 left-0 right-0 z-40 px-3 pointer-events-none flex justify-center">
        <nav 
          aria-label="Mobile Navigation Dock"
          className="pointer-events-auto w-full max-w-md bg-[#0B0C10]/95 sm:bg-[#0B0C10]/90 backdrop-blur-2xl border border-[#C5A880]/30 sm:border-[#66FCF1]/30 rounded-[28px] shadow-[0_12px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(197,168,128,0.15)] px-2 sm:px-4 py-2 relative flex items-center justify-between transition-all"
        >
          {/* Subtle Ambient Top Border Glow Line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A880] sm:via-[#66FCF1] to-transparent opacity-70" />

          {/* TAB 1: HOME */}
          <button
            onClick={() => handleTabClick(() => onNavigate('home'))}
            className="flex-1 flex flex-col items-center justify-center py-1 group cursor-pointer transition-all active:scale-95"
            aria-label="Navigate to Home"
          >
            <div className={`relative p-1.5 rounded-full transition-all duration-300 ${
              currentRoute === 'home' || currentRoute === 'infant'
                ? 'bg-gradient-to-b from-[#C5A880]/25 to-[#C5A880]/5 text-[#E5B869] shadow-[0_0_12px_rgba(229,184,105,0.4)] ring-1 ring-[#E5B869]/50'
                : 'text-gray-400 group-hover:text-gray-200'
            }`}>
              <Compass className={`w-5 h-5 transition-transform duration-300 ${
                currentRoute === 'home' ? 'scale-110' : 'group-hover:scale-105'
              }`} />
            </div>
            <span className={`text-[10px] sm:text-[11px] font-medium tracking-tight mt-0.5 transition-colors ${
              currentRoute === 'home' || currentRoute === 'infant'
                ? 'text-[#E5B869] font-bold'
                : 'text-gray-400 group-hover:text-gray-300'
            }`}>
              Home
            </span>
            {(currentRoute === 'home' || currentRoute === 'infant') && (
              <span className="w-1 h-1 rounded-full bg-[#E5B869] shadow-[0_0_6px_#E5B869] mt-0.5" />
            )}
          </button>

          {/* TAB 2: COURSES / MENU */}
          <button
            onClick={() => handleTabClick(() => onNavigate('courses'))}
            className="flex-1 flex flex-col items-center justify-center py-1 group cursor-pointer transition-all active:scale-95"
            aria-label="Browse Courses"
          >
            <div className={`relative p-1.5 rounded-full transition-all duration-300 ${
              currentRoute === 'courses'
                ? 'bg-gradient-to-b from-[#C5A880]/25 to-[#C5A880]/5 text-[#E5B869] shadow-[0_0_12px_rgba(229,184,105,0.4)] ring-1 ring-[#E5B869]/50'
                : 'text-gray-400 group-hover:text-gray-200'
            }`}>
              <BookOpen className={`w-5 h-5 transition-transform duration-300 ${
                currentRoute === 'courses' ? 'scale-110' : 'group-hover:scale-105'
              }`} />
            </div>
            <span className={`text-[10px] sm:text-[11px] font-medium tracking-tight mt-0.5 transition-colors ${
              currentRoute === 'courses'
                ? 'text-[#E5B869] font-bold'
                : 'text-gray-400 group-hover:text-gray-300'
            }`}>
              Courses
            </span>
            {currentRoute === 'courses' && (
              <span className="w-1 h-1 rounded-full bg-[#E5B869] shadow-[0_0_6px_#E5B869] mt-0.5" />
            )}
          </button>

          {/* TAB 3: ELEVATED CENTER ACTION BUTTON -> NEXIS AI TUTOR ✦ */}
          <div className="flex-1 flex flex-col items-center justify-center relative -top-4 sm:-top-5">
            <button
              onClick={onOpenAITutor}
              className="relative group cursor-pointer active:scale-90 transition-transform duration-300"
              aria-label="Open 24/7 Nexis AI Doubt Solver Assistant"
              title="Nexis AI 24/7 Academic Doubt Solver"
            >
              {/* Outer Golden/Cyan Halo Ring Glow */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#E5B869] via-[#66FCF1] to-[#E5B869] opacity-70 group-hover:opacity-100 blur-sm animate-pulse transition-opacity" />
              
              {/* Outer Ring Border */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full p-[2px] bg-gradient-to-b from-[#E5B869] via-[#8C6D3F] to-[#1F2833] shadow-[0_8px_25px_rgba(229,184,105,0.45)]">
                {/* Inner Elevated Orb */}
                <div className={`w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${
                  isAITutorOpen
                    ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[inset_0_0_12px_rgba(0,0,0,0.5)]'
                    : 'bg-gradient-to-b from-[#2B1B17] via-[#161214] to-[#0B0C10] text-[#E5B869] group-hover:text-[#66FCF1]'
                }`}>
                  <Bot className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${
                    isAITutorOpen ? 'scale-110 rotate-12 text-[#0B0C10]' : 'group-hover:scale-110'
                  }`} />
                </div>
              </div>

              {/* Ping Dot for AI Online status */}
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0B0C10] animate-ping" />
              <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0B0C10]" />
            </button>

            <span className="text-[10px] sm:text-[11px] font-extrabold tracking-tight mt-1 flex items-center gap-0.5 text-transparent bg-clip-text bg-gradient-to-r from-[#E5B869] via-[#FFF2B2] to-[#E5B869] drop-shadow-[0_1px_4px_rgba(229,184,105,0.5)]">
              <span>Nexis AI</span>
              <Sparkles className="w-2.5 h-2.5 text-[#E5B869] inline" />
            </span>
          </div>

          {/* TAB 4: BOOK DEMO / RESERVE */}
          <button
            onClick={() => onOpenDemoModal()}
            className="flex-1 flex flex-col items-center justify-center py-1 group cursor-pointer transition-all active:scale-95"
            aria-label="Book a Free Demo Class"
          >
            <div className="relative p-1.5 rounded-full text-gray-400 group-hover:text-[#E5B869] transition-all duration-300">
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-tight mt-0.5 text-gray-400 group-hover:text-gray-200 transition-colors">
              Reserve
            </span>
          </button>

          {/* TAB 5: EXPLORE / MENU */}
          <button
            onClick={() => setIsExploreDrawerOpen(true)}
            className="flex-1 flex flex-col items-center justify-center py-1 group cursor-pointer transition-all active:scale-95"
            aria-label="Open Explore Menu"
          >
            <div className={`relative p-1.5 rounded-full transition-all duration-300 ${
              isExploreDrawerOpen
                ? 'bg-gradient-to-b from-[#C5A880]/25 to-[#C5A880]/5 text-[#E5B869] ring-1 ring-[#E5B869]/50'
                : 'text-gray-400 group-hover:text-gray-200'
            }`}>
              <Menu className="w-5 h-5 group-hover:scale-105 transition-transform" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-tight mt-0.5 text-gray-400 group-hover:text-gray-200 transition-colors">
              Explore
            </span>
          </button>
        </nav>
      </div>

      {/* ============================================================ */}
      {/* MOBILE & TABLET FULL EXPLORE DRAWER (All Laptop Features)    */}
      {/* ============================================================ */}
      {isExploreDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fade-in">
          {/* Backdrop click to dismiss */}
          <div 
            className="flex-1" 
            onClick={() => setIsExploreDrawerOpen(false)} 
            aria-hidden="true"
          />

          <div className="w-full max-h-[85vh] bg-[#0E1017] border-t border-[#C5A880]/40 rounded-t-[32px] shadow-[0_-15px_50px_rgba(0,0,0,0.9)] overflow-y-auto p-5 sm:p-6 text-white space-y-5 animate-scale-up">
            
            {/* Drawer Header Handle & Close */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <NexisLogo size="sm" />
                <div className="text-xs font-mono text-[#E5B869] font-bold">
                  Exploration Hub
                </div>
              </div>

              <button
                onClick={() => setIsExploreDrawerOpen(false)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                aria-label="Close Explore Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Master Cards (DevMode & Student Portal) */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* DevMode Console */}
              <button
                onClick={() => {
                  setIsExploreDrawerOpen(false);
                  onNavigate('devmode');
                }}
                className="p-3.5 rounded-2xl bg-black/60 border border-[#66FCF1]/40 text-left hover:border-[#66FCF1] transition-all group shadow-[0_0_15px_rgba(102,252,241,0.15)]"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#66FCF1]/20 flex items-center justify-center text-[#66FCF1]">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#66FCF1] animate-pulse" />
                </div>
                <div className="text-xs font-heading font-extrabold text-[#66FCF1]">DevMode</div>
                <div className="text-[10px] text-gray-400 font-mono">Master Console</div>
              </button>

              {/* Student Portal & Sign In */}
              <button
                onClick={() => {
                  setIsExploreDrawerOpen(false);
                  onNavigate('portal');
                }}
                className="p-3.5 rounded-2xl bg-gradient-to-br from-[#66FCF1]/10 via-white/5 to-transparent border border-[#66FCF1]/30 text-left hover:border-[#66FCF1] transition-all group shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#66FCF1]/20 flex items-center justify-center text-[#66FCF1]">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#66FCF1]/20 text-[#66FCF1] font-bold">
                    {isLoggedIn ? 'Account Active' : 'Sign In'}
                  </span>
                </div>
                <div className="text-xs font-heading font-extrabold text-white">
                  {isLoggedIn ? 'My Portal' : 'Sign In / Portal'}
                </div>
                <div className="text-[10px] text-gray-400">Tests, Badges & Alarms</div>
              </button>
            </div>

            {/* Main Navigation Links Grid */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-gray-400 px-1">
                Academic Pages & Resources
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {navLinks.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = currentRoute === item.route;
                  return (
                    <button
                      key={item.route}
                      onClick={() => {
                        setIsExploreDrawerOpen(false);
                        onNavigate(item.route);
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#E5B869]/20 border border-[#E5B869]/50 text-[#E5B869] font-bold'
                          : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <ItemIcon className={`w-4 h-4 ${isActive ? 'text-[#E5B869]' : 'text-gray-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Infant / Early Childhood Program Banner */}
            <button
              onClick={() => {
                setIsExploreDrawerOpen(false);
                onNavigate('infant');
              }}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#1F2833] via-slate-900 to-[#1F2833] border border-[#66FCF1]/30 flex items-center justify-between text-left hover:border-[#66FCF1] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#66FCF1]/20 flex items-center justify-center text-[#66FCF1]">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Opening Program Experience</div>
                  <div className="text-[10px] text-[#66FCF1]">Class 6-8 Junior Foundation & 3D Lab</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#66FCF1]" />
            </button>

            {/* Controls Bar: Theme Switcher & Direct WhatsApp / Call */}
            <div className="pt-2 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={onToggleTheme}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium flex items-center justify-center gap-2 text-gray-200"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#66FCF1]" />
                    <span>Dark Theme</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsExploreDrawerOpen(false);
                  onOpenDemoModal();
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#E5B869] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(229,184,105,0.4)]"
              >
                <span>Book Free Demo</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Legal Links */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-gray-500 pt-1">
              <button onClick={() => { setIsExploreDrawerOpen(false); onNavigate('privacy'); }}>Privacy Policy</button>
              <span>•</span>
              <button onClick={() => { setIsExploreDrawerOpen(false); onNavigate('terms'); }}>Terms & Conditions</button>
              <span>•</span>
              <span>Nexis Academy © 2026</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
