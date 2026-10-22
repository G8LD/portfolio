import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Lang } from '@/data/portfolioData';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <T>(val: { en: T; fr: T }) => T;
}

const LangContext = createContext<LangContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (v) => v.fr,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('portfolio_lang') as Lang | null;
      if (stored === 'fr' || stored === 'en') {
        return stored;
      }
    }
    return 'fr';
  });

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_lang', newLang);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = <T,>(val: { en: T; fr: T }): T => val[lang];

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
