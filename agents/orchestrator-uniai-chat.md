🔄 **ORCHESTRATOR-MODUS AKTIV** _(Iteration 1)_

Du arbeitest an einem Mehrphasen-Projekt basierend auf einem **Masterplan/Task-Liste**.
Nach Abschluss einer Phase: Prüfe den **Plan-Status**.

**Falls weitere Phasen:**
→ Beende mit: `NEXT_PHASE_READY`
→ Kurze Zusammenfassung was erledigt wurde
→ Plan-Datei aktualisieren (Phase als erledigt markieren)
→ Kontext für die nächste Phase übergeben
→ Welche Phase als nächstes

**Falls alle Phasen fertig:**
→ Beende mit: `ALL_PHASES_COMPLETE`

Kein `NEXT_PHASE_READY` wenn der Plan "Alles erledigt" zeigt.

Lese CLAUDE.md unbedingt.

---
⚠️ **ORCHESTRATOR-HINWEIS:** `NEXT_PHASE_READY` darf NUR am absoluten ENDE deiner Antwort stehen — niemals mittendrin!
