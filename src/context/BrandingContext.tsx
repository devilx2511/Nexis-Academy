import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface BrandingSettings {
  logoType: 'default' | 'custom_image';
  customLogoUrl: string;
  siteTitle: string;
  siteSubtitle: string;
  highlightLetter: string;
  glowColor: string;
  logoShape: 'rounded' | 'circle' | 'square' | 'transparent';
  logoScale: number; // in percentage, e.g. 100
  showTagline: boolean;
  updateFavicon: boolean;
}

export const DEFAULT_BRANDING: BrandingSettings = {
  logoType: 'default',
  customLogoUrl: '',
  siteTitle: 'NEXIS',
  siteSubtitle: 'ACADEMY',
  highlightLetter: 'X',
  glowColor: '#66FCF1',
  logoShape: 'rounded',
  logoScale: 100,
  showTagline: true,
  updateFavicon: true,
};

const STORAGE_KEY = 'nexis_site_branding_v1';
const BRANDING_EVENT = 'nexis_branding_updated_event';

interface BrandingContextType {
  branding: BrandingSettings;
  updateBranding: (newSettings: Partial<BrandingSettings>) => void;
  resetBranding: () => void;
  setUploadedLogo: (base64OrUrl: string) => void;
  applyPresetLogo: (preset: { name: string; url: string; title?: string; subtitle?: string; glowColor?: string }) => void;
}

const BrandingContext = createContext<BrandingContextType | undefined>(undefined);

export const BrandingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branding, setBranding] = useState<BrandingSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...DEFAULT_BRANDING, ...parsed };
      }
    } catch (err) {
      console.warn('Failed to load branding from localStorage:', err);
    }
    return DEFAULT_BRANDING;
  });

  // Apply favicon if enabled and custom logo is present
  useEffect(() => {
    try {
      if (branding.updateFavicon && branding.customLogoUrl && branding.logoType === 'custom_image') {
        let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = branding.customLogoUrl;
      }
    } catch {
      // Ignore in sandbox environments
    }
  }, [branding.updateFavicon, branding.customLogoUrl, branding.logoType]);

  // Listen to cross-window or inter-component dispatch events
  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<BrandingSettings>;
      if (customEvent.detail) {
        setBranding(customEvent.detail);
      }
    };

    window.addEventListener(BRANDING_EVENT, handleCustomEvent);
    return () => window.removeEventListener(BRANDING_EVENT, handleCustomEvent);
  }, []);

  const updateBranding = useCallback((newSettings: Partial<BrandingSettings>) => {
    setBranding((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new CustomEvent(BRANDING_EVENT, { detail: updated }));
      } catch (err) {
        console.warn('Failed to save branding to localStorage:', err);
      }
      return updated;
    });
  }, []);

  const resetBranding = useCallback(() => {
    setBranding(DEFAULT_BRANDING);
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(BRANDING_EVENT, { detail: DEFAULT_BRANDING }));
      // Restore default favicon
      const link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (link) {
        link.href = '/favicon.ico';
      }
    } catch (err) {
      console.warn('Failed to reset branding in localStorage:', err);
    }
  }, []);

  const setUploadedLogo = useCallback((base64OrUrl: string) => {
    updateBranding({
      logoType: 'custom_image',
      customLogoUrl: base64OrUrl,
    });
  }, [updateBranding]);

  const applyPresetLogo = useCallback((preset: { name: string; url: string; title?: string; subtitle?: string; glowColor?: string }) => {
    updateBranding({
      logoType: 'custom_image',
      customLogoUrl: preset.url,
      siteTitle: preset.title || branding.siteTitle,
      siteSubtitle: preset.subtitle || branding.siteSubtitle,
      glowColor: preset.glowColor || branding.glowColor,
    });
  }, [branding.siteTitle, branding.siteSubtitle, branding.glowColor, updateBranding]);

  return (
    <BrandingContext.Provider
      value={{
        branding,
        updateBranding,
        resetBranding,
        setUploadedLogo,
        applyPresetLogo,
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
};

export const useBranding = () => {
  const context = useContext(BrandingContext);
  if (!context) {
    // Return safe default fallback if rendered outside provider to avoid any crash/white screen
    return {
      branding: DEFAULT_BRANDING,
      updateBranding: () => {},
      resetBranding: () => {},
      setUploadedLogo: () => {},
      applyPresetLogo: () => {},
    };
  }
  return context;
};
