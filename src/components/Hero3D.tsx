import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Users, 
  Zap, 
  Activity, 
  ShieldCheck,
  Brain,
  Atom,
  Clock,
  Compass
} from 'lucide-react';
import { PageRoute } from '../types';

interface Hero3DProps {
  onOpenDemoModal: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onOpenDemoModal, onNavigate }) => {
  const [activeSubject, setActiveSubject] = useState<'math' | 'physics' | 'chem' | 'bio'>('physics');
  const [waveFrequency, setWaveFrequency] = useState<number>(2.5);
  const [interactiveParam, setInteractiveParam] = useState<number>(85);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Subject Visualizer Data
  const subjectData = {
    physics: {
      name: "Electromagnetism & Waves",
      grade: "Class 10-12 Physics",
      formula: "E = hν  •  c = fλ  •  B = μ₀I / (2πr)",
      concept: "Wave Interference & Magnetic Flux",
      mastery: "98.4%",
      metricLabel: "Diagnostic Accuracy",
      badge: "IIT-JEE / Board Core"
    },
    math: {
      name: "Calculus & Geometry",
      grade: "Class 9-12 Mathematics",
      formula: "f'(x) = lim[h→0] (f(x+h) - f(x))/h",
      concept: "Parabolic Tangents & Optimization",
      mastery: "96.8%",
      metricLabel: "Problem Velocity",
      badge: "99+ Percentile Track"
    },
    chem: {
      name: "Organic & Physical Chemistry",
      grade: "Class 10-12 Chemistry",
      formula: "PV = nRT  •  ΔG = ΔH - TΔS",
      concept: "Orbital Hybridization & Kinetics",
      mastery: "95.2%",
      metricLabel: "Reaction Balancing",
      badge: "NCERT Step Mastery"
    },
    bio: {
      name: "Genetics & Cellular Physiology",
      grade: "Class 9-12 NEET Biology",
      formula: "DNA → mRNA → Polypeptide Enzyme",
      concept: "Chromosomal Inheritance & Osmosis",
      mastery: "99.1%",
      metricLabel: "Line-by-Line Retention",
      badge: "680+ Medical Sprint"
    }
  };

  // Interactive Background Particle & Quantum Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1.5,
      color: Math.random() > 0.4 ? '#66FCF1' : '#45A29E'
    }));

    let step = 0;

    const render = () => {
      step += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw Subject-Specific Dynamic Visual Simulation in center
      const centerX = width / 2;
      const centerY = height / 2;

      if (activeSubject === 'physics') {
        // Dynamic Wave Simulation
        ctx.beginPath();
        ctx.strokeStyle = '#66FCF1';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#66FCF1';
        ctx.shadowBlur = 12;
        for (let x = 20; x < width - 20; x += 3) {
          const y = centerY + Math.sin(x * 0.03 * waveFrequency + step) * 35 * (interactiveParam / 100);
          if (x === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Secondary Harmonic Wave
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(69, 162, 158, 0.6)';
        ctx.lineWidth = 1.5;
        for (let x = 20; x < width - 20; x += 4) {
          const y = centerY + Math.cos(x * 0.05 * waveFrequency - step * 1.2) * 22;
          if (x === 20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (activeSubject === 'chem') {
        // 3D Atomic Bohr Orbital Rings
        ctx.save();
        ctx.translate(centerX, centerY);

        // Core Nucleus
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#66FCF1';
        ctx.shadowColor = '#66FCF1';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Orbital Ring 1
        ctx.beginPath();
        ctx.ellipse(0, 0, 70, 24, step, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(102, 252, 241, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Electron 1
        const e1X = Math.cos(step * 2) * 70;
        const e1Y = Math.sin(step * 2) * 24;
        ctx.beginPath();
        ctx.arc(e1X, e1Y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Orbital Ring 2
        ctx.beginPath();
        ctx.ellipse(0, 0, 70, 24, -step * 0.8 + 1, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(69, 162, 158, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore();
      } else if (activeSubject === 'math') {
        // Coordinate axes & Parabolic curve
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(30, centerY);
        ctx.lineTo(width - 30, centerY);
        ctx.moveTo(centerX, 20);
        ctx.lineTo(centerX, height - 20);
        ctx.stroke();

        // Parabola Curve
        ctx.beginPath();
        ctx.strokeStyle = '#66FCF1';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#66FCF1';
        ctx.shadowBlur = 10;
        for (let px = -120; px <= 120; px += 3) {
          const py = - (px * px) * 0.006 * (interactiveParam / 60) + 40;
          const drawX = centerX + px;
          const drawY = centerY + py;
          if (px === -120) ctx.moveTo(drawX, drawY);
          else ctx.lineTo(drawX, drawY);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        // Bio DNA Double Helix
        ctx.lineWidth = 1.8;
        for (let x = 30; x < width - 30; x += 14) {
          const y1 = centerY + Math.sin(x * 0.04 + step) * 30;
          const y2 = centerY - Math.sin(x * 0.04 + step) * 30;

          // Rung
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();

          // Strands
          ctx.fillStyle = '#66FCF1';
          ctx.beginPath();
          ctx.arc(x, y1, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#45A29E';
          ctx.beginPath();
          ctx.arc(x, y2, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Constellation background particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 75) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(102, 252, 241, 0.12)';
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSubject, waveFrequency, interactiveParam]);

  const activeData = subjectData[activeSubject];

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-radial-mesh">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#66FCF1]/12 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#45A29E]/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top High-Impact Live Batch Ticker */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#1F2833]/90 border border-[#66FCF1]/40 backdrop-blur-xl shadow-[0_0_20px_rgba(102,252,241,0.2)] text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[#66FCF1] font-bold">2026 ADMISSIONS OPEN</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-200">Micro-Batches strictly capped at 8-10 students</span>
          <span className="hidden sm:inline text-[#45A29E] font-semibold">| 82% Seats Allocated</span>
        </div>

        {/* Hero Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column - Conversion Copy & Proof */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Main Headline with High-Contrast Gradient Typography */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-black text-white leading-[1.08] tracking-tight">
              Master Science & Math Through{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#66FCF1] to-[#45A29E] drop-shadow-[0_0_35px_rgba(102,252,241,0.5)]">
                First-Principles
              </span>{' '}
              Learning
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-sans font-normal">
              Nexis Academy replaces rote memorization with <strong className="text-white">3D visual concept modeling</strong>, small capped <strong className="text-[#66FCF1]">1:10 micro-batches</strong>, and daily 1-on-1 doubt resolution for Classes 8–12 (CBSE, ICSE, JEE & NEET).
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="button"
                onClick={onOpenDemoModal}
                className="px-8 py-4 rounded-2xl bg-[#66FCF1] text-[#0B0C10] font-heading font-black text-base hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(102,252,241,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Book Free 1-on-1 Demo Class</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('courses')}
                className="px-7 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#66FCF1]/50 text-white font-heading font-bold text-base transition-all flex items-center justify-center gap-2.5 backdrop-blur-xl cursor-pointer"
              >
                <span>Explore All Courses</span>
                <BookOpen className="w-4 h-4 text-[#66FCF1]" />
              </button>
            </div>

            {/* 3 Metric Pills */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-[#66FCF1] tracking-tight">1 : 10</div>
                <div className="text-xs text-gray-400 font-mono mt-0.5">Strict Batch Cap</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight">+28.4%</div>
                <div className="text-xs text-gray-400 font-mono mt-0.5">Avg Score Leap</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-[#45A29E] tracking-tight">&lt; 4 min</div>
                <div className="text-xs text-gray-400 font-mono mt-0.5">Doubt Desk Speed</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Quantum Concept Visualizer Pod */}
          <div className="lg:col-span-5">
            <div className="seo-3d-card p-6 sm:p-7 border-2 border-[#66FCF1]/40 bg-[#0B0C10]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] space-y-5 relative overflow-hidden">
              
              {/* Corner Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#66FCF1]/20 rounded-full blur-[50px] pointer-events-none" />

              {/* Simulation Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#66FCF1]/20 border border-[#66FCF1]/50 flex items-center justify-center text-[#66FCF1]">
                    <Atom className="w-4 h-4 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-sm text-white">Spatial Concept Engine</h3>
                    <p className="text-[10px] font-mono text-gray-400">Interactive First-Principles Simulation</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 text-[10px] font-mono font-extrabold uppercase rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Engine
                </span>
              </div>

              {/* Subject Tabs */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-black/60 border border-white/15 text-[11px] font-mono">
                {[
                  { id: 'physics', label: 'Physics', icon: Zap },
                  { id: 'math', label: 'Maths', icon: Compass },
                  { id: 'chem', label: 'Chem', icon: Atom },
                  { id: 'bio', label: 'Bio', icon: Brain }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = activeSubject === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveSubject(tab.id as any)}
                      className={`py-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_12px_rgba(102,252,241,0.4)]' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Live Canvas Simulation Area */}
              <div className="relative h-48 w-full rounded-2xl bg-black/80 border border-white/10 overflow-hidden flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* Overlaid Formula Ribbon */}
                <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-400 truncate">{activeData.formula}</span>
                  <span className="text-[#66FCF1] font-bold shrink-0 ml-2">{activeData.badge}</span>
                </div>
              </div>

              {/* Interactive Controls & Concept Details */}
              <div className="space-y-3 p-4 rounded-2xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-mono block">Active Module</span>
                    <span className="font-heading font-bold text-white text-sm">{activeData.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 text-[10px] uppercase font-mono block">{activeData.metricLabel}</span>
                    <span className="font-heading font-black text-[#66FCF1] text-base">{activeData.mastery}</span>
                  </div>
                </div>

                {/* Interactive Slider */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-gray-400">
                    <span>Concept Depth / Frequency Parameter</span>
                    <span className="text-[#66FCF1] font-bold">{waveFrequency.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.1"
                    value={waveFrequency}
                    onChange={(e) => setWaveFrequency(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-black/80 rounded-lg appearance-none cursor-pointer accent-[#66FCF1]"
                  />
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={onOpenDemoModal}
                className="w-full py-3.5 rounded-xl bg-[#1F2833] hover:bg-[#66FCF1] hover:text-[#0B0C10] border border-[#66FCF1]/50 text-white font-heading font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(102,252,241,0.2)] cursor-pointer"
              >
                <span>Experience This Live in a Free Demo Class</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
