# Cheatsheet Style Recipes

Diese Rezepte orientieren sich am Look der Learning-Cards-Spickzettel-Ansicht.

## A) Surface / Card

```tsx
className="rounded-[28px] border border-white/[0.06] bg-white/[0.025] gfx-blur-backdrop-md"
```

Interaktiv:

```tsx
className="transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.10] hover:bg-white/[0.04]"
```

## B) Muted Button

```tsx
className="rounded-xl border border-white/[0.10] bg-white/[0.04] text-white/85 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.14]"
```

## C) Primary Button (sparsam)

```tsx
className="rounded-xl border border-white/[0.10] bg-gradient-to-r from-slate-300/90 to-orange-300/90 text-black transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
```

## D) Input

```tsx
className="h-11 rounded-xl border border-white/[0.10] bg-black/25 text-white placeholder:text-white/45 transition-all focus-visible:border-primary/40 focus-visible:bg-black/35 focus-visible:ring-1 focus-visible:ring-primary/50"
```

## E) Badge (ruhig)

```tsx
className="rounded-full border border-white/[0.10] bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-white/70"
```

## F) Header-Pill (wie Spickzettel)

```tsx
className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/5 px-3 py-1 text-[11px] font-bold tracking-[0.15em]"
```
