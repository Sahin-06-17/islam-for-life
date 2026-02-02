import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContexts";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import AdhanManager from '@/components/ui/AdhanManager';
import { UserProvider } from "@/contexts/UserContext";
import DecorativeLamps from "@/components/ui/DecorativeLamps";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Islam For Life",
  description: "A comprehensive Islamic app.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Islam For Life",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen relative overflow-x-hidden bg-black text-white`}>
        
        {/* Background Gradient */}
        <div className="fixed inset-0 pointer-events-none z-[-2] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black" />
        
        {/* Lamps */}
        <DecorativeLamps />

        <LanguageProvider>
          <FavoritesProvider>
            <UserProvider>
              <AdhanManager />
              <div className="relative z-10">
                {children}
              </div>
            </UserProvider>
          </FavoritesProvider>
        </LanguageProvider>

      </body>
    </html>
  );
}