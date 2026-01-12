# Qualified Labor - Project Overview

## What Is This?
Qualified Labor is a trades recruitment platform that matches apprentices and entry-level workers with contractors and trade businesses.

**Target Users:**
- **Workers:** People who want to learn a trade (apprentices, helpers, junior technicians)
- **Employers:** Contractors, shop owners, foremen who need entry-level help

**Target Demographic:** 40-55 year old tradespeople who value function over flash.

## Core Value Proposition
"No job boards. No resume black hole. Just simple matching."

- Workers tell us: Trade interest, experience level, availability
- Employers tell us: Trade, role type, experience needed
- We match them directly

## What Makes Us Different
- Built by people who understand trades, not tech companies
- No bidding, no algorithms fighting you, no endless scrolling
- Plain answers, no sales scripts
- Honest about being early stage

## Current Phase: V1 Landing Page
We have no users yet. The goal is to:
1. Validate the concept
2. Collect early interest (waitlist)
3. Get feedback from real tradespeople

## Tech Stack
- **Frontend:** React.js, Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Search:** Typesense (future - not implementing yet)
- **Hosting:** Vercel
- **Design System:** McMaster-Carr inspired (utilitarian, fast, accessible)

## Engineering Philosophy: Land Cruiser Reliability
Build for 500,000 miles. Complexity allowed (V6 twin turbo), but must be simple and reliable.

- Components < 500 lines (extract to hooks/engines if larger)
- Business logic in Engines (`Engine_*.ts`), not components
- Server Components by default
- Fail loud, recover gracefully

## Design Philosophy
"McMaster-Carr meets 2026 Amazon"

- Mobile-first (40-55 demo may be on phones at job sites)
- Large tap targets (48px minimum)
- High contrast, readable text (16px minimum)
- No clever UI tricks - every element serves a purpose
- Fast load times, no animations that delay action

## Skills Reference

| Skill | Purpose |
|-------|---------|
| `/project` | This file - project overview and quick reference |
| `/branding` | McMaster-Carr colors, typography, voice & tone |
| `/supabase` | Database schema, queries, RLS, auth patterns |
| `/landing-page` | V1 landing page structure, copy, implementation |
| `/components` | UI component patterns with code examples |
| `/landcruiser` | Engineering patterns, Engine system, reliability rules |
| `/security` | Smoke tests, security attack vectors, audit checklist |

## File Structure
```
app/
  page.tsx                 # Landing page
  layout.tsx               # Root layout
  actions/                 # Server actions
    workers.ts
    employers.ts
components/
  ui/                      # Reusable primitives
    Button.tsx
    Input.tsx
    Card.tsx
  landing/                 # Landing page sections
lib/
  supabase/
    server.ts              # Server client
    client.ts              # Browser client
  engines/
    Engine_Matching.ts     # Job-worker matching
    Engine_Validation.ts   # Form validation
    Engine_Search.ts       # Search (Typesense later)
hooks/
  useWorkerForm.ts
types/
  database.types.ts        # Generated from Supabase
```

## Engine Naming Convention
Complex business logic gets `Engine_` prefix:
- `Engine_Matching.ts` - Worker-to-job matching
- `Engine_Validation.ts` - Form/data validation
- `Engine_Search.ts` - Search orchestration (Typesense later)
- `Engine_Notifications.ts` - Email/SMS logic

## Trades We Support
- Plumbing
- Electrical
- HVAC
- Carpentry
- General Construction
- Shop and Field Roles

## Role Types We Match
- Apprentices
- Helpers
- Junior Technicians
- Entry-level trade roles

## What We Don't Do
- Office jobs
- Gig apps
- Resume farming

## Contact
support@qualifiedlabor.com
"Plain answers. No sales scripts."

## Development Guidelines

### When Building Features:
1. Mobile-first always
2. Respect the user's time - no unnecessary steps
3. Keep forms short - only ask what's needed
4. Use Server Components by default
5. Follow the component patterns in `/components`
6. Match the brand colors exactly from `/branding`

### When Writing Copy:
1. Short sentences
2. Active voice
3. No jargon or buzzwords
4. Be honest, especially about early stage status
5. Action-oriented CTAs ("Find Apprentices" not "Submit")

### Performance Targets:
- First Contentful Paint < 1.5s
- No layout shift
- Lighthouse score > 90
