# Msingi

**The Alkebulan Poetry Institute** — Africa's professional institute for poetry,
spoken word, and the creative economy.

*Msingi* is Swahili for "foundation." This is the foundation — where African
poets build a verified career, not just a portfolio.

---

## What's scaffolded here

This is a real, runnable Next.js 15 project scaffold — hand-written rather than
generated via `create-next-app` (no network access in the build environment),
so run `npm install` locally before `npm run dev`.

```
msingi/
├── src/
│   ├── app/                    # App Router — layout, home page
│   ├── components/
│   │   ├── ui/                 # Design system primitives (Button, RankBadge…)
│   │   └── landing/             # Landing page sections (Hero, Schools, Pathway…)
│   ├── lib/
│   │   └── supabase/            # Browser + server Supabase clients
│   └── styles/
│       └── globals.css          # Design tokens, base styles, component classes
├── supabase/
│   └── migrations/
│       ├── 0001_core_schema.sql # Full schema: profiles, applications, schools,
│       │                        # programmes, modules, lessons, enrollments,
│       │                        # credentials, badges, portfolio, community,
│       │                        # career center, rights management, RLS policies
│       └── 0002_seed_msi101.sql # Seeds the flagship MsI-101 programme
│                                 # (8 modules × 5 lessons + capstone)
├── tailwind.config.ts            # Brand tokens: ink / charcoal / ivory / burnt / gold
├── package.json
└── .env.example
```

## What's built vs. what's next

**Built in this pass:**
- Brand design system (colour tokens, typography scale, component classes)
- Landing page: Hero, Mission/Vision, Institute Pathway (8 ranks), Schools (10),
  final CTA, header, footer
- Core UI primitives: `Button` (with shared `buttonVariants` for Link reuse),
  `RankBadge` (maps the 8-tier member progression)
- Full Supabase schema covering every entity in the spec: profiles, applications
  (with RPL fields and AI assessment fields), schools → programmes → modules →
  lessons, enrollments, lesson progress, credentials, badges, portfolio items,
  chapters, mentorships, opportunities (Career Center), marketplace listings,
  rights requests — with Row Level Security policies on every user-owned table
- Seed data for all 10 Schools and the full MsI-101 flagship programme structure
- Supabase browser + server client setup (`@supabase/ssr`)

**Not yet built — next passes:**
1. Auth flows (sign up / sign in / magic link) and the onboarding wizard
   (pathway → country → language → RPL → AI assessment → learning plan)
2. Member Dashboard ("My Journey": rank, progress, mentor, opportunities, AI coach)
3. Lesson player (video/audio/reading/quiz/peer-review UI per lesson type)
4. Professional Profile page (public-facing, LinkedIn × Behance model)
5. Career Center + Marketplace listing/browse UI
6. AI Learning Assistant (persistent chat — critique, translate, coach)
7. Admin dashboard
8. Payments integration (Stripe / Flutterwave / M-Pesa)
9. Mobile PWA + offline mode

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in Supabase + payment + video keys
npm run dev
```

To apply the database schema, either paste the contents of
`supabase/migrations/*.sql` into the Supabase SQL editor in order, or run
`supabase db push` if using the Supabase CLI locally.

## Design system summary

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B0A08` | Primary text, dark backgrounds |
| `charcoal` | `#2A2620` | Secondary dark surfaces |
| `ivory` | `#F7F2E9` | Primary light background |
| `burnt` | `#A6371F` | Primary accent — hover states, highlights |
| `gold` | `#C79A3C` | Secondary accent — CTAs, credentials, rank badges |

Typography is wired via CSS variables (`--font-display`, `--font-sans`,
`--font-mono`) in `globals.css` so swapping in the final licensed/self-hosted
brand fonts (an editorial serif for display, a clean grotesk for body) is a
one-line change in `layout.tsx`.

## Roadmap (from the master brief)

- **Phase 1 — MVP**: this scaffold → auth → onboarding → MsI-101 live →
  first 2,000 members, 3 country chapters
- **Phase 2 — Expansion**: all 10 Schools live, Marketplace launched,
  10 chapters, first Annual Summit
- **Phase 3 — Continental Rollout**: 20 countries, institutional licensing,
  Africa Poetry Economy Index
- **Phase 4 — Accreditation**: formal academic accreditation, AU recognition
- **Phase 5 — Global Recognition**: UNESCO partnership, 54 countries,
  self-sustaining operations

---

*Curated under the Alkebulan Poetry Institute. Product name: Msingi.*
