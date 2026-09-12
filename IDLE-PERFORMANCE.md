# Leerlauf-CPU schnell prüfen — Chrome und Electron

Lesen bei hoher CPU ohne Interaktion oder Änderungen an Animationen, Ladeanzeigen, Polling und Bildschleifen. Die verbindlichen Grundregeln stehen in [CODING-RULES.md](CODING-RULES.md); vorhandene Laufzeitfreigaben und Prüfbudgets gelten weiter.

## Vor dem Einbau

- Dekoration und verzögert geladene Bildplatzhalter bleiben statisch. Kein Endlos-Schimmer, Pulsieren oder Drehen nur deshalb, weil etwas gemountet ist oder `loading` meldet.
- Kurze Eintritts-/Hover-/Klickreaktionen dürfen enden. Wiederkehrende Arbeit braucht einen aktiven Zweck, einen klaren Besitzer und einen Stop-/Cleanup-Pfad. Sichtbare Fortschrittsanzeige nur für tatsächlich laufende Arbeit, bei deren Ende stoppen.
- Versteckte Tabs, geschlossene Panels und außerhalb des Scrollbereichs liegende Vorschauen dürfen keine dekorative Arbeit antreiben. CSS, Web Animations, `requestAnimationFrame`, Timer, Observer, Video und Canvas berücksichtigen. Kein zusätzlicher Dauer-Timer nur zum Erkennen von Inaktivität.
- Aktive Spiele, Medien und erforderliche Hintergrundaufgaben behalten ihre Funktion. Bei Spielen getrennt prüfen: laufende Runde, Pause/Menü und verstecktes Fenster. Pausierte Simulation und Darstellung sind unterschiedliche Dinge; notwendige Vorschauen bedarfsgerecht aktualisieren.
- GPU-Beschleunigung, `transform`, `opacity`, `will-change`, Reduced Motion oder Electron-`backgroundThrottling` sind kein Nachweis günstiger Leerlaufkosten. Kein globales Abschalten sämtlicher Effekte als dauerhafter Fix.

## In wenigen Minuten zur Ursache

1. **Den Prozess zuordnen.** App, Route, betroffenen Renderer-PID, Version, Fensterzustand und CPU-Skala festhalten. Nach dem Laden zunächst beruhigen lassen. CPU über 30–60 Sekunden beobachten, ohne zu scrollen oder zu tippen.
2. **DevTools öffnen.** Chrome: auf macOS `⌘⌥I`, auf Windows/Linux `F12` oder `Strg+Umschalt+I`. Electron: vorhandenes Menü für Entwicklerwerkzeuge verwenden; im Entwicklungscode öffnet `win.webContents.openDevTools()` die Werkzeuge genau dieses Renderers. Bei mehreren Fenstern/WebViews den richtigen Inhalt wählen. In NoteTree zeigt die Console `location.href`, ob die lokale oder veröffentlichte App geladen ist.
3. **Laufende Arbeit sichtbar machen.** Im DevTools-Befehlsmenü (`⌘⇧P` / `Strg+Umschalt+P`) `Show Performance monitor` wählen. CPU, Layouts und Stil-Neuberechnungen im ruhenden Zustand beobachten. Für die Ursache im **Performance**-Panel 10–15 Sekunden Leerlauf aufnehmen: wiederkehrende JavaScript-Aufrufe, Timer, Animation Frames, Layout, Paint und Composite einordnen. **Network** ergänzt die Suche nach Polling, zeigt aber keine vollständige Erklärung für CSS-/Renderkosten.
4. **Animationen prüfen.** `Show Animations` öffnen, laufende Gruppen und endlose Wiederholungen ansehen. Das Panel erfasst CSS-/Web-Animationen, keine beliebigen JavaScript-`requestAnimationFrame`-Schleifen. Alternativ liefert die folgende Console-Abfrage Namen und Elemente endloser Animationen.
5. **Eine Hypothese kontrollieren.** Nur die verdächtige Gruppe pausieren, dieselbe CPU-Messung wiederholen, dann diese Gruppe wieder starten. Fällt die Last beim Pausieren und steigt beim Wiederherstellen, ist das ein belastbarer Hinweis auf genau diesen Pfad. Mehrere Gruppen einzeln untersuchen; Kontext und Funktion erhalten.
6. **Die echte Reparatur prüfen.** Im verantwortlichen Quellcode beheben, passende vorhandene Checks ausführen, normale Auslieferung abwarten und neu laden. Geladene JS-/CSS-Fassung verifizieren. Danach DevTools schließen und vergleichbare warme Messfenster im Vordergrund und verborgen erfassen. Nach erneuter normaler Interaktion wieder zur Ruhe kommen lassen.

Quellen: [Chrome Performance monitor](https://developer.chrome.com/docs/devtools/performance-monitor), [Chrome Animations](https://developer.chrome.com/docs/devtools/css/animations), [Electron Renderer-Debugging](https://www.electronjs.org/docs/latest/tutorial/application-debugging).

## Kleine Console-Inventur

Nur im bestätigten DevTools-Console-Prompt eingeben. Bei nativer Automation erst den Fokus und anschließend den vollständigen Text prüfen; nie blind in eine App mit Chat-Eingabe tippen und Return drücken.

```js
console.table(document.getAnimations()
  .filter(a => a.effect?.getTiming().iterations === Infinity)
  .map(a => {
    const target = a.effect?.target;
    const rect = target instanceof Element ? target.getBoundingClientRect() : null;
    return {
      name: a.animationName || a.id || a.constructor.name,
      state: a.playState,
      element: target,
      top: rect ? Math.round(rect.top) : null,
      intersectsViewport: rect ? rect.bottom > 0 && rect.top < innerHeight
        && rect.right > 0 && rect.left < innerWidth : null,
    };
  }));
```

Ein positiver Rechteck-Test beweist keine tatsächliche Sichtbarkeit: verdeckte Elemente und Pseudoelemente gesondert prüfen. Iframes haben eigene Dokumente. Ein leeres Ergebnis schließt Timer, Canvas, Videos und JavaScript-Schleifen nicht aus.

Temporärer A/B-Test nach Auswahl des **wirklich beobachteten** Animationsnamens:

```js
window.__idleProbe = document.getAnimations().filter(a =>
  a.animationName === 'HIER_DEN_BEOBACHTETEN_NAMEN_EINTRAGEN'
  && a.playState === 'running');
window.__idleProbe.forEach(a => a.pause());
```

Nach dem Messfenster denselben Zustand wiederherstellen:

```js
window.__idleProbe.forEach(a => {
  if (a.effect?.target?.isConnected) a.play();
});
delete window.__idleProbe;
```

Diese Diagnose ist kein Produktfix. Nicht pauschal alle Animationen stoppen oder Bild-Lazy-Loading entfernen. Eine einzelne sinnvolle Fortschrittsanzeige kann günstiger sein als viele dauerhaft animierte Platzhalter.

## Maßstab und Abnahme

- Gesamtmaschinen-CPU und CPU eines einzelnen Kerns unterscheiden. Bei 15 logischen CPUs entsprechen 45% eines Kerns ungefähr 3% Gesamtkapazität; Werkzeuge können andere Bezugsgrößen zeigen. Nur gleiche Skalen vergleichen.
- PID, Version/Artefakt, Sichtbarkeit, Ansicht, Aufwärmzeit, Messdauer, Mittelwert/Spitzen und DevTools-Zustand notieren. `0,0%` ist eine gerundete Anzeige, kein Beweis für mathematisch null Arbeit.
- Ein Ziel wie `<2% Gesamt-CPU` ist eine Obergrenze für den vereinbarten Zustand, kein gewünschter Grundverbrauch. Messungen anderer Geräte/Seiten nicht als eigene Abnahme ausgeben.
- Nach einem Deploy genügt ein aktuelles Manifest nicht: eine unverändert benannte CSS-Datei mit `immutable`-Caching kann noch die alte Animation enthalten. Versionskennungen aus dem tatsächlichen Dateiinhalt ableiten; ein unveränderter Upstream-Commit erfasst lokale Patches nicht.
- Statische Suche (`infinite`, `repeat: Infinity`, `animate-spin`, `animate-pulse`, `setInterval`, `requestAnimationFrame`) findet Kandidaten. Erst den Besitzer und dessen Aktivitäts-/Stopbedingungen lesen; ein Treffer allein beweist keinen Fehler oder gemessenen CPU-Gewinn.

## Beleg: NoteTree, 12.09.2026

Fünf außerhalb des Sichtbereichs wartende Bildvorschauen betrieben zehn Endlosschleifen: jeweils Schimmer und Spinner. Beim gezielten Pausieren sank der Renderer im kontrollierten Diagnosefenster von durchschnittlich 49,38% eines Kerns auf 0,75%; bei 15 logischen CPUs sind das 3,29% auf 0,05% Gesamtkapazität. Wiederherstellen reproduzierte die Last. Beide Diagnosefenster hatten DevTools offen; die dauerhafte Abnahme ist davon getrennt zu dokumentieren. Reparatur: statische Platzhalter bei erhaltenem Lazy Loading sowie inhaltsgebundene Stylesheet-Versionierung.
