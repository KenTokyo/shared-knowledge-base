---
name: react-no-use-effect
description: Use when writing, reviewing, or refactoring React/Next.js code that contains useEffect. Trigger on requests like "remove useEffect", "You Might Not Need an Effect", "fix dependency array bugs", "replace effect with event handlers", "avoid mirrored state", or "refactor effect chains". Enforce no direct useEffect in components, apply five replacement patterns, and allow only mount-only external sync through useMountEffect.
---

# React ohne direktes useEffect

Nutze diesen Skill, um unnötige `useEffect`-Stellen sicher zu entfernen.
Ziel: klarer Datenfluss, weniger Schleifen, weniger Überraschungen im Alltag.

## Grundregel

Nutze in Komponenten kein direktes `useEffect`.
Nimm stattdessen eines der 5 Muster unten.

Für seltene externe Start-Synchronisation nutze `useMountEffect`.

## Schnellstart

1. Finde Stellen mit:
   `rg -n --hidden -S "useEffect\\s*\\(" -g "!**/node_modules/**" -g "!**/.git/**"`
2. Ordne jede Stelle genau einem Muster zu.
3. Baue die Stelle in kleinen Schritten um.
4. Prüfe danach:
   `npm run typecheck`

## Die 5 Ersatzmuster

### 1) Werte ableiten statt synchronisieren

Nutze dieses Muster, wenn ein Effekt nur `setState` aus Props oder State macht.

Smell:
`useEffect(() => setX(derive(y)), [y])`

Besser:
`const x = derive(y)`

Merksatz:
Was man berechnen kann, braucht keinen extra State.

### 2) Daten mit Daten-Hook laden

Nutze Query-/Loader-Hooks statt `fetch(...).then(setState)` in Effekten.

Smell:
`useEffect(() => { fetch(...).then(setData); }, [...])`

Besser:
`const { data } = useQuery(...)`
oder ein bestehender Projekt-Hook.

Merksatz:
Daten-Hooks lösen Cache, Abbruch und Stale-Daten stabiler.

### 3) Nutzer-Aktionen in Event-Handler

Wenn die Aktion durch Klick, Submit oder Auswahl passiert, gehört sie direkt in den Handler.

Smell:
`setFlag(true)` -> Effect reagiert -> `setFlag(false)`

Besser:
`onClick={handleAction}` und `handleAction` ruft die Aktion direkt auf.

Merksatz:
User-Event gleich im Event behandeln, nicht zeitversetzt im Effekt.

### 4) Externe Start-Sync mit useMountEffect

Nur für echte externe Systeme nutzen, z. B. DOM, Browser-Events, Drittanbieter-Widget.

Beispiel:

```ts
import { useEffect } from 'react';

export function useMountEffect(effect: () => void | (() => void)) {
  useEffect(effect, []);
}
```

Merksatz:
Nur "beim Mount starten, beim Unmount aufräumen".

### 5) Reset über key statt Effect-Reset

Wenn eine Komponente bei ID-Wechsel frisch starten soll, nutze `key`.

Smell:
`useEffect(() => setLocalState(defaultValue), [id])`

Besser:
`<Profile key={userId} userId={userId} />`

Merksatz:
`key` sagt React: neue Instanz, neuer lokaler Zustand.

## Prüfliste

1. Jede alte `useEffect`-Stelle hat jetzt ein klares Muster.
2. Kein Spiegel-State bleibt übrig.
3. Nutzer-Aktionen laufen direkt im Event-Handler.
4. Datenladen läuft über Daten-Hook oder sauberen Custom Hook.
5. `npm run typecheck` läuft sauber.

## Ressourcen

- Refactor-Prompt:
  `references/no-use-effect-fix-prompt.md`
- Hintergrund:
  `shared-docs/react-useEffect/not-needed.md`
  `shared-docs/react-useEffect/skill-no-use-effect.md`
  `shared-docs/react-useEffect/useEffect-twitter-post.md`
