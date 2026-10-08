import React, { useState } from 'react';
import { FACULTY_DATA } from '../data/academyData';
import { FacultyMember, PageRoute } from '../types';
import { FacultyExpertChatModal } from '../components/FacultyExpertChatModal';
import { FacultyVideoModal } from '../components/FacultyVideoModal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { GraduationCap, Award, Star, Calendar, MessageSquare, Sparkles, Bot, Play } from 'lucide-react';

interface FacultyPageProps {
  onOpenDemoForSubject: (subject: string) => void;
  onNavigate?: (route: PageRoute) => void;
}

export const FacultyPage: React.FC<FacultyPageProps> = ({ onOpenDemoForSubject, onNavigate }) => {
  const [selectedFacultyForChat, setSelectedFacultyForChat] = useState<FacultyMember | null>(null);
  const [selectedFacultyForVideo, setSelectedFacultyForVideo] = useState<FacultyMember | null>(null);

  return (
    <div className="pt-24 pb-20 bg-[#0B0C10] text-white min-h-screen space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs 
          items={[{ name: 'Faculty & Mentors', route: 'faculty' }]}
          onNavigate={onNavigate}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
          Academic Leadership
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
          Meet the People Behind the Learning
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          Our faculty members combine academic qualifications, decades of collective coaching experience, and genuine enthusiasm for student growth. Watch their short intro videos to learn their teaching style.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FACULTY_DATA.map((fac) => (
            <div key={fac.id} className="seo-3d-card p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="relative mb-5 overflow-hidden rounded-xl h-52 bg-black/40 border border-white/10 group/img">
                  <img 
                    src={fac.photoUrl} 
                    alt={`Nexis Academy Lead Faculty - ${fac.subject} Specialist`}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={208}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500" 
                  />

                  {/* Play Video Intro Overlay */}
                  <button
                    onClick={() => setSelectedFacultyForVideo(fac)}
                    className="absolute inset-0 flex items-center justify-center bg-black/35 hover:bg-black/55 transition-colors cursor-pointer group/btn"
                    aria-label={`Watch ${fac.name} Video Intro`}
                  >
                    <div className="px-3.5 py-2 rounded-full bg-black/80 hover:bg-[#66FCF1] hover:text-[#0B0C10] text-white border border-[#66FCF1]/40 backdrop-blur-md text-xs font-heading font-bold flex items-center gap-2 shadow-xl transform group-hover/btn:scale-105 transition-all">
                      <div className="w-5 h-5 rounded-full bg-[#66FCF1] text-[#0B0C10] flex items-center justify-center">
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </div>
                      <span>Watch Intro (90s)</span>
                    </div>
                  </button>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{fac.studentRating} / 5.0</span>
                  </div>

                  {/* Online Tag */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-[#0B0C10]/80 backdrop-blur-md border border-[#66FCF1]/40 text-[#66FCF1] text-[10px] font-mono font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Video + Live Q&A</span>
                  </div>
                </div>

                <h2 className="text-2xl font-heading font-bold text-white">{fac.name}</h2>
                <div className="text-xs text-[#66FCF1] font-semibold mt-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#45A29E]" />
                  <span>{fac.qualification}</span>
                </div>
                <div className="text-xs text-gray-300 font-medium mt-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#66FCF1]" />
                  <span>{fac.subject} • {fac.experience}</span>
                </div>

                <div className="my-3 p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-300 space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Specialization:</span>
                  <span className="font-semibold text-white">{fac.specialization}</span>
                </div>

                <p className="text-gray-300 text-xs leading-relaxed">
                  {fac.shortBio}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                {/* Watch Intro Button */}
                <button
                  onClick={() => setSelectedFacultyForVideo(fac)}
                  className="w-full py-2 rounded-xl bg-white/5 hover:bg-[#66FCF1]/15 border border-[#66FCF1]/30 text-[#66FCF1] font-heading font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Teacher Intro Video</span>
                </button>

                {/* Ask the Expert Toggle */}
                <button
                  onClick={() => setSelectedFacultyForChat(fac)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#66FCF1]/10 border border-[#66FCF1]/40 text-[#66FCF1] font-heading font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_12px_rgba(102,252,241,0.15)]"
                >
                  <MessageSquare className="w-4 h-4 text-[#66FCF1]" />
                  <span>Ask the Expert Q&A</span>
                </button>

                <button
                  onClick={() => onOpenDemoForSubject(`${fac.subject} with ${fac.name}`)}
                  className="w-full py-2.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-2 glow-cyan-sm hover:scale-102 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Demo Session</span>
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

      {/* Ask Expert Chat Modal */}
      {selectedFacultyForChat && (
        <FacultyExpertChatModal
          faculty={selectedFacultyForChat}
          onClose={() => setSelectedFacultyForChat(null)}
          onOpenDemo={onOpenDemoForSubject}
        />
      )}
    </div>
  );
};
