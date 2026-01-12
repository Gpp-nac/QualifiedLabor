# Qualified Labor - The Four Developers

## The Team Mental Model

When building Qualified Labor, think like four developers working in conjunction. Each brings a specific expertise. Every decision should pass through all four lenses.

---

## The Developers

### 1. Amazon Developer (Scale)
**Role:** Backend architecture, data flow, infrastructure

**Thinks about:**
- Will this query scale to 100k users?
- Is the database schema normalized correctly?
- Are we avoiding N+1 queries?
- Can this handle concurrent requests?
- Is there proper caching strategy?
- Are we using indexes correctly?
- Error handling and graceful degradation

**Questions to ask:**
- "What happens when 1000 people submit forms at once?"
- "How do we handle this when we have 50k workers and 10k employers?"
- "What's the worst case query performance?"

**Patterns:**
```typescript
// AMAZON SCALE: Paginate, don't fetch all
const { data } = await supabase
  .from('workers')
  .select('*')
  .range(0, 49)  // Always paginate
  .order('created_at', { ascending: false })

// AMAZON SCALE: Use indexes
// CREATE INDEX idx_workers_trade ON workers(trade);
// CREATE INDEX idx_workers_zip ON workers(zip_code);

// AMAZON SCALE: Batch operations
const chunks = chunkArray(workers, 100)
for (const chunk of chunks) {
  await supabase.from('matches').insert(chunk)
}
```

---

### 2. McMaster-Carr Developer (Speed)
**Role:** Performance, load times, efficiency

**Thinks about:**
- Page load under 1.5 seconds
- Time to interactive
- Bundle size
- Server Components vs Client Components
- Minimizing JavaScript
- No unnecessary re-renders
- Database query optimization

**Questions to ask:**
- "Can this load faster?"
- "Do we need JavaScript for this?"
- "Can this be a Server Component?"
- "Are we fetching only what we need?"

**Patterns:**
```typescript
// MCMASTER SPEED: Server Components by default
// app/page.tsx - NO 'use client', runs on server
export default async function Page() {
  const data = await getData() // Runs on server, no client JS
  return <StaticContent data={data} />
}

// MCMASTER SPEED: Select only needed fields
const { data } = await supabase
  .from('workers')
  .select('id, first_name, trade')  // NOT select('*')

// MCMASTER SPEED: Parallel data fetching
const [workers, jobs] = await Promise.all([
  supabase.from('workers').select('*'),
  supabase.from('job_posts').select('*'),
])

// MCMASTER SPEED: Static generation where possible
export const revalidate = 3600 // Cache for 1 hour
```

---

### 3. Amazon UI/UX Designer (Usability & Looks)
**Role:** User experience, visual design, interaction patterns

**Thinks about:**
- Is the user flow intuitive?
- Clear visual hierarchy
- Consistent design patterns
- Feedback on actions (loading, success, error states)
- Accessibility (screen readers, keyboard nav)
- Pleasant aesthetics that build trust
- Mobile experience parity with desktop

**Questions to ask:**
- "Would a first-time user understand this?"
- "Is there clear feedback when they click?"
- "Does this look trustworthy?"
- "Can they complete the task in minimal steps?"

**Patterns:**
```typescript
// AMAZON UX: Clear loading states
function SubmitButton({ pending }) {
  return (
    <Button disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </Button>
  )
}

// AMAZON UX: Success confirmation
const [submitted, setSubmitted] = useState(false)
if (submitted) {
  return <SuccessMessage>Thanks! We'll be in touch.</SuccessMessage>
}

// AMAZON UX: Clear error messages
{error && (
  <div className="text-red-600 bg-red-50 p-3 rounded">
    {error}
  </div>
)}

// AMAZON UX: Progressive disclosure
// Don't show all fields at once
// Step 1: Basic info → Step 2: Trade details → Step 3: Confirm
```

---

### 4. McMaster-Carr UI/UX Designer (40-60 Demo)
**Role:** Accessibility for older users, simplicity, no-nonsense design

**Thinks about:**
- Can a 55-year-old plumber use this on a job site?
- Big enough text? (16px minimum, prefer 18px)
- Big enough buttons? (48px touch targets)
- High contrast for outdoor/bright light viewing
- No tiny icons without labels
- No gestures-only interactions
- Phone number visible (they want to call)
- Simple forms, minimal fields

**Questions to ask:**
- "Can someone read this without glasses?"
- "Can they tap this button with work gloves on?"
- "Would my uncle understand this without explanation?"
- "Are we asking for info we don't need?"

**Patterns:**
```typescript
// MCMASTER 40-60: Big, readable text
<p className="text-lg text-[#333333]">  // 18px, high contrast
  Find apprentices who want to learn.
</p>

// MCMASTER 40-60: Massive touch targets
<Button className="min-h-[56px] text-lg px-8">
  Find Apprentices
</Button>

// MCMASTER 40-60: Labels, not just icons
<button>
  <PhoneIcon className="w-5 h-5" />
  <span>Call Us</span>  // Always include text
</button>

// MCMASTER 40-60: Minimal form fields
// BAD: 15 fields on signup
// GOOD: Email, Trade, Experience - that's it

// MCMASTER 40-60: Phone number prominent
<header>
  <a href="tel:+15551234567" className="text-lg font-bold">
    (555) 123-4567
  </a>
</header>

// MCMASTER 40-60: No hover-only interactions
// Everything must work on tap/click
// No tooltips as the only way to get info
```

---

## The Four-Way Check

Before shipping ANY feature, run it through all four:

| Developer | Question | Pass? |
|-----------|----------|-------|
| Amazon Dev (Scale) | Will this work with 100k users? | ☐ |
| McMaster Dev (Speed) | Does this load in < 1.5s? | ☐ |
| Amazon UX (Usability) | Is the flow intuitive with clear feedback? | ☐ |
| McMaster UX (40-60) | Can a 55-year-old use this on a phone? | ☐ |

---

## Decision Matrix

When the four conflict, here's the priority:

### Speed vs Scale
- **V1 (now):** Speed wins. We have no users. Optimize for fast iteration.
- **V2 (later):** Scale becomes equal priority.

### Looks vs Accessibility
- **Always:** Accessibility wins. A pretty button a 55-year-old can't read is useless.
- **Compromise:** Make it accessible FIRST, then make it look good within those constraints.

### Feature Richness vs Simplicity
- **Always:** Simplicity wins for this demo.
- **Rule:** If you can remove a field, remove it. If you can remove a step, remove it.

---

## Example: Building a Form

**Amazon Dev (Scale):**
> "Use Server Actions, validate on server, rate limit submissions, use RLS"

**McMaster Dev (Speed):**
> "Server Component for the page, only make the form itself a Client Component, no unnecessary state"

**Amazon UX (Usability):**
> "Show loading spinner on submit, success message after, clear error states, logical field order"

**McMaster UX (40-60):**
> "Three fields max, 18px labels, 56px submit button, phone number at top if they'd rather call"

**Result:**
```tsx
// app/signup/page.tsx (Server Component - SPEED)
export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto p-6">
      {/* MCMASTER 40-60: Phone option */}
      <p className="text-lg mb-6">
        Rather talk? Call <a href="tel:+15551234567" className="font-bold underline">(555) 123-4567</a>
      </p>

      {/* Client Component only where needed */}
      <SignupForm />
    </div>
  )
}

// components/SignupForm.tsx (Client Component - minimal)
'use client'

import { useFormStatus } from 'react-dom'
import { signup } from '@/app/actions/signup'

export function SignupForm() {
  return (
    <form action={signup} className="space-y-6">
      {/* MCMASTER 40-60: Big labels, big inputs */}
      <div>
        <label className="block text-lg font-medium mb-2">Email</label>
        <input
          name="email"
          type="email"
          required
          className="w-full p-4 text-lg border-2 rounded min-h-[56px]"
        />
      </div>

      <div>
        <label className="block text-lg font-medium mb-2">What trade?</label>
        <select
          name="trade"
          required
          className="w-full p-4 text-lg border-2 rounded min-h-[56px]"
        >
          <option value="">Select...</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="hvac">HVAC</option>
          <option value="carpentry">Carpentry</option>
          <option value="general">General Construction</option>
        </select>
      </div>

      {/* MCMASTER 40-60: Big submit button */}
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="
        w-full min-h-[56px]
        bg-[#336633] hover:bg-[#3C773C]
        text-white text-lg font-bold
        rounded
      "
    >
      {pending ? 'Signing up...' : 'Sign Up'}
    </button>
  )
}
```

---

## Quick Reference

| Aspect | Amazon Dev | McMaster Dev | Amazon UX | McMaster UX |
|--------|------------|--------------|-----------|-------------|
| Focus | Scale | Speed | Usability | 40-60 Access |
| Metric | Handles 100k | < 1.5s load | Task completion | Can use without help |
| Asks | "Will it scale?" | "Can it be faster?" | "Is it intuitive?" | "Can my uncle use it?" |
| Blocks | N+1 queries, no indexes | Client Components, slow queries | Confusing flows, no feedback | Small text, tiny buttons |
