# btngoc.io.vn — portfolio

Personal portfolio of Ngoc Bui (Bùi Thế Ngọc), Software Engineer working in Node.js and Python.
One-page site with per-project case studies, fully static content, and a Telegram-backed contact form.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 4. No client-side animation library: the hero's
request-flow animation is CSS only and respects `prefers-reduced-motion`.

## Structure

- `/` — hero with a request-flow diagram, work, earlier client work, projects, stack, contact
- `/work/[slug]` — case study pages, statically generated; an optional `flow` renders a request path
- `/api/contact` — contact form endpoint, delivers to Telegram
- `src/data/` — ALL site content, typed TypeScript (no CMS, no database)

## Editing content

- Case studies: `src/data/case-studies.ts` — add an object; it is listed under Work and its page and sitemap entry
  are generated. Earlier client work (one line each, no page): `src/data/earlier-work.ts`.
- Hero diagram: the `flow` of the `smart-tech` case study, shown without its detail lines. Side projects:
  `src/data/projects.ts`. Stack: `src/data/skills.ts`. Profile, headline, and site URL: `src/data/site.ts`.
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
