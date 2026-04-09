# Next.js HMR Throttle Skill

> Dieses Snippet drosselt Hot Module Replacement (HMR) in Next.js Projekten, damit bei Agentic Coding nicht jede Sekunde ein Rebuild getriggert wird. Einfach in jedes Next.js Projekt einfuegen.

---

## Problem

Next.js hat einen `aggregateTimeout` von nur **5ms** (Default). Bei Agentic Coding aendern sich Dateien jede Sekunde, was zu permanenten Rebuilds, hoher CPU-Last und FPS-Einbruechen fuehrt. HMR kann in Next.js **nicht komplett deaktiviert** werden (Vercel bietet keine Option dafuer).

## Loesung: Debounce + Ignore

Webpack `watchOptions.aggregateTimeout` fungiert als Debounce: Nach der ersten Dateiänderung wartet Webpack X Millisekunden und sammelt alle weiteren Aenderungen in diesem Fenster. Erst danach wird **ein einziger** Rebuild ausgefuehrt.

---

## Code-Snippet (Copy-Paste ready)

### next.config.js (CommonJS)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- HMR Throttle: Pages laenger im Memory halten ---
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,   // 60s statt 25s Default
    pagesBufferLength: 5,        // 5 Pages statt 2 Default
  },
  webpack: (config, { dev }) => {
    // --- HMR Debounce: Rebuilds buendeln ---
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 10_000, // 10s Debounce (Default: 5ms!)
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '**/docs/**',
          '**/shared-docs/**',
          '**/*.md',
        ],
      };
    }

    return config;
  },
};

module.exports = nextConfig;
```

### next.config.ts (TypeScript / ESM)

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 10_000,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '**/docs/**',
          '**/shared-docs/**',
          '**/*.md',
        ],
      };
    }

    return config;
  },
};

export default nextConfig;
```

---

## Integration in bestehende next.config

Falls bereits ein `webpack`-Block existiert, einfach den `watchOptions`-Block am Anfang der Funktion einfuegen:

```javascript
webpack: (config, { isServer, dev }) => {
  // ✅ HMR Throttle einfuegen (am Anfang der Funktion)
  if (dev) {
    config.watchOptions = {
      ...config.watchOptions,
      aggregateTimeout: 10_000,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        '**/docs/**',
        '**/shared-docs/**',
        '**/*.md',
      ],
    };
  }

  // ... bestehende webpack config ...
  return config;
},
```

Und `onDemandEntries` als Top-Level Property neben `webpack` hinzufuegen:

```javascript
onDemandEntries: {
  maxInactiveAge: 60 * 1000,
  pagesBufferLength: 5,
},
```

---

## Parameter-Referenz

| Parameter | Default (Next.js) | Empfohlen | Beschreibung |
|-----------|-------------------|-----------|-------------|
| `aggregateTimeout` | 5ms | **10_000** (10s) | Wartezeit nach erster Aenderung bevor Rebuild startet |
| `ignored` | `['**/node_modules/**']` | + docs, .md, .git | Dateien/Ordner die keinen Rebuild triggern |
| `maxInactiveAge` | 25_000 (25s) | **60_000** (60s) | Wie lange compiled Pages im Memory bleiben |
| `pagesBufferLength` | 2 | **5** | Anzahl gleichzeitig gecachter Pages |

### Tuning-Tipps

- **Mehr Debounce noetig?** `aggregateTimeout: 15_000` oder `20_000`
- **Schnelleres Feedback gewuenscht?** `aggregateTimeout: 5_000` (5s)
- **Bestimmte Ordner ignorieren?** Zum `ignored` Array hinzufuegen, z.B. `'**/History/**'`, `'**/backups/**'`
- **Polling statt Filesystem-Events?** Bei WSL/Docker/VM: `poll: 5000` (alle 5s pruefen)

---

## Effekt

| Szenario | Ohne Throttle | Mit Throttle (10s) |
|----------|--------------|-------------------|
| Agent aendert 20 Dateien in 10s | 20 Rebuilds | **1 Rebuild** |
| Agent aendert 5 Dateien in 3s | 5 Rebuilds | **1 Rebuild** (nach 10s) |
| Manuelles Speichern einer Datei | 1 Rebuild (sofort) | 1 Rebuild (nach 10s Delay) |

> **Hinweis:** Beim manuellen Entwickeln kann der 10s Delay stoerend sein. In dem Fall `aggregateTimeout` auf 2000-3000 reduzieren oder waehrend Agentic-Sessions temporaer hochsetzen.

---

## Nutzung dieses Skills

Schicke dieses Dokument an den AI-Agenten mit der Nachricht:

> "Bitte konfiguriere HMR Throttling in diesem Projekt gemaess dem HMR-Throttle-Skill."

Der Agent weiss dann:
1. Dass HMR nicht komplett deaktivierbar ist
2. Welche webpack watchOptions zu setzen sind
3. Wie die Integration in bestehende next.config funktioniert
4. Welche Parameter angepasst werden koennen
