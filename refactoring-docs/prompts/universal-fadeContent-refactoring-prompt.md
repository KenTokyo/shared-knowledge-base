# 🎨 Universal FadeContent Waterfall Refactoring Prompt

## 📋 Copy-Paste Ready Prompt Template

```
🏗️ **[Reviews Page]** FadeContent Waterfall Refactoring**

Ich möchte eine moderne Server/Client-Component-Architektur mit staggered FadeContent-Animationen 
für die **[Reviews PAGE]**, damit Titel direkt gelanden werden also html context, 
Komponenten die Karten sind oder Sektionen einfach dann mit Suspense ausstatten, 
FadeContent überall implementieren mit leichten Delays von oben nach unten, genauere infos unten**. 

**🎯 Ziele:**
- Server/Client-Components optimal trennen für beste Performance
- Section-basierte Architektur nach unseren Design Pattern Rules  
- HTML-Content (Titel, Navigation) sofort laden (0ms Latency)
- FadeContent Waterfall-Animationen mit blur-Effekt implementieren
- Suspense-Blöcke für jede Section mit optimalen Loading-States

**📁 Aktuelle Struktur:** `[app\reviews\page.tsx]`
**🎨 Gewünschte Sections (nur wenn vorhanden!):**
- (headerSection) - Titel, Navigation, kritische UI-Elemente
- (statsSection) - Nur wenn Statistics/Widgets bereits existieren! 
- ([MAIN_SECTION]) - Hauptcontent, Grids, Listen
- Weitere Sections je nach bestehender Struktur

**⚡ Performance-Anforderungen:**
- 0ms: Header & Titel sofort sichtbar (kein Suspense)
- 100ms: Stats/Widgets mit blur-to-sharp Animation (nur wenn vorhanden!)
- 200ms: Hauptcontent-Section  
- 300ms+: Individual Items mit staggered loading (50ms zwischen Items)

**🌊 FadeContent Waterfall-Pattern von oben nach unten jeweils +100 delay:**
```tsx
// Sofort sichtbar (Static-First)
<FadeContent delay={0}><HeaderSection /></FadeContent>

// Staggered Sections (nur vorhandene Sections verwenden! hierbei nur beispielnahmen)
<FadeContent delay={200} blur><UpperMainSection (besserer Name evtl mehr spezifisch) /></FadeContent>
<FadeContent delay={500} blur><MainContentSection (besserer Name evtl mehr spezifisch) /></FadeContent>
<FadeContent delay={700} blur><LowerMainContext (besserer Name evtl mehr spezifisch) /></FadeContent>

Hier Variation zwischen 200-300ms

Du kannst auch left Content als erstes erscheienn lassen z.B.
<FadeContent delay={500} blur><LeftCard (besserer Name evtl mehr spezifisch) /></FadeContent>
<FadeContent delay={600} blur><MiddleCard (besserer Name evtl mehr spezifisch) /></FadeContent>
<FadeContent delay={700} blur><RightCard (besserer Name evtl mehr spezifisch) /></FadeContent>

Hier reicht aber ein Delay von 100ms abstand

```

**📚 Basis-Dokumentation:**
- `shared-docs/refactoring-docs/rules/design-pattern-component-structure-rules.md`
- benutze FadeContent Komponente`components/FadeContent.tsx`

**🔧 Technische Umsetzung:**
1. **ANALYZE FIRST:** Finde bestehende Header/Content-Komponenten im Code
2. **WRAP EXISTING:** FadeContent um bestehende Components, keine neuen erstellen
3. HTML-Content aus Suspense-Blöcken rausziehen für sofortige Sichtbarkeit  
4. Server Components für Data-Fetching, Client nur für Interaktivität
5. Skeleton Loading-States für jede Section
6. TypeScript-Check nach Refactoring
7. Globale Loading.tsx rausnehmen, da HTML instant visible - keine Ladezeit
8. Legacy Code SOFORT entfernen falls wirklich ungenutzt

**⚠️ KRITISCH:** 
- **NUR REFACTORING, KEINE NEUEN KOMPONENTEN!** 
- Bestehende Header/Components identifizieren und mit FadeContent wrappen
- **NIEMALS** parallel duplicate UI erstellen
- Erst analysieren: Wo ist der Header/Content bereits implementiert?
- Dann: FadeContent um BESTEHENDE Komponenten wrappen
- **ANTI-PATTERN:** Neue HeaderSection neben bestehender erstellen

Kriegst du das hin? 🚀