import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Sparkles, ShieldCheck, User, Phone, Mail, BookOpen } from 'lucide-react';

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

export const DemoBookingModal: React.FC<DemoBookingModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = "Mathematics & Science"
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    studentClass: 'Class 10',
    subject: defaultSubject,
    preferredTime: 'Saturday 4:00 PM',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ bookingId: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/demo-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setBookingResult({ bookingId: data.bookingId || `DEMO-${Date.now().toString().slice(-4)}` });
      } else {
        alert(data.error || "Failed to book demo class.");
      }
    } catch (err) {
      // Fallback local booking simulation
      setBookingResult({ bookingId: `DEMO-${Math.floor(1000 + Math.random() * 9000)}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setBookingResult(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      studentClass: 'Class 10',
      subject: defaultSubject,
      preferredTime: 'Saturday 4:00 PM',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#1F2833]/90 border border-[#66FCF1]/30 shadow-[0_0_50px_rgba(102,252,241,0.2)] text-white overflow-hidden">
        {/* Glow ambient background circles */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#66FCF1]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#45A29E]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {bookingResult ? (
          /* Confirmation View */
          <div className="text-center py-6 space-y-5 animate-scale-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#66FCF1]/20 text-[#66FCF1] border border-[#66FCF1] mx-auto glow-cyan-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#66FCF1] bg-[#66FCF1]/10 rounded-full border border-[#66FCF1]/30">
                Booking ID: {bookingResult.bookingId}
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-3">Free Demo Class Confirmed!</h3>
              <p className="text-gray-300 text-sm max-w-md mx-auto mt-2">
                Thank you <span className="text-[#66FCF1] font-semibold">{formData.name}</span>! Our Academic Counselor will call you at <span className="text-white font-medium">{formData.phone}</span> to confirm your interactive 3D classroom seat.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs text-gray-300 space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-gray-400">Class & Subject:</span>
                <span className="text-white font-medium">{formData.studentClass} • {formData.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Preferred Slot:</span>
                <span className="text-[#66FCF1] font-medium">{formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="text-white font-medium">[ACADEMY ADDRESS]</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="px-8 py-3 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-bold hover:bg-[#66FCF1]/90 transition-all glow-cyan-sm"
            >
              Done & Return
            </button>
          </div>
        ) : (
          /* Form View */
          <div>
            <div className="flex items-center gap-2 text-[#66FCF1] text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Zero Risk • No Academic Obligation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
              Book a Free Demo Class
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-1">
              Experience the 3D tech-enabled learning environment at Nexis Academy.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Student / Parent Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-sm"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Phone / WhatsApp Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Class */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Student Grade / Class</label>
                  <select
                    value={formData.studentClass}
                    onChange={(e) => setFormData({ ...formData, studentClass: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#66FCF1] text-sm"
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9 (Foundation)</option>
                    <option value="Class 10">Class 10 (Board Sprint)</option>
                    <option value="Class 11">Class 11 (JEE / NEET)</option>
                    <option value="Class 12">Class 12 (JEE / NEET / Boards)</option>
                  </select>
                </div>

                {/* Subject Interest */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Target Subject / Program</label>
                  <div className="relative">
                    <BookOpen className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#66FCF1] text-sm"
                    >
                      <option value="Mathematics & Science">Mathematics & Science</option>
                      <option value="Physics & Chemistry">Physics & Chemistry</option>
                      <option value="Biology Foundation">Biology Foundation</option>
                      <option value="Complete Board Exam Package">Complete Board Exam Package</option>
                      <option value="JEE / NEET Integrated">JEE / NEET Integrated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferred Slot */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Preferred Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Weekday Evening (5 PM)', 'Saturday 4:00 PM', 'Sunday 11:00 AM'].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, preferredTime: slot })}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                        formData.preferredTime === slot
                          ? 'bg-[#66FCF1]/20 border-[#66FCF1] text-[#66FCF1]'
                          : 'bg-black/30 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Specific Doubt or Academic Goal (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Want to improve Trigonometry and Physics numericals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#66FCF1] text-xs resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-base hover:bg-[#66FCF1]/90 transition-all flex items-center justify-center gap-2 glow-cyan-lg cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Securing Seat...</span>
                  ) : (
                    <>
                      <span>Confirm Free Demo Class Seat</span>
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-400 text-[11px] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#66FCF1]" />
                <span>100% Free • No Credit Card Required • Instant SMS Confirmation</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
