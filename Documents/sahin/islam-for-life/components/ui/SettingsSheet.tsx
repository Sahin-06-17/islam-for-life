"use client";

import { useState, useEffect } from 'react';
import { Settings, Volume2, VolumeX } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from '@/contexts/LanguageContexts';
import { cn } from '@/lib/utils';

export default function SettingsSheet() {
  const { t, language, setLanguage, madhab, setMadhab } = useLanguage();
  const [adhanEnabled, setAdhanEnabled] = useState(false);

  // Load Adhan state
  useEffect(() => {
    const savedAdhan = localStorage.getItem('adhan-enabled');
    setAdhanEnabled(savedAdhan === 'true');
  }, []);

  const toggleAdhan = () => {
    const newState = !adhanEnabled;
    setAdhanEnabled(newState);
    localStorage.setItem('adhan-enabled', newState.toString());
    window.dispatchEvent(new Event('storage-update'));

    if (newState) {
       const testAudio = new Audio('https://www.islamcan.com/audio/adhan/azan2.mp3');
       testAudio.volume = 0.2;
       testAudio.play().catch(() => {});
       setTimeout(() => testAudio.pause(), 2000);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 rounded-full bg-zinc-800/50 border border-white/10 text-white hover:bg-zinc-800 transition-colors backdrop-blur-md">
          <Settings className="h-5 w-5" />
        </button>
      </SheetTrigger>
      
      <SheetContent className="bg-zinc-950 border-white/10 text-white w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white uppercase tracking-widest font-bold">
            Settings
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8">
          
          {/* LANGUAGE */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Language
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['en', 'bn', 'hi', 'ur'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang as any)}
                  className={cn(
                    "p-3 rounded-xl border text-sm font-bold capitalize transition-all",
                    language === lang 
                      ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" 
                      : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-800"
                  )}
                >
                  {lang === 'en' ? 'English' : lang === 'bn' ? 'বাংলা' : lang === 'hi' ? 'हिंदी' : 'اردو'}
                </button>
              ))}
            </div>
          </div>

          {/* MADHAB */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Calculation Method
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMadhab('hanafi')}
                className={cn(
                  "p-3 rounded-xl border text-sm font-bold transition-all",
                  madhab === 'hanafi' 
                     ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" 
                     : "bg-zinc-900/50 border-white/5 text-zinc-400"
                )}
              >
                Hanafi
              </button>
              <button
                onClick={() => setMadhab('shafi')}
                className={cn(
                  "p-3 rounded-xl border text-sm font-bold transition-all",
                  madhab === 'shafi' 
                     ? "bg-yellow-500/10 border-yellow-500 text-yellow-500" 
                     : "bg-zinc-900/50 border-white/5 text-zinc-400"
                )}
              >
                Shafi/Maliki
              </button>
            </div>
          </div>

          {/* ADHAN */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 ml-1">
              <Volume2 className="h-3.5 w-3.5" /> {t('enable_adhan')}
            </h3>
            
            <button
              onClick={toggleAdhan}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl border transition-all text-sm",
                adhanEnabled 
                  ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-500" 
                  : "bg-zinc-900/50 border-white/5 text-zinc-400"
              )}
            >
              <div className="flex items-center gap-3">
                {adhanEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                <span className="font-bold">
                  {adhanEnabled ? t('adhan_enabled') : t('adhan_disabled')}
                </span>
              </div>
              
              <div className={cn(
                "w-10 h-5 rounded-full relative transition-colors",
                adhanEnabled ? "bg-yellow-500" : "bg-zinc-700"
              )}>
                <div className={cn(
                  "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
                  adhanEnabled ? "left-6" : "left-1"
                )} />
              </div>
            </button> 
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}