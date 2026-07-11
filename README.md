# btngoc.io.vn — portfolio

Personal portfolio of Ngoc Bui, Software Engineer. Minimal one-page site with
per-project case studies, fully static content, and a Telegram-backed contact form.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 4 · lucide-react

## Structure

- `/` — one-page home: hero, services, selected work, more projects, tech stack, contact
- `/work/[slug]` — case study pages, statically generated
- `/api/contact` — contact form endpoint, delivers to Telegram
- `src/data/` — ALL site content, typed TypeScript (no CMS, no database)

## Editing content

- Case studies: `src/data/case-studies.ts` — add an object, the page and sitemap
  entry are generated automatically.
- Services, supporting projects, skills, personal info: sibling files in `src/data/`.
- CV: replace `public/cv.pdf`.

## Environment variables

- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — contact form delivery
- `NEXT_PUBLIC_GTM` — Google Tag Manager id

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (static)
```
