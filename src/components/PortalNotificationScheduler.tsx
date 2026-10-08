import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellRing, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Play, 
  Sparkles, 
  Trash2,
  Volume2,
  ShieldCheck
} from 'lucide-react';

interface ScheduledReminder {
  id: string;
  title: string;
  category: 'Demo Class' | 'Assignment' | 'Exam' | 'Study Alarm';
  timeLabel: string;
  minutesUntil: number;
  isEnabled: boolean;
}

export const PortalNotificationScheduler: React.FC = () => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [reminders, setReminders] = useState<ScheduledReminder[]>([
    {
      id: 'rem-1',
      title: 'Class 10 Optics Live Demo Class',
      category: 'Demo Class',
      timeLabel: 'Today at 05:00 PM',
      minutesUntil: 15,
      isEnabled: true
    },
    {
      id: 'rem-2',
      title: 'Maths Quadratic Equations Assignment Due',
      category: 'Assignment',
      timeLabel: 'Tomorrow at 08:00 PM',
      minutesUntil: 120,
      isEnabled: true
    },
    {
      id: 'rem-3',
      title: 'Board Sprint Full Mock Diagnostic Exam',
      category: 'Exam',
      timeLabel: 'Saturday at 04:00 PM',
      minutesUntil: 1440,
      isEnabled: true
    },
    {
      id: 'rem-4',
      title: 'Daily 2-Hour Physics Dedicated Study Goal',
      category: 'Study Alarm',
      timeLabel: 'Daily at 06:00 PM',
      minutesUntil: 60,
      isEnabled: false
    }
  ]);

  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState('');
  const [newReminderCategory, setNewReminderCategory] = useState<'Demo Class' | 'Assignment' | 'Exam' | 'Study Alarm'>('Demo Class');

  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const requestBrowserPermission = async () => {
    if ('Notification' in window) {
      const res = await Notification.requestPermission();
      setPermissionStatus(res);
      if (res === 'granted') {
        showNativeNotification('Nexis Academy Reminders Enabled! 🚀', 'You will receive timely alerts for upcoming demo classes and assignment deadlines.');
      }
    } else {
      triggerInAppAlert('Browser Notifications not supported in this window. Fallback active alerts enabled!');
    }
  };

  const showNativeNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico'
        });
      } catch {
        // Fallback to in-app toast
        triggerInAppAlert(`${title}: ${body}`);
      }
    } else {
      triggerInAppAlert(`${title}: ${body}`);
    }
  };

  const triggerInAppAlert = (msg: string) => {
    setActiveAlert(msg);
    setTimeout(() => setActiveAlert(null), 5000);
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isEnabled: !r.isEnabled } : r))
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const handleTestNotification = () => {
    showNativeNotification(
      '⏰ Upcoming Demo Class Reminder',
      'Your Class 10 Light Optics & Physics Numerical demo session starts in 15 minutes! Get ready with your notebook.'
    );
  };

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReminderTitle.trim()) return;

    const newRem: ScheduledReminder = {
      id: `rem-${Date.now()}`,
      title: newReminderTitle,
      category: newReminderCategory,
      timeLabel: newReminderTime || 'Scheduled Custom Alarm',
      minutesUntil: 30,
      isEnabled: true
    };

    setReminders((prev) => [newRem, ...prev]);
    setNewReminderTitle('');
    setNewReminderTime('');
    triggerInAppAlert(`Scheduled reminder added for "${newReminderTitle}"`);
  };

  return (
    <div className="seo-3d-card p-6 sm:p-8 space-y-6 relative overflow-hidden">
      
      {/* Fallback Banner Alert Toast */}
      {activeAlert && (
        <div className="p-4 rounded-xl bg-[#66FCF1]/20 border border-[#66FCF1] text-white text-xs font-mono flex items-center justify-between gap-3 shadow-[0_0_30px_rgba(102,252,241,0.3)] animate-fade-in">
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-[#66FCF1] animate-bounce shrink-0" />
            <span>{activeAlert}</span>
          </div>
          <button onClick={() => setActiveAlert(null)} className="text-gray-400 hover:text-white font-bold">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-heading font-extrabold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#66FCF1]" />
              <span>Scheduled Class & Deadline Reminders</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#66FCF1]/15 border border-[#66FCF1]/30 text-[#66FCF1] text-[10px] font-mono font-bold uppercase tracking-wider">
              Smart Alerts
            </span>
          </div>
          <p className="text-xs text-gray-300 font-mono mt-1">
            Receive automated browser alerts for upcoming live demo classes, assignment submissions, and mock exam schedules.
          </p>
        </div>

        {/* Browser Permission Controls & Test Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          {permissionStatus !== 'granted' ? (
            <button
              onClick={requestBrowserPermission}
              className="px-4 py-2 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(102,252,241,0.3)] hover:scale-105 transition-all cursor-pointer"
            >
              <BellRing className="w-4 h-4" />
              <span>Enable Browser Alerts</span>
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Browser Alerts Active</span>
            </span>
          )}

          <button
            onClick={handleTestNotification}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Test notification dispatch right now"
          >
            <Play className="w-3.5 h-3.5 text-[#66FCF1]" />
            <span>Test Alert Now</span>
          </button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {reminders.map((rem) => (
          <div
            key={rem.id}
            className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
              rem.isEnabled
                ? 'bg-black/50 border-[#66FCF1]/30 shadow-[0_0_15px_rgba(102,252,241,0.1)]'
                : 'bg-black/20 border-white/10 opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                  rem.category === 'Demo Class'
                    ? 'bg-[#66FCF1]/10 text-[#66FCF1] border-[#66FCF1]/30'
                    : rem.category === 'Assignment'
                      ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      : rem.category === 'Exam'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}>
                  {rem.category}
                </span>
                <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#66FCF1]" />
                  {rem.timeLabel}
                </span>
              </div>

              <h4 className="font-heading font-bold text-sm text-white">{rem.title}</h4>
            </div>

            {/* Toggle Switch & Delete */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => toggleReminder(rem.id)}
                className={`w-11 h-6 rounded-full transition-colors p-0.5 relative cursor-pointer ${
                  rem.isEnabled ? 'bg-[#66FCF1]' : 'bg-gray-700'
                }`}
                title={rem.isEnabled ? "Disable Reminder" : "Enable Reminder"}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-[#0B0C10] shadow-md transform transition-transform ${
                    rem.isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>

              <button
                onClick={() => deleteReminder(rem.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                title="Remove Reminder"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Reminder Form */}
      <div className="pt-4 border-t border-white/10">
        <h4 className="text-xs font-mono font-bold text-[#66FCF1] uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Plus className="w-4 h-4" />
          <span>Add Custom Deadline or Class Schedule Reminder</span>
        </h4>

        <form onSubmit={handleAddReminder} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <input
            type="text"
            placeholder="Reminder title (e.g. Chemistry Formula Practice)"
            value={newReminderTitle}
            onChange={(e) => setNewReminderTitle(e.target.value)}
            className="sm:col-span-5 px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#66FCF1]"
          />

          <input
            type="text"
            placeholder="Time (e.g. Friday 7:00 PM)"
            value={newReminderTime}
            onChange={(e) => setNewReminderTime(e.target.value)}
            className="sm:col-span-4 px-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#66FCF1]"
          />

          <select
            value={newReminderCategory}
            onChange={(e) => setNewReminderCategory(e.target.value as any)}
            className="sm:col-span-2 px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#66FCF1]"
          >
            <option value="Demo Class">Demo Class</option>
            <option value="Assignment">Assignment</option>
            <option value="Exam">Exam</option>
            <option value="Study Alarm">Study Alarm</option>
          </select>

          <button
            type="submit"
            className="sm:col-span-1 px-3 py-2 rounded-xl bg-[#66FCF1] text-[#0B0C10] font-heading font-extrabold text-xs flex items-center justify-center hover:bg-[#66FCF1]/90 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
