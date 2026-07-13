# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The redesigned marketing site for **Joy First Interiors**, a Chennai-based, ISO-certified B2B interior fit-out / civil / HVAC / electrical / fire-alarm / networking / PMC contractor (real business, not a placeholder). It's a single long-scroll Next.js page built as an immersive, motion-heavy showcase (Three.js hero, GSAP ScrollTrigger, Lenis smooth scroll).

All business content (services, testimonials, certifications, contact info, process phases) is real, extracted from the client's existing site, and lives in one place — see "Content is data-driven" below. Do not invent business facts, stats, clients, or project photos; the current image sections deliberately use labeled `PlaceholderFrame` slots because no real project photography exists yet.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build — also runs the TypeScript check
npm run lint     # ESLint (flat config: eslint-config-next core-web-vitals + typescript)
npm start        # serve a production build
```

There is no test runner configured. Treat `npm run build` + `npm run lint` as the correctness gate for any change — both must pass clean before calling work done. `npm run build` type-checks; `npm run lint` also runs React Compiler's stricter hook rules (`react-hooks/purity`, `react-hooks/set-state-in-effect`, `react-hooks/refs` — see gotchas below).

## Architecture

**Single page, section-by-section.** `app/page.tsx` composes one section component per `<section>` from `components/sections/*` in scroll order. `app/layout.tsx` wraps everything in `SmoothScrollProvider` and renders the persistent `Nav` and `Footer` (the footer doubles as the site's Contact section, `id="contact"`).

**Content is data-driven.** `lib/content.ts` is the single source of truth for every real business fact (company info, services, process phases, projects, testimonials, reach states, contact details, nav). Section components import from here rather than hardcoding copy — when the client provides updated info, edit `lib/content.ts`, not the components.

**Component layers** (`components/`):
- `sections/` — one component per page section, composed by `app/page.tsx`.
- `layout/` — `Nav`, `Footer`, `CustomCursor`, `SmoothScrollProvider` (persistent chrome).
- `ui/` — reusable primitives: `RevealText` (masked scroll-in headings), `MagneticButton`, `SectionHeading`, `MaterialTile` (per-service hover treatment), `PlaceholderFrame` (labeled image slot for future real photography), `Marquee`, `StatBadge`, `SocialIcon`.
- `three/` — the R3F hero scene (`HeroScene.tsx`) and its procedural texture helper. Client-only: `Hero.tsx` loads it via `next/dynamic(..., { ssr: false })` since WebGL can't run server-side.

**Motion stack:**
- `lib/motion.ts` — re-exports `gsap`/`ScrollTrigger`, a `registerGsap()` guard (call once per component that uses ScrollTrigger; safe to call repeatedly), and a plain `prefersReducedMotion()` check for use inside effects.
- `lib/hooks.ts` — `useMediaQuery` / `usePrefersReducedMotion` / `usePointerFine`, built on `useSyncExternalStore`. Prefer these over `useState` + `useEffect(() => setX(...), [])` for anything that reads a browser media query into render/state — the manual pattern trips the `react-hooks/set-state-in-effect` lint rule and has SSR/hydration pitfalls that `useSyncExternalStore` avoids for free.
- `SmoothScrollProvider` wires Lenis's `raf` into `gsap.ticker` so Lenis-driven scroll and GSAP's ScrollTrigger stay in sync.
- Sections with scroll-driven GSAP work (`Process.tsx` is the reference example — a pinned horizontal scroll-through-vertical-scroll sequence) wrap their animation setup in `gsap.context()` scoped to a ref and `.revert()` it on cleanup, and skip entirely when `usePrefersReducedMotion()` is true.

**Design tokens live in CSS, not a Tailwind config file.** This is Tailwind v4 (CSS-first config, no `tailwind.config.js`). Colors, fonts, and custom `animate-*` utilities (marquee, flow, beacon pulse, glass sweep) are defined as CSS variables in `app/globals.css` under `:root` and mapped in `@theme inline`. Add new design tokens there, not in a JS config.

## Gotchas specific to this repo

- **`lucide-react` (the installed major version) has no brand/social icons** — `Instagram`, `Linkedin`, `Facebook`, `Youtube`, etc. don't exist in this package version. Social icons are hand-drawn inline SVGs in `components/ui/SocialIcon.tsx`, styled to match lucide's stroke weight. Don't reintroduce lucide brand icon imports without checking they actually exist first.
- **React Compiler lint rules are strict here.** No `Math.random()` (or other impure calls) inside render/`useMemo` — `HeroScene.tsx`'s fragment jitter uses a deterministic `seededJitter(id, salt)` hash instead. No `setState` synchronously inside a bare `useEffect` — use the `lib/hooks.ts` media-query hooks instead. Don't pass a `ref` into a dynamically-typed component variable (e.g. `as React.ElementType`) inside `createElement`/JSX — `RevealText.tsx` uses a `switch` over literal `h1`/`h2`/`h3`/`p` tags instead, specifically to keep ESLint's ref-purity check statically resolvable.
- **Word-spacing in `RevealText`**: words are split into individually-animated `inline-block` spans; a trailing space *inside* the last inline-block gets collapsed by the browser. Spacing between words is done via `flex flex-wrap gap-x-[0.28em]` on the container, not via a trailing space character — don't "simplify" this back to a plain string with embedded spaces.
- **No real project photography yet.** Use `PlaceholderFrame` (sized/labeled placeholder, not a fake stock photo) for any new image slot until the client supplies real assets.
