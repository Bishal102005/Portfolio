import React from 'react';
import { Hero } from '../Hero';
import { About } from '../About';
import { Projects } from '../Projects';
import { Skills } from '../Skills';
import { Achievements } from '../Achievements';
import { Contact } from '../Contact';
import { Footer } from '../Footer';

export const NoWebGLFallback: React.FC = () => {
  return (
    <main className="sr" id="sr">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
};

