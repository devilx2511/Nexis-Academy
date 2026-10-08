import React from 'react';
import { Course } from '../types';
import { ShareContentButton } from '../components/ShareContentButton';
import { CourseLearningRoadmap } from '../components/CourseLearningRoadmap';
import { X, Check, BookOpen, Clock, Users, Calendar, Sparkles, Download, ShieldCheck, ArrowLeft } from 'lucide-react';

interface CourseDetailPageProps {
  course: Course;
  onClose: () => void;
  onOpenDemo: (subject: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ course, onClose, onOpenDemo }) => {
  const downloadSyllabusPDF = () => {
    alert(`Downloading complete syllabus brochure for ${course.title}...`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0F172A] border border-[#66FCF1]/30 p-6 sm:p-8 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)] space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10 gap-4">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/30">
              {course.gradeLevel} • {course.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mt-2">
              {course.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Native Web Share API Button */}
            <ShareContentButton 
              title={course.title}
              text={`Explore ${course.title} (${course.gradeLevel}) coaching curriculum at Nexis Academy.`}
              variant="pill"
            />

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Overview */}
        <p className="text-gray-300 text-sm leading-relaxed">
          {course.description}
        </p>

        {/* Course Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-black/40 border border-white/10 text-xs">
          <div>
            <span className="text-gray-400 block text-[10px]">Batch Size</span>
            <span className="font-bold text-[#66FCF1]">{course.batchSize}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Duration</span>
            <span className="font-bold text-white">{course.duration}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Delivery Mode</span>
            <span className="font-bold text-white">{course.mode}</span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px]">Class Days</span>
            <span className="font-bold text-[#45A29E]">{course.schedule}</span>
          </div>
        </div>

        {/* Responsive SVG Learning Roadmap Timeline */}
        <CourseLearningRoadmap course={course} />

        {/* Subjects Covered */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300">Core Subjects Included:</h3>
          <div className="flex flex-wrap gap-2">
            {course.subjects.map((sub, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30 text-xs font-semibold">
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Syllabus Breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#66FCF1]" />
            <span>Syllabus Highlights & Chapters</span>
          </h3>

          <div className="space-y-2">
            {course.syllabusHighlights.map((highlight, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-gray-200">
                <span className="w-5 h-5 rounded-full bg-[#66FCF1]/20 text-[#66FCF1] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4">
          <ShareContentButton 
            title={course.title}
            text={`Check out ${course.title} syllabus on Nexis Academy`}
            variant="button"
          />

          <button
            onClick={downloadSyllabusPDF}
            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-heading font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#66FCF1]" />
            <span>Download Syllabus PDF</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenDemo(course.title);
            }}
            className="flex-1 py-3.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-sm flex items-center justify-center gap-2 glow-cyan-lg hover:scale-105 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Book Free Demo Class for {course.gradeLevel}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
