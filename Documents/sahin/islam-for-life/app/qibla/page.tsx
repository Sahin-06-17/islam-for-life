"use client";

import { useState, useEffect } from 'react';
import { ChevronLeft, Compass, Navigation } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function QiblaPage() {
  const [heading, setHeading] = useState(0); // Where phone is pointing
  const [qibla, setQibla] = useState(0);     // The angle of Kaaba from True North
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Calculate Qibla Angle based on User Location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const kaabaLat = 21.422487;
        const kaabaLng = 39.826206;

        const qiblaAngle = getQiblaBearing(latitude, longitude, kaabaLat, kaabaLng);
        setQibla(qiblaAngle);
      },
      (err) => setError("Please enable location services to find Qibla.")
    );
  }, []);

  // 2. Handle Compass Sensor (DeviceOrientation)
  const startCompass = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // iOS 13+ requires explicit permission
      try {
        const response = await (DeviceOrientationEvent as any).requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
        } else {
          setError("Permission needed to access compass.");
        }
      } catch (e) {
        setError("Error requesting compass permission.");
      }
    } else {
      // Android / Non-iOS 13+
      setPermissionGranted(true);
      window.addEventListener('deviceorientationabsolute', handleOrientation); // Android Chrome
      window.addEventListener('deviceorientation', handleOrientation); // Standard fallback
    }
  };

  const handleOrientation = (e: DeviceOrientationEvent | any) => {
    let compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    setHeading(compass);
  };

  // Math: Calculate Great Circle Bearing
  function getQiblaBearing(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const toDeg = (rad: number) => (rad * 180) / Math.PI;

    const phi1 = toRad(lat1);
    const phi2 = toRad(lat2);
    const deltaL = toRad(lon2 - lon1);

    const y = Math.sin(deltaL) * Math.cos(phi2);
    const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaL);
    
    let bearing = toDeg(Math.atan2(y, x));
    return (bearing + 360) % 360;
  }

  // Calculate if the user is facing correctly (within 5 degrees)
  // We normalize angles to handle the 359 -> 0 transition
  const isAligned = Math.abs(heading - qibla) < 5 || Math.abs((heading - qibla) + 360) < 5;

  return (
    <main className="flex min-h-screen flex-col bg-zinc-950 text-white overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-1000 pointer-events-none",
        isAligned ? "bg-green-900/20" : "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-zinc-950 to-zinc-950"
      )} />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6">
        <Link href="/" className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-lg font-bold tracking-widest uppercase text-zinc-500">Qibla Finder</h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Main Compass Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-6">
        
        {!permissionGranted && !error ? (
          <div className="text-center space-y-4 z-20">
            <Compass className="h-16 w-16 text-yellow-500 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold">Align Your Compass</h2>
            <p className="text-zinc-500 max-w-xs mx-auto">Tap below to allow access to your device's sensors.</p>
            <button 
              onClick={startCompass}
              className="px-8 py-3 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all"
            >
              Start Compass
            </button>
          </div>
        ) : (
          <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px]">
            
            {/* 1. Static Center Line (User's Phone) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-30 flex flex-col items-center">
              <div className={cn(
                "h-4 w-4 rounded-full mb-2 transition-colors duration-300",
                isAligned ? "bg-green-500 shadow-[0_0_15px_#22c55e]" : "bg-zinc-700"
              )} />
              <Navigation className={cn(
                "h-8 w-8 transition-colors duration-300", 
                isAligned ? "text-green-500 fill-green-500" : "text-zinc-500"
              )} />
            </div>

            {/* 2. The Rotating Dial (North moves as you turn) */}
            <div 
              className="w-full h-full rounded-full border-2 border-zinc-800 bg-zinc-900/50 shadow-2xl relative transition-transform duration-300 ease-out will-change-transform"
              style={{ transform: `rotate(${-heading}deg)` }}
            >
              {/* North Marker */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 text-red-500 font-bold text-lg">N</div>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-zinc-600 font-bold text-lg">S</div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 font-bold text-lg">E</div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-bold text-lg">W</div>

              {/* Ticks */}
              {[0, 90, 180, 270].map(deg => (
                 <div key={deg} className="absolute top-0 left-1/2 h-full w-0.5 bg-zinc-800 -translate-x-1/2" style={{ transform: `rotate(${deg}deg)` }} />
              ))}

              {/* 3. The Qibla Indicator (Fixed relative to North) */}
              <div 
                className="absolute top-1/2 left-1/2 w-[2px] h-[50%] origin-top -translate-x-1/2 z-20"
                style={{ transform: `rotate(${qibla + 180}deg)` }} // +180 because CSS rotation starts from top, we want it pointing out
              >
                {/* The Kaaba Icon/Arrow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-1">
                   {/* This is the Gold Arrow pointing to Qibla */}
                   <div className="h-10 w-1 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.8)]"></div>
                   <div className="h-8 w-8 bg-black border-2 border-yellow-500 rounded flex items-center justify-center shadow-lg">
                      <div className="h-4 w-4 bg-yellow-500/20 rounded-sm"></div>
                   </div>
                   <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider bg-black/50 px-2 py-0.5 rounded">Kaaba</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Feedback Text */}
        {permissionGranted && (
          <div className="mt-12 text-center space-y-1 z-20">
            <h3 className="text-4xl font-black text-white tracking-tighter">
              {Math.round(qibla)}°
            </h3>
            <p className="text-zinc-500 text-sm uppercase tracking-widest">Qibla Direction</p>
            {isAligned && (
               <div className="mt-4 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-500 rounded-lg text-sm font-bold animate-bounce">
                 You are facing the Qibla!
               </div>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 p-4 bg-red-950/30 border border-red-900 rounded-lg text-red-400 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </main>
  );
}