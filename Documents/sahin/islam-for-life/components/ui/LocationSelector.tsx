"use client";

import { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { popularCities } from '@/lib/cities';
import { cn } from '@/lib/utils';

export default function LocationSelector({ currentCity }: { currentCity: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSelect = (city: any) => {
    // 1. Save to Local Storage
    localStorage.setItem('user-location', JSON.stringify({
      name: city.name,
      lat: city.lat,
      lng: city.lng
    }));

    // 2. Trigger Custom Event to update the Hook immediately
    window.dispatchEvent(new Event('storage-update'));
    
    setOpen(false);
  };

  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const gpsCity = {
          name: "My Location",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        handleSelect(gpsCity);
      });
    }
  };

  // Filter cities based on search
  const filtered = popularCities.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* The Trigger Button (Visible on Dashboard) */}
        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md hover:bg-white/10 transition-all">
          <MapPin className="h-3.5 w-3.5 text-yellow-500" />
          <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">{currentCity}</span>
        </button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-[80vh] bg-zinc-950 border-t border-white/10 text-white rounded-t-3xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-white uppercase tracking-widest text-center">Select Location</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          
          {/* 1. Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input 
              placeholder="Search city..." 
              className="w-full bg-zinc-900 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-yellow-500/50"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* 2. GPS Button */}
          <button 
            onClick={handleGPS}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-bold text-sm hover:bg-yellow-500 hover:text-black transition-all"
          >
            <Navigation className="h-4 w-4" />
            Use Current Location
          </button>

          {/* 3. City List */}
          <div className="space-y-2 max-h-[40vh] overflow-y-auto">
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mb-2">Popular Cities</p>
            {filtered.map((city) => (
              <div 
                key={city.name}
                onClick={() => handleSelect(city)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all",
                  currentCity === city.name 
                    ? "bg-zinc-800 border border-yellow-500/30" 
                    : "bg-zinc-900/50 border border-transparent hover:bg-zinc-800"
                )}
              >
                <span className={cn("font-medium", currentCity === city.name ? "text-yellow-500" : "text-zinc-300")}>
                  {city.name}
                </span>
                {currentCity === city.name && <MapPin className="h-4 w-4 text-yellow-500" />}
              </div>
            ))}
          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}