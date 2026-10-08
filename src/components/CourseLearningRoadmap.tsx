import React, { useState } from 'react';
import { Course } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  Sparkles, 
  Compass, 
  Clock, 
  Award, 
  FileText, 
  BarChart3, 
  ChevronRight,
  Flame
} from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  stage: string;
  weeks: string;
  status: 'completed' | 'current' | 'upcoming';
  progressPct: number;
  summary: string;
  keyDeliverables: string[];
  focusTopic: string;
  cx: number;
  cy: number;
}

interface CourseLearningRoadmapProps {
  course: Course;
}

export const CourseLearningRoadmap: React.FC<CourseLearningRoadmapProps> = ({ course }) => {
  const [activeMilestoneId, setActiveMilestoneId] = useState<number>(3); // Milestone 3 is current by default

  const milestones: Milestone[] = [
    {
      id: 1,
      title: 'Diagnostic Baseline & Gap Audit',
      stage: 'Phase 1: Diagnosis',
      weeks: 'Weeks 1 - 2',
      status: 'completed',
      progressPct: 100,
      summary: 'Comprehensive 90-minute adaptive test measuring foundational concept retention and calculation bottlenecks.',
      keyDeliverables: ['Personalized Strength/Weakness Matrix', 'Target Score Projection', 'Curated Batch Placement'],
      focusTopic: 'Baseline assessment across previous grade fundamentals',
      cx: 70,
      cy: 140
    },
    {
      id: 2,
      title: 'Core Conceptual Architecture',
      stage: 'Phase 2: Mastery',
      weeks: 'Weeks 3 - 8',
      status: 'completed',
      progressPct: 100,
      summary: 'Deep conceptual breakdown of core theorems and laws utilizing 3D visualization and real-world experiments.',
      keyDeliverables: ['Formula Derivation Journal', '3D Model Visualizations', 'Weekly Rapid Recall Quizzes'],
      focusTopic: `${course.subjects[0]} & ${course.subjects[1] || 'Applied Science'} Core Principles`,
      cx: 210,
      cy: 70
    },
    {
      id: 3,
      title: 'Numerical Velocity & Trap Solving',
      stage: 'Phase 3: Application',
      weeks: 'Weeks 9 - 14',
      status: 'current',
      progressPct: 65,
      summary: 'Intensive application sprints focusing on multi-concept questions, time traps, and speed calculation shortcuts.',
      keyDeliverables: ['Level 1-3 Graded Problem Sets', 'Error Log Review', '2-Minute Numerical Drills'],
      focusTopic: 'High-Weightage Application Modules',
      cx: 370,
      cy: 160
    },
    {
      id: 4,
      title: 'PYQ & Step-Marking Precision',
      stage: 'Phase 4: Board Rigor',
      weeks: 'Weeks 15 - 20',
      status: 'upcoming',
      progressPct: 0,
      summary: 'Auditing 10-year past papers with official examiner answer keys to eliminate step-marking deductions.',
      keyDeliverables: ['10-Year Chapterwise PYQ Solved', 'Examiner Step-Marking Guidelines', 'Diagram Perfection Drills'],
      focusTopic: 'Strict Board Criteria & Answer Presentation',
      cx: 530,
      cy: 65
    },
    {
      id: 5,
      title: 'Full-Length Simulation Mocks',
      stage: 'Phase 5: Simulation',
      weeks: 'Weeks 21 - 24',
      status: 'upcoming',
      progressPct: 0,
      summary: 'Three complete timed simulation exams under real test hall conditions with AI score diagnostics.',
      keyDeliverables: ['3 Complete Mock Audits', 'Time-per-Question Heatmap', 'Panic-Resistant Exam Strategy'],
      focusTopic: 'Full Syllabus Board & Entrance Simulators',
      cx: 670,
      cy: 140
    },
    {
      id: 6,
      title: 'Elite Distinction Sprint',
      stage: 'Phase 6: Pinnacle',
      weeks: 'Weeks 25 - 28',
      status: 'upcoming',
      progressPct: 0,
      summary: 'Final high-yield formula consolidation, 1-on-1 doubt resolution, and psychological peak performance readiness.',
      keyDeliverables: ['1-Page Cheat Sheet Summaries', 'High-Yield Formula Compendium', 'Final 98%+ Distinction Lock'],
      focusTopic: 'Final Ranker Revision & Confidence Polish',
      cx: 790,
      cy: 80
    }
  ];

  const activeMilestone = milestones.find((m) => m.id === activeMilestoneId) || milestones[2];

  // SVG Bezier curved path through the milestones
  const svgPathD = "M 70 140 C 140 140, 150 70, 210 70 C 280 70, 300 160, 370 160 C 440 160, 460 65, 530 65 C 600 65, 610 140, 670 140 C 730 140, 740 80, 790 80";

  return (
    <div className="rounded-2xl bg-black/40 border border-[#66FCF1]/20 p-5 sm:p-6 space-y-5">
      
      {/* Header with Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#66FCF1]/10 text-[#66FCF1] border border-[#66FCF1]/30">
              <Compass className="w-4 h-4" />
            </span>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-white">
              Student Learning Roadmap & Milestones
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Structured 28-week progression engineered for {course.title} ({course.gradeLevel})
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <div className="text-right">
            <span className="text-[10px] text-gray-400 block font-mono">Cohort Velocity</span>
            <span className="text-xs font-bold text-[#66FCF1]">Milestone 3 of 6 (65%)</span>
          </div>
        </div>
      </div>

      {/* Interactive Responsive SVG Timeline Canvas */}
      <div className="relative w-full overflow-x-auto py-2">
        <div className="min-w-[700px] select-none">
          <svg
            viewBox="0 0 860 220"
            className="w-full h-auto overflow-visible"
            aria-label="Student Learning Journey SVG Roadmap"
          >
            <defs>
              <linearGradient id="roadmapGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#45A29E" />
                <stop offset="45%" stopColor="#66FCF1" />
                <stop offset="70%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Track Guide */}
            <path
              d={svgPathD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Active Completed Gradient Path up to Milestone 3 */}
            <path
              d="M 70 140 C 140 140, 150 70, 210 70 C 280 70, 300 160, 370 160"
              fill="none"
              stroke="url(#roadmapGrad)"
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#glow)"
            />

            {/* Animated Dashed Forward Line */}
            <path
              d="M 370 160 C 440 160, 460 65, 530 65 C 600 65, 610 140, 670 140 C 730 140, 740 80, 790 80"
              fill="none"
              stroke="#66FCF1"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="opacity-40"
            />

            {/* Render Nodes along the SVG path */}
            {milestones.map((m) => {
              const isSelected = m.id === activeMilestoneId;
              const isCompleted = m.status === 'completed';
              const isCurrent = m.status === 'current';

              return (
                <g 
                  key={m.id} 
                  className="cursor-pointer transition-transform duration-300"
                  onClick={() => setActiveMilestoneId(m.id)}
                >
                  {/* Outer Pulsing Ring for Selected / Current */}
                  {(isSelected || isCurrent) && (
                    <circle
                      cx={m.cx}
                      cy={m.cy}
                      r="24"
                      fill="none"
                      stroke={isCompleted ? "#66FCF1" : isCurrent ? "#45A29E" : "#F59E0B"}
                      strokeWidth="2"
                      strokeDasharray="4 3"
                      className="animate-spin-slow opacity-80"
                      style={{ transformOrigin: `${m.cx}px ${m.cy}px` }}
                    />
                  )}

                  {/* Main Milestone Bubble */}
                  <circle
                    cx={m.cx}
                    cy={m.cy}
                    r={isSelected ? "18" : "15"}
                    fill={
                      isCompleted 
                        ? "#66FCF1" 
                        : isCurrent 
                        ? "#0F172A" 
                        : "#1E293B"
                    }
                    stroke={
                      isCompleted 
                        ? "#45A29E" 
                        : isCurrent 
                        ? "#66FCF1" 
                        : "rgba(255, 255, 255, 0.25)"
                    }
                    strokeWidth={isCurrent ? "3" : "2"}
                    filter={isSelected ? "url(#glow)" : undefined}
                  />

                  {/* Icon / Number in Node */}
                  <text
                    x={m.cx}
                    y={m.cy + 4}
                    textAnchor="middle"
                    fill={isCompleted ? "#070A12" : "#FFFFFF"}
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {isCompleted ? "✓" : m.id}
                  </text>

                  {/* Label Text below/above node */}
                  <text
                    x={m.cx}
                    y={m.cy > 100 ? m.cy + 28 : m.cy - 22}
                    textAnchor="middle"
                    fill={isSelected ? "#66FCF1" : isCompleted ? "#E2E8F0" : "#94A3B8"}
                    fontSize="11"
                    fontWeight={isSelected ? "bold" : "600"}
                  >
                    M{m.id}: {m.weeks}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Active Milestone Card Inspector */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40">
                {activeMilestone.stage}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {activeMilestone.weeks}
              </span>
            </div>
            <h4 className="text-base font-heading font-bold text-white mt-1">
              Milestone {activeMilestone.id}: {activeMilestone.title}
            </h4>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className={`px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5 ${
              activeMilestone.status === 'completed'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : activeMilestone.status === 'current'
                ? 'bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40 animate-pulse'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}>
              {activeMilestone.status === 'completed' ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mastered & Certified</span>
                </>
              ) : activeMilestone.status === 'current' ? (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Active Sprint ({activeMilestone.progressPct}%)</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Locked Milestone</span>
                </>
              )}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed">
          {activeMilestone.summary}
        </p>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {activeMilestone.keyDeliverables.map((item, idx) => (
            <div 
              key={idx}
              className="p-2.5 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-200 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#66FCF1] flex-shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
