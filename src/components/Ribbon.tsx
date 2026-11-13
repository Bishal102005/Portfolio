'use client';

import React from 'react';

interface RibbonProps {
  onJumpContact: () => void;
}

export const Ribbon: React.FC<RibbonProps> = ({ onJumpContact }) => {
  return (
    <button
      className="rib"
      id="rib"
      aria-label="Jump to contact page"
      onClick={onJumpContact}
    >
      Contact
    </button>
  );
};

