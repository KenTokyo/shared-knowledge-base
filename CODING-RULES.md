# Coding Rules — einfacher Arbeitsvertrag

> **Kompaktpflicht**
> - Tipps, Regeln, Prompts, Pläne, Learnings, Zusammenfassungen, angepasste Doku: möglichst wenige, token-effiziente Stichpunkte.
> - Entfernen: Füllwörter, Wiederholungen, unnötige Artikel (`der`, `die`, `das`, `ein`, `eine`), Prosa.
> - Bewahren: Pflichtinhalt, Gründe, Grenzen, Zahlen, Pfade, Befehle.
> - Ausnahme: `Unchanged original` bleibt unverändert.

**Ziel:** Auftrag verstehen, Original und verlustfrei verbesserte Arbeitsfassung speichern, in Task-Datei planen, verbesserte Aufgabe direkt umsetzen.

- Commit-Pflicht: Bitte alles commiten, am besten erstmals deine Änderungen sowieso, du kannst auch von deinen anderen Mitarbeitern die commits mitcommiten, das ist vollkommen ok
-- Du musst aber commiten und pushen, natürlich merge knoflikte sinnvoll und eigenständig beheben
-- Submodule z.B. shared-docs auch commiten

**Reihenfolge bei Widersprüchen:** aktueller Userauftrag → lokale `AGENTS.md` → diese Coding Rules → passende Fachregeln und belegte Learnings.

**Ausnahmen sind erlaubt.** Der User darf jede Regel dieser Datei für eine Sitzung oder einen Auftrag aufheben — auch Sperren wie die Freigabepflicht für browsergestützte Laufzeit-Sichtprüfungen (§5) oder die Testsperre (§6). Eine gewährte Ausnahme gilt für die genannte Sitzung, wird in Antwort und Task-Datei genannt und braucht keine Rückfrage mehr. Sie ändert diese Datei nicht und gilt nicht automatisch für die nächste Sitzung. Das direkte Lesen lokaler, vom User bereitgestellter Referenzbilder ist keine solche Ausnahme, sondern regulär erlaubt.

**Ausdrücklich bereitgestellte Test-Zugänge verwenden.** Nennt der User im aktuellen Auftrag einen lokalen Secret-Pfad oder stellt begrenzte API-Keys ausdrücklich für den beauftragten Test bereit, darf und soll die ausführende KI sie ohne erneute Erlaubnisfrage lesen und im genannten Umfang verwenden. Nur ignorierter lokaler Speicher oder Prozess-Umgebung; Werte nie ausgeben, in Prompt/Task/Log/Screenshot übernehmen oder committen. Kosten-/Providergrenzen beachten, zuerst kostenloses oder günstiges aktuell verfügbares Modell prüfen und echte Auth-/Quota-Fehler redigiert dokumentieren.

**Fester Schlüsselort auf diesem Mac (User 2026-09-01):** `/Users/kentoky/Desktop/Accs/KEYS.md` — dort liegen die freigegebenen Test-Schlüssel als `NAME=WERT` je Zeile (aktuell `OPENCODE_API_KEY`). Zweite Ablage im selben Ordner: `API-KEYS.md`. Bei einem beauftragten Anbietertest zuerst dort nachsehen, statt nach Schlüsseln zu fragen oder den User sie erneut in den Chat tippen zu lassen — ein Chat-Klartextschlüssel landet über die Markdown-Historie dauerhaft im Arbeitsordner. Datei nur lesen, Werte weiterhin nie ausgeben, kopieren, committen oder in Task/Log/Screenshot übernehmen.

## 1. Prompt-Datei und Task-Datei

Änderung an Projektdatei oder -artefakt → **vor erstem Edit** genau ein Paar:

- `…-enhanced-prompt.md` — feste Quelle mit Original und verbesserter Arbeitsfassung falls notwendig;
- `…-tasks.md` oder vorhandene Task-/Masterdatei — änderbarer Arbeitsplan.

Paarregeln:

- Gleicher Taskordner, sofern Projekt nichts anderes vorgibt.
- Gemeinsamer Namensstamm: `<thema>-enhanced-prompt.md` plus `<thema>-tasks.md`.
- Task-Datei: relativer Prompt-Pfad direkt unter `## Initial goal`.
- Arbeitsumfang, Phasen, Entscheidungen und Stand aus neuestem `Improved prompt` ableiten; ganzen Usertext dort nie kopieren.
- Vorhandenen Plan fortführen. Historische `…-prompt.md` nicht massenhaft umbenennen; beim nächsten aktiven Edit einmal zu `…-enhanced-prompt.md` migrieren, `Improved prompt` ergänzen und Task-Link ändern.
- Spätere Useränderungen datiert an bestehende Enhanced-Datei anhängen; direkt darunter eine neue `#### Improved prompt`-Arbeitsfassung ergänzen.
- Frühere Originale und Verbesserungen nie umschreiben. Abschluss blockiert bei fehlender Datei, kaputtem Link oder Widerspruch zwischen Arbeitsfassung und Plan.

### Enhanced-Prompt-Datei

1. `## Unchanged original` — geschützter gesprochener Usertext in Originalsprache und Originalreihenfolge; füllwörter raus, aber gleichbleibender inhalt.
3. `## Improved prompt` — verlustfreie Arbeitsfassung; steuert immer Plan und Umsetzung.

#### Beispiel 1
z.B. 
User schreibt also unchanged original wäre:
"baue mir 5 neue vfx effekte hier ein also in der elemental domäne, sei extrem kreativ, komplett anders als bisher"

**Enhanced-Prompt wäre also folgender:**
"erweitere dieselbe Signature Library um genau **10 weitere neue VFX**. Erfinde Skills und Namen selbst und gestalte sie skulptural, dimensional, leuchtend, dynamisch, klar lesbar und hochwertig"

Also weiterhin kompakt aber schöner ausgedruckt und schönere adjektive, indemfall die zur Sache gehören, also da elemental domäne ein Projekt ist wo ein magier spells castet und diese gut aussehen sollen, adjektive einbauen. Nicht aber sinnlose, das muss zum entsprechenden Thema Sinn machen

Aber Prompt kann auch ruhig größer sein z.B.

#### Beispiel 2
Erstelle mir ein Vfx studio für einen boxer. Der sollte in Richtung, also der sollte auch Custom GLSL verwenden. Genau, und der sollte so ungefähr fünf Skills haben, so ein bisschen Richtung Flammen und Elektro. so sci fi vibes.

**Enhanced Prompt wäre ungefähr:**
Create a compact Three.js animation and VFX showcase starring one original, photorealistic heavyweight boxer with premium 3D fighting-game energy. Place him on an endless dark studio floor surrounded by low fog, soft light columns, and a surreal sci-fi atmosphere.

Build every skill through a Three.js + hand-written custom GLSL VFX system. Write custom vertex and fragment shaders, generate BufferGeometry at runtime, and animate shader-driven particles. For VFX, use no bitmap, noise, or LUT textures, texture splats, sprite sheets, flipbooks, videos, baked VFX meshes, or imported effect packs. Generate noise mathematically inside GLSL and construct ribbons, rings, pressure cones, shards, fog volumes, and bursts procedurally.

Add five clickable skills with keyboard keys 1–5: Flame Jab, Thunder Cross, Stormfire Hook, Earthbreaker, and Overdrive Detonation. Give Flame Jab a tight fire sheath, hot core, ember wake, and heat distortion. Give Thunder Cross branching leaders, restrikes, electric filaments, and a low shock ring. Fuse flame ribbons and lightning channels into a rotating plasma impact for Stormfire Hook. Make Earthbreaker drive force into the floor, opening procedural radial cracks, lifting ground chunks, throwing grit, and leaving a layered crater and fading fissure glow. End Overdrive Detonation with a compressed energy core, expanding blast shells, debris, smoke, and a heavy shockwave. Build each move around anticipation, muscle tension, foot pressure, hip rotation, shoulder drive, fist contact, recoil, and guard recovery. Drive every layer from the exact fist path, impact point, and animation event.


Use Space to replay, P to pause, and R to reset. Show skill names, keys, active state, and cooldowns in a clean bottom rail. Keep controls instant, animation readable, impacts explosive, and repeated playback smooth.
4. `## Dated updates` — spätere Useränderungen unverändert mit Datum; neue `#### Improved prompt`-Fassung direkt darunter.

`Unchanged original` bewahrt Füllwörter, Wiederholungen, Schreibweise, Pfade, Befehle, Zahlen, Bildhinweise und Grenzen. Secrets nie speichern; stattdessen `[REDACTED: secret]`.


## Weitere Regeln zu Promtps
- Auto-Enhance also Prompts immer verbessern
- Feedback wird ebenfalls häufig gegeben (entweder direkt im Chat oder am Ende der jeweiligen Task-Datei) und soll genauso optimiert werden.
- Binde den jeweiligen Prompt fortlaufend nummeriert in die bestehende Datei enhanced-prompt.md falls existiert ein (ansonsten erzeugen) und optimiere ihn dort direkt.
- Die obigen sind short und medium length prompts, evtl kann der User nach längeren Prompts verlangen oder entscheide du was in dem Fall sinnvoll ist

## Grund warum wir das machen
- Der User hat einen sehr begrenzten Wortschatz und kann sich nicht gut ausdrücken. Du hilfst ihm quasi dabei, also als würde er schreiben "verbessere den prompt" - du machst das und planst und implementierst du den prompt quasi aus

**Default ohne Keyword:** Dieselbe ausführende KI verbessert jeden projektändernden Auftrag, schreibt die Arbeitsfassung und setzt sie ohne Freigabestopp direkt um. Kein zweiter Enhancer und keine getrennte Vorbereitungsrunde. Außer man erwähnt, kein Prompt verbessern notwendig.

Überlege selber, wie du den prompt verbessern kannst im positiven Sinne, sodass der User komplett überrascht wird. Du sollst ja den verbesserten Prompt

### Übergabe und Lesen
Jede Übergabe und jeder Start nach einer Kontextkürzung nennt direkt:

```text
- Prompt: <projekt-relativer Pfad zur *-enhanced-prompt.md>
- Task: <projekt-relativer Pfad zur Task-/Masterdatei>
```

Der Folgeagent liest Prompt → Taskstand → Code. Beim Zusammenführen und Abschluss liest er Prompt und Task erneut. Beide Pfade bleiben bei jeder Kontextkürzung erhalten. Beim Context-Condense oder mit Arbeiten von Subagenten dienen task.md dateien als extrem hilfreich, da keine Informationen verloren gehen und man genau weiß wer an was arbeitet oder woran man vorher gearbeitet hat.

Normaler Lesepfad:

1. lokale `AGENTS.md` vollständig lesen;
2. diese Datei vollständig lesen;
3. Prompt-Datei und danach Task-Datei lesen oder das Paar anlegen;
4. nur die kleinste passende Fachdatei lesen.

Fachdateien, nur lesen, wenn wirklich notwendig

- React, State, Hydration, Browser-UI → [FRONTEND-RULES.md](FRONTEND-RULES.md)
- Echtzeit-3D → [THREEJS-RULES.md](THREEJS-RULES.md)
- vollständiger Weltbau → [THREEJS-WORLDBUILDING-RULES.md](THREEJS-WORLDBUILDING-RULES.md)
- ausdrücklich erlaubte browsergestützte Laufzeit-Captures → [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md)
- neue belegte Learnings → [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md)

- Windows-Ressourcen, Nachbarprojekt oder Port → [WINDOWS-RESSOURCEN.md](WINDOWS-RESSOURCEN.md)
- macOS-Ressourcen, Nachbarprojekt oder Port → [MACOS-RESSOURCEN.md](MACOS-RESSOURCEN.md)
- mehrere Lieferphasen → [Phasenworkflow](agents/TODOS-PHASENWEISE-OHNE-STOPPS-ABHAKEN-UND-WEITERMACHEN.md)

Externe API oder Bibliothek → nur aktuelle Originaldoku zur offenen Frage lesen. Vor großem Lesen kurz notieren: **Auftrag · Leseliste · Fund je Datei · nächster Schritt**. Stoppen, sobald die Änderung sicher entschieden ist.

## 2. Prüfen, entscheiden, durcharbeiten

- Aussagen und Pläne erst nach Code, Doku, Log, Messung oder klarer Logik übernehmen.
- Mögliche Speech-to-Text-Fehler mitdenken; Beispiele und Referenzen stärker als ein wahrscheinlich falsches Einzelwort gewichten.
- Lösung A verbessern, nicht still zu B wechseln. Vor großer Änderung fragen: **Löst sie das genannte Problem?**
- Maße, feste Eigenschaften, Superlative und Verneinungen schützen. „Übernehmen“ heißt gleiche Funktion, gleiches Verhalten, gleicher Datenfluss und gleiche Qualität.
- Kleine Lücke klein beheben; schwache Grundlage zusammenhängend reparieren. Wenige Zeilen sind kein Ziel.
- Altcode prüfen. Schädliche Altwege entfernen, statt weitere Notlösungen darauf zu stapeln.
- Bei Unsicherheit: Problem vereinfachen → ähnliche Projektlösung und Originaldoku prüfen → zwei oder drei Wege vergleichen → besten wählen.
- Setupfehler wie falscher Ordner, fehlende Installation oder Portkonflikt nicht als Produktlösung verstecken.

### Teile aus Repositorys und Referenzen wirklich übernehmen

„Nimm diesen Teil aus dem Repository“ ist ein Ergebnisvertrag, keine Bitte um lose Inspiration. Zu übernehmen sind die qualitätsbestimmenden Eigenschaften des benannten Teils: Funktion, Verhalten, Interaktion, Timing, Datenfluss, Rendering, Material-/Assetlogik, Zustände, Lebenszyklus und sichtbare Qualität. Gleiche Farben, Namen, Formen oder einige ähnliche Parameter reichen nicht, wenn Mechanik und Ergebnis anders bleiben.

Vor dem ersten Implementierungsedit beide Wege Ende zu Ende erfassen:

1. Referenz: Einstieg/Trigger → Daten und Zustände → Kernalgorithmus → Rendering/UI → Lebenszyklus und Cleanup.
2. Zielprojekt: entsprechende Hauptquelle, vorhandene Architektur, widersprechende Altwege und direkt gekoppelte Abhängigkeiten.
3. Qualitätsvertrag: konkrete Eigenschaften, an denen die Übernahme erkennbar ist, plus Referenzpfade und erlaubte Prüfart.
4. Migrationsentscheidung je gekoppeltem Teil: behalten, anbinden, reparieren, ersetzen oder nach Nullreferenz löschen.

Das Zielprojekt darf eine andere Architektur behalten, wenn sie dasselbe Ergebnis nachweisbar trägt. Verhindert seine Grundlage jedoch Funktion oder Qualität der Referenz, ist der nötige zusammenhängende Umbau ausdrücklich Teil des Auftrags: verantwortliche Module ersetzen, Daten- und Renderwege neu verbinden, echte Trigger umleiten und verdrängte Altpfade vollständig entfernen. Umfangreiche Änderungen und Löschungen sind dann richtiger als ein kleiner Patch; wenige geänderte Zeilen sind kein Qualitätsmerkmal.

Mandatory route for reference transfers, before look tuning: pin source commit and public trigger → trace source and target through reset → map every production slot → copy the full quality-bearing runtime slice → add one adapter for IDs, space, one clock, and native render contracts → route real triggers → delete the old path → check source content, finite values, expiry, and reset across all slots. Treat a missing or weak form as an integration defect; check distance, event beat, layers, uniforms, blend/depth, light, and lifecycle before brightness.

Nicht als Übernahme liefern:

- isolierte Demo, Overlay oder Wrapper neben dem echten Produktweg;
- vereinfachte Nachahmung, die den qualitätsbestimmenden Mechanismus auslässt;
- neuer Pfad plus dauerhaft aktiver Altpfad, stiller Fallback oder zweiter Zustands-/Renderverantwortlicher;
- reines Umbenennen, Umfärben, Skalieren oder Parameter-Tuning bei falscher Struktur;
- Abschluss nach einem Pilot, wenn der benannte Teil noch nicht vollständig im echten Weg läuft.

Meldet der User denselben Mangel erneut, gilt der bisherige Ansatz für diesen Punkt als widerlegt. Nicht dieselbe kleine Tuning-Achse wiederholen. Referenz und Ziel erneut Ende zu Ende öffnen, die erste ursächliche Abweichung finden und Architektur, Datenquelle, Ereignisse, Raum-/Zeitbezug, Rendering, Materialien, Assets, Lebenszyklus und Altpfade prüfen. Den Arbeitsumfang auf alle direkt gekoppelten Teile erweitern, die für die geforderte Qualität nötig sind; große Refactorings, Ersatz und Löschung sind dabei ausdrücklich erwartet. Bereits belegtes gutes Verhalten außerhalb dieses Wegs schützen.

Ist eine browsergestützte Laufzeit-Sichtprüfung ausdrücklich erlaubt, verlangt ein wiederholter Referenztransfer-Mangel vor Abschluss einen Source-/Target-Capturevergleich desselben Produktbeats mit vergleichbaren relativen Bildmaßen, Kameraabstand und Renderpfad. Erste sichtbare Abweichung in Ereignis, Raum, Layer, Material/Depth, HDR/Post oder Lebenszyklus beheben; nicht nur Helligkeit tunen.

Fertig ist die Übernahme erst, wenn der echte Produkttrigger den neuen Weg nutzt, die benannten Qualitätsmerkmale umgesetzt sind, verdrängte Wege keine Produktionsreferenzen mehr haben und erlaubte Prüfungen das Ergebnis tragen. Ohne erlaubte browsergestützte Laufzeit-Sichtprüfung nur statische Evidenz, direkt gelesene Referenzbilder und eine genaue manuelle Laufzeitabnahme nennen; keine optische Gleichheit des laufenden Produkts behaupten.

Bei klarem Auftrag nicht nachfragen. Bis zum Ziel oder zu einer echten äußeren Blockade weiterarbeiten. Nur stoppen bei fehlendem Secret/Zugang, widersprüchlichen Pflichtdaten oder nicht erlaubter endgültiger Aktion; dann genau die eine fehlende Information nennen.

**Keine Rückfragen am Ende einer Antwort (Userregel 2026-09-01).** Auch bei mehrdeutigem Auftrag nicht mit einer Frage abschließen: die plausibelste Lesart wählen, die getroffene Annahme in einem Satz nennen und weiterarbeiten. Eine Annahme, die sich später als falsch zeigt, wird korrigiert — sie kostet weniger als ein blockierter Zug. Fragen bleiben nur bei fehlendem Zugang oder einer nicht erlaubten endgültigen Aktion erlaubt. Ebenso nicht am Ende um Erlaubnis für den nächsten offensichtlichen Schritt bitten, sondern ihn ausführen.

Im bearbeiteten Weg sichtbare Fehler, Typfehler, tote Verweise, kaputte Doku, falsche Rechnungen und eigene Rückschritte direkt beheben. Fremde Änderungen nie überschreiben oder zurücksetzen. Fremde Blocker nur so klein wie nötig und ohne Datenverlust beheben; Funde außerhalb des Auftrags nicht zum neuen Großprojekt machen.

## 3. Phasen und Arbeitsablauf

Jede Phase enthält kompakt:

1. **Ziel** — sichtbares oder prüfbares Ergebnis.
2. **Todos** — klare `[ ]`- und `[x]`-Punkte.
3. **Ergebnis** — ein kurzer Satz.
4. **Warum** — nur wenn nicht offensichtlich.
5. **Grenzen** — feste Regeln und Obergrenzen.
6. **Architektur** — Hauptquelle, Verantwortung und Datenfluss.
7. **Funde** — Fehler und Leistungsrisiken nach Schwere und Fixstand.
8. **Referenzen** — höchstens drei Hauptpfade.

Reihenfolge: Grundlage → kompletter Hauptweg → Sonderfälle → Feinschliff → Endprüfung. Jede Phase bleibt zusammenhängend, rückbaubar und möglichst prüfbar.

Arbeitsablauf:

1. Prompt, Taskstand, Arbeitsumfang, Architektur, Git-Diff und Werkzeuge prüfen.
2. Eng verbundene Todos vollständig umsetzen.
3. Stärksten passenden Projektcheck einmal ausführen.
4. Funde gemeinsam beheben; danach normalerweise genau einen Kontrolllauf starten.
5. Phase einmal aktualisieren und direkt zur nächsten offenen Phase wechseln.
6. Am Ende `Unchanged original`, neuesten `Improved prompt`, Task und alle Abnahmepunkte erneut lesen.

Frühere Ergebnisse nur ergänzen. Ab etwa 600 Taskzeilen nach Projektregel aufteilen und verlinken. Verbundene offene Funde als Todos schließen; nur echte spätere Zusatzarbeit bekommt einen eigenen Plan.

## 4. Code und Architektur

- Vor dem Edit Hauptquelle, Verantwortung und Datenfluss verstehen.
- Erst Struktur und kompletten Hauptweg bauen, danach Werte, Optik und Feinschliff.
- Bei instabilen Bereichen doppelte Quellen und Altcode prüfen → eine verlässliche Quelle bauen → alle Nutzer anbinden → alten Weg löschen.
- „Komplett neu“ heißt Inhalt neu aufbauen, nicht nur Farben oder Zahlen ändern.
- Keine versteckten Grenzen oder Qualitätsverluste als Leistungsverbesserung verkaufen.

Dateien:

- Eine Datei hat ein Fachziel. Unabhängige UI, Assets, Datenmodelle und Services trennen.
- Keine wachsenden Sammeldateien wie `entries.ts`, `config.ts`, `data.ts`, `misc.ts` oder `helpers.ts`.
- Sammelstellen importieren und exportieren nur; Fachlogik bleibt beim Fachteil.
- Gemeinsames Modul nur bei echter Wiederverwendung. Globale Module importieren kein Feature.
- Handgepflegte Codedatei maximal **1.200 physische Zeilen**. Neue oder geänderte Datei nie darüber liefern; eine berührte größere Altdatei sinnvoll teilen. Erzeugte Dateien und unveränderter Fremdcode sind ausgenommen.
- Nach Umbauten ungenutzten Code, Imports, Zustände und Verweise löschen.

Datenfluss und Leistung:

- Eine verlässliche Hauptquelle festlegen; parallele Stores und Hin-und-her-Abgleich vermeiden.
- Daten gesammelt laden, unabhängige Arbeit parallel ausführen und viele Einzelzugriffe vermeiden.
- Teure Arbeit bündeln, wiederverwenden, zwischenspeichern oder vorberechnen.
- Eine laufend veränderte Liste nie im selben Durchlauf erweitern; Kopie oder Queue plus `visited`-Set und feste Obergrenze nutzen.
- Neue Schichten brauchen sichtbaren Nutzen. Leistung darf Kernfunktion, Lesbarkeit oder belegte Qualität nicht still verschlechtern.

### Referenzprojekt für Echtzeit-3D-Performance

**`d:\CODING\React Projects\test-projects\shardfall-arena-v2.5-active`** — Three.js · WebGL2 · handgeschriebenes
GLSL, hält stabil 240 FPS bis `devicePixelRatio` 2. Userurteil 28.08.2026: *„Da hab ich am besten richtig gute
Performance."* Bei einer Framerate-Frage auf diesem Stack **dort zuerst nachsehen, wie es gelöst ist**, statt
eine eigene Lösung zu erfinden.

Die vier Entscheidungen, die dort den Unterschied machen — jede im Repo nachlesbar:

- **Fast keine dynamischen Punktlichter.** Feld-Szene: 1 `DirectionalLight`, 1 `HemisphereLight`, höchstens
  2 Punktlichter. `src/loot/dropAura.ts` begründet ausdrücklich, warum kein Punktlicht pro Drop. Ein
  Punktlicht kostet jeden beleuchteten Pixel der ganzen Szene, nicht nur seinen Radius.
- **Ein Renderdurchgang.** `src/fx/grade.ts` rendert einmal in ein multisampled Target, überspringt Bloom
  unter Stärke 0.01 und schließt mit *einem* kombinierten Pass.
- **Boden ohne Pro-Pixel-Feld.** `src/world/terrain.ts` — 2 `smoothstep` + 3 `mix` pro Fragment, null
  Rauschen, null Trigonometrie, null Textur; alle Variation als `fbm2` in Vertexfarben gebacken. Ein
  ungleichmäßiges Gitter (1.25 m im Kern → 4 m außen) statt Ring-LOD, damit keine Naht entsteht.
  Die Gegenprobe steht direkt darunter unter „Bodenflächen".
- **Schattenkarte 2048²** (`src/world/sky.ts`), nicht 4096².

### Bodenflächen (VFX) — gesperrt

Nie wieder bauen: grosse, flach liegende, durchsichtige Flächen mit teurem prozeduralem Shader, die sich über den Boden ausbreiten und dabei stapeln.

- **Grund:** ohne `depthWrite` verdecken sie sich nicht. Kosten = `Σ π · r²`, nicht Anzahl. Eine solche Fläche zog 22.000 m² beschatteten Boden für einen 110 m²-Skill — 198 Schichten tief. Die FPS bleiben im Schnitt hoch, der 1%-Tiefpunkt halbiert sich.
- **Gesperrt:** Voronoi, fbm oder mehr als ~4 Noise-Aufrufe pro Pixel auf einer Bodenfläche; Radius über ~9 m; wachsende Vollplatte unter einem Skill; zweite Bodenschicht über bestehenden Bodenmarken.
- **Erlaubt:** dünne Ringe und Kanten; Bodenmarke als Tönung über Stein statt als Deckschicht; alles, was **über** dem Boden steht (Kristalle, Splitter, Nebel, senkrechte Vorhänge, Partikel).
- **Vorbild:** der Boden im Referenzprojekt oben — 2 `smoothstep` + 3 `mix` pro Fragment, Variation in Vertexfarben gebacken.
- **Beleg:** 2026-08-28 aus `quiz-arena-space` entfernt (`DecalType.FROST`, `createFrostFieldMaterial`). Nicht als Budget klemmen — löschen: eine zu grosse Deckschicht ist der falsche Effekt, nicht ein falsch eingestellter.

## 5. Fachregeln und Sichtprüfung

- React-/Frontend-Arbeit folgt [FRONTEND-RULES.md](FRONTEND-RULES.md); Echtzeit-3D folgt [THREEJS-RULES.md](THREEJS-RULES.md) und genau einer passenden Fachdatei.
- **Lokale Referenzbild-Inspektion ist erlaubt:** Vom User bereitgestellte oder im Auftrag benannte PNG/JPG/WebP-Dateien direkt per Datei-/Bildleser öffnen, ansehen, vergleichen und dauerhaft in den passenden Projektordner kopieren. Das startet keine Anwendung, erzeugt keinen Laufzeit-Capture und zählt nicht als Browser-/UI-/Gameplay-Sichtprüfung.
- **Browsergestützte Laufzeit-Sichtprüfung braucht Freigabe:** Dazu zählen Browserstart, Playwright, CLI-Browser, DevTools-Automation, Öffnen der laufenden App sowie Erzeugen oder Prüfen von Laufzeit-Screenshots. Sie braucht eine **ausdrückliche Freigabe im aktuellen Userauftrag**; Schweigen, alte Freigaben oder eigene Unsicherheit reichen nicht.
- Ohne diese Freigabe keinen Browser oder Dev-Server für Sichtprüfung starten. Statische Code-/Datenprüfung und direkte Referenzbild-Inspektion bleiben erlaubt; der User übernimmt die Sicht- und Spielgefühl-Abnahme der laufenden Anwendung.
- Mit Freigabe erst fertig umsetzen und statisch prüfen, dann [SCREENSHOT-GUIDE.md](SCREENSHOT-GUIDE.md) folgen.
- Für Echtzeit-3D höchstens sechs browsergestützte Laufzeit-Sichtprüfungen; kleinere Usergrenze gewinnt. Nach drei bis fünf Verbesserungen derselben Eigenschaft zur nächsten wichtigen wechseln.
- Eine Sitzungsausnahme des Users (siehe Kopf) hebt die Freigabepflicht auf. Sie hebt die Sechsergrenze und den Dauerwirt aus `AGENTS.md` nicht auf — beide schützen den Rechner, nicht die Regel.
- Wichtig keine Endlosssichtprüfungen, max 2 Sichtprüfungen, außer dir wird gesagt du kannst soviele machen wie du möchtest, Sichtprüfungen verbrauchen viele Ressourcen!

### Startprobe zum Abschluss — Pflicht, sobald die Freigabe vorliegt

Liegt eine Freigabe vor, gehört zum Abschluss **ein** eigener Start der Anwendung mit gelesener Konsole. Nicht optional, nicht statt der Prüfläufe, sondern als letzter Schritt davor.

- **Ablauf:** fertig umsetzen → Projektprüflauf → App selbst starten → Konsole lesen → jeden Fund an der Ursache beheben → ein Kontrollstart → committen.
- **Was zählt:** `console.error`, `console.warn`, ungefangene Ausnahmen, Shader-Übersetzungsfehler, 404 auf eigene Dateien und Abkündigungen der Bibliothek. Eine Abkündigung ist ein Fund: sie steht bei **jedem** Spielstart im Bild und verdeckt den nächsten echten Fehler.
- **Ursache statt Filter:** keine Meldung stummschalten, keine Ausnahmeliste erweitern, ohne den Grund danebenzuschreiben. Eine Ausnahme braucht eine Messung, die zeigt, dass die Seite die Zeile nicht verhindern kann.
- **Grenze:** zwei Startprobe-Läufe, derselbe Deckel wie oben. Ein roter Lauf ist Fehlersuche und zählt nicht als Wiederholung.
- **Am günstigsten** über den vorhandenen CLI-Harness des Projekts statt über ein sichtbares Fenster. Beispiel: `shardfall-flakes/tools/console-gate.mjs` (`npm run arena:console`) startet Vite in-process, hängt headless Chrome über CDP dran und macht jede laute Zeile zum Exit-Code. Bewusst **nicht** in der Kettenprüfung: eine Kette, die bei jedem Lauf einen Browser startet, frisst den Zweierdeckel.
- **Ohne Freigabe** entfällt der Schritt ersatzlos; dann bleibt es beim statischen Beleg, und die Antwort sagt ausdrücklich, dass die Konsole ungeprüft ist.

### Game UI default

Unless a named project style or reference requires something stronger or different:

- Do not ship generic flat dashboard cards as game UI. Use the project palette with layered solid surfaces, inset and raised planes, fine rims, highlights, contact shadows, and restrained glow so controls read as crafted 3D-like objects without adding another canvas.
- Give every important action or state a clear, original inline SVG mark. Keep one stroke and shape language across the screen. Text-only placeholders, repeated generic symbols, and decorative icons without meaning do not count.
- Tie motion to an event: appear → build → highlight → settle or fade. Selection, cast, hit, cooldown, success, and failure need immediate transform/opacity feedback. Keep idle motion to a few signature parts, respect reduced motion, and clean up every listener or animation owner.
- Put combat skill bars at the lower gameplay edge as one compact rail or console. Each slot needs a distinct SVG mark, key chip, readable name on focus/activation, and clear ready, active, progress/cooldown, and disabled states. Group slots tightly; let rim, depth, and state light carry the look instead of oversized cards or constant full-surface neon.

## 6. Checks und Testmenge

- Zusammenhängenden Teil fertigstellen, dann stärksten passenden Projektcheck einmal für alle eigenen Änderungen ausführen.
- Funde sammeln, gemeinsam beheben und normalerweise genau einen Kontrolllauf starten.
- Gleichen Check ohne Änderung oder neue Frage nicht wiederholen. Gleicher Fehler braucht eine andere Ursachenprüfung oder Lösung.
- TypeScript und CI belegen Codesicherheit, nicht Produktqualität, Optik, Lesbarkeit oder Spielgefühl.
- `include` und `exclude` nie verkleinern, nur damit ein Check grün oder schneller wird.
- Vorhandene Projekt-, Cache- und Heap-Skripte nutzen. Bei umgeleiteten Logs Exit-Code und Inhalt prüfen. Cache nur bei belegtem Verdacht über das Clean-Skript löschen.
- Reine Doku-, Prompt- und Regeländerungen brauchen keinen Typecheck.

Ohne Userauftrag oder klare Projektpflicht keine neuen Tests oder Testeinstellungen anlegen und keinen Dev-Server, Browser, browsergestützten Laufzeit-Screenshot-, UI- oder Gameplay-Test starten. Direktes Lesen oder Kopieren bereitgestellter lokaler Referenzbilder bleibt davon unberührt.

## 7. Git und Lieferung

- Nur eigene Dateien stagen; nie `git add -A` nutzen. Fremde Änderungen oder Staging-Einträge sind auch erlaubt, sofern sie älter sind, sonst liegen die zu lange dort. 
- Bitte auch in git commiten, pullen und synchen nach Änderungen, auch im submodule /shared-docs regelmäßig pullen, commiten falls änderungen vorliegen und synchen
- Merge Konflikte sorgfältig und eigenständig lösen, aber sinnvoll!
- Zielbranch ist `main`, außer lokale Regeln nennen einen anderen. Branch oder Worktree nie ohne Userauftrag anlegen, wechseln oder öffnen.
- Jede zusammenhängende und bei Code kompilierfähige Einheit selbst committen und pushen. Titel: `typ(bereich): was`.
- Submodule zuerst innen committen und pushen; danach im Hauptprojekt Zeiger und eigene Hauptprojektdateien committen.
- Vor Abschluss Remote-Stand abrufen und sauber einbauen; nichts still verwerfen.
- Commit- und Push-Fehler beheben. Hooks nie mit `--no-verify` umgehen.
- Vor Commit Status, gestagte Dateiliste, gestagten Diff und `diff --check` prüfen. Danach Hash, Remote-Abgleich und Reststatus melden.

## 8. Sprache und Übergabe

### Regel 0: Rede so, wie der User mit dir redet

Der User schreibt in normalen, alltäglichen Sätzen. Antworte genauso. Das ist die wichtigste Sprachregel und sie schlägt jede andere Regel in diesem Abschnitt.

Konkret:

- **Kurze Sätze.** Ein Gedanke pro Satz. Punkt statt Komma.
- **Normale Wörter.** Sag „Waffe wechseln", nicht „Rollenwechsel am Mount". Sag „geht schneller", nicht „reduziert die Latenz".
- **Keine ausgedachten Fachwörter.** Wenn du ein Wort erfindest, um etwas kürzer zu sagen, hast du es länger gemacht.
- **Keine Bilder und keine Sprüche.** Kein „der Clou", kein „das ist die Zahl, die alles trägt", kein „das ist das Spiel". Sag einfach, was passiert.
- **Erst das Ergebnis, dann der Grund.** Nicht andersrum.
- **Zahlen nur, wenn der User sie braucht.** Eine Zahl im Chat, der Rest in die Datei.
- **Tabellen nur für echte Listen.** Nicht als Ersatz für einen Satz.
- **Fachwort nur, wenn es sein muss.** Dann direkt dahinter in Klammern erklären.

Test vor dem Absenden: Würde ein Freund ohne Programmiererfahrung das verstehen? Wenn nein, umschreiben.

**Warum:** Der User hat gesagt, er versteht die Antworten nicht mehr. Eine Antwort, die keiner liest, ist keine Antwort. Technische Genauigkeit gehört in die Task- und Prompt-Dateien, nicht in den Chat.

Neue teuer belegte Erfahrung nach [LEARNING-SYSTEM.md](LEARNING-SYSTEM.md) speichern. Technische Tipps bleiben prüfbar; die gemessen bessere Lösung gewinnt.

Für Antworten, Prompt-, Task- und Doku-Dateien:

- Ergebnis zuerst; Alltagswörter, direkte Verben, möglichst wenige token-effiziente Stichpunkte.
- Zahlen für Reihenfolge, Pfeile für kurze Abläufe und Checkboxen nur für echte Todos nutzen. Icons sparsam einsetzen.
- Problem, Ursache und Änderung konkret nennen. Füllwörter, Wiederholungen und unnötige Satzteile entfernen.
- Schwierige Begriffe kurz erklären; keine Abkürzungen erfinden und keine lange Ich-Erzählung schreiben.
- UTF-8 und echte Umlaute nutzen; Doku automatisch auf kaputte Zeichen prüfen.
- Chat-Antworten und erzeugte Ausgaben mit starkem Gen-Z-Ton schreiben; Klarheit gewinnt.
- Code, Namen und Code-Kommentare auf Englisch schreiben.

### Wörter, die wir nicht ohne Erklärung nutzen

| Nicht so | Besser so |
|---|---|
| `kanonisch` | `gemeinsame Hauptquelle` |
| `normalisieren` | `prüfen und vereinheitlichen` |
| `Raw` | `unverändertes Original` |
| `Scope` | `Arbeitsumfang` |
| `Owner` | `zuständige Datei` oder `verantwortlicher Teil` |
| `Fan-in` | `Ergebnisse zusammenführen` |
| `Gate` | `Prüfung` oder `Freigabepunkt` |
| `bounded` |  |
| `Vertrag`, `Contract` | `Absprache` oder `Regel` |
| `Quelle der Wahrheit` | `die eine Stelle, die das entscheidet` |
| `orchestrieren` | `steuern` |
| `Instanz` | `Kopie` oder `Exemplar` |
| `abgeleitet` | `ausgerechnet aus` |
| `Kapstein`, `Capstone` | `letzte Stufe` |
| `qualitativ` | `fühlt sich anders an` |
| `Zustandsautomat` | `welcher Bildschirm gerade läuft` |
| `Feuerzeitquote` | `wie oft du schießen kannst` |
| `Multiplikatorkette` | `die Rechnung für die Beute` |

Exakte Code-, API-, Datei- oder Befehlsnamen dürfen diese Wörter behalten; dann ihre Bedeutung kurz erklären.

### Übergabe nach Kontextkürzung

- Höchstens sechs Abschnitte mit je acht kurzen Stichpunkten: Auftrag · Stand · nächster Schritt · Fallen · Dateien · Startbefehl.
- Prompt- und Taskpfad direkt nennen und bei jedem Folgestart behalten.
- Zahlen, Pfade, Befehle und Hashes statt langer Herleitung nutzen; Ursachen, Grenzen und Abhängigkeiten behalten.
- Erledigtes nicht wiederholen.

### Abschluss nach Änderungen

1. **Done:** Ziel und Ergebnis.
2. **Benefit:** Was geht besser?
3. **View:** genaue Datei, Route oder Artefaktpfad.
4. **Test:** ein bis drei Schritte plus erwartetes Ergebnis.
5. **Tech:** Checks, Build, Commit, Hash und Remote-Abgleich.
6. **Problem/Cause:** nur wenn wichtig.

Neue Artefakte mit vollständigem Projektpfad nennen. Finale Bilder, Konzepte und Exporte im Projekt speichern, nicht nur in Temp-, AppData- oder Chatpfaden.

## 9. Schnellcheck vor „fertig“

- [ ] Unverändertes Original und verlustfreier `Improved prompt` in der einen `…-enhanced-prompt.md` gespeichert und unter `Initial goal` verlinkt?
- [ ] Userauftrag, `AGENTS.md`, Prompt, Task, Phasen und Abnahmepunkte erfüllt?
- [ ] Problem vollständig gelöst und schwache Grundlage statt Mini-Fixes repariert?
- [ ] Repository-/Referenzübernahme Ende zu Ende qualitätsgetreu integriert und verdrängte Altwege ohne Produktionsreferenz entfernt?
- [ ] Jede neue oder geänderte handgepflegte Codedatei höchstens 1.200 Zeilen?
- [ ] Passende Fachdatei gelesen; UTF-8, Links, Dateiende, Diff und Checks grün?
- [ ] Nur eigene Dateien gestagt, committed und gepusht; Remote-Stand eingebaut?
- [ ] Übergabe enthält Enhanced-Prompt- und Taskpfad; finale Antwort ist einfaches Englisch?
