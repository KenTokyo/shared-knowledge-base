# Next.js Build-Modi: dev vs build vs start

> **TL;DR:** `dev` = live Kochen mit Experimentieren, `build` = Rezept perfektionieren, `start` = Gericht servieren

---

## Die Restaurant-Analogie

Stell dir vor, du arbeitest in einem Restaurant:

| Befehl | Analogie | Was passiert |
|--------|----------|--------------|
| `npm run dev` | **Probierküche** - Du kochst und probierst ständig | Hot Reload, langsamer, zeigt alle Fehler sofort |
| `npm run build` | **Rezept finalisieren** - Du schreibst alles perfekt auf | Code wird optimiert, komprimiert, geprüft |
| `npm run start` | **Restaurant öffnen** - Gäste bekommen fertiges Essen | Schnell, stabil, keine Live-Änderungen |

---

## npm run dev (Entwicklungsmodus)

**Wann:** Während du programmierst

**Was passiert:**
- *Hot Reload* - Änderungen erscheinen sofort (wie ein Koch, der ständig abschmeckt)
- *Langsamer* - Weil alles live kompiliert wird
- *Verbose Fehler* - Zeigt dir genau, wo was kaputt ist
- *Kein Caching* - Immer frisch

**In deinem Projekt:**
```bash
npm run dev        # Startet auf Port 3001
npm run dev:stable # Alternative mit Stabilitäts-Script
```

---

## npm run build (Produktions-Build)

**Wann:** Bevor du deployst oder `start` nutzt

**Was passiert:**
- *Optimierung* - Code wird verkleinert und zusammengepackt
- *Statische Seiten* - Werden vorgerendert
- *Type-Check* - TypeScript-Fehler werden geprüft
- *Dauert länger* - Aber nur einmal nötig

**In deinem Projekt:**
```bash
npm run build       # Standard-Build
npm run build:debug # Mit Debug-Infos
```

**Output:** `.next/` Ordner mit dem fertigen Build

---

## npm run start (Produktionsmodus)

**Wann:** Um die gebaute Version zu testen oder lokal zu hosten

**Was passiert:**
- *Schnell* - Alles ist voroptimiert
- *Kein Hot Reload* - Änderungen brauchen neuen Build
- *Weniger RAM* - Kein Compiler läuft
- *Realistische Performance* - So wie es auf dem Server läuft

**Voraussetzung:** `npm run build` muss vorher gelaufen sein!

```bash
npm run start       # Startet auf Port 3000 (Next.js Default)
```

---

## Beide gleichzeitig laufen lassen

### Ja, das geht!

Du brauchst nur **verschiedene Ports**. Öffne zwei Terminals:

**Terminal 1 (Entwicklung):**
```bash
npm run dev
# Läuft auf http://localhost:3001
```

**Terminal 2 (Produktion):**
```bash
npm run build && npm run start -- -p 3002
# Läuft auf http://localhost:3002
```

### Warum ist das sinnvoll?

| Szenario | Wie es hilft |
|----------|--------------|
| **Fehler-Debugging** | Dev zeigt Fehler, Start zeigt ob Build funktioniert |
| **Performance-Vergleich** | Dev ist langsam, Start zeigt echte Speed |
| **Regressions-Test** | Ändern in Dev, vergleichen mit stabilem Start |

### Port-Übersicht für NoteDrill

| Script | Port | Zweck |
|--------|------|-------|
| `npm run dev` | 3001 | Entwicklung (Standard) |
| `npm run start` | 3000 | Produktion (Standard) |
| `npm run start -- -p 3002` | 3002 | Produktion (alternativ) |

---

## Typischer Workflow

```
┌─────────────────────────────────────────────────────┐
│  1. npm run dev                                     │
│     └─> Code ändern, testen, Hot Reload genießen   │
│                                                     │
│  2. npm run build                                   │
│     └─> Wenn fertig: Prüft auf Fehler & optimiert  │
│                                                     │
│  3. npm run start                                   │
│     └─> Testen wie es auf echtem Server läuft      │
│                                                     │
│  4. Deploy (Coolify/Vercel)                         │
│     └─> Ruft automatisch build + start auf         │
└─────────────────────────────────────────────────────┘
```

---

## Häufige Fragen

### "Warum ist dev so langsam?"
Dev kompiliert *on-demand*. Jede Seite wird erst kompiliert, wenn du sie aufrufst. Das ist praktisch für große Apps (nicht alles bauen), aber langsam beim ersten Laden.

### "Warum startet start nicht ohne build?"
Start braucht die optimierten Dateien aus `.next/`. Ohne Build existieren die nicht.

### "Kann ich build und dev gleichzeitig?"
Technisch ja, aber nicht sinnvoll. Build erstellt einen Snapshot, Dev ändert ständig. Die würden sich in die Quere kommen.

### "Was ist der Unterschied für Electron?"
Electron (`npm run electron:dev`) verbindet sich zu `localhost:3001`. Du brauchst also `npm run dev` parallel laufen.

---

## Schnellreferenz

| Was willst du? | Befehl |
|----------------|--------|
| Entwickeln mit Hot Reload | `npm run dev` |
| Produktions-Build erstellen | `npm run build` |
| Produktions-Build testen | `npm run start` |
| Beides gleichzeitig | Terminal 1: `npm run dev`, Terminal 2: `npm run build && npm run start -- -p 3002` |
| Mit Electron entwickeln | Terminal 1: `npm run dev`, Terminal 2: `npm run electron:dev` |

---

*Erstellt: 2026-04-14*
