import { useEffect, useState, useRef } from 'react';

export function useScrollSpy(ids: string[], offset = 180) {
  const [active, setActive] = useState(ids[0]);
  const isClickScrolling = useRef(false);
  const clickTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      // 1. Check if at the bottom of the page -> activate last item (Contact)
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPos = window.innerHeight + window.scrollY;
      if (scrollPos >= scrollHeight - 60) {
        setActive(ids[ids.length - 1]);
        return;
      }

      // 2. Check if near the top of the page -> activate first item (About)
      if (window.scrollY < 120) {
        setActive(ids[0]);
        return;
      }

      // 3. Find current section based on position relative to offset
      let currentSection = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= offset) {
            currentSection = id;
          }
        }
      }

      setActive(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeout.current) clearTimeout(clickTimeout.current);
    };
  }, [ids, offset]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Immediately highlight the clicked section
    setActive(id);
    isClickScrolling.current = true;

    if (clickTimeout.current) clearTimeout(clickTimeout.current);

    el.scrollIntoView({ behavior: 'smooth' });

    // Re-enable scroll listener after smooth scroll finishes
    clickTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 750);
  };

  return { active, scrollTo };
}
