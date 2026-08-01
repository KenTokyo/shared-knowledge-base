# Portliste — lokale Projekte mit Shared Docs

Zentrale Übersicht der lokalen Startlinks für alle Repositories, die unter
`/Users/kentoky/Documents` das Submodul `KenTokyo/shared-knowledge-base` verwenden.

**Stand:** 2026-08-01, 23:20 Uhr · 18 Repositories gefunden · 36 fest vergebene Ports geprüft ·
**keine Überschneidung**. Dev- und Preview-Ports sind getrennt. `✅ läuft` bedeutet: Listener,
Prozesspfad und HTTP-Status 200 wurden geprüft. Ein konfigurierter Link bedeutet nicht automatisch, dass
der Server gerade läuft.

**Nachtrag 2026-08-02 — `duty-of-tsushima` von 5180/4180 auf 5185/4185 verschoben.** Der Eintrag
kommt aus `vite.config.js`, nicht aus einem Scan. Das Projekt hatte 5180/4180 gewählt, als eine
ältere Fassung dieser Liste `Claude-of-tsushima` noch auf 5173/4173 führte; tatsächlich stehen dort
`server.port = 5180` und `preview.port = 4180`, beide `strictPort`. Zwei `strictPort`-Projekte auf
derselben Nummer heißt: wer zweitens startet, bricht ab — und ausgerechnet diese beiden Repos laufen
beim Ernten nebeneinander. Regel 1 unten ist genau dafür da.

## Direkte Startlinks

| Repository | Anwendung | Feste lokale Links | Start | Status beim Scan |
|---|---|---|---|---|
| `track-me-ai` | TrackMe-Webapp | 3000 — [App](http://localhost:3000) | `pnpm dev` | aus |
| `ai-cutting-automaker` | Electron-Videoeditor | 3001 — [API](http://localhost:3001/api); 5190 — [Renderer](http://localhost:5190) | `npm run dev` | aus · Dependencies fehlen lokal |
| `rapid-ai-cut` | Next-/Electron-Videoeditor | 3002 — [App](http://localhost:3002) | `npm run dev` | aus |
| `notetree-tanstack` | NoteDrill | 3005 — [App](http://localhost:3005); 3006 — [LAN](http://localhost:3006); 3015 — [Notes](http://localhost:3015/notes) | `pnpm dev` | aus |
| `automaker` | Automaker | 3007 — [UI](http://localhost:3007); 3008 — [API](http://localhost:3008/api/health) | `npm run dev` | aus |
| `Perfumetrics-new` | Perfumetrics | 3020 — [App](http://localhost:3020) | `npm run dev` | Port startet · App benötigt lokale Auth-/Supabase-Secrets |
| `nalbach-und-hinkel-2` | Kundenwebseite | 3021 — [App](http://localhost:3021) | `npm run dev` | aus |
| `coding-guide` | Coding Guide | 3022 — [App](http://localhost:3022) | `npm run dev` | aus |
| `vibe-kanban` | Kanban-Webapp | 3023 — [Frontend](http://localhost:3023); 3024 — Backend | `pnpm dev` | aus · Frontend-Dependencies fehlen lokal |
| `quiz-blaster-arena` | Quiz-Spiel | 3030 — [Spiel](http://localhost:3030); 3031 — Socket.IO | `pnpm dev` | aus |
| `voxel-samurai-quiz` | Spiel und Labore | 3070 — [Spiel](http://localhost:3070); 3071 — [Asset-Lab](http://localhost:3071); 3072 — [Sound-Lab](http://localhost:3072); 3073 — [Monster-Lab](http://localhost:3073); 3074 — [Aeon](http://localhost:3074); 2567 — Multiplayer | `pnpm dev` bzw. `pnpm dev:<labor>` | aus |
| `claude-desert` | Ashen Desert | 5173 — [Spiel](http://127.0.0.1:5173); 4173 — [Preview](http://127.0.0.1:4173) | `npm run dev` | **✅ 5173 läuft** |
| `Claude-of-Duty` | Overwatch / Claude of Duty | 5178 — [Spiel](http://127.0.0.1:5178); 4178 — [Preview](http://127.0.0.1:4178) | `pnpm dev` | **✅ alter Preview-Prozess auf [8080](http://127.0.0.1:8080)** |
| `Claude-of-tsushima` | Open-World-Spiel | 5180 — [Spiel](http://localhost:5180); 4180 — [Preview](http://localhost:4180) | `pnpm dev` | aus · Dependencies fehlen lokal |
| `claude-tower-defense` | Bastion of the Emberveil | 5183 — [Spiel](http://127.0.0.1:5183); 4183 — [Preview](http://127.0.0.1:4183) | `pnpm dev` | **✅ 5183 läuft** |
| `quiz-arena-space` | Starforge Arena | 5184 — [Spiel](http://127.0.0.1:5184); 4184 — [Preview](http://127.0.0.1:4184) | `npm run dev` | **✅ alter Prozess auf [4173](http://127.0.0.1:4173)** |
| `duty-of-tsushima` | Duty of Tsushima | 5185 — [Spiel](http://127.0.0.1:5185); 4185 — [Preview](http://127.0.0.1:4185) | `pnpm dev` | aus |
| `uniai-chat-vscode-extension` | VS-Code-Erweiterung | kein eigener Spiel-/Webserver; Proxy-Ports werden von der Erweiterung verwaltet | `pnpm compile` | — |

## Weitere feste Preview-Ports

Voxel Samurai nutzt zusätzlich 4174 für das Asset-Lab-Preview, 4175 für das Sound-Lab-Preview,
4176 für das Monster-Lab-Preview und 4177 für das Aeon-Preview. Damit bleiben auch alle Preview-Ports
untereinander eindeutig.

## Portregeln

1. Jeder feste Port gehört genau einem Repository bzw. einem klar benannten Unterdienst.
2. Vite-Projekte verwenden `strictPort`, damit ein belegter Port nicht still auf eine andere Nummer springt.
3. CLI-Portargumente haben Vorrang vor Vite-Konfigurationen.
4. Automaker darf für von ihm gestartete, temporäre Fremdprojekte dynamische Ports ab 3001 suchen; diese
   temporären Ports gehören nicht zur festen Projektbelegung.
5. Vibe Kanban startet bei 3023/3024 und sucht nur dann weiter, wenn einer dieser Ports bereits extern belegt ist.
6. Bereits laufende Prozesse wurden nicht beendet. Deshalb verwenden Claude of Duty und Quiz Arena Space
   bis zum nächsten normalen Neustart noch ihre oben ausgewiesenen alten Override-Ports.

## Warum ein `shared-docs`-Ordner leer aussehen kann

`shared-docs` ist ein Git-Submodul. Der Eintrag kann bereits im Git-Index existieren, obwohl sein Inhalt noch
nicht ausgecheckt wurde. Darum scheitert `git submodule add ... shared-docs` mit
`'shared-docs' already exists in the index`.

Im jeweiligen Projekt stattdessen ausführen:

```bash
git submodule update --init shared-docs
git submodule update --remote shared-docs
```

Für Repositories mit dem alternativen Pfad `shared/docs` gilt derselbe Befehl mit diesem Pfad.

## Pflege

Bei einem neuen Shared-Docs-Submodul oder einer Portänderung diese Datei aktualisieren. Für den Laufstatus
immer Listener **plus Prozess-Arbeitsverzeichnis plus HTTP-Antwort** prüfen; ein belegter Port allein ist
kein Beleg für das richtige Projekt.
