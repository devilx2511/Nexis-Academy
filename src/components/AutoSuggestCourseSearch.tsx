import React, { useState, useRef, useEffect } from 'react';
import { Search, X, BookOpen, Sparkles, ArrowRight, CheckCircle2, Users, Clock, Tag } from 'lucide-react';
import { COURSES_DATA } from '../data/academyData';
import { Course } from '../types';

interface AutoSuggestCourseSearchProps {
  onSelectCourse?: (course: Course) => void;
  onOpenDemoForCourse?: (subjectName: string) => void;
  placeholder?: string;
  className?: string;
  dockMode?: boolean;
}

export const AutoSuggestCourseSearch: React.FC<AutoSuggestCourseSearchProps> = ({
  onSelectCourse,
  onOpenDemoForCourse,
  placeholder = 'Search courses, subjects (e.g. Calculus, AP Physics, NEET)...',
  className = '',
  dockMode = false,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular search suggestions when search bar is clicked/focused
  const popularKeywords = [
    'AP Physics',
    'Calculus BC',
    'Class 10 CBSE Math',
    'Organic Chemistry',
    'SAT Math',
    'NEET Biology',
    'Foundation 9th'
  ];

  // Real-time filter logic
  const normalizedQuery = query.trim().toLowerCase();
  const matchingCourses = normalizedQuery === '' 
    ? [] 
    : COURSES_DATA.filter((course) => {
        const inTitle = course.title.toLowerCase().includes(normalizedQuery);
        const inSubjects = course.subjects.some((s) => s.toLowerCase().includes(normalizedQuery));
        const inCategory = course.category.toLowerCase().includes(normalizedQuery);
        const inGrade = course.gradeLevel.toLowerCase().includes(normalizedQuery);
        const inSyllabus = course.syllabusHighlights.some((h) => h.toLowerCase().includes(normalizedQuery));
        return inTitle || inSubjects || inCategory || inGrade || inSyllabus;
      }).slice(0, 6); // Top 6 matching suggestions

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < matchingCourses.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : matchingCourses.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < matchingCourses.length) {
        handleSelectCourse(matchingCourses[selectedIndex]);
      } else if (matchingCourses.length > 0) {
        handleSelectCourse(matchingCourses[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectCourse = (course: Course) => {
    setQuery(course.title);
    setIsOpen(false);
    if (onSelectCourse) {
      onSelectCourse(course);
    }
  };

  const handleSelectKeyword = (kw: string) => {
    setQuery(kw);
    inputRef.current?.focus();
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery('');
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-slate-400">
          <Search className="w-4 h-4 text-[#66FCF1]" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Search courses and subjects"
          className={`w-full pl-10 pr-10 py-3 rounded-xl transition-all duration-200 text-xs sm:text-sm font-medium focus:outline-none ${
            dockMode
              ? 'bg-slate-900/90 text-white placeholder-slate-400 border border-white/15 focus:border-[#66FCF1] focus:ring-1 focus:ring-[#66FCF1]/30'
              : 'bg-black/50 dark:bg-black/50 light:bg-white text-white dark:text-white light:text-slate-900 placeholder-slate-400 border border-white/10 dark:border-white/15 light:border-slate-300 focus:border-[#66FCF1] focus:ring-2 focus:ring-[#66FCF1]/20'
          }`}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Auto-Suggest Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-[#0B0C10]/95 dark:bg-[#0B0C10]/95 light:bg-white border border-white/15 dark:border-white/15 light:border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden animate-fadeIn text-left">
          
          {/* Active Results Found */}
          {matchingCourses.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-1.5 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/10 dark:border-white/10 light:border-slate-100">
                <span>Matching Academic Programs ({matchingCourses.length})</span>
                <span className="text-[#66FCF1]">Real-Time Filter</span>
              </div>

              <div className="divide-y divide-white/5 dark:divide-white/5 light:divide-slate-100 max-h-80 overflow-y-auto">
                {matchingCourses.map((course, idx) => {
                  const isHighlighted = idx === selectedIndex;
                  return (
                    <div
                      key={course.id}
                      onClick={() => handleSelectCourse(course)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3.5 sm:px-4 cursor-pointer transition-all flex items-start justify-between gap-3 ${
                        isHighlighted
                          ? 'bg-gradient-to-r from-[#6366F1]/20 to-[#66FCF1]/10 border-l-4 border-[#66FCF1]'
                          : 'hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-50'
                      }`}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs sm:text-sm font-heading font-bold text-white dark:text-white light:text-slate-900 truncate">
                            {course.title}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#66FCF1]/15 text-[#66FCF1] border border-[#66FCF1]/30">
                            {course.gradeLevel}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-slate-300">
                            {course.category}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-400 truncate">
                          Subjects: {course.subjects.join(', ')} • {course.batchSize}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {onOpenDemoForCourse && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOpen(false);
                              onOpenDemoForCourse(course.title);
                            }}
                            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400 text-amber-300 hover:text-black text-[11px] font-bold border border-amber-400/40 transition-colors"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Demo</span>
                          </button>
                        )}

                        <div className="p-1 rounded-lg bg-white/5 text-[#66FCF1]">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : query.trim() !== '' ? (
            /* No Direct Results */
            <div className="p-6 text-center space-y-3">
              <p className="text-xs text-slate-400">
                No courses directly match <span className="text-white font-semibold">"{query}"</span>.
              </p>
              <div className="text-[11px] text-slate-400">
                Try searching for standard programs:
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {popularKeywords.slice(0, 4).map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => handleSelectKeyword(kw)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#66FCF1]/20 text-slate-300 hover:text-[#66FCF1] border border-white/10 text-[11px] transition-all"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Empty Query: Popular Searches & Categories */
            <div className="p-4 space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Popular Course Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => handleSelectKeyword(kw)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#66FCF1]/15 text-slate-300 hover:text-[#66FCF1] border border-white/10 hover:border-[#66FCF1]/30 text-xs font-medium transition-all flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3 h-3 text-[#66FCF1]" />
                    <span>{kw}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Footer Action */}
          <div className="p-2.5 bg-black/60 dark:bg-black/60 light:bg-slate-50 border-t border-white/10 dark:border-white/10 light:border-slate-100 flex items-center justify-between text-[11px] text-slate-400 px-4">
            <span className="font-mono">Tip: Use ↑ ↓ arrows to navigate</span>
            <span className="text-[#66FCF1] font-semibold">1:10 Micro-Batches Capped</span>
          </div>

        </div>
      )}
    </div>
  );
};
