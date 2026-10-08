import React, { useState } from 'react';
import { COURSES_DATA } from '../data/academyData';
import { Course, PageRoute, TimetableSlot } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { AutoSuggestCourseSearch } from '../components/AutoSuggestCourseSearch';
import { 
  BookOpen, 
  Search, 
  Check, 
  Sparkles, 
  Clock, 
  Users, 
  ArrowRight, 
  Download, 
  FileText,
  Calendar,
  DollarSign,
  Tag,
  X,
  ShieldCheck,
  Grid,
  Table
} from 'lucide-react';

interface CoursesPageProps {
  onSelectCourse: (course: Course) => void;
  onOpenDemoForCourse: (subjectName: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  onSelectCourse,
  onOpenDemoForCourse,
  onNavigate
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  const [activeTimetableCourse, setActiveTimetableCourse] = useState<Course | null>(null);

  const categories = ['All', 'Foundation', 'Board Prep', 'Competitive', 'School Tuition'];

  const filtered = COURSES_DATA.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      course.gradeLevel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-[#0B0C10] text-white min-h-screen space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs 
          items={[{ name: 'Courses & Programs', route: 'courses' }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
          Academic Programs, Pricing & Timetables
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
          Explore Nexis Academy Courses
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          Tailored curriculum for Class 6 to 12 students with clear pricing, scholarship waivers, and flexible weekly timetables.
        </p>
      </div>

      {/* Filter, View Switcher and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#1F2833]/60 border border-white/10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_12px_rgba(102,252,241,0.4)]'
                    : 'bg-black/40 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/10 shrink-0">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'cards' ? 'bg-[#66FCF1] text-[#0B0C10]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Cards View</span>
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'matrix' ? 'bg-[#66FCF1] text-[#0B0C10]' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Fee & Timetable Matrix</span>
              </button>
            </div>

            {/* Auto-Suggest Real-Time Search Bar */}
            <div className="w-full md:w-80">
              <AutoSuggestCourseSearch
                onSelectCourse={onSelectCourse}
                onOpenDemoForCourse={onOpenDemoForCourse}
                placeholder="Auto-suggest search (e.g. Physics, Math, JEE)..."
              />
            </div>
          </div>

        </div>
      </div>

      {/* MATRIX VIEW TABLE */}
      {viewMode === 'matrix' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="seo-3d-card p-6 overflow-x-auto space-y-4">
            <h3 className="text-xl font-heading font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#66FCF1]" />
              <span>Comprehensive Course Timetable & Fee Matrix</span>
            </h3>

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/15 text-[#66FCF1] font-mono uppercase tracking-wider">
                  <th className="py-3 px-4">Program & Grade</th>
                  <th className="py-3 px-4">Mode & Duration</th>
                  <th className="py-3 px-4">Monthly Fee</th>
                  <th className="py-3 px-4">Annual Plan</th>
                  <th className="py-3 px-4">Batch Timetable Slots</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-gray-200">
                {filtered.map((course) => (
                  <tr key={course.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-white">
                      <div>{course.title}</div>
                      <span className="text-[10px] text-[#66FCF1] font-mono">{course.gradeLevel}</span>
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-300">
                      <div>{course.mode}</div>
                      <span className="text-[10px] text-gray-400">{course.duration}</span>
                    </td>
                    <td className="py-4 px-4 font-mono text-emerald-400 font-extrabold text-sm">
                      {course.price?.monthly || 'Inquire'}
                    </td>
                    <td className="py-4 px-4 font-mono text-white">
                      <div>{course.price?.annual || 'Inquire'}</div>
                      {course.price?.scholarshipDiscount && (
                        <span className="text-[10px] text-amber-300 font-bold block">
                          {course.price.scholarshipDiscount}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-300">
                      <div className="space-y-1">
                        {course.timetable?.map((slot, i) => (
                          <div key={i} className="text-[11px] flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#66FCF1]" />
                            <span><strong className="text-white">{slot.days}:</strong> {slot.time} ({slot.batchType})</span>
                          </div>
                        )) || course.schedule}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onOpenDemoForCourse(course.title)}
                        className="px-3 py-1.5 rounded-lg bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-[11px] glow-cyan-sm hover:scale-105 transition-all cursor-pointer"
                      >
                        Book Seat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARDS VIEW */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((course) => (
              <div
                key={course.id}
                className="seo-3d-card p-6 sm:p-8 flex flex-col justify-between space-y-6 group hover:border-[#66FCF1]/50"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30">
                      {course.gradeLevel}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{course.mode}</span>
                  </div>

                  <h2 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-[#66FCF1] transition-colors">
                    {course.title}
                  </h2>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Pricing Box */}
                  {course.price && (
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-black/50 to-[#66FCF1]/10 border border-emerald-500/30 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 font-mono uppercase block">Monthly Tuition Fee</span>
                        <span className="text-lg font-heading font-extrabold text-emerald-300">{course.price.monthly}</span>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-[10px] text-gray-400 font-mono uppercase block">Annual Savings Plan</span>
                        <span className="text-xs font-mono font-bold text-white">{course.price.annual}</span>
                      </div>
                      {course.price.scholarshipDiscount && (
                        <div className="w-full sm:w-auto px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-400/40 text-center">
                          ⚡ {course.price.scholarshipDiscount}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Batch Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-xl bg-black/40 border border-white/10 mb-4 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px]">Duration</span>
                      <span className="font-semibold text-white">{course.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px]">Batch Size</span>
                      <span className="font-semibold text-[#66FCF1]">{course.batchSize}</span>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-gray-400 block text-[10px]">Schedule</span>
                      <span className="font-semibold text-white">{course.schedule}</span>
                    </div>
                  </div>

                  {/* Key Benefits Checklist */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Program Highlights:</h4>
                    {course.keyBenefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-[#66FCF1] flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setActiveTimetableCourse(course)}
                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] font-heading font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Calendar className="w-4 h-4 text-[#66FCF1]" />
                    <span>View Batch Timetable</span>
                  </button>

                  <button
                    onClick={() => onOpenDemoForCourse(course.title)}
                    className="flex-1 py-3 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-2 glow-cyan-sm hover:scale-105 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Book Free Demo Seat</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timetable Modal */}
      {activeTimetableCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg bg-[#1F2833] border-2 border-[#66FCF1]/50 rounded-2xl p-6 shadow-[0_0_50px_rgba(102,252,241,0.25)] space-y-6 relative">
            <button
              onClick={() => setActiveTimetableCourse(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[#66FCF1] text-[10px] font-mono font-bold uppercase tracking-wider">
                {activeTimetableCourse.gradeLevel} • Weekly Schedule
              </span>
              <h3 className="text-xl font-heading font-bold text-white">
                {activeTimetableCourse.title}
              </h3>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-gray-400 uppercase">Available Batch Timetable Slots:</h4>
              
              {activeTimetableCourse.timetable?.map((slot, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#66FCF1]">{slot.batchType}</span>
                    <span className="text-[10px] font-mono text-gray-400">{slot.roomOrLink}</span>
                  </div>
                  <div className="text-xs text-white font-mono flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#66FCF1]" />
                    <span><strong>{slot.days}:</strong> {slot.time}</span>
                  </div>
                </div>
              )) || (
                <p className="text-xs text-gray-400">{activeTimetableCourse.schedule}</p>
              )}
            </div>

            {/* Fee Note */}
            {activeTimetableCourse.price && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 font-mono space-y-1">
                <span className="block font-bold">Tuition Fee: {activeTimetableCourse.price.monthly}</span>
                <span className="block text-[10px] text-gray-300">{activeTimetableCourse.price.scholarshipDiscount}</span>
              </div>
            )}

            <button
              onClick={() => {
                const title = activeTimetableCourse.title;
                setActiveTimetableCourse(null);
                onOpenDemoForCourse(title);
              }}
              className="w-full py-3 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center gap-2 glow-cyan-sm hover:scale-102 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reserve Seat for this Batch</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
