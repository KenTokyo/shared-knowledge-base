# Capacitor Output Export Analyse Plan (2026-01-15)

## 1. Strategie & Ziele
- [ZIEL] Klar herausfinden, warum `output: 'export'` in `next.config.js` nicht mehr noetig ist.
- [ZIEL] Die konkreten Aenderungen benennen (Config, Build-Flow, Images) und sauber erklaeren.
- [ZIEL] Doku-Stellen finden, die das schon erklaeren oder noch unklar sind.

## 2. Proaktive F&A und Edge Cases
- [FRAGE] Was passiert, wenn `server.url` entfernt wird?  
  [ANTWORT] Dann muss wieder ein echter Static-Export in `www/` landen, sonst laedt die App leer.
- [FRAGE] Was passiert bei Offline?  
  [ANTWORT] Wenn die App auf `server.url` laedt, braucht sie Internet. Offline heisst: keine Features.
- [FRAGE] Was ist mit Next Image?  
  [ANTWORT] Ohne Image-Server braucht es `images.unoptimized` oder echte `img` Tags.
- [FRAGE] Was, wenn jemand doch `npm run static` nutzt?  
  [ANTWORT] Dann ist der Chunk-Mirror wichtig, sonst kann `next export` fehlschlagen.
- [FRAGE] Was ist die groesste Risiko-Stelle?  
  [ANTWORT] Missverstaendnis: "Capacitor = immer static". Hier ist es "Capacitor = WebView auf Hosted App".

## 3. Konkrete Beispiele
- PC: `next build` -> App laeuft auf Server, Capacitor zeigt die URL an.
- Mobile: App startet -> WebView oeffnet `https://trackmeai.de` -> alles live.
- Fallback: Kein Internet -> App bleibt leer oder zeigt Fehler.

## 4. Regeleinhaltung & Performance
- [REGEL] Erst in bestehenden Docs nachsehen, bevor neue Erklaerung geschrieben wird.
- [REGEL] Kein `npm run dev/build` als Test, nur Review der Config.
- [PERF] Keine Laufzeitkosten durch `output: 'export'` (0 ms).
- [PERF] Build-Flow bleibt bei 1 Build-Schritt + optionalem Export.

## 5. Code-Wiederverwendung pruefen
- `next.config.js` (Kommentar zu `output: 'export'` + `images.unoptimized`)
- `capacitor.config.ts` (Production `server.url`)
- `docs/deployment/deployment-analysis-2025-11-10.md` (Server Actions + Static Export)
- `docs/deployment/tasks/2025-12-16-static-export-buildfix-plan.md` (Chunk-Mirror)
- `docs/deployment/capacitor-deployment-guide.md` (Build-Flow)
- `docs/deployment/capacitor-deployment-guide-2.md` (Tutorial fuer neue Projekte)
- `scripts/export.js` (Custom Static Export Alternative)

## 6. Phasen & Komponenten (kein Code)

### Phase 1: Analyse der echten Loesung (ca. 45-60 Min)
- `next.config.js` (ca. 0 Zeilen)  
  Zweck: Warum `output` aus ist, was Images tun.
- `capacitor.config.ts` (ca. 0 Zeilen)  
  Zweck: Pruefen, ob `server.url` die WebView-Strategie erklaert.
- `scripts/export.js` (ca. 0 Zeilen)  
  Zweck: Alternativ-Export nachvollziehen.
- Ergebnis: klare Ursache-Kette in einfacher Sprache.

### Phase 2: Doku-Klarheit (ca. 30-45 Min)
- `docs/deployment/capacitor-deployment-guide.md` (ca. 20-40 Zeilen)  
  Zweck: Kurz erklaeren, wann `output: 'export'` noetig ist und wann nicht.
- `docs/deployment/capacitor-deployment-guide-2.md` (ca. 20-40 Zeilen)  
  Zweck: Tutorial fuer neue Projekte mit Hosted-Option ohne Static Export.
- `docs/mobile/features/capacitor-build-system.md` (ca. 10-20 Zeilen)  
  Zweck: Ein Satz zu Hosted-Strategie vs Static.
- Ergebnis: Keine widerspruechlichen Aussagen.

## 7. Doku & Subfeatures
- Subfeature: `features/capacitor-build-system`
- Bei Aenderung: `docs/mobile/mobile-overview.md` kurz pruefen.

---
Hinweis: Umsetzung erfolgt direkt ohne Rueckfrage.

## ✅ Fortschritt
- ✅ Phase 1: Ursache-Kette bestaetigt (Hosted URL statt Static Export).
- ✅ Phase 2: Tutorials und Build-Hinweise aktualisiert.
