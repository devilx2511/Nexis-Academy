import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (scrollProgress <= 0.5) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      {/* Background track indicator */}
      <div 
        className="h-full bg-gradient-to-r from-[#6366F1] via-[#66FCF1] to-[#F59E0B] shadow-[0_0_12px_rgba(102,252,241,0.8)] transition-all duration-100 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Glowing Head Bead */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#66FCF1,0_0_18px_#66FCF1] ring-2 ring-[#66FCF1]/60 transform translate-x-1" />
      </div>
    </div>
  );
};
