# Qualified Labor - Land Cruiser Engineering Skill

## Philosophy: Build for 500,000 Miles

Like a Toyota Land Cruiser, this codebase should be:
- **Reliable:** Works every time, no surprises
- **Simple:** Easy to understand, easy to fix
- **Durable:** Survives abuse and edge cases
- **Serviceable:** Any developer can maintain it

Complexity is allowed (V6 twin turbo), but it must be **simple and reliable**.

## Tech Stack
- **React.js** - UI components
- **Next.js 14+** - App Router, Server Components
- **Tailwind CSS** - Styling
- **Supabase** - Database, Auth, Storage
- **TypeScript** - Type safety
- **Typesense** - Search (future, not now)

## File Naming Conventions

### Engines (Complex Business Logic)
When something needs significant logic, state management, or orchestration, it becomes an **Engine**.

```
lib/
  engines/
    Engine_Matching.ts      # Worker-to-job matching logic
    Engine_Search.ts        # Search orchestration (Typesense later)
    Engine_Notifications.ts # Email/SMS notification logic
    Engine_Validation.ts    # Form and data validation
```

**Engine Rules:**
- Prefix with `Engine_`
- Pure functions where possible
- No React dependencies
- Fully typed inputs and outputs
- Comprehensive error handling
- Unit testable in isolation

```typescript
// lib/engines/Engine_Matching.ts
export interface MatchInput {
  worker: Worker
  jobs: JobPost[]
  maxDistance?: number
}

export interface MatchResult {
  matches: ScoredMatch[]
  reasons: MatchReason[]
}

export function findMatches(input: MatchInput): MatchResult {
  // Complex logic lives here, isolated and testable
}
```

### Components
```
components/
  ui/           # Reusable primitives (Button, Input, Card)
  landing/      # Landing page specific
  forms/        # Form components
  layout/       # Layout components (Header, Footer)
```

### Hooks
```
hooks/
  useWorkerForm.ts
  useJobSearch.ts
  useAuth.ts
```

### Server Actions
```
app/
  actions/
    workers.ts
    employers.ts
    jobs.ts
```

## Component Rules

### Size Limit: 500 Lines Max
No component should exceed 500 lines. If it does:
1. Extract logic to a custom hook
2. Extract sub-components
3. Move business logic to an Engine

### Component Structure
```typescript
// components/SomeComponent.tsx

// 1. Imports (grouped: react, next, libs, local)
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

// 2. Types (if component-specific)
interface Props {
  title: string
  onSubmit: (data: FormData) => void
}

// 3. Component
export function SomeComponent({ title, onSubmit }: Props) {
  // 4. Hooks at top
  const [loading, setLoading] = useState(false)

  // 5. Handlers
  const handleSubmit = async () => {
    setLoading(true)
    // ...
  }

  // 6. Early returns for loading/error states
  if (loading) return <LoadingSpinner />

  // 7. Main render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Keep Components Dumb
Components should be **display logic only**. Business logic goes in:
- **Engines** - Complex calculations, matching, validation
- **Hooks** - Stateful logic reused across components
- **Server Actions** - Data mutations

```typescript
// BAD - logic in component
function JobList({ jobs }) {
  const filteredJobs = jobs.filter(j => {
    // 50 lines of filtering logic
  })
  const sortedJobs = filteredJobs.sort((a, b) => {
    // 30 lines of sorting logic
  })
  return <>{sortedJobs.map(...)}</>
}

// GOOD - logic in engine
function JobList({ jobs }) {
  const processed = Engine_Jobs.filterAndSort(jobs, filters)
  return <>{processed.map(...)}</>
}
```

## Patterns

### Server Components (Default)
```typescript
// app/jobs/page.tsx - Server Component
import { createClient } from '@/lib/supabase/server'

export default async function JobsPage() {
  const supabase = await createClient()
  const { data: jobs } = await supabase.from('job_posts').select('*')

  return <JobList jobs={jobs} />
}
```

### Client Components (When Needed)
```typescript
// components/JobFilter.tsx
'use client'

import { useState } from 'react'

export function JobFilter({ onFilter }) {
  const [trade, setTrade] = useState('')
  // Interactive UI that needs client-side state
}
```

### Server Actions (Mutations)
```typescript
// app/actions/workers.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { Engine_Validation } from '@/lib/engines/Engine_Validation'
import { revalidatePath } from 'next/cache'

export async function createWorker(formData: FormData) {
  // Validate with engine
  const validation = Engine_Validation.validateWorker(formData)
  if (!validation.valid) {
    return { error: validation.errors }
  }

  // Persist
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('workers')
    .insert(validation.data)
    .select()
    .single()

  if (error) throw error

  revalidatePath('/workers')
  return { data }
}
```

## Engine Examples

### Engine_Matching.ts
```typescript
// lib/engines/Engine_Matching.ts
export const Engine_Matching = {
  /**
   * Find jobs that match a worker's profile
   */
  findJobsForWorker(worker: Worker, jobs: JobPost[]): ScoredMatch[] {
    return jobs
      .map(job => ({
        job,
        score: this.calculateScore(worker, job),
        reasons: this.getMatchReasons(worker, job),
      }))
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score)
  },

  calculateScore(worker: Worker, job: JobPost): number {
    let score = 0

    // Trade match (required)
    if (worker.trade !== job.trade) return 0
    score += 50

    // Experience level
    if (this.experienceMatches(worker.experience_level, job.experience_required)) {
      score += 30
    }

    // Location proximity
    const distance = this.calculateDistance(worker.zip_code, job.zip_code)
    if (distance <= worker.willing_to_travel_miles) {
      score += 20 - (distance / worker.willing_to_travel_miles) * 10
    }

    return score
  },

  // ... more methods
}
```

### Engine_Validation.ts
```typescript
// lib/engines/Engine_Validation.ts
export const Engine_Validation = {
  validateWorker(formData: FormData): ValidationResult<WorkerInput> {
    const errors: ValidationError[] = []

    const email = formData.get('email') as string
    if (!email || !this.isValidEmail(email)) {
      errors.push({ field: 'email', message: 'Valid email required' })
    }

    const trade = formData.get('trade') as string
    if (!trade || !VALID_TRADES.includes(trade)) {
      errors.push({ field: 'trade', message: 'Select a valid trade' })
    }

    // ... more validation

    if (errors.length > 0) {
      return { valid: false, errors }
    }

    return {
      valid: true,
      data: { email, trade, /* ... */ }
    }
  },

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  },

  // ... more validators
}
```

## Error Handling

### Principle: Fail Loud, Recover Gracefully
```typescript
// In Engines - throw with context
if (!worker.trade) {
  throw new Error(`Engine_Matching: worker ${worker.id} missing trade`)
}

// In Server Actions - catch and return
try {
  const result = Engine_Matching.findJobsForWorker(worker, jobs)
  return { data: result }
} catch (error) {
  console.error('Job matching failed:', error)
  return { error: 'Unable to find matches. Please try again.' }
}

// In Components - show user-friendly error
if (error) {
  return <ErrorMessage message={error} />
}
```

## Testing Strategy

### Unit Tests for Engines
```typescript
// __tests__/engines/Engine_Matching.test.ts
describe('Engine_Matching', () => {
  it('returns empty array when no trade match', () => {
    const worker = { trade: 'plumbing', /* ... */ }
    const jobs = [{ trade: 'electrical', /* ... */ }]

    const result = Engine_Matching.findJobsForWorker(worker, jobs)

    expect(result).toHaveLength(0)
  })

  it('scores exact matches higher', () => {
    // ...
  })
})
```

## Future: Typesense Integration

When we add search:
```typescript
// lib/engines/Engine_Search.ts
export const Engine_Search = {
  async searchJobs(query: string, filters: SearchFilters): Promise<SearchResult> {
    // Typesense integration will live here
    // For now, return empty or use Supabase full-text
  },

  async indexJob(job: JobPost): Promise<void> {
    // Index to Typesense
  },

  async removeJob(jobId: string): Promise<void> {
    // Remove from Typesense
  },
}
```

## Checklist Before Shipping

- [ ] Component under 500 lines?
- [ ] Business logic in Engine, not component?
- [ ] Types for all inputs/outputs?
- [ ] Error states handled?
- [ ] Loading states handled?
- [ ] Mobile-first responsive?
- [ ] Accessible (48px touch, contrast, labels)?
