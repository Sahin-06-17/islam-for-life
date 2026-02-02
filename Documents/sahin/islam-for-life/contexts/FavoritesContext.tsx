"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type FavoriteItem = {
  id: string; // Unique ID (e.g., "surah-1", "dua-5")
  type: 'surah' | 'dua' | 'verse' | 'hadith';
  title: string;
  subtitle: string;
  link: string;
  timestamp: number;
};

type FavoritesContextType = {
  favorites: FavoriteItem[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('user-favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('user-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: string) => {
    return favorites.some(f => f.id === id);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id)) {
      setFavorites(prev => prev.filter(f => f.id !== item.id));
    } else {
      setFavorites(prev => [item, ...prev]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};