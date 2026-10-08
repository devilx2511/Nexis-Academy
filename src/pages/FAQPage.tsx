import React from 'react';
import { FAQSection } from '../components/FAQSection';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface FAQPageProps {
  onNavigate?: (route: PageRoute) => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-24 pb-20 bg-[#0B0C10] text-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs 
          items={[{ name: 'FAQ', route: 'faq' }]}
          onNavigate={onNavigate}
        />
      </div>
      <FAQSection />
    </div>
  );
};

