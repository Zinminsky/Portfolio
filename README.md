# Zin Min Aung — Portfolio

Animated personal portfolio built with **React 19, TypeScript, Vite and Motion**.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
npm run dev        # opens http://localhost:5173
```

## Before you deploy

1. **Add your images.** Copy the `images` folder from your old site into `public/images/`.
   The portrait is expected at `public/images/Mr.Zin.jpg` (until it's there, the site shows "ZA").
2. **Project images (optional).** In `src/data.ts`, add `image: "/images/your-file.jpg"` to any project.
   Projects without an image show an animated letter on a coloured background.
3. **Fill in your links.** In `src/data.ts`, set `github` and `linkedin` in `profile`.
4. **Check your CV.** `public/ZinMinAung_CV.pdf` is what the "Download CV" buttons serve.

All text — summary, projects, experience, skills, testimonials — is in `src/data.ts`.

## Deploy to Netlify

**Option A — connect GitHub (recommended, also shows recruiters your code):**
1. Push this folder to a new GitHub repository.
2. In Netlify: *Add new site → Import an existing project → GitHub* and pick the repo.
3. Netlify reads `netlify.toml` automatically (build: `npm run build`, publish: `dist`). Click Deploy.
4. To keep your current URL, do this inside your existing `zma-portfolio` site:
   *Site configuration → Build & deploy → Link repository*.

**Option B — drag and drop:**
1. Run `npm run build`.
2. Drag the `dist` folder onto your site's *Deploys* page in Netlify.

## Where the animations live

| Effect | File |
| --- | --- |
| Name reveal, rotating roles, floating badges, parallax | `src/components/Hero.tsx` |
| Scroll progress bar, active nav link | `src/components/Nav.tsx` |
| Fade-up on scroll (reused everywhere) | `src/components/Reveal.tsx` |
| Counters, 3D tilt cards, timeline fill, testimonial carousel | `src/components/Sections.tsx` |

Visitors who turn on "reduce motion" in their operating system get a still version
(`MotionConfig reducedMotion="user"` in `App.tsx`).
