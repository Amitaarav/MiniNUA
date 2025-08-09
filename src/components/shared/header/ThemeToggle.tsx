import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const THEME_KEY = 'theme';

type ThemeMode = 'light' | 'dark';

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_KEY) as ThemeMode | null) || null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial: ThemeMode = saved ?? (prefersDark ? 'dark' : 'light');
    setMode(initial);
    applyTheme(initial);
  }, []);

  const toggle = () => {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="header-button flex items-center gap-2"
      aria-label="Toggle theme"
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {mode === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="hidden md:inline font-bold">{mode === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
} 