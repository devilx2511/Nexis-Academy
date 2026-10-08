import React, { useState } from 'react';
import { Bot, Send, Sparkles, X, BookOpen, CheckCircle2 } from 'lucide-react';

interface AITutorWidgetProps {
  isOpenExternal?: boolean;
  onToggleExternal?: (open: boolean) => void;
  hideFloatingTriggerOnMobile?: boolean;
}

export const AITutorWidget: React.FC<AITutorWidgetProps> = ({
  isOpenExternal,
  onToggleExternal,
  hideFloatingTriggerOnMobile = true
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalIsOpen;

  const setIsOpen = (open: boolean) => {
    if (onToggleExternal) {
      onToggleExternal(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('Mathematics');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: "Hello! I am Nexis AI, your 24/7 Academic Study Assistant. Ask me any math formula, physics numerical problem, or course inquiry!"
    }
  ]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const userText = question;
    setQuestion('');
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/solve-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText, subject })
      });

      const data = await response.json();
      if (data.answer) {
        setChatHistory((prev) => [...prev, { sender: 'ai', text: data.answer }]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: "Core formula & strategy breakdown:\n1. Identify given variables.\n2. Apply primary equation.\n3. Verify units."
          }
        ]);
      }
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: "To solve this concept, break the question into 3 steps: (1) Write down given parameters, (2) Substitute into standard formula, (3) Solve for the target variable."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-50 max-w-[calc(100vw-24px)]">
      {/* Expanded Widget Box */}
      {isOpen ? (
        <div className="w-[calc(100vw-24px)] max-w-[360px] sm:w-96 rounded-2xl bg-[#1F2833]/98 border border-[#66FCF1]/50 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(102,252,241,0.25)] text-white backdrop-blur-2xl overflow-hidden flex flex-col h-[430px] sm:h-[470px] animate-scale-up">
          {/* Header */}
          <div className="p-3 sm:p-3.5 bg-gradient-to-r from-[#1F2833] via-black to-[#1F2833] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#66FCF1]/20 border border-[#66FCF1] flex items-center justify-center text-[#66FCF1] glow-cyan-sm shrink-0">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="font-heading font-bold text-xs sm:text-sm text-white flex items-center gap-1.5 truncate">
                  <span>Nexis AI Tutor</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#66FCF1] truncate">24/7 Academic Assistant</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors shrink-0 cursor-pointer"
              aria-label="Close AI Tutor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl whitespace-pre-wrap leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#66FCF1] text-[#0B0C10] font-semibold rounded-tr-none shadow-[0_2px_10px_rgba(102,252,241,0.2)]'
                      : 'bg-black/60 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-black/60 border border-[#66FCF1]/30 p-3 rounded-xl text-xs text-[#66FCF1] flex items-center gap-2 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  <span>Nexis AI is solving step-by-step...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Subject Selector & Form Input */}
          <form onSubmit={handleAsk} className="p-3 bg-black/80 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-[#0B0C10] border border-white/15 text-[11px] text-[#66FCF1] rounded-lg px-2 py-1 focus:outline-none focus:border-[#66FCF1]"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Course Advice">Course Advice</option>
              </select>
              <span className="text-[10px] text-gray-400">Ask any concept/problem</span>
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Ask e.g. 'Explain Newton's Laws' or 'Trig formula'..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-xs"
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="absolute right-1.5 p-1.5 rounded-lg bg-[#66FCF1] text-[#0B0C10] hover:bg-[#66FCF1]/90 transition-all disabled:opacity-40 cursor-pointer"
                aria-label="Send prompt to AI"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Collapsed Trigger Badge (Visible on Desktop always; on Mobile hidden if docked) */
        <button
          onClick={() => setIsOpen(true)}
          className={`${
            hideFloatingTriggerOnMobile ? 'hidden lg:inline-flex' : 'inline-flex'
          } group items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#1F2833]/90 border border-[#66FCF1]/50 text-white font-heading font-bold text-xs shadow-[0_0_20px_rgba(102,252,241,0.25)] hover:border-[#66FCF1] hover:scale-105 transition-all cursor-pointer backdrop-blur-md`}
        >
          <div className="w-6 h-6 rounded-full bg-[#66FCF1]/20 text-[#66FCF1] flex items-center justify-center glow-cyan-sm">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span>Nexis AI Doubt Solver</span>
          <span className="w-2 h-2 rounded-full bg-[#66FCF1] animate-ping" />
        </button>
      )}
    </div>
  );
};
