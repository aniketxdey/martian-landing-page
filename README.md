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

New copy on the site follows the two writing skills in `.claude/skills/`. The banned words and phrases are in `anti-ai-slop-writing/references/banned-words.md`, and the sentence rules are in `rewrite-slop/references/voice-profile.md`. In practice, that means naming the one specific thing the product does in plain verbs. If a sentence needs a claim the platform can't back up, cut the sentence. The tagline, "Agents That Eliminate Your Infrastructure Waste", is the one line that stays exactly as written.

## Motion and interaction

Route changes use the View Transitions API, with a curtain for browsers that don't have it, and pass through the brand orange or black. Sections reveal as they scroll in.

The hover states are shared with the platform, so the class names matter:

- `.btn` turns any button orange (`#D2401A`) on hover, and `.btn-accent` gives buttons that are already orange a lift and a shadow instead.
- `.link-u` draws the underline that grows out from the center.
- `.card-lift` raises a card 2px and warms its border.
- `data-cursor="Label"` marks a region where the orange cursor follower appears (`src/components/site/Cursor.tsx`).

Every `MediaSlot` opens in the lightbox (`src/components/site/Lightbox.tsx`) when clicked.

Everything lives in `src/components/site/` and the bottom of `src/index.css`. All of it switches off with reduced motion, and the cursor follower also stays off on touch screens.
