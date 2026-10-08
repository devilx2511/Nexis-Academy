import React from 'react';
import { Sparkles, ShieldCheck, Users, Target, BookOpen, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface AboutPageProps {
  onOpenDemoModal: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenDemoModal, onNavigate }) => {
  return (
    <div className="pt-24 pb-20 bg-[#0B0C10] text-white min-h-screen space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs 
          items={[{ name: 'About Us', route: 'about' }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
          Academic Vision & Pedagogy
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white max-w-4xl mx-auto leading-tight">
          Pioneering a Tech-Driven, Concept-First Educational Ecosystem
        </h1>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
          Nexis Academy was founded with a singular purpose: to bridge the gap between rote memorization and true conceptual mastery.
        </p>
      </div>

      {/* Core Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="seo-3d-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#66FCF1]/20 text-[#66FCF1] flex items-center justify-center border border-[#66FCF1]/40 glow-cyan-sm">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-white">Our Mission</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              To empower every student with structured academic frameworks, small batch attention, and interactive 3D visual tools that make complex science and mathematics intuitive, engaging, and stress-free.
            </p>
          </div>

          <div className="seo-3d-card p-8 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#45A29E]/20 text-[#45A29E] flex items-center justify-center border border-[#45A29E]/40 glow-indigo-lg">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-white">Our Vision</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              To build a nationally recognized education brand where academic excellence, digital analytical tracking, and compassionate mentorship converge to shape resilient, confident problem solvers.
            </p>
          </div>
        </div>
      </div>

      {/* The 4 Pillars of Nexis Pedagogy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-heading font-bold text-white">The Nexis Educational Framework</h2>
          <p className="text-gray-300 text-sm">Four interconnected pillars that guarantee measurable progress.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Small Batches (1:10)", desc: "Strictly limited student intake so every question is answered in real-time." },
            { title: "3D Visual Models", desc: "Spatial physics and chemistry reaction mechanics rendered in interactive 3D." },
            { title: "Bi-Weekly Diagnostics", desc: "Regular testing to eliminate concept backlogs before school examinations." },
            { title: "Daily 1-on-1 Desk", desc: "Dedicated faculty desk hours for customized homework and numerical support." }
          ].map((pil, i) => (
            <div key={i} className="seo-3d-card p-6 space-y-3">
              <div className="text-2xl font-heading font-extrabold text-[#66FCF1]">0{i + 1}</div>
              <h3 className="text-lg font-heading font-bold text-white">{pil.title}</h3>
              <p className="text-gray-300 text-xs leading-relaxed">{pil.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#1F2833] via-black to-[#1F2833] border border-[#66FCF1]/30 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
            Experience the Nexis Learning Environment Firsthand
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Book a free 1-on-1 demo class with our subject faculty and receive an instant diagnostic evaluation of your child's current academic standing.
          </p>
          <button
            onClick={onOpenDemoModal}
            className="px-8 py-3.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-sm hover:bg-[#66FCF1]/90 transition-all inline-flex items-center gap-2 glow-cyan-lg"
          >
            <span>Book Your Free Demo Class</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
