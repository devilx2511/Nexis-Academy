import React from 'react';
import { RESULTS_DATA } from '../data/academyData';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Award, TrendingUp, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface ResultsPageProps {
  onOpenDemoModal: () => void;
  onNavigate?: (route: PageRoute) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ onOpenDemoModal, onNavigate }) => {
  return (
    <div className="pt-24 pb-20 bg-[#0B0C10] text-white min-h-screen space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs 
          items={[{ name: 'Results & Achievements', route: 'results' }]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
          Academic Track Record
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
          Progress That Speaks for Itself
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          Verified score improvements across school board examinations and early competitive entrance diagnostics.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESULTS_DATA.map((res) => (
            <div key={res.id} className="seo-3d-card p-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30 text-xs font-bold">
                {res.category}
              </span>
              <div className="text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#66FCF1] to-[#45A29E]">
                {res.metric}
              </div>
              <h3 className="text-xl font-heading font-bold text-white">{res.title}</h3>
              <p className="text-gray-300 text-xs leading-relaxed">{res.description}</p>
              
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-400">{res.studentName}</span>
                <span className="text-[#66FCF1] font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {res.scoreImprovement}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenDemoModal}
            className="px-8 py-4 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-sm hover:bg-[#66FCF1]/90 transition-all inline-flex items-center gap-2 glow-cyan-lg"
          >
            <span>Start Your Academic Growth Story</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
