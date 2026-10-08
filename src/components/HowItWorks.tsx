import React from 'react';
import { PhoneCall, Sparkles, CheckCircle2, Rocket, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenDemoModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenDemoModal }) => {
  const steps = [
    {
      num: "01",
      title: "Talk to Us",
      desc: "Tell us about the student's academic goals, current grade level, and specific subject target.",
      icon: PhoneCall
    },
    {
      num: "02",
      title: "Attend a Demo",
      desc: "Experience the Nexis Academy 3D tech-enabled learning environment with a free 1-on-1 session.",
      icon: Sparkles
    },
    {
      num: "03",
      title: "Choose Your Program",
      desc: "Select the tailored foundation, board sprint, or entrance program that fits the student's schedule.",
      icon: CheckCircle2
    },
    {
      num: "04",
      title: "Start Learning",
      desc: "Begin a structured learning journey with expert faculty mentorship and continuous diagnostic updates.",
      icon: Rocket
    }
  ];

  return (
    <section className="py-20 bg-[#0B0C10] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
            Seamless Onboarding
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            How It Works
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Your 4-step pathway to academic confidence and measurable score improvement.
          </p>
        </div>

        {/* 4-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="seo-3d-card p-6 flex flex-col justify-between relative group hover:border-[#66FCF1]/50"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#66FCF1] to-[#45A29E]">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#66FCF1]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-[#66FCF1] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-[11px] font-semibold text-[#66FCF1] group-hover:translate-x-1 transition-transform">
                  <span>Step {step.num} Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenDemoModal}
            className="px-8 py-4 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-sm hover:bg-[#66FCF1]/90 transition-all inline-flex items-center gap-2 shadow-[0_0_20px_rgba(102,252,241,0.3)] hover:scale-105 cursor-pointer"
          >
            <span>Take Step 01: Book Your Free Demo Class</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
