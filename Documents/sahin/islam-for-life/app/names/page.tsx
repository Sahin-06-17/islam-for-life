"use client";

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContexts';

// Simple data structure for the names (You can add all 99 here)
const names = [
  { id: 1, arabic: "ٱللَّٰه", transliteration: "Allah", meaning: "God" },
  { id: 2, arabic: "ٱلرَّحْمَٰن", transliteration: "Ar-Rahman", meaning: "The Most Gracious" },
  { id: 3, arabic: "ٱلرَّحِيم", transliteration: "Ar-Rahim", meaning: "The Most Merciful" },
  { id: 4, arabic: "ٱلْمَلِك", transliteration: "Al-Malik", meaning: "The King" },
  { id: 5, arabic: "ٱلْقُدُّوس", transliteration: "Al-Quddus", meaning: "The Most Holy" },
  { id: 6, arabic: "ٱلسَّلَام", transliteration: "As-Salam", meaning: "The Source of Peace" },
  { id: 7, arabic: "ٱلْمُؤْمِن", transliteration: "Al-Mu'min", meaning: "The Guardian of Faith" },
  { id: 8, arabic: "ٱلْمُهَيْمِن", transliteration: "Al-Muhaymin", meaning: "The Protector" },
  { id: 9, arabic: "ٱلْعَزِيز", transliteration: "Al-Aziz", meaning: "The Almighty" },
  { id: 10, arabic: "ٱلْجَبَّار", transliteration: "Al-Jabbar", meaning: "The Compeller" },
  { id: 11, arabic: "ٱلْمُتَكَبِّر", transliteration: "Al-Mutakabbir", meaning: "The Supreme" },
  { id: 12, arabic: "ٱلْخَالِق", transliteration: "Al-Khaliq", meaning: "The Creator" },
  { id: 13, arabic: "ٱلْبَارِئ", transliteration: "Al-Bari", meaning: "The Evolver" },
  { id: 14, arabic: "ٱلْمُصَوِّر", transliteration: "Al-Musawwir", meaning: "The Fashioner" },
  { id: 15, arabic: "ٱلْغَفَّار", transliteration: "Al-Ghaffar", meaning: "The Constant Forgiver" },
  { id: 16, arabic: "ٱلْقَهَّار", transliteration: "Al-Qahhar", meaning: "The All-Dominant" },
  { id: 17, arabic: "ٱلْوَهَّاب", transliteration: "Al-Wahhab", meaning: "The Bestower" },
  { id: 18, arabic: "ٱلرَّزَّاق", transliteration: "Ar-Razzaq", meaning: "The Provider" },
  { id: 19, arabic: "ٱلْفَتَّاح", transliteration: "Al-Fattah", meaning: "The Opener" },
  { id: 20, arabic: "ٱلْعَلِيم", transliteration: "Al-'Alim", meaning: "The All-Knowing" },
  { id: 21, arabic: "ٱلْقَابِض", transliteration: "Al-Qabid", meaning: "The Withholder" },
  { id: 22, arabic: "ٱلْبَاسِط", transliteration: "Al-Basit", meaning: "The Extender" },
  { id: 23, arabic: "ٱلْخَافِض", transliteration: "Al-Khafid", meaning: "The Reducer" },
  { id: 24, arabic: "ٱلرَّافِع", transliteration: "Ar-Rafi", meaning: "The Exalter" },
  { id: 25, arabic: "ٱلْمُعِزّ", transliteration: "Al-Mu'izz", meaning: "The Honorer" },
  { id: 26, arabic: "ٱلْمُذِلّ", transliteration: "Al-Mudhill", meaning: "The Dishonorer" },
  { id: 27, arabic: "ٱلسَّمِيع", transliteration: "As-Sami", meaning: "The All-Hearing" },
  { id: 28, arabic: "ٱلْبَصِير", transliteration: "Al-Basir", meaning: "The All-Seeing" },
  { id: 29, arabic: "ٱلْحَكَم", transliteration: "Al-Hakam", meaning: "The Judge" },
  { id: 30, arabic: "ٱلْعَدْل", transliteration: "Al-'Adl", meaning: "The Just" },
  { id: 31, arabic: "ٱللَّطِيف", transliteration: "Al-Latif", meaning: "The Subtle One" },
  { id: 32, arabic: "ٱلْخَبِير", transliteration: "Al-Khabir", meaning: "The All-Aware" },
  { id: 33, arabic: "ٱلْحَلِيم", transliteration: "Al-Halim", meaning: "The Forbearing" },
  { id: 34, arabic: "ٱلْعَظِيم", transliteration: "Al-'Azim", meaning: "The Magnificent" },
  { id: 35, arabic: "ٱلْغَفُور", transliteration: "Al-Ghafur", meaning: "The Forgiving" },
  { id: 36, arabic: "ٱلشَّكُور", transliteration: "Ash-Shakur", meaning: "The Appreciative" },
  { id: 37, arabic: "ٱلْعَلِيّ", transliteration: "Al-'Ali", meaning: "The Highest" },
  { id: 38, arabic: "ٱلْكَبِير", transliteration: "Al-Kabir", meaning: "The Greatest" },
  { id: 39, arabic: "ٱلْحَفِيظ", transliteration: "Al-Hafiz", meaning: "The Preserver" },
  { id: 40, arabic: "ٱلْمُقِيت", transliteration: "Al-Muqit", meaning: "The Sustainer" },
  { id: 41, arabic: "ٱلْحَسِيب", transliteration: "Al-Hasib", meaning: "The Reckoner" },
  { id: 42, arabic: "ٱلْجَلِيل", transliteration: "Al-Jalil", meaning: "The Majestic" },
  { id: 43, arabic: "ٱلْكَرِيم", transliteration: "Al-Karim", meaning: "The Generous" },
  { id: 44, arabic: "ٱلرَّقِيب", transliteration: "Ar-Raqib", meaning: "The Watchful" },
  { id: 45, arabic: "ٱلْمُجِيب", transliteration: "Al-Mujib", meaning: "The Responsive" },
  { id: 46, arabic: "ٱلْوَاسِع", transliteration: "Al-Wasi", meaning: "The All-Encompassing" },
  { id: 47, arabic: "ٱلْحَكِيم", transliteration: "Al-Hakim", meaning: "The Wise" },
  { id: 48, arabic: "ٱلْوَدُود", transliteration: "Al-Wadud", meaning: "The Loving" },
  { id: 49, arabic: "ٱلْمَجِيد", transliteration: "Al-Majid", meaning: "The Glorious" },
  { id: 50, arabic: "ٱلْبَاعِث", transliteration: "Al-Ba'ith", meaning: "The Resurrecter" },
  { id: 51, arabic: "ٱلشَّهِيد", transliteration: "Ash-Shahid", meaning: "The Witness" },
  { id: 52, arabic: "ٱلْحَقّ", transliteration: "Al-Haqq", meaning: "The Truth" },
  { id: 53, arabic: "ٱلْوَكِيل", transliteration: "Al-Wakil", meaning: "The Trustee" },
  { id: 54, arabic: "ٱلْقَوِيّ", transliteration: "Al-Qawiyy", meaning: "The Strong" },
  { id: 55, arabic: "ٱلْمَتِين", transliteration: "Al-Matin", meaning: "The Firm" },
  { id: 56, arabic: "ٱلْوَلِيّ", transliteration: "Al-Wali", meaning: "The Protecting Friend" },
  { id: 57, arabic: "ٱلْحَمِيد", transliteration: "Al-Hamid", meaning: "The Praiseworthy" },
  { id: 58, arabic: "ٱلْمُحْصِي", transliteration: "Al-Muhsi", meaning: "The Accounter" },
  { id: 59, arabic: "ٱلْمُبْدِئ", transliteration: "Al-Mubdi", meaning: "The Originator" },
  { id: 60, arabic: "ٱلْمُعِيد", transliteration: "Al-Mu'id", meaning: "The Restorer" },
  { id: 61, arabic: "ٱلْمُحْيِي", transliteration: "Al-Muhyi", meaning: "The Giver of Life" },
  { id: 62, arabic: "ٱلْمُمِيت", transliteration: "Al-Mumit", meaning: "The Creator of Death" },
  { id: 63, arabic: "ٱلْحَيّ", transliteration: "Al-Hayy", meaning: "The Ever-Living" },
  { id: 64, arabic: "ٱلْقَيُّوم", transliteration: "Al-Qayyum", meaning: "The Self-Subsisting" },
  { id: 65, arabic: "ٱلْوَاجِد", transliteration: "Al-Wajid", meaning: "The Finder" },
  { id: 66, arabic: "ٱلْمَاجِد", transliteration: "Al-Majid", meaning: "The Noble" },
  { id: 67, arabic: "ٱلْوَاحِد", transliteration: "Al-Wahid", meaning: "The One" },
  { id: 68, arabic: "ٱلصَّمَد", transliteration: "As-Samad", meaning: "The Eternal" },
  { id: 69, arabic: "ٱلْقَادِر", transliteration: "Al-Qadir", meaning: "The Able" },
  { id: 70, arabic: "ٱلْمُقْتَدِر", transliteration: "Al-Muqtadir", meaning: "The Powerful" },
  { id: 71, arabic: "ٱلْمُقَدِّم", transliteration: "Al-Muqaddim", meaning: "The Expediter" },
  { id: 72, arabic: "ٱلْمُؤَخِّر", transliteration: "Al-Mu'akhkhir", meaning: "The Delayer" },
  { id: 73, arabic: "ٱلْأَوَّل", transliteration: "Al-Awwal", meaning: "The First" },
  { id: 74, arabic: "ٱلْآخِر", transliteration: "Al-Akhir", meaning: "The Last" },
  { id: 75, arabic: "ٱلظَّاهِر", transliteration: "Az-Zahir", meaning: "The Manifest" },
  { id: 76, arabic: "ٱلْبَاطِن", transliteration: "Al-Batin", meaning: "The Hidden" },
  { id: 77, arabic: "ٱلْوَالِي", transliteration: "Al-Wali", meaning: "The Governor" },
  { id: 78, arabic: "ٱلْمُتَعَالِي", transliteration: "Al-Muta'ali", meaning: "The Most Exalted" },
  { id: 79, arabic: "ٱلْبَرّ", transliteration: "Al-Barr", meaning: "The Source of Goodness" },
  { id: 80, arabic: "ٱلتَّوَّاب", transliteration: "At-Tawwab", meaning: "The Acceptor of Repentance" },
  { id: 81, arabic: "ٱلْمُنْتَقِم", transliteration: "Al-Muntaqim", meaning: "The Avenger" },
  { id: 82, arabic: "ٱلْعَفُوّ", transliteration: "Al-'Afuww", meaning: "The Pardoner" },
  { id: 83, arabic: "ٱلرَّءُوف", transliteration: "Ar-Ra'uf", meaning: "The Compassionate" },
  { id: 84, arabic: "مَالِك ٱلْمُلْك", transliteration: "Malik-ul-Mulk", meaning: "Master of Sovereignty" },
  { id: 85, arabic: "ذُو ٱلْجَلَال وَٱلْإِكْرَام", transliteration: "Dhul-Jalal wal-Ikram", meaning: "Lord of Majesty and Generosity" },
  { id: 86, arabic: "ٱلْمُقْسِط", transliteration: "Al-Muqsit", meaning: "The Equitable" },
  { id: 87, arabic: "ٱلْجَامِع", transliteration: "Al-Jami", meaning: "The Gatherer" },
  { id: 88, arabic: "ٱلْغَنِيّ", transliteration: "Al-Ghaniyy", meaning: "The Self-Sufficient" },
  { id: 89, arabic: "ٱلْمُغْنِي", transliteration: "Al-Mughni", meaning: "The Enricher" },
  { id: 90, arabic: "ٱلْمَانِع", transliteration: "Al-Mani", meaning: "The Withholder" },
  { id: 91, arabic: "ٱلضَّارّ", transliteration: "Ad-Darr", meaning: "The Distressor" },
  { id: 92, arabic: "ٱلنَّافِع", transliteration: "An-Nafi", meaning: "The Propitious" },
  { id: 93, arabic: "ٱلنُّور", transliteration: "An-Nur", meaning: "The Light" },
  { id: 94, arabic: "ٱلْهَادِي", transliteration: "Al-Hadi", meaning: "The Guide" },
  { id: 95, arabic: "ٱلْبَدِيع", transliteration: "Al-Badi", meaning: "The Incomparable" },
  { id: 96, arabic: "ٱلْبَاقِي", transliteration: "Al-Baqi", meaning: "The Ever-Enduring" },
  { id: 97, arabic: "ٱلْوَارِث", transliteration: "Al-Warith", meaning: "The Inheritor" },
  { id: 98, arabic: "ٱلرَّشِيد", transliteration: "Ar-Rashid", meaning: "The Guide to the Right Path" },
  { id: 99, arabic: "ٱلصَّبُور", transliteration: "As-Sabur", meaning: "The Patient" }
  // ... Add the rest of the 99 names as you wish ...
];

export default function NamesPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-yellow-500/30">
      
      {/* Header */}
      <header className="flex items-center gap-4 p-6 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/">
          <div className="p-2 bg-zinc-900 rounded-full border border-white/10 hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </div>
        </Link>
        <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-300">{t('names_allah')}</h1>
      </header>

      {/* Grid of Names */}
      <div className="max-w-md mx-auto p-4 grid grid-cols-2 gap-3">
        {names.map((n) => (
          <div key={n.id} className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 hover:border-yellow-500/30 transition-all group">
            <span className="text-xs font-mono text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-full">{n.id}</span>
            <h2 className="text-3xl font-arabic text-white mb-1 group-hover:text-yellow-500 transition-colors">{n.arabic}</h2>
            <div>
              <p className="text-sm font-bold text-zinc-300">{n.transliteration}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wide">{n.meaning}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}