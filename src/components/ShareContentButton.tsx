import React, { useState } from 'react';
import { 
  Share2, 
  Check, 
  Copy, 
  MessageCircle, 
  Send, 
  Linkedin, 
  Twitter, 
  Mail,
  X
} from 'lucide-react';

interface ShareContentButtonProps {
  title: string;
  text?: string;
  url?: string;
  variant?: 'button' | 'icon' | 'pill';
  className?: string;
}

export const ShareContentButton: React.FC<ShareContentButtonProps> = ({
  title,
  text = 'Check out this academic program on Nexis Academy',
  url,
  variant = 'button',
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [isOpenFallbackModal, setIsOpenFallbackModal] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://nexisacademy.edu');

  const handleShare = async () => {
    const shareData = {
      title,
      text: `${title} - ${text}`,
      url: shareUrl
    };

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: any) {
        // If aborted by user (AbortError), do nothing. Otherwise open fallback.
        if (err.name !== 'AbortError') {
          setIsOpenFallbackModal(true);
        }
        return;
      }
    } else {
      // Fallback for browsers without Web Share API support
      setIsOpenFallbackModal(true);
    }
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`${title} - ${text}`);

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      color: 'hover:bg-emerald-500/20 hover:text-emerald-400 border-emerald-500/30'
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      color: 'hover:bg-sky-500/20 hover:text-sky-400 border-sky-500/30'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:bg-blue-600/20 hover:text-blue-400 border-blue-600/30'
    },
    {
      name: 'Telegram',
      icon: Send,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      color: 'hover:bg-cyan-500/20 hover:text-cyan-400 border-cyan-500/30'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}%0A%0A${encodedUrl}`,
      color: 'hover:bg-purple-500/20 hover:text-purple-400 border-purple-500/30'
    }
  ];

  return (
    <>
      {variant === 'icon' ? (
        <button
          onClick={handleShare}
          className={`p-2 rounded-xl bg-white/5 hover:bg-[#66FCF1]/20 border border-white/10 hover:border-[#66FCF1]/40 text-gray-300 hover:text-[#66FCF1] transition-all cursor-pointer ${className}`}
          title="Share via Web Share API or Social Networks"
          aria-label="Share content"
        >
          <Share2 className="w-4 h-4" />
        </button>
      ) : variant === 'pill' ? (
        <button
          onClick={handleShare}
          className={`px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#66FCF1]/15 border border-white/15 hover:border-[#66FCF1]/40 text-gray-200 hover:text-[#66FCF1] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${className}`}
          aria-label="Share content"
        >
          <Share2 className="w-3.5 h-3.5 text-[#66FCF1]" />
          <span>Share</span>
        </button>
      ) : (
        <button
          onClick={handleShare}
          className={`px-4 py-2 rounded-xl bg-white/5 hover:bg-[#66FCF1]/20 border border-white/15 hover:border-[#66FCF1]/40 text-white hover:text-[#66FCF1] text-xs font-heading font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${className}`}
          aria-label="Share via Web Share API"
        >
          <Share2 className="w-4 h-4 text-[#66FCF1]" />
          <span>Share Program</span>
        </button>
      )}

      {/* Fallback Share Modal */}
      {isOpenFallbackModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0F172A] border border-[#66FCF1]/30 p-6 text-white shadow-2xl space-y-5">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#66FCF1]">
                  Web Share Options
                </span>
                <h3 className="text-lg font-heading font-bold text-white mt-0.5">
                  Share this Content
                </h3>
              </div>
              <button
                onClick={() => setIsOpenFallbackModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
                aria-label="Close share modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-300 font-medium line-clamp-2">
              "{title}"
            </p>

            {/* Quick 1-Click Copy Box */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/10">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="bg-transparent border-none text-xs text-gray-300 font-mono flex-1 focus:outline-none px-2 select-all"
              />
              <button
                onClick={copyToClipboard}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#66FCF1] text-[#0B0C10] hover:bg-[#45A29E]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Channels */}
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
                Direct Channels:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {shareLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-gray-200 flex items-center gap-2.5 transition-all ${item.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-gray-500">
                Native Web Share API automatically activates on supported mobile devices.
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
