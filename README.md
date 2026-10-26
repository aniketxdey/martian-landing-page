# martian-ai.com

The marketing site for Martian. It's a Vite + React + Tailwind app that started as a Lovable project, and Lovable still syncs with this repo, so edits made there show up here as commits (and the other way around).

## Pages

- `/` is the homepage (`src/pages/Index.tsx`). Product media lives in `src/content/media.ts` and the integrations list in `src/content/integrations.ts`.
- `/demo` is the sandbox (`src/pages/Demo.tsx`). It frames a static build of the Martian console from `public/demo-app/`; `public/demo-app/README.md` explains how that bundle gets there.

"Get a demo" opens the request form in `src/components/DemoRequestDialog.tsx`, which posts to the Supabase edge function `send-demo-request` in `supabase/functions/`.

## Running it

```sh
npm install
npm run dev        # http://localhost:8080
npm run build      # production build in dist/
```

## Writing copy

Two writing skills sit in `.claude/skills/` (`rewrite-slop` and `anti-ai-slop-writing`). Any new copy on the site should follow them: no em dashes, no reflexive lists of three, contractions, specific numbers over adjectives, and nothing the product doesn't actually do. The one exception is the tagline, "Agents That Eliminate Your Infrastructure Waste", which stays exactly as written.

## Motion

Route changes use the View Transitions API (with a curtain fallback) and pass through the brand orange or black; sections reveal as they scroll in. All of it lives in `src/components/site/` and the bottom of `src/index.css`, and all of it switches off when someone has reduced motion turned on.
