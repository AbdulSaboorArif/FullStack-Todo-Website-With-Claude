---
name: Heritage & Wisdom
colors:
  surface: '#faf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#faf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ef'
  surface-container: '#efeee9'
  surface-container-high: '#e9e8e3'
  surface-container-highest: '#e3e3de'
  on-surface: '#1b1c19'
  on-surface-variant: '#404944'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#707974'
  outline-variant: '#bfc9c3'
  surface-tint: '#2b6954'
  primary: '#003527'
  on-primary: '#ffffff'
  primary-container: '#064e3b'
  on-primary-container: '#80bea6'
  inverse-primary: '#95d3ba'
  secondary: '#52625c'
  on-secondary: '#ffffff'
  secondary-container: '#d3e3dc'
  on-secondary-container: '#566660'
  tertiary: '#4a2400'
  on-tertiary: '#ffffff'
  tertiary-container: '#6a3700'
  on-tertiary-container: '#ff9939'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b0f0d6'
  primary-fixed-dim: '#95d3ba'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#0b513d'
  secondary-fixed: '#d5e6df'
  secondary-fixed-dim: '#bacac3'
  on-secondary-fixed: '#101e1a'
  on-secondary-fixed-variant: '#3b4a44'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#faf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e3e3de'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base-unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built on a foundation of "Quiet Authority." It balances the weight of historical tradition with a modern, breathable interface. The target audience includes students, researchers, and families seeking an accessible yet scholarly environment to explore the Seerah.

The visual style is **Premium Minimalism**. It avoids the ornate patterns often associated with religious apps in favor of structural elegance, generous white space, and a tactile feel. The goal is to evoke a sense of calm, intellectual clarity, and reverence without feeling dated or overly complex.

## Colors

The palette is rooted in nature and organic materials.
- **Deep Emerald (#064E3B):** Used for primary actions, headings, and key brand moments to signify growth and depth.
- **Soft Sage (#ECFDF5):** Utilized for light backgrounds, subtle alerts, or secondary active states.
- **Warm Sand (#FDFCF7):** The primary background color to reduce eye strain compared to pure white, providing a "paper-like" feel.
- **Ivory (#FFFFFF):** Reserved for elevated card surfaces to create a crisp distinction from the sand-colored backdrop.
- **Subtle Gold (#D97706):** An accent for progress indicators, featured ratings, or important "Aha!" moments in the Q&A experience.

## Typography

This design system employs a "Traditional Modernist" typographic pairing. 
- **Playfair Display** provides the editorial and scholarly tone required for headings. It should be used with slightly tighter letter-spacing in larger sizes to maintain a premium look.
- **Inter** handles the functional requirements of long-form Q&A reading. Its high x-height and neutral character ensure that even complex historical explanations are easy to digest.
- **Line Heights:** Use generous line heights (1.6x - 1.7x) for body text to mimic the readability of high-end physical journals.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid** model. Content is centered within a 1200px max-width container on desktop to prevent long line lengths that hinder reading.

- **Grid:** A 12-column grid for desktop, 8-column for tablet, and 4-column for mobile.
- **Rhythm:** Vertical rhythm is strictly enforced using multiples of 8px. Use 48px or 64px gaps between major content sections to maintain the "Minimalist" aesthetic.
- **Safe Zones:** Always ensure text-heavy blocks have at least 24px of internal padding to keep the content from feeling cramped against borders.

## Elevation & Depth

Depth is achieved through **Natural Stacking** rather than dramatic shadows.
- **Base Layer:** The Warm Sand background (#FDFCF7).
- **Surface Layer:** Cards and containers are Ivory (#FFFFFF) with a very soft, diffused shadow (`0 4px 20px rgba(6, 78, 59, 0.04)`). The hint of Emerald in the shadow prevents it from looking "dirty" and keeps it "organic."
- **Borders:** Use 1px solid #E5E7EB to define boundaries clearly without adding visual weight.
- **Interactive Depth:** On hover, cards may lift slightly (moving from a 4px to an 8px shadow) to provide tactile feedback.

## Shapes

The shape language is **Soft & Welcoming**. 
- **Large Radius:** Use 16px (1rem) for standard cards and containers.
- **Extra Large Radius:** Use 24px for high-level featured sections or search bars.
- **Full Radius:** Use pill shapes for tags, chips, and primary action buttons. 

Avoid sharp corners entirely to maintain a gentle, approachable interface that reflects the "Calm" brand personality.

## Components

- **Buttons:** Primary buttons use the Deep Emerald background with Ivory text. They should have a pill-shape (full rounded) and a subtle 0.2s transition to a slightly darker shade on hover. Secondary buttons use a Sage background with Emerald text.
- **Q&A Cards:** Ivory background, 16px corner radius, and a subtle Sage-colored left border (4px width) to denote the "answer" section.
- **Input Fields:** Search bars should be pill-shaped with a 1px border (#E5E7EB) and a Warm Sand background when inactive, turning Ivory when focused. Use the "book" icon as a leading element.
- **Chips/Tags:** Used for categorization (e.g., "Early Meccan Period"). Use a Soft Sage background with Emerald text and a 100px border radius.
- **Icons:** Monoline, 2px stroke weight. Use consistent sizing (24px). Focus on metaphors of enlightenment: scrolls for history, open books for sources, and lamps for insights.
- **Progress Bars:** For educational tracks, use a thin Sage track with a Gold (#D97706) fill to highlight achievement.