# Qualified Labor - Component Patterns

## Design System Components

Follow McMaster-Carr utility + 2026 accessibility standards. Target demo: 40-55 year old tradespeople.

## Button Component

```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size: 'default' | 'large'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  fullWidth?: boolean
}

// Styles (Tailwind)
const variants = {
  primary: 'bg-[#336633] hover:bg-[#3C773C] active:bg-[#1D591D] text-white',
  secondary: 'bg-[#FED700] hover:bg-[#e5c200] text-[#333333]',
  outline: 'border-2 border-[#336633] text-[#336633] hover:bg-[#336633] hover:text-white',
}

const sizes = {
  default: 'px-6 py-3 text-base min-h-[48px]', // 48px minimum touch target
  large: 'px-8 py-4 text-lg min-h-[56px]',
}
```

Usage:
```tsx
<Button variant="primary" size="large">Find Apprentices</Button>
<Button variant="secondary">Find a Trade Role</Button>
```

## Input Component

```typescript
// components/ui/Input.tsx
interface InputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  placeholder?: string
  required?: boolean
  error?: string
}

// 48px minimum height, 16px font for readability
// Label always above input (never placeholder-only)
```

```tsx
<div className="space-y-2">
  <label
    htmlFor={name}
    className="block text-sm font-medium text-[#333333]"
  >
    {label}
    {required && <span className="text-red-600 ml-1">*</span>}
  </label>
  <input
    id={name}
    name={name}
    type={type}
    className="
      w-full px-4 py-3 min-h-[48px]
      text-base text-[#333333]
      border border-[#D6D6D6] rounded
      focus:outline-none focus:ring-2 focus:ring-[#4499DD] focus:border-transparent
      placeholder:text-[#999999]
    "
    placeholder={placeholder}
    required={required}
  />
  {error && <p className="text-sm text-red-600">{error}</p>}
</div>
```

## Select Component

```typescript
// components/ui/Select.tsx
// Same 48px height, clear chevron indicator
// Options grouped logically (trades together, etc.)
```

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-[#333333]">
    {label}
  </label>
  <select
    className="
      w-full px-4 py-3 min-h-[48px]
      text-base text-[#333333]
      border border-[#D6D6D6] rounded
      focus:outline-none focus:ring-2 focus:ring-[#4499DD]
      bg-white
      appearance-none
      bg-[url('data:image/svg+xml,...')] bg-no-repeat bg-right-4
    "
  >
    <option value="">Select a trade...</option>
    <option value="plumbing">Plumbing</option>
    <option value="electrical">Electrical</option>
    <option value="hvac">HVAC</option>
    <option value="carpentry">Carpentry</option>
    <option value="general">General Construction</option>
    <option value="other">Other Trade</option>
  </select>
</div>
```

## Card Component

```tsx
// components/ui/Card.tsx
// McMaster style: subtle border, clean sections
<div className="
  bg-white
  border border-[#D6D6D6]
  rounded
  p-6
  space-y-4
">
  {children}
</div>
```

## Section Header

```tsx
// McMaster catalog style - bold, underlined
<div className="border-b-2 border-[#333333] pb-2 mb-6">
  <h2 className="text-xl font-bold text-[#333333] uppercase tracking-wide">
    {title}
  </h2>
</div>
```

## Check List (Trade List Style)

```tsx
// components/ui/CheckList.tsx
<ul className="space-y-2">
  {items.map((item) => (
    <li key={item} className="flex items-center gap-3">
      <svg className="w-5 h-5 text-[#336633] flex-shrink-0" /* checkmark *//>
      <span className="text-base text-[#333333]">{item}</span>
    </li>
  ))}
</ul>

// Usage
<CheckList items={['Plumbing', 'Electrical', 'HVAC', 'Carpentry']} />
```

## Two-Column List (What We Match Style)

```tsx
// McMaster dense info display
<div className="grid grid-cols-2 gap-8">
  <div>
    <h3 className="font-bold text-[#333333] mb-3 uppercase text-sm">We Match</h3>
    <ul className="space-y-1 text-[#333333]">
      <li>- Apprentices</li>
      <li>- Helpers</li>
      <li>- Junior technicians</li>
      <li>- Entry-level roles</li>
    </ul>
  </div>
  <div>
    <h3 className="font-bold text-[#999999] mb-3 uppercase text-sm">Not For</h3>
    <ul className="space-y-1 text-[#999999]">
      <li>- Office jobs</li>
      <li>- Gig apps</li>
      <li>- Resume farming</li>
    </ul>
  </div>
</div>
```

## Notice/Callout (Early Stage)

```tsx
// Yellow highlight for important notices
<div className="
  bg-[#FED700]/20
  border-l-4 border-[#FED700]
  p-4
  rounded-r
">
  <h3 className="font-bold text-[#333333] uppercase text-sm mb-2">
    Early Stage - Honest
  </h3>
  <ul className="space-y-1 text-sm text-[#333333]">
    <li>- Direct support from founders</li>
    <li>- Your feedback shapes the platform</li>
    <li>- No hidden fees</li>
    <li>- No locked contracts</li>
  </ul>
</div>
```

## Step List (How It Works)

```tsx
// Numbered steps, clear hierarchy
<ol className="space-y-4">
  {steps.map((step, index) => (
    <li key={index} className="flex gap-4">
      <span className="
        flex-shrink-0 w-8 h-8
        bg-[#336633] text-white
        rounded-full
        flex items-center justify-center
        font-bold text-sm
      ">
        {index + 1}
      </span>
      <span className="text-base text-[#333333] pt-1">
        {step}
      </span>
    </li>
  ))}
</ol>
```

## Layout Primitives

### Container
```tsx
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

### Section
```tsx
<section className="py-12 sm:py-16">
  {children}
</section>

// Alternating background
<section className="py-12 sm:py-16 bg-[#EEEEEE]">
  {children}
</section>
```

### Grid
```tsx
// Two column on desktop, stack on mobile
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
  {children}
</div>
```

## Accessibility Checklist

For every component:
- [ ] 48px minimum touch target
- [ ] 16px minimum font size
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] Focus visible states
- [ ] Keyboard navigable
- [ ] Screen reader labels where needed
- [ ] No color-only indicators

## File Structure

```
components/
  ui/
    Button.tsx
    Input.tsx
    Select.tsx
    Card.tsx
    CheckList.tsx
    Notice.tsx
  landing/
    Hero.tsx
    ForContractors.tsx
    ForWorkers.tsx
    WhatWeMatch.tsx
    HowItWorks.tsx
    EarlyStageNotice.tsx
    Footer.tsx
```
