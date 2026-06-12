'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWidgets from './FloatingWidgets';

export type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('sat_lang') as Language;
    if (savedLang === 'en' || savedLang === 'ta') {
      setLanguageState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('sat_lang', lang);
    } catch (e) {
      console.error(e);
    }
  };

  // Safe client side mount to avoid hydration mismatch
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-orange-500/10 selection:text-orange-600">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <FloatingWidgets />
      </div>
    </LanguageContext.Provider>
  );
}

