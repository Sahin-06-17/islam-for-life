"use client";

import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { CalendarDays, User, Search, Map, Loader2, Heart, Compass, Activity, Calculator, Clock, BookOpen, BookText, Book, ChevronRight, HeartHandshake, ScrollText } from 'lucide-react';
import Link from 'next/link';
import LocationSelector from '@/components/ui/LocationSelector';
import { useLanguage } from '@/contexts/LanguageContexts';
import SettingsSheet from '@/components/ui/SettingsSheet';
import { useUser } from '@/contexts/UserContext';
import DailyInspiration from '@/components/ui/DailyInspiration';

export default function Home() {
  const data = usePrayerTimes();
  const { t } = useLanguage();
  const { user } = useUser();

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-500" />
      </div>
    );
  }

  const gridItems = [
    { href: "/quran", icon: Book, label: 'quran', sub: 'read_quran' },
    { href: "/bukhari", icon: ScrollText, label: 'bukhari', sub: 'hadith' },
    { href: "/muslim", icon: BookText, label: 'muslim', sub: 'hadith' },
    { href: "/prayers", icon: Clock, label: 'prayer_times', sub: 'view_schedule' },
    { href: "/tasbih", icon: Activity, label: 'tasbih', sub: 'tasbih_desc' },
    { href: "/qibla", icon: Compass, label: 'qibla', sub: 'qibla_desc' },
    { href: "/zakat", icon: Calculator, label: 'zakat', sub: 'zakat_desc' },
    { href: "/names", icon: BookOpen, label: 'names_allah', sub: 'names_desc' },
    { href: "/duas", icon: HeartHandshake, label: 'duas', sub: 'duas_desc' },
    { href: "/favorites", icon: Heart, label: 'favorites', sub: 'favorites_desc' },
    { href: "/explore", icon: Search, label: 'explore', sub: 'explore_desc' },
    { href: "/mosques", icon: Map, label: 'mosques', sub: 'mosques_desc' },
    { href: "/calendar", icon: CalendarDays, label: 'calendar', sub: 'hijri' },
  ];

  return (
    <main className="min-h-screen font-sans text-white selection:bg-yellow-500/30 relative">

      {/* HEADER */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-3">
        <Link href="/profile">
           <div className={`h-10 w-10 rounded-full flex items-center justify-center border border-white/10 shadow-lg cursor-pointer hover:scale-105 transition-transform ${user.avatarColor}`}>
             <span className="text-sm font-bold text-white uppercase">
               {user.isGuest ? <User className="h-5 w-5" /> : user.name[0]}
             </span>
           </div>
        </Link>
        {!user.isGuest && (
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              {t('salam')}
            </span>
            <span className="text-sm font-black text-white leading-none">
              {user.name}
            </span>
          </div>
        )}
      </div>
      
      <div className="absolute top-4 right-4 z-50">
        <SettingsSheet />
      </div>

      {/* HERO SECTION */}
      <div className="relative flex flex-col items-center justify-center pt-20 pb-12">
        <div className="mb-6">
          <LocationSelector currentCity={data.city} />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">
            {t('next_prayer')}
          </p>
          <h1 className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
            {data.countdown}
          </h1>
          <p className="mt-2 text-xl font-bold text-yellow-500 capitalize tracking-wide">
            {t(data.next as any)}
          </p>
        </div>
      </div>

      {/* DAILY INSPIRATION */}
      <div className="px-6 pb-6 max-w-md mx-auto">
        <DailyInspiration />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-3 px-6 pb-6 max-w-md mx-auto">
        {gridItems.map((item, idx) => {
          const Icon = item.icon;
          const isWide = item.href === "/quran" || item.href === "/bukhari" || item.href === "/muslim";
          
          return (
            <Link key={idx} href={item.href} className={isWide ? "col-span-2" : ""}>
              <div className={`
                group relative flex p-4 rounded-2xl transition-all overflow-hidden
                ${isWide ? 'items-center justify-between h-24' : 'flex-col items-start justify-between h-28'}
                bg-zinc-900/50 border border-white/5 hover:border-yellow-500/30 hover:bg-zinc-900
              `}>
                
                {/* Content */}
                <div className={`flex ${isWide ? 'items-center gap-4' : 'flex-col items-start gap-2'} relative z-10`}>
                  
                  {/* Icon Circle */}
                  <div className="p-2 rounded-full transition-colors bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black">
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  {/* Text */}
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      {t(item.label as any)}
                    </h3>
                    <p className="text-[10px] uppercase tracking-wider font-bold transition-colors text-zinc-500 group-hover:text-yellow-500/80">
                      {t(item.sub as any)}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                {isWide && (
                  <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-white transition-colors" />
                )}
                
                {/* Decorative Icon */}
                {!isWide && (
                  <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon className="h-12 w-12 text-yellow-500" />
                  </div>
                )}

              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}