import React, { useState } from 'react';
import { useBranding } from '../context/BrandingContext';

interface NexisLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  customText?: string;
  customSubtext?: string;
}

export const NexisLogo: React.FC<NexisLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  customText,
  customSubtext,
}) => {
  const { branding } = useBranding();
  const [imageError, setImageError] = useState(false);

  const dimensions = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', subtext: 'text-[9px] tracking-[0.25em]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', subtext: 'text-[10px] tracking-[0.3em]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', subtext: 'text-xs tracking-[0.35em]' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl', subtext: 'text-sm tracking-[0.4em]' }
  };

  const current = dimensions[size] || dimensions.md;

  const shapeStyles = {
    rounded: 'rounded-xl',
    circle: 'rounded-full',
    square: 'rounded-none',
    transparent: 'rounded-lg bg-transparent'
  };

  const currentShape = shapeStyles[branding.logoShape] || 'rounded-xl';
  const scaleStyle = branding.logoScale && branding.logoScale !== 100 
    ? { transform: `scale(${branding.logoScale / 100})` } 
    : undefined;

  const siteTitle = customText || branding.siteTitle || 'NEXIS';
  const siteSubtitle = customSubtext || (branding.showTagline ? branding.siteSubtitle || 'ACADEMY' : '');
  const glowColor = branding.glowColor || '#66FCF1';

  // Render Custom Uploaded Image Logo if configured and valid
  const isCustomImage = branding.logoType === 'custom_image' && branding.customLogoUrl && !imageError;

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Logo Icon / Symbol Container */}
      <div 
        className={`relative ${current.icon} flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
        style={scaleStyle}
      >
        {isCustomImage ? (
          <div 
            className={`w-full h-full overflow-hidden flex items-center justify-center ${
              branding.logoShape === 'transparent' ? '' : `${currentShape} bg-white/5 border border-white/10 p-0.5`
            }`}
            style={{
              boxShadow: `0 0 12px ${glowColor}40`
            }}
          >
            <img
              src={branding.customLogoUrl}
              alt={siteTitle}
              className={`w-full h-full object-contain ${currentShape}`}
              onError={() => setImageError(true)}
              loading="eager"
            />
          </div>
        ) : (
          /* Default 3D Geometric Node "N" Symbol */
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full"
            style={{ filter: `drop-shadow(0 0 8px ${glowColor}80)` }}
          >
            <defs>
              <linearGradient id="logo-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={glowColor} />
                <stop offset="50%" stopColor="#45A29E" />
                <stop offset="100%" stopColor="#0077FF" />
              </linearGradient>
            </defs>
            {/* N strokes */}
            <path 
              d="M 20 80 L 20 20 L 80 80 L 80 20" 
              fill="none" 
              stroke="url(#logo-cyan-grad)" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            <path 
              d="M 20 80 L 45 50 L 80 80" 
              fill="none" 
              stroke={glowColor} 
              strokeWidth="5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              opacity="0.8" 
            />
            
            {/* Nodes */}
            <circle cx="20" cy="20" r="6" fill={glowColor} />
            <circle cx="20" cy="80" r="6" fill={glowColor} />
            <circle cx="45" cy="50" r="5" fill="#45A29E" />
            <circle cx="80" cy="80" r="6" fill="#0088FF" />
            <circle cx="80" cy="20" r="6" fill={glowColor} />
          </svg>
        )}
      </div>

      {/* Typography / Branding Name */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`font-heading font-extrabold ${current.text} tracking-wider text-white flex items-center`}>
            {siteTitle.toUpperCase() === 'NEXIS' ? (
              <>
                NE<span style={{ color: glowColor, textShadow: `0 0 10px ${glowColor}` }}>X</span>IS
              </>
            ) : (
              <span>{siteTitle}</span>
            )}
          </div>
          {siteSubtitle && (
            <div 
              className={`font-heading font-bold uppercase ${current.subtext} mt-0.5`}
              style={{ color: `${glowColor}E6` }}
            >
              {siteSubtitle}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
