export * from './drawUtils';

import { drawCover } from '@/components/Hero';
import { drawForeword } from '@/components/About';
import { drawTOC } from '@/components/Navbar';
import { drawProjectVisual, drawProjectStory } from '@/components/Projects';
import { drawSkillsA, drawSkillsB } from '@/components/Skills';
import { drawAchievements } from '@/components/Achievements';
import { drawContactLeft, drawContactRight } from '@/components/Contact';
import { drawBackCover } from '@/components/Footer';

// Aliases for backward compatibility
export const cover = drawCover;
export const fore = drawForeword;
export const toc = drawTOC;
export const vis = drawProjectVisual;
export const story = drawProjectStory;
export const skillsA = drawSkillsA;
export const skillsB = drawSkillsB;
export const time = drawAchievements;
export const conL = drawContactLeft;
export const conR = drawContactRight;
export const back = drawBackCover;

export const FACES = [
  drawCover,           // 0: Cover (Hero)
  drawForeword,        // 1: Foreword (About)
  drawTOC,             // 2: Contents (Navbar / TOC)
  drawProjectVisual,   // 3: Project 1 visual (Aurora)
  drawProjectStory,    // 4: Project 1 story
  drawProjectVisual,   // 5: Project 2 visual (Lumen)
  drawProjectStory,    // 6: Project 2 story
  drawProjectVisual,   // 7: Project 3 visual (Fable)
  drawProjectStory,    // 8: Project 3 story
  drawSkillsA,         // 9: Appendix A - Skills
  drawSkillsB,         // 10: Appendix B - Toolbox
  drawAchievements,    // 11: Appendix C - Journey page 1
  drawAchievements,    // 12: Appendix C - Journey page 2
  drawContactLeft,     // 13: Contact note
  drawContactRight,    // 14: Contact links
  drawBackCover        // 15: Back cover (Footer)
];
