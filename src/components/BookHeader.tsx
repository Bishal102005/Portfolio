'use client';

import React, { useEffect, useState } from 'react';
import { ME, NAV } from '@/lib/constants/portfolioData';

interface BookHeaderProps {
  currentSpread: number;
  onNavigate: (spreadIndex: number) => void;
}

export const BookHeader: React.FC<BookHeaderProps> = ({ currentSpread, onNavigate }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check initial preference from localStorage or OS setting
    const saved = localStorage.getItem('book_theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      document.documentElement.setAttribute('data-theme', initial);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('book_theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <header className="top">
      <div className="logo">{ME.name}</div>
      <nav id="nav" aria-label="Chapters">
        {NAV.map(([label, spreadIdx], i) => {
          const nextSpread = i === NAV.length - 1 ? 999 : NAV[i + 1][1];
          const isCurrent = currentSpread >= spreadIdx && currentSpread < nextSpread;
          return (
            <button
              key={label}
              type="button"
              aria-current={isCurrent ? 'true' : 'false'}
              onClick={() => onNavigate(spreadIdx)}
            >
              {label}
            </button>
          );
        })}

        <button
          type="button"
          className="theme-toggle"
          aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          onClick={toggleTheme}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
};
