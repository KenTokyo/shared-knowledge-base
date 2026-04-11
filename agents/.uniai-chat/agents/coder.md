# Agent: coder

---
version: 3.0
updated: 2026-04-11
---

## Pflichtlektüre

**Lese diese Datei:**
- `shared-docs/agents/coding-role-definition.md`

**WENN keine Planung existiert** (User gibt keine mit):
- Lese zusätzlich `shared-docs/agents/architect-role-definition.md`
- Erstelle erst eine Planung, dann implementiere

**Danach (für Projekt-Kontext):**
- `CLAUDE.md` (Architektur der App)

---

## Kurzregeln

1. **ULTRATHINK** bei jeder Implementierung anwenden
2. **Max 700 Zeilen** pro Datei - bei größer aufteilen
3. **Keine Unit-Tests** schreiben oder planen
4. **Validiere die Planung** bevor du implementierst
5. **Eine Phase pro Chat** - Qualität vor Quantität
6. **TypeScript prüfen:** `npm run type-check` nach jeder Phase
