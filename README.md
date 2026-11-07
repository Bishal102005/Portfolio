# 3D Book Portfolio – Bishal Saha (Next.js & Node.js)

An interactive, physics-based 3D book portfolio built with **Next.js (App Router)**, **React 19**, **Three.js**, and a **Node.js** backend API.

Visitors can open the embossed leather cover, flip through realistic bending pages with authentic paper physics, and read your work chapter by chapter.

---

## 🏗️ Project Architecture & File Structure

```
d:\Projects\Portfolio\
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with font optimization & Person JSON-LD
│   │   ├── page.tsx               # Main page hosting 3D book & semantic SSR layer
│   │   ├── globals.css            # Styles, theme variables (light/dark), animations
│   │   └── api/                   # Node.js backend routes
│   │       ├── contact/route.ts   # POST /api/contact - handles inquiries with validation
│   │       └── portfolio/route.ts # GET /api/portfolio - dynamic portfolio data endpoint
│   ├── components/
│   │   ├── Book3D.tsx             # Canvas controller, lifecycle, pointer events
│   │   ├── BookHeader.tsx         # Branded top bar with chapter navigation
│   │   ├── BookHUD.tsx            # Previous / Next buttons & page counter indicator
│   │   ├── Ribbon.tsx             # Red bookmark ribbon jumping to Contact
│   │   ├── LoadingOverlay.tsx     # Smooth loading screen fadeout
│   │   └── NoWebGLFallback.tsx    # Semantic SEO and screen reader fallback
│   └── lib/
│       ├── constants/
│       │   └── portfolioData.ts   # Centralized data: ME, INTRO, PROJ, SK, TOOLS, TL
│       ├── three/
│       │   ├── bookEngine.ts      # Three.js scene, bending page physics, raycasting
│       │   └── pageDrawers.ts     # HTML5 Canvas drawers for all 16 page faces
│       └── types/
│           └── portfolio.ts       # TypeScript definitions
├── public/                        # Static assets, images, icons
├── next.config.mjs                # Next.js configuration
├── tsconfig.json                  # TypeScript compiler settings
├── package.json                   # Project scripts and dependencies
└── index.html                     # Original standalone single-file version
```

---

## 🚀 Running the Project

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Run
```bash
npm run build
npm start
```

---

## ⚡ Key Features

- **Realistic Bending Page Physics**: A 26-segment plane geometry hinged on the spine bends with progressive trailing tips as pages turn.
- **Node.js API Routes**:
  - `GET /api/portfolio`: Serves Bishal Saha's portfolio structure, projects, and skills as JSON.
  - `POST /api/contact`: Validates and processes user messages and inquiries.
- **Full Interactivity**:
  - Click on either side of the open book to flip forward or backward.
  - Click any chapter line on the **Contents** page or contact link on the **Contact** page (mapped via canvas raycaster coordinates).
  - Drag / swipe horizontally on touchscreens or trackpads.
  - Keyboard arrow keys (`Left`, `Right`, `PageUp`, `PageDown`, `Home`, `End`).
  - Mouse wheel gestures.
- **SEO & Accessibility**:
  - Semantic HTML rendered via SSR for crawlers and screen readers.
  - Schema.org `Person` JSON-LD structured data.
  - Automatic `nogl` fallback if WebGL is unavailable.
- **Mobile Responsive**:
  - Automatically switches to a single-page view on narrow screens.

---

## 🛠️ Personalizing Your Content

All data is managed in [`src/lib/constants/portfolioData.ts`](./src/lib/constants/portfolioData.ts):
- `ME`: Name, role, email, and social links.
- `INTRO`: Foreword text.
- `PROJ`: Projects (titles, metrics, colors, case studies, technologies).
- `SK`: Skills and proficiency percentages.
- `TOOLS`: Toolbox tags.
- `TL`: Career timeline entries.
