# NoteDrill Electron Playwright CLI Referenz

## Zweck

Diese Datei ist die normale Projekt-Referenz für KI-Agenten und Menschen. Sie ist kein Skill.

Sie erklärt, wann NoteDrills Electron-Playwright-CLI genutzt wird, wo die Befehle herkommen und wie sie sich vom normalen Browser-Playwright unterscheiden.

## Kurzantwort

Die Aktionsbefehle sind fast dieselbe Sprache wie bei Playwright CLI: `snapshot`, `click`, `type`, `press`, `run-code`, `screenshot`, `close` und ähnliche Befehle.

Der Unterschied liegt im Startpunkt:

- Normales Playwright CLI steuert einen Browser oder eine URL.
- Electron Playwright CLI startet oder verbindet sich mit einem echten Electron-Fenster.
- NoteDrill nutzt dafür immer den Projekt-Wrapper `pnpm run electron:pwcli -- <befehl>`.

Für Electron nicht direkt `playwright-cli` verwenden. Für NoteDrill-Electron immer über die `electron:pwcli`-Skripte gehen, weil der Wrapper die richtige Config, Session und Electron-Env setzt.

## Quellen der Wahrheit

| Quelle | Bedeutung |
|---|---|
| `package.json` | Enthält die NoteDrill-Befehle `electron:pwcli`, `electron:pwcli:snapshot`, `electron:pwcli:windows`, `electron:pwcli:close`. |
| `scripts/e2e/electron-playwright-cli.mjs` | NoteDrill-Wrapper. Entfernt `ELECTRON_RUN_AS_NODE`, setzt Default-Port, Session und Config. |
| `.playwright/cli.config.json` | Electron-Launch-Konfiguration für NoteDrill. |
| `node_modules/electron-playwright-cli/README.md` | Installierte Paket-Doku. Erklärt Standardbefehle plus Electron-Spezialbefehle. |
| `node_modules/electron-playwright-cli/skills/playwright-cli/SKILL.md` | Vom Paket mitgelieferte Skill-Doku. Nur Referenz, nicht die NoteDrill-Projektregel. |
| `docs/electron-playwright/electron-playwright-overview.md` | NoteDrill-Überblick zur Integration und zu Artefakten. |
| `shared-docs/agents/agent-browser/notedrill-playwright-findings.md` | Projektspezifische Browser-/Playwright-Findings. |

Der schnellste Befehl, um die aktuell installierten Kommandos zu sehen:

```powershell
pnpm run electron:pwcli -- --help
```

## Wann welches Werkzeug?

| Situation | Werkzeug |
|---|---|
| Web-App im Browser testen, URL öffnen, Browser-FSA prüfen | Offizieller Playwright-Skill und normales `playwright-cli` |
| Electron-Desktop-App öffnen, KI-Chat in Electron bedienen, IPC oder `window.electronAPI` prüfen | `pnpm run electron:pwcli -- <befehl>` |
| Native Chrome-Ordnerfreigabe, File System Access API, echter Browser-Permission-Grant | Browser-FSA-Runner und `notedrill-playwright-findings.md` |
| Wiederverwendbare Regressionstestdatei schreiben | Nur wenn der User ausdrücklich Testdateien verlangt |

Merksatz: Browser-Playwright steuert Webseiten. Electron-Playwright steuert die Desktop-App.

## NoteDrill-Befehle

Diese Befehle sind die empfohlenen Einstiege:

```powershell
pnpm run electron:pwcli -- --help
pnpm run electron:pwcli:snapshot
pnpm run electron:pwcli:windows
pnpm run electron:pwcli:close
```

Allgemeine Form:

```powershell
pnpm run electron:pwcli -- <befehl> <argumente>
```

Beispiele:

```powershell
pnpm run electron:pwcli -- snapshot
pnpm run electron:pwcli -- click e15
pnpm run electron:pwcli -- type "Suchtext"
pnpm run electron:pwcli -- press Enter
pnpm run electron:pwcli -- run-code "async page => await page.title()"
pnpm run electron:pwcli -- screenshot --filename=output/playwright/electron.png
pnpm run electron:pwcli -- electron_evaluate "electron => electron.app.getName()"
pnpm run electron:pwcli -- electron_windows
pnpm run electron:pwcli -- close
```

Für den vorhandenen NoteDrill-Dev-Port:

```powershell
$env:ELECTRON_DEV_INSTANCE='port-3005'
$env:PLAYWRIGHT_CLI_SESSION='notedrill-electron-port3005'
pnpm run electron:pwcli:snapshot
```

## Aktuelle Kommandos aus `--help`

Stand 2026-06-02 mit `electron-playwright-cli@0.1.3` zeigt `pnpm run electron:pwcli -- --help` diese Standard-Kommandos:

```text
click <ref>
close
dblclick <ref>
console <level>
drag <startRef> <endRef>
evaluate <function> <ref>
upload-file
handle-dialog <accept> <promptText>
hover <ref>
open <url>
go-back
network-requests
press <key>
resize <width> <height>
run-code <code>
select-option <ref> <values>
snapshot
screenshot <ref>
type <text>
wait-for
tab <action> <index>
mouse-click-xy <x> <y>
mouse-drag-xy <startX> <startY> <endX> <endY>
mouse-move-xy <x> <y>
pdf-save
start-tracing
stop-tracing
```

Die installierte Paket-Doku ergänzt Electron-Spezialbefehle:

```text
electron_evaluate
electron_windows
```

Wenn Help-Ausgabe und Paket-Doku voneinander abweichen, zuerst `pnpm run electron:pwcli -- --help` ausführen und danach in `node_modules/electron-playwright-cli/README.md` prüfen. Für NoteDrill ist zusätzlich entscheidend, welche Wrapper-Skripte in `package.json` existieren.

## Arbeitsablauf für Agenten

1. Offiziellen Playwright-Skill lesen: `C:\Users\PC1\.codex\skills\playwright\SKILL.md`.
2. NoteDrill-Findings lesen: `shared-docs/agents/agent-browser/notedrill-playwright-findings.md`.
3. Bei Electron zusätzlich diese Datei lesen.
4. Prüfen, ob die App oder der Dev-Server schon läuft, besonders Port `3005`.
5. Mit `pnpm run electron:pwcli:snapshot` starten.
6. Nur frische Refs aus dem neuesten Snapshot verwenden.
7. Nach Navigation, Dialogen, Tabwechseln oder großen UI-Änderungen erneut snapshotten.
8. Neue Findings sofort in der aktiven Task- oder Masterplanung dokumentieren.

## Wichtige Guardrails

- Keine UI-, Browser-, Screenshot- oder Playwright-Checks ohne klaren User-Befehl starten.
- Keine Refs raten. Wenn ein Ref fehlt oder alt wirkt, neu snapshotten.
- Kein globales Windows-`SendKeys` für native Dialoge verwenden.
- Für langen Text in `run-code` auf Windows vorsichtig sein: kleine Snippets direkt, große Inhalte lieber über Base64, Datei-Input, fokussierten Editor oder `keyboard.insertText` einspielen.
- Der NoteDrill-Wrapper startet `node_modules/electron-playwright-cli/playwright-cli.js` direkt über Node, damit Windows-Argumente stabil ankommen.
- `electron-playwright-cli` schreibt eigene Artefakte unter `.playwright-cli/`. Ein Screenshot mit `--filename=output/playwright/electron.png` landet dadurch effektiv unter `.playwright-cli/output/playwright/electron.png`.
- Für echte KI-Chat-Läufe bleiben Provider, API-Key, Login und Workspace-Zugriff bewusste Gates. Keine Secrets in Doku, Screenshots oder Artefakte schreiben.

## Wie ein Mensch das einer KI sagen kann

Gute Formulierung:

```text
Teste diesen Flow in Electron. Nutze dafür die NoteDrill-Referenz
`shared-docs/agents/agent-browser/notedrill-electron-playwright-cli-reference.md`,
starte mit `pnpm run electron:pwcli:snapshot`, arbeite mit frischen Snapshot-Refs
und dokumentiere neue Findings in der aktiven Task-Datei.
```

Noch kürzer:

```text
Nutze Electron Playwright CLI über `pnpm run electron:pwcli -- ...`.
Lies vorher die NoteDrill Electron-Playwright-Referenz unter `shared-docs/agents/agent-browser/`.
```
