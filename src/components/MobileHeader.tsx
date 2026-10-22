import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { navSections, identity } from '@/data/portfolioData';
import { useLang } from '@/context/LangContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 h-14 border-b bg-background/80 backdrop-blur-md">
        <span className="font-bold text-sm tracking-tight text-foreground">
          {identity.name}
        </span>

        <div className="flex items-center gap-2">
          {/* Lang toggle */}
          <div className="inline-flex rounded-md border p-0.5 bg-muted/40 text-xs font-medium">
            <button
              onClick={() => setLang('fr')}
              className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                lang === 'fr'
                  ? 'bg-background text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-xs transition-colors cursor-pointer ${
                lang === 'en'
                  ? 'bg-background text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground'
              }`}
            >
              EN
            </button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-14 left-0 right-0 z-39 border-b bg-background/95 backdrop-blur-md p-4 flex flex-col gap-1 shadow-lg"
          >
            {navSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                {t(s.label)}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
