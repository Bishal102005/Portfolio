'use client';

import React, { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      id="load"
      className={isExiting ? 'exiting' : ''}
      aria-live="polite"
      aria-label="Welcome to my Portfolio"
    >
      <div className="welcome-ambient-glow" aria-hidden="true" />
      <div className="welcome-particles" aria-hidden="true">
        <div className="welcome-particle" style={{ width: 6, height: 6, top: '28%', left: '22%', animationDelay: '0s' }} />
        <div className="welcome-particle" style={{ width: 4, height: 4, top: '42%', left: '78%', animationDelay: '1.2s' }} />
        <div className="welcome-particle" style={{ width: 8, height: 8, top: '65%', left: '30%', animationDelay: '2.4s' }} />
        <div className="welcome-particle" style={{ width: 5, height: 5, top: '72%', left: '68%', animationDelay: '0.8s' }} />
        <div className="welcome-particle" style={{ width: 4, height: 4, top: '20%', left: '62%', animationDelay: '1.8s' }} />
      </div>

      <div className="welcome-container">
        <div className="welcome-icon-wrap" aria-hidden="true">
          <div className="welcome-icon-glow" />
          <svg className="welcome-book-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 10C18 7.5 10 8.5 6 11.5V37.5C10 34.5 18 33.5 24 36V10Z" fill="rgba(245, 158, 11, 0.18)" />
            <path d="M24 10C30 7.5 38 8.5 42 11.5V37.5C38 34.5 30 33.5 24 36V10Z" fill="rgba(245, 158, 11, 0.28)" />
            <path d="M24 10C18 7.5 10 8.5 6 11.5V37.5C10 34.5 18 33.5 24 36V10Z" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 10C30 7.5 38 8.5 42 11.5V37.5C38 34.5 30 33.5 24 36V10Z" stroke="#fef3c7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24 10V36" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M24 10V22L26.5 19.5L29 22V10.5" fill="#d97706" opacity="0.85" />
          </svg>
        </div>

        <div className="welcome-tag">
          <span className="welcome-tag-star">✦</span>
          <span>BISHAL SAHA</span>
          <span className="welcome-tag-star">✦</span>
        </div>

        <h1 className="welcome-title">Welcome to my Portfolio</h1>

        <div className="welcome-progress-wrap" role="progressbar" aria-label="Loading workspace">
          <div className="welcome-progress-bar" />
        </div>

        <p className="welcome-status">
          Entering 3D Developer Studio
          <span className="welcome-status-dots" aria-hidden="true">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      </div>
    </div>
  );
};
