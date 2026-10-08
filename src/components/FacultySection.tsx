import React, { useState } from 'react';
import { FACULTY_DATA } from '../data/academyData';
import { FacultyMember, PageRoute } from '../types';
import { FacultyVideoModal } from './FacultyVideoModal';
import { Award, GraduationCap, Star, BookOpen, Clock, Calendar, CheckCircle2, Play } from 'lucide-react';

interface FacultySectionProps {
  onOpenDemoForSubject: (subject: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({ onOpenDemoForSubject, onNavigate }) => {
  const [selectedFacultyForVideo, setSelectedFacultyForVideo] = useState<FacultyMember | null>(null);

  return (
    <section className="py-20 bg-[#0B0C10] dark:bg-[#0B0C10] light:bg-[#F8FAFC] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[#66FCF1] dark:text-[#66FCF1] light:text-[#0284C7] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
              Expert Educators & Mentors
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white dark:text-white light:text-slate-900">
              Meet the People Behind the Learning
            </h2>
            <p className="text-gray-300 dark:text-gray-300 light:text-slate-600 text-sm sm:text-base">
              Qualified subject specialists dedicated to nurturing conceptual clarity, exam performance, and student confidence. Watch short teacher introductions below.
            </p>
          </div>

          <button
            onClick={() => onNavigate('faculty')}
            className="text-xs font-bold text-[#66FCF1] dark:text-[#66FCF1] light:text-[#0284C7] hover:underline"
          >
            View All Faculty Profiles & Video Intros →
          </button>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FACULTY_DATA.map((fac) => (
            <div
              key={fac.id}
              className="seo-3d-card p-6 flex flex-col justify-between group hover:border-[#66FCF1]/50 relative"
            >
              <div>
                {/* Photo & Video Play Badge */}
                <div className="relative mb-5 overflow-hidden rounded-xl h-48 bg-black/40 border border-white/10 group/img">
                  <img
                    src={fac.photoUrl}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  />

                  {/* Quick Play Intro Button Overlay */}
                  <button
                    onClick={() => setSelectedFacultyForVideo(fac)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors cursor-pointer group/play"
                    aria-label={`Watch ${fac.name} Video Intro`}
                  >
                    <div className="px-3.5 py-2 rounded-full bg-black/80 hover:bg-[#66FCF1] hover:text-[#0B0C10] text-white border border-[#66FCF1]/40 backdrop-blur-md text-xs font-heading font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(0,0,0,0.6)] transform group-hover/play:scale-105 transition-all">
                      <div className="w-5 h-5 rounded-full bg-[#66FCF1] text-[#0B0C10] flex items-center justify-center">
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </div>
                      <span>Watch Intro (90s)</span>
                    </div>
                  </button>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{fac.studentRating}</span>
                  </div>
                </div>

                {/* Name & Qualification */}
                <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-[#66FCF1] transition-colors">
                  {fac.name}
                </h3>

                <div className="text-xs text-[#66FCF1] font-semibold mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#45A29E]" />
                  <span>{fac.qualification}</span>
                </div>

                <div className="text-xs text-gray-300 font-medium mb-3 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#66FCF1]" />
                  <span>{fac.subject} • {fac.experience}</span>
                </div>

                <p className="text-gray-300 text-xs leading-relaxed mb-4">
                  {fac.shortBio}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => setSelectedFacultyForVideo(fac)}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Teacher Intro</span>
                </button>

                <button
                  onClick={() => onOpenDemoForSubject(`${fac.subject} with ${fac.name}`)}
                  className="w-full py-2.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs transition-all flex items-center justify-center gap-2 glow-cyan-sm hover:scale-102 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#0B0C10]" />
                  <span>Request Demo with Faculty</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      <FacultyVideoModal
        faculty={selectedFacultyForVideo}
        isOpen={!!selectedFacultyForVideo}
        onClose={() => setSelectedFacultyForVideo(null)}
        onOpenDemoForFaculty={(facName, subj) => onOpenDemoForSubject(`${subj} with ${facName}`)}
      />
    </section>
  );
};
