import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, UserCheck, ChevronRight, Moon, Sun, Terminal, LogIn, Baby, Radio } from 'lucide-react';
import { NexisLogo } from './NexisLogo';
import { VoiceNavigator } from './VoiceNavigator';
import { PageRoute } from '../types';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenDemoModal: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenDemoModal,
  isDarkMode,
  onToggleTheme,
  isLoggedIn = false
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: Array<{ label: string; route: PageRoute; badge?: string }> = [
    { label: 'Home', route: 'home' },
    { label: 'About', route: 'about' },
    { label: 'Courses', route: 'courses' },
    { label: 'Faculty', route: 'faculty' },
    { label: 'Results', route: 'results' },
    { label: 'Testimonials', route: 'testimonials' },
    { label: 'FAQ', route: 'faq' },
    { label: 'Blog', route: 'blog' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'py-2.5 glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
        : 'py-3.5 bg-[#0B0C10]/80 backdrop-blur-md border-b border-white/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => handleNavClick('home')} className="cursor-pointer">
            <NexisLogo size="md" />
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#66FCF1] bg-[#66FCF1]/10 font-semibold border border-[#66FCF1]/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3">
            
            {/* Live Classes Counter Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>142 Live Sessions</span>
            </div>

            {/* Web Speech API Voice Navigator */}
            <VoiceNavigator
              onNavigate={handleNavClick}
              onOpenDemoModal={onOpenDemoModal}
              onToggleTheme={onToggleTheme}
            />

            {/* Dual-State Theme Switcher Pill */}
            <button
              onClick={onToggleTheme}
              className={`relative px-2.5 xl:px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-2 group ${
                isDarkMode
                  ? 'bg-black/60 border-[#66FCF1]/40 shadow-[0_0_15px_rgba(102,252,241,0.2)]'
                  : 'bg-white/90 border-slate-300 shadow-[0_0_15px_rgba(0,0,0,0.08)]'
              }`}
              title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Obsidian Theme"}
              aria-label="Toggle dark or light color theme"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 transform ${
                  isDarkMode
                    ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_10px_#66FCF1]'
                    : 'bg-amber-500 text-white shadow-[0_0_10px_#f59e0b] translate-x-0'
                }`}
              >
                {isDarkMode ? (
                  <Moon className="w-3 h-3 text-[#0B0C10] transition-transform duration-300 rotate-0" />
                ) : (
                  <Sun className="w-3 h-3 text-white transition-transform duration-300 rotate-180" />
                )}
              </div>

              <span className={`text-[11px] font-mono font-bold tracking-wider transition-colors ${
                isDarkMode ? 'text-[#66FCF1]' : 'text-slate-800'
              }`}>
                {isDarkMode ? 'Dark' : 'Light'}
              </span>
            </button>

            {/* DevMode Console Button */}
            <button
              onClick={() => handleNavClick('devmode')}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 border transition-all cursor-pointer group ${
                currentRoute === 'devmode' || currentRoute === 'admin'
                  ? 'bg-[#66FCF1]/25 border-[#66FCF1] text-[#66FCF1] shadow-[0_0_15px_rgba(102,252,241,0.3)]'
                  : 'bg-black/50 border-[#66FCF1]/40 text-[#66FCF1] hover:bg-[#66FCF1]/10 hover:border-[#66FCF1]'
              }`}
              title="DevMode & Master Console (Pass: Sanhati26052009)"
            >
              <Terminal className="w-3.5 h-3.5 text-[#66FCF1] group-hover:rotate-12 transition-transform" />
              <span>DevMode</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#66FCF1] animate-pulse" />
            </button>

            {/* PROMINENT SIGN IN / PORTAL BUTTON */}
            <button
              onClick={() => handleNavClick('portal')}
              className={`px-3.5 py-2 rounded-xl text-xs font-heading font-extrabold flex items-center gap-2 border transition-all cursor-pointer ${
                currentRoute === 'portal'
                  ? 'bg-[#66FCF1] text-[#0B0C10] border-[#66FCF1] shadow-[0_0_15px_rgba(102,252,241,0.4)]'
                  : isLoggedIn
                  ? 'bg-[#66FCF1]/15 border-[#66FCF1]/50 text-[#66FCF1] hover:bg-[#66FCF1]/25'
                  : 'bg-white/10 hover:bg-white/20 border-white/25 text-white hover:border-[#66FCF1]/60 shadow-sm'
              }`}
              id="navbar-sign-in-btn"
            >
              {isLoggedIn ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-[#66FCF1]" />
                  <span>My Portal</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5 text-[#66FCF1]" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Primary Demo Class CTA */}
            <button
              onClick={onOpenDemoModal}
              className="px-3.5 xl:px-4 py-2 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs xl:text-sm hover:bg-[#66FCF1]/90 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(102,252,241,0.3)] hover:scale-105 cursor-pointer"
            >
              <span>Book Demo</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Direct Sign In Button */}
            <button
              onClick={() => handleNavClick('portal')}
              className="px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              id="mobile-nav-sign-in-btn"
            >
              <LogIn className="w-3.5 h-3.5 text-[#66FCF1]" />
              <span>{isLoggedIn ? 'Portal' : 'Sign In'}</span>
            </button>

            {/* Mobile DevMode Quick Access */}
            <button
              onClick={() => handleNavClick('devmode')}
              className="p-2 rounded-lg bg-black/60 border border-[#66FCF1]/40 text-[#66FCF1] text-xs font-mono font-bold flex items-center gap-1"
              title="DevMode"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-white/5 text-gray-300"
              aria-label="Toggle dark/light theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-[#66FCF1]" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-[#66FCF1] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 px-4 pb-6 pt-2 bg-[#0B0C10]/95 border-b border-[#66FCF1]/20 backdrop-blur-xl animate-fade-in">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => handleNavClick(link.route)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'text-[#66FCF1] bg-[#66FCF1]/10 font-bold border border-[#66FCF1]/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#66FCF1]/20 text-[#66FCF1]">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-[#66FCF1]" />}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-white/10 space-y-2">
              {/* Prominent Sign In in Mobile Drawer */}
              <button
                onClick={() => handleNavClick('portal')}
                className="w-full py-3 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(102,252,241,0.3)] cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{isLoggedIn ? 'Go to Student / Parent Portal' : 'Sign In / Register Account'}</span>
              </button>

              <button
                onClick={() => handleNavClick('devmode')}
                className="w-full py-2.5 rounded-xl bg-black/60 border border-[#66FCF1]/40 text-[#66FCF1] font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(102,252,241,0.2)]"
              >
                <Terminal className="w-4 h-4 text-[#66FCF1]" />
                <span>DevMode Master Console (Pass: Sanhati26052009)</span>
              </button>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => handleNavClick('privacy')}
                  className="flex-1 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white text-xs text-center"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => handleNavClick('terms')}
                  className="flex-1 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white text-xs text-center"
                >
                  Terms of Service
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoModal();
                }}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-heading font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Free Demo Class</span>
                <Sparkles className="w-4 h-4 text-[#66FCF1]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
