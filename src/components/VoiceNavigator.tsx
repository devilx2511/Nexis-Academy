import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Sparkles, X, Check, Command, AlertCircle } from 'lucide-react';
import { PageRoute } from '../types';

interface VoiceNavigatorProps {
  onNavigate: (route: PageRoute) => void;
  onOpenDemoModal: () => void;
  onToggleTheme: () => void;
}

export const VoiceNavigator: React.FC<VoiceNavigatorProps> = ({
  onNavigate,
  onOpenDemoModal,
  onToggleTheme
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastExecutedCommand, setLastExecutedCommand] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Initialize SpeechRecognition on client
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        evaluateVoiceCommand(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech Recognition notice:', event.error);
        if (event.error === 'not-allowed') {
          setIsListening(false);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('Web Speech API setup failed:', err);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  const evaluateVoiceCommand = (rawText: string) => {
    const text = rawText.toLowerCase().trim();

    // 1. Courses Navigation
    if (text.includes('course') || text.includes('program') || text.includes('syllabus') || text.includes('subject')) {
      triggerSuccess('Navigating to Courses & Programs', () => onNavigate('courses'));
      return;
    }

    // 2. Demo Booking
    if (text.includes('demo') || text.includes('book') || text.includes('trial') || text.includes('free class')) {
      triggerSuccess('Opening Free Demo Booking Form', () => onOpenDemoModal());
      return;
    }

    // 3. Faculty / Tutors
    if (text.includes('faculty') || text.includes('tutor') || text.includes('teacher') || text.includes('mentor')) {
      triggerSuccess('Navigating to Elite Faculty Directory', () => onNavigate('faculty'));
      return;
    }

    // 4. Portal / Dashboard
    if (text.includes('portal') || text.includes('dashboard') || text.includes('login') || text.includes('sign in') || text.includes('analytics')) {
      triggerSuccess('Opening Student & Parent Portal', () => onNavigate('portal'));
      return;
    }

    // 5. Results & Benchmark
    if (text.includes('result') || text.includes('score') || text.includes('topper') || text.includes('outcome')) {
      triggerSuccess('Navigating to Academic Results & Benchmarks', () => onNavigate('results'));
      return;
    }

    // 6. Home
    if (text.includes('home') || text.includes('main page')) {
      triggerSuccess('Navigating to Home', () => onNavigate('home'));
      return;
    }

    // 7. Theme Toggle
    if (text.includes('theme') || text.includes('dark mode') || text.includes('light mode') || text.includes('toggle mode')) {
      triggerSuccess('Toggling Theme Mode', () => onToggleTheme());
      return;
    }

    // 8. Contact
    if (text.includes('contact') || text.includes('support') || text.includes('help') || text.includes('call')) {
      triggerSuccess('Navigating to Contact Page', () => onNavigate('contact'));
      return;
    }

    // 9. About
    if (text.includes('about') || text.includes('mission')) {
      triggerSuccess('Navigating to About Page', () => onNavigate('about'));
      return;
    }

    // 10. FAQ
    if (text.includes('faq') || text.includes('question') || text.includes('doubt')) {
      triggerSuccess('Navigating to FAQ Page', () => onNavigate('faq'));
      return;
    }
  };

  const triggerSuccess = (label: string, action: () => void) => {
    setLastExecutedCommand(label);
    try {
      action();
    } catch (e) {
      console.error(e);
    }
    // Stop and reset transcript after execution
    setTimeout(() => {
      setTranscript('');
      setLastExecutedCommand(null);
      setIsOpen(false);
      stopListening();
    }, 1200);
  };

  const startListening = () => {
    setIsOpen(true);
    setTranscript('');
    setLastExecutedCommand(null);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        // Recognition might already be active
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsListening(false);
  };

  const sampleCommands = [
    { label: '"Go to courses"', action: () => { onNavigate('courses'); setIsOpen(false); } },
    { label: '"Book demo"', action: () => { onOpenDemoModal(); setIsOpen(false); } },
    { label: '"Show faculty"', action: () => { onNavigate('faculty'); setIsOpen(false); } },
    { label: '"Open portal"', action: () => { onNavigate('portal'); setIsOpen(false); } },
    { label: '"Toggle dark mode"', action: () => { onToggleTheme(); setIsOpen(false); } },
    { label: '"Academic results"', action: () => { onNavigate('results'); setIsOpen(false); } },
  ];

  return (
    <>
      {/* Mic Trigger Button */}
      <button
        type="button"
        onClick={() => {
          if (isListening) {
            stopListening();
            setIsOpen(false);
          } else {
            startListening();
          }
        }}
        className={`relative p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center group ${
          isListening
            ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse'
            : 'bg-black/60 dark:bg-black/60 light:bg-white/90 border-white/15 dark:border-white/15 light:border-slate-300 text-slate-300 hover:text-[#66FCF1] hover:border-[#66FCF1]/50 shadow-sm'
        }`}
        title="Voice Navigation (e.g. 'go to courses', 'book demo')"
        aria-label="Voice Navigation using Web Speech API"
      >
        <Mic className={`w-4 h-4 transition-transform group-hover:scale-110 ${isListening ? 'text-rose-400' : 'text-[#66FCF1]'}`} />
        {isListening && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
        )}
      </button>

      {/* Floating Voice Navigation Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#0B0C10] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white space-y-6">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                stopListening();
                setIsOpen(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Web Speech API Voice Navigation</span>
              </div>
              <h3 className="text-xl font-heading font-black text-white">
                Speak a Command
              </h3>
              <p className="text-xs text-slate-300">
                Say <span className="text-[#66FCF1] font-semibold">"go to courses"</span>, <span className="text-[#66FCF1] font-semibold">"book demo"</span>, or <span className="text-[#66FCF1] font-semibold">"toggle dark mode"</span>.
              </p>
            </div>

            {/* Visual Waveform & Mic Center */}
            <div className="flex flex-col items-center justify-center py-4 space-y-4">
              <div className="relative flex items-center justify-center">
                {/* Pulsing concentric rings */}
                {isListening && (
                  <>
                    <div className="absolute w-28 h-28 rounded-full bg-[#66FCF1]/15 animate-ping" />
                    <div className="absolute w-20 h-20 rounded-full bg-[#66FCF1]/25 animate-pulse" />
                  </>
                )}

                <button
                  type="button"
                  onClick={() => {
                    if (isListening) stopListening();
                    else startListening();
                  }}
                  className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.6)]'
                      : 'bg-[#66FCF1] text-[#0B0C10] shadow-[0_0_25px_rgba(102,252,241,0.5)]'
                  }`}
                >
                  {isListening ? <Mic className="w-7 h-7 animate-bounce" /> : <MicOff className="w-7 h-7" />}
                </button>
              </div>

              {/* Status Pill */}
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-bold text-slate-400">
                  {isListening ? 'Listening for voice input...' : 'Microphone Paused (Tap to Speak)'}
                </span>

                {/* Real-time speech transcript feedback */}
                {transcript ? (
                  <div className="p-3 rounded-xl bg-black/60 border border-[#66FCF1]/40 text-sm font-mono text-[#66FCF1] animate-fadeIn">
                    "{transcript}"
                  </div>
                ) : null}

                {/* Command executed notification */}
                {lastExecutedCommand && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300 flex items-center justify-center gap-2 animate-bounce">
                    <Check className="w-4 h-4" />
                    <span>{lastExecutedCommand}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Tap Command Chips */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[11px] font-mono text-slate-400 block text-center">
                Supported Voice Commands (Tap to execute directly):
              </span>
              <div className="grid grid-cols-2 gap-2">
                {sampleCommands.map((cmd) => (
                  <button
                    key={cmd.label}
                    type="button"
                    onClick={cmd.action}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#66FCF1]/40 text-xs font-mono text-slate-300 hover:text-white transition-all text-left flex items-center gap-1.5"
                  >
                    <Command className="w-3 h-3 text-[#66FCF1] shrink-0" />
                    <span className="truncate">{cmd.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {!isSupported && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Web Speech API is best supported in Chrome, Edge, or Safari. Tap any command above to trigger instantly.</span>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
