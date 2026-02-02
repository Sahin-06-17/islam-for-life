"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, Loader2, Share2, Copy } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContexts';
import { muslimBooks } from '@/lib/muslimBooks';

type Hadith = {
  hadithnumber: number;
  text: string;
};

export default function MuslimReader() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);

  const bookInfo = muslimBooks.find(b => b.id === Number(id));
  const bookName = language === 'bn' ? bookInfo?.name_bn : bookInfo?.name;

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    // Dynamic API: eng-muslim or ben-muslim
    const edition = language === 'bn' ? 'ben-muslim' : 'eng-muslim';

    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${edition}/sections/${id}.json`)
      .then(res => res.json())
      .then(data => {
        if (data.hadiths) {
          setHadiths(data.hadiths);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id, language]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/muslim">
            <div className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </div>
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{t('muslim')}</span>
            <h1 className="text-sm font-bold text-white truncate max-w-[200px]">{bookName || `${t('book_of')} ${id}`}</h1>
          </div>
        </div>
      </header>

      {/* Hadith List */}
      <div className="max-w-2xl mx-auto p-4 space-y-4 pb-20">
        
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-yellow-500" />
          </div>
        ) : (
          hadiths.map((h) => (
            <div key={h.hadithnumber} className="relative p-6 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-yellow-500/20 transition-all group">
              
              {/* Badge */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                  {t('hadith_no')} {h.hadithnumber}
                </span>
                
                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-yellow-500">
                     <Copy className="h-3 w-3" />
                   </button>
                   <button className="p-1.5 rounded-full bg-zinc-800 text-zinc-400 hover:text-yellow-500">
                     <Share2 className="h-3 w-3" />
                   </button>
                </div>
              </div>

              {/* Text */}
              <div>
                <p className="text-md text-zinc-300 leading-relaxed font-serif">
                  {h.text}
                </p>
              </div>

            </div>
          ))
        )}
      </div>
    </main>
  );
}