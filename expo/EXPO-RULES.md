# Expo & React Native Regeln

---
version: 1.0
updated: 2026-04-11
---

Diese Regeln gelten für **Expo/React Native Projekte** und **Monorepos mit Mobile-Apps**.

---

## 1. Validierung nach jeder Änderung

| Check | Befehl | Wann |
|-------|--------|------|
| **TypeScript** | `npx tsc --noEmit` | Nach JEDER Änderung |
| **Bundling** | `npx expo start --web` | Nach Import-Änderungen |

**Bei Monorepos:** Validierung im RICHTIGEN Verzeichnis!
```bash
# ❌ FALSCH - vom Root
npx tsc --noEmit

# ✅ RICHTIG - im App-Verzeichnis
cd apps/mobile && npx tsc --noEmit
```

---

## 2. Bundling-Check Workflow

**Nach Import/Export-Änderungen:**
1. Metro stoppen falls läuft
2. `npx expo start --web`
3. Warten auf "Web Bundling complete" oder Fehler
4. Bei Fehler → STOPP, analysieren, fixen
5. Erst bei Erfolg → Änderung abgeschlossen

---

## 3. Package-Installation (KRITISCH!)

**PFLICHT:** Bei JEDEM neuen `import ... from 'package-name'`

1. **SOFORT prüfen:** Ist `package-name` in `package.json`?
2. **Falls NEIN:** Installation VOR weiteren Änderungen

```bash
# Für Expo-Packages (IMMER expo install!):
npx expo install package-name

# Für andere Packages:
npm install package-name
```

**WARUM:**
- `npx tsc --noEmit` prüft KEINE Package-Auflösung!
- TypeScript findet ggf. Types aus anderen Workspace-Packages
- Bundler (Metro/Webpack) brauchen die echten Packages

**MERKE:** TypeScript-Check ≠ Bundling-Check. BEIDE sind bei Import-Änderungen erforderlich!

---

## 4. Expo-Package Installation

**IMMER `npx expo install` statt `npm install` für:**
- Packages mit `expo-` Prefix (z.B. `expo-image`, `expo-haptics`)
- React Native Core-Packages (`react-native-*`)
- Packages die native Module haben

**Warum:** Expo CLI installiert automatisch kompatible Versionen

```bash
# ❌ FALSCH
npm install expo-image

# ✅ RICHTIG
npx expo install expo-image
```

---

## 5. Phase-Abschluss Checklist

**BEVOR eine Phase als "abgeschlossen" markiert wird:**

- [ ] `npx tsc --noEmit` → 0 Fehler
- [ ] `npx expo start --web` → Bundling erfolgreich
- [ ] Alle neuen Imports haben Package in `package.json`
- [ ] Metro/Webpack zeigt keine "Unable to resolve" Fehler
- [ ] App startet ohne Runtime-Errors (kurzer Test)

**NIEMALS eine Phase als "abgeschlossen" markieren wenn:**
- Bundling fehlschlägt
- Packages fehlen
- Runtime-Errors auftreten

---

## 6. Bei Port-Konflikten

**Problem:** Expo sagt "Port 8081 belegt"

**Lösung:**
```bash
# Option A: Anderen Port nutzen
npx expo start --web --port 8082

# Option B: Prozess auf Port beenden
npx kill-port 8081
```

---

## 7. Bei langen Wartezeiten

**Wenn Bundling > 60s dauert:**
1. Status prüfen (nicht ewig warten)
2. Cache clearen: `npx expo start --clear`
3. Bei Endlos-Loop: Task abbrechen, User informieren

---

## 8. Bei Fehler: STOPP-Protokoll

1. **STOPP** - Keine weiteren Änderungen
2. **ANALYSIERE** - Root Cause verstehen (nicht raten!)
3. **RECHERCHIERE** - Docs/Issues wenn unklar
4. **FIXE** - Mit Verständnis der Ursache
5. **VALIDIERE** - Alle Checks erneut
6. **ERST DANN** - Weitermachen

---

## Referenzen

| Thema | Dokumentation |
|-------|---------------|
| React Native Best Practices | `shared-docs/skills/vercel-react-native-skills/REACT-NATIVE-RULES-SUMMARY.md` |
| Capacitor Performance | `shared-docs/performance/capacitor-performance-rules.md` |
