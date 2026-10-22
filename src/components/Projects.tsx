import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SquareArrowOutUpRight, ChevronRight, Layers, AlertCircle } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { projects, type ProjectEntry } from '@/data/portfolioData';
import { SectionHeading } from './About';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GithubIcon } from './icons/GithubIcon';

export function Projects() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeProject, setActiveProject] = useState<ProjectEntry | null>(null);

  return (
    <section id="projects" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <SectionHeading en="Projects" fr="Projets" />

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 * i, duration: 0.35 }}
              className="h-full"
            >
              <Card
                onClick={() => setActiveProject(project)}
                className="h-full flex flex-col justify-between cursor-pointer transition-all hover:border-foreground/30 hover:shadow-sm"
              >
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <CardTitle className="text-base font-semibold transition-colors">
                      {project.title}
                    </CardTitle>
                    {project.featured && (
                      <Badge variant="secondary" className="text-[10px] uppercase font-mono">
                        {t({ en: 'Featured', fr: 'Vedette' })}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-xs font-medium">
                    {t(project.subtitle)}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-5 pt-0 flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {t(project.description)}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="font-mono text-[11px] font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 4 && (
                      <Badge variant="outline" className="text-[11px]">
                        +{project.tags.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-5 pt-0 text-xs text-muted-foreground flex items-center justify-end gap-0.5">
                  <span>{t({ en: 'Details', fr: 'Détails' })}</span>
                  <ChevronRight className="h-4 w-4" />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Accessible Radix / shadcn Dialog */}
      <Dialog
        open={Boolean(activeProject)}
        onOpenChange={(open) => !open && setActiveProject(null)}
      >
        {activeProject && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <DialogTitle className="text-xl font-bold">
                  {activeProject.title}
                </DialogTitle>
                {activeProject.featured && (
                  <Badge variant="secondary" className="text-[10px] uppercase font-mono">
                    {t({ en: 'Featured', fr: 'Vedette' })}
                  </Badge>
                )}
              </div>
              <DialogDescription className="font-medium">
                {t(activeProject.subtitle)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 text-sm text-muted-foreground py-2">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1.5">
                  {t({ en: 'Overview', fr: 'Présentation' })}
                </h4>
                <p className="leading-relaxed">{t(activeProject.description)}</p>
              </div>

              <div className="rounded-lg border bg-muted/40 p-4">
                <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                  {t({ en: 'Architecture & System Design', fr: 'Architecture & Conception' })}
                </h4>
                <p className="leading-relaxed text-xs sm:text-sm">
                  {t(activeProject.architecture)}
                </p>
              </div>

              <div>
                <h4 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
                  {t({ en: 'Engineering Challenges Solved', fr: 'Défis techniques résolus' })}
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {t(activeProject.challenges).map((c, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                  {t({ en: 'Tech Stack', fr: 'Stack Technique' })}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="font-mono text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              {activeProject.repoUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={activeProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <GithubIcon size={14} />
                    {t({ en: 'GitHub Repository', fr: 'Dépôt GitHub' })}
                    <SquareArrowOutUpRight/>
                  </a>
                </Button>
              )}

              {activeProject.demoUrl && (
                <Button size="sm" asChild>
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <SquareArrowOutUpRight/>
                    {t({ en: 'Live Demo', fr: 'Démo en direct' })}
                  </a>
                </Button>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
