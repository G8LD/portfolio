import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, SquareArrowOutUpRight } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { experiences } from '@/data/portfolioData';
import { SectionHeading } from './About';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Experience() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="experience" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <SectionHeading en="Experience" fr="Expérience" />

        <div className="mt-8 relative">
          {/* Vertical timeline spine */}
          <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-border" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.08 * i, duration: 0.35 }}
                className="flex gap-6 pl-9 relative"
              >
                {/* Timeline node */}
                <div className="absolute left-[11px] top-6 h-2.5 w-2.5 rounded-full bg-foreground ring-4 ring-background" />

                <Card className="flex-1 border hover:border-foreground/30 transition-colors">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">
                          {t(exp.role)}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground font-medium">
                          <Briefcase className="h-3.5 w-3.5" />
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline flex items-center gap-1 text-foreground"
                            >
                              {exp.company}
                              <SquareArrowOutUpRight className="h-3 w-3" />
                            </a>
                          ) : (
                            <span>{exp.company}</span>
                          )}
                        </div>
                      </div>

                      <div className="text-left sm:text-right text-xs text-muted-foreground">
                        <span className="font-medium text-foreground sm:text-muted-foreground">
                          {t(exp.period)}
                        </span>
                        <p>{exp.location}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Badge variant="secondary" className="text-[11px]">
                        {t(exp.type)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-5 pt-0">
                    <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                      {t(exp.bullets).map((bullet, j) => (
                        <li key={j} className="flex gap-2.5 items-start">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/60">
                      {exp.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-mono text-[11px] font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
