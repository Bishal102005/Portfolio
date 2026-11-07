# 3D Book Portfolio – Bishal Saha

An interactive 3D book portfolio website where visitors open the leather cover, flip pages that bend with authentic paper physics, and explore your projects, skills, and journey chapter by chapter.

Built as a single self-contained HTML page powered by Three.js and the HTML5 Canvas API—no complex build pipelines required.

---

## 🚀 Quick Start

Run a local server from this directory:

```bash
# Using npm:
npm start

# Or using npx directly:
npx serve .

# Or using Python 3:
python -m http.server 8000
```

Then open `http://localhost:3000` (or `http://localhost:8000`) in your web browser.

---

## 📖 Book Structure

| Spread | Pages | Content |
|---|---|---|
| **Cover** | 0 | Leather embossed book cover with your name and role |
| **Intro** | 1–2 | Foreword and interactive table of contents |
| **Aurora** | 3–4 | Project 1: Generated figure & case study |
| **Lumen** | 5–6 | Project 2: Configurators / 3D web |
| **Fable** | 7–8 | Project 3: Mobile / Gesture apps |
| **Skills** | 9–10 | Visual skill bars and tool tags |
| **Journey** | 11–12 | Career timeline |
| **Contact** | 13–14 | Epilogue and clickable contact links (Email, GitHub, LinkedIn) |
| **End** | 15 | Back cover ("Fin.") |

---

## 🎨 How to Personalize

All personal content is organized at the top of the `<script>` tag in [`index.html`](./index.html) under the comment `/* CONTENT: edit everything here */`:

```javascript
const ME = {
  name: 'Bishal Saha',
  role: 'Creative Developer',
  email: 'hello@bishalsaha.com',
  links: [
    ['GitHub', 'https://github.com/bishalsaha', 'github.com/bishalsaha'],
    ['LinkedIn', 'https://linkedin.com/in/bishalsaha', 'linkedin.com/in/bishalsaha'],
    ['Résumé', 'https://example.com/resume.pdf', 'example.com/resume.pdf']
  ]
};
```

### Adding Your Real Project Screenshots
1. Save your project screenshots (around 1100×1300 px, <300 KB) in the root folder (e.g., `project1.jpg`).
2. Add an `img: 'project1.jpg'` field to the corresponding project object in `PROJ`.
3. Preload the images and render them inside `vis()` on the canvas as described in Section 5 of the guide.

---

## 🚢 Free Deployment Options

- **GitHub Pages**: Push this repository to GitHub, go to **Settings → Pages**, and select the `main` branch root `/`.
- **Vercel / Netlify**: Connect your repository or drag-and-drop the folder directly onto Netlify Drop.
