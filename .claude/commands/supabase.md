# Qualified Labor - Supabase Patterns

## Overview
Supabase is the backend for Qualified Labor. Use these patterns for all database, auth, and storage operations.

## Project Stack
- Next.js 14+ (App Router)
- Supabase (PostgreSQL + Auth + Storage)
- TypeScript strict mode
- Server Components by default, Client Components when needed

## Database Schema (Core Tables)

### Workers (Apprentices/Entry-Level)
```sql
create table workers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Profile
  email text unique not null,
  phone text,
  first_name text not null,
  last_name text not null,
  zip_code text,

  -- Trade Info
  trade text not null, -- 'plumbing', 'electrical', 'hvac', 'carpentry', 'general', 'other'
  experience_level text not null, -- 'none', 'some', '1-2years', '3+years'
  availability text not null, -- 'immediate', 'two_weeks', 'flexible'

  -- Preferences
  willing_to_travel_miles int default 25,
  preferred_role_type text, -- 'apprentice', 'helper', 'junior_tech'

  -- Status
  status text default 'active', -- 'active', 'matched', 'inactive'

  -- Auth
  user_id uuid references auth.users(id)
);
```

### Employers (Contractors/Businesses)
```sql
create table employers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Business Info
  email text unique not null,
  phone text,
  business_name text not null,
  contact_name text not null,
  zip_code text,

  -- Trade Info
  primary_trade text not null,
  secondary_trades text[], -- array of additional trades

  -- Status
  status text default 'active',

  -- Auth
  user_id uuid references auth.users(id)
);
```

### Job Posts
```sql
create table job_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  employer_id uuid references employers(id) not null,

  -- Job Details
  title text not null,
  trade text not null,
  role_type text not null, -- 'apprentice', 'helper', 'junior_tech'
  experience_required text not null,
  description text,
  zip_code text,

  -- Compensation (optional, transparent)
  pay_range_low decimal,
  pay_range_high decimal,
  pay_type text, -- 'hourly', 'salary', 'negotiable'

  -- Status
  status text default 'active', -- 'active', 'filled', 'closed'

  expires_at timestamptz
);
```

### Matches
```sql
create table matches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  worker_id uuid references workers(id) not null,
  job_post_id uuid references job_posts(id) not null,
  employer_id uuid references employers(id) not null,

  -- Status tracking
  status text default 'pending', -- 'pending', 'viewed', 'contacted', 'hired', 'declined'

  -- Timestamps
  viewed_at timestamptz,
  contacted_at timestamptz,

  unique(worker_id, job_post_id)
);
```

## Supabase Client Setup

### Server Component (Recommended)
```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

### Client Component
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

## Query Patterns

### Fetching Data (Server Component)
```typescript
// app/jobs/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function JobsPage() {
  const supabase = await createClient()

  const { data: jobs, error } = await supabase
    .from('job_posts')
    .select(`
      *,
      employer:employers(business_name, zip_code)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw error

  return <JobsList jobs={jobs} />
}
```

### Mutations (Server Actions)
```typescript
// app/actions/workers.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createWorkerProfile(formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workers')
    .insert({
      email: formData.get('email'),
      first_name: formData.get('firstName'),
      last_name: formData.get('lastName'),
      trade: formData.get('trade'),
      experience_level: formData.get('experience'),
      availability: formData.get('availability'),
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/workers')
  return data
}
```

## Row Level Security (RLS)

Always enable RLS on all tables:
```sql
alter table workers enable row level security;
alter table employers enable row level security;
alter table job_posts enable row level security;
alter table matches enable row level security;
```

Example policies:
```sql
-- Workers can read/update their own profile
create policy "Users can view own worker profile"
  on workers for select
  using (auth.uid() = user_id);

create policy "Users can update own worker profile"
  on workers for update
  using (auth.uid() = user_id);

-- Public can view active job posts
create policy "Anyone can view active jobs"
  on job_posts for select
  using (status = 'active');

-- Employers can manage their own posts
create policy "Employers can manage own posts"
  on job_posts for all
  using (employer_id in (
    select id from employers where user_id = auth.uid()
  ));
```

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ... (server-only, never expose)
```

## Type Generation
```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts
```

Use generated types:
```typescript
import { Database } from '@/lib/database.types'

type Worker = Database['public']['Tables']['workers']['Row']
type NewWorker = Database['public']['Tables']['workers']['Insert']
```
