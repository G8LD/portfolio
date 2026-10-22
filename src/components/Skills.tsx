import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLang } from '@/context/LangContext';
import { skillCategories } from '@/data/portfolioData';
import { SectionHeading } from './About';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Skills() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <SectionHeading en="Skills" fr="Compétences" />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.label.en}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.06 * i, duration: 0.35 }}
            >
              <Card className="h-full border hover:border-foreground/30 transition-colors">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(category.label)}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="font-mono text-xs font-normal cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
