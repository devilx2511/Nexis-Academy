import React, { useState, useEffect } from 'react';
import { Sparkles, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { NexisLogo } from './NexisLogo';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  targetName?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  targetName = "Nexis Academy Home"
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStepText, setCurrentStepText] = useState("Initializing Nexis Gateway...");

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 300);
          return 100;
        }
        
        const next = prev + Math.floor(Math.random() * 8) + 4;
        
        if (next < 25) {
          setCurrentStepText("Initializing Nexis Opening Gateway...");
        } else if (next < 55) {
          setCurrentStepText("Loading 3D Spatial Geometry & Visual Assets...");
        } else if (next < 85) {
          setCurrentStepText("Configuring Academic Modules & Student Analytics...");
        } else {
          setCurrentStepText(`Opening ${targetName}...`);
        }
        
        return Math.min(next, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onLoadingComplete, targetName]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0C10] flex flex-col items-center justify-center p-6 bg-grid-pattern select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#66FCF1]/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#45A29E]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center text-center space-y-8">
        
        {/* Futuristic 3D Orbit Ring around Logo */}
        <div className="relative flex items-center justify-center w-32 h-32">
          {/* Outer Rotating Cyan Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#66FCF1]/40 animate-spin" style={{ animationDuration: '10s' }} />
          
          {/* Reverse Orbit Teal Ring */}
          <div className="absolute inset-2 rounded-full border border-t-2 border-t-[#66FCF1] border-r-transparent border-b-[#45A29E] border-l-transparent animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
          
          {/* Inner Glowing Orb */}
          <div className="w-20 h-20 rounded-2xl bg-[#1F2833]/90 border border-[#66FCF1]/50 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(102,252,241,0.3)]">
            <NexisLogo size="md" showText={false} />
          </div>
        </div>

        {/* Title & Status */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20 text-[#66FCF1] text-xs font-mono font-semibold tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5 text-[#66FCF1] animate-pulse" />
            <span>Transition Protocol</span>
          </div>
          <h2 className="text-2xl font-heading font-extrabold text-white tracking-tight">
            Entering {targetName}
          </h2>
          <p className="text-xs text-gray-400 font-mono h-5 flex items-center justify-center gap-1.5">
            <Zap className="w-3 h-3 text-[#66FCF1]" />
            <span>{currentStepText}</span>
          </p>
        </div>

        {/* Cyber Progress Bar */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#66FCF1]" />
              SYSTEM LOAD
            </span>
            <span className="text-[#66FCF1] font-bold text-sm">{progress}%</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-white/5 border border-white/10 p-0.5 overflow-hidden backdrop-blur-md">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-[#45A29E] via-[#66FCF1] to-white transition-all duration-150 ease-out shadow-[0_0_12px_rgba(102,252,241,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick Skip Button */}
        <button
          onClick={onLoadingComplete}
          className="text-[11px] font-mono text-gray-500 hover:text-[#66FCF1] transition-colors underline cursor-pointer"
        >
          Skip animation & proceed immediately →
        </button>
      </div>
    </div>
  );
};
