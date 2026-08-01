# Portliste

Lokale Entwicklungsports aller Projekte unter `D:/CODING/React Projects`, die das Submodule
`shared-knowledge-base` als `shared-docs` oder `shared/docs` eingebaut haben.

**Stand:** 2026-08-01, 19:25 Uhr · 39 Repositories geprüft. `✅ läuft` bedeutet: Der Port war beim Scan
belegt, der Node-Prozess gehörte zum genannten Repository und der HTTP-Aufruf antwortete mit Status 200.
Alle anderen Einträge sind konfigurierte Standardports; sie bedeuten nicht, dass der Server gerade läuft.
CLI-Portargumente haben Vorrang vor abweichenden Vite-Config-Werten.

## Projekte und direkte Links

| Bereich | Repository | Dev-Port(s) und direkte Links | Status beim Scan |
|---|---|---|---|
| AI-BENCHMARK-TESTS | `note-driller-emtyNote-Test` | 3001 — [App](http://localhost:3001) | aus |
| AI-BENCHMARK-TESTS | `claude-code-chat-4f76…` | kein eigener Webserver (VS-Code-Erweiterung) | — |
| React Projects | `ai-cutting-uniaichat` | 3002 — [App](http://localhost:3002) | aus |
| CursorProjects | `CursorJeff` | 1421 — [App](http://localhost:1421) | aus |
| React Projects | `demoai-portfolio` | 3000 — [App](http://localhost:3000) | aus |
| games | `crossword-core-breaker` | 3060 — [App](http://localhost:3060) | aus |
| games | `quiz-blaster-arena` | 3035 — [App](http://localhost:3035) | aus |
| games | `voxel-samurai-quiz` | 3070 — [Spiel](http://localhost:3070); 3071 — [Asset-Lab](http://localhost:3071); 3072 — [Sound-Lab](http://localhost:3072); 3073 — [Monster-Lab](http://localhost:3073); 3074 — [Aeon](http://localhost:3074); 2567 — Multiplayer | **✅ 3070 und 3074 laufen** |
| github-repos-examples | `claude-desert` | 5173 — [App](http://localhost:5173) | aus |
| github-repos-examples | `Claude-Flakes` | 5173 — [App](http://localhost:5173) | aus |
| github-repos-examples | `Claude-of-Duty` | 5178 — [App](http://localhost:5178) | aus |
| github-repos-examples | `Claude-of-tsushima` | 5173 — [Dev](http://localhost:5173); 4173 — [Preview](http://localhost:4173) | **✅ 5173 läuft** |
| github-repos-examples | `claude-tower-defense` | 5173 — [App](http://localhost:5173) | aus |
| github-repos-examples | `quiz-arena-space` | 5173 — [App](http://localhost:5173) | aus |
| github-repos-examples | `quizshoot` | 5173 — [App](http://localhost:5173) | aus |
| Kundenprojekte | `automaker-oalab` | 3007 — [UI](http://localhost:3007); 3008 — [API](http://localhost:3008/api/health) | aus |
| Kundenprojekte | `ecommerce-printshop` | 3009 — [App](http://localhost:3009) | aus |
| Kundenprojekte | `lindner-kfz-1` | 3140 — [App](http://localhost:3140) | **✅ 3140 läuft** |
| Kundenprojekte | `nalbach-und-hinkel-2` | 3000 — [App](http://localhost:3000) | aus |
| React Projects | `Learning` | kein eigener Webserver | — |
| React Projects | `linearleads` | 3010 — [App](http://localhost:3010) | aus |
| React Projects | `localbench-benchmarks` | 3009 — [App](http://localhost:3009) | aus |
| notetree | `notetree-mobile-react-native-expo` | Expo/Metro standardmäßig 8081 — [Metro](http://localhost:8081) (kann dynamisch ausweichen) | aus |
| notetree | `notetree-quiz-crossword-creator` | 5173 — [App](http://localhost:5173) | aus |
| notetree | `notetree-tanstack` | 3005 — [App](http://localhost:3005); 3015 — [Notes](http://localhost:3015/notes); 3006 — [LAN-Modus](http://localhost:3006) | aus |
| old-stuff-but-useful-maybe | `14-quiz-blaster-arena` | 3030 — [App](http://localhost:3030) | aus |
| old-stuff-but-useful-maybe | `14-quiz-blaster-arena-godot` | kein HTTP-Dev-Port (Godot-Projekt) | — |
| old-stuff-but-useful-maybe | `14-quiz-blaster-arena-unity` | kein HTTP-Dev-Port (Unity-Projekt) | — |
| old-stuff-but-useful-maybe | `7-3D-Voxel-Samurai-Quiz-codex-5-3-xhigh` | 3070 — [Spiel](http://localhost:3070); 2567 — Multiplayer | aus |
| old-stuff-but-useful-maybe | `coding-guide` | 3005 — [App](http://localhost:3005) | aus |
| React Projects | `openscreen` | 5173 — [App](http://localhost:5173) | aus |
| React Projects | `Perfumetrics-v3` | 3000 — [App](http://localhost:3000) | aus |
| track-me-ai | `trackme-ai-backend` | 3000 — [App/API](http://localhost:3000) | aus |
| track-me-ai | `trackme-ai-mobile` | Expo/Metro standardmäßig 8081 — [Metro](http://localhost:8081) (kann dynamisch ausweichen) | aus |
| uniai-chat | `uniai-chat` | kein eigener Webserver (Container-Repository) | — |
| uniai-chat | `automaker` | 3007 — [UI](http://localhost:3007); 3008 — [API](http://localhost:3008/api/health); 3009 — [Chat](http://localhost:3009); 3010 — [Kanban](http://localhost:3010) | aus |
| uniai-chat | `openchamber` | 5173 — [Dev-UI](http://127.0.0.1:5173); 3001 — [Dev-API](http://127.0.0.1:3001); 3000 — [Web-CLI](http://localhost:3000) | aus |
| uniai-chat | `uniai-chat-desktop` | 5173 — [Vite-UI](http://localhost:5173) | aus |
| uniai-chat | `uniai-chat-vscode-extension` | kein eigener Webserver (VS-Code-Erweiterung) | — |

## Bekannte Portüberschneidungen

Mehrere Projekte verwenden absichtlich Framework-Defaults. Sie können daher nicht gleichzeitig auf ihrem
Standardport starten:

- **3000:** `demoai-portfolio`, `nalbach-und-hinkel-2`, `Perfumetrics-v3`, `trackme-ai-backend`, OpenChamber Web-CLI
- **3005:** `notetree-tanstack`, `coding-guide`
- **3009:** `ecommerce-printshop`, `localbench-benchmarks`, Automaker Chat
- **3010:** `linearleads`, Automaker Kanban
- **3070:** beide Voxel-Samurai-Repositories
- **5173:** `claude-desert`, `Claude-Flakes`, `Claude-of-tsushima`, `claude-tower-defense`, `quiz-arena-space`, `quizshoot`, `notetree-quiz-crossword-creator`, `openscreen`, OpenChamber Dev-UI, `uniai-chat-desktop`
- **8081:** beide Expo-Projekte, sofern Expo nicht automatisch ausweicht

## Pflege

Bei einem neuen Shared-Docs-Submodule oder einer Portänderung diese Datei aktualisieren. Für den tatsächlichen
Laufstatus unter Windows zählen Listener plus Prozesspfad; ein belegter Port allein reicht nicht. Anschließend
den direkten HTTP-Link einmal aufrufen.
