import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { useAuth } from '../context/AuthContext';
import { NexisLogo } from '../components/NexisLogo';
import { PortalProgressTracker } from '../components/PortalProgressTracker';
import { PortalNotificationScheduler } from '../components/PortalNotificationScheduler';
import { StudentAchievements } from '../components/StudentAchievements';
import { StudentAnalyticsDashboard } from '../components/StudentAnalyticsDashboard';
import { GamificationLeaderboard } from '../components/GamificationLeaderboard';
import { ExamCountdownTimer } from '../components/ExamCountdownTimer';
import { ConfirmationResult } from '../lib/firebase';
import { 
  ShieldCheck, 
  LogIn, 
  Lock, 
  Mail, 
  Phone, 
  UserCheck, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  User as UserIcon, 
  RefreshCw, 
  KeyRound,
  GraduationCap
} from 'lucide-react';

interface PortalPageProps {
  onOpenDemoModal: () => void;
}

type AuthMethod = 'google' | 'email' | 'phone' | 'guest';

export const PortalPage: React.FC<PortalPageProps> = ({ onOpenDemoModal }) => {
  const { 
    user, 
    loginWithGoogle, 
    loginWithEmail, 
    signupWithEmail, 
    resetPassword, 
    loginAsGuest, 
    sendPhoneOtp, 
    verifyPhoneOtp, 
    logout,
    error,
    clearError
  } = useAuth();

  const [authMethod, setAuthMethod] = useState<AuthMethod>('google');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<'overview' | 'countdown' | 'analytics' | 'leaderboard' | 'achievements' | 'reminders' | 'tracker' | 'courses' | 'attendance' | 'scores'>('overview');

  // Email state
  const [emailMode, setEmailMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [studentClassInput, setStudentClassInput] = useState('Class 10');
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);

  // Phone OTP state
  const [phoneInput, setPhoneInput] = useState('+91 ');
  const [otpInput, setOtpInput] = useState('');
  const [phoneStep, setPhoneStep] = useState<'number' | 'otp'>('number');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset errors when switching methods
  useEffect(() => {
    clearError();
    setResetSuccessMessage(null);
  }, [authMethod, emailMode, phoneStep]);

  // Google Login Handler
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGoogle(selectedRole);
    } catch (e) {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  // Guest Login Handler
  const handleGuestLogin = async () => {
    setIsSubmitting(true);
    try {
      await loginAsGuest(selectedRole);
    } catch (e) {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  // Email Submit Handler
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (emailMode === 'signin') {
        await loginWithEmail(emailInput.trim(), passwordInput, selectedRole);
      } else if (emailMode === 'signup') {
        await signupWithEmail(emailInput.trim(), passwordInput, nameInput.trim() || 'Nexis Scholar', selectedRole, studentClassInput);
      } else if (emailMode === 'forgot') {
        await resetPassword(emailInput.trim());
        setResetSuccessMessage(`Password reset link sent to ${emailInput}. Please check your inbox.`);
      }
    } catch (e) {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  // Phone OTP Send Handler
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput || phoneInput.trim().length < 8) return;
    setIsSendingOtp(true);
    try {
      const conf = await sendPhoneOtp(phoneInput.trim(), 'recaptcha-container');
      setConfirmationResult(conf);
      setPhoneStep('otp');
    } catch (e) {
      // Handled in context
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Phone OTP Verify Handler
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult || !otpInput || otpInput.trim().length < 6) return;
    setIsVerifyingOtp(true);
    try {
      await verifyPhoneOtp(confirmationResult, otpInput.trim(), selectedRole, nameInput.trim() || undefined);
    } catch (e) {
      // Handled in context
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#0B0C10] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!user ? (
          /* MULTI-PROVIDER FIREBASE AUTHENTICATION SCREEN */
          <div className="max-w-lg mx-auto space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <NexisLogo size="lg" className="justify-center" />
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white pt-2 tracking-tight">
                Nexis Academy Portal
              </h1>
              <p className="text-xs text-gray-400">
                Secure Firebase Cloud Authentication & Role-Based Dashboard
              </p>
            </div>

            {/* Main Auth Card */}
            <div className="seo-3d-card p-6 sm:p-8 space-y-6 relative border border-white/15 bg-gradient-to-b from-[#1F2833]/90 to-[#0B0C10]/95 backdrop-blur-xl shadow-2xl rounded-2xl">
              
              {/* Invisible ReCAPTCHA Anchor */}
              <div id="recaptcha-container"></div>

              {/* Role Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-300">Select Academic Role</label>
                  <span className="text-[10px] text-[#66FCF1] font-mono uppercase tracking-wider">Firebase ABAC</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
                  {(['student', 'parent', 'faculty', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRole(r)}
                      className={`py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        selectedRole === r
                          ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_12px_rgba(102,252,241,0.4)]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auth Method Navigation Tabs */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Sign-In Method</label>
                <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setAuthMethod('google')}
                    className={`py-2 px-1 rounded-lg font-bold flex flex-col items-center gap-1 transition-all ${
                      authMethod === 'google'
                        ? 'bg-white/15 text-[#66FCF1] border border-[#66FCF1]/40'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span className="text-[10px]">Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMethod('email')}
                    className={`py-2 px-1 rounded-lg font-bold flex flex-col items-center gap-1 transition-all ${
                      authMethod === 'email'
                        ? 'bg-white/15 text-[#66FCF1] border border-[#66FCF1]/40'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Mail className="w-4 h-4 text-[#66FCF1]" />
                    <span className="text-[10px]">Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMethod('phone')}
                    className={`py-2 px-1 rounded-lg font-bold flex flex-col items-center gap-1 transition-all ${
                      authMethod === 'phone'
                        ? 'bg-white/15 text-[#66FCF1] border border-[#66FCF1]/40'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px]">Phone OTP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMethod('guest')}
                    className={`py-2 px-1 rounded-lg font-bold flex flex-col items-center gap-1 transition-all ${
                      authMethod === 'guest'
                        ? 'bg-white/15 text-[#66FCF1] border border-[#66FCF1]/40'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <UserIcon className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px]">Guest</span>
                  </button>
                </div>
              </div>

              {/* Alert Feedback Messages */}
              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-200 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">{error}</div>
                  <button onClick={clearError} className="text-gray-400 hover:text-white text-xs">✕</button>
                </div>
              )}

              {resetSuccessMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-200 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1">{resetSuccessMessage}</div>
                </div>
              )}

              {/* METHOD 1: GOOGLE AUTH */}
              {authMethod === 'google' && (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center space-y-2">
                    <p className="text-xs text-gray-300">
                      Sign in instantly with your verified Google Account. Seamlessly synchronizes with Cloud Firestore & PostgreSQL.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-heading font-extrabold text-xs flex items-center justify-center gap-3 shadow-lg hover:scale-101 transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>{isSubmitting ? 'Opening Google Auth...' : `Continue as ${selectedRole.toUpperCase()} with Google`}</span>
                  </button>
                </div>
              )}

              {/* METHOD 2: EMAIL & PASSWORD AUTH */}
              {authMethod === 'email' && (
                <div className="space-y-4">
                  
                  {/* Email Sub-Tabs */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEmailMode('signin')}
                        className={`text-xs font-bold transition-all ${
                          emailMode === 'signin' ? 'text-[#66FCF1] border-b-2 border-[#66FCF1] pb-1' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Sign In
                      </button>
                      <button
                        type="button"
                        onClick={() => setEmailMode('signup')}
                        className={`text-xs font-bold transition-all ${
                          emailMode === 'signup' ? 'text-[#66FCF1] border-b-2 border-[#66FCF1] pb-1' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Create Account
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setEmailMode('forgot')}
                      className="text-[11px] text-gray-400 hover:text-[#66FCF1] underline"
                    >
                      Forgot Pass?
                    </button>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    
                    {emailMode === 'signup' && (
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                        <div className="relative">
                          <UserIcon className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            required
                            placeholder="Aayush Sharma"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#66FCF1]"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                        <input
                          type="email"
                          required
                          placeholder="scholar@nexisacademy.com"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#66FCF1]"
                        />
                      </div>
                    </div>

                    {emailMode !== 'forgot' && (
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Password</label>
                        <div className="relative">
                          <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <input
                            type="password"
                            required
                            placeholder="Minimum 6 characters"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#66FCF1]"
                          />
                        </div>
                      </div>
                    )}

                    {emailMode === 'signup' && (
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Grade / Class</label>
                        <div className="relative">
                          <GraduationCap className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <select
                            value={studentClassInput}
                            onChange={(e) => setStudentClassInput(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#66FCF1]"
                          >
                            <option value="Class 8">Class 8 (Junior Foundation)</option>
                            <option value="Class 9">Class 9 (Foundation & 3D Lab)</option>
                            <option value="Class 10">Class 10 (Board Exam Sprint)</option>
                            <option value="Class 11">Class 11 (JEE / NEET / Boards)</option>
                            <option value="Class 12">Class 12 (Board Score Booster)</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-2 glow-cyan-sm hover:scale-101 transition-all cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>
                        {isSubmitting
                          ? 'Processing...'
                          : emailMode === 'signin'
                          ? `Sign In as ${selectedRole.toUpperCase()}`
                          : emailMode === 'signup'
                          ? `Register ${selectedRole.toUpperCase()} Account`
                          : 'Send Password Reset Link'}
                      </span>
                    </button>
                  </form>
                </div>
              )}

              {/* METHOD 3: PHONE & OTP AUTH */}
              {authMethod === 'phone' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 space-y-1">
                    <span className="font-bold text-[#66FCF1] block">Instant SMS OTP Verification</span>
                    <span>Enter your phone number with country code to receive an authentication code.</span>
                  </div>

                  {phoneStep === 'number' ? (
                    <form onSubmit={handleSendOtp} className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Mobile Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-3 text-emerald-400" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 9876543210"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#66FCF1]"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSendingOtp}
                        className="w-full py-3 rounded-xl bg-emerald-400 text-gray-950 font-heading font-extrabold text-xs flex items-center justify-center gap-2 hover:scale-101 transition-all cursor-pointer"
                      >
                        {isSendingOtp ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Requesting SMS Code...</span>
                          </>
                        ) : (
                          <>
                            <KeyRound className="w-4 h-4" />
                            <span>Send OTP via SMS</span>
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400">Code sent to <b className="text-white">{phoneInput}</b></span>
                        <button
                          type="button"
                          onClick={() => setPhoneStep('number')}
                          className="text-[#66FCF1] hover:underline"
                        >
                          Change Number
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Enter 6-Digit SMS Code</label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="123456"
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                          className="w-full text-center tracking-widest text-lg font-mono py-2.5 rounded-xl bg-black/60 border border-[#66FCF1]/50 text-[#66FCF1] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isVerifyingOtp || otpInput.length < 6}
                        className="w-full py-3 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-2 glow-cyan-sm hover:scale-101 transition-all cursor-pointer"
                      >
                        {isVerifyingOtp ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Verifying Code...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Verify & Sign In</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* METHOD 4: GUEST / ANONYMOUS ACCESS */}
              {authMethod === 'guest' && (
                <div className="space-y-4 pt-1">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-amber-300">
                      <Sparkles className="w-4 h-4" />
                      <span>Instant Guest & Evaluation Mode</span>
                    </div>
                    <p>
                      Explore student progress analytics, scheduled alarms, achievement badges, and course materials without entering personal credentials.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleGuestLogin}
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-gray-950 font-heading font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg hover:scale-101 transition-all cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>{isSubmitting ? 'Entering Guest Sandbox...' : `Enter as Guest (${selectedRole.toUpperCase()})`}</span>
                  </button>
                </div>
              )}

              {/* Security Trust Footnote */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-3 border-t border-white/5">
                <ShieldCheck className="w-4 h-4 text-[#66FCF1]" />
                <span>Protected by Firebase Auth & Cloud SQL (asia-southeast1)</span>
              </div>
            </div>

          </div>
        ) : (
          /* LOGGED IN DASHBOARD VIEW */
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Profile Header */}
            <div className="seo-3d-card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-white/15 bg-gradient-to-r from-[#1F2833]/80 via-[#0B0C10] to-[#1F2833]/80 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#66FCF1]/20 border border-[#66FCF1] text-[#66FCF1] flex items-center justify-center font-heading font-bold text-xl glow-cyan-sm overflow-hidden">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.name ? user.name.slice(0, 2).toUpperCase() : 'NX'}</span>
                  )}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-heading font-bold text-white">{user.name}</h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#66FCF1] text-[#0B0C10]">
                      {user.role}
                    </span>
                    {user.isAnonymous && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Guest Mode
                      </span>
                    )}
                    {user.provider && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-gray-300">
                        {user.provider}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {user.email} {user.phone ? `• ${user.phone}` : ''} • UID: <span className="font-mono text-gray-500">{user.id.slice(0, 8)}...</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onOpenDemoModal}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#66FCF1]/20 hover:bg-[#66FCF1] text-[#66FCF1] hover:text-[#0B0C10] border border-[#66FCF1]/40 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Demo Class</span>
                </button>

                <button
                  onClick={logout}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-gray-300 hover:text-red-400 text-xs font-bold transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
              {[
                { key: 'overview', label: 'Academic Overview' },
                { key: 'countdown', label: '⏱️ Exam Countdown' },
                { key: 'analytics', label: '📈 Analytics Dashboard (Recharts)' },
                { key: 'leaderboard', label: '🏆 Leaderboard & Ranks' },
                { key: 'achievements', label: '🎖️ Badges' },
                { key: 'reminders', label: '🔔 Class Alarms' },
                { key: 'tracker', label: '📊 Study Tracker' },
                { key: 'courses', label: 'Enrolled Courses' },
                { key: 'attendance', label: 'Attendance (98%)' },
                { key: 'scores', label: 'Diagnostic Analytics' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_12px_rgba(102,252,241,0.3)]'
                      : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: Exam Countdown Dedicated View */}
            {activeTab === 'countdown' && (
              <div className="space-y-6">
                <ExamCountdownTimer />
              </div>
            )}

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Dynamic Board & Competitive Exam Countdown Radar */}
                <ExamCountdownTimer />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="seo-3d-card p-6 space-y-3">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Target Board Year</span>
                      <span className="text-[#66FCF1] font-bold">2026-2027</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white">Class 10 Board Sprint</div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 space-y-1">
                      <span className="text-gray-400 block text-[10px]">Upcoming Diagnostic Test:</span>
                      <span className="font-bold text-[#66FCF1]">Quadratic Equations & Light Optics (Sat 4 PM)</span>
                    </div>
                  </div>

                  <div className="seo-3d-card p-6 space-y-3">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>Average Test Score</span>
                      <span className="text-emerald-400 font-bold">+22% Improvement</span>
                    </div>
                    <div className="text-3xl font-heading font-extrabold text-[#66FCF1]">94.5%</div>
                    <p className="text-xs text-gray-300">Top 5% among Nexis Academy Batch diagnostic rankings.</p>
                  </div>

                  <div className="seo-3d-card p-6 space-y-3">
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>1-on-1 Doubt Desk</span>
                      <span className="text-[#45A29E] font-bold">Zero Backlog</span>
                    </div>
                    <div className="text-3xl font-heading font-extrabold text-white">18 Solved</div>
                    <p className="text-xs text-gray-300">All student questions resolved by faculty desk within 24 hours.</p>
                  </div>
                </div>

                {/* Achievements Section */}
                <div className="space-y-3">
                  <StudentAchievements />
                </div>

                {/* Scheduled Notifications Section */}
                <div className="space-y-3">
                  <PortalNotificationScheduler />
                </div>

                {/* Integrated Progress Tracker Section */}
                <div className="pt-2">
                  <PortalProgressTracker />
                </div>
              </div>
            )}

            {/* Tab 2: Achievements */}
            {activeTab === 'achievements' && <StudentAchievements />}

            {/* Tab 3: Reminders */}
            {activeTab === 'reminders' && <PortalNotificationScheduler />}

            {/* Tab 4: Tracker */}
            {activeTab === 'tracker' && <PortalProgressTracker />}

            {/* Tab 5: Courses */}
            {activeTab === 'courses' && (
              <div className="seo-3d-card p-6 space-y-4">
                <h3 className="text-lg font-heading font-bold text-white">Enrolled Programs</h3>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">Class 10 Board Exam Sprint & Score Booster</h4>
                    <p className="text-xs text-gray-400">Mathematics, Physics, Chemistry • Mon/Wed/Fri 5:00 PM</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">
                    Active
                  </span>
                </div>
              </div>
            )}

            {/* Tab 6: Attendance */}
            {activeTab === 'attendance' && (
              <div className="seo-3d-card p-6 space-y-4">
                <h3 className="text-lg font-heading font-bold text-white">Attendance Log (98.2%)</h3>
                <div className="space-y-2 text-xs">
                  {['Aug 06: Mathematics - Present', 'Aug 04: Physics - Present', 'Aug 02: Chemistry - Present', 'Jul 30: Biology - Present'].map((item, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-gray-200">
                      <span>{item}</span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Analytics Dashboard (Recharts Area, Line, Bar & Radar) */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <StudentAnalyticsDashboard onOpenDemoModal={onOpenDemoModal} />
              </div>
            )}

            {/* Tab: Gamification Leaderboard */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-6">
                <GamificationLeaderboard />
              </div>
            )}

            {/* Tab 7: Scores / Diagnostic Analytics */}
            {activeTab === 'scores' && (
              <div className="space-y-6">
                <StudentAnalyticsDashboard onOpenDemoModal={onOpenDemoModal} />
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
