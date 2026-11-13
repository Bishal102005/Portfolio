'use client';

import React from 'react';
import { Book3D } from '@/components/book/Book3D';
import { NoWebGLFallback } from '@/components/book/NoWebGLFallback';

export const App: React.FC = () => {
  return (
    <>
      {/* Semantic Accessible & SEO Content for Screen Readers and Web Crawlers */}
      <NoWebGLFallback />

      {/* Interactive 3D Three.js Book Experience */}
      <Book3D />
    </>
  );
};

export default App;

