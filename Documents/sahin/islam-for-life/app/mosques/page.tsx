"use client";

import { useState } from 'react';
import { ChevronLeft, MapPin, Navigation, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContexts';

export default function MosquesPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const handleFindMosques = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // Construct Google Maps URL with "Mosques" query at user location
        const url = `https://www.google.com/maps/search/mosques/@${latitude},${longitude},15z`;
        window.open(url, '_blank');
        setLoading(false);
      }, (error) => {
        alert("Please enable location services to find nearby mosques.");
        setLoading(false);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
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
        <h1 className="text-lg font-bold uppercase tracking-widest text-zinc-300">{t('mosques')}</h1>
      </header>

      <div className="max-w-md mx-auto p-6 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
        
        {/* Visual */}
        <div className="relative h-40 w-40 flex items-center justify-center rounded-full bg-zinc-900 border border-white/10 animate-pulse">
           <MapPin className="h-16 w-16 text-yellow-500" />
           <div className="absolute inset-0 border border-yellow-500/20 rounded-full scale-110" />
           <div className="absolute inset-0 border border-yellow-500/10 rounded-full scale-125" />
        </div>

        <div className="space-y-2">
           <h2 className="text-2xl font-bold text-white">{t('find_mosques')}</h2>
           <p className="text-zinc-500 text-sm max-w-[250px] mx-auto">
             {t('location_permission')}
           </p>
        </div>

        <button 
          onClick={handleFindMosques}
          disabled={loading}
          className="w-full py-4 rounded-xl bg-yellow-500 text-black font-bold text-sm uppercase tracking-widest hover:bg-yellow-400 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
             <span>Locating...</span>
          ) : (
             <>
               <Navigation className="h-5 w-5" />
               {t('open_maps')}
             </>
          )}
        </button>

      </div>
    </main>
  );
}