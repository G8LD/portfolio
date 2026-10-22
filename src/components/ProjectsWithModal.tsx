import { useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { SquareArrowOutUpRight, ChevronRight, Layers, AlertCircle, Gamepad2, Code2 } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import {
  projects,
  projectCategoryLabels,
  type ProjectEntry,
  type ProjectCategory,
} from '@/data/portfolioData';
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

interface ProjectsProps {
  onPlayGame?: (gameId: string) => void;
}

export function Projects({ onPlayGame }: ProjectsProps) {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeProject, setActiveProject] = useState<ProjectEntry | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');

  const sortedProjects = [...projects].sort(
    (a, b) => parseInt(b.year, 10) - parseInt(a.year, 10)
  );

  const filteredProjects =
    selectedCategory === 'all'
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === selectedCategory);

  const categories: Array<{ id: ProjectCategory | 'all'; label: { en: string; fr: string } }> = [
    { id: 'all', label: { en: 'All', fr: 'Tous' } },
    { id: 'personal', label: projectCategoryLabels.personal },
    { id: 'academic', label: projectCategoryLabels.academic },
  ];

  return (
    <section id="projects" ref={ref} className="scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SectionHeading en="Projects" fr="Projets" />

          {/* Category Filter Tabs */}
          <div className="inline-flex rounded-lg border p-1 bg-muted/40 text-xs font-medium self-start sm:self-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-background text-foreground shadow-xs font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, delay: 0.05 * i }}
                className="h-full"
              >
                <Card
                  onClick={() => setActiveProject(project)}
                  className="h-full flex flex-col justify-between cursor-pointer transition-all hover:border-foreground/30 hover:shadow-sm overflow-hidden group"
                >
                  {/* Project Screenshot / Illustration or Placeholder */}
                  <div className="w-full aspect-[16/9] overflow-hidden bg-muted/40 border-b relative flex items-center justify-center">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground/60 select-none">
                        <Code2 className="h-8 w-8 stroke-[1.5]" />
                        <span className="font-mono text-xs uppercase tracking-widest">{project.title}</span>
                      </div>
                    )}
                    {project.playUrl && (
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="secondary" className="gap-1 backdrop-blur-md bg-background/80 shadow-xs text-[11px]">
                          <Gamepad2 className="h-3 w-3" />
                          <span>{lang === 'fr' ? 'Jouable' : 'Playable'}</span>
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <CardTitle className="text-base font-semibold transition-colors">
                        {project.title}
                      </CardTitle>

                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[10px] font-mono">
                          {project.year}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] font-mono capitalize">
                          {t(projectCategoryLabels[project.category])}
                        </Badge>
                      </div>
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

                  <CardFooter className="p-5 pt-0 text-xs text-muted-foreground flex items-center justify-end">
                    <span className="flex items-center gap-1 text-foreground font-medium group-hover:translate-x-0.5 transition-transform">
                      {t({ en: 'Details', fr: 'Détails' })}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Accessible Radix / shadcn Dialog */}
      <Dialog
        open={Boolean(activeProject)}
        onOpenChange={(open) => !open && setActiveProject(null)}
      >
        {activeProject && (
          <DialogContent className="max-w-2xl">
            {/* Modal Image - full bleed, zero padding, uncropped */}
            {activeProject.image && (
              <div className="-mx-6 -mt-6 w-[calc(100%+3rem)] overflow-hidden border-b mb-2 sm:rounded-t-2xl">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-auto block sm:rounded-t-2xl"
                />
              </div>
            )}

            <DialogHeader>
              <div className="flex items-center justify-between gap-3 mb-1 pr-8 flex-wrap">
                <DialogTitle className="text-xl font-bold">
                  {activeProject.title}
                </DialogTitle>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {activeProject.year}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-mono capitalize">
                    {t(projectCategoryLabels[activeProject.category])}
                  </Badge>
                </div>
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

            <div className="flex items-center justify-end gap-3 pt-4 border-t flex-wrap">
              {/* Play Game Button */}
              {activeProject.playUrl && onPlayGame && (
                <Button
                  size="sm"
                  onClick={() => {
                    const id = activeProject.id;
                    setActiveProject(null);
                    onPlayGame(id);
                  }}
                  className="gap-2 cursor-pointer"
                >
                  <Gamepad2 className="h-4 w-4" />
                  {lang === 'fr' ? 'Jouer' : 'Play'}
                </Button>
              )}

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
                    <SquareArrowOutUpRight className="h-3 w-3 text-muted-foreground" />
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
                    <SquareArrowOutUpRight className="h-3.5 w-3.5" />
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
