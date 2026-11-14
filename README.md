# btngoc.io.vn — portfolio

Personal portfolio of Ngoc Bui (Bùi Thế Ngọc), Software Engineer working in Node.js and Python.
One-page site with per-project case studies, fully static content, and a Telegram-backed contact form.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 4. No animation library: the hero's request
animation is a few timers plus CSS transitions, and respects `prefers-reduced-motion`.
Colours are CSS variables in `src/app/globals.css`: a light drawing palette, and a dark blueprint palette that
follows the visitor's system setting (`prefers-color-scheme`). Use the tokens, not fixed colours.

## Structure

- `/` — hero with an interactive drawing sheet (one tab per system: a request travels through it, each step
  explains itself on hover, focus, or tap), work, earlier client work, projects, stack, contact
- `/work/[slug]` — case study pages, statically generated; an optional `flow` renders its request path
- `/api/contact` — contact form endpoint, delivers to Telegram
- `src/data/` — ALL site content, typed TypeScript (no CMS, no database)

## Editing content

- Case studies: `src/data/case-studies.ts` — add an object; it is listed under Work and its page and sitemap entry
  are generated. Earlier client work (one line each, no page): `src/data/earlier-work.ts`.
- Hero sheet: the `flow` (name, caption, stages) of each case study in `heroSlugs` in
  `src/components/hero.tsx`, in tab order. Side projects: `src/data/projects.ts`. Stack: `src/data/skills.ts`.
  Profile, headline, and site URL: `src/data/site.ts`.
- CV: edit `cv/cv.html`, then export the PDF:

  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --no-pdf-header-footer \
    --print-to-pdf="public/BUI THE NGOC - SOFTWARE ENGINEER.pdf" cv/cv.html
  ```

## Environment variables

- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — contact form delivery
- `NEXT_PUBLIC_GTM` — Google Tag Manager id

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (static)
```
