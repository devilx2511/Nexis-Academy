import React from 'react';
import { TESTIMONIALS_DATA } from '../data/academyData';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Star, Quote, CheckCircle2, User, Sparkles } from 'lucide-react';

interface TestimonialsPageProps {
  onOpenDemoModal: () => void;
  onNavigate?: (route: PageRoute) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenDemoModal, onNavigate }) => {
  return (
    <div className="pt-24 pb-20 bg-[#0B0C10] text-white min-h-screen space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs 
          items={[{ name: 'Testimonials & Reviews', route: 'testimonials' }]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
          Community Feedback
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
          What Students & Parents Say
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          Read authentic reviews from families whose children transformed their study habits and exam confidence at Nexis Academy.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <div key={item.id} className="seo-3d-card p-6 flex flex-col justify-between space-y-4 relative">
              <Quote className="absolute top-4 right-4 w-12 h-12 text-white/5 pointer-events-none" />
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#66FCF1]/20 border border-[#66FCF1] flex items-center justify-center text-[#66FCF1]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-white">{item.authorName}</h3>
                    <div className="text-xs text-gray-400">{item.studentClass} • <span className="text-[#66FCF1]">{item.role}</span></div>
                  </div>
                </div>

                <div className="flex items-center gap-1 my-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              {item.highlightScore && (
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-400">Milestone:</span>
                  <span className="font-bold text-[#66FCF1]">{item.highlightScore}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onOpenDemoModal}
            className="px-8 py-4 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-sm hover:bg-[#66FCF1]/90 transition-all inline-flex items-center gap-2 glow-cyan-lg"
          >
            <span>Experience the Nexis Difference — Book Free Demo</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
