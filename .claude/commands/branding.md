# Qualified Labor - Brand & Design System

## Project Overview
Qualified Labor is a trades recruitment platform matching apprentices/entry-level workers with contractors and trade businesses. Target demographic: 40-55 year old tradespeople who value function over flash.

## Design Philosophy
McMaster-Carr meets 2026 Amazon - utilitarian, fast, zero bullshit. Every pixel serves a purpose. Respect the user's time. No clever UI tricks.

## Color Palette (McMaster-Carr Inspired)

### Primary Colors
```
White:           #FFFFFF  - Primary background
Charcoal:        #333333  - Primary text
Forest Green:    #336633  - Primary action/CTA buttons
```

### Secondary Colors
```
Gold/Yellow:     #FED700  - Warnings, notices, highlights
Medium Gray:     #999999  - Secondary text, disabled states
Light Gray:      #D6D6D6  - Borders, dividers
Very Light Gray: #EEEEEE  - Section backgrounds
```

### Interactive States
```
Green Hover:     #3C773C  - Button hover state
Green Active:    #1D591D  - Button pressed state
Link Blue:       #006699  - Text links
Focus Blue:      #4499DD  - Focus rings, highlights
```

## Typography

### Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-heading: 'Inter', sans-serif;
```

### Scale (Mobile-First)
```
--text-xs:    12px   - Fine print, captions
--text-sm:    14px   - Secondary text, labels
--text-base:  16px   - Body text (minimum for accessibility)
--text-lg:    18px   - Lead text, emphasis
--text-xl:    20px   - Section headers
--text-2xl:   24px   - Page headers
--text-3xl:   30px   - Hero text
```

### Rules
- Body text minimum 16px for 40-55 demographic
- High contrast ratios (WCAG AA minimum)
- No thin font weights - regular (400) and bold (700) only

## Spacing System
```
--space-1:  4px
--space-2:  8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

## Component Patterns

### Buttons
- Minimum 48px touch target (mobile)
- 16px horizontal padding minimum
- Forest green (#336633) for primary actions
- Clear, action-oriented labels ("Find Apprentices" not "Submit")

### Forms
- Large input fields (48px height minimum)
- Clear labels above inputs
- Inline validation with green checkmarks
- No placeholder-only labels

### Cards/Sections
- 1px light gray borders (#D6D6D6)
- Subtle section dividers
- White backgrounds, light gray for alternating sections

## Voice & Tone
- Direct, no marketing fluff
- Respect the user's time
- Honest about early stage status
- No buzzwords or tech jargon
- "Plain answers. No sales scripts."

## Anti-Patterns (Never Do)
- Carousels or sliders
- Autoplay anything
- Hamburger menus hiding critical navigation
- Tiny text or low contrast
- Dark patterns or manipulative UI
- Fake urgency or social proof
- Animations that delay user action

## Accessibility Requirements
- WCAG AA compliance minimum
- Large tap targets (48px)
- High contrast text
- Keyboard navigable
- Screen reader friendly
- No color-only indicators
