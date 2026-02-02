"use client";

import { useState } from 'react';
import { 
  ChevronLeft, Heart, Sparkles, Shield, Zap, Users, 
  ShoppingBag, Shirt, Utensils, Moon, Briefcase 
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContexts';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { duasData } from '@/lib/duasData';

export default function DuasPage() {
  const { t, language } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeCategory, setActiveCategory] = useState('all');

  // Define Categories with Icons
  const categories = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'business', label: t('business'), icon: Briefcase },
    { id: 'protection', label: t('protection'), icon: Shield },
    { id: 'marriage', label: t('marriage'), icon: Users },
    { id: 'clothing', label: t('clothing'), icon: Shirt },
    { id: 'food', label: t('food'), icon: Utensils },
    { id: 'fasting', label: t('fasting'), icon: Moon },
    { id: 'guidance', label: t('guidance'), icon: Zap },
    { id: 'charity_cat', label: t('charity_cat'), icon: ShoppingBag },
  ];

  const filteredDuas = activeCategory === 'all' 
    ? duasData 
    : duasData.filter(d => d.category === activeCategory);

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </div>
          </Link>
          <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-300">{t('duas')}</h1>
        </div>
      </header>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="p-4 overflow-x-auto no-scrollbar flex gap-2 pb-6 border-b border-white/5 bg-zinc-900/20">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all border",
                isActive 
                  ? "bg-yellow-500 text-black border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.4)]" 
                  : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-yellow-500/30 hover:text-white"
              )}
            >
              <Icon className="h-3 w-3" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Duas Grid */}
      <div className="max-w-md mx-auto px-4 pt-6 pb-20 space-y-4">
        {filteredDuas.map((dua) => {
          
          // SMART TRANSLATION SELECTOR
          let translationText = dua.translation_en;
          if (language === 'bn' && dua.translation_bn) translationText = dua.translation_bn;
          if (language === 'hi' && dua.translation_hi) translationText = dua.translation_hi;
          if (language === 'ur' && dua.translation_ur) translationText = dua.translation_ur;
          
          // Favorites Logic
          const favId = `dua-${dua.id}`;
          const isFav = isFavorite(favId);
          
          // SAFE REFERENCE (Prevents crash if ref is missing)
          const safeRef = dua.ref || "General Dua"; 

          return (
            <motion.div 
              key={dua.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="group relative p-6 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-yellow-500/20 transition-all"
            >
              <div className="absolute top-4 left-4 opacity-10">
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </div>

              {/* Heart Button */}
              <button 
                onClick={() => toggleFavorite({
                  id: favId,
                  type: 'dua',
                  title: safeRef, // <--- USE SAFE REF
                  subtitle: translationText?.substring(0, 40) + "...",
                  link: '/duas',
                  timestamp: Date.now()
                })}
                className="absolute top-4 right-4 p-2 z-10"
              >
                <Heart className={cn("h-5 w-5 transition-colors", isFav ? "fill-red-500 text-red-500" : "text-zinc-600 hover:text-zinc-400")} />
              </button>

              {/* Reference Badge (SAFE CHECK ADDED) */}
              <div className="flex justify-end mb-4 pt-6">
                <span className={cn(
                  "text-[10px] font-mono px-2 py-1 rounded-full border",
                  safeRef.includes("Bukhari") || safeRef.includes("Muslim") 
                    ? "text-blue-400 bg-blue-500/10 border-blue-500/20" 
                    : "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                )}>
                  {safeRef}
                </span>
              </div>

              {/* Arabic */}
              <div className="text-right mb-4" dir="rtl">
                <p className="text-2xl font-arabic leading-loose text-white group-hover:text-yellow-100 transition-colors">
                  {dua.arabic}
                </p>
              </div>

              {/* Translation */}
              <div className="pt-4 border-t border-white/5">
                <p className={cn(
                  "text-sm text-zinc-400 leading-relaxed italic",
                  language === 'bn' ? "font-sans" : "font-serif"
                )}>
                  "{translationText}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </main>
  );
}