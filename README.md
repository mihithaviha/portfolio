# Miha Portfolio

Portfolio of Mihitha Viharini, built with **React** + **Framer Motion** and plain CSS (Vite for tooling,
React Router for `/licensing` and `/404`). Projects open in a pop-up on the home page.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run preview
```

## Deploy

`npm run build` creates a static site in `dist/`. Any static host works, as long as unknown paths fall
back to `index.html` (`/licensing` and `/404` are client-side routes):

- **Netlify:** build command `npm run build`, publish directory `dist` (`public/_redirects` is included).
- **Vercel:** framework preset "Vite" (`vercel.json` is included).
- **Other hosts:** add a rewrite of every path to `/index.html`.

## Structure

| Path | What |
| --- | --- |
| `src/sections/*` | Hero, About, Stack, Skills, Contact ("get in touch"), Projects |
| `src/components/*` | Nav, Button, Footer, ProjectCard |
| `src/pages/*` | Home, ProjectPage (case studies), Licensing, NotFound |
| `src/data/content.js` | All home-page copy (about text, stack cards, skills, links) |
| `src/data/projects.js` | Projects: `github` and `preview` (live link, optional) drive the pop-up buttons |
| `public/images/*` | Images used by the site |
| `src/styles.css` | Styles; desktop >= 1200px, tablet 810-1199px, mobile <= 809px |

## Notes

- The scroll-driven motion (hero parallax, stacking about cards, growing stack cards, nav indicator)
  was measured from the live site and reproduced with `useScroll` / `useTransform`.
- Footer email, phone, LinkedIn and GitHub links live in `src/data/content.js`.
- The 3D images and the Cohesion layout come from a third-party Framer template; check its license
  (see `/licensing`) before publishing commercially.
