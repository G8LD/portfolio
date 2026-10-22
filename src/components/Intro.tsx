import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { identity } from '@/data/portfolioData';
import { useLang } from '@/context/LangContext';

export function Intro() {
  const { t } = useLang();

  return (
    <header>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center gap-2 mb-3"
      >
        <span className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
          {t(identity.role)}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground"
      >
        {identity.name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-4 mt-4 flex-wrap text-sm text-muted-foreground"
      >
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          {identity.location}
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl font-normal"
      >
        {t(identity.tagline)}
      </motion.p>
    </header>
  );
}
