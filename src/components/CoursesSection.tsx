import React, { useState } from 'react';
import { COURSES_DATA } from '../data/academyData';
import { Course, PageRoute } from '../types';
import { Check, ArrowRight, Sparkles, Clock, Users, BookOpen, Layers } from 'lucide-react';

interface CoursesSectionProps {
  onSelectCourse: (course: Course) => void;
  onOpenDemoForCourse: (subjectName: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onSelectCourse,
  onOpenDemoForCourse,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Foundation', 'Board Prep', 'Competitive', 'School Tuition'];

  const filteredCourses = selectedCategory === 'All'
    ? COURSES_DATA
    : COURSES_DATA.filter(c => c.category === selectedCategory);

  return (
    <section id="courses-section" className="py-20 bg-[#0B0C10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
              Structured Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
              Programs Designed for Better Learning
            </h2>
            <p className="text-gray-300 text-sm sm:text-base">
              Choose from specialized board preparation, early competitive foundations, and subject-focused tuition modules.
            </p>
          </div>

          <button
            onClick={() => onNavigate('courses')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#66FCF1] hover:underline"
          >
            <span>View Full Course Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_15px_rgba(102,252,241,0.4)]'
                  : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="seo-3d-card p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              {course.featured && (
                <div className="absolute top-0 right-0 bg-[#66FCF1] text-[#0B0C10] text-[10px] font-heading font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                {/* Category & Grade */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#45A29E]/20 text-[#66FCF1] border border-[#45A29E]/40">
                    {course.gradeLevel}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{course.category}</span>
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-[#66FCF1] transition-colors">
                  {course.title}
                </h3>

                {/* Short Description */}
                <p className="text-gray-300 text-xs sm:text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Subjects Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {course.subjects.map((sub, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-black/40 text-[11px] text-gray-300 border border-white/10">
                      {sub}
                    </span>
                  ))}
                </div>

                {/* Price Tag if available */}
                {course.price && (
                  <div className="flex items-center justify-between mb-3 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono">
                    <span className="text-gray-400">Tuition Fee:</span>
                    <span className="font-extrabold text-emerald-300">{course.price.monthly}</span>
                  </div>
                )}

                {/* Key Benefits */}
                <div className="space-y-2 border-t border-white/10 pt-4 mb-6">
                  {course.keyBenefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <Check className="w-4 h-4 text-[#66FCF1] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => onSelectCourse(course)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-heading font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#66FCF1]" />
                  <span>View Full Program & Syllabus</span>
                </button>

                <button
                  onClick={() => onOpenDemoForCourse(course.title)}
                  className="w-full py-2.5 rounded-xl bg-[#66FCF1]/20 hover:bg-[#66FCF1] text-[#66FCF1] hover:text-[#0B0C10] border border-[#66FCF1]/40 font-heading font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Free Demo for {course.gradeLevel}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
