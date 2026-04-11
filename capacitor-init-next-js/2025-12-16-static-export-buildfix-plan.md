# 🚨 Static Export Build-Fix Plan (16.12.2025)

## 🚀 Strategie & Ziele
- 🔍 **Build-Fehler entschlüsseln:** Reproduziertes `MODULE_NOT_FOUND: './1682.js'` stammt aus `next build`, weil das Server-Webpack-Runtime-Skript Dateien in `.next/server/` sucht, die aber nur in `.next/server/chunks/` existieren. Wir schaffen zuerst Transparenz über den Ablauf (Chunk-Generierung, Runtime-Lookups, Next-Version 14.2.32).
- 🛠️ **Sichere Laufzeit-Korrektur etablieren:** Wir ergänzen eine Build-Erweiterung, die nach dem Emittieren der Server-Chunks automatisch die erwartete Ordnerstruktur erzeugt (z. B. Copy/Link der numerischen Chunk-Files ins Root), damit `next build` und nachfolgende `next export`/Capacitor-Schritte stabil durchlaufen.
- 📦 **Capacitor-Doku & Scripts synchronisieren:** Die Deployment-Guides erwähnen aktuell „`npm run static`“ ohne Hinweis auf Server Actions. Wir dokumentieren die neue Build-Erweiterung, damit jedes Team-Mitglied weiß, warum der Fix nötig ist und wie er funktioniert.
- ♻️ **Wartbarkeit sicherstellen:** Wir halten uns an `shared-docs/refactoring-docs/global-coding-rules.md` ↔ Fokus auf Rule **0.1** (nur `npx tsc --noEmit` als Test), Rule **5.9** (Kontextanalyse vor Code), Rule **5.10** (keine Legacy-Hacks herumliegen lassen) und Rule **5.23** (Mobile/Capacitor Workflows kompakt dokumentieren).

## ❓ Proaktive F&A & Edge Cases
1. **Was passiert, wenn Next in einer späteren Version wieder die korrekte Pfadlogik liefert?**  
   ✅ Die Copy-Logik wird feature-gated (`!dev && isServer`). Wir prüfen zusätzlich, ob die Dateien bereits existieren, bevor wir sie überschreiben, damit zukünftige Versionen ohne Anpassung funktionieren.
2. **Bricht der Fix auf Linux/macOS vs. Windows unterschiedlich?**  
   ✅ Wir verwenden ausschließlich Node-`fs.promises` ohne OS-spezifische Pfade, Normalisierung via `path.join`/`path.resolve`, damit WSL/Windows genau wie CI funktioniert.
3. **Wie stellen wir sicher, dass Capacitor weiterhin echte Server Actions nutzt?**  
   ✅ Doku ergänzt klaren Hinweis: Static Export dient **nur** dem Bereitstellen der Assets für Capacitor; Logik/Mutationen laufen weiterhin über gehostete URL im `server.url`. Keine Offline-Versprechen.
4. **Was passiert bei sehr vielen Chunks (>200 Dateien)?**  
   ✅ Copy-Prozess arbeitet stream-basiert. Wir inkludieren Logging/Nopie, damit bei ungewöhnlich großen Mengen (z. B. >1 GB) eine verständliche Warnung ausgegeben wird.
5. **Kann die Maßnahme die Build-Zeit deutlich erhöhen?**  
   ✅ Wir nutzen parallele Kopiervorgänge (`Promise.all` batched) und kopieren nur `.js`-Chunks. Auf SSDs <<1 s, selbst bei 150 Dateien.

## 📱 Konkrete Beispiele
```
🧪 Entwickler: npm run static
⚙️ Build: next build erzeugt .next/server/chunks/1682.js, erwartet aber ./1682.js
🩹 Fix: Copy-Plugin legt .next/server/1682.js als Spiegel an, bevor Next die Runtime lädt
✅ Ergebnis: npm run static (inkl. next export) läuft ohne „Cannot find module './1682.js'“
```

## ⚡ Regeleinhaltung & Performance
- **Rule 0.1** – Validierung ausschließlich über `npx tsc --noEmit`, keine schweren Build-Loops im Repo.
- **Rule 5.9** – Wir analysieren zuerst bestehende Deployment-Dokumente und Scripts, bevor wir neue Workarounds hinzufügen.
- **Rule 5.10** – Falls temporäre Fix-Skripte (z. B. `fix-enc.js`) im Weg stehen, entfernen oder konsolidieren wir sie.
- **Rule 5.23** – Dokumentation für Mobile/Capacitor bleibt kompakt und eindeutig; kein doppeltes Wissen.
- **Performance** – Copy-Mechanik blockiert nicht den Event Loop, da sie in `compiler.hooks.afterEmit.tapPromise` läuft und lediglich `<1s` benötigt.

## 🔄 Code-Wiederverwendung
- Bestehender Build-Kontext aus `docs/deployment/deployment-analysis-2025-11-10.md` & `docs/deployment/capacitor-deployment-guide.md` bleibt Grundlage; wir erweitern nur um den Fix.
- Wir prüfen, ob ähnlicher Code bereits in `scripts` existiert (z. B. Hilfsfunktionen zum Dateikopieren) bevor wir Neues schreiben.
- `next.config.js` enthält bislang keine `webpack`-Erweiterung → wir hängen uns dort kontrolliert dran statt mehrere neue Dateien zu schaffen.

## 🧩 Phasen & Komponenten

### Phase 1: 🔧 Server-Chunk Mirror & Diagnose (ca. 2–3 h)
- **next.config.js (~70 Zeilen Anpassung)**  
  - `const path = require('path')` + `const fs = require('fs/promises')`  
  - Neue Helper-Funktion `mirrorServerChunks(outputPath)` + `webpack(config, { isServer, dev })` Hook.  
  - Nur aktiv, wenn `isServer && !dev`.
- **scripts/build/chunk-mirror-log.ts (optional ~60 Zeilen)**  
  - Kleines Logging-Helferlein (CLI) zum manuellen Prüfen, ob Mirror-Dateien existieren → unterstützt Debugging/QA.
- **Edge Cases:**  
  - Verhindern, dass `.json`/`font-manifest` kopiert werden.  
  - Falls `.next/server` nicht existiert (z. B. Custom distDir), fallback + Warnung.
- **Erfolgskriterium:** Nach `next build` existiert `.next/server/<chunk>.js` → `_document.js` findet seine Module.

### Phase 2: 📚 Docs & DX-Updates (ca. 1–1,5 h)
- **docs/deployment/capacitor-deployment-guide.md (~40 Zeilen)**  
  - Abschnitt „Static Export“ ergänzen: kurzer Hinweis auf neuen Build-Fix + Klarstellung, dass Server Actions weiterhin Remote laufen.
- **docs/deployment/FINAL-DEPLOYMENT-CHECKLIST.md (~20 Zeilen)**  
  - Check „Static Export erfolgreich“ → Unterpunkt „Chunk-Mirror läuft grün (keine Module fehlen)“.
- **README/Changelog (optional)**  
  - Ein Absatz in `docs/deployment/deployment-analysis-2025-11-10.md` → „Lessons Learned: Next 14.2.x benötigt Mirror-Plugin auf Windows“.
- **Erfolgskriterium:** Jeder Guide verweist auf denselben Workaround, keine widersprüchlichen Aussagen mehr.

## 📚 Dokumentation & Follow-Up
- Nach Phase 1: kurzer „Tech Note“ Abschnitt im neuen Task-Dokument → erklärt Root Cause für zukünftige Upgrades.
- Nach Phase 2: prüfen, ob `docs/deployment/capacitor-deployment-guide-2.md` archiviert werden muss (Duplikate).
- Validierung: `npx tsc --noEmit` + optionaler `node scripts/build/chunk-mirror-log.ts` zum schnellen Smoke-Test.

---
💬 Frage an dich: Passt dieser 2-Phasen-Plan oder sollen wir zusätzliche Absicherung (z. B. automatisiertes Pre-Build-Skript) einplanen, bevor wir in den Coder-Modus wechseln?

---

## ✅ Fortschritt (16.12.2025)
- [x] **Phase 1:** `ServerChunkMirrorPlugin` in `next.config.js` eingebaut, inkl. idempotenter Copy-Logik & Logging; Diagnose-Skript `scripts/build/chunk-mirror-log.ts` ergänzt. `npx tsc --noEmit` erfolgreich.
- [x] **Phase 2:** `docs/deployment/capacitor-deployment-guide.md`, `docs/deployment/FINAL-DEPLOYMENT-CHECKLIST.md` und `docs/deployment/deployment-analysis-2025-11-10.md` mit Mirror-Hinweisen & Reminder auf Remote-Server-Actions aktualisiert.
