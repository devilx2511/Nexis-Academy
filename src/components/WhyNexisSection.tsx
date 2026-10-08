import React from 'react';
import { UserCheck, GraduationCap, BarChart3, HelpCircle, ShieldAlert, LineChart } from 'lucide-react';

export const WhyNexisSection: React.FC = () => {
  const advantages = [
    {
      icon: UserCheck,
      title: "Personalized Attention",
      desc: "Learning support tailored to individual student needs and cognitive pace."
    },
    {
      icon: GraduationCap,
      title: "Expert Guidance",
      desc: "Structured teaching from qualified educators with proven track records."
    },
    {
      icon: BarChart3,
      title: "Regular Assessments",
      desc: "Frequent chapter-wise diagnostics to measure and reinforce retention."
    },
    {
      icon: HelpCircle,
      title: "Doubt Resolution",
      desc: "Dedicated 1-on-1 support for complex formulas, numericals, and concepts."
    },
    {
      icon: ShieldAlert,
      title: "Focused Learning Environment",
      desc: "A disciplined atmosphere crafted to maximize concentration and focus."
    },
    {
      icon: LineChart,
      title: "Progress Tracking",
      desc: "Transparent report cards that help parents and students chart academic development."
    }
  ];

  return (
    <section className="py-20 bg-[#0B0C10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
            The Nexis Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Learning That Goes Beyond the Classroom
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            How Nexis Academy combines individual care with tech-assisted pedagogical frameworks.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="seo-3d-card p-6 flex flex-col justify-between group hover:border-[#66FCF1]/50"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#66FCF1]/20 to-[#45A29E]/10 border border-[#66FCF1]/30 flex items-center justify-center text-[#66FCF1] mb-5 group-hover:scale-110 transition-transform glow-cyan-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-[#66FCF1] transition-colors">
                    {adv.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    {adv.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-[#45A29E] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#66FCF1]" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
