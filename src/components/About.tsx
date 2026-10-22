import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/context/LangContext';
import { about } from '@/data/portfolioData';
import { Separator } from '@/components/ui/separator';

export function SectionHeading({
  en,
  fr,
}: {
  en: string;
  fr: string;
}) {
  const { lang } = useLang();
  const label = lang === 'en' ? en : fr;

  return (
    <div className="flex items-center gap-4">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
        {label}
      </h2>
      <Separator className="flex-1" />
    </div>
  );
}

export function About() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="about" ref={ref} className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <SectionHeading en="About Me" fr="À propos" />
        <div className="mt-5 space-y-4 leading-relaxed text-muted-foreground text-sm sm:text-base">
          {t(about)
            .split('\n\n')
            .map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
        </div>
      </motion.div>
    </section>
  );
}
