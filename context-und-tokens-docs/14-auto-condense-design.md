# 14 - Auto-Condense-Design

**Status:** Recherche abgeschlossen und inhaltlich überarbeitet
**Datum:** 2026-04-29
**Sprachebene:** einfache, präzise Projektsprache

## Leitfrage
Wie designen wir Auto-Condense so, dass es zuverlässig auslöst und verwertbare Übergaben erzeugt?

## Kurzantwort in einfacher Sprache
- Triggerzustand ist ein Kernbegriff, weil er die reale Last im Modellfenster beeinflusst.
- Idempotenz muss sauber getrennt werden, damit Werte zwischen Providern vergleichbar bleiben.
- Cooldown ist hilfreich, darf aber nie still als exakter Wahrheitswert dargestellt werden.
- Pflichtfelder sollte als Risikoindikator im UI sichtbar sein, sobald das Budget knapp wird.
- Sessionwechsel braucht eine einheitliche Benennung in Code, Doku und Telemetrie.
- Transparenz entscheidet, ob Auto-Condense stabil auslöst oder zu spät reagiert.

## Kernbefunde aus Quellen und Repositories
- Provider-Usage bleibt die Primärquelle; lokale Schätzung ist nur Fallback.
- Kontext und Tokenzahlen dürfen nie aus reiner Zeichenzahl abgeleitet und als exakt angezeigt werden.
- Schwellwerte funktionieren nur modellabhängig zuverlässig, nicht als globaler Fixwert.
- Compaction/Handoff muss strukturierte Pflichtfelder statt Fließtext verwenden.
- Idempotenz und Cooldown verhindern Doppeltrigger bei hoher Ereignislast.
- Preflight-Werte müssen gegen Live-Usage auf Drift geprüft werden.
- Modellwechsel erfordert eine sofortige Revalidierung aller Prozentwerte.
- Unbekannte Fenstergrößen sind normal und müssen explizit angezeigt werden.
- Retry- und Resume-Pfade sind kritische Teile der Architektur.
- Monitoring braucht eigene Kennzahlen für Unknown-Rate, Drift und Trigger-Erfolg.
- Die Themen 'Auto-Condense-Design' und 'Triggerzustand' sind direkt mit den bestehenden Codepfaden verknüpft.
- Alle Entscheidungen sollen mit messbaren Abnahmekriterien hinterlegt werden.

## Konkrete Übertragung auf NoteDrill
- Trigger-State-Maschine bauen.
- Condense-Pflichtprompt nutzen.
- Status im UI sichtbar machen.
- Bei jeder Anzeige muss 'tokenCountSource' zusammen mit 'tokenCountAccuracy' sichtbar sein.
- Der CTX-Status soll bei unbekanntem Fenster einen erklärenden Fallbacktext statt Prozentbalken nutzen.
- Die Service-Schicht soll Route-Entscheidungen maschinenlesbar mitloggen.
- Session-Wechsel sollen atomar mit 'previousSessionId' verknüpft werden.
- Condense-Ausgaben müssen offene To-dos und nächste Phase explizit enthalten.
- Bei hoher Drift soll ein Warnhinweis erzeugt werden, bevor harte Limits greifen.
- Bestehende Komponenten werden erweitert, nicht durch parallele Doppelstrukturen ersetzt.

## Übertragung aus UniAI-Mustern
- UniAI trennt Kontextfenster-Logik und Limit-Management in eigene Module.
- UniAI nutzt Guard-Muster gegen parallele Limit-Resets.
- UniAI kapselt Providersemantik in dedizierten Usage-Adaptern.
- UniAI behandelt Delta- und Total-Semantik explizit statt implizit.
- Für NoteDrill ist die Reihenfolge 'messen -> entscheiden -> übergeben' direkt übertragbar.
- Continuation-Zustände werden in UniAI strukturiert, nicht als ungebundener Freitext geführt.
- Das Thema 'Auto-Condense-Design' profitiert in NoteDrill von derselben Trennung zwischen Datenvertrag und UI.
- Die Referenz in 'context-window.ts' und 'limit-management.ts' liefert klare Blaupausen für robuste Guards.

## Vorgeschlagene Umsetzungsschritte
1. Datenvertrag für 'Auto-Condense-Design' mit Versionsfeld finalisieren.
1. Bestehende Services um fehlende Felder ergänzen statt neue Parallelpfade aufzubauen.
1. Provideradapter zentralisieren und mit klarer Semantik dokumentieren.
1. UI um eindeutige Quellen-/Genauigkeitslabels erweitern.
1. Guard-Mechanik (Idempotenz und Cooldown) zentral implementieren.
1. Events für Snapshot, Condense und Sessionwechsel standardisieren.
1. Testfälle für Normal-, Grenz- und Fehlerfall ergänzen.
1. Feature-Flag für kontrollierten Rollout vorbereiten.
1. Canary-Phase mit festen Metrikchecks durchführen.
1. Nachschärfung anhand echter Laufzeitdaten dokumentieren.

## Edge-Cases, die abgesichert werden müssen
- Provider liefert Usage verspätet oder gar nicht.
- Modellwechsel findet während einer laufenden Antwort statt.
- Ein einzelner großer Prompt überschreitet das Restbudget abrupt.
- Mehrere Agentenläufe triggern denselben Condense-Prozess parallel.
- Abbruch stoppt den Stream, aber nicht alle Hintergrundaufgaben.
- Neue Session startet ohne vollständige Übergabedaten.
- Ein Legacy-Snapshot enthält veraltete Feldsemantik.
- Retry verursacht unbeabsichtigte Doppelausführung.
- UI zeigt alte Prozentwerte nach Sessionwechsel.
- Alarmregeln sind zu unpräzise und erzeugen Fehlalarme.

## Messbare Akzeptanzkriterien
- Genauigkeitslabel ist in 100 Prozent der Fälle vorhanden.
- Unknown-Zustände werden verständlich und ohne Scheinpräzision angezeigt.
- Drift zwischen Preflight und Live-Usage bleibt im definierten Zielkorridor.
- Auto-Condense-Trigger erreicht hohe Erfolgsquote ohne Doppeltrigger.
- Handoff enthält immer Phase, offene To-dos und Hauptdateien.
- Session-Wechsel ist im Log vollständig nachvollziehbar.
- Fehlerszenarien erzeugen konsistente Reason-Codes.
- Support kann jeden Vorfall über Run-ID rekonstruieren.
- Dokumentation und Laufzeitverhalten bleiben synchron.
- Die Lösung bleibt unter realer Last stabil.

## Prüffragen für Review
- Ist die Leitfrage fachlich klar beantwortet?
- Sind alle Zählwerte mit Quelle und Genauigkeit markiert?
- Wird Schätzung klar von Providerwahrheit getrennt?
- Sind Guard- und Fehlerpfade explizit beschrieben?
- Sind mindestens drei konkrete Codepfade benannt?
- Sind Providerunterschiede korrekt normalisiert?
- Gibt es messbare Kriterien für Betrieb und Rollout?
- Sind die wichtigsten Edge-Cases abgedeckt?
- Ist der nächste Umsetzungsschritt direkt ableitbar?
- Ist die Sprache verständlich für neue Teammitglieder?

## Relevante interne Codepfade
- lib/agentic/tokens/token-counting-service.ts
- components/agentic/EmbeddedChatContextControl.tsx
- components/agentic/EmbeddedChatView.tsx
- lib/agentic/limits/chat-context-condenser.ts
- components/agentic/hooks/useOrchestratorLifecycle.ts
- app/notes/components/(rightSidebar)/NotesRightSidebar.tsx
- components/notes/autoprocess/GlobalKiProcessHUD.tsx

## Relevante UniAI-Referenzen
- D:/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/providers/chat/conversations/context-window.ts
- D:/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/providers/chat/conversations/limit-management.ts
- D:/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/providers/chat/provider-events/usage-adapters/claude-usage-adapter.ts
- D:/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/providers/chat/provider-events/usage-adapters/gemini-usage-adapter.ts
- D:/CODING/React Projects/uniai-chat/uniai-chat-vscode-extension/src/providers/chat/provider-events/usage-adapters/codex-usage-adapter.ts

## Quellen (Primärquellen und Original-Repositories)
1. https://platform.openai.com/docs/api-reference/responses
2. https://developers.openai.com/api/docs/guides/prompt-caching
3. https://developers.openai.com/codex/cli/slash-commands
4. https://developers.openai.com/codex/config-reference
5. https://developers.openai.com/cookbook/examples/prompt_caching101
6. https://docs.anthropic.com/en/docs/build-with-claude/token-counting
7. https://docs.anthropic.com/en/docs/build-with-claude/context-windows
8. https://docs.anthropic.com/en/api/messages
9. https://ai.google.dev/api/tokens
10. https://ai.google.dev/gemini-api/docs/caching
11. https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-reference/count-tokens
12. https://openrouter.ai/docs/guides/overview/models
13. https://openrouter.ai/docs/api-reference/overview
14. https://openrouter.ai/docs/features/prompt-caching
15. https://github.com/openai/tiktoken
16. https://github.com/niieani/gpt-tokenizer
17. https://www.electronjs.org/docs/latest/api/browser-window
18. https://www.electronjs.org/docs/latest/api/web-contents
19. https://developer.mozilla.org/en-US/docs/Web/API/AbortController
20. https://arxiv.org/abs/2307.03172
21. https://arxiv.org/abs/2310.05736
22. https://github.com/openai/openai-node
23. https://github.com/vercel/ai

## Kurzfazit
- Das Themenblatt 'Auto-Condense-Design' verbindet Quellenlage, Codebezug und konkrete Umsetzung.
- Die Inhalte sind direkt nutzbar für Planung, Implementierung und Review in NoteDrill.
