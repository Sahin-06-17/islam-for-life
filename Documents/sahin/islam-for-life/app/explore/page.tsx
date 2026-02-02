"use client";

import { useState } from 'react';
import { ChevronLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContexts';
import { topicsData } from '@/lib/topicsData';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExplorePage() {
  const { t, language } = useLanguage();
  const [selectedTopic, setSelectedTopic] = useState<typeof topicsData[0] | null>(null);

  // Helper to get label
  const getLabel = (topic: typeof topicsData[0]) => {
    if (language === 'bn') return topic.label_bn;
    if (language === 'hi') return topic.label_hi;
    if (language === 'ur') return topic.label_ur;
    return topic.label_en;
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center gap-4">
        <Link href="/">
          <div className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </div>
        </Link>
        <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-300">{t('explore')}</h1>
      </header>

      <div className="max-w-md mx-auto p-4 pb-20">
        
        {/* Question */}
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-white mb-2">{t('feeling_question')}</h2>
          <p className="text-zinc-500 text-sm">{t('explore_desc')}</p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {topicsData.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                selectedTopic?.id === topic.id 
                  ? 'bg-yellow-500/10 border-yellow-500/50 scale-95' 
                  : 'bg-zinc-900/50 border-white/5 hover:bg-zinc-900'
              }`}
            >
              <span className="text-4xl">{topic.emoji}</span>
              <span className="font-bold text-sm uppercase tracking-wide">
                {getLabel(topic)}
              </span>
            </button>
          ))}
        </div>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {selectedTopic && (
            <motion.div
              key={selectedTopic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-4"
            >
              <h3 className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-4 text-center">
                Quranic Remedy for {getLabel(selectedTopic)}
              </h3>

              {selectedTopic.verses.map((v, i) => (
                <div key={i} className="p-6 rounded-3xl bg-zinc-900 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl text-white">
                    "
                  </div>
                  <p className="text-lg text-zinc-300 font-serif leading-relaxed relative z-10 mb-4">
                    {v.text}
                  </p>
                  <div className="flex justify-end">
                     <span className="text-xs font-mono text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                       {v.ref}
                     </span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}