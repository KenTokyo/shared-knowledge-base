# TypeScript und statische Checks — On-demand-Vertrag

**Lesen bei:** TypeScript-Code, Checkskripten, Compilerwechsel oder Diagnose eines roten Checks.  
**Nicht laden bei:** reiner Prompt-/Markdown-/Regelarbeit.

## Rollen der Checks

- Typecheck und Lint beweisen Code-/Textkonsistenz, nicht Gameplay, Pixelqualität, Sound oder Performance.
- Bei reinen Doku-/Prompt-/Regeländerungen keinen Typecheck starten.
- Bei Codeänderungen den projektlokalen Scope proportional absichern.
- Keine Tests oder Testkonfiguration neu anlegen beziehungsweise ändern, sofern der User das nicht
  ausdrücklich beauftragt.
- Einen gefundenen Fehler im bearbeiteten Scope direkt beheben. Fremde Fehler nur additiv anfassen, wenn sie
  den beauftragten Check blockieren.

## Kanonische Befehle

```bash
pnpm type-check
pnpm type-check:low-cpu
pnpm type-check:legacy
```

`lint` bleibt eine eigene Rolle. Ein echter Linter darf nicht durch einen Typecheck ersetzt werden.
Projektlokale `AGENTS.md` und `package.json` sind für Alias, Scope und Wrapper maßgeblich.

## TypeScript 7 Native und Legacy

- Native TypeScript unter eindeutigem Alias pinnen, klassisches `typescript` behalten, wenn Werkzeuge seine
  Compiler-API nutzen.
- Wegen kollidierender `tsc`-Bins nie einen unqualifizierten `pnpm exec tsc`, `npx tsc` oder bloßen
  `tsc`-Scriptwert verwenden.
- Direkte Standardpfade:
  `node node_modules/@typescript/native/bin/tsc` und
  `node node_modules/typescript/bin/tsc`.
- Native und Legacy nutzen getrennte `tsbuildinfo`-Dateien.
- Vor Compilervergleich `strict`, `noUncheckedSideEffectImports`, `module`, `moduleResolution`, `noEmit` und
  `incremental` ausdrücklich pinnen. Diagnosen verstehen und beheben, nicht Konfiguration pauschal lockern.

## CPU- und Ergebnisvertrag

- Typechecks nacheinander ausführen; keine parallelen Compilerläufe.
- Low-CPU nutzt beim nativen Compiler typischerweise `--checkers 2` oder einen projektlokalen Wrapper mit
  niedriger Priorität.
- Watch nur nach ausdrücklichem Nutzerstart sichtbar ausführen; keinen unsichtbaren Dauerprozess starten.
- Nach Scriptumstellung alle drei Wege echt ausführen und Compiler-Version, Laufzeit, Exitcode und Zahl der
  `error TS`-Diagnosen dokumentieren.
- Erfolg verlangt beendeten Lauf, Exitcode 0 und null TypeScript-Diagnosen. Leere Ausgabe bei Signalabbruch
  oder nichtnull Exitcode ist `unklar`, nie grün.
- UTF-16LE-PowerShell-Logs über BOM erkennen oder im Wrapper direkt als UTF-8 schreiben.
- Projekt-Scope nicht nur für Tempo über `include`/`exclude` verkleinern.
