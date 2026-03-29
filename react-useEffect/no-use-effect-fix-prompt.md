# Prompt: useEffect-Stellen finden und beheben

Diese Vorlage ist für schnelle Nutzung im Projekt gedacht.

```md
Bitte prüfe mein React-Projekt auf unnötige useEffect-Stellen und baue sie sauber um.

Ablauf:
1. Suche alle useEffect-Aufrufe:
   rg -n --hidden -S "useEffect\\s*\\(" -g "!**/node_modules/**" -g "!**/.git/**"
2. Ordne jede Fundstelle einem Muster zu:
   - Werte ableiten statt synchronisieren
   - Daten-Hook statt Fetch-Effect
   - Event-Handler statt Action-Effect
   - useMountEffect für externe Start-Synchronisation
   - key-Reset statt Prop-Reset-Effect
3. Refactore die Stellen in kleinen Schritten.
4. Gib je Stelle kurz an:
   - Warum war useEffect hier problematisch?
   - Wie wurde es ersetzt?
   - Was bedeutet das für Nutzer?
5. Führe danach aus:
   npm run typecheck
6. Liefere eine kurze Abschlussliste:
   - Geänderte Dateien
   - Entfernte useEffect-Aufrufe
   - Offene Sonderfälle

Regeln:
- Kein npm run build
- Kein npm run dev
- UTF-8 beibehalten
- Keine fremden Änderungen zurücksetzen
```

Siehe auch:
`shared-docs/skills/react-no-use-effect/references/no-use-effect-fix-prompt.md`
