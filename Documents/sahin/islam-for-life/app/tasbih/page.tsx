"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, RotateCcw, Settings2, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContexts'; // <--- NEW IMPORT

export default function TasbihPage() {
  const { t } = useLanguage(); // <--- USE TRANSLATION HOOK
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tasbih-count');
    if (saved) setCount(parseInt(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tasbih-count', count.toString());
  }, [count]);

  const handleTap = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
    const newCount = count + 1;
    setCount(newCount);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
    if (newCount % target === 0 && typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 50, 30]);
    }
  };

  const circumference = 2 * Math.PI * 120;
  const progress = (count % target) / target;
  const dashOffset = circumference - (progress * circumference);

  return (
    <main className="h-screen w-full bg-zinc-950 text-white overflow-hidden relative selection:bg-yellow-500/30 font-sans flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <header className="relative z-10 flex items-center justify-between p-6">
        <Link href="/">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-3 bg-zinc-900/50 border border-white/10 rounded-full backdrop-blur-md">
            <ChevronLeft className="h-5 w-5 text-white" />
          </motion.div>
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold tracking-[0.3em] text-yellow-500 uppercase">{t('dhikr_counter')}</span>
          <span className="text-xs text-zinc-500 font-mono">{t('target')}: {target}</span>
        </div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); setTarget(target === 33 ? 100 : 33); setCount(0); }} className="p-3 bg-zinc-900/50 border border-white/10 rounded-full backdrop-blur-md text-yellow-500">
          <Settings2 className="h-5 w-5" />
        </motion.button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative z-0" onClick={handleTap}>
        <div className="relative cursor-pointer">
          <AnimatePresence>
            {isPressed && <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.5, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 rounded-full bg-yellow-500/30 blur-xl" />}
          </AnimatePresence>
          <div className="relative h-[320px] w-[320px]">
             <svg className="h-full w-full -rotate-90 transform">
                <circle cx="160" cy="160" r="120" stroke="#27272a" strokeWidth="4" fill="transparent" />
                <motion.circle cx="160" cy="160" r="120" stroke="#eab308" strokeWidth="8" fill="transparent" strokeDasharray={circumference} animate={{ strokeDashoffset: dashOffset }} transition={{ type: "spring", stiffness: 60, damping: 20 }} strokeLinecap="round" style={{ filter: "drop-shadow(0 0 10px rgba(234, 179, 8, 0.6))" }} />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-zinc-900/30 backdrop-blur-sm border border-white/5 shadow-inner">
                <motion.div key={count} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative">
                  <span className="text-8xl font-black tracking-tighter text-white drop-shadow-2xl">{count}</span>
                </motion.div>
                <div className="h-px w-12 bg-white/20 my-4" />
                <div className="flex items-center gap-2 text-yellow-500/80">
                  <Zap className="h-3 w-3 fill-yellow-500" />
                  <span className="text-xs font-bold tracking-widest uppercase">{t('tap_to_count')}</span>
                </div>
             </div>
          </div>
        </div>
        <p className="mt-12 text-zinc-600 text-xs font-mono tracking-widest">{count % target} / {target} {t('completed').toUpperCase()}</p>
      </div>

      <div className="p-8 flex justify-center pb-10">
        <motion.button whileTap={{ scale: 0.95 }} onClick={(e) => { e.stopPropagation(); setCount(0); }} className="flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-colors">
          <RotateCcw className="h-4 w-4" />
          <span className="text-sm font-bold uppercase tracking-wide">{t('reset')}</span>
        </motion.button>
      </div>
    </main>
  );
}