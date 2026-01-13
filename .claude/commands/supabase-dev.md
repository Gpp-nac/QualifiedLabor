# Qualified Labor - Supabase Developer Skill (2025-2026)

## Philosophy: Land Cruiser Database Engineering

Like a Land Cruiser engine, your database layer should:
- **Start every time** - Predictable, typed queries that never surprise you
- **Run for 500k miles** - Patterns that scale without rewrites
- **Easy to service** - Any developer can understand and modify
- **No exotic parts** - Standard Supabase patterns, no clever hacks

## The Two Sides

```
┌─────────────────────────────────────────────────────────────┐
│                    QUALIFIED LABOR                          │
├─────────────────────────┬───────────────────────────────────┤
│      CONTRACTORS        │           WORKERS                 │
│      (Employers)        │         (Apprentices)             │
├─────────────────────────┼───────────────────────────────────┤
│  - Post jobs            │  - Create profiles                │
│  - View applicants      │  - Browse jobs                    │
│  - Contact workers      │  - Get matched                    │
│  - Manage listings      │  - Track applications             │
└─────────────────────────┴───────────────────────────────────┘
```

## Environment Setup

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Server-only, NEVER expose
```

## Supabase Client Setup (2025 Pattern)

### Server Client (Next.js 14+ App Router)
```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from Server Component - ignore
          }
        },
      },
    }
  )
}
```

### Browser Client
```typescript
// lib/supabase/client.ts
'use client'

import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Service Role Client (Admin Operations)
```typescript
// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'

// ONLY use server-side, NEVER import in client components
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
```

## Database Schema

### Core Tables

```sql
-- Workers (Apprentices/Entry-Level)
create table workers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,

  -- Auth link
  user_id uuid references auth.users(id) on delete cascade,

  -- Profile
  email text unique not null,
  phone text,
  first_name text not null,
  last_name text not null,
  zip_code text,

  -- Trade Info
  trade text not null check (trade in ('plumbing', 'electrical', 'hvac', 'carpentry', 'general', 'other')),
  experience_level text not null check (experience_level in ('none', 'some', '1-2years', '3+years')),
  availability text not null check (availability in ('immediate', 'two_weeks', 'flexible')),

  -- Preferences
  willing_to_travel_miles int default 25,

  -- Status
  status text default 'active' check (status in ('active', 'matched', 'inactive'))
);

-- Employers (Contractors/Businesses)
create table employers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,

  -- Auth link
  user_id uuid references auth.users(id) on delete cascade,

  -- Business Info
  email text unique not null,
  phone text,
  business_name text not null,
  contact_name text not null,
  zip_code text,

  -- Trade Info
  primary_trade text not null,
  secondary_trades text[] default '{}',

  -- Status
  status text default 'active' check (status in ('active', 'inactive'))
);

-- Job Posts
create table job_posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,

  employer_id uuid references employers(id) on delete cascade not null,

  -- Job Details
  title text not null,
  trade text not null,
  role_type text not null check (role_type in ('apprentice', 'helper', 'junior_tech')),
  experience_required text not null,
  description text,
  zip_code text,

  -- Compensation
  pay_range_low decimal,
  pay_range_high decimal,
  pay_type text check (pay_type in ('hourly', 'salary', 'negotiable')),

  -- Status
  status text default 'active' check (status in ('active', 'filled', 'closed')),
  expires_at timestamptz
);

-- Matches (Worker <-> Job relationships)
create table matches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,

  worker_id uuid references workers(id) on delete cascade not null,
  job_post_id uuid references job_posts(id) on delete cascade not null,
  employer_id uuid references employers(id) on delete cascade not null,

  -- Status tracking
  status text default 'pending' check (status in ('pending', 'viewed', 'contacted', 'hired', 'declined')),

  -- Timestamps
  viewed_at timestamptz,
  contacted_at timestamptz,

  unique(worker_id, job_post_id)
);

-- Updated_at trigger function
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables
create trigger update_workers_updated_at before update on workers
  for each row execute function update_updated_at();
create trigger update_employers_updated_at before update on employers
  for each row execute function update_updated_at();
create trigger update_job_posts_updated_at before update on job_posts
  for each row execute function update_updated_at();
```

### Row Level Security (RLS)

```sql
-- Enable RLS on all tables
alter table workers enable row level security;
alter table employers enable row level security;
alter table job_posts enable row level security;
alter table matches enable row level security;

-- WORKERS policies
create policy "Workers: users can view own profile"
  on workers for select using (auth.uid() = user_id);

create policy "Workers: users can update own profile"
  on workers for update using (auth.uid() = user_id);

create policy "Workers: authenticated can insert own"
  on workers for insert with check (auth.uid() = user_id);

create policy "Workers: employers can view active workers"
  on workers for select using (status = 'active');

-- EMPLOYERS policies
create policy "Employers: users can view own profile"
  on employers for select using (auth.uid() = user_id);

create policy "Employers: users can update own profile"
  on employers for update using (auth.uid() = user_id);

create policy "Employers: authenticated can insert own"
  on employers for insert with check (auth.uid() = user_id);

create policy "Employers: public can view active"
  on employers for select using (status = 'active');

-- JOB_POSTS policies
create policy "Jobs: anyone can view active"
  on job_posts for select using (status = 'active');

create policy "Jobs: employers can manage own"
  on job_posts for all using (
    employer_id in (select id from employers where user_id = auth.uid())
  );

-- MATCHES policies
create policy "Matches: workers see own matches"
  on matches for select using (
    worker_id in (select id from workers where user_id = auth.uid())
  );

create policy "Matches: employers see matches for their jobs"
  on matches for select using (
    employer_id in (select id from employers where user_id = auth.uid())
  );

create policy "Matches: system can insert"
  on matches for insert with check (true);  -- Handle in server action
```

## CRUD Patterns (Land Cruiser Style)

### The Golden Rule: Type Everything

```typescript
// lib/database.types.ts (generate with: npx supabase gen types typescript)
export type Tables = Database['public']['Tables']
export type Worker = Tables['workers']['Row']
export type WorkerInsert = Tables['workers']['Insert']
export type WorkerUpdate = Tables['workers']['Update']
export type Employer = Tables['employers']['Row']
export type JobPost = Tables['job_posts']['Row']
export type Match = Tables['matches']['Row']
```

### CREATE Operations

```typescript
// app/actions/workers.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { WorkerInsert } from '@/lib/database.types'

export async function createWorker(data: WorkerInsert) {
  const supabase = await createClient()

  const { data: worker, error } = await supabase
    .from('workers')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('createWorker failed:', error)
    return { error: error.message }
  }

  revalidatePath('/workers')
  return { data: worker }
}

// app/actions/employers.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { EmployerInsert } from '@/lib/database.types'

export async function createEmployer(data: EmployerInsert) {
  const supabase = await createClient()

  const { data: employer, error } = await supabase
    .from('employers')
    .insert(data)
    .select()
    .single()

  if (error) {
    console.error('createEmployer failed:', error)
    return { error: error.message }
  }

  revalidatePath('/employers')
  return { data: employer }
}
```

### READ Operations

```typescript
// Server Component - Direct Query
// app/jobs/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function JobsPage() {
  const supabase = await createClient()

  const { data: jobs, error } = await supabase
    .from('job_posts')
    .select(`
      *,
      employer:employers(id, business_name, zip_code)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw error

  return <JobsList jobs={jobs} />
}

// With filters
export async function getJobsByTrade(trade: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('job_posts')
    .select('*')
    .eq('trade', trade)
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Single record
export async function getWorkerById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('workers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
```

### UPDATE Operations

```typescript
// app/actions/workers.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { WorkerUpdate } from '@/lib/database.types'

export async function updateWorker(id: string, data: WorkerUpdate) {
  const supabase = await createClient()

  const { data: worker, error } = await supabase
    .from('workers')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('updateWorker failed:', error)
    return { error: error.message }
  }

  revalidatePath('/workers')
  revalidatePath(`/workers/${id}`)
  return { data: worker }
}

// Partial update example
export async function updateWorkerStatus(id: string, status: Worker['status']) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('workers')
    .update({ status })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/workers')
  return { success: true }
}
```

### DELETE Operations

```typescript
// app/actions/job-posts.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function deleteJobPost(id: string) {
  const supabase = await createClient()

  // Soft delete (preferred)
  const { error } = await supabase
    .from('job_posts')
    .update({ status: 'closed' })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/jobs')
  return { success: true }
}

// Hard delete (use sparingly)
export async function permanentlyDeleteJobPost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('job_posts')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/jobs')
  return { success: true }
}
```

## Form Handling Pattern

### Server Action with Form

```typescript
// app/actions/workers.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function submitWorkerForm(formData: FormData) {
  const supabase = await createClient()

  // Extract and validate
  const workerData = {
    email: formData.get('email') as string,
    first_name: formData.get('firstName') as string,
    last_name: formData.get('lastName') as string,
    phone: formData.get('phone') as string || null,
    zip_code: formData.get('zipCode') as string || null,
    trade: formData.get('trade') as string,
    experience_level: formData.get('experience') as string,
    availability: formData.get('availability') as string,
  }

  // Basic validation
  if (!workerData.email || !workerData.first_name || !workerData.trade) {
    return { error: 'Missing required fields' }
  }

  const { data, error } = await supabase
    .from('workers')
    .insert(workerData)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') {
      return { error: 'Email already registered' }
    }
    return { error: 'Failed to create profile' }
  }

  revalidatePath('/')
  redirect('/workers/success')
}
```

### Client Form Component

```typescript
// components/forms/WorkerForm.tsx
'use client'

import { useActionState } from 'react'
import { submitWorkerForm } from '@/app/actions/workers'

export function WorkerForm() {
  const [state, formAction, pending] = useActionState(submitWorkerForm, null)

  return (
    <form action={formAction}>
      <input name="email" type="email" required placeholder="Email" />
      <input name="firstName" required placeholder="First Name" />
      <input name="lastName" required placeholder="Last Name" />
      <input name="phone" type="tel" placeholder="Phone (optional)" />
      <input name="zipCode" placeholder="ZIP Code" />

      <select name="trade" required>
        <option value="">Select Trade</option>
        <option value="plumbing">Plumbing</option>
        <option value="electrical">Electrical</option>
        <option value="hvac">HVAC</option>
        <option value="carpentry">Carpentry</option>
        <option value="general">General Labor</option>
        <option value="other">Other</option>
      </select>

      <select name="experience" required>
        <option value="">Experience Level</option>
        <option value="none">No Experience</option>
        <option value="some">Some Experience</option>
        <option value="1-2years">1-2 Years</option>
        <option value="3+years">3+ Years</option>
      </select>

      <select name="availability" required>
        <option value="">Availability</option>
        <option value="immediate">Immediate</option>
        <option value="two_weeks">2 Weeks Notice</option>
        <option value="flexible">Flexible</option>
      </select>

      {state?.error && <p className="text-red-600">{state.error}</p>}

      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

## Auth Patterns

### Sign Up
```typescript
// app/actions/auth.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/auth/verify')
}
```

### Sign In
```typescript
export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}
```

### Sign Out
```typescript
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
```

### Get Current User
```typescript
// In Server Component
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return <Dashboard user={user} />
}
```

## Middleware (Auth Protection)

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
```

## Error Handling

```typescript
// lib/errors.ts
export function handleSupabaseError(error: unknown): string {
  if (!error) return 'Unknown error'

  const err = error as { code?: string; message?: string }

  // Common Postgres error codes
  const errorMap: Record<string, string> = {
    '23505': 'This record already exists',
    '23503': 'Referenced record not found',
    '42501': 'Permission denied',
    'PGRST116': 'Record not found',
  }

  return errorMap[err.code || ''] || err.message || 'Database error'
}

// Usage in server action
export async function createWorker(data: WorkerInsert) {
  const supabase = await createClient()

  const { data: worker, error } = await supabase
    .from('workers')
    .insert(data)
    .select()
    .single()

  if (error) {
    return { error: handleSupabaseError(error) }
  }

  return { data: worker }
}
```

## Type Generation

```bash
# Generate types from your Supabase project
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/database.types.ts

# Or with local Supabase
npx supabase gen types typescript --local > lib/database.types.ts
```

## Realtime (Optional)

```typescript
// hooks/useRealtimeJobs.ts
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { JobPost } from '@/lib/database.types'

export function useRealtimeJobs(initialJobs: JobPost[]) {
  const [jobs, setJobs] = useState(initialJobs)

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('jobs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'job_posts' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setJobs(prev => [payload.new as JobPost, ...prev])
          }
          if (payload.eventType === 'UPDATE') {
            setJobs(prev => prev.map(j =>
              j.id === payload.new.id ? payload.new as JobPost : j
            ))
          }
          if (payload.eventType === 'DELETE') {
            setJobs(prev => prev.filter(j => j.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return jobs
}
```

## Checklist Before Shipping

- [ ] Types generated from Supabase schema
- [ ] RLS policies tested for all user roles
- [ ] Server actions use `revalidatePath`
- [ ] Error messages are user-friendly
- [ ] Sensitive operations use service role (server-only)
- [ ] Auth middleware protects private routes
- [ ] Foreign keys have `on delete cascade` where appropriate
- [ ] Check constraints validate enum values
- [ ] `updated_at` triggers are in place

## Quick Reference

| Operation | Pattern |
|-----------|---------|
| Create | `.insert(data).select().single()` |
| Read one | `.select().eq('id', id).single()` |
| Read many | `.select().eq('status', 'active')` |
| Update | `.update(data).eq('id', id).select().single()` |
| Delete (soft) | `.update({ status: 'closed' }).eq('id', id)` |
| Delete (hard) | `.delete().eq('id', id)` |
| With relations | `.select('*, employer:employers(name)')` |
