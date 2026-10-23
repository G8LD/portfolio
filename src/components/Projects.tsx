import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SquareArrowOutUpRight, Gamepad2, Code2 } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import {
  projects,
  projectCategoryLabels,
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
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { GithubIcon } from './icons/GithubIcon';

interface ProjectsProps {
  onPlayGame?: (gameId: string) => void;
}

export function Projects({ onPlayGame }: ProjectsProps) {
  const { t, lang } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

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
                <Card className="h-full flex flex-col justify-between overflow-hidden">
                  {/* Top Image / Placeholder Header */}
                  <div
                    className={`w-full aspect-[16/9] overflow-hidden bg-muted/40 border-b relative flex items-center justify-center ${
                      project.image ? 'cursor-zoom-in group' : ''
                    }`}
                    onClick={() => project.image && setEnlargedImage(project.image)}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground/60 select-none">
                        <Code2 className="h-8 w-8 stroke-[1.5]" />
                        <span className="font-mono text-xs uppercase tracking-widest">
                          {project.title}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Header: Title on Left, Badges on Right */}
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                      <CardTitle className="text-base font-semibold">
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

                  {/* Content: Description + ALL Tags */}
                  <CardContent className="p-5 pt-0 flex-1 flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(project.description)}
                    </p>

                    {/* All Tags under Description */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
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

                  {/* Footer: Action Buttons (Play / GitHub / Demo) */}
                  <CardFooter className="p-5 pt-0 flex items-center justify-end gap-2 flex-wrap">
                    {project.playUrl && onPlayGame && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPlayGame(project.id)}
                        className="gap-1.5 text-xs h-8 px-3 cursor-pointer"
                      >
                        <Gamepad2 className="h-3.5 w-3.5" />
                        <span>{lang === 'fr' ? 'Jouer' : 'Play'}</span>
                      </Button>
                    )}

                    {project.repoUrl && (
                      <Button variant="outline" size="sm" className="gap-2 text-xs group" asChild>
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5"
                        >
                          <GithubIcon size={14} />
                          <span>GitHub</span>
                          <SquareArrowOutUpRight className="text-muted-foreground group-hover:text-foreground transition-colors" />
                        </a>
                      </Button>
                    )}

                    {project.demoUrl && (
                      <Button size="sm" className="gap-1.5 text-xs" asChild>
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5"
                        >
                          <SquareArrowOutUpRight className="h-3.5 w-3.5" />
                          <span>{t({ en: 'Demo', fr: 'Démo' })}</span>
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Lightbox / Enlarged Image Dialog */}
      <Dialog open={!!enlargedImage} onOpenChange={(open) => !open && setEnlargedImage(null)}>
        <DialogContent
          className="max-w-[95vw] w-fit p-0 border-none bg-transparent shadow-none max-h-[95vh] overflow-visible focus:outline-none flex items-center justify-center cursor-zoom-out"
          onClick={() => setEnlargedImage(null)}
        >
          <DialogTitle className="sr-only">Image</DialogTitle>
          <img
            src={enlargedImage || ''}
            alt=""
            className="max-h-[92vh] max-w-[95vw] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
          />
        </DialogContent>
      </Dialog>
    </section>
  );
}
