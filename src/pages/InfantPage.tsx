import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  BrainCircuit, 
  Target, 
  Compass, 
  GraduationCap, 
  CheckCircle2, 
  Zap, 
  Award, 
  Lock,
  Mail,
  User as UserIcon,
  LogIn,
  UserPlus,
  ShieldCheck
} from 'lucide-react';
import { PageRoute, UserRole } from '../types';
import { NexisLogo } from '../components/NexisLogo';
import { useAuth } from '../context/AuthContext';

interface InfantPageProps {
  onEnterHomeWithLoading: () => void;
  onOpenDemoModal: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const InfantPage: React.FC<InfantPageProps> = ({
  onEnterHomeWithLoading,
  onOpenDemoModal,
  onNavigate
}) => {
  const { user, loginWithEmail, signupWithEmail, loginWithGoogle, loginAsGuest, error, clearError } = useAuth();
  
  // Auth Form State
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [studentRole, setStudentRole] = useState<UserRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const pillars = [
    {
      icon: <BrainCircuit className="w-6 h-6 text-[#66FCF1]" />,
      title: "Early Curiosity Labs",
      description: "Nurturing logical thinking and conceptual depth using 3D visual models and real-world science demonstrations."
    },
    {
      icon: <Target className="w-6 h-6 text-[#45A29E]" />,
      title: "1-on-1 Diagnostic Orientation",
      description: "Every young scholar undergoes an initial diagnostic assessment to identify learning style, strengths, and target areas."
    },
    {
      icon: <Compass className="w-6 h-6 text-[#66FCF1]" />,
      title: "Small-Batch Personal Care",
      description: "Micro-batches capped strictly at 8-10 students guarantee personalized mentor attention and active participation."
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[#45A29E]" />,
      title: "Parent Guidance & Transparency",
      description: "Dedicated parent counselor check-ins and bi-weekly diagnostic updates ensure zero student backlogs."
    }
  ];

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email || !password) {
      setLocalError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (authMode === 'signin') {
        const loggedUser = await loginWithEmail(email, password, studentRole);
        if (loggedUser) {
          onEnterHomeWithLoading();
        }
      } else {
        if (!name.trim()) {
          setLocalError('Please provide your full name for registration.');
          setIsSubmitting(false);
          return;
        }
        const newUser = await signupWithEmail(email, password, name, studentRole);
        if (newUser) {
          onEnterHomeWithLoading();
        }
      }
    } catch (err: any) {
      setLocalError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    clearError();
    setIsSubmitting(true);
    try {
      const loggedUser = await loginWithGoogle(studentRole);
      if (loggedUser) {
        onEnterHomeWithLoading();
      }
    } catch (err: any) {
      setLocalError(err.message || 'Google sign in was cancelled or failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestEnter = async () => {
    setLocalError(null);
    clearError();
    setIsSubmitting(true);
    try {
      await loginAsGuest('student');
      onEnterHomeWithLoading();
    } catch {
      onEnterHomeWithLoading();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white pt-8 pb-20 relative overflow-hidden bg-grid-pattern selection:bg-[#66FCF1] selection:text-[#0B0C10]">
      
      {/* Ambient Glowing Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#66FCF1]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-96 h-96 bg-[#45A29E]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Minimalist Brand Header for Infant */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative z-20">
        <NexisLogo size="md" />

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDemoModal}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-[#66FCF1]" />
            <span>Book Demo</span>
          </button>

          <button
            onClick={onEnterHomeWithLoading}
            className="px-4 py-2 rounded-xl bg-[#66FCF1] text-[#0B0C10] text-xs font-heading font-extrabold flex items-center gap-1.5 shadow-[0_0_15px_rgba(102,252,241,0.3)] hover:scale-105 transition-all cursor-pointer"
          >
            <span>Enter Academy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 mt-6">
        
        {/* HERO & AUTHENTICATION GATEWAY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2">
          
          {/* Left Column: Infant Presentation & Overview */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#66FCF1]/40 text-[#66FCF1] text-xs font-mono font-bold tracking-wider uppercase glow-cyan-sm">
              <Sparkles className="w-4 h-4 text-[#66FCF1]" />
              <span>NEXIS INFANT OPENING GATEWAY • EARLY & FOUNDATION LEARNING</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-6xl font-heading font-black leading-[1.1] tracking-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#66FCF1] to-[#45A29E] drop-shadow-[0_0_35px_rgba(102,252,241,0.5)]">
                Nexis Infant
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-sans max-w-2xl">
              The official opening gateway for young scholars and parents. Build an unbreakable conceptual foundation, ignite early scientific curiosity, and prepare for academic distinction before stepping into the main academy.
            </p>

            {/* Quick Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#66FCF1]/20 flex items-center justify-center text-[#66FCF1] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">Micro-Batches (Capped at 8)</span>
                  <span className="text-gray-400 text-[11px] font-mono">Guaranteed personal mentor care</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#45A29E]/20 flex items-center justify-center text-[#45A29E] shrink-0">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">3D Spatial Science & Math</span>
                  <span className="text-gray-400 text-[11px] font-mono">Visual first-principles mastery</span>
                </div>
              </div>
            </div>

            {/* Quick Action Ribbon */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Admissions Open for 2026</span>
              </span>
              <span className="text-gray-600">•</span>
              <button
                type="button"
                onClick={onOpenDemoModal}
                className="text-[#66FCF1] hover:underline cursor-pointer"
              >
                Schedule Free Diagnostic Assessment →
              </button>
            </div>

          </div>

          {/* Right Column: Direct Sign In / Sign Up / Enter Gateway Box */}
          <div className="lg:col-span-5">
            <div className="seo-3d-card p-6 sm:p-8 bg-[#0B0C10]/95 border border-[#66FCF1]/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative overflow-hidden">
              
              {/* Subtle background gradient glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#66FCF1]/15 rounded-full blur-[50px] pointer-events-none" />

              {user ? (
                /* Authenticated User View */
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#1F2833] border border-[#66FCF1]/50 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(102,252,241,0.3)]">
                    <UserIcon className="w-8 h-8 text-[#66FCF1]" />
                  </div>

                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Logged In
                    </span>
                    <h3 className="text-xl font-heading font-extrabold text-white">
                      Welcome, {user.name}!
                    </h3>
                    <p className="text-xs text-gray-400 font-mono">
                      Role: <span className="text-[#66FCF1] capitalize">{user.role}</span> • {user.email}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={onEnterHomeWithLoading}
                      className="w-full py-4 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-black text-sm hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(102,252,241,0.5)] hover:scale-105 cursor-pointer"
                    >
                      <span>Proceed to Homepage</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onNavigate('portal')}
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-bold text-white transition-all cursor-pointer"
                    >
                      Open Student / Parent Portal
                    </button>
                  </div>
                </div>
              ) : (
                /* Unauthenticated Login / Sign Up Gateway Form */
                <div className="space-y-5">
                  
                  {/* Header */}
                  <div className="text-center space-y-1">
                    <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-[#66FCF1]">
                      <Zap className="w-3.5 h-3.5" />
                      <span>GATEWAY ACCESS</span>
                    </div>
                    <h3 className="text-xl font-heading font-extrabold text-white">
                      {authMode === 'signin' ? 'Sign In & Enter Academy' : 'Create Free Student Account'}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {authMode === 'signin' ? 'Sign in to access courses and your personalized portal' : 'Join Nexis Academy with full curriculum access'}
                    </p>
                  </div>

                  {/* Mode Tabs */}
                  <div className="flex p-1 rounded-xl bg-black/60 border border-white/15 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => { setAuthMode('signin'); setLocalError(null); }}
                      className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        authMode === 'signin'
                          ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_10px_rgba(102,252,241,0.3)]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Sign In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { setAuthMode('signup'); setLocalError(null); }}
                      className={`flex-1 py-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        authMode === 'signup'
                          ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_10px_rgba(102,252,241,0.3)]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Sign Up</span>
                    </button>
                  </div>

                  {/* Error Notification */}
                  {(localError || error) && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>{localError || error}</span>
                    </div>
                  )}

                  {/* Auth Form */}
                  <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                    
                    {authMode === 'signup' && (
                      <div>
                        <label className="block text-xs font-mono text-gray-300 mb-1">Full Name</label>
                        <div className="relative">
                          <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Student / Parent Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-[#66FCF1]"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-[#66FCF1]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1">Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-[#66FCF1]"
                        />
                      </div>
                    </div>

                    {/* Role Selector Pill */}
                    <div className="flex items-center justify-between text-xs font-mono pt-1">
                      <span className="text-gray-400">Account Type:</span>
                      <div className="flex gap-1.5">
                        {(['student', 'parent'] as const).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setStudentRole(r)}
                            className={`px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                              studentRole === r 
                                ? 'bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40 font-bold' 
                                : 'bg-black/40 text-gray-400 border border-white/10'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-black text-xs hover:bg-[#66FCF1]/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(102,252,241,0.4)] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Authenticating...</span>
                      ) : (
                        <>
                          <span>{authMode === 'signin' ? 'Sign In & Enter Home' : 'Register & Enter Home'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>

                  {/* Alternative 1-Click Fast Access Buttons */}
                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono text-gray-200 font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleGuestEnter}
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded-xl bg-black/40 hover:bg-white/5 border border-dashed border-white/20 text-[11px] font-mono text-gray-400 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Explore Academy as Guest (Skip Login)</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

        {/* INFANT PILLARS GRID */}
        <div className="space-y-8 pt-4">
          <div className="text-center space-y-3">
            <span className="text-[#66FCF1] text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
              Core Methodologies
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
              The Nexis Infant Advantage
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              How our early foundation ecosystem sets the groundwork for lifelong academic confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item, idx) => (
              <div 
                key={idx} 
                className="seo-3d-card p-6 flex flex-col justify-between space-y-4 hover:border-[#66FCF1]/50 transition-all group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1F2833] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#66FCF1] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10 text-[11px] text-[#66FCF1] font-mono font-semibold flex items-center gap-1">
                  <span>Infant Standard</span>
                  <Zap className="w-3 h-3 text-[#66FCF1]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1F2833] via-[#0B0C10] to-[#1F2833] border border-[#66FCF1]/30 text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Ready to Discover the Full Academy?
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm">
              Explore our full board sprint programs, JEE/NEET competitive tracks, faculty profiles, and student success analytics.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onEnterHomeWithLoading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-sm hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(102,252,241,0.4)] cursor-pointer"
              >
                <span>Launch Main Homepage</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-heading font-bold text-xs transition-all cursor-pointer"
              >
                Book Free Trial Class
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
