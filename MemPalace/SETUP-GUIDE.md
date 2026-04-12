# MemPalace Setup Guide - Referenz

**Zweck:** Schnell-Referenz zum MemPalace Setup für alle React-Projekte.

---

## Zentrale Dokumentation

Der vollständige Setup-Guide liegt **projektübergreifend** hier:

```
D:\CODING\React Projects\.mempalace\NEW-PROJECT-GUIDE.md
```

**Warum dort?** Der Palace ist zentral für alle React-Projekte (nicht projektspezifisch), daher liegt auch der Guide dort.

---

## Schnellstart für neue Projekte

```bash
cd "D:/CODING/React Projects"
python -m mempalace mine ./NEUES-PROJEKT --wing projektname
```

Mehr Details: [NEW-PROJECT-GUIDE.md](file:///D:/CODING/React%20Projects/.mempalace/NEW-PROJECT-GUIDE.md)

---

## Palace-Struktur

| Pfad | Inhalt |
|------|--------|
| `D:\CODING\React Projects\.mempalace\palace\` | Zentraler Palace (alle Projekte) |
| `D:\CODING\React Projects\.mempalace\NEW-PROJECT-GUIDE.md` | Setup-Anleitung |
| `~/.claude/settings.json` | Hooks-Konfiguration |

---

## MCP-Server (nach Claude Code Neustart)

```bash
claude mcp add mempalace -- python -m mempalace.mcp_server
```

19 Tools verfügbar: `mempalace_search`, `mempalace_list_wings`, `mempalace_kg_query`, etc.

---

## Weitere Infos

- **GitHub README:** [memPalace-Readme.md](./memPalace-Readme.md)
- **Task-Dokumentation:** `docs/mempalace/tasks/2026-04-12-mempalace-setup.md`
