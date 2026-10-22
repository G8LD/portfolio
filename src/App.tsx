import { ThemeProvider } from '@/context/ThemeContext';
import { LangProvider } from '@/context/LangContext';
import { Sidebar } from '@/components/Sidebar';
import { MobileHeader } from '@/components/MobileHeader';
import { Intro } from '@/components/Intro';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';

function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors selection:bg-primary selection:text-primary-foreground">
      {/* Mobile header (hidden on desktop) */}
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      {/* Desktop: clean side-by-side layout */}
      <div className="hidden lg:flex max-w-6xl mx-auto px-8 pt-16 pb-24 gap-12 items-start">
        {/* Left sticky sidebar */}
        <div className="w-72 shrink-0 self-stretch">
          <Sidebar />
        </div>

        {/* Main content flow */}
        <main className="flex-1 min-w-0 flex flex-col gap-20">
          <Intro />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
      </div>

      {/* Mobile view single column */}
      <div className="lg:hidden">
        <div className="max-w-2xl mx-auto px-5 pt-20 pb-16 flex flex-col gap-16">
          <Intro />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <Layout />
      </LangProvider>
    </ThemeProvider>
  );
}
