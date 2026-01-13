# Qualified Labor - Quickstart

Read this before writing any code. Then load the relevant skill for your task.

## What Is This?
Trades recruitment platform matching apprentices with contractors. Mobile-first, no-bullshit job matching.

## Tech Stack
- Next.js 14+ (App Router), TypeScript, Tailwind CSS
- Supabase (Postgres, Auth)
- Vercel deployment

## Run Locally
```bash
npm install
npm run dev
# → localhost:3000 (or 3001 if 3000 is busy)
```

## Key Files
- `app/page.tsx` - Landing page
- `app/layout.tsx` - Root layout with metadata
- `tailwind.config.ts` - Brand colors (ql-green, ql-charcoal, etc.)
- `app/globals.css` - Global styles, Inter font

## Brand Colors
```
ql-green: #336633       (primary)
ql-charcoal: #333333    (text)
ql-gold: #FED700        (accent/early stage)
ql-gray: #999999        (secondary text)
```

## Design Rules
- Mobile-first (test at 375px)
- 48px minimum tap targets
- 16px minimum body text
- McMaster-Carr aesthetic: utilitarian, no flash

## Code Rules
- Server Components by default
- Components < 500 lines
- Business logic in `Engine_*.ts` files
- No unnecessary abstractions

## Supabase Connection
```bash
# .env.local is configured and connected
# Project: azyvdobopcikarnwoqxc
# Database: Fresh (no tables yet)
```

## Available Skills
| Skill | Use When |
|-------|----------|
| `/branding` | Colors, typography, voice |
| `/components` | Building UI components |
| `/supabase` | Database schema, auth, RLS patterns |
| `/supabase-dev` | CRUD operations, 2025 patterns, Land Cruiser reliability |
| `/landing-page` | Landing page copy/structure |
| `/landcruiser` | Architecture, Engine system |
| `/security` | Security checks, smoke tests |
| `/project` | Full project overview |
| `/team` | Development team mental model |

## Current Status
- Landing page: Done (localhost:3001)
- Supabase: Connected ✓ (schema not created yet)
- Forms: UI only (not wired to Supabase)
- GitHub: https://github.com/Gpp-nac/QualifiedLabor.git

## Next Steps
1. Create database schema (workers, employers, job_posts, matches)
2. Wire forms to Supabase
3. Deploy to Vercel
4. Add real contact info
