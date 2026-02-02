"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, Share2, PlayCircle, Loader2, ChevronDown, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContexts';

type Verse = {
  id: number;
  verse_key: string;
  text_uthmani?: string;
  translations?: { resource_id: number; text: string }[];
};

export default function SurahReader() {
  const { id } = useParams();
  const { t, language } = useLanguage(); // <--- Get current language
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // --- SMART TRANSLATION SELECTOR ---
  const getTranslationId = (lang: string) => {
    switch (lang) {
      case 'bn': return 161; // Bengali (Muhiuddin Khan)
      case 'ur': return 234; // Urdu (Fatih Muhammad Jalandhry)
      case 'hi': return 122; // Hindi (Muhammad Farooq Khan)
      default: return 85;    // English (Abdel Haleem)
    }
  };

  const fetchVerses = (pageNumber: number, reset = false) => {
    if (!id) return;
    setLoading(true);

    const translationId = getTranslationId(language);

    // Fetch Uthmani Arabic + Dynamic Translation ID
    const url = `https://api.quran.com/api/v4/verses/by_chapter/${id}?words=false&translations=${translationId}&fields=text_uthmani&per_page=50&page=${pageNumber}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.verses && data.verses.length > 0) {
          setVerses(prev => (pageNumber === 1 || reset) ? data.verses : [...prev, ...data.verses]);
          
          if (data.verses.length < 50) setHasMore(false);
          if (data.pagination && data.pagination.next_page === null) setHasMore(false);
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Quran API Error:", err);
        setLoading(false);
      });
  };

  // Re-fetch when ID or LANGUAGE changes
  useEffect(() => {
    setPage(1);
    setVerses([]);
    setHasMore(true);
    fetchVerses(1, true); // True = Reset list
  }, [id, language]); 

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchVerses(nextPage);
  };

  const getTranslation = (verse: Verse) => {
    if (verse.translations && verse.translations.length > 0) {
      return verse.translations[0].text.replace(/<[^>]*>?/gm, '');
    }
    return null;
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/quran">
            <div className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </div>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold uppercase tracking-widest text-zinc-300">{t('surah')} {id}</h1>
            {/* Show current language badge */}
            <span className="text-[10px] text-yellow-500 font-mono uppercase tracking-wide">
              {language === 'bn' ? 'Bengali' : language === 'ur' ? 'Urdu' : language === 'hi' ? 'Hindi' : 'English'}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-6 pb-20">
        
        {/* Bismillah */}
        <div className="text-center py-8">
           <h2 className="text-3xl font-arabic text-yellow-500">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</h2>
        </div>

        {/* Verses */}
        {verses.map((verse) => (
          <div key={verse.id} className="relative p-6 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-yellow-500/20 transition-all group">
            
            {/* Actions */}
            <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-yellow-500 hover:bg-zinc-700">
                <PlayCircle className="h-4 w-4" />
              </button>
              <button className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-yellow-500 hover:bg-zinc-700">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            {/* Verse Badge */}
            <div className="absolute top-4 right-4 h-8 w-8 rounded-full border border-yellow-500/20 flex items-center justify-center">
              <span className="text-xs font-mono text-yellow-500">{verse.verse_key.split(':')[1]}</span>
            </div>

            {/* Arabic Text */}
            <div className="mb-6 mt-8 text-right" dir="rtl">
              <p className="text-3xl font-arabic leading-[2.5] text-white">
                {verse.text_uthmani}
              </p>
            </div>

            {/* Translation */}
            <div className="pt-6 border-t border-white/5">
              <p className={`text-lg text-zinc-300 leading-relaxed ${language === 'bn' ? 'font-sans' : language === 'ur' ? 'font-arabic' : 'font-serif'}`}>
                {getTranslation(verse) || (
                   <span className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
                     <AlertCircle className="h-3 w-3" /> {t('loading')}
                   </span>
                )}
              </p>
            </div>

          </div>
        ))}

        {/* Loaders */}
        <div className="text-center pt-8">
          {loading && (
            <div className="flex justify-center mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-yellow-500" />
            </div>
          )}
          
          {!loading && hasMore && verses.length > 0 && (
             <button 
               onClick={loadMore}
               className="px-6 py-3 rounded-full bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-colors flex items-center gap-2 mx-auto"
             >
               Load Next Verses <ChevronDown className="h-4 w-4" />
             </button>
          )}
        </div>

      </div>
    </main>
  );
}