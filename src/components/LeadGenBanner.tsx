import React from 'react';
import { Sparkles, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';

interface LeadGenBannerProps {
  onOpenDemoModal: () => void;
  onOpenWhatsApp: () => void;
}

export const LeadGenBanner: React.FC<LeadGenBannerProps> = ({ onOpenDemoModal, onOpenWhatsApp }) => {
  return (
    <section className="py-16 bg-[#0B0C10] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1F2833] via-[#0B0C10] to-[#1F2833] border border-[#66FCF1]/40 shadow-[0_0_50px_rgba(102,252,241,0.15)] overflow-hidden">
          {/* Glowing Ambient Background Orbs */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#66FCF1]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#45A29E]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#66FCF1]" />
              <span>Limited Seat Batches for Upcoming Term</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white leading-tight">
              Ready to Help Your Child Learn Better?
            </h2>

            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
              Take the first step toward a more focused and structured learning experience with expert guidance.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-base hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(102,252,241,0.35)] hover:scale-105 cursor-pointer"
              >
                <span>Book a Free Demo Class</span>
                <Sparkles className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-heading font-bold text-base transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#66FCF1]" />
                <span>Talk to Nexis Academy</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#66FCF1]" />
              <span>No mandatory commitment • Interactive 1-on-1 assessment</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
