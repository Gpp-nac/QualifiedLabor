# Qualified Labor - Smoke Test & Security Skill

## Purpose
Test the application like a hacker would. Find vulnerabilities before bad actors do. Run smoke tests to ensure core functionality works.

## Smoke Test Checklist

### Landing Page
```
[ ] Page loads in < 3 seconds
[ ] All CTAs clickable and navigate correctly
[ ] Mobile responsive (test 375px, 768px, 1024px)
[ ] No console errors
[ ] Images load (no broken images)
[ ] Forms submit without error
[ ] Email validation works
[ ] Success/error states display
```

### Authentication (When Implemented)
```
[ ] Sign up flow completes
[ ] Login flow completes
[ ] Logout clears session
[ ] Protected routes redirect to login
[ ] Session persists on refresh
[ ] Password reset flow works
```

### Forms
```
[ ] Required fields enforced
[ ] Email format validated
[ ] Phone format validated (if used)
[ ] Select dropdowns populate
[ ] Form submission shows loading state
[ ] Success confirmation displays
[ ] Error messages are clear
```

### Database
```
[ ] Data persists after form submission
[ ] Queries return expected data
[ ] RLS policies block unauthorized access
[ ] No data leaks in API responses
```

## Security Attack Vectors

### 1. SQL Injection
**Test:** Try SQL in form inputs
```
' OR '1'='1
'; DROP TABLE workers; --
1; SELECT * FROM users
```

**Protection:** Supabase parameterized queries handle this, but verify:
```typescript
// SAFE - parameterized
const { data } = await supabase
  .from('workers')
  .select('*')
  .eq('email', userInput)

// NEVER DO - string concatenation
const { data } = await supabase.rpc('raw_query', {
  sql: `SELECT * FROM workers WHERE email = '${userInput}'`  // VULNERABLE
})
```

### 2. XSS (Cross-Site Scripting)
**Test:** Try scripts in form inputs
```
<script>alert('xss')</script>
<img src=x onerror="alert('xss')">
javascript:alert('xss')
<svg onload="alert('xss')">
```

**Protection:** React escapes by default, but watch for:
```typescript
// DANGEROUS - never use with user input
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// SAFE - React escapes automatically
<div>{userInput}</div>
```

### 3. CSRF (Cross-Site Request Forgery)
**Test:** Can actions be triggered from external sites?

**Protection:** Next.js Server Actions include CSRF protection. Verify:
- Actions only accept POST
- Origin header validated
- Cookies are SameSite=Lax or Strict

### 4. Authentication Bypass
**Test:**
```
- Access /dashboard without login
- Modify JWT tokens
- Replay old session tokens
- Access other users' data by changing IDs
```

**Protection:**
```typescript
// Every protected route must check auth
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  redirect('/login')
}

// Every data access must use RLS
// Supabase RLS automatically filters by user
```

### 5. IDOR (Insecure Direct Object Reference)
**Test:** Change IDs in URLs/requests to access other users' data
```
/api/workers/123  → /api/workers/456
/profile?id=abc   → /profile?id=xyz
```

**Protection:** Always verify ownership:
```typescript
// BAD - trusts user input
const { data } = await supabase
  .from('workers')
  .select('*')
  .eq('id', params.id)  // Anyone can access any worker

// GOOD - RLS enforces ownership
// With RLS policy: auth.uid() = user_id
const { data } = await supabase
  .from('workers')
  .select('*')
  .eq('id', params.id)  // RLS blocks unauthorized access
```

### 6. Rate Limiting
**Test:** Spam endpoints rapidly
```bash
for i in {1..100}; do
  curl -X POST https://site.com/api/signup -d "email=test$i@spam.com"
done
```

**Protection:** Implement rate limiting:
```typescript
// middleware.ts or API route
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
})

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new Response('Too many requests', { status: 429 })
  }

  // Process request
}
```

### 7. Input Validation
**Test:** Submit malformed data
```
- Empty required fields
- Strings in number fields
- Extremely long strings (10000+ chars)
- Unicode/emoji in text fields
- Negative numbers where positive expected
- Future dates where past expected
```

**Protection:** Validate on server (Engine_Validation):
```typescript
// lib/engines/Engine_Validation.ts
export const Engine_Validation = {
  validateWorker(data: unknown): ValidationResult {
    // Use zod for schema validation
    const schema = z.object({
      email: z.string().email().max(255),
      first_name: z.string().min(1).max(100),
      trade: z.enum(['plumbing', 'electrical', 'hvac', 'carpentry', 'general']),
      experience_level: z.enum(['none', 'some', '1-2years', '3+years']),
    })

    const result = schema.safeParse(data)
    if (!result.success) {
      return { valid: false, errors: result.error.flatten() }
    }
    return { valid: true, data: result.data }
  }
}
```

### 8. Information Disclosure
**Test:** Look for leaked data
```
- Check API responses for extra fields
- Look at error messages for stack traces
- Check for exposed .env files
- Look for debug endpoints
- Check robots.txt and sitemap for hidden routes
```

**Protection:**
```typescript
// Only return needed fields
const { data } = await supabase
  .from('workers')
  .select('id, first_name, trade')  // NOT select('*')

// Generic error messages to users
catch (error) {
  console.error('Internal:', error)  // Log full error
  return { error: 'Something went wrong' }  // Generic to user
}
```

### 9. File Upload (If Applicable)
**Test:**
```
- Upload .exe, .php, .js files
- Upload files with double extensions (image.jpg.php)
- Upload extremely large files
- Upload files with malicious EXIF data
```

**Protection:**
```typescript
// Validate file type and size
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

if (!ALLOWED_TYPES.includes(file.type)) {
  throw new Error('Invalid file type')
}
if (file.size > MAX_SIZE) {
  throw new Error('File too large')
}
```

## Smoke Test Script

### Manual Checklist
Run before every deploy:

```markdown
## Pre-Deploy Smoke Test

### Landing Page
- [ ] Visit / - loads without error
- [ ] Click "Find Apprentices" - navigates/scrolls correctly
- [ ] Click "Find a Trade Role" - navigates/scrolls correctly
- [ ] Fill waitlist form - submits successfully
- [ ] Check Supabase - data appeared in waitlist table

### Mobile
- [ ] Open in mobile viewport (375px)
- [ ] All text readable
- [ ] Buttons tappable (not cut off)
- [ ] No horizontal scroll

### Console
- [ ] No JavaScript errors
- [ ] No failed network requests
- [ ] No React hydration errors

### Performance
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] No layout shift
```

### Automated Smoke Test (Future)
```typescript
// __tests__/smoke.test.ts
import { test, expect } from '@playwright/test'

test('landing page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Qualified Labor/)
  await expect(page.locator('h1')).toContainText('Match Apprentices')
})

test('waitlist form submits', async ({ page }) => {
  await page.goto('/')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.selectOption('select[name="type"]', 'worker')
  await page.click('button[type="submit"]')
  await expect(page.locator('.success-message')).toBeVisible()
})

test('mobile responsive', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  // No horizontal scrollbar
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
})
```

## Security Headers

Verify these headers are set (in next.config.js or middleware):
```typescript
// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
]
```

## Environment Security
```
[ ] .env in .gitignore
[ ] No secrets in client-side code (NEXT_PUBLIC_*)
[ ] Service role key only used server-side
[ ] Production uses different keys than development
```

## Quick Security Audit Command
```bash
# Check for secrets in git history
git log -p | grep -i "password\|secret\|key\|token" | head -50

# Check for .env files committed
git ls-files | grep -i env

# Check package vulnerabilities
npm audit
```
