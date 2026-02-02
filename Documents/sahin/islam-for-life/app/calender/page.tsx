"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, Calendar as CalendarIcon, Moon, Info } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContexts';
import { format } from 'date-fns';
import { getHijriDate, getHijriParts, islamicEvents } from '@/lib/calendarUtils';
import { cn } from '@/lib/utils';

export default function CalendarPage() {
  const { t } = useLanguage();
  const [todayHijri, setTodayHijri] = useState("");
  const [sortedEvents, setSortedEvents] = useState<any[]>([]);

  useEffect(() => {
    const now = new Date();
    
    // 1. Set Today's formatted string
    setTodayHijri(getHijriDate(now));

    // 2. Calculate Upcoming Events
    const current = getHijriParts(now);
    
    // Map events to determine if they are passed or upcoming in current Hijri year
    const processed = islamicEvents.map(ev => {
      let status = 'upcoming';
      
      // If month passed, or same month but day passed -> it's next year
      if (current.month > ev.month || (current.month === ev.month && current.day > ev.day)) {
        status = 'passed';
      } else if (current.month === ev.month && current.day === ev.day) {
        status = 'today';
      }

      // Calculate rough days remaining (Approximation)
      // A precise calculation requires complex libraries, this is a simple UI sorter
      const monthDiff = ev.month - current.month;
      const dayDiff = ev.day - current.day;
      const score = (status === 'passed' ? 12 : 0) + monthDiff + (dayDiff / 30);

      return { ...ev, status, score };
    });

    // Sort: Upcoming/Today first, then passed events (which are logically next year)
    processed.sort((a, b) => a.score - b.score);

    setSortedEvents(processed);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center gap-4">
        <Link href="/">
          <div className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </div>
        </Link>
        <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-300">{t('calendar')}</h1>
      </header>

      <div className="max-w-md mx-auto p-4 pb-20 space-y-6">
        
        {/* Today's Card */}
        <div className="relative p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-yellow-500/20 shadow-xl overflow-hidden text-center space-y-2">
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <Moon className="h-32 w-32 text-white" />
           </div>

           <p className="text-xs font-bold text-yellow-500 uppercase tracking-widest">{t('today_is')}</p>
           
           <h2 className="text-3xl font-black text-white leading-tight">
             {todayHijri}
           </h2>
           
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-white/5 mt-2">
             <CalendarIcon className="h-3 w-3 text-zinc-400" />
             <span className="text-xs font-mono text-zinc-400">
               {format(new Date(), 'dd MMMM yyyy')}
             </span>
           </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
          <Info className="h-4 w-4 text-blue-500 mt-0.5" />
          <p className="text-[10px] text-zinc-400 leading-relaxed">
            {t('event_disclaimer')}
          </p>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 ml-1">
            {t('upcoming_events')}
          </h3>
          
          <div className="space-y-3">
            {sortedEvents.map((ev) => {
              const isNext = ev.status !== 'passed' && sortedEvents.indexOf(ev) === 0;
              
              return (
                <div 
                  key={ev.key}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl border transition-all",
                    isNext 
                      ? "bg-yellow-500/10 border-yellow-500/50" 
                      : "bg-zinc-900/30 border-white/5 opacity-80"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm",
                      isNext ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-500"
                    )}>
                      {ev.day}
                    </div>
                    <div>
                      <h4 className={cn("font-bold text-sm", isNext ? "text-white" : "text-zinc-400")}>
                        {t(ev.key as any)}
                      </h4>
                      {isNext && (
                         <span className="text-[10px] text-yellow-500 uppercase tracking-wider font-bold">
                           Next Major Event
                         </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}