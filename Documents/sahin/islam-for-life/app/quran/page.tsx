"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, Search, BookOpen, MapPin, Heart } from 'lucide-react';
import Link from 'next/link';
// CHECK YOUR PATH: Usually it is '@/context/LanguageContext' (singular)
import { useLanguage } from '@/contexts/LanguageContexts'; 
import { useFavorites } from '@/contexts/FavoritesContext';
import { cn } from '@/lib/utils';

type Chapter = {
  id: number;
  name_simple: string;
  name_arabic: string;
  verses_count: number;
  revelation_place: string;
};

export default function QuranIndex() {
  const { t } = useLanguage();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    fetch('https://api.quran.com/api/v4/chapters')
      .then(res => res.json())
      .then(data => {
        setChapters(data.chapters);
        setLoading(false);
      });
  }, []);

  const filtered = chapters.filter(c => 
    c.name_simple.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toString().includes(search)
  );

  return (
    // 1. UPDATED: Dynamic Background & Text Color
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-yellow-500/30 transition-colors duration-300">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/5 p-4 space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="p-2 rounded-full border transition-colors bg-zinc-100 border-zinc-200 hover:bg-zinc-200 dark:bg-zinc-900 dark:border-white/10 dark:hover:bg-zinc-800">
              <ChevronLeft className="h-5 w-5" />
            </div>
          </Link>
          <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-300">{t('quran')}</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            placeholder={t('search_surah')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // 2. UPDATED: Input Field Colors for Light/Dark
            className="w-full rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-yellow-500/50 bg-zinc-100 border-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:border-white/10 dark:text-white placeholder:text-zinc-500"
          />
        </div>
      </header>

      {/* Surah Grid */}
      <div className="max-w-md mx-auto p-4 space-y-3 pb-20">
        {loading ? (
          <div className="text-center text-zinc-500 text-sm mt-10">Loading Surahs...</div>
        ) : (
          filtered.map((surah) => {
            const favId = `surah-${surah.id}`;
            const isFav = isFavorite(favId);
            
            return (
              <div key={surah.id} className="relative group">
                <Link href={`/quran/${surah.id}`}>
                  {/* 3. UPDATED: Card Colors for Light/Dark */}
                  <div className="flex items-center justify-between p-4 rounded-2xl transition-all border bg-white border-zinc-200 hover:border-yellow-500/50 hover:bg-zinc-50 dark:bg-zinc-900/50 dark:border-white/5 dark:hover:bg-zinc-900">
                    
                    <div className="flex items-center gap-4">
                      {/* Number Badge */}
                      <div className="relative h-10 w-10 flex items-center justify-center">
                        <div className="absolute inset-0 bg-yellow-500/10 rounded-full rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        <span className="text-sm font-bold text-yellow-600 dark:text-yellow-500 font-mono">{surah.id}</span>
                      </div>

                      <div>
                        {/* Surah Name */}
                        <h3 className="font-bold text-lg transition-colors text-zinc-800 group-hover:text-yellow-600 dark:text-white dark:group-hover:text-yellow-500">
                          {surah.name_simple}
                        </h3>
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider font-medium text-zinc-500 dark:text-zinc-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" /> {surah.verses_count} {t('verses')}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {surah.revelation_place === 'makkah' ? t('mecca') : t('medina')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-arabic transition-colors text-zinc-300 group-hover:text-zinc-400 dark:text-zinc-600 dark:group-hover:text-zinc-300">
                        {surah.name_arabic}
                      </span>
                    </div>

                  </div>
                </Link>

                {/* Heart Button */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFavorite({
                      id: favId,
                      type: 'surah',
                      title: surah.name_simple,
                      subtitle: surah.name_arabic,
                      link: `/quran/${surah.id}`,
                      timestamp: Date.now()
                    });
                  }}
                  className="absolute top-2 right-2 p-2 z-10"
                >
                  <Heart 
                    className={cn(
                      "h-5 w-5 transition-colors", 
                      isFav 
                        ? "fill-red-500 text-red-500" 
                        : "text-zinc-400 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-400"
                    )} 
                  />
                </button>

              </div>
            );
          })
        )}
      </div>
    </main>
  );
}