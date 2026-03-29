## 🎯 Aufgabe

Die KOMPONENTE oben als pfade aufgelistet oder in screenshots gezeigt sehen sehr unmodern aus, die du kreiert hast. Bitte deutlich hochwertiger machen. Schriften gut lesbar machen. Stärker an schauen, was für ein Screen, also die Screenshots sehen tatsächlich deutlich hochmoderner aus. Versucht bitte, dich an einem Screenshot zu orientieren, um die Modernität aufzulisten. Also das muss deutlich modernisiert werden, die Sektion. So können wir das nicht verkaufen. Bitte orientier dich an einem Screenshot sehr stark. Schaue, welcher Screenshot da am besten passt. Ich schicke dir 1-2 mock designs, ganz unten aufgelistet, aber bitte orientier dich an einen sehr stark und versuch das Design sehr gut zu machen.

## Aufgabe

Diese Phase ist der **wichtigste visuelle Qualitaetsschritt**. Hier wird das Design auf Mock-Design-Niveau gebracht. Wenn die Farben oder Borders nicht stimmen, ist DIESE Phase dafuer verantwortlich, das zu korrigieren.

**PFLICHT: Analysiere die hochgeladenen Mock-Design-Screenshots gruendlich BEVOR du Code aenderst.**

---

## PFLICHT-SCHRITT 0: Mock-Design studieren (VOR dem Coden!)

1. **Analysiere die hochgeladenen Mock-Design-Screenshots** sehr genau
2. Extrahiere visuell alle relevanten Design-Eigenschaften daraus
3. Nutze den Mock als deine **einzige visuelle Wahrheit**

Was du aus dem Mock-Screenshot visuell ableiten musst:
1. **Farbpalette** - Hintergrund-Toene, Akzentfarben, Textfarben, Card-Hintergruende (schaetze die Hex-Werte so genau wie moeglich anhand des Bildes)
2. **Font-Stil** - Sieht es nach Serif oder Sans-Serif aus? Duenn oder fett? Eng oder weit? Waehle passende Premium Google Fonts die dem Stil entsprechen
3. **Border-Muster** - Wie werden Borders eingesetzt? Welche Opacity, Dicke, Farbe?
4. **Card-Styling** - Rundung, Schatten, Hintergrund, Hover-Effekte
5. **Section-Hintergruende** - Wie wechseln die Hintergruende zwischen Sektionen?

Notiere deine Analyse als Kommentar: `{/* Mock-Analyse: Farben: ..., Fonts: ..., Borders: ..., Layout: ... */}`

---

## Mock-Design-Auswahl (KRITISCH)

1. Analysiere die hochgeladenen Mock-Screenshots gruendlich
2. Waehle **1 PRIMARY Mock** das am besten zur Branche passt
3. Dokumentiere die Wahl: `{/* MOCK-REFERENZ: PRIMARY=[Beschreibung des gewaehlten Mocks] */}`

### Aus dem Mock visuell extrahieren und 1:1 umsetzen:

| Aspekt | Was visuell ableiten | Wie umsetzen |
|--------|---------------------|--------------|
| **Farben** | BG-Toene, Akzent-Farbe, Text-Farben, Card-BG - schaetze Hex-Werte vom Screenshot | `tailwind.config` Farben in index.html aktualisieren |
| **Fonts** | Serif/Sans Stil, Gewichtungen, Tracking - waehle aehnliche Google Fonts | Google Fonts Link + fontFamily in tailwind.config |
| **Layout** | Hero-Komposition, Grid, Card-Shapes | Komponenten-Struktur anpassen |
| **Navbar** | Pill/Floating/Glass, Morphing-Verhalten | Navbar.tsx komplett ueberarbeiten |
| **Cards** | Rundung, Schatten, Borders, Hover-States | Alle Card-Komponenten anpassen |
| **Spacing** | Section-Padding, Element-Abstaende | Tailwind-Klassen anpassen |

---

## FARB-REGELN (KRITISCH - Hauptgrund fuer schlechte Ergebnisse)

### Farben IMMER vom Mock ableiten - NIEMALS generisch waehlen

Du hast keine vorgefertigten Farbpaletten. Stattdessen:

1. **Schau dir den Mock-Screenshot genau an**
2. **Schaetze die Hex-Farbwerte** so praezise wie moeglich anhand des Bildes
3. **Definiere eine vollstaendige Palette** mit:
   - Background (Haupt-Hintergrundfarbe)
   - Card-BG (Karten-Hintergrund)
   - Primary (Akzentfarbe fuer Buttons, Highlights)
   - Text-Dunkel (Ueberschriften)
   - Text-Muted (Fliesstext, sekundaere Infos)
   - Border-Farben (immer muted/subtil)

4. **Dokumentiere jede Farbe** mit Herkunft: `{/* Farbe abgeleitet vom Mock: Hintergrund sieht nach warmem Off-White aus -> #faf8f5 */}`

### Grundregel: Light Mode ist Standard
- Wenn der Mock dunkel ist, invertiere die Palette zu Light Mode
- Dunkle Hintergruende werden hell, helle Texte werden dunkel
- Akzentfarben bleiben gleich oder werden leicht angepasst

Light und DarkMode kompatibel soll das jedoch sein

### Font-Auswahl anhand des Mocks
Schaue dir den Mock an und waehle passende Premium Google Fonts:

| Mock-Stil | Empfohlene Display-Fonts | Empfohlene Body-Fonts |
|-----------|-------------------------|----------------------|
| Elegant/Serif | DM Serif Display, Playfair Display, Cormorant Garamond | DM Sans, Inter, Plus Jakarta Sans |
| Modern/Clean | Space Grotesk, Sora, Manrope | Inter, DM Sans, Plus Jakarta Sans |
| Technisch/Bold | Rajdhani, Orbitron, Space Grotesk | Inter, DM Sans |
| Warm/Handwerk | Playfair Display, Lora | DM Sans, Source Sans 3 |

---

### BORDER-REGELN (KRITISCH - muss eingehalten werden!)

**Grundregel: Borders sind IMMER muted. KEINE leuchtenden Akzentfarben auf Borders.**

#### Dark Mode - erlaubte Borders:
| Zustand | Erlaubt | VERBOTEN |
|---------|---------|----------|
| Ruhezustand | `border-white/5`, `border-white/8`, `border-white/10` | `border-primary`, `border-amber-500` |
| Hover | `border-white/15`, `border-white/20` | `border-primary-400`, `border-blue-500` |
| Fokus/Aktiv | `border-white/25`, `border-secondary/20` | `border-secondary`, `border-accent` |

#### Light Mode - erlaubte Borders:
| Zustand | Erlaubt | VERBOTEN |
|---------|---------|----------|
| Ruhezustand | `border-slate-200`, `border-stone-200/50`, `border-gray-100` | `border-primary-500`, `border-green-400` |
| Hover | `border-slate-300`, `border-primary-200` | `border-primary-400`, `border-accent-500` |
| Fokus/Aktiv | `border-slate-400`, `border-primary-300` | Volle Akzentfarben |

**Merke: Eine Border soll man kaum bemerken. Wenn die Border "leuchtet" oder "heraussticht", ist sie FALSCH.**

## GSAP ScrollReveal Animations-Check

- **ScrollReveal** muss auf alle Non-Hero-Sektionen angewendet sein.
- Nutze die GSAP-basierte `<ScrollReveal>` Komponente (nicht CSS-Transitions).
- Hero hat eigene GSAP Timeline On-Load Animation.
- Stagger fuer Child-Elemente innerhalb von Sektionen.

## Layering / Z-Index Fixes (Pflicht)

- Wenn Textkarten, KPI-Badges oder Quote-Overlays auf Bildern liegen, muessen sie immer klar lesbar und voll sichtbar sein.
- Behebe Stacking-Probleme explizit: Container sauber strukturieren (`position: relative`) und Text-Layer klar ueber Bild-Layer legen.
- Achte auf versehentliche Stacking-Context-Fallen (`transform`, `filter`, `opacity`, `mix-blend-mode`).
- Vermeide Clipping: `overflow` darf Overlays nicht abschneiden.
- Kontrast sichern: Overlay-Text darf weder im Bild verschwinden noch durch zu geringe Kontraste unlesbar werden.

---

## Farb-Abschluss-Audit (PFLICHT vor Phase-Ende)

Fuehre dieses Audit Zeile fuer Zeile durch bevor du die Phase als abgeschlossen markierst:

### 1. tailwind.config Check:
- [ ] Pruefe die tailwind.config Farben im Code
- [ ] Vergleiche JEDE Farbe mit dem Mock-Design-Screenshot - stimmen sie ueberein?
- [ ] Gibt es generische Farben die nicht zum Mock passen? -> Ersetzen

### 2. Border-Audit:
- [ ] Pruefe im Code alle `border-` Klassen
- [ ] Sind ALLE Borders muted? (white/10, slate-200, stone-200/50 etc.)
- [ ] Gibt es leuchtende Border-Farben? -> Sofort durch muted ersetzen
- [ ] Hover-Borders maximal white/20 oder secondary/30

### 3. Card-BG Check:
- [ ] Card-Hintergruende passen zum Gesamtschema
- [ ] Kein zu starker Kontrast zwischen Card-BG und Section-BG
- [ ] Cards auf dark: leicht heller als BG
- [ ] Cards auf light: gleich oder leicht dunkler (z.B. white mit border auf off-white)

### 4. Vergleich mit Mock-Screenshot:
- [ ] Schaue nochmal auf den Mock-Screenshot
- [ ] Sieht DEIN Ergebnis qualitativ vergleichbar aus?
- [ ] Wenn NEIN: Was ist anders? Farben? Borders? Fonts? -> Korrigieren

## Mock-Treue-Checkliste (vor Abschluss pruefen)

- [ ] Farbpalette stimmt mit Mock ueberein (nicht generisch)
- [ ] Font-Pairing passt zum Mock-Stil (nicht Standard Inter/Roboto allein)
- [ ] Card-Design (Rundung, Schatten, BG) matcht Mock
- [ ] Navbar-Stil folgt Mock-Vorbild
- [ ] Section-Backgrounds und Spacing matchen Mock
- [ ] Hero-Komposition ist mock-inspiriert, nicht generisch
- [ ] **ALLE Borders sind muted** (keine leuchtenden Akzentfarben auf Borders)
- [ ] Gesamteindruck: "Sieht das aus wie eine Premium-Agentur-Seite?" -> JA

## Abnahmekriterien (Pflicht)

- `ScrollReveal` existiert und wird auf alle Non-Hero-Sektionen angewendet (GSAP-basiert).
- Hero hat eigene GSAP Timeline On-Load Animation, nicht nur Standard-Fade.
- Mindestens 1 markante Layout-Aenderung gegenueber dem vorherigen Zwischenstand.
- Ueberlagerte Elemente (Hero-Karten, Quote-Boxen, KPI-Badges) sind auf Desktop und Mobile voll sichtbar.
- Noise-Overlay im HTML intakt (nicht entfernt).
- **Farben, Fonts, Layout sind mock-treu - nicht generisch.**
- **Alle Borders sind muted - keine leuchtenden Border-Farben.**
- **Ergebnis sieht aus wie eine hochwertige Agentur-Seite, nicht wie ein Template.**


WICHTIGSTE REGEL:
Die Texte sollen sinn ergeben, also nicht einfach blind nach dem Mockup kopieren, sondern nur texte die sinnvoll sind einbauen

und wichtig, kompaktes design prioritisieren!


FOLGENDE MOCK DESIGNS sollst du dir anschauen!!!
"D:\CODING\React Projects\linearleads\public\step2WebDesigns\mock-general-dark.png"
"D:\CODING\React Projects\linearleads\public\step2WebDesigns\mock-general-2.png"