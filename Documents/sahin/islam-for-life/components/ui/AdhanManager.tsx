"use client";

import { useState, useEffect, useRef } from 'react';
import { usePrayerTimes } from '@/hooks/usePrayerTimes';
import { format } from 'date-fns';

export default function AdhanManager() {
  const data = usePrayerTimes();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hasPlayedFor, setHasPlayedFor] = useState<string | null>(null);

  // 1. Load Settings on Mount
  useEffect(() => {
    const saved = localStorage.getItem('adhan-enabled');
    setEnabled(saved === 'true');

    // Listen for changes from Settings Sheet
    const handleStorage = () => {
      const newVal = localStorage.getItem('adhan-enabled');
      setEnabled(newVal === 'true');
    };
    window.addEventListener('storage-update', handleStorage);
    return () => window.removeEventListener('storage-update', handleStorage);
  }, []);

  // 2. Initialize Audio
  useEffect(() => {
    // A beautiful Adhan from Mecca
    audioRef.current = new Audio('https://www.islamcan.com/audio/adhan/azan2.mp3');
  }, []);

  // 3. The Watchdog Logic
  useEffect(() => {
    if (!data || !enabled || !audioRef.current) return;

    const checkTime = () => {
      const now = new Date();
      const currentHm = format(now, 'HH:mm');

      // Get all prayer times as HH:mm strings
      const prayers = {
        fajr: format(data.prayers.fajr, 'HH:mm'),
        dhuhr: format(data.prayers.dhuhr, 'HH:mm'),
        asr: format(data.prayers.asr, 'HH:mm'),
        maghrib: format(data.prayers.maghrib, 'HH:mm'),
        isha: format(data.prayers.isha, 'HH:mm'),
      };

      // Check if NOW matches any prayer
      const matchedPrayer = Object.entries(prayers).find(([name, time]) => time === currentHm);

      if (matchedPrayer) {
        const prayerName = matchedPrayer[0];

        // Prevent playing multiple times in the same minute
        if (hasPlayedFor !== prayerName) {
          console.log(`Triggering Adhan for ${prayerName}`);
          
          // Play Audio
          audioRef.current?.play().catch(e => console.log("Autoplay blocked:", e));
          
          // Lock it so it doesn't loop
          setHasPlayedFor(prayerName);
        }
      } else {
        // Reset the lock when the minute passes
        setHasPlayedFor(null);
      }
    };

    // Check every 5 seconds
    const interval = setInterval(checkTime, 5000);
    return () => clearInterval(interval);

  }, [data, enabled, hasPlayedFor]);

  return null; // This component is invisible
}