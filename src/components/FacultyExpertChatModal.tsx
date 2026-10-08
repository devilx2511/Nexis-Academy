import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  GraduationCap, 
  Award, 
  Bot, 
  CheckCircle2, 
  Clock, 
  Star,
  User,
  PhoneCall,
  Bookmark
} from 'lucide-react';
import { FacultyMember } from '../types';

interface FacultyExpertChatModalProps {
  faculty: FacultyMember | null;
  onClose: () => void;
  onOpenDemo?: (subject: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'student' | 'faculty';
  text: string;
  time: string;
}

export const FacultyExpertChatModal: React.FC<FacultyExpertChatModalProps> = ({
  faculty,
  onClose,
  onOpenDemo
}) => {
  if (!faculty) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [savedToPortal, setSavedToPortal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Pre-populated suggested domain questions
  const suggestedQuestionsMap: Record<string, string[]> = {
    'Physics & Science': [
      "How do I build intuition for Physics numerical problems?",
      "What is the best way to master Class 10 Light Optics & Electricity?",
      "How many hours of daily Physics practice is needed for JEE/NEET?"
    ],
    'Mathematics & Statistics': [
      "How can I eliminate step errors in Geometry & Algebra proofs?",
      "What is the fastest strategy for Calculus & Trigonometric identities?",
      "How to prepare for Class 10 Board Math to target 100/100?"
    ],
    'Chemistry & Life Sciences': [
      "How do I memorize Organic Chemistry reaction mechanisms easily?",
      "What are high-weightage topics for Board Chemistry?",
      "How to balance Physical Chemistry numericals with speed?"
    ]
  };

  const domainQuestions = suggestedQuestionsMap[faculty.subject] || [
    `How can I improve my grasp of ${faculty.subject}?`,
    `What is your recommended strategy for Class 10/12 exams?`,
    `How does Nexis Academy's 1-on-1 doubt desk work?`
  ];

  // Initialize initial greeting message
  useEffect(() => {
    const greeting: ChatMessage = {
      id: 'msg-init',
      sender: 'faculty',
      text: `Hello! I am ${faculty.name}, specialized in ${faculty.specialization}. What question do you have today regarding ${faculty.subject}? Ask away or pick a popular query below!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([greeting]);
  }, [faculty]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'student',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate faculty AI response based on domain
    setTimeout(() => {
      let replyText = `Great question regarding ${faculty.subject}! When approaching this: 1) First ensure fundamental definitions and formulas are crystal clear. 2) Solve 5 conceptual NCERT problems step-by-step. 3) Practice timed numericals. In our small-batch sessions at Nexis Academy, we break down these exact patterns!`;

      if (query.toLowerCase().includes('numerical') || query.toLowerCase().includes('physics') || query.toLowerCase().includes('math')) {
        replyText = `Excellent query! In ${faculty.subject}, solving numericals requires spatial visualization. Break down given values, map the required formula, and double-check unit conversions. At Nexis, our 3D visual models turn these abstract concepts into intuitive step-by-step solutions!`;
      } else if (query.toLowerCase().includes('organic') || query.toLowerCase().includes('reaction') || query.toLowerCase().includes('chemistry')) {
        replyText = `Organic mechanisms become effortless once you understand electron movement and stability of carbocations! Focus on named reactions and practice 10 mechanism roadmaps weekly.`;
      } else if (query.toLowerCase().includes('board') || query.toLowerCase().includes('100') || query.toLowerCase().includes('score')) {
        replyText = `To score 95%+ in boards: Answer structure is key! Use clean step-by-step derivations, underline key formula terms, and draw neat diagrams. Our Board Sprint batch provides exact marking-scheme drills.`;
      }

      const facultyMsg: ChatMessage = {
        id: `msg-fac-${Date.now()}`,
        sender: 'faculty',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, facultyMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-[#1F2833] border border-[#66FCF1]/40 rounded-2xl shadow-[0_0_50px_rgba(102,252,241,0.2)] flex flex-col overflow-hidden max-h-[90vh]"
      >
        
        {/* Header */}
        <div className="p-5 bg-black/60 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={faculty.photoUrl}
                alt={faculty.name}
                className="w-12 h-12 rounded-xl object-cover border border-[#66FCF1]/40"
              />
              <span className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-black absolute -bottom-0.5 -right-0.5 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-white">{faculty.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#66FCF1]/15 text-[#66FCF1] text-[10px] font-mono font-bold uppercase border border-[#66FCF1]/30">
                  Ask Expert
                </span>
              </div>
              <p className="text-xs text-gray-300 font-mono">
                {faculty.subject} • {faculty.qualification}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Thread */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1 min-h-[280px] max-h-[380px] bg-black/20">
          
          {messages.map((msg) => {
            const isFaculty = msg.sender === 'faculty';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isFaculty ? 'justify-start' : 'justify-end'}`}
              >
                {isFaculty && (
                  <div className="p-1.5 rounded-lg bg-[#66FCF1]/10 border border-[#66FCF1]/30 text-[#66FCF1] shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[82%] text-xs leading-relaxed space-y-1 ${
                    isFaculty
                      ? 'bg-black/60 border border-white/10 text-gray-200 rounded-tl-none shadow-md'
                      : 'bg-[#66FCF1] text-[#0B0C10] font-semibold rounded-tr-none shadow-[0_0_15px_rgba(102,252,241,0.25)]'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[9px] font-mono block text-right ${isFaculty ? 'text-gray-400' : 'text-[#0B0C10]/70'}`}>
                    {msg.time}
                  </span>
                </div>

                {!isFaculty && (
                  <div className="p-1.5 rounded-lg bg-white/10 text-white shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#66FCF1] font-mono">
              <Bot className="w-4 h-4 animate-bounce text-[#66FCF1]" />
              <span>{faculty.name} is preparing expert answer...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions Pills */}
        <div className="p-3 bg-black/40 border-t border-white/10 space-y-2">
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
            Suggested Quick Questions:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {domainQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#66FCF1]/10 border border-white/10 hover:border-[#66FCF1]/40 text-gray-300 hover:text-[#66FCF1] text-[11px] whitespace-nowrap transition-all cursor-pointer shrink-0"
              >
                💡 {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar & Actions */}
        <div className="p-4 bg-black/80 border-t border-white/10 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Ask ${faculty.name} a question on ${faculty.subject}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#66FCF1]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center gap-1.5 hover:bg-[#66FCF1]/90 transition-all disabled:opacity-50 cursor-pointer"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Additional Action Buttons */}
          <div className="flex items-center justify-between text-xs pt-1">
            <button
              onClick={() => {
                setSavedToPortal(true);
                setTimeout(() => setSavedToPortal(false), 3000);
              }}
              className="text-gray-400 hover:text-[#66FCF1] transition-colors flex items-center gap-1 text-[11px] font-mono cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#66FCF1]" />
              <span>{savedToPortal ? '✓ Saved to Portal Account' : 'Save Q&A to Portal'}</span>
            </button>

            {onOpenDemo && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDemo(`${faculty.subject} with ${faculty.name}`);
                }}
                className="text-[#66FCF1] hover:underline font-mono text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Book 1-on-1 Demo Session →</span>
              </button>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
};
