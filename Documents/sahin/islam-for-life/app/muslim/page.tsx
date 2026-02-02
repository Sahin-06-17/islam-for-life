"use client";

import { useState } from 'react';
import { ChevronLeft, Search, ScrollText } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContexts';
import { muslimBooks } from '@/lib/muslimBooks';

export default function MuslimIndex() {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = muslimBooks.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) || 
    (b.name_bn && b.name_bn.includes(search))
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 p-4 space-y-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </div>
          </Link>
          <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-300">{t('muslim')}</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input 
            placeholder="Search Books..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-yellow-500/50 placeholder:text-zinc-700"
          />
        </div>
      </header>

      {/* Books Grid */}
      <div className="max-w-md mx-auto p-4 space-y-3 pb-20">
        {filtered.map((book) => (
          <Link key={book.id} href={`/muslim/${book.id}`}>
            <div className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-yellow-500/30 hover:bg-zinc-900 transition-all">
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:border-yellow-500/50 group-hover:bg-yellow-500/10 transition-all">
                  <span className="text-sm font-bold text-zinc-500 group-hover:text-yellow-500">{book.id}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-md group-hover:text-yellow-500 transition-colors">
                    {language === 'bn' ? book.name_bn : book.name}
                  </h3>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
                     {t('book_of')} {language === 'bn' ? "হাদিস" : "Hadith"}
                  </p>
                </div>
              </div>

              <ScrollText className="h-5 w-5 text-zinc-600 group-hover:text-white transition-colors" />

            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}