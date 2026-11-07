import { ME, INTRO, PROJ, SK, TOOLS, TL } from '../constants/portfolioData';
import { Project } from '../types/portfolio';

export const TW = 700;
export const TH = 990;
export const INK = '#2b211b';
export const GOLD = '#d6a756';
export const SERIF = '"Playfair Display", Georgia, serif';
export const SANS = 'Inter, system-ui, sans-serif';

export type HitZone = [yMin: number, yMax: number, target: number | string];
export const HIT: Record<number, HitZone[]> = {};

export const T = (
  g: CanvasRenderingContext2D,
  s: string,
  x: number,
  y: number,
  f: string,
  c: string,
  a: CanvasTextAlign = 'left'
) => {
  g.font = f;
  g.fillStyle = c;
  g.textAlign = a;
  g.fillText(s, x, y);
};

export function wrap(
  g: CanvasRenderingContext2D,
  t: string,
  x: number,
  y: number,
  w: number,
  lh: number
): number {
  let l = '';
  for (const w2 of t.split(' ')) {
    const n = l ? l + ' ' + w2 : w2;
    if (g.measureText(n).width > w && l) {
      g.fillText(l, x, y);
      y += lh;
      l = w2;
    } else {
      l = n;
    }
  }
  g.fillText(l, x, y);
  return y + lh;
}

export function paper(g: CanvasRenderingContext2D, f: number) {
  g.fillStyle = '#f4ecda';
  g.fillRect(0, 0, TW, TH);
  for (let i = 0; i < 600; i++) {
    g.fillStyle = `rgba(90,60,30,${Math.random() * 0.05})`;
    g.fillRect(Math.random() * TW, Math.random() * TH, 2, 2);
  }
  const r = f % 2 === 0;
  const gr = r ? g.createLinearGradient(0, 0, 90, 0) : g.createLinearGradient(TW, 0, TW - 90, 0);
  gr.addColorStop(0, 'rgba(60,35,15,.32)');
  gr.addColorStop(1, 'rgba(60,35,15,0)');
  g.fillStyle = gr;
  g.fillRect(r ? 0 : TW - 90, 0, 90, TH);
  T(g, String(f), r ? TW - 60 : 60, TH - 50, '15px ' + SANS, '#8a7a66', r ? 'right' : 'left');
}

export const mx = (f: number) => (f % 2 === 0 ? 90 : 60);

export function leather(
  g: CanvasRenderingContext2D,
  big: string[],
  sub: string,
  note: string
) {
  const gr = g.createLinearGradient(0, 0, TW, TH);
  gr.addColorStop(0, '#5a2e24');
  gr.addColorStop(1, '#2e1510');
  g.fillStyle = gr;
  g.fillRect(0, 0, TW, TH);
  for (let i = 0; i < 2500; i++) {
    g.fillStyle = `rgba(0,0,0,${Math.random() * 0.12})`;
    g.fillRect(Math.random() * TW, Math.random() * TH, 2, 2);
  }
  g.strokeStyle = GOLD;
  g.lineWidth = 3;
  g.strokeRect(44, 44, TW - 88, TH - 88);
  g.lineWidth = 1;
  g.strokeRect(58, 58, TW - 116, TH - 116);
  T(g, big[0], TW / 2, 420, '700 84px ' + SERIF, GOLD, 'center');
  if (big[1]) T(g, big[1], TW / 2, 515, '700 84px ' + SERIF, GOLD, 'center');
  g.fillStyle = GOLD;
  g.fillRect(TW / 2 - 60, 560, 120, 2);
  T(g, sub, TW / 2, 615, 'italic 28px ' + SERIF, '#e8cf9b', 'center');
  T(g, note, TW / 2, TH - 120, '16px ' + SANS, '#c9a766', 'center');
}

export function cover(g: CanvasRenderingContext2D) {
  leather(g, ME.name.split(' '), ME.role + ', a portfolio', 'Open the cover to begin');
  T(g, 'Volume I', TW / 2, 230, 'italic 24px ' + SERIF, '#e8cf9b', 'center');
}

export function back(g: CanvasRenderingContext2D) {
  leather(g, ['Fin.'], 'Thank you for reading', 'Turn back, or write to me');
}

export function fore(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'Foreword', m, 150, '700 54px ' + SERIF, INK);
  g.fillStyle = GOLD;
  g.fillRect(m, 175, 70, 3);
  T(g, INTRO[0][0], m, 330, '700 130px ' + SERIF, '#a8742a');
  g.font = 'italic 25px ' + SERIF;
  g.fillStyle = INK;
  let y = wrap(g, INTRO[0].slice(1), m + 88, 250, 460, 38);
  g.font = '19px ' + SANS;
  g.fillStyle = '#3d3128';
  y = wrap(g, INTRO[1], m, y > 360 ? y + 20 : 380, 550, 32) + 10;
  y = wrap(g, 'Read it front to back, or use the contents on the facing page to jump to a chapter.', m, y, 550, 32);
  T(g, ME.name.split(' ')[0], m, y + 70, 'italic 46px ' + SERIF, '#5b4a3a');
}

export function toc(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'Contents', m, 150, '700 54px ' + SERIF, INK);
  g.fillStyle = GOLD;
  g.fillRect(m, 175, 70, 3);
  const E: [title: string, pageNum: number, spreadTarget: number][] = [
    ['Foreword', 1, 1],
    ['Aurora', 3, 2],
    ['Lumen', 5, 3],
    ['Fable', 7, 4],
    ['Skills and tools', 9, 5],
    ['Journey', 11, 6],
    ['Contact', 13, 7]
  ];
  HIT[f] = [];
  E.forEach((e, i) => {
    const y = 300 + i * 85;
    T(g, e[0], m, y, '500 29px ' + SERIF, INK);
    T(g, String(e[1]), m + 550, y, '20px ' + SANS, '#7a6a56', 'right');
    g.save();
    g.setLineDash([2, 7]);
    g.strokeStyle = '#a89880';
    g.beginPath();
    g.moveTo(m + g.measureText(e[0]).width + 14, y);
    g.lineTo(m + 510, y);
    g.stroke();
    g.restore();
    HIT[f].push([y - 36, y + 26, e[2]]);
  });
  T(g, 'Tap a title to turn straight to it.', m, TH - 110, 'italic 18px ' + SERIF, '#7a6a56');
}

export function art(
  g: CanvasRenderingContext2D,
  k: number,
  p: Project,
  x: number,
  y: number,
  w: number,
  h: number
) {
  g.save();
  g.beginPath();
  if (typeof (g as any).roundRect === 'function') {
    (g as any).roundRect(x, y, w, h, 18);
  } else {
    g.rect(x, y, w, h);
  }
  g.clip();
  const gr = g.createLinearGradient(x, y, x + w, y + h);
  gr.addColorStop(0, p.c[0]);
  gr.addColorStop(1, '#0a0a0f');
  g.fillStyle = gr;
  g.fillRect(x, y, w, h);
  const cx = x + w / 2;
  const cy = y + h / 2;

  if (k === 0) {
    g.strokeStyle = 'rgba(255,255,255,.08)';
    for (let i = 1; i < 7; i++) {
      g.beginPath();
      g.moveTo(x, y + (i * h) / 7);
      g.lineTo(x + w, y + (i * h) / 7);
      g.stroke();
    }
    for (let i = 0; i < 14; i++) {
      const bh = 70 + (Math.sin(i * 1.3) + 1.3) * 120;
      const bx = x + 30 + i * 38;
      g.fillStyle = p.c[1] + '55';
      g.fillRect(bx, y + h - 30 - bh, 26, bh);
    }
    g.strokeStyle = p.c[1];
    g.lineWidth = 5;
    g.beginPath();
    for (let i = 0; i <= 14; i++) {
      const px = x + 43 + i * 38;
      const py = y + h - 190 - Math.sin(i * 0.7) * 80 - i * 12;
      i ? g.lineTo(px, py) : g.moveTo(px, py);
    }
    g.stroke();
  }

  if (k === 1) {
    const s = g.createRadialGradient(cx - 50, cy - 70, 10, cx, cy, 190);
    s.addColorStop(0, '#fff');
    s.addColorStop(0.35, p.c[1]);
    s.addColorStop(1, p.c[0]);
    g.fillStyle = s;
    g.beginPath();
    g.arc(cx, cy, 175, 0, 7);
    g.fill();
    g.strokeStyle = 'rgba(255,255,255,.5)';
    g.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      g.beginPath();
      g.ellipse(cx, cy, 255, 60 + i * 28, -0.45, 0, 7);
      g.stroke();
    }
    [
      [x + 80, y + 90, 22],
      [x + w - 70, y + h - 100, 30],
      [x + w - 120, y + 80, 14]
    ].forEach((o) => {
      g.fillStyle = p.c[1];
      g.beginPath();
      g.arc(o[0], o[1], o[2], 0, 7);
      g.fill();
    });
  }

  if (k === 2) {
    g.fillStyle = '#1a1210';
    g.beginPath();
    if (typeof (g as any).roundRect === 'function') {
      (g as any).roundRect(cx - 125, y + 45, 250, 550, 36);
    } else {
      g.rect(cx - 125, y + 45, 250, 550);
    }
    g.fill();
    g.fillStyle = p.c[0];
    g.beginPath();
    if (typeof (g as any).roundRect === 'function') {
      (g as any).roundRect(cx - 111, y + 59, 222, 522, 26);
    } else {
      g.rect(cx - 111, y + 59, 222, 522);
    }
    g.fill();
    g.fillStyle = p.c[1];
    g.beginPath();
    g.arc(cx + 45, y + 140, 34, 0, 7);
    g.fill();
    g.fillStyle = p.c[0];
    g.beginPath();
    g.arc(cx + 58, y + 130, 30, 0, 7);
    g.fill();
    for (let i = 0; i < 3; i++) {
      g.fillStyle = 'rgba(255,255,255,.14)';
      g.beginPath();
      if (typeof (g as any).roundRect === 'function') {
        (g as any).roundRect(cx - 90, y + 220 + i * 100, 180, 82, 16);
      } else {
        g.rect(cx - 90, y + 220 + i * 100, 180, 82);
      }
      g.fill();
      g.fillStyle = p.c[1];
      g.beginPath();
      g.arc(cx - 56, y + 261 + i * 100, 20, 0, 7);
      g.fill();
    }
  }

  g.restore();
  g.strokeStyle = 'rgba(60,40,20,.5)';
  g.lineWidth = 2;
  g.beginPath();
  if (typeof (g as any).roundRect === 'function') {
    (g as any).roundRect(x, y, w, h, 18);
  } else {
    g.rect(x, y, w, h);
  }
  g.stroke();
}

export function vis(g: CanvasRenderingContext2D, f: number) {
  const k = Math.floor((f - 3) / 2);
  const p = PROJ[k];
  const m = mx(f);
  paper(g, f);
  art(g, k, p, m, 110, 550, 650);
  T(g, 'Figure ' + (k + 1) + '. ' + p.t + ', ' + p.sub.toLowerCase(), m, 805, 'italic 20px ' + SERIF, '#5b4a3a');
  g.font = 'italic 24px ' + SERIF;
  g.fillStyle = INK;
  wrap(g, p.q, m, 860, 550, 34);
}

export function story(g: CanvasRenderingContext2D, f: number) {
  const k = Math.floor((f - 4) / 2);
  const p = PROJ[k];
  const m = mx(f);
  paper(g, f);
  T(g, 'Chapter ' + ['one', 'two', 'three'][k], m, 110, '600 17px ' + SANS, '#9a7b3f');
  T(g, p.t, m, 185, '700 72px ' + SERIF, INK);
  T(g, p.sub, m, 228, 'italic 25px ' + SERIF, '#5b4a3a');
  T(g, p.role + ', ' + p.yr, m, 264, '15px ' + SANS, '#8a7a66');
  let y = 330;
  [
    ['The challenge', p.ch],
    ['The approach', p.ap],
    ['The outcome', p.out]
  ].forEach(([h, t]) => {
    T(g, h, m, y, '700 23px ' + SERIF, INK);
    g.font = '17px ' + SANS;
    g.fillStyle = '#3d3128';
    y = wrap(g, t, m, y + 32, 550, 27) + 24;
  });
  let x = m;
  y += 6;
  p.stack.forEach((s) => {
    g.font = '600 14px ' + SANS;
    const w = g.measureText(s).width + 26;
    g.fillStyle = 'rgba(60,40,20,.09)';
    g.beginPath();
    if (typeof (g as any).roundRect === 'function') {
      (g as any).roundRect(x, y, w, 32, 16);
    } else {
      g.rect(x, y, w, 32);
    }
    g.fill();
    T(g, s, x + 13, y + 21, '600 14px ' + SANS, '#4b3b2d');
    x += w + 8;
  });
  p.m.forEach((q, i) => {
    const bx = m + i * 280;
    T(g, q[0], bx, y + 170, '700 60px ' + SERIF, '#a8742a');
    T(g, q[1], bx, y + 202, '16px ' + SANS, '#7a6a56');
  });
}

export function skillsA(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'Appendix A', m, 110, '600 17px ' + SANS, '#9a7b3f');
  T(g, 'Skills', m, 185, '700 62px ' + SERIF, INK);
  SK.forEach((s, i) => {
    const y = 290 + i * 105;
    T(g, s[0], m, y, '500 24px ' + SERIF, INK);
    g.fillStyle = 'rgba(60,40,20,.12)';
    g.fillRect(m, y + 18, 550, 10);
    g.fillStyle = '#a8742a';
    g.fillRect(m, y + 18, 5.5 * s[1], 10);
    T(g, s[1] + '%', m + 550, y, '15px ' + SANS, '#7a6a56', 'right');
  });
}

export function skillsB(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'Appendix B', m, 110, '600 17px ' + SANS, '#9a7b3f');
  T(g, 'Toolbox', m, 185, '700 62px ' + SERIF, INK);
  let x = m;
  let y = 260;
  TOOLS.forEach((s) => {
    g.font = '600 17px ' + SANS;
    const w = g.measureText(s).width + 32;
    if (x + w > m + 550) {
      x = m;
      y += 58;
    }
    g.fillStyle = 'rgba(60,40,20,.09)';
    g.beginPath();
    if (typeof (g as any).roundRect === 'function') {
      (g as any).roundRect(x, y, w, 40, 20);
    } else {
      g.rect(x, y, w, 40);
    }
    g.fill();
    T(g, s, x + 16, y + 26, '600 17px ' + SANS, '#4b3b2d');
    x += w + 10;
  });
  T(g, 'Currently exploring', m, 600, '700 23px ' + SERIF, INK);
  g.font = '18px ' + SANS;
  g.fillStyle = '#3d3128';
  wrap(
    g,
    'WebGPU, procedural audio and ways to make 3D pages load faster than the text around them.',
    m,
    634,
    550,
    30
  );
  g.font = 'italic 26px ' + SERIF;
  g.fillStyle = '#5b4a3a';
  wrap(g, 'Good tools disappear. The work is what is left on the table.', m, 790, 500, 38);
}

export function time(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  const a = f === 11;
  T(g, 'Appendix C', m, 110, '600 17px ' + SANS, '#9a7b3f');
  T(g, a ? 'Journey' : 'Journey, continued', m, 185, '700 ' + (a ? 62 : 44) + 'px ' + SERIF, INK);
  g.strokeStyle = '#c9b48a';
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(m + 8, 260);
  g.lineTo(m + 8, 800);
  g.stroke();
  TL.slice(a ? 0 : 2, a ? 2 : 4).forEach((e, i) => {
    const y = 290 + i * 270;
    g.fillStyle = '#a8742a';
    g.beginPath();
    g.arc(m + 8, y - 6, 9, 0, 7);
    g.fill();
    T(g, e[0], m + 40, y, '600 16px ' + SANS, '#9a7b3f');
    T(g, e[1], m + 40, y + 40, '700 28px ' + SERIF, INK);
    T(g, e[2], m + 40, y + 72, 'italic 21px ' + SERIF, '#5b4a3a');
    g.font = '17px ' + SANS;
    g.fillStyle = '#3d3128';
    wrap(g, e[3], m + 40, y + 108, 500, 27);
  });
}

export function conL(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'The last chapter', m, 110, '600 17px ' + SANS, '#9a7b3f');
  g.font = 'italic 700 52px ' + SERIF;
  g.fillStyle = INK;
  let y = wrap(g, 'Let’s write the next one together.', m, 200, 550, 66);
  g.font = '19px ' + SANS;
  g.fillStyle = '#3d3128';
  y = wrap(
    g,
    'I take on a few projects each year: interactive sites, 3D product experiences and design-system work.',
    m,
    y + 30,
    520,
    32
  );
  wrap(
    g,
    'If you have a problem that a flat page cannot solve, tell me about it. I reply within two working days.',
    m,
    y + 20,
    520,
    32
  );
}

export function conR(g: CanvasRenderingContext2D, f: number) {
  paper(g, f);
  const m = mx(f);
  T(g, 'Contact', m, 150, '700 54px ' + SERIF, INK);
  g.fillStyle = GOLD;
  g.fillRect(m, 175, 70, 3);
  const R: [string, string, string][] = [
    ['Email', ME.email, 'mailto:' + ME.email],
    ...ME.links.map((l) => [l[0], l[2], l[1]] as [string, string, string])
  ];
  HIT[f] = [];
  R.forEach((r, i) => {
    const y = 290 + i * 130;
    T(g, r[0], m, y, '600 16px ' + SANS, '#9a7b3f');
    T(g, r[1], m, y + 42, '500 31px ' + SERIF, INK);
    g.fillStyle = '#a8742a';
    g.fillRect(m, y + 56, g.measureText(r[1]).width, 2);
    HIT[f].push([y - 30, y + 66, r[2]]);
  });
  T(g, 'Tap any line to open it.', m, TH - 110, 'italic 18px ' + SERIF, '#7a6a56');
}

export const FACES = [
  cover,
  fore,
  toc,
  vis,
  story,
  vis,
  story,
  vis,
  story,
  skillsA,
  skillsB,
  time,
  time,
  conL,
  conR,
  back
];
