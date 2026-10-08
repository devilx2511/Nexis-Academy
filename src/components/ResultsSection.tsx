import React from 'react';
import { RESULTS_DATA } from '../data/academyData';
import { PageRoute } from '../types';
import { Award, TrendingUp, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface ResultsSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-[#0B0C10] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
              Verified Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
              Progress That Speaks for Itself
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Consistent conceptual understanding translates directly into measurable academic performance.
            </p>
          </div>

          <button
            onClick={() => onNavigate('results')}
            className="text-xs font-bold text-[#66FCF1] hover:underline flex items-center gap-1"
          >
            <span>View Complete Results Analytics</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Results Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESULTS_DATA.map((res) => (
            <div
              key={res.id}
              className="seo-3d-card p-6 flex flex-col justify-between group hover:border-[#66FCF1]/50 relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30 text-xs font-semibold">
                    {res.category}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#66FCF1]">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-4xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#66FCF1] to-[#45A29E] mb-2">
                  {res.metric}
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  {res.title}
                </h3>

                <p className="text-gray-300 text-xs leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-400 font-medium">{res.studentName}</span>
                <span className="text-[#66FCF1] font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {res.scoreImprovement}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer / Factual Statement */}
        <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-gray-400 max-w-2xl mx-auto">
          <ShieldCheck className="w-5 h-5 text-[#66FCF1] flex-shrink-0" />
          <span>
            Nexis Academy maintains strict factual auditing for all reported score increases. Individual results depend on attendance, diagnostic practice, and student effort.
          </span>
        </div>

      </div>
    </section>
  );
};
