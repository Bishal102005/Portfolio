import { Project } from '../types/portfolio';

export const TW = 700;
export const TH = 990;
export const INK = '#140c18';
export const GOLD = '#d96b34';
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
  // Warm Ivory Vellum Paper
  g.fillStyle = '#fff9f5';
  g.fillRect(0, 0, TW, TH);

  // Delicate soft spine gutter shadow
  const r = f % 2 === 0;
  const gr = r ? g.createLinearGradient(0, 0, 75, 0) : g.createLinearGradient(TW, 0, TW - 75, 0);
  gr.addColorStop(0, 'rgba(25, 12, 30, 0.06)');
  gr.addColorStop(1, 'rgba(25, 12, 30, 0)');
  g.fillStyle = gr;
  g.fillRect(r ? 0 : TW - 75, 0, 75, TH);

  // Crisp high-contrast page number
  T(g, String(f), r ? TW - 60 : 60, TH - 50, '600 15px ' + SANS, '#5a425c', r ? 'right' : 'left');
}

export const mx = (f: number) => (f % 2 === 0 ? 90 : 60);

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
  gr.addColorStop(1, '#0e0316');
  g.fillStyle = gr;
  g.fillRect(x, y, w, h);
  const cx = x + w / 2;
  const cy = y + h / 2;

  if (k === 0) {
    // Aurora: Vibrant coral waveform and telemetry bars
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
    // Lumen: Radiant solar orb with glowing concentric rings
    const s = g.createRadialGradient(cx - 50, cy - 70, 10, cx, cy, 190);
    s.addColorStop(0, '#ffffff');
    s.addColorStop(0.35, p.c[1]);
    s.addColorStop(1, p.c[0]);
    g.fillStyle = s;
    g.beginPath();
    g.arc(cx, cy, 175, 0, 7);
    g.fill();
    g.strokeStyle = 'rgba(255,255,255,.65)';
    g.lineWidth = 2.5;
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
    // Fable: Espresso device with radiant sunset gold cards
    g.fillStyle = '#180a03';
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
    g.fillStyle = '#ff7a59';
    g.beginPath();
    g.arc(cx + 58, y + 130, 30, 0, 7);
    g.fill();
    for (let i = 0; i < 3; i++) {
      g.fillStyle = 'rgba(255,255,255,.16)';
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
  g.strokeStyle = 'rgba(38, 21, 46, 0.2)';
  g.lineWidth = 1.5;
  g.beginPath();
  if (typeof (g as any).roundRect === 'function') {
    (g as any).roundRect(x, y, w, h, 18);
  } else {
    g.rect(x, y, w, h);
  }
  g.stroke();
}

