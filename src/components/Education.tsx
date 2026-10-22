import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { education } from '@/data/portfolioData';
import { SectionHeading } from './About';
import { Card, CardHeader } from '@/components/ui/card';

export function Education() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="education" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <SectionHeading en="Education" fr="Formation" />

        <div className="mt-8 flex flex-col gap-4">
          {education.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 * i, duration: 0.35 }}
            >
              <Card className="border hover:border-foreground/30 transition-colors">
                <CardHeader className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-9 w-9 rounded-lg bg-secondary text-foreground flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">
                          {item.institution}
                        </h3>
                        <span className="text-xs font-medium text-muted-foreground shrink-0">
                          {item.period} · {item.location}
                        </span>
                      </div>

                      <p className="text-sm text-foreground font-medium mt-0.5">
                        {t(item.degree)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
