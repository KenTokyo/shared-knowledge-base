# macOS-Ressourcen – Anhang: Design-Referenzen 1a und 1b

> Anhang zur Karte [MACOS-RESSOURCEN.md](MACOS-RESSOURCEN.md); nur für den passenden Ablauf lesen.

## 1a. Referenz „Glass-Design und Icon-Erzeugung“ — `Claude-Flakes/elemental-flakes`

Nachgetragen am 2026-08-20, weil dieses Repo bei UI-Fragen zweimal als *das* Vorbild genannt wurde und die Tabellenzeile oben nur „Sigil-Icon-Satz in einem Strichrahmen“ sagt. Die zwei Dinge, um die es tatsächlich geht, stehen hier mit Dateipfad, damit sie nicht jedes Mal neu gelesen werden müssen.

**Trigger:** „Glass-Design“, „Glass“, „Icons dürfen nicht alle die gleiche Farbe haben“ → dieser Abschnitt.

### Glass — `elemental-flakes/src/ui/styles.css`

Die Sprache besteht aus fünf Regeln, nicht aus einem Effekt:

1. **Fast schwarze, durchscheinende Füllung** statt einer getönten: `--ui-bg: rgba(10, 14, 20, 0.55)`, dazu `--ui-bg-solid: rgba(12, 16, 22, 0.92)` für alles, was über einer bewegten Szene liegt und sonst flimmert.
2. **`backdrop-filter: blur(...) saturate(...)`** — die Sättigung gehört dazu; ohne sie wirkt die Fläche grau statt gläsern.
3. **Haarlinien in Weiß-Alpha, nie in einem Farbton:** `--ui-border: rgba(255, 255, 255, 0.12)`. Ein farbiger Rand macht aus Glas eine Neonkarte. Das ist die Regel, die am häufigsten gebrochen wird.
4. **Ein einziges Glanzlicht innen oben** (`inset 0 1px 0 rgba(255,255,255,0.08)`), das die Kante als Dicke lesbar macht.
5. **Farbe kommt ausschließlich aus einem `--accent` pro Element**, nicht aus der Fläche. Fläche, Rand und Text sind überall gleich; unterschieden wird über den Akzent.

Weitere Tokens zum Abgleich: `--ui-text: rgba(238,245,255,0.92)`, `--ui-text-dim: rgba(197,214,232,0.6)`, `--ui-accent: #7fd6ff`, `--ui-radius: 14px`, `--ui-shadow: 0 10px 40px rgba(0,0,0,0.45)`.

### Icons — `elemental-flakes/src/ui/glyph-frame.js` und `ELEMENT_META`

Der Satz wirkt einheitlich, weil zwei Entscheidungen getrennt getroffen werden:

- **Form:** `WRAP()` setzt jedes Glyph in **eine 100×100-Box mit `stroke-width: 4.2`**. Ein Icon ist reine Kontur. Kein Glyph nennt jemals eine Farbe — gezeichnet wird in `currentColor`, die Farbe kommt von außen. Deshalb ist derselbe Icon-Satz in jeder Umgebung stimmig.
- **Farbe:** `ELEMENT_META` vergibt **pro Eintrag einen eigenen Hex-Akzent, von Hand**. Nicht aus einem Effekt-Farbwert abgeleitet, nicht aus einer Kategorie berechnet.

Der zweite Punkt ist der, auf den es ankommt: **Gameplay-Farbe und Interface-Farbe sind zwei verschiedene Entscheidungen.** Wer den Akzent aus der Effektfarbe liest, bekommt so viele Farben wie es Energiearten gibt — in `quiz-arena-space` waren das achtzehn Farben auf fünfundfünfzig Skills, sieben davon dasselbe Violett.

**Eindeutige Hex-Werte genügen dabei nicht.** Zwei verschiedene Zahlen können dieselbe Farbe sein; die erste Fassung der Akzenttabelle in `quiz-arena-space` hatte fünfundfünfzig verschiedene Strings und trotzdem zwei Einträge mit einem Abstand von 0,1 in OKLab. Die haltbare Regel ist ein **Wahrnehmungsabstand: kein Paar unter dE 5,0 in OKLab**, gemessen über *alle* Einträge, die nebeneinander erscheinen können. Umgesetzt in `src/ui/Bindings.ts` (`SKILL_ACCENT`), abgesichert in `tools/sim.mjs`.

## 1b. Referenz „Landing-/Marketing-Design“ — `Cadle/index.html` + `Cadle/src/site/ui.js`

Nachgetragen am 2026-09-03, weil der User die NoteTree-Landing an Cadle ausrichten ließ („so ein bisschen hochwertig“). Die ganze Landing steckt in einer einzigen `index.html` (Inline-CSS/-HTML) plus `src/site/ui.js` (Reveals, Count-up, Segment-Steuerung, Scroll-Fortschritt) und `src/site/rail.js` (3D-Kartenschiene). Es geht um die *Mechanik*, nicht um die Spielinhalte.

**Trigger:** „Cadle“, „cadle.gg“, „hochwertige Landing“, „Landing wie Cadle“ → dieser Abschnitt. In NoteTree bereits übertragen: `app/landing/components/shared/landing-editorial.tsx`, `WarmButton.tsx`, `SegmentedTabs.tsx`, `StatStrip.tsx`.

### Vokabular (was den Eindruck macht)

1. **Ein Metall auf tiefem Grund:** Gold-Familie `--gold #d8bd7a`, `--gold-lit #fdf3cd`, `--gold-deep #a9812f` auf fast schwarzer Tinte. Farbe nur als Deko, nie als Fläche.
2. **Drei Hairline-Stufen statt einer Rahmenfarbe:** `rule-faint` (Gold bei .12), `rule` (.24), `rule-lit` (.62). Alles Trennende ist eine dieser drei Linien.
3. **Glas-Platte** als einzige Inhaltsfläche: dunkle, leicht durchscheinende Füllung, Gold-Hairline, Glanzlicht innen oben (`inset 0 1px 0`), tiefer weicher Schatten.
4. **Eyebrow mit vorangestellter Goldlinie** und **Flourish** (Hairline mit Raute in der Mitte) über/unter jeder Headline.
5. **Display-Headline** mit Gold-Verlauf als Text-Clip und **Split-Word-Reveal**: jedes Wort steigt auf und wird scharf (`translateY` + `filter: blur → none`), Stagger ≈ 60–70 ms; Ruhewert `filter: none`, damit kein Stacking-Context bleibt.
6. **Metallische Pill-Buttons:** mehrstufiger vertikaler Goldverlauf, Rim aus zwei Innenschatten (hell oben, dunkel unten), wandernder Glanz beim Hover (`::after` mit Verlauf, `translateX(-120%) → 120%`), Feder `cubic-bezier(.22,1.42,.36,1)`: Hover `translateY(-1px) scale(1.02)`, Druck `scale(.965)`. Ghost-Variante = transparent + Gold-Hairline.
7. **Stat-Streifen** zwischen zwei Hairlines, Zahlen zählen per `data-to` einmal hoch (kubisches Ease-out, ≈1,15 s), Start bei Sichtbarkeit.
8. **Segment-Steuerung:** versenkte Bahn, eine gleitende Pille per FLIP, Panels wechseln mit Blur-Überblendung; Pfeiltasten + Home/End, `aria-selected`.
9. **Sticky-Kopfzeile** mit `.stuck`-Zustand (Blur-Grund + Gold-Hairline) und Scroll-Fortschrittslinie; Anker-Nav mit sektionsbewusster Unterstreichung.
10. **Alles über `transform`/`opacity`/`filter`**, IntersectionObserver-Reveals mit Stagger 70 ms, vollständiger Reduced-Motion-Fallback. Endlos-Loops (Sheen-Drift) laufen dort nur dekorativ; in NoteTree bewusst weggelassen.

### Was NICHT übernommen wird

Reticle, Schuss-/Treffer-Effekte, die 3D-Regionen-Schiene und die Spieltexte. NoteTree behält seine warme Stein-/Glutgold-Palette und die Surface-Tokens; Cadle liefert nur Mechanik und Hierarchie.
