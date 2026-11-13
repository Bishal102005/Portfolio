import { PersonalInfo, Project, Skill, TimelineItem } from '../types/portfolio';

export const ME: PersonalInfo = {
  name: 'Bishal Saha',
  role: 'Creative Developer',
  email: '12bishalsaha@email.com',
  links: [
    ['GitHub', 'https://github.com/Bishal102005', 'github.com/Bishal102005'],
    [
      'LinkedIn',
      'https://www.linkedin.com/in/bishal-saha-b37626255?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      'linkedin.com/in/bishal-saha'
    ],
    ['Résumé', 'https://example.com/resume.pdf', 'example.com/resume.pdf']
  ]
};

export const INTRO = [
  'I build interfaces that feel like objects: weighty, tactile and quietly surprising.',
  'Every project in this book is a chapter. Each began as a problem someone could not solve with a flat page, and ended as something people could handle.'
];

export const PROJ: Project[] = [
  {
    t: 'Aurora',
    sub: 'Real-time analytics dashboard',
    yr: 2025,
    role: 'Lead front-end engineer',
    c: ['#0b3a42', '#35d0ba'],
    ch: 'Teams drowned in forty disconnected reports and waited seconds for every chart.',
    ap: 'I rebuilt the data layer around streaming aggregates and drew every chart on one shared canvas scene.',
    out: 'Dashboards now render in under a second, and teams answer their own questions.',
    stack: ['React', 'D3', 'WebSockets', 'Rust'],
    m: [['−62%', 'load time'], ['3.1M', 'events a day']],
    q: '“It finally feels like the data is on our side.”'
  },
  {
    t: 'Lumen',
    sub: 'Immersive 3D product configurator',
    yr: 2024,
    role: 'Creative developer',
    c: ['#3b1d6e', '#ff7ac6'],
    ch: 'Shoppers could not picture a custom lamp from flat photos, so returns stayed high.',
    ap: 'A WebGL configurator with baked lighting, compressed models and a UI that never hides the product.',
    out: 'Conversion rose, returns fell, and the scene loads in under three seconds on mid-range phones.',
    stack: ['three.js', 'R3F', 'GLSL', 'Next.js'],
    m: [['+34%', 'conversion'], ['2.8s', 'mobile load']],
    q: '“The first configurator our customers actually finish.”'
  },
  {
    t: 'Fable',
    sub: 'Bedtime story app for children',
    yr: 2023,
    role: 'Product engineer and motion designer',
    c: ['#7a3b10', '#ffc857'],
    ch: 'Parents wanted calm screens that children could use without reading.',
    ap: 'A gesture-first interface with soft motion, offline narration and a separate parent mode.',
    out: 'Rated 4.8 stars, with children reaching story time in two taps.',
    stack: ['React Native', 'Reanimated', 'Lottie', 'Firebase'],
    m: [['4.8', 'store rating'], ['120k', 'downloads']],
    q: '“My daughter asks for it by name.”'
  }
];

export const SK: Skill[] = [
  ['Interactive 3D and WebGL', 92],
  ['React and Next.js', 95],
  ['Shaders and creative coding', 85],
  ['Motion and interface design', 88],
  ['Node and APIs', 80],
  ['Performance and accessibility', 90]
];

export const TOOLS: string[] = [
  'three.js',
  'React Three Fiber',
  'GLSL',
  'GSAP',
  'Framer Motion',
  'TypeScript',
  'Blender',
  'Figma',
  'Vercel',
  'Playwright',
  'Zustand',
  'Tailwind'
];

export const TL: TimelineItem[] = [
  ['2024 to now', 'Senior Creative Developer', 'Studio Nova', 'Leading interactive work for brands, from launch microsites to 3D product tools.'],
  ['2022 to 2024', 'Front-end Engineer', 'Pixel & Co', 'Built design systems and shipped animation-heavy marketing sites.'],
  ['2020 to 2022', 'UI Developer', 'Freelance', 'Delivered sites and apps for start-ups across four countries.'],
  ['2016 to 2020', 'B.Tech, Computer Science', 'University', 'Graphics, human-computer interaction and a thesis on real-time rendering.']
];

export const NAMES: string[] = ['cover', 'intro', 'aurora', 'lumen', 'fable', 'skills', 'journey', 'contact', 'end'];

export const LABEL: string[] = [
  'Cover',
  'Foreword and contents',
  'Aurora',
  'Lumen',
  'Fable',
  'Skills and tools',
  'Journey',
  'Contact',
  'Back cover'
];

export const NAV: [label: string, spreadIndex: number][] = [
  ['Cover', 0],
  ['Intro', 1],
  ['Work', 2],
  ['Skills', 5],
  ['Journey', 6],
  ['Contact', 7]
];

