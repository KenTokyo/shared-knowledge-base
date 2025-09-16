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

## 📊 Data Fetching & Loading Hierarchy

### The Multi-Level Fetching Pattern

Our app follows a **cascading data fetching pattern** that mirrors the visual loading hierarchy:

**Level 1 - Page Level (Instant Critical Data)**
```tsx
// app/perfumes/[slug]/page.tsx
export default async function Page({ params }: Props) {
  // 🥇 CRITICAL: Fetched on server, appears instantly (0ms delay)
  const validation = await validatePerfumeSlug(params.slug);
  const { name, brand, concentration, year } = validation.perfume;

  return (
    <div>
      {/* INSTANT CONTENT - NO LOADING STATE */}
      <h1>{name}</h1>
      <p>{brand}, {year}</p>
      <span>{concentration}</span>

      {/* ASYNC SECTIONS WITH SUSPENSE */}
      <Suspense fallback={<LoadingState />}>
        <PerfumeDetails name={name} brand={brand} />
      </Suspense>
    </div>
  );
}
```

**Level 2 - Section Level (Heavy Components with Joint Queries)**
```tsx
// PerfumeDetails.tsx
export default async function PerfumeDetails({ name, brand }) {
  // 🔍 MAIN QUERY: Fetch core data + relations
  const { data } = await supabase
    .from("Perfumes")
    .select(`*, PAccords(*), Ratings(*), Brands(*)`)
    .match({ name, "Brands.name": brand })
    .single();

  // 🔍 SECONDARY QUERY: Additional related data
  const { data: users_rated } = await supabase
    .from("Profile")
    .select("*")
    .in("id", profileIdsWithReview);

  return (
    <>
      {/* Staggered sections with progressive loading */}
      <UniversalSection delay={1}>
        <PerfumeImage imageUrl={perfume.image_url} />
      </UniversalSection>
      
      <UniversalSection delay={2}>
        <PerfumeHeroSection perfume={perfume} />
      </UniversalSection>
      
      <UniversalSection delay={3}>
        <Accords accordIds={accordIds} />
      </UniversalSection>
    </>
  );
}
```

**Level 3 - Component Level (Specific Data Queries)**
```tsx
// Accords.tsx
async function Accords({ accordIds }) {
  // 🔍 COMPONENT-SPECIFIC QUERY: Only fetch what this component needs
  const { data: accords } = await supabase
    .from("Accords")
    .select("*")
    .in("id", accordIds);

  return (
    <div className="glass-card">
      <h2>Duftrichtung</h2>
      {accords?.map(accord => (
        <span key={accord.id}>{accord.name}</span>
      ))}
    </div>
  );
}
```

### 🎯 Fetching Strategy Rules

1. **🥇 Critical First:** Page-level queries fetch only what's needed for immediate display (title, basic info)
2. **🔄 Batch Related Data:** Section-level components fetch their core data + immediate relations in one query
3. **🎯 Component-Specific:** Individual components fetch their specific requirements (e.g., Accords fetches accord details)
4. **⚡ Progressive Loading:** Each level has its own Suspense boundary with appropriate fallbacks

### 🎬 The Complete Flow Example

```tsx
// 1. Page loads instantly with critical data
<h1>Dior Homme</h1>           // ✅ 0ms - Server-rendered

// 2. Main section starts loading
<Suspense fallback={<LoadingState />}>
  <PerfumeDetails />           // ⏳ Loading main perfume data...
</Suspense>

// 3. Within PerfumeDetails, sections appear with staggered animation
<UniversalSection delay={1}>
  <PerfumeImage />             // ✅ 100ms - Image appears
</UniversalSection>

<UniversalSection delay={2}>
  <PerfumeHeroSection />       // ✅ 200ms - Hero section fades in
</UniversalSection>

<UniversalSection delay={3}>
  <Suspense fallback={<Spinner />}>
    <Accords />                // ⏳ 300ms - Accords component fetches its data
  </Suspense>
</UniversalSection>
```

**Result:** User sees **title immediately**, then sections **cascade in beautifully** with their data, creating a premium loading experience.

---

## 🚨 Safety Net: Key Edge Cases & Anti-Patterns

*   **SEO:** Ensure critical SEO content (like `h1`, `meta description`) is rendered on the server and is not dependent on client-side animation.
*   **Layout Shift (CLS):** Reserve space for loading elements using skeletons or fixed-height containers to prevent content from jumping.
*   **Slow APIs:** For components that might take too long, consider a timeout that shows a simplified fallback state.
*   **❌ ANTI-PATTERN:** Do not animate the main page layout container. Animate the *content inside* the layout.
*   **❌ ANTI-PATTERN:** Do not apply the same delay to multiple elements. The goal is a staggered, not a grouped, reveal.
*   **❌ DATA ANTI-PATTERN:** Never fetch all data at page level - this blocks the entire page render
*   **❌ DATA ANTI-PATTERN:** Don't create separate queries for each small piece of data - batch related queries
*   **❌ DATA ANTI-PATTERN:** Avoid waterfall loading where Component A waits for Component B's data