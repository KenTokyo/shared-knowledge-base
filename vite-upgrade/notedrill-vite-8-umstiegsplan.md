# Vite 8 Umstiegsplan fuer Notedrill

Stand: 13.03.2026

## 1) Was wir heute wirklich haben

- Hauptprojekt (`notedrill-backend-nextjs`): Next.js 14, grosses App-Router-Projekt, viele API-Routen.
- Unterprojekt (`notedrill-web`): Next.js 15, kleines Web-Projekt.
- Paketmanager: npm (nicht "MPM").
- Direktes Vite im Hauptprojekt: nein.
- Indirektes Vite: ja, ueber Vitest/Abhaengigkeiten aktuell auf Vite 5.

Messwerte aus dem Ist-Check:
- Hauptprojekt: `50` API-Routen, `46` Seiten, `202` Treffer mit `next/`-Imports.
- Unterprojekt: `1` Seite, `0` API-Routen.

Wichtig:
- Die Datei `vite-migration.md` beschreibt den Weg **von Vite 7 auf Vite 8**.
- Sie hilft nur, wenn ein Projekt schon Vite nutzt.
- Fuer eure beiden Next.js-Projekte ist das **kein 1-Klick-Upgrade**.

## 2) Klare Entscheidung fuer schnelle Build-Zeiten

### Empfehlung A (sicherster schneller Weg)
Next.js-Projekte auf Next.js 16 bringen und Turbopack nutzen.

Warum:
- Deutlich schneller bei Build und Fast Refresh laut Next.js 16.
- Viel weniger Risiko als kompletter Framework-Wechsel.
- Eure Next-spezifischen Funktionen bleiben erhalten (Routing, Server-Seiten, API-Routen).

### Empfehlung B (Vite 8 als Pilot)
Nur das kleine `notedrill-web` als Pilot nach Vite 8 migrieren, falls es als SPA okay ist.

Warum:
- Kleiner Umfang, wenig Risiko.
- Gute Lernphase fuer euch.
- Danach koennen wir entscheiden, ob groessere Projekte folgen.

### Empfehlung C (grosses Hauptprojekt komplett auf Vite)
Nur machen, wenn ihr bewusst von Next.js weg wollt.

Warum:
- Sehr grosser Umbau.
- API-Routen, Auth, SSR-Teile und Next-Komponenten muessen ersetzt werden.
- Hoher Zeitaufwand und hoeheres Fehler-Risiko.

## 3) Konkreter Fahrplan

## Phase 0 - Audit fuer alle Projekte (1 Tag)

Ziel:
- Jedes Projekt als "Vite schon da", "Next.js", oder "anderes Setup" markieren.

Check je Projekt:
1. Gibt es `vite.config.*`?
2. Welche Scripts stehen in `package.json` (`next dev`, `vite`, etc.)?
3. Gibt es viele Next-Abhaengigkeiten (`next/`, `app/api`, `next/image`, `next/auth`)?
4. Wie gross ist das Projekt (Datei-Anzahl grob)?

Ergebnis:
- Ampel je Projekt:
  - Gruen: direkt auf Vite 8 upgradebar.
  - Gelb: zuerst kleinere Umbauten.
  - Rot: besser bei Next bleiben oder spaeter migrieren.

## Phase 1 - Sofort schneller werden (2-4 Tage)

Ziel:
- Schneller bauen ohne Voll-Migration.

Schritte:
1. Hauptprojekt von Next 14 auf Next 16 anheben.
2. Unterprojekt von Next 15 auf Next 16 anheben.
3. TypeScript-Pruefung und Test-Pruefung laufen lassen.
4. Build-Zeit vorher/nachher messen.

Hinweis:
- Das ist der schnellste Weg zu Performance-Gewinn mit kleinem Risiko.

## Phase 2 - Vite 8 Pilot mit kleinem Projekt (2-5 Tage)

Projekt:
- `notedrill-web` (weil klein und ohne API-Ordner).

Schritte:
1. Neues Vite-React-TypeScript Grundprojekt anlegen.
2. `app/page.tsx` Inhalte in React-Komponenten uebernehmen.
3. `app/layout.tsx` in normale App-Struktur ueberfuehren.
4. CSS und Assets pruefen.
5. Routing (nur falls noetig) mit React Router nachziehen.
6. Vergleichen: Startzeit, Build-Zeit, Bundle-Groesse.

Abbruch-Kriterium:
- Wenn wichtige Next-Funktionen fehlen oder Aufwand zu hoch wird, Pilot stoppen und bei Next bleiben.

## Phase 3 - Entscheidung fuer Hauptprojekt (1 Tag)

Nach dem Pilot:
1. Zahlen vergleichen.
2. Nutzen vs. Aufwand ehrlich bewerten.
3. Entscheidung:
   - Bei Next bleiben + weiter optimieren
   - oder mehr Projekte schrittweise auf Vite umstellen

## 4) Technische Leitplanken (wichtig)

- Vite 8 braucht Node.js 20.19+ oder 22.12+ (euer lokales Node 22.18.0 passt).
- Die v7->v8 Migrationsseite gilt nur fuer bestehende Vite-Projekte.
- Bei Vite 8 wurden intern Rolldown/Oxc umgestellt. Plugins muessen dazu passen.

## 5) Praktische Reihenfolge fuer euch

1. Erst Next 16 Upgrade in beiden Projekten (schneller Erfolg).
2. Danach Vite-8-Pilot fuer `notedrill-web`.
3. Hauptprojekt erst dann anfassen, wenn der Pilot klaren Vorteil zeigt.

## 6) Kurz-Woerterbuch

- SPA (Single Page Application): Eine Web-App, die als eine Seite laedt und dann alles im Browser wechselt.
- SSR (Server Side Rendering): Der Server baut die Seite vor, damit sie schneller sichtbar ist.
- Bundler: Werkzeug, das viele Dateien zu einem lauffaehigen Paket zusammenbaut.
