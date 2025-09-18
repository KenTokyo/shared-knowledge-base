# Design Pattern: Animated Loading States

## Core Philosophy: Perceived Performance > Actual Performance

Our goal is to make the application *feel* instant, even when loading heavy data. We achieve this by showing critical content immediately and progressively revealing less important elements. This creates a smooth, high-quality user experience.

---

## The 3 Golden Rules of Loading

1.  **🥇 Instant Critical Content First:** The most important information the user needs (e.g., page title, main heading) must appear instantly. This content should be rendered on the server and not be part of any animation sequence.
2.  **🌊 Stagger Animations (Waterfall):** Never reveal all elements at once. Create a "waterfall" effect by staggering animations with small delays (`0.1s`, `0.2s`, etc.). This guides the user's eye and makes loading feel dynamic.
3.  **⚡ Static-First Loading:** Separate static UI elements from dynamic data content to achieve instant perceived performance.

---

## 🎯 Static-First Loading Implementation

The key to instant-feeling applications is **separating static UI from dynamic content**. Users should see the page structure, navigation, and headers immediately while data loads in the background.

#### ❌ **ANTI-PATTERN: Everything in Suspense**

```tsx
// 🚫 BAD: Static UI waits for data
export default function MissionsTab({ profileId }: Props) {
  const missionDataPromise = getMissionData(profileId);
  
  return (
    <div>
      {/* 😩 User sees NOTHING until data loads */}
      <Suspense fallback={<LoadingSpinner />}>
        <Card>
          <CardHeader>
            <CardTitle>Tägliche Missionen</CardTitle>      {/* Static content waiting! */}
            <CardDescription>Vervollständige deine...</CardDescription>  {/* Static content waiting! */}
          </CardHeader>
          <CardContent>
            <MissionStats data={missionData} />           {/* Dynamic content */}
            <MissionList data={missionData} />            {/* Dynamic content */}
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}
```

**Problem:** User sees blank screen/spinner until ALL data loads, even for static text that needs no data.

#### ✅ **CORRECT PATTERN: Static-First with Progressive Loading**

```tsx
// ✅ GOOD: Static UI appears instantly, only data waits
export default function MissionsTab({ profileId }: Props) {
  const missionDataPromise = getMissionData(profileId);
  
  return (
    <div>
      {/* 🥇 INSTANT: Static UI elements appear immediately (0ms) */}
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Tägliche Missionen                             {/* ✅ Instant */}
          </CardTitle>
          <CardDescription>
            Vervollständige deine täglichen Aktivitäten...  {/* ✅ Instant */}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* 🌊 PROGRESSIVE: Only dynamic content waits */}
          <div className="animate-slide-in-up animation-delay-100">
            <Suspense fallback={<MissionStatsLoading />}>
              <MissionContainer missionDataPromise={missionDataPromise} />  {/* ⏳ Data loads */}
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

**Result:** User immediately sees the card structure, title, and description, while mission data loads progressively.

#### 🎯 **What to Put Where:**

**OUTSIDE Suspense (Instant Rendering):**
- Page titles, headings (`<h1>`, `<h2>`)
- Navigation elements, breadcrumbs
- Card headers, descriptions
- Static icons, logos
- Form labels, input placeholders
- Button text (if not dependent on data)

**INSIDE Suspense (Progressive Loading):**
- Lists that require database queries
- User-specific data (stats, preferences)
- Dynamic charts, graphs
- Real-time content
- Search results
- Comments, reviews

#### 🔧 **Implementation Checklist:**

1. **Identify Static Elements:** Look for text, icons, and UI that never change based on data
2. **Extract to Component Root:** Move static elements outside any Suspense boundaries
3. **Wrap Only Dynamic Content:** Place Suspense around components that actually fetch data
4. **Test Perceived Performance:** The user should see meaningful content within 100ms

This pattern transforms a slow-feeling page into an instant-loading experience, dramatically improving user satisfaction.

---

## 🏗️ The Blueprint: Core Implementation

#### 1. CSS Foundation

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

#### 2. The `UniversalSection` Component (Best Practice)

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

#### 3. Next.js Page Example (Blueprint)

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