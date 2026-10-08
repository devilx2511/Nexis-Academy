import React from 'react';
import { Award, Users, FileCheck2, HelpCircle, Target, CheckCircle2 } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const trustFeatures = [
    {
      icon: Award,
      title: "Experienced Faculty",
      desc: "Qualified subject specialists dedicated to conceptual mastery and exam strategy.",
      badge: "Master Mentors"
    },
    {
      icon: Users,
      title: "Personalized Attention",
      desc: "Strictly capped small batch sizes ensuring no student gets left behind.",
      badge: "Max 12 / Batch"
    },
    {
      icon: FileCheck2,
      title: "Regular Assessments",
      desc: "Bi-weekly diagnostics and full-length mock examinations with detailed feedback.",
      badge: "Bi-Weekly Diagnostics"
    },
    {
      icon: HelpCircle,
      title: "Doubt-Solving Support",
      desc: "Daily 1-on-1 doubt desks and digital assistance to clear bottlenecks immediately.",
      badge: "Zero Backlog"
    },
    {
      icon: Target,
      title: "Result-Oriented Learning",
      desc: "Structured NCERT and entrance syllabus coverage designed for top percentiles.",
      badge: "Measurable Growth"
    }
  ];

  return (
    <section className="py-16 bg-[#0B0C10] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
            Trust & Academic Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Why Students Choose Nexis Academy
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            We combine proven pedagogical techniques with small batch sizes and modern tech-driven learning tools.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {trustFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="seo-3d-card p-5 flex flex-col justify-between group hover:border-[#66FCF1]/40"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-white mb-2 group-hover:text-[#66FCF1] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-[#45A29E]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#66FCF1]" />
                  <span>{feat.badge}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlighted Verified Metrics Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#1F2833] via-black to-[#1F2833] border border-[#66FCF1]/20 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#66FCF1]">[100+]</div>
            <div className="text-xs text-gray-300 mt-1 font-medium">Students Guided</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-white">98.4%</div>
            <div className="text-xs text-gray-300 mt-1 font-medium">Grade Improvement Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#45A29E]">1 : 10</div>
            <div className="text-xs text-gray-300 mt-1 font-medium">Student-Teacher Ratio</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-heading font-extrabold text-[#66FCF1]">100%</div>
            <div className="text-xs text-gray-300 mt-1 font-medium">Doubt Resolution Guarantee</div>
          </div>
        </div>

      </div>
    </section>
  );
};
