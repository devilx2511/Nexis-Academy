import React from 'react';
import { motion } from 'motion/react';
import { NexisLuxuryHero } from '../components/NexisLuxuryHero';
import { Hero3D } from '../components/Hero3D';
import { TrustSection } from '../components/TrustSection';
import { NexisDifferenceMatrix } from '../components/NexisDifferenceMatrix';
import { InteractiveBatchCustomizer } from '../components/InteractiveBatchCustomizer';
import { CoursesSection } from '../components/CoursesSection';
import { DualDashboardPreview } from '../components/DualDashboardPreview';
import { GamificationLeaderboard } from '../components/GamificationLeaderboard';
import { ScoreTransformationBenchmark } from '../components/ScoreTransformationBenchmark';
import { NexisPricingSection } from '../components/NexisPricingSection';
import { WhyNexisSection } from '../components/WhyNexisSection';
import { AcademicRoadmap } from '../components/AcademicRoadmap';
import { HowItWorks } from '../components/HowItWorks';
import { FacultySection } from '../components/FacultySection';
import { ResultsSection } from '../components/ResultsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { LeadGenBanner } from '../components/LeadGenBanner';
import { Course, PageRoute } from '../types';

interface HomePageProps {
  onOpenDemoModal: () => void;
  onOpenDemoForCourse: (subjectName: string) => void;
  onOpenWhatsApp: () => void;
  onNavigate: (route: PageRoute) => void;
  onSelectCourse: (course: Course) => void;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

export const HomePage: React.FC<HomePageProps> = ({
  onOpenDemoModal,
  onOpenDemoForCourse,
  onOpenWhatsApp,
  onNavigate,
  onSelectCourse
}) => {
  return (
    <div className="space-y-0 overflow-hidden">
      
      {/* 1. Master Luxury Hero (Split View with Auto-Suggest Dock & Live Classroom) */}
      <NexisLuxuryHero
        onOpenDemoModal={onOpenDemoModal}
        onNavigate={onNavigate}
        onSelectCourse={onSelectCourse}
      />

      {/* 2. Trust & Accreditations Strip */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <TrustSection />
      </motion.div>

      {/* 3. The Nexis Difference: 4 Interactive Pillars */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <NexisDifferenceMatrix
          onOpenDemoModal={onOpenDemoModal}
          onNavigate={onNavigate}
        />
      </motion.div>

      {/* 4. Interactive Course & Batch Customizer */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <InteractiveBatchCustomizer
          onOpenDemoForCourse={onOpenDemoForCourse}
          onNavigate={onNavigate}
        />
      </motion.div>

      {/* 5. Curriculum & Structured Programs */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <CoursesSection
          onSelectCourse={onSelectCourse}
          onOpenDemoForCourse={onOpenDemoForCourse}
          onNavigate={onNavigate}
        />
      </motion.div>

      {/* 6. Dual Command Center & Parent Oversight Showcase (With Recharts) */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <DualDashboardPreview
          onOpenDemoModal={onOpenDemoModal}
          onNavigate={onNavigate}
        />
      </motion.div>

      {/* 7. Gamification Leaderboard Preview */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="py-12 bg-[#070A12]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-amber-400 text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30">
                Academic Engagement
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mt-2">
                Live Cohort Leaderboard
              </h3>
            </div>
            <button
              onClick={() => onNavigate('portal')}
              className="text-xs font-mono font-bold text-[#66FCF1] hover:underline"
            >
              Open Full Leaderboard in Student Portal →
            </button>
          </div>
          <GamificationLeaderboard />
        </div>
      </motion.div>

      {/* 8. Interactive Score Transformation Simulator */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <ScoreTransformationBenchmark
          onOpenDemoModal={onOpenDemoModal}
          onNavigate={onNavigate}
        />
      </motion.div>

      {/* 9. High-Converting Pricing Tiers */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <NexisPricingSection
          onOpenDemoModal={onOpenDemoModal}
          onNavigate={onNavigate}
        />
      </motion.div>

      {/* 10. Interactive 3D Subject Concept Visualizer Engine */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <Hero3D onOpenDemoModal={onOpenDemoModal} onNavigate={onNavigate} />
      </motion.div>

      {/* 11. Faculty Directory */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <FacultySection
          onOpenDemoForSubject={onOpenDemoForCourse}
          onNavigate={onNavigate}
        />
      </motion.div>

      {/* 12. Academic Roadmap */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <AcademicRoadmap
          onOpenDemoModal={onOpenDemoForCourse}
          onNavigate={onNavigate}
        />
      </motion.div>

      {/* 13. How It Works */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <HowItWorks onOpenDemoModal={onOpenDemoModal} />
      </motion.div>

      {/* 14. Academic Results & Hall of Fame */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <ResultsSection onNavigate={onNavigate} />
      </motion.div>

      {/* 15. Student & Parent Testimonials */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <TestimonialsSection onNavigate={onNavigate} />
      </motion.div>

      {/* 16. Frequently Asked Questions */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <FAQSection />
      </motion.div>

      {/* 17. Final Lead Generation Banner */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <LeadGenBanner onOpenDemoModal={onOpenDemoModal} onOpenWhatsApp={onOpenWhatsApp} />
      </motion.div>

    </div>
  );
};
