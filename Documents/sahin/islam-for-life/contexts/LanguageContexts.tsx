"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from '@/lib/translations';

// 1. Define valid types
type Language = 'en' | 'hi' | 'ur' | 'bn';
type Madhab = 'hanafi' | 'shafi';

// 2. Define the Context Shape
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  madhab: Madhab;
  setMadhab: (m: Madhab) => void;
  isLoaded: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [madhab, setMadhab] = useState<Madhab>('hanafi');
  const [isLoaded, setIsLoaded] = useState(false);

  // 3. Load saved settings on startup
  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    const savedMadhab = localStorage.getItem('user-madhab') as Madhab;

    if (savedLang) setLanguage(savedLang);
    if (savedMadhab) setMadhab(savedMadhab);
    
    setIsLoaded(true);
  }, []);

  // 4. Save settings
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const handleSetMadhab = (m: Madhab) => {
    setMadhab(m);
    localStorage.setItem('user-madhab', m);
    window.dispatchEvent(new Event('storage-update')); 
  };

  // 5. Translation Helper (FIXED TYPESCRIPT ERROR)
  const t = (key: string) => {
    // We tell TypeScript: "Trust me, treat this object as a string dictionary"
    const dict = translations[language] as Record<string, string>;
    return dict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t,
      madhab,
      setMadhab: handleSetMadhab,
      isLoaded 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};