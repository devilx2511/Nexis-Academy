import React, { useState } from 'react';
import { FAQ_DATA } from '../data/academyData';
import { ChevronDown, Search, HelpCircle, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredFaqs = FAQ_DATA.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section className="py-20 bg-[#0B0C10] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <span className="text-[#66FCF1] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-[#66FCF1]/10 border border-[#66FCF1]/20">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Everything you need to know about enrollment, course schedules, and academic support.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. demo class, batch size, subjects)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-sm"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`seo-3d-card transition-all overflow-hidden ${
                  isOpen ? 'border-[#66FCF1]/40 bg-white/[0.06]' : 'hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-white cursor-pointer"
                >
                  <span className={isOpen ? 'text-[#66FCF1]' : 'text-white'}>
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 transition-transform ${
                    isOpen ? 'rotate-180 text-[#66FCF1]' : 'text-gray-400'
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-gray-300 text-sm leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No matching questions found. Try searching for "demo", "subjects", or "fees".
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
