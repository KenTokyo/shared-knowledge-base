# 🎬 Golden Rules for Animated Loading States

## 🧠 Core Philosophy: Perceived Performance > Actual Performance

Our goal is to make the application *feel* instant, even when loading heavy data. We achieve this by showing critical content immediately and progressively revealing less important elements. This creates a smooth, high-quality user experience.

---

## ✨ The 3 Golden Rules of Loading

1.  **🥇 Instant Critical Content First:** The most important information the user needs (e.g., page title, main heading) must appear instantly. This content should be rendered on the server and not be part of any animation sequence.
2.  **🌊 Stagger Animations (Waterfall):** Never reveal all elements at once. Create a "waterfall" effect by staggering animations with small delays (`0.1s`, `0.2s`, etc.). This guides the user's eye and makes loading feel dynamic.
---

## 🏗️ The Blueprint: Core Implementation

### 1. CSS Foundation

Use these minimal, standardized CSS classes for all staggered loading animations.

```css
/* Keyframes for animations */
@keyframes slideInFade {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeInScale {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Animation utility classes */
.animate-slide-fade { animation: slideInFade 0.5s ease-out forwards; opacity: 0; }
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
.animate-fade-scale { animation: fadeInScale 0.4s ease-out forwards; opacity: 0; }

/* Delay utility classes */
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }
```

### 2. The `UniversalSection` Component (Best Practice)

To ensure consistency, use a wrapper component like this. It combines animation, delay, and `Suspense` for asynchronous content.

```tsx
// components/UniversalSection.tsx
import { Suspense } from 'react';
import LoadingState from '@/components/LoadingState';

type AnimationType = 'slide' | 'fade' | 'fadeScale';
type DelayType = 1 | 2 | 3 | 4 | 5;

interface Props {
  delay: DelayType;
  animation?: AnimationType;
  children: React.ReactNode;
  className?: string;
}

const animationClasses = {
  slide: 'animate-slide-fade',
  fade: 'animate-fade-in',
  fadeScale: 'animate-fade-scale'
};

export default function UniversalSection({ 
  delay, 
  animation = 'fade',
  children, 
  className = "mt-8"
}: Props) {
  const animClass = animationClasses[animation];
  const delayClass = `delay-${delay}`;
  
  return (
    <div className={`${className} ${animClass} ${delayClass}`}>
      <Suspense fallback={<LoadingState />}>
        {children}
      </Suspense>
    </div>
  );
}
```

### 3. Next.js Page Example (Blueprint)

This demonstrates the perfect loading sequence.

```tsx
// app/some-page/page.tsx
import UniversalSection from '@/components/UniversalSection';
import HeavyComponent from '@/components/HeavyComponent';
import AnotherAsyncComponent from '@/components/AnotherAsyncComponent';

export default async function Page() {
  // 🥇 Rule 1: This is rendered on the server and appears INSTANTLY.
  const criticalData = await getCriticalData();

  return (
    <div>
      {/* INSTANT CONTENT - NO ANIMATION */}
      <h1 className="text-4xl font-bold">{criticalData.title}</h1>
      <p className="text-lg text-gray-600">{criticalData.subtitle}</p>

      {/* 🌊 Rule 2: Staggered animations for everything else */}
      
      <UniversalSection delay={1} animation="slide">
        <SomeInfo data={criticalData.info} />
      </UniversalSection>

      <UniversalSection delay={2} animation="fadeScale">
        <HeavyComponent />
      </UniversalSection>

      <UniversalSection delay={3} animation="fade">
        <AnotherAsyncComponent />
      </UniversalSection>
    </div>
  );
}
```

---

## 🚨 Safety Net: Key Edge Cases & Anti-Patterns

*   **SEO:** Ensure critical SEO content (like `h1`, `meta description`) is rendered on the server and is not dependent on client-side animation.
*   **Layout Shift (CLS):** Reserve space for loading elements using skeletons or fixed-height containers to prevent content from jumping.
*   **Slow APIs:** For components that might take too long, consider a timeout that shows a simplified fallback state.
*   **❌ ANTI-PATTERN:** Do not animate the main page layout container. Animate the *content inside* the layout.
*   **❌ ANTI-PATTERN:** Do not apply the same delay to multiple elements. The goal is a staggered, not a grouped, reveal.