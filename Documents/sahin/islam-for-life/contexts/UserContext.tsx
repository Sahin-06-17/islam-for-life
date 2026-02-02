"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserProfile = {
  name: string;
  isGuest: boolean;
  joinedAt: number; // Timestamp
  avatarColor: string; // Random color for avatar
};

type UserContextType = {
  user: UserProfile;
  updateName: (name: string) => void;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>({
    name: "Guest",
    isGuest: true,
    joinedAt: Date.now(),
    avatarColor: "bg-zinc-700"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from LocalStorage
    const saved = localStorage.getItem('user-profile');
    if (saved) {
      setUser(JSON.parse(saved));
    } else {
      // First time user? Set a random color but keep as Guest
      const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-pink-500"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setUser(prev => ({ ...prev, avatarColor: randomColor }));
    }
    setLoading(false);
  }, []);

  const updateName = (name: string) => {
    const updated = {
      ...user,
      name: name,
      isGuest: false, // Once they name themselves, they aren't a guest
    };
    setUser(updated);
    localStorage.setItem('user-profile', JSON.stringify(updated));
  };

  return (
    <UserContext.Provider value={{ user, updateName, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};