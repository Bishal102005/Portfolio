'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BookEngine } from '@/lib/three/bookEngine';
import { soundFX } from '@/lib/three/soundFx';
import { NAMES } from '@/lib/constants/portfolioData';
import { Navbar } from '../Navbar';
import { preloadCoverImage } from '../Hero';
import { Ribbon } from './Ribbon';
import { BookHUD } from './BookHUD';
import { LoadingOverlay } from './LoadingOverlay';

export const Book3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<BookEngine | null>(null);

  const [currentSpread, setCurrentSpread] = useState<number>(0);
  const [currentSide, setCurrentSide] = useState<number>(1);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isFloating, setIsFloating] = useState<boolean>(false);
  const [sequencePhase, setSequencePhase] = useState<'idle' | 'hovered' | 'animating' | 'completed'>('idle');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleSpreadChange = useCallback((spread: number, side: number = 0, portrait: boolean = false) => {
    setCurrentSpread(spread);
    setCurrentSide(side);
    setIsPortrait(portrait);
  }, []);

  const handleHintHide = useCallback(() => {
    setShowHint(false);
  }, []);

  const handleFloatingChange = useCallback((floating: boolean) => {
    setIsFloating(floating);
    if (!floating) {
      setSequencePhase('idle');
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setup = async () => {
      // Preload fonts & cover background image before canvas textures render
      const fontPromises =
        typeof document !== 'undefined' && 'fonts' in document
          ? [
              '700 40px "Playfair Display"',
              '500 20px "Playfair Display"',
              'italic 500 20px "Playfair Display"',
              '400 16px Inter',
              '600 16px Inter'
            ].map((f) => document.fonts.load(f))
          : [];

      try {
        await Promise.race([
          Promise.all([...fontPromises, preloadCoverImage()]),
          new Promise((r) => setTimeout(r, 2500))
        ]);
      } catch {
        // Continue if font load fails or times out
      }

      if (!mounted) return;

      const initialHash = window.location.hash.slice(1);
      const hashIdx = NAMES.indexOf(initialHash);
      const startSpread = hashIdx >= 0 ? hashIdx : 0;

      const initialFloating = startSpread > 0;
      if (initialFloating) setIsFloating(true);

      const engine = new BookEngine({
        canvas,
        initialFloating,
        onSpreadChange: (target, side, portrait) => {
          if (mounted) handleSpreadChange(target, side ?? 0, portrait ?? false);
        },
        onPortraitChange: (portrait) => {
          if (mounted) setIsPortrait(portrait);
        },
        onHintHide: () => {
          if (mounted) handleHintHide();
        },
        onFloatingChange: (floating) => {
          if (mounted) handleFloatingChange(floating);
        },
        onSequencePhaseChange: (phase) => {
          if (mounted) setSequencePhase(phase);
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

  const handlePullFromShelf = () => {
    if (engineRef.current) {
      engineRef.current.pullFromShelf();
    }
  };

  const handleReturnToShelf = () => {
    if (engineRef.current) {
      engineRef.current.returnToShelf();
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => {
      const next = !prev;
      soundFX.setMuted(next);
      return next;
    });
  };

  const handleSkipIntro = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (engineRef.current) {
      engineRef.current.skipSequence();
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <>
      <canvas id="c" ref={canvasRef} aria-hidden="true" />
      <div className="film-vignette" aria-hidden="true" />

      {/* 2.39:1 Anamorphic Cinematic Letterbox Bars */}
      <div
        className={`letterbox-bar-top ${sequencePhase === 'animating' ? 'active' : ''}`}
        aria-hidden="true"
      />
      <div
        className={`letterbox-bar-bottom ${sequencePhase === 'animating' ? 'active' : ''}`}
        aria-hidden="true"
      />

      {/* Cinematic Controls (Mute & Skip Intro) */}
      {sequencePhase === 'animating' && (
        <div className="cinematic-overlay-controls" role="toolbar" aria-label="Cinematic intro controls">
          <button
            type="button"
            className="cinematic-btn cinematic-mute-btn"
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          <button
            type="button"
            className="cinematic-btn cinematic-skip-btn"
            onClick={handleSkipIntro}
            aria-label="Skip cinematic introduction"
          >
            Skip intro ⏭
          </button>
        </div>
      )}

      {/* Virtual library subtle hint / hover tooltip */}
      {!isFloating && sequencePhase !== 'animating' && (
        <div
          className={`shelf-pill-hint ${sequencePhase === 'hovered' ? 'hovered' : ''}`}
          onClick={handlePullFromShelf}
          style={{
            opacity: showHint || sequencePhase === 'hovered' ? 0.95 : 0,
            cursor: 'pointer',
            pointerEvents: 'auto',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          title="Click to take out the glowing book"
        >
          <span style={{ color: '#e5a958' }}>✦</span>
          <span className="shelf-hint-desktop">
            {sequencePhase === 'hovered' ? 'Open Portfolio' : 'Click the glowing book to open portfolio'}
          </span>
          <span className="shelf-hint-mobile">
            {sequencePhase === 'hovered' ? 'Open Portfolio' : 'Tap book to open'}
          </span>
          <span style={{ color: '#e5a958' }}>✦</span>
        </div>
      )}

      {/* Reading Navigation & HUD (Fades in when book floats into view) */}
      <div
        style={{
          opacity: isFloating ? 1 : 0,
          pointerEvents: isFloating ? 'auto' : 'none',
          transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Navbar
          currentSpread={currentSpread}
          onNavigate={handleNavigate}
          isFloating={isFloating}
          onReturnToShelf={handleReturnToShelf}
        />

        <Ribbon onJumpContact={handleJumpContact} />

        <BookHUD
          currentSpread={currentSpread}
          currentSide={currentSide}
          isPortrait={isPortrait}
          onPrev={handlePrev}
          onNext={handleNext}
          showHint={showHint && isFloating}
        />
      </div>

      <LoadingOverlay isLoading={isLoading} />
    </>
  );
};

