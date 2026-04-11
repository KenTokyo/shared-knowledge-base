# Next.js 16 Upgrade Plan (Stand: 13.03.2026)

## 1) Ziel
- Projekt auf **Next.js 16** und **React 19.2** bringen.
- TypeScript muss grün sein.
- Wichtige Kern-Flows sollen im Browser testbar bleiben.
- Keine Commits, alles lokal testen.

## 2) Was ist schon erledigt?
- `next` auf `16.1.6` gesetzt.
- `react` und `react-dom` auf `19.2.4` gesetzt.
- `eslint` auf `9.39.4` und `eslint-config-next` auf `16.1.6` gesetzt.
- Neue ESLint Flat Config erstellt (`eslint.config.mjs`).
- Next-16 Proxy-Umstellung umgesetzt (`middleware.ts` -> `proxy.ts`).
- Async-Request-Codemod ausgeführt (`params`, `searchParams`, `cookies` usw.).
- TypeScript-Fehler aus Redirect-Import behoben.

## 3) Bereits gefixte Next-16-Stolperstellen
- `next.config.js`:
  - veraltete `eslint` Next-Option entfernt.
  - `experimental.serverComponentsExternalPackages` auf `serverExternalPackages` umgestellt.
- `app/layout.tsx`:
  - `next/dynamic` mit `ssr: false` aus Server-Layout ausgelagert.
  - neue Client-Hülle `LearningProfileDynamicMount` angelegt.
- `db/actions/auth/oauth-signin-action.ts`:
  - Redirect-Helper auf neuen Importpfad angepasst.

## 4) Test-Status
- `npm run type-check` läuft erfolgreich.
- Playwright findet die E2E-Dateien korrekt (`.e2e.ts`).
- Neuer Smoke-Weg ist live:
  - `npm run test:e2e:smoke` -> versucht zuerst Light Panda, fallback auf Playwright.
  - `npm run test:e2e:smoke:lightpanda` -> nur Light Panda.
  - `npm run test:e2e:smoke:playwright` -> nur Playwright.
- Aktuelles Ergebnis:
  - `npm run test:e2e:smoke` -> ✅ **1 passed** (Playwright-Fallback aktiv, weil lokal keine Light-Panda-CDP-Verbindung).

## 5) Nächste Schritte
1. Light-Panda-Zugang mit Token setzen und Smoke einmal direkt gegen Light Panda grün ziehen.
2. Smoke von 1 auf 3-5 kritische Browser-Flows erweitern.
3. Danach weitere E2E-Tests schrittweise reaktivieren.
4. Optional danach: Turbopack-Migration prüfen, weil aktuell noch Webpack-Konfig genutzt wird.

## 6) Risiko-Hinweise
- Einige Bibliotheken sind funktional okay, haben aber ältere Peer-Range (React 18). Das kann Warnungen geben.
- Parallel-Arbeit im Repo ist aktiv. Deshalb nur fokussiert auf Next-16-relevante Dateien arbeiten und nichts Fremdes zurücksetzen.
