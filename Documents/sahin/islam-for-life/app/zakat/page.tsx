"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, TrendingUp, DollarSign, Wallet } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContexts'; // <--- NEW IMPORT

export default function ZakatPage() {
  const { t } = useLanguage(); // <--- USE TRANSLATION HOOK
  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState({ gold: 7650, silver: 92 });
  const [cash, setCash] = useState(0);
  const [goldGrams, setGoldGrams] = useState(0);
  const [liabilities, setLiabilities] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRates({ gold: 7820, silver: 94 });
      setLoading(false);
    }, 1500);
  }, []);

  const goldValue = goldGrams * rates.gold;
  const totalAssets = cash + goldValue;
  const netWealth = Math.max(0, totalAssets - liabilities);
  const nisabGold = 87.48 * rates.gold;
  const percentage = Math.min(100, (netWealth / nisabGold) * 100);
  const isEligible = netWealth >= nisabGold;
  const zakatDue = isEligible ? netWealth * 0.025 : 0;

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20 font-sans selection:bg-yellow-500/30">
      <header className="flex items-center gap-4 p-6 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/">
          <div className="p-2 bg-zinc-900 rounded-full border border-white/10">
            <ChevronLeft className="h-5 w-5" />
          </div>
        </Link>
        <h1 className="text-lg font-bold uppercase tracking-widest">{t('smart_zakat')}</h1>
      </header>

      <div className="max-w-md mx-auto p-6 space-y-8">
        <div className="relative pt-6 pb-2">
           <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
             <span>$0</span>
             <span>{t('nisab_threshold')} (₹{Math.round(nisabGold/1000)}k)</span>
           </div>
           
           <div className="h-4 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 relative">
              <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 shadow-[0_0_10px_red]" style={{ left: '100%' }} /> 
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ type: "spring", stiffness: 50 }}
                className={cn("h-full rounded-r-full relative", isEligible ? "bg-gradient-to-r from-yellow-600 to-yellow-400" : "bg-zinc-700")}
              >
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
              </motion.div>
           </div>
           
           <p className="text-right text-[10px] text-zinc-600 mt-2">
             {isEligible ? t('eligible') : `${t('reach_nisab')} ₹${Math.round(nisabGold - netWealth).toLocaleString()}`}
           </p>
        </div>

        <motion.div layout className={cn("p-6 rounded-3xl border transition-all duration-500 relative overflow-hidden", isEligible ? "bg-gradient-to-br from-zinc-900 to-black border-yellow-500 shadow-[0_10px_40px_-10px_rgba(234,179,8,0.3)]" : "bg-zinc-900/50 border-white/5")}>
          {isEligible && <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/20 blur-[50px] rounded-full" />}
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{t('zakat_payable')}</span>
          <div className="flex items-baseline gap-1 mt-2 mb-1">
             <span className="text-xl text-zinc-600">₹</span>
             <motion.span key={zakatDue} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("text-5xl font-black tracking-tighter", isEligible ? "text-white" : "text-zinc-600")}>
               {Math.round(zakatDue).toLocaleString()}
             </motion.span>
          </div>
          {isEligible && <div className="inline-block px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-[10px] font-bold rounded uppercase">{t('eligible')}</div>}
        </motion.div>

        <div className="space-y-4">
           <InputRow label={t('cash_bank')} icon={Wallet} value={cash} onChange={setCash} />
           <InputRow label={t('gold_grams')} icon={TrendingUp} value={goldGrams} onChange={setGoldGrams} suffix="g" subtext={`${t('gold_rate')}: ₹${rates.gold}/g`} />
           <InputRow label={t('debts')} icon={DollarSign} value={liabilities} onChange={setLiabilities} isDeduction />
        </div>
      </div>
    </main>
  );
}

function InputRow({ label, icon: Icon, value, onChange, suffix, isDeduction, subtext }: any) {
  return (
    <div className="group bg-zinc-900/40 border border-white/5 p-4 rounded-2xl hover:border-white/10 hover:bg-zinc-900/60 transition-all focus-within:border-yellow-500/50 focus-within:bg-zinc-900">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
          <Icon className="h-3.5 w-3.5" /> {label}
        </label>
        {subtext && <span className="text-[10px] text-zinc-600 font-mono">{subtext}</span>}
      </div>
      <div className="flex items-center gap-2">
        <span className={cn("text-lg font-bold", isDeduction ? "text-red-500" : "text-zinc-400")}>{isDeduction ? "-" : "+"}</span>
        <input type="number" value={value || ''} placeholder="0" onChange={(e) => onChange(parseFloat(e.target.value) || 0)} className="bg-transparent w-full text-2xl font-bold text-white placeholder:text-zinc-800 outline-none font-mono" />
        {suffix && <span className="text-sm font-bold text-zinc-600">{suffix}</span>}
      </div>
    </div>
  );
}