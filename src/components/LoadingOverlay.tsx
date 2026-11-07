'use client';

import React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div id="load" style={{ opacity: isLoading ? 1 : 0, pointerEvents: 'none' }}>
      Opening the book…
    </div>
  );
};
