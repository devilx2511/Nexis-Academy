import React, { useState, useRef, useEffect } from 'react';
import { FacultyMember } from '../types';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  RotateCcw, 
  Sparkles, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  Calendar,
  Subtitles,
  ExternalLink
} from 'lucide-react';

interface FacultyVideoModalProps {
  faculty: FacultyMember | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenDemoForFaculty: (facultyName: string, subject: string) => void;
}

export const FacultyVideoModal: React.FC<FacultyVideoModalProps> = ({
  faculty,
  isOpen,
  onClose,
  onOpenDemoForFaculty
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Simulated chapter markers for faculty intro
  const chapters = [
    { title: 'Welcome & Academic Pedagogy', startSec: 0, duration: '0:00 - 0:20' },
    { title: 'Eliminating Formula Memorization', startSec: 20, duration: '0:20 - 0:42' },
    { title: 'Board Exam Step-Marking Secrets', startSec: 42, duration: '0:42 - 1:05' },
    { title: '1-on-1 Personal Mentorship Flow', startSec: 65, duration: '1:05 - 1:30' },
  ];

  // Placeholder sample video URL (Standard HTML5 web-compatible educational video)
  const placeholderVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      setProgress(5);
      setActiveChapter(0);
    } else {
      setIsPlaying(false);
    }
  }, [isOpen, faculty]);

  // Simulate video playback progress if HTML5 video fails or in sandbox
  useEffect(() => {
    let interval: any;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) {
            return 98;
          }
          const next = prev + 1;
          if (next > 65) setActiveChapter(3);
          else if (next > 42) setActiveChapter(2);
          else if (next > 20) setActiveChapter(1);
          else setActiveChapter(0);
          return next;
        });
      }, 900 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackSpeed]);

  if (!isOpen || !faculty) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0F172A] border border-[#66FCF1]/30 text-white shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#66FCF1]/40 flex-shrink-0">
              <img 
                src={faculty.photoUrl} 
                alt={faculty.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-white">
                  {faculty.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30">
                  {faculty.subject}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {faculty.qualification} • {faculty.experience} Experience
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close video modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Canvas */}
        <div className="relative bg-black aspect-video w-full overflow-hidden group">
          {/* Native HTML5 Video Player with Poster */}
          <video
            ref={videoRef}
            src={placeholderVideoUrl}
            poster={faculty.photoUrl}
            autoPlay
            muted={isMuted}
            playsInline
            loop
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Subtitles Overlay */}
          {showSubtitles && isPlaying && (
            <div className="absolute bottom-16 left-6 right-6 flex justify-center pointer-events-none">
              <div className="bg-black/85 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-xs sm:text-sm text-center font-medium text-white max-w-xl shadow-lg">
                {activeChapter === 0 && `"At Nexis Academy, we break down complex ${faculty.subject} theories into visual building blocks..."`}
                {activeChapter === 1 && `"We don't believe in rote formulas. Once students visualize the mechanics, retention reaches 99%."`}
                {activeChapter === 2 && `"In Board exams, step-marking is where 15-20 marks are routinely lost. Here is how we safeguard them."`}
                {activeChapter === 3 && `"Every student receives customized numerical worksheets matching their target percentile."`}
              </div>
            </div>
          )}

          {/* Faculty Floating Info Overlay */}
          <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-white">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-bold tracking-wider uppercase">Faculty Intro: {chapters[activeChapter].title}</span>
          </div>

          {/* Center Play/Pause Click Handler Overlay */}
          <div 
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent"
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-[#66FCF1]/90 text-[#0B0C10] flex items-center justify-center shadow-[0_0_30px_rgba(102,252,241,0.5)] transform scale-110 transition-transform">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
            )}
          </div>

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col gap-2">
            
            {/* Progress Bar / Scrubber */}
            <div 
              className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group/bar hover:h-2.5 transition-all"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPct = (clickX / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, newPct)));
              }}
            >
              <div 
                className="h-full bg-gradient-to-r from-[#45A29E] to-[#66FCF1] rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md transform scale-0 group-hover/bar:scale-100 transition-transform" />
              </div>
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <button 
                  onClick={togglePlay} 
                  className="hover:text-[#66FCF1] transition-colors p-1"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                <button 
                  onClick={toggleMute} 
                  className="hover:text-[#66FCF1] transition-colors p-1"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="font-mono text-[11px] text-gray-300">
                  {Math.floor((progress * 90) / 100)}s / 90s
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Chapters Quick Select */}
                <span className="hidden sm:inline text-[11px] text-[#66FCF1] font-mono">
                  {chapters[activeChapter].title}
                </span>

                {/* Subtitles Toggle */}
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`p-1 rounded text-xs flex items-center gap-1 ${
                    showSubtitles ? 'text-[#66FCF1] font-bold' : 'text-gray-400 hover:text-white'
                  }`}
                  title="Toggle English Subtitles"
                >
                  <Subtitles className="w-4 h-4" />
                  <span className="text-[10px]">CC</span>
                </button>

                {/* Speed Toggle */}
                <button
                  onClick={cycleSpeed}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-mono font-bold"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Highlights & Booking Action */}
        <div className="p-5 bg-[#0B0C10] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-left w-full sm:w-auto">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Nexis Senior Educator & Syllabus Director</span>
            </div>
            <p className="text-xs text-gray-400">
              Specializes in {faculty.specialization} • Board distinction rate 98.4%
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenDemoForFaculty(faculty.name, faculty.subject);
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-2 glow-cyan-sm hover:scale-105 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book 1-on-1 Class with {faculty.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
