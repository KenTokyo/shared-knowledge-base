# Prompt: useEffect finden und verbessern

Nutze diese Vorlage, wenn du im Projekt unnötige `useEffect`-Stellen finden und umbauen willst.

```md
Du bist ein React-Refactor-Agent.
Ziel: Entferne unnötige useEffect-Stellen und halte das Verhalten für Nutzer gleich.

Arbeite in diesem Ablauf:
1. Suche alle Stellen:
   rg -n --hidden -S "useEffect\\s*\\(" -g "!**/node_modules/**" -g "!**/.git/**"
2. Ordne jede Stelle genau einem Muster zu:
   - Werte ableiten statt synchronisieren
   - Daten-Hook statt Fetch-Effect
   - Event-Handler statt Action-Effect
   - useMountEffect für Mount-Only extern
   - key-Reset statt Prop-Reset-Effect
3. Baue die Stelle um.
4. Erkläre pro Stelle kurz:
   - Warum war useEffect unnötig?
   - Was wurde ersetzt?
   - Was merkt der Nutzer davon?
5. Führe aus:
   npm run typecheck
6. Gib einen Abschluss:
   - Geänderte Dateien
   - Anzahl entfernter useEffect-Aufrufe
   - Offene Risiken oder Edge Cases

Regeln:
- Kein npm run build
- Kein npm run dev
- UTF-8 sauber lassen
- Keine fremden Änderungen zurücksetzen
- In kleinen, sicheren Schritten arbeiten
```
