"use client";

import { ChevronLeft, Heart, ArrowRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContexts';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function FavoritesPage() {
  const { t } = useLanguage();
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center gap-4">
        <Link href="/">
          <div className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </div>
        </Link>
        <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-300">{t('favorites')}</h1>
      </header>

      {/* List */}
      <div className="max-w-md mx-auto p-4 space-y-3 pb-20">
        
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
            <Heart className="h-12 w-12 text-zinc-600" />
            <p className="text-sm text-zinc-500 max-w-[200px]">{t('no_favorites')}</p>
          </div>
        ) : (
          favorites.map((item) => (
            <div key={item.id} className="group relative flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-yellow-500/30 hover:bg-zinc-900 transition-all">
              
              <Link href={item.link} className="flex-1">
                <div className="flex flex-col">
                  {/* Badge */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500 mb-1">{item.type}</span>
                  <h3 className="font-bold text-white text-md group-hover:text-yellow-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-500 truncate max-w-[250px]">
                    {item.subtitle}
                  </p>
                </div>
              </Link>

              {/* Delete Button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
                className="p-2 text-zinc-600 hover:text-red-500 transition-colors z-10"
              >
                <Trash2 className="h-4 w-4" />
              </button>

            </div>
          ))
        )}
      </div>
    </main>
  );
}