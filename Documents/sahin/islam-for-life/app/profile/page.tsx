"use client";

import { useState } from 'react';
import { ChevronLeft, User, Calendar, Heart, Save } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContexts';
import { useUser } from '@/contexts/UserContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { format } from 'date-fns';

export default function ProfilePage() {
  const { t } = useLanguage();
  const { user, updateName } = useUser();
  const { favorites } = useFavorites();
  const [inputName, setInputName] = useState(user.isGuest ? "" : user.name);

  const handleSave = () => {
    if (inputName.trim()) {
      updateName(inputName);
      alert("Profile Saved!");
    }
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
        <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-300">{t('profile')}</h1>
      </header>

      <div className="max-w-md mx-auto p-6 space-y-8">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className={`h-24 w-24 rounded-full flex items-center justify-center border-4 border-zinc-900 shadow-2xl ${user.avatarColor}`}>
            <span className="text-3xl font-bold uppercase">
              {inputName ? inputName[0] : <User className="h-10 w-10 opacity-50" />}
            </span>
          </div>
          <div className="text-center">
             <h2 className="text-2xl font-bold text-white">
               {user.isGuest ? t('guest') : user.name}
             </h2>
             <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">
               {t('joined')} {format(user.joinedAt, 'MMMM yyyy')}
             </p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl space-y-4">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider ml-1">
            {t('your_name')}
          </label>
          <div className="flex gap-2">
            <input 
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder={t('enter_name')}
              className="flex-1 bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50"
            />
            <button 
              onClick={handleSave}
              className="bg-yellow-500 text-black px-4 rounded-xl hover:bg-yellow-400 transition-colors"
            >
              <Save className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="space-y-2">
           <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">{t('stats')}</h3>
           <div className="grid grid-cols-2 gap-3">
             {/* Favorites Stat */}
             <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col items-center justify-center gap-2">
               <Heart className="h-6 w-6 text-red-500" />
               <span className="text-2xl font-black text-white">{favorites.length}</span>
               <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Favorites Saved</span>
             </div>
             
             {/* Days Active (Mock calculation) */}
             <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col items-center justify-center gap-2">
               <Calendar className="h-6 w-6 text-blue-500" />
               <span className="text-2xl font-black text-white">
                 {Math.floor((Date.now() - user.joinedAt) / (1000 * 60 * 60 * 24)) + 1}
               </span>
               <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Days Active</span>
             </div>
           </div>
        </div>

      </div>
    </main>
  );
}