import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Key, 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle, 
  LayoutDashboard, 
  Users, 
  Kanban, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Search, 
  Terminal, 
  Server, 
  Database, 
  Activity, 
  Sliders, 
  Settings, 
  ShieldAlert, 
  Globe, 
  BarChart3, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  Plus, 
  Edit3, 
  Trash2, 
  ChevronRight, 
  ArrowUpRight, 
  Download, 
  Upload, 
  Bell, 
  Layers, 
  Cpu, 
  Radio, 
  Zap, 
  X, 
  LogOut, 
  Check, 
  HelpCircle,
  Copy,
  ExternalLink,
  Award,
  Star,
  Palette,
  Image as ImageIcon
} from 'lucide-react';
import { PageRoute } from '../types';
import { NexisLogo } from '../components/NexisLogo';
import { BrandingManager } from '../components/BrandingManager';

interface AdminDevConsoleProps {
  initialMode?: 'admin' | 'devmode';
  onNavigate: (route: PageRoute) => void;
}

export const AdminDevConsole: React.FC<AdminDevConsoleProps> = ({
  initialMode = 'admin',
  onNavigate
}) => {
  // Password Protection State
  const MASTER_PASSWORD = "Sanhati26052009";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nexis_master_authenticated') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  // Active Mode & Role State
  const [consoleMode, setConsoleMode] = useState<'admin' | 'devmode'>(initialMode);
  const [currentRole, setCurrentRole] = useState<string>('Founder');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [dateFilter, setDateFilter] = useState<string>('30d');

  // Command Palette State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [commandQuery, setCommandQuery] = useState<string>('');

  // Interactive Seed Data States
  const [leads, setLeads] = useState([
    { id: 'LD-101', name: 'Aarav Mehta', phone: '+91 98201 44512', class: 'Class 10', course: 'Board Sprint', stage: 'NEW', date: '2026-08-11', notes: 'Interested in Physics & Math combo' },
    { id: 'LD-102', name: 'Ananya Sharma', phone: '+91 98310 99821', class: 'Class 9', course: 'Foundation', stage: 'DEMO BOOKED', date: '2026-08-10', notes: 'Demo scheduled for Sat 4 PM' },
    { id: 'LD-103', name: 'Rohan Gupta', phone: '+91 98112 33455', class: 'Class 12', course: 'JEE Competitive', stage: 'CONTACTED', date: '2026-08-09', notes: 'Father called inquiring about batch size' },
    { id: 'LD-104', name: 'Priya Iyer', phone: '+91 98700 11223', class: 'Class 10', course: 'Board Sprint', stage: 'QUALIFIED', date: '2026-08-08', notes: 'High potential student, scored 94% in Class 9' },
    { id: 'LD-105', name: 'Siddharth Nair', phone: '+91 98450 66778', class: 'Class 8', course: 'Infant Foundation', stage: 'CONVERTED', date: '2026-08-05', notes: 'Enrolled in Infant micro-batch' }
  ]);

  const [demoBookings, setDemoBookings] = useState([
    { id: 'DM-201', student: 'Ananya Sharma', parent: 'Suresh Sharma', course: 'Class 9 Foundation', slot: 'Sat, Aug 15 • 4:00 PM', faculty: 'Dr. Rajesh Mukherjee', status: 'Confirmed' },
    { id: 'DM-202', student: 'Kabir Das', parent: 'Anita Das', course: 'Class 10 Board Sprint', slot: 'Sun, Aug 16 • 11:00 AM', faculty: 'Prof. Ananya Roy', status: 'Requested' },
    { id: 'DM-203', student: 'Ishaan Verma', parent: 'Vikram Verma', course: 'Class 11 Physics', slot: 'Mon, Aug 17 • 5:30 PM', faculty: 'Siddharth Kapoor', status: 'Attended' }
  ]);

  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [maintenanceMsg, setMaintenanceMsg] = useState<string>("Nexis Academy is performing scheduled system maintenance. We will be back online shortly!");

  const [featureFlags, setFeatureFlags] = useState([
    { id: 'ff-1', name: 'Interactive 3D Spatial Geometry Hero', enabled: true, category: 'UI/UX' },
    { id: 'ff-2', name: 'AI Tutor Floating Chat Assistant', enabled: true, category: 'AI Services' },
    { id: 'ff-3', name: 'Infant Gateway Loading Transition Screen', enabled: true, category: 'Onboarding' },
    { id: 'ff-4', name: 'Real-time Class 10 Board Sprint Offer Banner', enabled: false, category: 'Marketing' },
    { id: 'ff-5', name: 'Experimental Dark Glassmorphism V2 Theme', enabled: false, category: 'Design System' }
  ]);

  const [deployments, setDeployments] = useState([
    { version: 'v2.4.1-prod', commit: '9f82ab1', env: 'Production', time: '10 mins ago', status: 'SUCCESS', author: 'DevOps Automation' },
    { version: 'v2.4.0-prod', commit: '7f3a9d1', env: 'Production', time: 'Yesterday 18:30', status: 'SUCCESS', author: 'Aayush Admin' },
    { version: 'v2.4.0-staging', commit: '6e2b10f', env: 'Staging', time: 'Aug 10 14:15', status: 'SUCCESS', author: 'Dev Team' }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 'LOG-881', user: 'Founder (Sanhati)', action: 'Unlocked Master Admin Console', target: 'Security Guard', time: 'Just now', ip: '192.168.1.104' },
    { id: 'LOG-880', user: 'SEO Manager', action: 'Updated Meta Description for Course Page', target: 'Class 10 Board Sprint', time: '12 mins ago', ip: '103.22.14.88' },
    { id: 'LOG-879', user: 'Admissions Lead', action: 'Moved Lead LD-102 to DEMO BOOKED', target: 'Ananya Sharma', time: '45 mins ago', ip: '110.54.2.19' },
    { id: 'LOG-878', user: 'System Bot', action: 'Completed Automated Cloud SQL Snapshot', target: 'db-nexis-backup', time: '2 hours ago', ip: 'Internal System' }
  ]);

  // Handle Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Password Submission
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    setTimeout(() => {
      if (passwordInput === MASTER_PASSWORD) {
        setIsAuthenticated(true);
        sessionStorage.setItem('nexis_master_authenticated', 'true');
        setPasswordInput('');
        setAuthLoading(false);
      } else {
        setAuthError('Invalid Security Password. Please enter the correct master key.');
        setAuthLoading(false);
      }
    }, 500);
  };

  const handleLogoutMaster = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nexis_master_authenticated');
  };

  const handleToggleFeatureFlag = (id: string) => {
    setFeatureFlags(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const handleMoveLead = (leadId: string, newStage: string) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
  };

  // Render Password Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col items-center justify-center p-6 bg-grid-pattern relative overflow-hidden">
        {/* Background Ambient Lights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#66FCF1]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#45A29E]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-md w-full relative z-10 space-y-6">
          
          {/* Header Branding */}
          <div className="text-center space-y-3">
            <NexisLogo size="lg" className="justify-center" />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] text-xs font-mono font-bold tracking-wider uppercase glow-cyan-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#66FCF1]" />
              <span>NEXIS MASTER SECURITY GATEWAY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Admin & DevMode Console
            </h1>
            <p className="text-xs text-gray-400">
              Restricted area. Please enter the system authorization passkey to continue.
            </p>
          </div>

          {/* Password Card */}
          <div className="seo-3d-card p-6 sm:p-8 space-y-6 border border-[#66FCF1]/30">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-2 uppercase tracking-wider">
                  Master Access Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-[#66FCF1]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 text-sm font-mono focus:outline-none focus:border-[#66FCF1] focus:ring-1 focus:ring-[#66FCF1] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(102,252,241,0.4)] hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{authLoading ? 'Verifying Passkey...' : 'Unlock Master Console'}</span>
              </button>
            </form>

            <div className="pt-3 border-t border-white/10 text-center space-y-2">
              <p className="text-[11px] text-gray-400 font-mono">
                Protected by Nexis Master RBAC Protocol
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="text-xs text-[#66FCF1] hover:underline cursor-pointer"
              >
                ← Return to Nexis Academy Public Home
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // MAIN UNLOCKED MASTER CONSOLE
  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex flex-col font-sans pt-16">
      
      {/* COMMAND PALETTE MODAL */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
          <div className="max-w-2xl w-full bg-[#1F2833] border border-[#66FCF1]/40 rounded-2xl shadow-2xl overflow-hidden space-y-4 p-4">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <Search className="w-5 h-5 text-[#66FCF1]" />
              <input
                type="text"
                autoFocus
                placeholder="Search students, leads, courses, SEO, dev commands..."
                value={commandQuery}
                onChange={(e) => setCommandQuery(e.target.value)}
                className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-gray-400"
              />
              <button onClick={() => setIsCommandPaletteOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto text-xs font-mono">
              <div className="text-gray-400 text-[10px] uppercase">Quick Navigation Shortcuts</div>
              <button onClick={() => { setActiveTab('branding'); setIsCommandPaletteOpen(false); }} className="w-full text-left p-2 rounded-lg hover:bg-white/10 flex items-center justify-between">
                <span className="flex items-center gap-2"><Palette className="w-4 h-4 text-[#66FCF1]" /> Branding & Logo Manager (Whole Site)</span>
                <span className="text-[#66FCF1] font-bold">New</span>
              </button>
              <button onClick={() => { setActiveTab('dashboard'); setIsCommandPaletteOpen(false); }} className="w-full text-left p-2 rounded-lg hover:bg-white/10 flex items-center justify-between">
                <span className="flex items-center gap-2"><LayoutDashboard className="w-4 h-4 text-[#66FCF1]" /> Founder Dashboard</span>
                <span className="text-gray-500">Jump</span>
              </button>
              <button onClick={() => { setActiveTab('leads'); setIsCommandPaletteOpen(false); }} className="w-full text-left p-2 rounded-lg hover:bg-white/10 flex items-center justify-between">
                <span className="flex items-center gap-2"><Kanban className="w-4 h-4 text-[#66FCF1]" /> Lead CRM Kanban</span>
                <span className="text-gray-500">Jump</span>
              </button>
              <button onClick={() => { setConsoleMode('devmode'); setActiveTab('deployments'); setIsCommandPaletteOpen(false); }} className="w-full text-left p-2 rounded-lg hover:bg-white/10 flex items-center justify-between">
                <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-[#66FCF1]" /> DevMode Deployment Center</span>
                <span className="text-gray-500">Jump</span>
              </button>
              <button onClick={() => { setActiveTab('seo'); setIsCommandPaletteOpen(false); }} className="w-full text-left p-2 rounded-lg hover:bg-white/10 flex items-center justify-between">
                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#66FCF1]" /> SEO Control Center</span>
                <span className="text-gray-500">Jump</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP CONSOLE HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#0B0C10]/90 border-b border-white/10 backdrop-blur-xl px-4 lg:px-8 py-2.5 flex items-center justify-between">
        
        {/* Brand & Mode Switcher */}
        <div className="flex items-center gap-4">
          <NexisLogo size="sm" />
          
          <div className="h-5 w-px bg-white/20 hidden sm:block" />

          {/* Mode Switcher Pill */}
          <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/15">
            <button
              onClick={() => setConsoleMode('admin')}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                consoleMode === 'admin'
                  ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_12px_rgba(102,252,241,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>ADMIN OS</span>
            </button>

            <button
              onClick={() => setConsoleMode('devmode')}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                consoleMode === 'devmode'
                  ? 'bg-[#45A29E] text-white shadow-[0_0_12px_rgba(69,162,158,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>DEVMODE</span>
            </button>
          </div>
        </div>

        {/* Center Global Search / Command Palette */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 text-xs font-mono flex items-center gap-4 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#66FCF1]" />
              Global Command Palette...
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/20 text-[10px] text-gray-400">Ctrl + K</kbd>
          </button>
        </div>

        {/* Right Admin Controls */}
        <div className="flex items-center gap-3">
          
          {/* Environment Status Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>PROD v2.4.1</span>
          </div>

          {/* Role Selector */}
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
            className="bg-black/60 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-[#66FCF1] font-mono font-bold focus:outline-none focus:border-[#66FCF1]"
          >
            {['Founder', 'Super Admin', 'Academy Admin', 'Admissions Manager', 'Content Manager', 'SEO Manager', 'Developer', 'Maintenance Agent', 'Analyst', 'Viewer'].map((r) => (
              <option key={r} value={r} className="bg-[#1F2833] text-white">{r}</option>
            ))}
          </select>

          {/* Exit / Logout */}
          <button
            onClick={handleLogoutMaster}
            className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 transition-all cursor-pointer"
            title="Lock Console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN BODY WORKSPACE */}
      <div className="flex flex-1 min-h-[calc(100vh-64px)]">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-64 bg-[#0B0C10] border-r border-white/10 p-4 space-y-6 shrink-0 hidden lg:block overflow-y-auto">
          
          {/* Mode Indicator */}
          <div className="p-3 rounded-xl bg-[#1F2833]/80 border border-[#66FCF1]/20 space-y-1">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">ACTIVE CONSOLE</span>
            <div className="text-sm font-heading font-extrabold text-[#66FCF1] flex items-center justify-between">
              <span>{consoleMode === 'admin' ? 'ADMIN OPERATING SYSTEM' : 'DEVMODE CONSOLE'}</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-[11px] text-gray-400 block font-mono">Role: {currentRole}</span>
          </div>

          {/* Navigation Links Grouped by Section */}
          <div className="space-y-6 text-xs">
            
            {/* OVERVIEW SECTION */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-3 mb-1">Overview</div>
              
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Founder Console</span>
              </button>

              <button
                onClick={() => setActiveTab('leads')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'leads' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Kanban className="w-4 h-4" />
                  <span>Lead CRM Kanban</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#66FCF1] text-[#0B0C10] font-bold text-[10px]">{leads.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('demo')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'demo' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Demo Classes</span>
              </button>

              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'students' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Student Roster</span>
              </button>
            </div>

            {/* WEBSITE CMS SECTION */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-3 mb-1">Website CMS & Branding</div>
              
              <button
                onClick={() => setActiveTab('branding')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'branding' ? 'bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40 shadow-[0_0_12px_rgba(102,252,241,0.2)]' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Palette className="w-4 h-4 text-[#66FCF1]" />
                  <span>Branding & Logo (Whole Site)</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#66FCF1]/20 text-[#66FCF1]">NEW</span>
              </button>

              <button
                onClick={() => setActiveTab('cms')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'cms' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Page Builder & Revisions</span>
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'blog' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Blog & Articles</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'courses' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Course Catalog</span>
              </button>
            </div>

            {/* SEO & ANALYTICS */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest px-3 mb-1">SEO & Growth</div>
              
              <button
                onClick={() => setActiveTab('seo')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'seo' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4" />
                  <span>SEO Dashboard</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">96 Score</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'analytics' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics & Funnels</span>
              </button>
            </div>

            {/* DEVMODE SECTION */}
            <div className="space-y-1 pt-2 border-t border-white/10">
              <div className="text-[10px] font-mono text-[#45A29E] uppercase tracking-widest px-3 mb-1">Developer Console</div>
              
              <button
                onClick={() => { setConsoleMode('devmode'); setActiveTab('branding'); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  consoleMode === 'devmode' && activeTab === 'branding' ? 'bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40 shadow-[0_0_12px_rgba(102,252,241,0.2)]' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Palette className="w-4 h-4 text-[#66FCF1]" />
                  <span>Branding & Logo Manager</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#66FCF1]/20 text-[#66FCF1] font-bold">Global</span>
              </button>

              <button
                onClick={() => { setConsoleMode('devmode'); setActiveTab('deployments'); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  consoleMode === 'devmode' && activeTab === 'deployments' ? 'bg-[#45A29E]/20 text-[#66FCF1] border border-[#45A29E]/40' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Deployments & Rollback</span>
              </button>

              <button
                onClick={() => { setConsoleMode('devmode'); setActiveTab('system'); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  consoleMode === 'devmode' && activeTab === 'system' ? 'bg-[#45A29E]/20 text-[#66FCF1] border border-[#45A29E]/40' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>System Health & Errors</span>
              </button>

              <button
                onClick={() => { setConsoleMode('devmode'); setActiveTab('database'); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  consoleMode === 'devmode' && activeTab === 'database' ? 'bg-[#45A29E]/20 text-[#66FCF1] border border-[#45A29E]/40' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Database className="w-4 h-4" />
                <span>Database & Backups</span>
              </button>

              <button
                onClick={() => { setConsoleMode('devmode'); setActiveTab('flags'); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  consoleMode === 'devmode' && activeTab === 'flags' ? 'bg-[#45A29E]/20 text-[#66FCF1] border border-[#45A29E]/40' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>Feature Flags & Secrets</span>
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-semibold transition-all cursor-pointer ${
                  activeTab === 'audit' ? 'bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30' : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Audit Logs & Security</span>
              </button>
            </div>

          </div>
        </aside>

        {/* MAIN CONTENT WORKSPACE */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 overflow-y-auto space-y-6 sm:space-y-8 max-w-full">
          
          {/* MOBILE/TABLET HORIZONTAL TAB NAVIGATION BAR */}
          <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar border-b border-white/10 text-xs">
            {[
              { id: 'dashboard', label: 'Founder', icon: LayoutDashboard },
              { id: 'branding', label: 'Branding & Logo', icon: Palette },
              { id: 'leads', label: `Leads (${leads.length})`, icon: Kanban },
              { id: 'demo', label: 'Demos', icon: Calendar },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'faculty', label: 'Faculty', icon: GraduationCap },
              { id: 'results', label: 'Results', icon: Award },
              { id: 'testimonials', label: 'Reviews', icon: Star },
              { id: 'faq', label: 'FAQ', icon: HelpCircle },
              { id: 'seo', label: 'SEO', icon: Globe },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'deployments', label: 'Deploy', icon: Terminal },
              { id: 'system', label: 'Health', icon: Activity },
              { id: 'database', label: 'Database', icon: Database },
              { id: 'flags', label: 'Flags', icon: Sliders },
              { id: 'audit', label: 'Audit', icon: ShieldAlert }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl font-bold font-mono whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_12px_rgba(102,252,241,0.4)]'
                      : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          
          {/* BRANDING & MASTER LOGO MANAGER TAB */}
          {activeTab === 'branding' && (
            <BrandingManager />
          )}

          {/* DASHBOARD / FOUNDER CONSOLE TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              
              {/* Top Welcome Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">Founder Master Command Console</h1>
                  <p className="text-xs text-gray-400 font-mono">Real-time academy performance, conversion funnels, and system telemetry</p>
                </div>

                {/* Date Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">Range:</span>
                  <div className="p-1 rounded-xl bg-black/60 border border-white/15 flex items-center text-xs">
                    {(['7d', '30d', '90d', 'Custom'] as const).map((range) => (
                      <button
                        key={range}
                        onClick={() => setDateFilter(range)}
                        className={`px-3 py-1 rounded-lg font-bold font-mono transition-all ${
                          dateFilter === range ? 'bg-[#66FCF1] text-[#0B0C10]' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                <div className="seo-3d-card p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span>TOTAL LEADS</span>
                    <span className="text-emerald-400 font-bold">+18.4%</span>
                  </div>
                  <div className="text-3xl font-heading font-extrabold text-white">248</div>
                  <p className="text-[11px] text-gray-400">14 new enquiries in past 24 hours</p>
                </div>

                <div className="seo-3d-card p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span>DEMO BOOKINGS</span>
                    <span className="text-[#66FCF1] font-bold">42 Active</span>
                  </div>
                  <div className="text-3xl font-heading font-extrabold text-[#66FCF1]">42</div>
                  <p className="text-[11px] text-gray-400">85% attendance rate on scheduled demos</p>
                </div>

                <div className="seo-3d-card p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span>CONVERSION RATE</span>
                    <span className="text-emerald-400 font-bold">22.4%</span>
                  </div>
                  <div className="text-3xl font-heading font-extrabold text-white">22.4%</div>
                  <p className="text-[11px] text-gray-400">Leading benchmark among science academies</p>
                </div>

                <div className="seo-3d-card p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span>SEO HEALTH SCORE</span>
                    <span className="text-[#45A29E] font-bold">96 / 100</span>
                  </div>
                  <div className="text-3xl font-heading font-extrabold text-white">96 / 100</div>
                  <p className="text-[11px] text-gray-400">All canonicals & sitemaps indexed</p>
                </div>

              </div>

              {/* Charts & Activity Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Visual Trend Chart */}
                <div className="lg:col-span-8 seo-3d-card p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-heading font-bold text-white">Lead & Admission Growth Trends</h3>
                      <p className="text-xs text-gray-400">Monthly conversion velocity for 2026</p>
                    </div>
                    <span className="text-xs font-mono text-[#66FCF1] bg-[#66FCF1]/10 px-2.5 py-1 rounded-full border border-[#66FCF1]/30">
                      Live Database Sync
                    </span>
                  </div>

                  {/* SVG Chart */}
                  <div className="h-64 w-full pt-4 flex items-end gap-3 justify-between border-b border-white/10 pb-2">
                    {[
                      { month: 'Jan', value: 45, height: '45%' },
                      { month: 'Feb', value: 62, height: '62%' },
                      { month: 'Mar', value: 88, height: '88%' },
                      { month: 'Apr', value: 110, height: '95%' },
                      { month: 'May', value: 95, height: '78%' },
                      { month: 'Jun', value: 140, height: '100%' },
                      { month: 'Jul', value: 180, height: '120%' },
                      { month: 'Aug', value: 248, height: '140%' }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="text-[10px] text-[#66FCF1] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          {bar.value}
                        </div>
                        <div 
                          className="w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-[#45A29E] to-[#66FCF1] group-hover:brightness-125 transition-all shadow-[0_0_10px_rgba(102,252,241,0.3)]"
                          style={{ height: bar.height }}
                        />
                        <span className="text-[10px] text-gray-400 font-mono">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="lg:col-span-4 seo-3d-card p-6 space-y-4">
                  <h3 className="text-lg font-heading font-bold text-white flex items-center justify-between">
                    <span>Recent Activity</span>
                    <Activity className="w-4 h-4 text-[#66FCF1]" />
                  </h3>

                  <div className="space-y-3 text-xs">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                        <div className="flex justify-between font-mono text-[10px] text-[#66FCF1]">
                          <span>{log.user}</span>
                          <span>{log.time}</span>
                        </div>
                        <div className="font-semibold text-gray-200">{log.action}</div>
                        <div className="text-[10px] text-gray-400">Target: {log.target}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* LEADS CRM KANBAN TAB */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl font-heading font-extrabold text-white">Lead & Admission CRM Kanban</h1>
                  <p className="text-xs text-gray-400">Track prospective students through demo booking and enrollment stages</p>
                </div>

                <button
                  onClick={() => {
                    const newLead = {
                      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
                      name: 'New Student Enquiry',
                      phone: '+91 98765 00000',
                      class: 'Class 10',
                      course: 'Board Sprint',
                      stage: 'NEW',
                      date: new Date().toISOString().split('T')[0],
                      notes: 'Manual entry from phone call'
                    };
                    setLeads([newLead, ...leads]);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-bold text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(102,252,241,0.3)]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Lead</span>
                </button>
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4">
                {(['NEW', 'CONTACTED', 'DEMO BOOKED', 'CONVERTED'] as const).map((stage) => {
                  const stageLeads = leads.filter(l => l.stage === stage);
                  return (
                    <div key={stage} className="seo-3d-card p-4 space-y-4 min-w-[250px] bg-black/40">
                      
                      {/* Column Header */}
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <span className="font-heading font-extrabold text-xs text-[#66FCF1] tracking-wider uppercase">{stage}</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-mono font-bold text-gray-300">{stageLeads.length}</span>
                      </div>

                      {/* Cards List */}
                      <div className="space-y-3">
                        {stageLeads.map((lead) => (
                          <div key={lead.id} className="p-3.5 rounded-xl bg-[#1F2833] border border-white/15 space-y-2 hover:border-[#66FCF1]/50 transition-all">
                            <div className="flex justify-between items-start text-xs">
                              <span className="font-bold text-white">{lead.name}</span>
                              <span className="font-mono text-[10px] text-gray-400">{lead.id}</span>
                            </div>
                            
                            <div className="text-[11px] text-gray-300 font-mono">{lead.class} • {lead.course}</div>
                            <div className="text-[10px] text-gray-400">{lead.phone}</div>
                            
                            <p className="text-[11px] text-gray-300 italic pt-1 border-t border-white/5">"{lead.notes}"</p>

                            {/* Stage Switcher Controls */}
                            <div className="pt-2 flex items-center gap-1 overflow-x-auto">
                              {['NEW', 'CONTACTED', 'DEMO BOOKED', 'CONVERTED'].map((st) => (
                                <button
                                  key={st}
                                  onClick={() => handleMoveLead(lead.id, st)}
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                                    lead.stage === st ? 'bg-[#66FCF1] text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white'
                                  }`}
                                >
                                  {st[0]}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* DEMO CLASSES TAB */}
          {activeTab === 'demo' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl font-heading font-extrabold text-white">Demo Class Schedule</h1>
                  <p className="text-xs text-gray-400">Manage free demo registrations and faculty allocations</p>
                </div>
              </div>

              <div className="seo-3d-card p-6 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-gray-400 border-b border-white/10 uppercase">
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Student / Parent</th>
                      <th className="pb-3">Course Target</th>
                      <th className="pb-3">Slot Time</th>
                      <th className="pb-3">Faculty</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {demoBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/5">
                        <td className="py-3 font-bold text-[#66FCF1]">{b.id}</td>
                        <td className="py-3">
                          <div className="font-bold text-white">{b.student}</div>
                          <div className="text-[10px] text-gray-400">{b.parent}</div>
                        </td>
                        <td className="py-3 text-gray-200">{b.course}</td>
                        <td className="py-3 text-gray-300">{b.slot}</td>
                        <td className="py-3 text-[#45A29E]">{b.faculty}</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                            b.status === 'Requested' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
                            'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAGE BUILDER & CMS TAB */}
          {activeTab === 'cms' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl font-heading font-extrabold text-white">Modular Page Builder & Content Revisions</h1>
                  <p className="text-xs text-gray-400">Manage drag-and-drop section blocks with approval history</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Available Blocks */}
                <div className="lg:col-span-4 seo-3d-card p-5 space-y-4">
                  <h3 className="font-heading font-bold text-white text-sm">Available Content Blocks</h3>
                  <div className="space-y-2 text-xs font-mono">
                    {['3D Spatial Geometry Hero', 'Course Cards Grid', 'Faculty Specialist Cards', 'Parent Testimonials Carousel', 'FAQ Accordion Block', 'Lead Conversion Banner'].map((block, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between hover:border-[#66FCF1]/50 cursor-pointer">
                        <span>{block}</span>
                        <Plus className="w-4 h-4 text-[#66FCF1]" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Published Version History */}
                <div className="lg:col-span-8 seo-3d-card p-5 space-y-4">
                  <h3 className="font-heading font-bold text-white text-sm">Homepage Version History & Approvals</h3>
                  <div className="space-y-3 text-xs">
                    {[
                      { rev: 'Rev 4.2', author: 'Founder (Sanhati)', date: 'Today 11:20', status: 'PUBLISHED', notes: 'Added Infant Gateway Opening Page transition' },
                      { rev: 'Rev 4.1', author: 'Content Manager', date: 'Aug 09 16:45', status: 'ARCHIVED', notes: 'Updated Class 10 Board Sprint fee structure' },
                      { rev: 'Rev 4.0', author: 'SEO Manager', date: 'Aug 05 10:00', status: 'ARCHIVED', notes: 'Optimized schema metadata for search engines' }
                    ].map((v, i) => (
                      <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white font-mono">{v.rev}</span>
                            <span className="text-[10px] font-mono text-[#66FCF1]">{v.date}</span>
                          </div>
                          <p className="text-xs text-gray-300 mt-1">{v.notes}</p>
                          <span className="text-[10px] text-gray-400">Author: {v.author}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            v.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {v.status}
                          </span>
                          {v.status !== 'PUBLISHED' && (
                            <button className="px-2.5 py-1 rounded bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40 text-[10px] font-mono font-bold hover:bg-[#66FCF1] hover:text-black transition-all cursor-pointer">
                              Restore
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SEO CONTROL CENTER TAB */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl font-heading font-extrabold text-white">SEO Control Center & Technical Audit</h1>
                  <p className="text-xs text-gray-400 font-mono">Manage sitemaps, robots.txt, 301 redirects, and indexation checks</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="seo-3d-card p-5 space-y-2">
                  <span className="text-xs font-mono text-gray-400">INDEXING STATUS</span>
                  <div className="text-2xl font-heading font-extrabold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>All Pages Indexed</span>
                  </div>
                  <p className="text-[11px] text-gray-400">18/18 canonical URLs validated by Googlebot</p>
                </div>

                <div className="seo-3d-card p-5 space-y-2">
                  <span className="text-xs font-mono text-gray-400 font-bold">ROBOTS.TXT & SITEMAP</span>
                  <div className="text-2xl font-heading font-extrabold text-[#66FCF1]">sitemap.xml Active</div>
                  <p className="text-[11px] text-gray-400">Generated automatically from published routes</p>
                </div>

                <div className="seo-3d-card p-5 space-y-2">
                  <span className="text-xs font-mono text-gray-400">301 REDIRECTS</span>
                  <div className="text-2xl font-heading font-extrabold text-white">4 Active Rules</div>
                  <p className="text-[11px] text-gray-400">Zero redirect loops detected</p>
                </div>
              </div>

              {/* Technical Audit Panel */}
              <div className="seo-3d-card p-6 space-y-4">
                <h3 className="font-heading font-bold text-white text-base">Technical SEO Warnings & Audits</h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      [MEDIUM] Course Detail Page missing OpenGraph thumbnail image asset
                    </span>
                    <button className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500 hover:text-black font-bold transition-all">Fix Asset</button>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      [PASSED] Schema JSON-LD EducationalOrganization markup valid
                    </span>
                    <span className="text-[10px] text-emerald-400">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DEVMODE: DEPLOYMENTS & ROLLBACK TAB */}
          {activeTab === 'deployments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl font-heading font-extrabold text-[#66FCF1] flex items-center gap-2">
                    <Terminal className="w-6 h-6" />
                    <span>DevMode Deployment & Release Center</span>
                  </h1>
                  <p className="text-xs text-gray-400 font-mono">Manage Cloud Run builds, commit triggers, and emergency rollbacks</p>
                </div>

                <button
                  onClick={() => {
                    const newDep = {
                      version: `v2.4.${deployments.length + 2}-prod`,
                      commit: Math.random().toString(16).substring(2, 9),
                      env: 'Production',
                      time: 'Just now',
                      status: 'SUCCESS',
                      author: 'DevMode Admin'
                    };
                    setDeployments([newDep, ...deployments]);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#45A29E] text-white font-heading font-bold text-xs flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(69,162,158,0.4)]"
                >
                  <Zap className="w-4 h-4" />
                  <span>Trigger Production Build</span>
                </button>
              </div>

              {/* Maintenance Toggle */}
              <div className="seo-3d-card p-6 space-y-4 border border-[#66FCF1]/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-white text-base">Website Maintenance Mode Guard</h3>
                    <p className="text-xs text-gray-400">Toggle public site availability during database updates</p>
                  </div>
                  <button
                    onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      maintenanceMode ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'bg-white/10 text-gray-300 hover:text-white'
                    }`}
                  >
                    {maintenanceMode ? 'MAINTENANCE ACTIVE' : 'SYSTEM OPERATIONAL'}
                  </button>
                </div>

                {maintenanceMode && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 space-y-2">
                    <span className="font-bold block">Public Visitors Announcement Message:</span>
                    <input
                      type="text"
                      value={maintenanceMsg}
                      onChange={(e) => setMaintenanceMsg(e.target.value)}
                      className="w-full p-2 rounded-lg bg-black/60 border border-red-500/30 text-white text-xs font-mono"
                    />
                  </div>
                )}
              </div>

              {/* Deployments History List */}
              <div className="seo-3d-card p-6 space-y-4">
                <h3 className="font-heading font-bold text-white text-base">Deployment Release Log</h3>
                <div className="space-y-3 font-mono text-xs">
                  {deployments.map((d, i) => (
                    <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-[#66FCF1]">{d.version}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-gray-300">Commit: {d.commit}</span>
                          <span className="text-[10px] text-emerald-400 font-bold">{d.status}</span>
                        </div>
                        <div className="text-[10px] text-gray-400">Deployed {d.time} by {d.author} ({d.env})</div>
                      </div>

                      {i > 0 && (
                        <button className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40 text-[11px] font-bold hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                          Rollback
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DEVMODE: SYSTEM HEALTH & ERRORS TAB */}
          {(activeTab === 'system' || activeTab === 'database') && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl font-heading font-extrabold text-[#66FCF1] flex items-center gap-2">
                    <Cpu className="w-6 h-6" />
                    <span>DevMode Infrastructure & Database Health</span>
                  </h1>
                  <p className="text-xs text-gray-400 font-mono">Server memory, response latency, and database connection pool</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="seo-3d-card p-5 space-y-2">
                  <span className="text-xs font-mono text-gray-400">MEMORY UTILIZATION</span>
                  <div className="text-2xl font-heading font-extrabold text-white">240 MB / 1024 MB</div>
                  <div className="w-full h-2 rounded-full bg-white/10">
                    <div className="h-full bg-[#66FCF1] rounded-full" style={{ width: '23%' }} />
                  </div>
                </div>

                <div className="seo-3d-card p-5 space-y-2">
                  <span className="text-xs font-mono text-gray-400">API RESPONSE LATENCY</span>
                  <div className="text-2xl font-heading font-extrabold text-emerald-400">42 ms avg</div>
                  <p className="text-[11px] text-gray-400">Cloud Run container regional ingress</p>
                </div>

                <div className="seo-3d-card p-5 space-y-2">
                  <span className="text-xs font-mono text-gray-400">DATABASE POOL</span>
                  <div className="text-2xl font-heading font-extrabold text-[#45A29E]">99.9% Health</div>
                  <p className="text-[11px] text-gray-400">Automated daily snapshot configured</p>
                </div>
              </div>
            </div>
          )}

          {/* DEVMODE: FEATURE FLAGS & SECRETS TAB */}
          {activeTab === 'flags' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl font-heading font-extrabold text-white">Feature Flags & System Secrets</h1>
                  <p className="text-xs text-gray-400 font-mono">Control rollout matrix and inspect masked API credentials</p>
                </div>
              </div>

              <div className="seo-3d-card p-6 space-y-4">
                <h3 className="font-heading font-bold text-white text-base">Feature Flag Rollout Matrix</h3>
                <div className="space-y-3 font-mono text-xs">
                  {featureFlags.map((flag) => (
                    <div key={flag.id} className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white">{flag.name}</span>
                        <span className="text-[10px] text-gray-400 block">{flag.category}</span>
                      </div>
                      <button
                        onClick={() => handleToggleFeatureFlag(flag.id)}
                        className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                          flag.enabled ? 'bg-[#66FCF1] text-black shadow-[0_0_12px_rgba(102,252,241,0.4)]' : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {flag.enabled ? 'ENABLED' : 'DISABLED'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AUDIT LOGS & SECURITY TAB */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <h1 className="text-2xl font-heading font-extrabold text-white">Security Center & Audit Logs</h1>
                  <p className="text-xs text-gray-400 font-mono">Append-only immutable record of all administrative & developer actions</p>
                </div>
              </div>

              <div className="seo-3d-card p-6 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-gray-400 border-b border-white/10 uppercase">
                      <th className="pb-3">Log ID</th>
                      <th className="pb-3">User</th>
                      <th className="pb-3">Action</th>
                      <th className="pb-3">Target</th>
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3">IP Metadata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5">
                        <td className="py-3 font-bold text-[#66FCF1]">{log.id}</td>
                        <td className="py-3 font-bold text-white">{log.user}</td>
                        <td className="py-3 text-gray-200">{log.action}</td>
                        <td className="py-3 text-gray-400">{log.target}</td>
                        <td className="py-3 text-gray-400">{log.time}</td>
                        <td className="py-3 text-gray-500">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
