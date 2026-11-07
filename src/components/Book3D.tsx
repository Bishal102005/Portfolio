'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BookEngine } from '@/lib/three/bookEngine';
import { NAMES } from '@/lib/constants/portfolioData';
import { BookHeader } from './BookHeader';
import { Ribbon } from './Ribbon';
import { BookHUD } from './BookHUD';
import { LoadingOverlay } from './LoadingOverlay';

export const Book3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<BookEngine | null>(null);

  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  const handleSpreadChange = useCallback((spread: number) => {
    setCurrentSpread(spread);
  }, []);

  const handleHintHide = useCallback(() => {
    setShowHint(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setup = async () => {
      // Preload fonts before canvas textures render
      if (typeof document !== 'undefined' && 'fonts' in document) {
        try {
          await Promise.race([
            Promise.all([
              '700 40px "Playfair Display"',
              '500 20px "Playfair Display"',
              'italic 500 20px "Playfair Display"',
              '400 16px Inter',
              '600 16px Inter'
            ].map((f) => document.fonts.load(f))),
            new Promise((r) => setTimeout(r, 2500))
          ]);
        } catch {
          // Continue if font load fails or times out
        }
      }

      if (!mounted) return;

      const initialHash = window.location.hash.slice(1);
      const hashIdx = NAMES.indexOf(initialHash);
      const startSpread = hashIdx >= 0 ? hashIdx : 0;

      const engine = new BookEngine({
        canvas,
        onSpreadChange: (target) => {
          if (mounted) handleSpreadChange(target);
        },
        onHintHide: () => {
          if (mounted) handleHintHide();
        }
      });

      const success = await engine.init(startSpread);
      if (!mounted) {
        engine.destroy();
        return;
      }

      if (!success) {
        setIsSupported(false);
        document.documentElement.classList.add('nogl');
      } else {
        engineRef.current = engine;
        setCurrentSpread(startSpread);
      }

      // Smooth fadeout of loading screen
      setTimeout(() => {
        if (mounted) setIsLoading(false);
      }, 400);
    };

    setup();

    return () => {
      mounted = false;
      if (engineRef.current) {
        engineRef.current.destroy();
        engineRef.current = null;
      }
    };
  }, [handleSpreadChange, handleHintHide]);

  const handleNavigate = (spreadIdx: number) => {
    if (engineRef.current) {
      engineRef.current.go(spreadIdx, 0);
    }
  };

  const handlePrev = () => {
    if (engineRef.current) {
      engineRef.current.step(-1);
    }
  };

  const handleNext = () => {
    if (engineRef.current) {
      engineRef.current.step(1);
    }
  };

  const handleJumpContact = () => {
    if (engineRef.current) {
      engineRef.current.go(7, 0);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <>
      <canvas id="c" ref={canvasRef} aria-hidden="true" />

      <BookHeader currentSpread={currentSpread} onNavigate={handleNavigate} />

      <Ribbon onJumpContact={handleJumpContact} />

      <BookHUD
        currentSpread={currentSpread}
        onPrev={handlePrev}
        onNext={handleNext}
        showHint={showHint}
      />

      <LoadingOverlay isLoading={isLoading} />
    </>
  );
};
