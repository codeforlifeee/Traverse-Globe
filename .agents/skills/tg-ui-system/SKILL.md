---
name: tg-ui-system
description: Enforces the Traverse Globe UI design system, including colors, typography, components, and loading states.
---
# Traverse Globe UI System

## Design Language
- **Primary CTA Color**: Always use `#FF5B04` (orange) for primary actions.
- **Backgrounds**: Never use pure `bg-white` as a main background. Use off-whites like `#f8fafc` to `#f1f5f9`, or the theme token `brand-surface`.
- **Motif**: Utilize the "kicker + rule + ampersand" pattern for section headers (a small uppercase label, thin gray divider, and a headline with one orange phrase).

## Typography
- **Headings**: Use `font-season`.
- **Body Text**: Use `font-canva-sans`.
- **Subheadings**: Use `font-poppins`.

## Components & Loading
- **Primitives**: Always use the shadcn/ui primitives located in `src/components/ui/`.
- **Loading States**: Never use spinners (`animate-spin`) or blank screens for data fetching. Always use Skeleton loaders (e.g., `SkeletonCard`, `SkeletonList`, `SkeletonDetail` from `src/components/revamp/Skeletons.jsx`).
- **Cards**: Use `rounded-2xl`, `shadow-md` for resting states and `shadow-xl hover:-translate-y-1` for hover states.
