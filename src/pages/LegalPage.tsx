import React, { useState } from 'react';
import { ShieldCheck, FileText, Lock, CheckCircle2, Download, Printer, ArrowLeft, Search, HelpCircle, Mail, Phone, ExternalLink } from 'lucide-react';
import { PageRoute } from '../types';
import { ACADEMY_INFO } from '../data/academyData';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate?: (route: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type: initialType, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialType);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-20 bg-[#0B0C10] text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate ? onNavigate('home') : window.history.back()}
            className="text-xs font-mono text-[#66FCF1] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Academy Home</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 flex items-center gap-1.5 cursor-pointer transition-all"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5 text-[#66FCF1]" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] text-xs font-mono font-bold tracking-wider uppercase glow-cyan-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#66FCF1]" />
            <span>NEXIS ACADEMY LEGAL & COMPLIANCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            {activeTab === 'privacy' ? 'Privacy Policy & Student Data Charter' : 'Terms of Service & Enrollment Conditions'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto font-mono">
            Last Updated: August 2026 • Governing legal agreements between Nexis Academy, students, and legal guardians.
          </p>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#1F2833]/80 border border-white/10">
          <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/15 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'privacy'
                  ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_12px_rgba(102,252,241,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'terms'
                  ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_12px_rgba(102,252,241,0.4)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms of Service</span>
            </button>
          </div>

          {/* Quick Search inside document */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search legal clauses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-[#66FCF1]"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="seo-3d-card p-6 sm:p-10 space-y-8 text-xs sm:text-sm text-gray-300 leading-relaxed font-sans border border-white/15">
          
          {activeTab === 'privacy' ? (
            /* PRIVACY POLICY CONTENT */
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-xs text-[#66FCF1] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>
                  <strong>Our Privacy Guarantee:</strong> Nexis Academy treats student and parental data with bank-grade encryption. We strictly never sell, license, or monetize your contact or diagnostic academic records to any third-party advertisers.
                </span>
              </div>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">01.</span> Scope & Data We Collect
                </h2>
                <p>
                  This Privacy Policy applies to all services provided by Nexis Academy, including our website, student portal, 3D interactive learning suites, diagnostic test evaluations, and free demo reservations.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-400 pl-2">
                  <li><strong>Student Information:</strong> Name, class level, school curriculum (CBSE/ICSE/State Board), academic performance scores, and mock test diagnostic inputs.</li>
                  <li><strong>Guardian / Parent Information:</strong> Parent name, verified mobile phone number, WhatsApp contact, and email address for billing and attendance reporting.</li>
                  <li><strong>Technical & Portal Data:</strong> Session tokens, encrypted authentication hashes, device IP address, browser type, and user learning preferences (such as Dark/Light theme mode).</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">02.</span> How We Use Collected Data
                </h2>
                <p>
                  Nexis Academy collects data exclusively for educational and administrative excellence:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-white font-bold block">Academic Progression</span>
                    <span className="text-gray-400 text-xs">Tracking formula mastery, weekly quiz milestones, and AI tutor personalized difficulty adjustments.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-white font-bold block">Parental Transparency</span>
                    <span className="text-gray-400 text-xs">Dispatching real-time WhatsApp attendance confirmations, fee receipts, and term scorecards.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-white font-bold block">Classroom Logistics</span>
                    <span className="text-gray-400 text-xs">Scheduling small batch timings, hybrid interactive live sessions, and 1-on-1 doubt clearing slots.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-white font-bold block">Security & Fraud Prevention</span>
                    <span className="text-gray-400 text-xs">Ensuring master RBAC controls and preventing unauthorized concurrent portal logins.</span>
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">03.</span> Protection of Minor Students
                </h2>
                <p>
                  As an educational institution catering to students in Classes 6 through 12, protecting minors is our fundamental responsibility. All demo reservations and student enrollments for students under the age of 18 require parental or legal guardian consent. We enforce strict role-based access control (RBAC) so only certified faculty and parents can view student progress graphs.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">04.</span> Cookies & Local Browser Storage
                </h2>
                <p>
                  We utilize browser <code className="text-[#66FCF1] bg-black/50 px-1 py-0.5 rounded">localStorage</code> and <code className="text-[#66FCF1] bg-black/50 px-1 py-0.5 rounded">sessionStorage</code> to store non-sensitive user preferences such as Dark/Light 3D Theme settings, notification dismissal timestamps, and secure session credentials. We do not place invasive cross-site tracking pixels or third-party marketing cookies.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">05.</span> Data Retention & Right to Erasure
                </h2>
                <p>
                  Students and parents may request a full copy of their stored academic transcripts or request complete data erasure upon academic course completion by emailing our administrative desk at <a href={`mailto:${ACADEMY_INFO.contact.email}`} className="text-[#66FCF1] hover:underline font-mono">{ACADEMY_INFO.contact.email}</a>.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">06.</span> Grievance Redressal Officer
                </h2>
                <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2 text-xs font-mono">
                  <p>In accordance with Information Technology Act and applicable privacy statutes, the contact details for grievances are:</p>
                  <div className="text-white">
                    <div><strong>Grievance Officer:</strong> Sanhati & Nexis Administrative Council</div>
                    <div><strong>Email:</strong> {ACADEMY_INFO.contact.email}</div>
                    <div><strong>Address:</strong> {ACADEMY_INFO.contact.address}</div>
                    <div><strong>Response SLA:</strong> Within 48 business hours</div>
                  </div>
                </div>
              </section>

            </div>
          ) : (
            /* TERMS OF SERVICE CONTENT */
            <div className="space-y-6">
              
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  <strong>Academic Excellence Agreement:</strong> These terms safeguard a disciplined, constructive learning atmosphere for all students, parents, and faculty members at Nexis Academy.
                </span>
              </div>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">01.</span> Acceptance of Terms & Enrollment
                </h2>
                <p>
                  By enrolling in any Nexis Academy course (Class 6-10 Foundation, Board Sprints, JEE/NEET Competitive Coaching, or School Tuition modules), booking a Free Demo Session, or accessing the Student Portal, you agree to be bound by these Terms of Service.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">02.</span> Free Demo Class Policy
                </h2>
                <p>
                  Free Demo Classes are offered without financial obligation. Allocation of demo seats is subject to batch capacity (micro-batch size of 8–15 students max). Nexis Academy reserves the right to reschedule demo timings with prior notification via WhatsApp or SMS.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">03.</span> Tuition Fees, Scholarships & Payment Terms
                </h2>
                <ul className="list-disc list-inside space-y-1 text-gray-400 pl-2">
                  <li><strong>Fee Schedules:</strong> Course fees may be paid on a monthly basis or discounted annual one-time plan as stated in the course prospectus.</li>
                  <li><strong>Scholarship Waivers:</strong> Diagnostic admission test scholarships (up to 30% fee waiver) are non-transferable and applied against subsequent term billings.</li>
                  <li><strong>Refund & Withdrawal Policy:</strong> If a student withdraws within 7 days of official batch commencement, a full pro-rata refund of tuition fees (minus registration/study material processing charges) is granted.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">04.</span> Student Code of Conduct & Punctuality
                </h2>
                <p>
                  Nexis Academy enforces a strict code of mutual respect. Students must join hybrid live batches punctually, maintain homework submission deadlines, and refrain from abusive language in digital forums or classroom chat rooms. Severe violations may result in termination of enrollment without refund.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">05.</span> Intellectual Property & Study Material
                </h2>
                <p>
                  All proprietary 3D spatial geometry diagrams, formula cheat sheets, video recordings, question banks, and AI tutor models are the exclusive intellectual property of Nexis Academy. Unauthorized re-distribution, commercial resale, or public hosting of Nexis Academy materials is strictly prohibited under copyright laws.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">06.</span> Disclaimers & Performance Guarantee
                </h2>
                <p>
                  While Nexis Academy provides rigorous pedagogical mentorship, 3D visualization aids, and weekly diagnostic feedback, individual academic results depend on regular student diligence, revision, and examination attendance. Nexis Academy does not guarantee specific rank numbers without consistent student participation.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span className="text-[#66FCF1] font-mono">07.</span> Governing Law & Jurisdiction
                </h2>
                <p>
                  These terms are governed by and construed in accordance with the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts located in West Bengal / Kolkata, India.
                </p>
              </section>

            </div>
          )}

        </div>

        {/* Bottom Contact & Reassurance Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1F2833] via-black/80 to-[#1F2833] border border-[#66FCF1]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono font-bold text-[#66FCF1] uppercase">Questions regarding our policies?</span>
            <p className="text-sm text-gray-300">Our administrative support team is available 7 days a week to clarify any clauses.</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${ACADEMY_INFO.contact.email}`}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-white flex items-center gap-1.5 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#66FCF1]" />
              <span>Email Desk</span>
            </a>
            <button
              onClick={() => onNavigate ? onNavigate('contact') : null}
              className="px-4 py-2 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center gap-1.5 glow-cyan-sm hover:scale-105 transition-all cursor-pointer"
            >
              <span>Contact Academy</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
