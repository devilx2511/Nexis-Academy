import React, { useState } from 'react';
import { MessageSquare, X, Send, PhoneCall, MapPin, Sparkles } from 'lucide-react';
import { ACADEMY_INFO } from '../data/academyData';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = ACADEMY_INFO.contact.whatsapp.includes('[') 
    ? '919876543210' 
    : ACADEMY_INFO.contact.whatsapp.replace(/[^0-9]/g, '');

  const openWhatsApp = (customMsg?: string) => {
    const text = encodeURIComponent(customMsg || "Hello Nexis Academy! I would like to inquire about tuition classes and free demo slots.");
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-20 sm:bottom-24 lg:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end max-w-[calc(100vw-24px)]">
      {/* Quick Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-24px)] max-w-[340px] sm:w-80 p-4 rounded-2xl bg-[#1F2833]/98 border border-[#66FCF1]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] text-white backdrop-blur-xl animate-scale-up">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-heading font-bold text-sm text-white">Nexis Academic Desk</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp prompt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-300 my-3">
            Hi there! 👋 How can we help you or your child achieve top academic scores today?
          </p>

          <div className="space-y-2">
            <button
              onClick={() => openWhatsApp("Hi! I would like to book a Free Demo Class at Nexis Academy.")}
              className="w-full text-left p-2.5 rounded-xl bg-black/50 hover:bg-[#66FCF1]/15 border border-white/10 hover:border-[#66FCF1]/40 text-xs font-medium text-white flex items-center justify-between transition-all group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#66FCF1]" />
                Book Free Demo Class
              </span>
              <Send className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#66FCF1]" />
            </button>

            <button
              onClick={() => openWhatsApp("Hi! Please share the course details and fee structure for Class 10/12.")}
              className="w-full text-left p-2.5 rounded-xl bg-black/50 hover:bg-[#66FCF1]/15 border border-white/10 hover:border-[#66FCF1]/40 text-xs font-medium text-white flex items-center justify-between transition-all group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-[#45A29E]" />
                Inquire About Batches & Fees
              </span>
              <Send className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#66FCF1]" />
            </button>

            <button
              onClick={() => openWhatsApp("Hi! Can you share the exact location map for Nexis Academy?")}
              className="w-full text-left p-2.5 rounded-xl bg-black/50 hover:bg-[#66FCF1]/15 border border-white/10 hover:border-[#66FCF1]/40 text-xs font-medium text-white flex items-center justify-between transition-all group cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Get Academy Location Map
              </span>
              <Send className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#66FCF1]" />
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-heading font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Chat with Nexis Academy on WhatsApp"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping" />
        </div>
        <span className="inline">WhatsApp</span>
      </button>
    </div>
  );
};
