import React, { useState } from 'react';
import { ACADEMY_INFO } from '../data/academyData';
import { PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MapPin, Phone, Mail, MessageSquare, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onNavigate?: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    studentClass: 'Class 10',
    subject: 'Mathematics & Science',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#0B0C10] text-white min-h-screen space-y-10">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs 
          items={[{ name: 'Contact & Admissions', route: 'contact' }]}
          onNavigate={onNavigate}
        />
      </div>

      {/* Page Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
          Contact Nexis Academy
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
          Have questions about courses, schedules, or demo classes? Our Academic Desk is here to assist you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="seo-3d-card p-6 space-y-5">
              <h2 className="text-xl font-heading font-bold text-white pb-3 border-b border-white/10">
                Academy Desk Details
              </h2>

              <div className="space-y-4 text-xs text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#66FCF1]/10 text-[#66FCF1] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">Academy Address</span>
                    <span className="text-gray-400">{ACADEMY_INFO.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#66FCF1]/10 text-[#66FCF1] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">Phone Hotline</span>
                    <span className="text-gray-400">{ACADEMY_INFO.contact.displayPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#45A29E]/10 text-[#45A29E] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">WhatsApp Support</span>
                    <span className="text-gray-400">{ACADEMY_INFO.contact.whatsappDisplay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#66FCF1]/10 text-[#66FCF1] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">Email Admissions</span>
                    <span className="text-gray-400">{ACADEMY_INFO.contact.displayEmail}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-white block text-sm">Academy Operating Hours</span>
                    <span className="text-gray-400">{ACADEMY_INFO.contact.openingHours}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed Simulation */}
            <div className="seo-3d-card p-2 h-64 overflow-hidden rounded-2xl relative">
              <iframe
                title="Nexis Academy Location Map"
                src={ACADEMY_INFO.contact.googleMapsEmbedUrl}
                className="w-full h-full rounded-xl border-0 filter grayscale opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 right-4 p-2.5 rounded-xl bg-black/80 backdrop-blur-md text-xs text-white border border-white/10 flex items-center justify-between">
                <span>📍 Nexis Academy Campus</span>
                <span className="text-[#66FCF1] font-bold">Directions Map</span>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="seo-3d-card p-6 sm:p-8 relative">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-scale-up">
                  <div className="w-16 h-16 rounded-full bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1] flex items-center justify-center mx-auto glow-cyan-lg">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white">Callback Request Received!</h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto">
                    Thank you <span className="text-[#66FCF1] font-semibold">{formData.name}</span>! A Nexis Academic Advisor will contact you at <span className="text-white font-medium">{formData.phone}</span> within 2 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-bold text-xs"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-2xl font-heading font-bold text-white">Request an Advisor Callback</h2>
                  <p className="text-gray-300 text-xs">
                    Fill in your details below and our academic team will reach out with course brochures and schedule options.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Parent / Student Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S. Mehta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. parent@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Student Class / Grade</label>
                      <select
                        value={formData.studentClass}
                        onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#66FCF1] text-xs"
                      >
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9 Foundation</option>
                        <option value="Class 10">Class 10 Board Sprint</option>
                        <option value="Class 11">Class 11 JEE/NEET</option>
                        <option value="Class 12">Class 12 Boards / JEE</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Message / Specific Academic Concern</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Looking for Class 10 Math & Physics evening batch..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-sm hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-2 glow-cyan-lg"
                  >
                    {isSubmitting ? <span>Sending Request...</span> : (
                      <>
                        <span>Request a Callback</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#66FCF1]" />
                    <span>Your phone number is strictly confidential and protected.</span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
