# Design Pattern: Multi-Level Data Fetching

Our app follows a **cascading data fetching pattern** that mirrors the visual loading hierarchy. This ensures critical content is loaded instantly, while heavier, less critical data is loaded progressively.

---

## The Multi-Level Fetching Pattern

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

---

## 🎯 Fetching Strategy Rules

1.  **🥇 Critical First:** Page-level queries fetch only what's needed for immediate display (title, basic info).
2.  **🔄 Batch Related Data:** Section-level components fetch their core data + immediate relations in one query.
3.  **🎯 Component-Specific:** Individual components fetch their specific requirements (e.g., Accords fetches accord details).
4.  **⚡ Progressive Loading:** Each level has its own Suspense boundary with appropriate fallbacks.

---

## 🎬 The Complete Flow Example

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