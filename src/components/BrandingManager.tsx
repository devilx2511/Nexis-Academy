import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Sparkles, 
  RotateCcw, 
  Check, 
  CheckCircle2, 
  Sliders, 
  Eye, 
  Globe, 
  Layers, 
  Palette, 
  Info, 
  ExternalLink,
  ShieldCheck,
  Zap,
  Lock,
  Compass,
  GraduationCap
} from 'lucide-react';
import { useBranding, DEFAULT_BRANDING, BrandingSettings } from '../context/BrandingContext';
import { NexisLogo } from './NexisLogo';

interface BrandingManagerProps {
  onNotifySuccess?: (msg: string) => void;
}

const PRESET_LOGOS = [
  {
    id: 'preset-quantum',
    name: 'Quantum Atom & Helix',
    desc: 'Deep science & advanced physics insignia',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="12" fill="%2366FCF1"/><ellipse cx="50" cy="50" rx="38" ry="14" stroke="%2366FCF1" stroke-width="4" transform="rotate(30 50 50)"/><ellipse cx="50" cy="50" rx="38" ry="14" stroke="%2345A29E" stroke-width="4" transform="rotate(90 50 50)"/><ellipse cx="50" cy="50" rx="38" ry="14" stroke="%230088FF" stroke-width="4" transform="rotate(150 50 50)"/><circle cx="75" cy="35" r="4" fill="%2366FCF1"/></svg>',
    title: 'NEXIS',
    subtitle: 'SCIENCE ACADEMY',
    glowColor: '#66FCF1'
  },
  {
    id: 'preset-crest',
    name: 'Imperial Laurel Crest',
    desc: 'Prestigious academic excellence badge',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><path d="M50 15 L78 28 V52 C78 70 50 86 50 86 C50 86 22 70 22 52 V28 Z" fill="%231F2833" stroke="%23F59E0B" stroke-width="5"/><path d="M50 30 L55 42 L67 43 L58 52 L61 64 L50 58 L39 64 L42 52 L33 43 L45 42 Z" fill="%23F59E0B"/><circle cx="50" cy="50" r="3" fill="%230B0C10"/></svg>',
    title: 'NEXIS',
    subtitle: 'HONORS ACADEMY',
    glowColor: '#F59E0B'
  },
  {
    id: 'preset-cyber',
    name: 'Cybernetic Matrix Core',
    desc: 'Futuristic AI & mathematics geometry',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><polygon points="50,15 82,32 82,68 50,85 18,68 18,32" stroke="%23A855F7" stroke-width="6" fill="%230B0C10"/><polygon points="50,28 70,40 70,60 50,72 30,60 30,40" stroke="%2366FCF1" stroke-width="4"/><circle cx="50" cy="50" r="7" fill="%23A855F7"/></svg>',
    title: 'NEXIS',
    subtitle: 'TECH INSTITUTE',
    glowColor: '#A855F7'
  },
  {
    id: 'preset-emerald',
    name: 'Bio-Vector Hexagon',
    desc: 'Medical & biotechnology research emblem',
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><polygon points="50,12 85,30 85,70 50,88 15,70 15,30" stroke="%2310B981" stroke-width="5" fill="%230B0C10"/><path d="M35 50 Q50 25 65 50 T95 50" stroke="%2366FCF1" stroke-width="4" fill="none"/><path d="M35 50 Q50 75 65 50 T95 50" stroke="%2310B981" stroke-width="4" fill="none"/><circle cx="50" cy="50" r="5" fill="%2310B981"/></svg>',
    title: 'NEXIS',
    subtitle: 'BIO-SCIENCES',
    glowColor: '#10B981'
  }
];

const GLOW_COLORS = [
  { name: 'Cyan Neon (Default)', value: '#66FCF1' },
  { name: 'Emerald Mint', value: '#10B981' },
  { name: 'Amethyst Purple', value: '#A855F7' },
  { name: 'Imperial Gold', value: '#F59E0B' },
  { name: 'Electric Blue', value: '#3B82F6' },
  { name: 'Crimson Rose', value: '#F43F5E' },
  { name: 'Pure Platinum', value: '#E2E8F0' },
];

export const BrandingManager: React.FC<BrandingManagerProps> = ({ onNotifySuccess }) => {
  const { branding, updateBranding, resetBranding, setUploadedLogo, applyPresetLogo } = useBranding();
  
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [previewTab, setPreviewTab] = useState<'navbar' | 'loading' | 'portal' | 'footer'>('navbar');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // File Upload Handler (reads file as Data URL)
  const handleFileUpload = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, SVG, JPG, WEBP, or GIF).');
      return;
    }

    // Read file as base64 Data URL
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setUploadedLogo(result);
        triggerSuccessNotification('Custom logo uploaded & applied across the whole website!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    if (!imageUrlInput.trim()) return;
    setUploadedLogo(imageUrlInput.trim());
    setImageUrlInput('');
    triggerSuccessNotification('External logo URL applied across the whole website!');
  };

  const triggerSuccessNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    if (onNotifySuccess) onNotifySuccess(msg);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-8" id="devmode-branding-manager">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white flex items-center gap-2">
              <Palette className="w-6 h-6 text-[#66FCF1]" />
              <span>Website Branding & Master Logo Manager</span>
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40">
              Live Global Sync
            </span>
          </div>
          <p className="text-xs text-gray-400 font-mono mt-1">
            Upload or configure your institution logo, custom typography, glow colors, and favicon to propagate instantly throughout all pages.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              resetBranding();
              triggerSuccessNotification('Restored default 3D geometric Nexis logo.');
            }}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white text-xs font-mono font-semibold flex items-center gap-2 transition-all cursor-pointer"
            title="Reset to Original Logo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            onClick={() => triggerSuccessNotification('All branding configurations are synchronized!')}
            className="px-4 py-2 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(102,252,241,0.3)] hover:scale-105 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Saved to Whole Site</span>
          </button>
        </div>
      </div>

      {/* Success Toast Banner */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-xl bg-[#66FCF1]/10 border border-[#66FCF1]/40 text-[#66FCF1] text-xs font-mono flex items-center justify-between animate-fade-in shadow-[0_0_20px_rgba(102,252,241,0.2)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#66FCF1]" />
            <span className="font-bold">{saveSuccessMsg}</span>
          </div>
          <span className="text-[10px] text-gray-400">Instantly active across all routes</span>
        </div>
      )}

      {/* Main Grid: Upload & Controls Left / Multi-Surface Live Previews Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: LOGO UPLOAD & CONFIGURATION CONTROLS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SECTION 1: ADD / UPLOAD LOGO */}
          <div className="seo-3d-card p-6 space-y-5 border border-[#66FCF1]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#66FCF1]/20 flex items-center justify-center text-[#66FCF1]">
                  <Upload className="w-4 h-4" />
                </div>
                <h2 className="font-heading font-extrabold text-white text-base">
                  1. Upload Custom Website Logo
                </h2>
              </div>
              <span className="text-[10px] font-mono text-gray-400">PNG, SVG, JPG, WEBP, GIF</span>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center space-y-3 group ${
                isDragOver
                  ? 'bg-[#66FCF1]/10 border-[#66FCF1] scale-[1.01]'
                  : branding.logoType === 'custom_image' && branding.customLogoUrl
                  ? 'bg-[#1F2833]/80 border-[#66FCF1]/50 hover:border-[#66FCF1]'
                  : 'bg-black/40 border-white/20 hover:border-[#66FCF1]/50 hover:bg-white/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              {branding.logoType === 'custom_image' && branding.customLogoUrl ? (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-20 h-20 rounded-2xl bg-black/60 border border-[#66FCF1]/50 p-2 flex items-center justify-center shadow-[0_0_20px_rgba(102,252,241,0.3)]">
                    <img
                      src={branding.customLogoUrl}
                      alt="Current Custom Logo"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-[#66FCF1] transition-colors flex items-center justify-center gap-1.5">
                      <span>Custom Logo is Active</span>
                      <Check className="w-4 h-4 text-[#66FCF1]" />
                    </div>
                    <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                      Click or drag a new image file to replace this logo
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-[#66FCF1]/20 border border-white/10 group-hover:border-[#66FCF1]/40 flex items-center justify-center text-gray-400 group-hover:text-[#66FCF1] transition-all">
                    <ImageIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-heading font-bold text-white group-hover:text-[#66FCF1]">
                      Click to Browse or Drag & Drop Logo Image Here
                    </p>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      Stored safely & directly used across Header, Footer, and Portals
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Alternative: Enter Direct Image URL */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="block text-xs font-mono text-gray-300">
                Or Paste Image Web URL:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/logo.png"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-[#66FCF1]"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  disabled={!imageUrlInput.trim()}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#66FCF1] hover:text-[#0B0C10] disabled:opacity-40 disabled:hover:bg-white/10 disabled:hover:text-white border border-white/20 text-xs font-bold font-mono transition-all cursor-pointer"
                >
                  Apply URL
                </button>
              </div>
            </div>

            {/* Quick Logo Mode Switcher Pill */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => updateBranding({ logoType: 'default' })}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  branding.logoType === 'default'
                    ? 'bg-[#66FCF1]/15 border-[#66FCF1] text-white'
                    : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <NexisLogo size="sm" showText={false} />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Default 3D 'N' Logo</div>
                  <div className="text-[10px] text-gray-400 font-mono">Geometric vector node</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (branding.customLogoUrl) {
                    updateBranding({ logoType: 'custom_image' });
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                  branding.logoType === 'custom_image'
                    ? 'bg-[#66FCF1]/15 border-[#66FCF1] text-white'
                    : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-4 h-4 text-[#66FCF1]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Custom Uploaded Logo</div>
                  <div className="text-[10px] text-gray-400 font-mono">
                    {branding.customLogoUrl ? 'Active on site' : 'Upload image first'}
                  </div>
                </div>
              </button>
            </div>

          </div>

          {/* SECTION 2: BRAND PRESETS (1-CLICK TEST EMBLEMS) */}
          <div className="seo-3d-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#66FCF1]" />
                <h3 className="font-heading font-extrabold text-white text-sm">
                  Curated Academic & Science Logo Presets
                </h3>
              </div>
              <span className="text-[10px] font-mono text-gray-400">1-Click Apply</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESET_LOGOS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => {
                    applyPresetLogo(preset);
                    triggerSuccessNotification(`Applied "${preset.name}" preset logo!`);
                  }}
                  className="p-3.5 rounded-xl bg-black/40 hover:bg-[#1F2833] border border-white/10 hover:border-[#66FCF1]/50 transition-all cursor-pointer flex items-center gap-3 group"
                >
                  <div 
                    className="w-10 h-10 rounded-xl bg-white/5 p-1.5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                    style={{ boxShadow: `0 0 10px ${preset.glowColor}30` }}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-[#66FCF1] transition-colors truncate">
                      {preset.name}
                    </div>
                    <div className="text-[10px] text-gray-400 truncate font-mono">
                      {preset.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: TEXT, COLORS & STYLING CONTROLS */}
          <div className="seo-3d-card p-6 space-y-5">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#66FCF1]" />
              <h3 className="font-heading font-extrabold text-white text-sm">
                Custom Typography, Colors & Framing
              </h3>
            </div>

            {/* Brand Title & Subtitle Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">
                  Academy / Brand Title:
                </label>
                <input
                  type="text"
                  value={branding.siteTitle}
                  onChange={(e) => updateBranding({ siteTitle: e.target.value })}
                  placeholder="e.g. NEXIS"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-heading font-extrabold focus:outline-none focus:border-[#66FCF1]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">
                  Subtitle / Tagline:
                </label>
                <input
                  type="text"
                  value={branding.siteSubtitle}
                  onChange={(e) => updateBranding({ siteSubtitle: e.target.value })}
                  placeholder="e.g. ACADEMY"
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-heading font-bold focus:outline-none focus:border-[#66FCF1]"
                />
              </div>
            </div>

            {/* Glow Accent Color Selector */}
            <div>
              <label className="block text-xs font-mono text-gray-300 mb-2">
                Logo Aura & Glow Accent Color:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {GLOW_COLORS.map((col) => (
                  <button
                    key={col.value}
                    type="button"
                    onClick={() => updateBranding({ glowColor: col.value })}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[11px] font-mono transition-all cursor-pointer ${
                      branding.glowColor === col.value
                        ? 'bg-white/15 border-white text-white shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                        : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full shrink-0" 
                      style={{ backgroundColor: col.value, boxShadow: `0 0 6px ${col.value}` }} 
                    />
                    <span>{col.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Shape & Framing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">
                  Logo Container Shape:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['rounded', 'circle', 'square', 'transparent'] as const).map((shape) => (
                    <button
                      key={shape}
                      type="button"
                      onClick={() => updateBranding({ logoShape: shape })}
                      className={`p-2 rounded-lg border text-[10px] font-mono capitalize transition-all cursor-pointer text-center ${
                        branding.logoShape === shape
                          ? 'bg-[#66FCF1]/20 border-[#66FCF1] text-[#66FCF1] font-bold'
                          : 'bg-black/40 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1.5">
                  Logo Size Scaling: ({branding.logoScale}%)
                </label>
                <input
                  type="range"
                  min="70"
                  max="140"
                  step="5"
                  value={branding.logoScale}
                  onChange={(e) => updateBranding({ logoScale: Number(e.target.value) })}
                  className="w-full accent-[#66FCF1] cursor-pointer"
                />
              </div>
            </div>

            {/* Favicon & Tagline Toggles */}
            <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/10 text-xs font-mono text-gray-300">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={branding.showTagline}
                  onChange={(e) => updateBranding({ showTagline: e.target.checked })}
                  className="w-4 h-4 rounded bg-black/60 border-white/20 text-[#66FCF1] focus:ring-0"
                />
                <span>Display Subtitle / Tagline</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={branding.updateFavicon}
                  onChange={(e) => updateBranding({ updateFavicon: e.target.checked })}
                  className="w-4 h-4 rounded bg-black/60 border-white/20 text-[#66FCF1] focus:ring-0"
                />
                <span>Auto-Sync Browser Tab Favicon</span>
              </label>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: MULTI-SURFACE LIVE PREVIEWS (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="seo-3d-card p-6 space-y-5 border border-[#66FCF1]/30 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#66FCF1]" />
                <h3 className="font-heading font-extrabold text-white text-base">
                  Real-time Multi-Surface Preview
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Preview Surface Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-black/60 border border-white/15 text-xs font-mono">
              {[
                { id: 'navbar', label: 'Navbar' },
                { id: 'loading', label: 'Loading Orb' },
                { id: 'portal', label: 'Student Portal' },
                { id: 'footer', label: 'Footer' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setPreviewTab(t.id as any)}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all text-center cursor-pointer ${
                    previewTab === t.id
                      ? 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_10px_rgba(102,252,241,0.4)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Surface Preview Canvas */}
            <div className="min-h-[260px] rounded-2xl bg-gradient-to-b from-black/80 to-[#1F2833]/90 border border-white/15 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              
              {/* Background ambient lighting */}
              <div 
                className="absolute w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-30"
                style={{ backgroundColor: branding.glowColor }}
              />

              {/* 1. NAVBAR PREVIEW */}
              {previewTab === 'navbar' && (
                <div className="w-full space-y-4">
                  <div className="w-full p-3.5 rounded-xl bg-[#0B0C10]/90 border border-white/15 backdrop-blur-md flex items-center justify-between shadow-lg">
                    <NexisLogo size="md" />
                    
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 rounded-lg bg-white/5 text-[10px] text-gray-300 font-mono">Courses</div>
                      <div className="px-2.5 py-1 rounded-lg bg-[#66FCF1] text-[#0B0C10] text-[10px] font-bold">Sign In</div>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 text-center font-mono">
                    Top fixed navigation bar presentation
                  </p>
                </div>
              )}

              {/* 2. LOADING SCREEN ORB PREVIEW */}
              {previewTab === 'loading' && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-dashed border-[#66FCF1]/50 animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                    <div 
                      className="w-16 h-16 rounded-2xl bg-[#1F2833] border border-[#66FCF1]/50 flex items-center justify-center"
                      style={{ boxShadow: `0 0 20px ${branding.glowColor}50` }}
                    >
                      <NexisLogo size="md" showText={false} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-heading font-extrabold text-white">Opening Transition Screen</div>
                    <div className="text-[10px] text-[#66FCF1] font-mono mt-0.5">3D Geometric Orbital Engine</div>
                  </div>
                </div>
              )}

              {/* 3. STUDENT PORTAL PREVIEW */}
              {previewTab === 'portal' && (
                <div className="w-full max-w-xs p-4 rounded-xl bg-[#0B0C10] border border-white/20 text-center space-y-3 shadow-xl">
                  <NexisLogo size="lg" className="justify-center" />
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-300 font-mono">
                    Student / Parent Authentication Gateway
                  </div>
                  <div className="w-full py-1.5 rounded-lg bg-[#66FCF1] text-[#0B0C10] text-xs font-bold font-mono">
                    Continue to Dashboard
                  </div>
                </div>
              )}

              {/* 4. FOOTER PREVIEW */}
              {previewTab === 'footer' && (
                <div className="w-full space-y-3 bg-[#0B0C10] p-4 rounded-xl border border-white/10 text-center">
                  <NexisLogo size="lg" className="justify-center" />
                  <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                    Transforming science education with spatial geometry and micro-batch mentorship.
                  </p>
                  <div className="text-[10px] text-gray-500 font-mono">
                    © 2026 {branding.siteTitle} {branding.siteSubtitle}. All rights reserved.
                  </div>
                </div>
              )}

            </div>

            {/* Status Checklist Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs font-mono">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                Brand Deployment Checklist
              </span>
              
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Desktop & Mobile Header</span>
                </span>
                <span className="text-[10px] text-emerald-400">Synchronized</span>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Loading Orbit Transition</span>
                </span>
                <span className="text-[10px] text-emerald-400">Synchronized</span>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Student & Parent Portal</span>
                </span>
                <span className="text-[10px] text-emerald-400">Synchronized</span>
              </div>

              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Global Footer & Badges</span>
                </span>
                <span className="text-[10px] text-emerald-400">Synchronized</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
