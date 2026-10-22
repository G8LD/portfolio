import { motion } from 'framer-motion';
import { Moon, Sun, ChevronRight, SquareArrowOutUpRight } from 'lucide-react';
import { navSections, identity } from '@/data/portfolioData';
import { useLang } from '@/context/LangContext';
import { useTheme } from '@/context/ThemeContext';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { GithubIcon } from './icons/GithubIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const sectionIds = navSections.map((s) => s.id);

export function Sidebar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const { active: activeId, scrollTo } = useScrollSpy(sectionIds);

  return (
    <aside className="sticky top-[50vh] -translate-y-1/2 h-fit flex flex-col gap-6 p-3 w-72 transition-colors select-none">
      {/* Navigation Links */}
      <nav className="flex flex-col gap-1.5">
        {navSections.map((section, i) => {
          const isActive = activeId === section.id;
          return (
            <motion.button
              key={section.id}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.04 * i, duration: 0.25 }}
              onClick={() => scrollTo(section.id)}
              className={`group flex items-center justify-between w-full text-left px-3.5 py-2 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer ${
                isActive
                  ? 'bg-secondary text-foreground font-semibold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <span>{t(section.label)}</span>
              {isActive && <ChevronRight className="h-4 w-4 text-foreground" />}
            </motion.button>
          );
        })}
      </nav>

      <Separator />

      {/* Social links */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="h-9 justify-start gap-2.5 text-xs group px-3.5" asChild>
          <a href={identity.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon size={16} />
            <span className="text-sm">GitHub</span>
            <SquareArrowOutUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
        </Button>
        <Button variant="outline" size="sm" className="h-9 justify-start gap-2.5 text-xs group px-3.5" asChild>
          <a href={identity.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedinIcon size={16} />
            <span className="text-sm">LinkedIn</span>
            <SquareArrowOutUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>
        </Button>
      </div>

      <Separator />

      {/* Language & Theme Controls */}
      <div className="flex items-center gap-2 justify-between">
        {/* Language switch */}
        <div className="inline-flex rounded-md border p-0.5 bg-muted/40 text-xs font-medium">
          <button
            onClick={() => setLang('fr')}
            className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
              lang === 'fr'
                ? 'bg-background text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            FR
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-xs transition-colors cursor-pointer ${
              lang === 'en'
                ? 'bg-background text-foreground shadow-xs font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            EN
          </button>
        </div>

        {/* Theme toggle: Light / Dark */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs gap-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={toggle}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <>
              <Moon className="h-3.5 w-3.5" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <Sun className="h-3.5 w-3.5" />
              <span>Light</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}
