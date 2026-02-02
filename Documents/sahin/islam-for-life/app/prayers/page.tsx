"use client";

import { useState } from 'react';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';
import { format, addDays } from 'date-fns';
import { ChevronLeft, CalendarDays, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContexts';

export default function PrayersPage() {
  const data = usePrayerTimes();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'today' | 'month'>('today');

  if (!data) return null;

  // --- GENERATE 30 DAYS DATA ---
  const generateMonthSchedule = () => {
    // 1. Recover saved location settings just like the hook does
    const savedLoc = typeof window !== 'undefined' ? localStorage.getItem('user-location') : null;
    const loc = savedLoc ? JSON.parse(savedLoc) : { lat: 22.5726, lng: 88.3639 }; // Default Kolkata
    
    const savedMadhab = typeof window !== 'undefined' ? localStorage.getItem('user-madhab') : null;
    const madhab = savedMadhab === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;

    const coords = new Coordinates(loc.lat, loc.lng);
    const params = CalculationMethod.Karachi();
    params.madhab = madhab;

    const days = [];
    const today = new Date();

    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i);
      const prayers = new PrayerTimes(coords, date, params);
      days.push({
        date: date,
        fajr: prayers.fajr,
        dhuhr: prayers.dhuhr,
        asr: prayers.asr,
        maghrib: prayers.maghrib,
        isha: prayers.isha
      });
    }
    return days;
  };

  const monthSchedule = generateMonthSchedule();

  const prayerList = [
    { name: 'fajr', time: data.prayers.fajr },
    { name: 'dhuhr', time: data.prayers.dhuhr },
    { name: 'asr', time: data.prayers.asr },
    { name: 'maghrib', time: data.prayers.maghrib },
    { name: 'isha', time: data.prayers.isha },
  ];

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <header className="flex items-center gap-4 p-6 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/">
          <div className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </div>
        </Link>
        <div>
          <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-300">{t('prayer_times')}</h1>
          <p className="text-[10px] text-zinc-500 font-mono uppercase">{data.city}</p>
        </div>
      </header>

      {/* TABS */}
      <div className="flex justify-center p-4">
        <div className="flex bg-zinc-900 rounded-full p-1 border border-white/10">
          <button 
            onClick={() => setActiveTab('today')}
            className={cn("px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all", activeTab === 'today' ? "bg-zinc-800 text-white shadow" : "text-zinc-500 hover:text-zinc-300")}
          >
            Today
          </button>
          <button 
            onClick={() => setActiveTab('month')}
            className={cn("px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all", activeTab === 'month' ? "bg-zinc-800 text-white shadow" : "text-zinc-500 hover:text-zinc-300")}
          >
            {t('monthly_schedule')}
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-20">
        
        {/* --- VIEW: TODAY --- */}
        {activeTab === 'today' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mb-6">
              <CalendarDays className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-bold text-yellow-500 tracking-wide">
                {format(new Date(), 'EEEE, d MMMM yyyy')}
              </span>
            </div>

            {prayerList.map((p) => {
              const isNext = data.next === p.name;
              return (
                <div key={p.name} className={cn("group relative flex items-center justify-between p-5 rounded-2xl transition-all duration-300", isNext ? "bg-zinc-900/80 border border-yellow-500/50 shadow-[0_0_40px_-10px_rgba(234,179,8,0.2)] scale-105 z-10" : "bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50")}>
                  {isNext && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>}
                  <div className="flex items-center gap-4 ml-2">
                    <div>
                      <h3 className={cn("text-lg font-bold capitalize tracking-tight", isNext ? "text-white" : "text-zinc-500 group-hover:text-zinc-300")}>{t(p.name as any)}</h3>
                      {isNext && <span className="text-xs text-yellow-500 font-medium">{t('up_next')}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn("text-2xl font-mono tracking-tighter", isNext ? "text-yellow-400" : "text-zinc-600")}>{format(p.time, 'hh:mm')}</span>
                    <span className={cn("text-sm font-medium uppercase", isNext ? "text-yellow-600" : "text-zinc-700")}>{format(p.time, 'a')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- VIEW: MONTHLY SCHEDULE --- */}
        {activeTab === 'month' && (
          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-zinc-900/30">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-wider font-bold border-b border-white/5">
                <tr>
                  <th className="p-4">{t('date')}</th>
                  <th className="p-4">{t('fajr')}</th>
                  <th className="p-4">{t('dhuhr')}</th>
                  <th className="p-4">{t('asr')}</th>
                  <th className="p-4">{t('maghrib')}</th>
                  <th className="p-4">{t('isha')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {monthSchedule.map((day, i) => (
                  <tr key={i} className={cn("hover:bg-zinc-800/50 transition-colors", i === 0 && "bg-yellow-500/5")}>
                    <td className="p-4 font-bold text-zinc-300 whitespace-nowrap">
                      {format(day.date, 'dd MMM')}
                    </td>
                    <td className="p-4 text-zinc-400 font-mono">{format(day.fajr, 'HH:mm')}</td>
                    <td className="p-4 text-zinc-400 font-mono">{format(day.dhuhr, 'HH:mm')}</td>
                    <td className="p-4 text-zinc-400 font-mono">{format(day.asr, 'HH:mm')}</td>
                    <td className="p-4 text-zinc-400 font-mono">{format(day.maghrib, 'HH:mm')}</td>
                    <td className="p-4 text-zinc-400 font-mono">{format(day.isha, 'HH:mm')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </main>
  );
}