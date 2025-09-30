# 🎨 Universal FadeContent Waterfall Refactoring Prompt

## 📋 Copy-Paste Ready Prompt Template

```
🏗️ **[News Page]** FadeContent Waterfall Refactoring**

Ich möchte eine moderne Server/Client-Component-Architektur mit staggered FadeContent-Animationen 
für die **[News PAGE]**, damit Titel direkt gelanden werden also html context
Komponenten die Karten sind oder Sektionen einfach dann mit Suspense ausstatten, 
FadeContent überall implementieren mit leichten Delays von oben nach unten, genauere infos unten**. 

**🎯 Ziele:**
- Server/Client-Components optimal trennen für beste Performance
- Section-basierte Architektur nach unseren Design Pattern Rules  
- HTML-Content (Titel, Navigation) sofort laden (0ms Latency)
- FadeContent Waterfall-Animationen mit blur-Effekt implementieren
- Suspense-Blöcke für jede Section mit optimalen Loading-States

**📁 Aktuelle Struktur:** `[News\page.tsx]`
**🎨 Gewünschte Sections (nur wenn vorhanden!):**
- (headerSection) - Titel, Navigation, kritische UI-Elemente
- (statsSection) - Nur wenn Statistics/Widgets bereits existieren! 
- ([MAIN_SECTION]) - Hauptcontent, Grids, Listen
- Weitere Sections je nach bestehender Struktur

**⚡ Performance-Anforderungen (KRITISCH!):**
- 0ms: Header & Navigation INSTANT (KEINE Data-Fetching-Logik in page.tsx!)
- Page.tsx soll FAST LEER sein - nur HTML-Content ohne Finder/Actions!
- Alle Data-Fetching-Logik in separate MainContent-Komponente auslagern!
**⚡ Performance-Anforderungen (KRITISCH!):**
- 0ms: Header & Navigation INSTANT (KEINE Data-Fetching-Logik in page.tsx!)
- Page.tsx soll FAST LEER sein - nur HTML-Content ohne Finder/Actions!
- Alle Data-Fetching-Logik in separate MainContent-Komponente auslagern!
- 100ms: Stats/Widgets mit blur-to-sharp Animation (nur wenn vorhanden!)
- 200ms: Hauptcontent-Section mit Data-Loading
- 200ms: Hauptcontent-Section mit Data-Loading
- 300ms+: Individual Items mit staggered loading (50ms zwischen Items)

**🌊 CRITICAL Page-Separation Pattern:**
**🌊 CRITICAL Page-Separation Pattern:**
```tsx
// ❌ ANTI-PATTERN: Data-Fetching in page.tsx blockiert Header!
function Dashboard() {
  const profile = await getCurrentProfile(); // <- BLOCKIERT INSTANT HEADER!
  const data = await loadDashboardData();   // <- BLOCKIERT INSTANT HEADER!
  
  return (
    <HeaderSection />  // <- Wird erst nach Data-Loading gezeigt!
  );
}

// ✅ CORRECT PATTERN: Page fast leer, nur HTML-Content
function Dashboard() {
  return (
    <div>
      {/* INSTANT HTML - Kein Data-Fetching! */}
      <FadeContent delay={0}>
        <HeaderSection />      {/* Pure HTML, kein await */}
      </FadeContent>
      
      <FadeContent delay={100}>
        <ControlsSection />    {/* Controls ohne Data-Dependency */}
      </FadeContent>
      
      {/* ALLE Data-Fetching-Logik hier rein! */}
      <FadeContent delay={200} blur>
        <Suspense fallback={<MainContentSkeleton />}>
          <DashboardMainContent />  {/* getAlleDatenHier + profile + auth logic */}
        </Suspense>
      </FadeContent>
    </div>
  );
}
```

**🚨 PAGE-LEVEL RULE:**
- **Page.tsx = 90% HTML, 10% Logic**
- **MainContent.tsx = 90% Logic, 10% HTML**
- Alles mit `await getCurrentProfile()`, Finder, Actions → MainContent!
- Page nur für INSTANT-sichtbare UI-Elemente (Header, Navigation, Controls)

**FadeContent Delays:**
```tsx
delay={0}   // Header, Navigation (INSTANT HTML)
delay={100} // Controls, Static UI (kein Suspense nötig!)
delay={200} // MainContent mit Data-Loading (Suspense!)
delay={300+}// Individual Cards/Items in MainContent
// ❌ ANTI-PATTERN: Data-Fetching in page.tsx blockiert Header!
function Dashboard() {
  const profile = await getCurrentProfile(); // <- BLOCKIERT INSTANT HEADER!
  const data = await loadDashboardData();   // <- BLOCKIERT INSTANT HEADER!
  
  return (
    <HeaderSection />  // <- Wird erst nach Data-Loading gezeigt!
  );
}

// ✅ CORRECT PATTERN: Page fast leer, nur HTML-Content
function Dashboard() {
  return (
    <div>
      {/* INSTANT HTML - Kein Data-Fetching! */}
      <FadeContent delay={0}>
        <HeaderSection />      {/* Pure HTML, kein await */}
      </FadeContent>
      
      <FadeContent delay={100}>
        <ControlsSection />    {/* Controls ohne Data-Dependency */}
      </FadeContent>
      
      {/* ALLE Data-Fetching-Logik hier rein! */}
      <FadeContent delay={200} blur>
        <Suspense fallback={<MainContentSkeleton />}>
          <DashboardMainContent />  {/* getAlleDatenHier + profile + auth logic */}
        </Suspense>
      </FadeContent>
    </div>
  );
}
```

**🚨 PAGE-LEVEL RULE:**
- **Page.tsx = 90% HTML, 10% Logic**
- **MainContent.tsx = 90% Logic, 10% HTML**
- Alles mit `await getCurrentProfile()`, Finder, Actions → MainContent!
- Page nur für INSTANT-sichtbare UI-Elemente (Header, Navigation, Controls)

**FadeContent Delays:**
```tsx
delay={0}   // Header, Navigation (INSTANT HTML)
delay={100} // Controls, Static UI (kein Suspense nötig!)
delay={200} // MainContent mit Data-Loading (Suspense!)
delay={300+}// Individual Cards/Items in MainContent
```

**📚 Basis-Dokumentation:**
- `shared-docs/refactoring-docs/rules/design-pattern-component-structure-rules.md`
- benutze FadeContent Komponente`components/FadeContent.tsx`

**🔧 Technische Umsetzung (CRITICAL Page-Separation!):**
1. **ANALYZE DATA-DEPENDENCIES:** Welche Components brauchen `await`/Finder?
2. **PAGE-LEVEL EXTRACTION:** Alles mit Data-Fetching in MainContent auslagern!
   ```tsx
   // ❌ In page.tsx (blockiert Header!)
   const profile = await getCurrentProfile();
   
   // ✅ In MainContent.tsx (blockiert Header nicht!)
   export async function DashboardMainContent() {
     const profile = await getCurrentProfile();
     // ... alle anderen Finder/Data-Logik
   }
   ```
3. **ZERO-DEPENDENCY HEADER:** Header/Controls ohne await/Finder-Logic
4. **INSTANT HTML IDENTIFICATION:** Was ist pure HTML ohne Data-Dependencies?
5. **FADECONTENT WRAPPING:** Um BESTEHENDE Components, aber in korrekter Reihenfolge
6. **SUSPENSE BOUNDARIES:** Nur um MainContent mit Data-Logic!
7. **TypeScript-Check:** Nach kompletter Page-Separation
8. **Legacy Code REMOVAL:** Ungenutzten Code SOFORT entfernen

**🏗️ Component-Separation-Flow:**
```
page.tsx (FAST LEER!):
├── HeaderSection (INSTANT HTML)
├── ControlsSection (HTML + Client-State, kein await)
└── MainContent (ALLE Data-Fetching-Logic)
    ├── Profile-Loading
    ├── Data-Fetching  
    ├── URL-Params-Parsing
    └── Grid/Cards mit Suspense
```

**⚠️ KRITISCH - PAGE-LEVEL DATA-SEPARATION:** 
- **PRIMARY PROBLEM:** Data-Fetching in page.tsx blockiert INSTANT Header!
- **SOLUTION:** Page = 90% HTML, MainContent = 90% Data-Logic
- **RULE:** Alles mit `await`, `getCurrentProfile()`, Finder → MainContent!
- **ANTI-PATTERN:** `const profile = await getCurrentProfile()` in page.tsx
- **CORRECT PATTERN:** Profile-Logic in MainContent, Header als pure HTML
- **ZERO-DEPENDENCY HEADER:** Titel, Navigation ohne Data-Dependencies
- **SUSPENSE-SCOPE:** Nur um MainContent, NICHT um Header/Controls!

**🚨 INSTANT-LOADING CHECKLIST:**
- ✅ Header sofort sichtbar (0ms, kein await in page.tsx)
- ✅ Controls sofort sichtbar (client-state OK, aber kein server await)
- ✅ MainContent erst mit delay=200 + Suspense (alle Finder hier)
- ❌ NIEMALS: Profile/Auth-Logic in page.tsx (blockiert alles!)

**📋 VALIDATION CHECKLIST:**
- [ ] Page.tsx hat KEINE `await getCurrentProfile()` Logic
- [ ] Page.tsx hat KEINE `loadDashboardData()` Calls  
- [ ] Header erscheint in <100ms (pure HTML)
- [ ] Controls ohne Data-Dependencies funktionieren sofort
- [ ] MainContent hat ALLE Data-Fetching-Logic
- [ ] Suspense nur um MainContent, nicht um Header
- [ ] FadeContent-Delays: 0ms Header, 100ms Controls, 200ms+ MainContent

Kriegst du diese CRITICAL Page-Level Data-Separation hin? 🚀