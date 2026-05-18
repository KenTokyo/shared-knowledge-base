# Three.js-Performance-Details und Projekt-Learnings

**Zweck:** Diese Datei erklärt ausführlicher, warum die Regeln aus `shared-docs/THREEJS-RULES.md` existieren. Sie ist die Auslagerung für längere Begründungen, Beispiele und Projektfälle, damit die Hauptdatei nicht unübersichtlich wird.

**Strukturregel für diese Doku:** Nur H1 und H2 verwenden. Unterthemen laufen über fett markierte Stichpunkte.

---

## 1. Warum diese zusätzliche Detaildatei existiert

- **Problem der kurzen Regeldatei:** Eine reine Checkliste ist schnell, erklärt aber nicht, warum eine Regel wichtig ist.
- **Problem einer zu langen Hauptdatei:** Wenn alles in einer Datei steht, wird sie schwer zu scannen.
- **Lösung:** `THREEJS-RULES.md` bleibt die Arbeitsregel-Datei. Diese Datei erklärt die Hintergründe und Denkfehler ausführlicher.
- **Zielgruppe:** Personen, die nicht täglich mit Three.js, R3F, WebGPU oder Voxel-Rendering arbeiten.
- **Projektbezug:** Viele Beispiele stammen aus diesem Voxel-Samurai-Quiz-Projekt. Sie sind bewusst als Projekt-Learnings markiert und nicht als automatische globale Wahrheit.

---

## 2. Warum FPS allein nicht reicht

- **FPS ist ein Durchschnittsgefühl:** FPS sagt grob, wie viele Bilder pro Sekunde entstehen. Es sagt aber nicht sauber, ob einzelne Frames hängen.
- **Framezeit ist direkter:** `frameMs` zeigt, wie lange ein einzelnes Bild braucht. 16,6 ms entsprechen ungefähr 60 FPS, 8,3 ms ungefähr 120 FPS, 4,16 ms ungefähr 240 FPS.
- **Spikes sind wichtig:** Ein Spiel kann 180 FPS im Durchschnitt haben und sich trotzdem schlecht anfühlen, wenn einzelne Frames auf 80 ms springen.
- **P95 hilft:** `frameMsP95` zeigt die schlechten Frames, ohne nur auf einen extremen Ausreißer zu schauen.
- **Worst hilft bei Hängern:** `frameMsWorst` zeigt den härtesten Spike. Der ist wichtig, wenn der User kurze Ruckler spürt.
- **Draw Calls erklären CPU-/Renderer-Druck:** Viele Draw Calls können bedeuten, dass sehr viele einzelne Renderaufträge entstehen.
- **Triangles erklären Geometrie-Druck:** Viele Dreiecke deuten oft auf Terrain, Modelle oder unnötige Seitenflächen hin.
- **Transparenz erklärt Pixel-Druck:** Viele transparente Layer können teuer sein, obwohl Triangle-Zahl und Draw Calls gar nicht extrem aussehen.
- **Projekt-Learning:** In den Performance-Chats war „Skill langsam“ nie nur eine FPS-Zahl. Erst die Kombination aus Skill, Gegnern, VFX-Off, Enemy-Model-Layer und Runtime-Reports zeigte die Ursache.

---

## 3. Warum `useFrame` so kritisch ist

- **`useFrame` läuft ständig:** Bei 240 FPS läuft der Code 240-mal pro Sekunde. Kleine Fehler werden dadurch groß.
- **React-State ist dort teuer:** `setState` kann React-Arbeit auslösen. Das ist für UI gut, aber für pro-Frame-Bewegung oft falsch.
- **Refs sind besser für Bewegung:** Wenn ein Mesh nur bewegt wird, ist `ref.current.position` meist günstiger als React-State.
- **Store-Subscriptions können breit werden:** Wenn ein 3D-Hotpath große Store-Bereiche liest, können kleine Änderungen große Re-render-Ketten erzeugen.
- **HUD darf 3D nicht antreiben:** FPS-Anzeigen oder Debug-Stats dürfen nicht dazu führen, dass Terrain, Gegner oder VFX neu gebaut werden.
- **Gute Grenze:** UI darf Daten anzeigen. Die 3D-Runtime sollte ihre heißen Bewegungsdaten aber möglichst in Refs, typed Arrays oder Runtime-Objekten halten.
- **Projekt-Learning:** Mehrere Performanceprobleme wirkten wie Grafikprobleme, waren aber teilweise Runtime-/State-Probleme.

---

## 4. Warum Instancing und Batching nicht dasselbe sind

- **Instancing:** Viele Kopien gleicher Geometrie und gleichen Materials werden mit unterschiedlichen Matrizen oder Farben gezeichnet.
- **Batching:** Mehrere kleine Renderaufgaben werden zusammengelegt, damit weniger Einzelarbeit entsteht.
- **Instancing passt bei gleichen Dingen:** Viele gleiche Gegnerteile, Partikel, Decals oder Tiles sind gute Kandidaten.
- **Batching passt bei zusammengesetzten Dingen:** Wenn ein Gegner aus vielen Parts besteht, kann ein kompakter Batch besser sein als viele einzelne Part-Meshes.
- **Dirty-Signaturen ergänzen beides:** Selbst mit Instancing kann es teuer sein, jedes Frame alle Matrizen neu zur GPU zu schreiben.
- **Projekt-Learning CHAT 11:** Draw Calls sanken stark, weil Regular Enemy Parts nicht mehr als viele einzelne Meshes liefen.
- **Projekt-Learning CHAT 12:** CPU-Zeit sank stark, weil Matrices/Farben nicht mehr unnötig jedes Frame hochgeladen wurden.
- **Wichtige Grenze:** Instancing hilft nicht gegen alles. Wenn Shader, Transparenz oder React-State das Problem sind, muss dort optimiert werden.

---

## 5. Warum VFX-Off keine echte Lösung ist

- **VFX-Off ist ein Diagnosewerkzeug:** Es zeigt, ob sichtbare Effekte an den Kosten beteiligt sind.
- **VFX-Off kann täuschen:** Wenn ein Effekt gleichzeitig Gameplay-Semantik trägt, darf er nicht einfach verschwinden.
- **Beispiel Lai-Slash:** Ein Slash kann visuell wie VFX wirken, aber für Trefferlogik wichtig sein.
- **Gute Lösung:** Visuelle Darstellung reduzieren oder verstecken, aber das Gameplay-Signal erhalten.
- **Schlechte Lösung:** Alles ausblenden und dadurch Trefferlogik oder Lesbarkeit beschädigen.
- **Projekt-Learning CHAT 7:** Lai-LMB-Slashes bleiben bei Skill-VFX-Off als versteckte Runtime-Objekte aktiv.
- **Report-Folge:** Reports müssen sichtbare und versteckte Objekte getrennt zählen, sonst wirken Messwerte falsch.

---

## 6. Warum `Effects.tsx` in diesem Projekt so gefährlich war

- **Zentrale Schaltstelle:** `Effects.tsx` bestimmt, welche Effekt-Systeme überhaupt in der Szene leben.
- **Breit gemountet bedeutet breit teuer:** Wenn mehrere Klassen-Renderer gleichzeitig leben, laufen auch mehrere `useFrame`-Systeme, Shader, transparente Layer und Queues.
- **Nicht sichtbare Arbeit zählt trotzdem:** Ein Renderer kann Kosten verursachen, auch wenn der User gerade nur eine Klasse spielt.
- **Projektfehler:** Lokale Klassen-VFX wurden zu breit gemountet.
- **Korrekte Richtung:** Nur aktive lokale Klasse mounten und Remote-Effekte über Descriptoren spiegeln.
- **Warum Descriptoren helfen:** Ein Descriptor beschreibt den Effekt billig, ohne alle lokalen Klassensysteme aktiv zu halten.
- **Übertragbares Learning:** In jedem Three.js-Spiel prüfen, ob importierte Systeme wirklich aktiv sein müssen oder nur Daten liefern sollten.

---

## 7. Warum Gegner-Rendering mehrere Hebel braucht

- **Gegner kosten nicht nur durch Anzahl:** Kosten entstehen durch Meshes, Materials, Animation, Matrix-Uploads, Farben, Transparenz, AI/Gameplay und React-State.
- **Sichtbare Liste zuerst:** Wenn unsichtbare Gegner weiter gerendert werden, ist jede weitere Optimierung weniger wert.
- **Draw Calls senken:** Viele Part-Meshes können Draw Calls erhöhen.
- **CPU-Uploads senken:** Selbst bei wenigen Draw Calls kann das ständige Schreiben von Matrizen/Farben teuer sein.
- **Dirty-Signatur nutzen:** Nur hochladen, wenn sich Position, Farbe, Phase oder Sichtbarkeit wirklich geändert hat.
- **Boss-Slots stabil halten:** IDs sind stabiler als Array-Indizes, wenn Spawns/Deletes passieren.
- **Projekt-Learning:** Die Kombination aus Part-Batching und Dirty-Signaturen brachte echte Verbesserungen, nicht nur ein optisches Abschalten.

---

## 8. Warum Voxel-Terrain speziell behandelt werden muss

- **Voxel sehen einfach aus:** Ein Würfel wirkt simpel, erzeugt aber mehrere Flächen.
- **Viele Würfel explodieren schnell:** 10.000 Würfel als volle Boxen erzeugen sehr viele Flächen, auch wenn viele Seiten nie sichtbar sind.
- **Top-Faces sparen viel:** Wenn nur die obere Fläche gebraucht wird, ist ein Top-Face deutlich günstiger.
- **Side-Skirts retten Optik:** Seitenblenden können Tiefe geben, ohne wieder volle Würfel zu rendern.
- **Chunks begrenzen Arbeit:** Große Karten werden in Abschnitte geteilt, damit nur relevante Bereiche aktiv sind.
- **Culling ist Kernstrategie:** Unsichtbare Bereiche nicht rendern.
- **Projekt-Learning:** Voxel-Regeln sind in diesem Projekt besonders wichtig, aber bei anderen Three.js-Spielen nur dann relevant, wenn sie ähnliche Tile-/Voxel-Massen haben.

---

## 9. Warum WebGPU nicht automatisch schneller ist

- **WebGPU ist ein Backend:** Es ist eine andere Render-Schnittstelle, kein Zauberschalter.
- **Architekturprobleme bleiben:** Zu viele aktive Runtimes, React-State-Churn, ungebatchte Meshes und Overdraw bleiben auch mit WebGPU problematisch.
- **PostFX kann dominieren:** Bloom, Shadow/Glow, DPR und Composer-Pfade können Backend-Deltas stärker beeinflussen als das Backend selbst.
- **Fallbacks sind möglich:** Die App kann denken, sie nutzt WebGPU, aber intern fallbacken oder nicht sauber rendern.
- **Canvas prüfen:** Leere Canvas oder `calls=0` sind Messblocker.
- **A/B sauber fahren:** Gleiche Szene, gleiche Kamera, gleiche Schalter, mehrere Läufe.
- **Projekt-Learning:** WebGPU wurde nicht durch pauschales Abschalten gut, sondern durch gezielte Shadow/Glow- und DPR-Anpassung stabiler.

---

## 10. Warum Transparenz und Overdraw oft unterschätzt werden

- **Transparente Pixel sind teuer:** Wenn viele halbtransparente Flächen übereinander liegen, werden dieselben Pixel mehrfach berechnet.
- **Glow sieht harmlos aus:** Ein einzelner Glow ist oft okay. Viele Glow-Layer, AOE-Kreise und Partikel können stark kosten.
- **DoubleSide kann doppelt kosten:** Doppelseitige transparente Materialien können mehr Renderarbeit erzeugen.
- **Sortierung kann schwierig sein:** Transparente Objekte müssen oft korrekt sortiert werden, was zusätzliche Probleme erzeugt.
- **Perzeptive Reduktion ist besser:** Weniger sekundäre Partikel, kürzere Lifetime oder kleinere Alpha-Flächen erhalten oft den Look besser als komplettes Abschalten.
- **Projektbezug:** Skills sollen lesbar bleiben. Performance darf nicht bedeuten, dass wichtige Kampfsignale verschwinden.

---

## 11. Was in der kurzen Fassung verloren gegangen war

- **Wieder ergänzt:** VFX-Guardrails mit Baseline-Regel.
- **Wieder ergänzt:** Meshy-/3D-Asset-Qualitätsgate.
- **Wieder ergänzt:** Root-Cause-Muster aus Effects-, Lai-, Enemy- und WebGPU-Fällen.
- **Wieder ergänzt:** Mehr konkrete Messwertinterpretation.
- **Wieder ergänzt:** Mehr Details zu Transparenz, PostFX, WebGPU und Terrain.
- **Wieder ergänzt:** Klare Trennung zwischen globalen Regeln und Projektregeln.
- **Neu ausgelagert:** Begriffserklärung in `THREEJS-BEGRIFFE.md`.
- **Neu ausgelagert:** Hintergrund- und Warum-Erklärungen in dieser Datei.

---

## 12. Anwendung in anderen Three.js-Projekten

- **Immer gültig:** Messen statt raten, `useFrame` billig halten, Material/Geometrie stabil halten, Instancing/Batching prüfen, Transparenz messen, WebGPU sauber validieren.
- **Nur bei ähnlichen Projekten gültig:** Voxel-Top-Faces, Side-Skirts, Lai-Slash-Semantik, `Effects.tsx`, spezielle Regular-Enemy-Messwerte und konkrete Projekt-Commands.
- **Übertragbares Muster:** Frage immer: Skaliert der Code mit sichtbarer Last oder mit installierten/importierten Systemen?
- **Wichtigste Denkregel:** Eine Architektur ist gut, wenn unsichtbare oder nicht relevante Systeme keine laufenden Kosten erzeugen.
