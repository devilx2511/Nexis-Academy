import React from 'react';
import { NexisLogo } from './NexisLogo';
import { ACADEMY_INFO, COURSES_DATA } from '../data/academyData';
import { PageRoute } from '../types';
import { MapPin, Phone, Mail, MessageSquare, Instagram, Facebook, Youtube, Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenDemoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDemoModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": ACADEMY_INFO.name,
    "url": `https://${ACADEMY_INFO.primaryDomain}`,
    "logo": `https://${ACADEMY_INFO.primaryDomain}/logo.svg`,
    "description": ACADEMY_INFO.subtitle,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": ACADEMY_INFO.contact.address
    },
    "telephone": ACADEMY_INFO.contact.phone,
    "email": ACADEMY_INFO.contact.email,
    "sameAs": [
      `https://instagram.com/${ACADEMY_INFO.socials.instagram.replace('@', '')}`,
      `https://facebook.com/${ACADEMY_INFO.socials.facebook}`,
      `https://youtube.com/${ACADEMY_INFO.socials.youtube}`
    ]
  };

  return (
    <footer className="bg-[#0B0C10] border-t border-white/10 pt-16 pb-12 relative text-gray-300">
      {/* Inject Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div onClick={() => onNavigate('home')}>
              <NexisLogo size="lg" />
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Nexis Academy is a modern tech-driven tuition and coaching institute providing personalized academic support, expert faculty guidance, and 3D conceptual learning environments.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://instagram.com/${ACADEMY_INFO.socials.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#66FCF1] hover:text-[#66FCF1] flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://facebook.com/${ACADEMY_INFO.socials.facebook}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#66FCF1] hover:text-[#66FCF1] flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://youtube.com/${ACADEMY_INFO.socials.youtube}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#66FCF1] hover:text-[#66FCF1] flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://linkedin.com/company/${ACADEMY_INFO.socials.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#66FCF1] hover:text-[#66FCF1] flex items-center justify-center transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', route: 'home' as PageRoute },
                { label: 'About Academy', route: 'about' as PageRoute },
                { label: 'Courses', route: 'courses' as PageRoute },
                { label: 'Faculty', route: 'faculty' as PageRoute },
                { label: 'Results & Milestones', route: 'results' as PageRoute },
                { label: 'Testimonials', route: 'testimonials' as PageRoute },
                { label: 'Student Portal', route: 'portal' as PageRoute },
                { label: 'Admin / DevMode Console', route: 'admin' as PageRoute },
                { label: 'FAQ', route: 'faq' as PageRoute },
              ].map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => onNavigate(link.route)}
                    className="hover:text-[#66FCF1] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Programs
            </h4>
            <ul className="space-y-2 text-xs">
              {COURSES_DATA.map((course) => (
                <li key={course.id}>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="hover:text-[#66FCF1] transition-colors text-left"
                  >
                    {course.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#66FCF1] flex-shrink-0 mt-0.5" />
                <span>{ACADEMY_INFO.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#66FCF1] flex-shrink-0" />
                <span>{ACADEMY_INFO.contact.displayPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#45A29E] flex-shrink-0" />
                <span>WhatsApp: {ACADEMY_INFO.contact.whatsappDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#66FCF1] flex-shrink-0" />
                <span>{ACADEMY_INFO.contact.displayEmail}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 Nexis Academy. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-gray-300 transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex items-center gap-1"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
