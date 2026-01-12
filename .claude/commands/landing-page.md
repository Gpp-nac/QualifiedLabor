# Qualified Labor - Landing Page Skill

## Current Phase: V1 Landing Page
Pre-launch, no users yet. The landing page must:
1. Clearly explain what Qualified Labor does
2. Provide two clear paths: Workers and Employers
3. Collect early interest (email signups)
4. Build trust through honesty about early stage

## Page Structure

### Above the Fold (Mobile-First)
```
[Logo: Qualified Labor]

Match Apprentices to Real Trade Roles

Qualified Labor helps contractors find apprentices
who actually want to learn. No job boards.
No resume black hole. Just simple matching.

[Find Apprentices] [Find a Trade Role]
```

### Two-Path Split

**For Contractors Section:**
- Headline: "Need help on the job site?"
- Trade list with checkmarks (Plumbing, Electrical, HVAC, Carpentry, General, Shop/Field)
- What they tell us: Trade, Role type, Experience level
- CTA: "Find Apprentices"

**For Workers Section:**
- Headline: "Want to learn a trade?"
- Benefits: Learn on the job, Real contractors, Clear expectations, Simple applications
- What they tell us: Trade interest, Experience level, Availability
- CTA: "Find a Trade Role"

### What We Match (Dense List Style)
Two columns, McMaster style:
```
WE MATCH:              NOT FOR:
- Apprentices          - Office jobs
- Helpers              - Gig apps
- Junior technicians   - Resume farming
- Entry-level roles
```

### How It Works
Three steps, no fluff:
1. You tell us what you're looking for
2. We match based on trade and role
3. You connect directly

"No bidding. No algorithms fighting you. No endless scrolling."

### Why Section (Brief)
"Most hiring platforms are built by tech companies that don't understand trades."

Built for: Contractors, Shop owners, Foremen, Working tradespeople

### Early Stage Notice
Yellow/gold background callout:
```
EARLY STAGE - HONEST

- Direct support from founders
- Your feedback shapes the platform
- No hidden fees
- No locked contracts

We're building this the right way, not the flashy way.
```

### Footer CTAs
Repeat the two main CTAs:
- "Hiring Apprentices?" → Find Apprentices
- "Looking for a Trade Role?" → Find a Trade Role

Contact: support@qualifiedlabor.com
"Plain answers. No sales scripts."

## Technical Implementation

### Stack
```
Next.js 14+ (App Router)
TypeScript
Tailwind CSS
Supabase (for waitlist/signups)
```

### File Structure
```
app/
  page.tsx              # Landing page (Server Component)
  layout.tsx            # Root layout with metadata
components/
  landing/
    Hero.tsx
    ForContractors.tsx
    ForWorkers.tsx
    WhatWeMatch.tsx
    HowItWorks.tsx
    EarlyStageNotice.tsx
    Footer.tsx
```

### SEO Metadata
```typescript
export const metadata: Metadata = {
  title: 'Qualified Labor - Match Apprentices to Real Trade Roles',
  description: 'Find apprentices and entry-level trade workers. Plumbing, electrical, HVAC, carpentry. No job boards, just simple matching.',
  openGraph: {
    title: 'Qualified Labor',
    description: 'Match Apprentices to Real Trade Roles',
    type: 'website',
  },
}
```

### Waitlist Form (Simple)
```typescript
// Server action for collecting signups
'use server'

export async function joinWaitlist(formData: FormData) {
  const supabase = await createClient()

  await supabase.from('waitlist').insert({
    email: formData.get('email'),
    type: formData.get('type'), // 'worker' or 'employer'
    trade: formData.get('trade'),
  })
}
```

### Waitlist Table
```sql
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  email text not null,
  type text not null, -- 'worker', 'employer'
  trade text,
  contacted boolean default false
);
```

## Mobile-First Breakpoints
```css
/* Base: Mobile (0-639px) */
/* sm: 640px+ */
/* md: 768px+ */
/* lg: 1024px+ */
/* xl: 1280px+ */
```

All styles start mobile, add complexity for larger screens.

## Performance Requirements
- First Contentful Paint < 1.5s
- No layout shift
- Images optimized (WebP, lazy load below fold)
- Minimal JavaScript (Server Components)

## Copy Principles
- Short sentences
- Active voice
- No jargon
- Honest about early stage
- Respect user's time
