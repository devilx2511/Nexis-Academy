import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data/academyData';
import { PageRoute } from '../types';
import { Star, Quote, CheckCircle2, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface TestimonialsSectionProps {
  onNavigate: (route: PageRoute) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-20 bg-[#0B0C10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
            Community Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            What Students & Parents Say
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Real feedback from families who experienced the Nexis Academy learning environment.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="seo-3d-card p-8 sm:p-10 relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-20 h-20 text-white/5 pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
              <div className="w-14 h-14 rounded-full bg-[#66FCF1]/20 border border-[#66FCF1] flex items-center justify-center text-[#66FCF1] flex-shrink-0">
                <User className="w-7 h-7" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-heading font-bold text-white">
                    {current.authorName}
                  </h3>
                  {current.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="text-xs text-gray-400 mt-0.5">
                  {current.studentClass} • <span className="text-[#66FCF1]">{current.role}</span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mt-1.5">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonial Quote Content */}
            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-sans italic mb-6">
              "{current.content}"
            </p>

            {/* Highlight Badge */}
            {current.highlightScore && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] text-xs font-bold">
                <span>Result Milestone:</span>
                <span className="text-white">{current.highlightScore}</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? 'w-8 bg-[#66FCF1]' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Go to testimonial slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
