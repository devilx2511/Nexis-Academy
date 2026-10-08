import React, { useEffect } from 'react';
import { PageMetadata, SEO_CONFIG, SITE_URL } from '../seo/seoConfig';

interface SEOHelmetProps {
  metadata: PageMetadata;
  schemaData?: object | object[];
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({ metadata, schemaData }) => {
  useEffect(() => {
    // 1. Update Title
    if (metadata.title) {
      document.title = metadata.title;
    }

    // 2. Helper to set or create <meta> tags
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Helper to set or create <link> tags (e.g., canonical)
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 4. Standard Meta Tags
    setMetaTag('name', 'description', metadata.description || SEO_CONFIG.defaultDescription);
    if (metadata.keywords) {
      setMetaTag('name', 'keywords', metadata.keywords);
    }
    setMetaTag('name', 'robots', metadata.noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMetaTag('name', 'author', SEO_CONFIG.siteName);
    setMetaTag('name', 'theme-color', SEO_CONFIG.themeColor);

    // 5. Canonical URL
    const canonicalUrl = metadata.canonical || SITE_URL;
    setLinkTag('canonical', canonicalUrl);

    // 6. Open Graph Metadata
    setMetaTag('property', 'og:site_name', SEO_CONFIG.siteName);
    setMetaTag('property', 'og:title', metadata.title || SEO_CONFIG.defaultTitle);
    setMetaTag('property', 'og:description', metadata.description || SEO_CONFIG.defaultDescription);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', metadata.ogType || 'website');
    setMetaTag('property', 'og:image', metadata.ogImage || SEO_CONFIG.defaultOgImage);
    setMetaTag('property', 'og:locale', 'en_US');

    // 7. Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', SEO_CONFIG.twitterHandle);
    setMetaTag('name', 'twitter:title', metadata.title || SEO_CONFIG.defaultTitle);
    setMetaTag('name', 'twitter:description', metadata.description || SEO_CONFIG.defaultDescription);
    setMetaTag('name', 'twitter:image', metadata.ogImage || SEO_CONFIG.defaultOgImage);

    // 8. Inject / Update Structured Data (JSON-LD)
    const scriptId = 'nexis-dynamic-ld-json';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (schemaData) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.id = scriptId;
        scriptElement.type = 'application/ld+json';
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(
        Array.isArray(schemaData)
          ? {
              '@context': 'https://schema.org',
              '@graph': schemaData
            }
          : schemaData
      );
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Cleanup on component unmount if necessary
    };
  }, [metadata, schemaData]);

  return null; // Side-effect only component
};
