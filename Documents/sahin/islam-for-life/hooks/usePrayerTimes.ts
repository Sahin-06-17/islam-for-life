import { useState, useEffect } from 'react';
import { Coordinates, CalculationMethod, PrayerTimes, Madhab, Prayer } from 'adhan';

const DEFAULT_LOC = { name: "Kolkata", lat: 22.5726, lng: 88.3639 };

export function usePrayerTimes() {
  const [data, setData] = useState<any>(null);

  const calculate = () => {
    // 1. Get Location
    const savedLoc = localStorage.getItem('user-location');
    const loc = savedLoc ? JSON.parse(savedLoc) : DEFAULT_LOC;

    // 2. Get Madhab (Default to Shafi/Standard if missing)
    const savedMadhab = localStorage.getItem('user-madhab');
    const madhab = savedMadhab === 'hanafi' ? Madhab.Hanafi : Madhab.Shafi;

    // 3. Configure
    const coords = new Coordinates(loc.lat, loc.lng);
    const params = CalculationMethod.Karachi();
    params.madhab = madhab; // <--- Apply the Madhab here

    const date = new Date();
    const prayerTimes = new PrayerTimes(coords, date, params);
    
    // ... (Same logic as before) ...
    const currentPrayer = prayerTimes.currentPrayer();
    const nextPrayer = prayerTimes.nextPrayer();
    let nextTime = prayerTimes.timeForPrayer(nextPrayer);
    
    if (nextPrayer === Prayer.None) {
      const tomorrow = new Date(date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowPrayers = new PrayerTimes(coords, tomorrow, params);
      nextTime = tomorrowPrayers.fajr;
    }

    const now = new Date();
    const diffMs = nextTime ? nextTime.getTime() - now.getTime() : 0;
    const hours = Math.floor((diffMs / (1000 * 60 * 60)));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    setData({
      prayers: prayerTimes,
      next: nextPrayer === Prayer.None ? 'fajr' : nextPrayer,
      countdown: `${hours}h ${minutes}m`,
      city: loc.name
    });
  };

  useEffect(() => {
    calculate();
    // Listen for updates (Language, Location, OR Madhab changes)
    window.addEventListener('storage-update', calculate);
    return () => window.removeEventListener('storage-update', calculate);
  }, []);

  return data;
}