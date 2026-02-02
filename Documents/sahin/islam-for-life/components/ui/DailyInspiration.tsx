"use client";

import { useDailyInspiration } from '@/hooks/useDailyInspiration';
import { Quote, Share2, Bell, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContexts';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function DailyInspiration() {
  const inspiration = useDailyInspiration();
  const { t, language } = useLanguage(); // <--- Get current language
  const [notifStatus, setNotifStatus] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  const requestNotifs = () => {
    if (!('Notification' in window)) {
      alert("This browser does not support notifications.");
      return;
    }
    Notification.requestPermission().then((permission) => {
      setNotifStatus(permission);
      if (permission === 'granted') {
        new Notification("Notifications Enabled!", { body: "You will receive daily quotes." });
      }
    });
  };

  // --- HELPER: Get Correct Language Text ---
  const getLocalizedText = () => {
    if (!inspiration) return "";
    if (language === 'bn') return inspiration.text_bn;
    if (language === 'hi') return inspiration.text_hi;
    if (language === 'ur') return inspiration.text_ur;
    return inspiration.text_en;
  };

  const displayText = getLocalizedText();

  const handleShare = () => {
    if (inspiration) {
      const text = `"${displayText}" - ${inspiration.ref}\n\nSent from Islam For Life App`;
      if (navigator.share) {
        navigator.share({ title: 'Daily Inspiration', text: text });
      } else {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
      }
    }
  };

  if (!inspiration) return null;

  return (
    <div className="relative p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-yellow-500/20 shadow-2xl overflow-hidden group mb-6">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Quote className="h-24 w-24 text-white rotate-180" />
      </div>
      
      <div className="relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-yellow-500/10 text-yellow-500">
              <Quote className="h-3 w-3 fill-current" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">
              {t('daily_inspiration')}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button 
              onClick={requestNotifs}
              className={cn(
                "p-2 rounded-full transition-colors",
                notifStatus === 'granted' ? "text-green-500 bg-green-500/10" : "text-zinc-500 hover:text-white bg-zinc-800/50"
              )}
            >
              {notifStatus === 'granted' ? <Check className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
            </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-full text-zinc-500 hover:text-white bg-zinc-800/50 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {inspiration.arabic && (
            <p className="text-xl font-arabic text-zinc-400 text-right leading-loose">
              {inspiration.arabic}
            </p>
          )}
          
          {/* Display Localized Text */}
          <p className={cn(
            "text-lg text-white leading-relaxed italic",
            language === 'bn' ? "font-sans" : "font-serif"
          )}>
            "{displayText}"
          </p>
          
          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] font-bold text-zinc-500 bg-zinc-800 px-2 py-1 rounded-md">
              {inspiration.type.toUpperCase()}
            </span>
            <span className="text-xs font-medium text-yellow-500/80">
              {inspiration.ref}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}