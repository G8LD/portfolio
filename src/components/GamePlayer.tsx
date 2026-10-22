import { useRef } from 'react';
import { ArrowLeft, Maximize2, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/context/LangContext';

interface GamePlayerProps {
  onBack: () => void;
}

export function GamePlayer({ onBack }: GamePlayerProps) {
  const { lang } = useLang();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Bar */}
      <header className="border-b px-6 py-4 flex items-center justify-between bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>{lang === 'fr' ? 'Retour au portfolio' : 'Back to portfolio'}</span>
          </Button>

          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-muted-foreground" />
            <h1 className="font-bold text-base sm:text-lg">Copi</h1>
          </div>
        </div>

        <Button variant="outline" size="sm" onClick={toggleFullscreen} className="gap-1.5 text-xs">
          <Maximize2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{lang === 'fr' ? 'Plein écran' : 'Fullscreen'}</span>
        </Button>
      </header>

      {/* Main Game Frame */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 max-w-5xl mx-auto w-full">
        <div className="w-full aspect-[16/9] max-h-[75vh] bg-black rounded-xl overflow-hidden border shadow-2xl relative">
          <iframe
            ref={iframeRef}
            src="/games/copi/index.html"
            title="Copi - Godot Game"
            className="w-full h-full border-0"
            allow="fullscreen; autoplay"
          />
        </div>

        {/* Controls Guide */}
        <div className="mt-4 p-4 rounded-lg border bg-card/50 text-xs text-muted-foreground flex flex-wrap gap-4 justify-center items-center">
          <div>
            <span className="font-semibold text-foreground">
              {lang === 'fr' ? 'Déplacements :' : 'Movements:'}
            </span>{' '}
            <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">Q</kbd>{' '}
            <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">D</kbd> 
          </div>
          <div>
            <span className="font-semibold text-foreground">{lang === 'fr' ? 'Saut :' : 'Jump:'}</span>{' '}
            <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">Z</kbd> /{' '}
            <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">{lang === 'fr' ? 'Espace' : 'Space'}</kbd>
          </div>
          <div>
            <span className="font-semibold text-foreground">{lang === 'fr' ? 'Pause :' : 'Pause:'}</span>{' '}
            <kbd className="px-1.5 py-0.5 rounded border bg-muted font-mono">{lang === 'fr' ? 'Échap' : 'Esc'}</kbd>
          </div>
        </div>
      </main>
    </div>
  );
}
