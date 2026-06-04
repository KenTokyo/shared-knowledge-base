# NoteDrill Playwright-Findings

Diese Datei sammelt projektspezifische NoteDrill-Erkenntnisse für Browser-, Playwright- und File-System-Access-Arbeit.

Nutze sie zusammen mit dem offiziellen Playwright-Skill unter:

`C:\Users\PC1\.codex\skills\playwright\SKILL.md`

## Pflicht vor Browser-Arbeit

1. Lies zuerst den offiziellen Playwright-Skill.
2. Lies danach diese projektspezifische NoteDrill-Findings-Datei.
3. Lies die aktive Task-Datei oder Masterplanung, bevor Browser-Befehle laufen.
4. Wenn ein neues Browser-Finding entsteht, schreibe es vor dem nächsten Experiment in Task/Masterplan.

Das ist besonders nach Context-Condensing wichtig. Verlasse dich bei Browser-Eigenheiten, Login-Hinweisen, Search Params, nativen Dialogen, API-Key-Setup oder gescheiterten Versuchen nicht auf Gedächtnis.

## NoteDrill Documentation Rule

Für jeden nicht-trivialen Browser- oder Playwright-Flow muss Task/Masterplan aktuell bleiben mit:

- Nutzerwunsch in einfachem Deutsch,
- exakter URL und Einstiegspunkt,
- Modell-/Provider-Setup,
- genutzten Search Params oder localStorage-Seeds,
- ausgeführten Befehlen,
- Screenshot- oder Failure-Artefakt-Pfaden,
- gescheitertem Schritt und Learning,
- Dingen, die nicht wiederholt werden dürfen.

Aktuelle Referenz-Task:
`docs/chat/tasks/2026-06-01-browser-dateisystem-agentic-chat-masterplan.md`

Aktuelles Teilgoal für echten Browser-Ordnergrant:
`docs/chat/tasks/2026-06-01-browser-fsa-real-grant-playwright-goal.md`

## AI-Testability Contract

Kanonische Guideline:
`docs/ai-testability/ai-playwright-testability-guide.md`

Für neue UI- und Testbarkeitsarbeit gilt:

- Erst semantische Rollen, sichtbare deutsche Namen und frische Snapshots nutzen.
- `data-testid` ist der stabile Fallback für flow-kritische Zonen und schwer eindeutig benennbare Controls.
- `data-debug-component` bleibt Diagnosemarker, aber kein primärer Locator-Vertrag.
- Keine blinden `div`-/`role`-Regex-Umbauten. Vor Massenänderungen `pnpm run ai-testability:audit` und gezielte `rg`-Suchen nutzen.

## Playwright CLI Workflow

Bevorzuge `playwright-cli` für UI-Erkundung, außer der Nutzer braucht ausdrücklich eine Testdatei.

Stand 2026-06-01: Die globale Playwright CLI wurde auf `0.1.13` aktualisiert und `playwright-cli install --skills` wurde im Workspace ausgeführt. Trotzdem bleiben die NoteDrill-Findings hier verbindlich, weil native Browsergrenzen dadurch nicht verschwinden.

Nutze diesen Ablauf:

1. `playwright-cli open <url> --headed`
2. `playwright-cli snapshot`
3. `click`/`fill`/`type` nur mit frischen Refs aus dem neuesten Snapshot
4. Nach jedem Dialog, Tabwechsel, Reload oder größerer UI-Änderung erneut snapshotten
5. Artefakte in `output/playwright/` speichern

Wenn Refs alt werden, erneut snapshotten. Keine Refs raten.

## Search Params And Seeding

Search Params oder localStorage dürfen Setup beschleunigen für:

- Modell-ID,
- API-Provider-Metadaten,
- Sidebar-Status,
- Editor-Modus,
- nicht geheime Testflags.

Nutze Search Params für Secrets nur, wenn der Nutzer das ausdrücklich verlangt und der Wert nur temporär ist. Bevorzuge Env-Variablen oder localStorage-Seeds in einem frischen Browserkontext. Schreibe API-Keys nie in Doku, Screenshots, Summaries, committed Fixtures oder Failure-Artefakte.

Search Params und localStorage können keinen Browser-Dateisystemzugriff freigeben. Sie können gewünschte Workspace-Metadaten speichern, aber keinen echten `FileSystemDirectoryHandle` erzeugen.

## File System Access Findings

Chrome File System Access ist eine echte Browser-Berechtigungsgrenze.

- `showDirectoryPicker()` muss aus einer Nutzeraktion entstehen.
- `showDirectoryPicker()` braucht Transient User Activation. Im Browserpfad darf der Picker deshalb die erste relevante Aktion nach dem Klick sein: keine `setIsMutating`-State-Änderung, kein Dialog-Apply-State, kein Refresh, keine Workspace-Init-Arbeit und keine losgelöste Microtask vor dem Picker.
- Picker-Callbacks müssen ihre Promise-Kette zurückgeben. UI-Handler dürfen Ordnerauswahl oder Re-Freigabe nicht als `void Promise.resolve(...)` starten, sonst kann Chrome die Nutzeraktivierung verlieren.
- Erst nach erfolgreichem Directory-Handle dürfen Permission-Prüfung, IndexedDB-Speicherung, Workspace-Init, Store-Update und Refresh laufen.
- Ein echter lokaler Ordnergrant kann nicht durch localStorage, IndexedDB-JSON, Search Params oder normale CDP-Permissions erzeugt werden.
- Ein gespeicherter Handle kann erst nach Chrome-Freigabe in IndexedDB gemerkt werden.
- Cookies und localStorage können keinen `FileSystemDirectoryHandle` speichern; der echte Handle gehört in IndexedDB des Browserprofils.
- Ein gespeicherter Handle kann nach einem neuen Chrome-Start wieder `permission: "prompt"` haben, obwohl der Handle selbst aus IndexedDB geladen wurde. `FileSystemDirectoryHandle.requestPermission({ mode: "readwrite" })` kann in einem Playwright-gesteuerten System-Chrome nach einem echten Button-Klick hängen bleiben, ohne dass ein stabil sichtbarer Dialog im DOM entsteht. Stabilerer lokaler Re-Grant-Pfad: aus derselben Nutzeraktion direkt `showDirectoryPicker({ mode: "readwrite", startIn: gespeicherterHandle })` öffnen, den Nutzer denselben Ordner bestätigen lassen und den frischen Handle wieder speichern.
- Manual-Assist-Läufe des Real-FSA-Runners nutzen standardmäßig das persistente Testprofil `output/playwright/browser-fsa-manual-profile`, damit der in IndexedDB gespeicherte Handle nach erfolgreicher Auswahl erhalten bleibt und Chrome nicht bei jedem Lauf neu fragt.
- Für ein eigenes persistentes Profil `ND_E2E_BROWSER_PROFILE_DIR=<pfad>` setzen. Für bewusst frischen Prompt `ND_E2E_REUSE_BROWSER_PROFILE=0` setzen.
- Logik immer getrennt mit simulierten Handles testen.
- Simulierte Handles sind schnelle Regressionstests, aber kein Akzeptanzbeweis für Browser-Dateisystemzugriff.
- Der physische Endbeweis braucht weiterhin einen headed Browser und eine echte Ordnerauswahl für den Zielordner.
- Ein eigener DOM-Custom-Picker kann den ersten Root-Grant nicht ersetzen. Er kann nur nach einem echten `FileSystemDirectoryHandle` Unterordner innerhalb des freigegebenen Roots auswählen.
- Stand 2026-06-02: Für echte Grant-Läufe gibt es `WorkspaceGrantCockpit` hinter `?fsaGrantGoal=1`. Es ersetzt den nativen Dialog nicht, macht aber FSA-Support, Picker-Event, gespeicherten Handle, aktiven Workspace und Client-Tool-Executor im DOM messbar.

Bekannter NoteDrill-Zielordner:
`C:\Users\PC1\Documents\Testordner`

## Native Picker Findings

Nutze kein globales Windows-`SendKeys`. Es kann das normale Chrome-Fenster des Nutzers oder ein anderes aktives Fenster treffen.

Sicherere Optionen:

- manuelle Nutzerfreigabe,
- frisches temporäres Browserprofil,
- UIAutomation mit Scope auf Testprofil/Testprozess,
- separat gestartetes Chrome mit Remote Debugging, danach Playwright/CDP-Attach.

Beobachtet während der NoteDrill-FSA-Arbeit am 2026-06-01:

- Playwright-launched Chromium kann `showDirectoryPicker` auf `127.0.0.1` melden, aber der Picker kann sofort mit `Ordnerauswahl wurde abgebrochen...` abbrechen.
- Playwright-kontrollierte Browserläufe können scheitern, bevor ein nativer Windows-Picker sichtbar wird. Dann gibt es keinen `#32770`-Dialog für UIAutomation.
- Ein nativer Windows-Picker kann für den Nutzer sichtbar sein, ohne dass Playwright-DOM-Snapshots oder die Agent-Shell-UIAutomation ihn enumerieren können. Dann ist der Befund nicht "Picker fehlt", sondern "Automation sieht den nativen Dialog nicht in derselben Windows-Desktop-/Integrity-Ebene".
- Lauf `20260601-212630`: Der native Dialog hieß `Auswählen, wo diese Website Änderungen speichern kann` und war für den Nutzer sichtbar. Playwright sah weiter nur die Browserseite dahinter und wartete auf den DOM-Workspace-Trigger. Nicht nach DOM-Refs für diesen Dialog suchen; er gehört nicht zum Browser-DOM.
- Lauf `20260601-213925`: Gescopte UIAutomation sah Chrome-Testprofil-Prozesse, aber keinen nativen Ordnerdialog. Das stärkt die Desktop-/Integrity-Grenzen-Hypothese. Nicht mit globalem `SendKeys` umgehen; besser DOM-Status in der App verbessern und den nativen Klick bewusst manuell lassen.
- Lauf `20260602-072234`: System-Chrome plus `WorkspaceGrantCockpit` erreichte `pickerState=opening`, `fsaSupported=true`, `workspaceGranted=false` und `clientToolExecutorActive=false`. Log: `output/playwright/browser-real-gemini-fsa-picker-manual-20260602-092224.log`; Artefakte: `output/playwright/browser-real-gemini-fsa-smoke-20260602-072234.failure.json` und `.png`. Eine read-only UIAutomation-Fensterprüfung aus der Agent-Shell fand während des Wartens weiterhin keinen passenden nativen Dialog. Root Cause: Die App löst `showDirectoryPicker()` aus, aber kein bestätigter `FileSystemDirectoryHandle` kommt zurück.
- Nach Lauf `20260602-072234` keine weiteren langen Manual-Timeouts ohne aktive Nutzerbestätigung wiederholen. Nächster stabiler Ansatz ist ein gehärteter sichtbarer-Picker-Fallback mit hartem Abbruch bei mehreren passenden Dialogen oder ein isolierter CDP-Dedicated-Chrome-Lauf.
- Lauf `20260602-074407`: Der gehärtete scoped/visible Fallback mit `ND_E2E_AUTO_PICKER=1` und `ND_E2E_ALLOW_VISIBLE_PICKER_AUTOMATION=1` fand Zielprozesse, aber keinen nativen Ordnerdialog. Die App meldete `Ordnerauswahl wurde abgebrochen`, Cockpit: `pickerState=error`, `workspaceGranted=false`, `clientToolExecutorActive=false`. Logs: `output/playwright/browser-real-gemini-fsa-picker-visible-fallback-20260602-094403.out.log` und `.err.log`; Artefakte: `output/playwright/browser-real-gemini-fsa-smoke-20260602-074407.failure.json` und `.png`.
- Nach Lauf `20260602-074407` keinen weiteren UIAutomation-Fallback gegen Playwright-launched System-Chrome ohne neuen Desktop-/Integrity-Ansatz wiederholen. Nächster stabiler Ansatz ist CDP-Dedicated-Chrome mit frischem Profil; wenn auch das scheitert, Manual-Assist als offizielles lokales Gate dokumentieren.
- Lauf `20260602-074825`: CDP-Dedicated-Chrome mit frischem Profil und `--remote-debugging-port=55369` lud `/notes?fsaGrantGoal=1`, aber UIAutomation sah innerhalb von 45 Sekunden nur `pid=31620;class=Chrome_WidgetWin_1;name=NoteDrill - Google Chrome`, keinen nativen `#32770`-Ordnerdialog. Cockpit: `pickerState=opening`, `workspaceGranted=false`, `clientToolExecutorActive=false`. Logs: `output/playwright/browser-real-gemini-fsa-picker-cdp-20260602-094819.out.log` und `.err.log`; Artefakte: `output/playwright/browser-real-gemini-fsa-smoke-20260602-074825.failure.json` und `.png`.
- Nach Lauf `20260602-074825` CDP plus UIAutomation-Fallback nicht ohne aktive Nutzerbestätigung oder neue Windows-Desktop-/Integrity-Strategie wiederholen. CDP ist stabiler im App-Zustand als Playwright-launched System-Chrome, ersetzt aber den nativen Grant nicht.
- Lauf `20260602-081249`: Manual-Assist nutzte das persistente Profil `output/playwright/browser-fsa-manual-profile` (`browserProfileSource=manual-default`, `browserProfilePersistent=true`) und wartete 600 Sekunden. Cockpit: `fsaSupported=true`, `pickerState=opening`, `workspaceGranted=false`, `rootCount=0`, `clientToolExecutorActive=false`; Diagnosepfad: `output/playwright/browser-real-gemini-fsa-smoke-20260602-081249.failure.json` und `.png`. Der Playwright-Screenshot kann weiter den App-Dialog `Workspace-Modus wählen` zeigen, weil der native Windows-Picker außerhalb des Browser-Screenshots liegt. Root Cause: Kein bestätigter `FileSystemDirectoryHandle` kam zurück. Der Persistenzteil ist korrekt vorbereitet; nach erfolgreicher manueller Auswahl bleibt der Handle in IndexedDB dieses Profils erhalten.
- Nach Lauf `20260602-081249` keine langen Manual-Assist-Läufe ohne aktive Nutzerbestätigung starten. Wenn der Nutzer bereit ist, denselben persistenten Profilpfad verwenden und das Wartefenster großzügig setzen.
- Lauf `20260602-083853`: Manual-Assist mit demselben persistenten Profil war erfolgreich. Summary: `output/playwright/browser-real-gemini-fsa-picker-20260602-083853.json`; Screenshot: `output/playwright/browser-real-gemini-fsa-picker-20260602-083853.png`. Ergebnis: `selectedWorkspaceName=Testordner`, `reloadWorkspaceRestored=true`, `clientToolExecutorActive=true`, `browserProfilePersistent=true`. Der echte Handle ist damit bewiesen und in IndexedDB des Profils `output/playwright/browser-fsa-manual-profile` wiederverwendbar gespeichert. Der Zielordner enthält danach echte Dokumentiermodus-Artefakte (`faecher/`, `regeln/`, `tasks/`, `index.md`).
- Nach Lauf `20260602-083853` nicht erneut den Picker erzwingen, solange dasselbe Profil genutzt wird. Der nächste stabile Schritt ist der echte Gemini-Dateilifecycle gegen den bereits freigegebenen `Testordner`.
- Neues Native-Dialog-Finding aus Lauf `20260602-083853`: UIAutomation über `RootElement` sah zunächst nur das deaktivierte Chrome-Hauptfenster, aber Win32 `EnumWindows` fand den echten Dialog als `#32770` mit Titel `Auswählen, wo diese Website Änderungen speichern kann` und Prozess `36088`. Über `AutomationElement.FromHandle(...)` waren danach Dialog-Controls wie Ordnerliste, `Ordner:`-Bereich, `Ordner auswählen` und `Abbrechen` lesbar. Das ist kein Endbeweis für sichere Automation, aber ein besserer Ansatz als globales `SendKeys`: künftig nur handle-gebunden, mit eindeutigem Titel, eindeutigem Prozess/Testprofil und hartem Abbruch bei mehreren Kandidaten.
- Lauf `20260602-101644`: Der Win32-gestützte Picker-Fallback ist erstmals grün. Befehl: `ND_E2E_USE_SYSTEM_BROWSER=1`, `ND_E2E_AUTO_PICKER=1`, `ND_E2E_ALLOW_VISIBLE_PICKER_AUTOMATION=1`, `ND_E2E_AUTO_PICKER_TIMEOUT_MS=90000`, `ND_E2E_PICKER_WAIT_MS=180000`, `ND_E2E_WORKSPACE_PATH=C:\Users\PC1\Documents\Testordner`, `pnpm run test:e2e:real-gemini-fsa:picker`. Ergebnis: echter System-Chrome, temporäres Testprofil, Win32 fand den nativen `#32770`-Dialog eindeutig im Testprofil, setzte den Zielordner und bestätigte ihn. Summary: `output/playwright/browser-real-gemini-fsa-picker-20260602-101644.json`; Screenshot: `output/playwright/browser-real-gemini-fsa-picker-20260602-101644.png`; `reloadWorkspaceRestored=true`, `clientToolExecutorActive=true`. Nächster stabiler Ansatz für automatisierte Realtests: Autopicker mit Win32-Handle-Fallback nutzen; weiterhin bei mehreren passenden Dialogen hart abbrechen.
- Electron-Finding `2026-06-02`: Native Electron-Ordnerdialoge wie `Workspace-Ordner auswählen` liegen außerhalb des Electron-DOM und müssen über den lokalen FSA-MCP-Helper bzw. `scripts/e2e/electron-select-workspace-folder.ps1` behandelt werden. Stabiler Ablauf: `notedrill_electron_list_native_folder_dialogs` oder `-Mode list` ausführen, eindeutigen `#32770`-Dialog mit NoteDrill-`electron.exe`-PID und gewünschter Adresszeile prüfen, dann `notedrill_electron_select_workspace_folder` oder `-Mode confirm-current` nutzen. Der erfolgreiche Lauf bestätigte den aktuellen Tutorial-Workspace per `SendMessage(WM_COMMAND, IDOK)`, danach zeigte `.playwright-cli/snapshot-21.yml` den Workspace `notedrill-mitarbeiter-tutorial` und den Freebuff-Terminal-Hinweis. Nicht wiederholen: globale `SendKeys`, Koordinatenklicks oder Fallback auf irgendeinen Nicht-Abbrechen-Button.
- Lauf `20260602-101916`: Der echte Gemini-Lifecycle darf nicht per `page.getByText(COMPLETION_MARKER).first()` auf Abschluss warten, weil der Marker im User-Prompt selbst vorkommt. Das führte zu zu früher Dateiprüfung, obwohl FSA bereit war. Failure: `output/playwright/browser-real-gemini-fsa-smoke-20260602-101916.failure.json`; Screenshot: `output/playwright/browser-real-gemini-fsa-smoke-20260602-101916.failure.png`. Stabiler Testansatz: nach dem Senden auf echte Dateien, Inhaltsmarker und gelöschte Pfade im Workspace pollen.
- Lauf `20260602-105117`: Der echte Gemini/FSA-Lauf war ein Teilnachweis für echte Dateioperationen. Workspace, Picker und Client-Tool-Executor waren grün; Gemini erzeugte echte Markdown-, HTML-, JSON- und temporäre Dateien im Testordner. Der Lauf scheiterte später an `tool-log.md`, weil Gemini eine zweite Schreiboperation ohne `riskAccepted=true` versuchte. Root Cause: Risk-Gating greift korrekt, der Prompt war aber zu breit und ließ Gemini eine riskante Folgeoperation selbst ableiten. Nicht wiederholen: lange Ein-Prompt-Dateilifecycle-Läufe ohne explizite `riskAccepted=true`-Vorgaben für jede Überschreib-, Rename- oder Delete-Operation.
- Lauf `20260602-110757`: Ein weiterer echter Gemini/FSA-Lauf erreichte Erzeugen und Lesen, blieb aber vor dem finalen `tool-log.md` hängen. Root Cause: Ein einzelner großer Prompt ist für Gemini im Browser-Tool-Loop zu spröde; das Modell kann nach mehreren Toolcalls in einen Zwischenstand auslaufen. Stabiler Ansatz: Dateilifecycle in mehrere Chat-Phasen splitten und jede Phase auf wenige konkrete Toolcalls begrenzen.
- Lauf `20260602-112547`: Split-Phase 1 war grün; Gemini erzeugte die Zielartefakte. Phase 2 las `lineare-funktionen.md`, schrieb aber den verlangten Edit-Marker nicht zurück. Failure: `output/playwright/browser-real-gemini-fsa-smoke-20260602-112547.failure.json` und `.png`. Root Cause: Die Edit-Phase war noch zu offen formuliert. Stabiler Ansatz: In Edit-Phasen exakten neuen Dateiinhalt vorgeben und genau zwei Toolcalls verlangen: erst `nd_Read`, dann `nd_Write` mit `riskAccepted=true`.
- Lauf `20260602-113324`: Nach engerer Edit-Phase scheiterte bereits Phase 1 mit fehlender `lineare-funktionen.md`. Vor Wiederholung das Failure-Artefakt prüfen; möglich sind Provider-/Rate-Limit-Verhalten oder ein Modelllauf ohne Toolcall. Nicht blind weiter retryn: erst Statuskarten, Browserevents und Provider-Meldungen aus dem Artefakt auswerten.
- Sound-/Status-Finding 2026-06-02: `ALL_TASKS_COMPLETED fehlt` während aktivem Run ist kein harter Fehler. Solange `isRunActive=true`, darf kein Toast und kein Fehlersound entstehen. Nach inaktivem Run ist es eine Warnung `Abschluss noch offen`, aber ebenfalls kein Fehlersound. Provider-Zwischenfehler als `provider_notification` mit `notificationType="error"` sind Warnstatus, bis der finale `provider_failed`-Event kommt.
- Retry-Finding 2026-06-02: Provider-Retries sind auf maximal 3 Retries begrenzt. UI zeigt `Max. Retries`, der Client sendet intern `maxAttempts = retries + 1`, die Servernormalisierung kappt auf 4 Gesamtversuche. Basisdelay ist 15 Sekunden, erlaubter Bereich 5 bis 60 Sekunden. Erst nach dem finalen `provider_failed` kommt ein echter Fehlerstatus mit Fehlersound. Das verhindert schnelle Limit-Eskalation und trennt Warnungen von harten Fehlern.
- Screenshot-/User-Finding 2026-06-02: Nach dem echten Ordnerdialog können zusätzlich zwei Chrome-Prompts auftauchen: ein Benachrichtigungs-Prompt (`Benachrichtigungen anzeigen`) und ein Datei-Prompt (`Dateien bearbeiten`). `Benachrichtigungen` kann im Testprofil per `browserContext.grantPermissions(['notifications'], { origin })` vorab erlaubt werden. Der Datei-Prompt bleibt eine Browser-Sicherheitsabfrage nach echtem FSA-Handle und muss, wenn automatisiert, buttonnah per UIAutomation und Testprofil-Scope bestätigt werden. Nicht den ganzen Chrome-Fenstertext als Kontext nutzen, weil sonst mehrere `Zulassen`-Buttons mehrdeutig werden.
- Lauf `20260602-120808`: Frisches temporäres Profil plus Win32-Autopicker bestätigte den nativen Ordnerdialog, aber danach blieb `Workspace-Modus wählen` offen und `rootCount=0`. Failure: `output/playwright/browser-real-gemini-fsa-smoke-20260602-120808.failure.json` und `.png`. Root Cause: Bei frischem Profil kann nach dem nativen Picker noch ein Chrome-Zulassen-Prompt zwischen Dialog-OK und gespeichertem Handle liegen; der Helper darf nicht erst nach `selectWorkspaceFolder()` laufen. Runner-Fix: Nach erfolgreichem Picker-Automation-Exit wird `acceptChromePermissionPromptIfPresent()` direkt in `selectWorkspaceFolder()` ausgeführt.
- Lauf `20260602-122025`: Persistentes Profil und FSA waren grün, aber `gemini-3-flash-preview` scheiterte bei Toolcalls mit `Function call is missing a thought_signature`. Failure: `output/playwright/browser-real-gemini-fsa-smoke-20260602-122025.failure.json`. Root Cause: Gemini-3-Preview-Toolcalls benötigen Thought-Signatures; die aktuelle AI-SDK-4-Google-Integration in NoteDrill reicht diese für den Tool-Loop nicht stabil weiter. Nicht für Browser-FSA-Akzeptanzläufe nutzen, bis Provider/SDK/Message-History dieses Signature-Verhalten explizit unterstützt.
- Runner-Fix 2026-06-02: Der Chrome-Zulassen-Prompt-Helper nutzt jetzt `New-Object ... -ArgumentList @(...)`, weil die vorherige PowerShell-Konstruktion im generierten `.ps1` mit Parserfehler abbrechen konnte.
- Erfolgsbefund `20260602-123036`: Vollständiger Real-Gemini-FSA-Smoke ist grün mit `gemini-2.5-flash-lite` und persistentem Profil `output/playwright/browser-fsa-manual-profile`. Summary: `output/playwright/browser-real-gemini-fsa-smoke-20260602-123036.json`; Screenshot: `output/playwright/browser-real-gemini-fsa-smoke-20260602-123036.png`. Ergebnis: echter System-Chrome, `reloadWorkspaceRestored=true`, `clientToolExecutorActive=true`, `filesVerified=true`, `contentMarkersVerified=true`, `missingPathsVerified=true`. Erzeugte echte Zielartefakte: Markdown, HTML, JSON, `tool-log.md`, `uebung-umbenannt.md`; gelöschte Pfade `uebung-original.md`, `temp-loeschen.md`, `temp-ordner` fehlen korrekt. `tool-log.md` enthält `READ_OK`, `RENAME_OK`, `DELETE_OK`.
- System-Chrome darf nie automatisch das Alltagsprofil des Nutzers bedeuten. Nutze ein temporäres Profil. Das normale Nutzerprofil nur verwenden, wenn es ausdrücklich gewünscht ist.
- CDP-Modus kann Vite-Import-Abbrüche oder Ladehänger zeigen; dafür Reload-Retry einbauen und Failure-Artefakte behalten.
- Cleanup von Chrome-Temp-Profilen kann an gesperrten Crashpad-Dateien scheitern; Cleanup-Fehler dürfen den echten Testfehler nicht verdecken.

## Mimo-/FSA-Findings 2026-06-02

- Xiaomi MiMo Non-Pro ist für NoteDrill über den OpenAI-kompatiblen Endpoint `https://api.xiaomimimo.com/v1` mit Modell `mimo-v2.5` nutzbar. Für Xiaomi muss zusätzlich zum üblichen Bearer-Header der offizielle Header `api-key` gesetzt werden. Direkter API-Call und NoteDrill-Provider-Test waren grün.
- Bestes Prompt-Finding: Chrome speichert FSA-/Notification-Berechtigungen im isolierten Testprofil unter `Default/Preferences` in `profile.content_settings.exceptions`, unter anderem `file_system_access_chooser_data`, `file_system_access_extended_permission`, `file_system_last_picked_directory` und `notifications`. Der stabile Runner-Pfad seedet vor Chrome-Start exakt Origin und Zielordner, statt den nachgelagerten `Dateien bearbeiten`-Prompt jedes Mal per UIAutomation klicken zu müssen.
- Erfolgsbefund `20260602-125626`: Picker-/FSA-Oberflächentest mit persistentem Testprofil, System-Chrome und Xiaomi MiMo `mimo-v2.5` war grün. Summary: `output/playwright/browser-real-gemini-fsa-picker-20260602-125626.json`; Screenshot: `output/playwright/browser-real-gemini-fsa-picker-20260602-125626.png`. Ergebnis: `selectedWorkspaceName=Testordner`, `reloadWorkspaceRestored=true`, `clientToolExecutorActive=true`, kein sichtbarer Chrome-Zulassen-Prompt.

## Edge Notes UI Findings 2026-06-02

- Wenn der Nutzer Edge als Browserpfad wünscht, Inline-Node-Runner mit `chromium.launch({ channel: 'msedge' })` verwenden. Edge `148.0.3967.96` startete stabil im NoteDrill-Smoke.
- Frische Edge-/TanStack-Smokes gegen `/notes` brauchen denselben Offline-Testnutzer wie die bestehenden Browser-Smokes: `offlineTestUser.id = "local"` und `notedrill-learning-profile` mit `{ state, version: 2 }`. Ohne diesen Seed kann `/notes` bei `Notizen werden geladen...` stehen bleiben.
- Der Inline-Create-Popover ist in Playwright nach `fill()` timingempfindlich. Stabiler Ablauf: `button[title="Neu erstellen"]`, `input[placeholder="Notiz-Titel..."]` füllen, kurz warten, `OK` klicken, nach etwa 1 Sekunde prüfen, ob das Formular noch offen ist, dann Titelfeld erneut fokussieren und `Enter` nachlegen. Danach auf `.ProseMirror`, `Notiz erstellt!` oder den Titel warten. Nicht aus einem einzelnen schnellen `OK`-Klick auf einen Produktfehler schließen.
- Auf `localhost`/`127.0.0.1` zeigt der KI-Schlüssel-Managementdialog weiter einen lokalen CLI-Tab, startet im Browser aber standardmäßig im Tab `API Keys`. Der lokale Tab heißt `Lokale CLI`, nicht mehr `Desktop CLI`, und erklärt sichtbar: Lokale Programme laufen nur auf diesem Gerät über `localhost`; auf der normalen Website nutzt man API-Keys. Edge-Nachweis: `output/playwright/edge-api-dialog-local-cli-label-result-757360.json`, Screenshot `output/playwright/edge-api-dialog-local-cli-label-757360.png`.
- Im Provider-Verzeichnis keine breiten Locators wie `div:has-text("Xiaomi MiMo") button:has-text("Verbinden")` nutzen; große Container enthalten mehrere Anbieter und können Google treffen. Den konkreten Zeilen-Button über die Providerzeile markieren oder eng scopen.
- Xiaomi/GLM/MiniMax-Preset-Smoke im Managementpfad: `API Keys`-Tab zeigt `Xiaomi MiMo`, `GLM`, `MiniMax`; `Xiaomi MiMo -> Verbinden` öffnet QuickAdd im Tab `Andere` mit Endpoint `https://api.xiaomimimo.com/v1`, Modell `mimo-v2.5`, Key-Platzhalter `z.B. sk-...`; Modell-ID bleibt als freies Eingabefeld editierbar.
- Bubble-Menü-Smoke in Edge: Text in `.ProseMirror` markieren, dann müssen die Kurzlabels deutsch sichtbar sein: `Kürzer`, `Länger`, `Korr.`, `Format`, `Lernen`, `Quiz`, `Prüfen`, `Diagramm`, `Karten`. No-Key-Klick auf `Kürzer` muss sichtbar mit `Kein KI-Provider konfiguriert` scheitern, nicht still hängen.
- Für Edge-/PowerShell-Inline-Runner mit deutschen Bubble-Labels Umlaute in Assertions besser per Unicode-Escapes schreiben und Buttontexte scopen. `innerText` kann durch CSS-Texttransformation `KÜRZER` statt `Kürzer` liefern; Body-weite Negativchecks sind zu grob, weil `LEARN & GROW` im Logo und `Graph` im Testtext vorkommen können.
- Fake-Workspace-Metadaten im `notedrill-workspace-store` reichen im Browser nicht, um einen aktiven Notes-Root oder Mirror-Fehler zu simulieren. `mergeWorkspaceAccessRoots` übernimmt persistierte Roots in Chrome/Edge absichtlich nur, wenn ein echter FSA-Grant aus IndexedDB über `fetchWorkspaceRoots` existiert. Diagnose: `output/playwright/edge-workspace-store-seed-diagnostic-922905.json`, Nachtest nach Hydration-Refresh: `output/playwright/edge-sidebar-fake-workspace-mirror-error-result-179967.json`.
- No-Workspace-Hinweis in Edge ist grün: Frischer Edge-Kontext mit Offline-Testnutzer, aber ohne Workspace-Grant, zeigt `Ordner auswählen` plus Beschreibung und bleibt nicht leer. Artefakt: `output/playwright/edge-notes-no-workspace-hint-result-332655.json`, Screenshot `output/playwright/edge-notes-no-workspace-hint-332655.png`.
- Multi-Action-Smokes in Edge nicht mehr zwingend auf eine frisch erstellte Notiz mit `.ProseMirror`-Wait `visible` aufbauen. Stabiler ist: UI-Ready bis 60 Sekunden, vorhandene Testnotiz wiederverwenden oder nach Create auf `.ProseMirror` `attached`, Toast `Notiz erstellt!` oder Titel warten. Diagnose-Erfolg nach Devserver-Neustart: `output/playwright/edge-create-debug-after-submit-968393.png`.
- Zusatz 2026-06-02 nach Bubble-Layout-Refactor: In frischen Edge-Profilen ohne Workspace-Grant kann der `Neu`-Popover trotz gefülltem Titel und `OK` offen bleiben; auch `form.requestSubmit()` plus 5 Sekunden Wartezeit erzeugte keine `.ProseMirror`. Artefakte: `output/playwright/edge-bubble-layout-refactor-result-490302.json`/`.png` und `output/playwright/edge-bubble-layout-refactor-result-775903.json`/`.png`. Nicht weiter für reine Bubble-/Layout-Regressionschecks am Create-Popover hängen.
- Frisches Edge-SQLocal-Seeding ist ebenfalls kein stabiler Bubble-Layout-Gate: `createNoteLocal` scheiterte an `no such table: timetable_entries`, Direct-Insert plus `?openNoteId=1` verlor den Datensatz wegen nicht persistenter OPFS/SQLocal-Daten, und Direct-Insert plus In-Page-Refresh/Event lief in `Access Handles cannot be created if there is another open Access Handle`. Artefakte: `output/playwright/edge-bubble-layout-seeded-result-975002.json`, `output/playwright/edge-bubble-layout-seeded-result-071162.json`, `output/playwright/edge-bubble-layout-inpage-seed-result-515163.json`. Nicht wiederholen: keine weiteren Bubble-Smokes über frisches Edge-SQLocal-Seeding, wenn der eigentliche Beweis nur Bubble-Layout ist.
- Das persistente FSA-Testprofil `output/playwright/browser-fsa-manual-profile` kann mit Edge den Workspace `Testordner` laden, aber breite Tree-Klicks öffnen zuerst Ordner wie `faecher`; selbst der sichtbare `index.md`-Klick öffnete in diesem Profilzustand keinen `.ProseMirror`-Editor. Artefakte: `output/playwright/edge-bubble-layout-persistent-profile-result-784288.json` und `output/playwright/edge-bubble-layout-indexmd-result-924704.json`. Für reine Bubble-Regressionschecks vorhandene offene Notiz, einen dedizierten Search-Param-/Dev-Hook oder den bereits grünen Bubble-Edge-Run nutzen, statt weiter an Workspace-Datei-Open-Gates zu drehen.
- Search-Param-Hook für reine Edge-Bubble-Smokes Stand 2026-06-02: `http://127.0.0.1:3005/notes?ndBubbleSmoke=1` rendert im Development den `BubbleMenuSmokeHarness` mit echter TipTap-Instanz und bestehendem `TiptapBubbleMenu`, ohne DB-Notiz, SQLocal-Seeding, Workspace-Grant oder API-Key. Der erste Run bewies, dass `window.location.search` korrekt war, aber der Harness nicht renderte (`output/playwright/edge-bubble-smoke-param-result-986322.json`, Diagnose `edge-bubble-smoke-param-diagnostic-result-261707.json`); Root Cause war der nicht robuste Prop-Pfad aus TanStack/Next-Bridge. Fix: Server-Param robust normalisieren und im Client dev-only `window.location.search` fallbacken. Grüne Artefakte: Sichtbarkeit/Labels `output/playwright/edge-bubble-smoke-param-diagnostic-result-429626.json`, Kernklicks mit `Quiz`/`Prüfen`/`Diagramm`/No-Key-`Kürzer` `output/playwright/edge-bubble-smoke-param-click-result-507033.json`, `LERNEN -> Analogie` `output/playwright/edge-bubble-smoke-param-learn-result-873698.json`, `CHAT`-Dropdown `output/playwright/edge-bubble-smoke-param-chat-result-944447.json`. Nicht wiederholen: Chat und Lernen nicht in einem engen Ablauf mit `Escape` zwischen Radix-Dropdowns prüfen; Flyout-Optionen gezielt als Button im Popover klicken.
- No-Key-Bubble-Aktionen in Edge Stand 2026-06-02: `Kürzer`, `Länger`, `Korr.`, `Format` geben No-Key-Feedback; `Lernen`, `Diagramm`, `Karten` öffnen ihre Dialog-/Flyout-Pfade; `Prüfen` öffnet einen Dialog/API-Key-Pfad. Targeted Unicode-Run: `output/playwright/edge-missing-actions-result-255939.json`.
- Chat-/Lernen-Nachtest in Edge Stand 2026-06-02: Das volle Bubble-Menü zeigt jetzt auch `CHAT`. `LERNEN` öffnet den Lern-Flyout, `CHAT` öffnet den Open-In-Dropdown mit `NoteDrill AI Chat`. Artefakt: `output/playwright/edge-after-user-restart-chat-dropdown-result-036543.json`, Screenshot `output/playwright/edge-after-user-restart-chat-dropdown-036543.png`. Root Cause vor Fix: `ChatDropdownButton` war nicht in `TiptapBubbleMenu` eingebaut; danach blockierte `keepBubbleAliveOnPointerDown` den Radix-Dropdown-Trigger. Stabiler Fix: Chat-Dropdown-Trigger mit Datenattribut markieren und genau diesen `pointerdown` durchlassen.
- Inline-Modellwahl-Nachweis in Edge Stand 2026-06-02: Frischer Edge-Kontext mit Offline-Testnutzer, Fake-OpenAI-kompatiblem MiMo-Provider im `note-drill-ai-providers`-Store und Selection-Key `openrouter-xiaomi-mimo-edge-smoke::mimo-v2.5-edge-smoke` klickte im echten Bubble-Menü `Kürzer`. `/api/ai/text-edit/stream` wurde lokal abgefangen. Ergebnis grün: Request enthält `action=shorter`, genau einen `openrouter`-Provider, Endpoint `https://api.xiaomimimo.com/v1`, Modell `mimo-v2.5-edge-smoke` und den markierten Lerntext. Artefakt: `output/playwright/edge-inline-provider-payload-green-result-103855.json`, Screenshot `output/playwright/edge-inline-provider-payload-green-103855.png`. Nicht auf `customModel/config.customModel` als Pflichtfeld prüfen; nach Normalisierung reichen `model` plus `endpoint`.
- MiMo/OpenAI-kompatibler Ergebnislauf in Edge Stand 2026-06-02: `?ndBubbleSmoke=1` plus `ProviderStorage`-Legacy-Seed für `Xiaomi MiMo`, Endpoint `https://api.xiaomimimo.com/v1`, Modell `mimo-v2.5`, kein echter User-Key. Klick auf `Kürzer` erreichte `/api/ai/text-edit/stream` mit `200 OK`; der Review-Dialog zeigte `Genutzt: Xiaomi MiMo · mimo-v2.5`; keine API-Limit-/Quota-Verwirrung, kein Key-Leak, keine Page Errors. Finaler Nachtest nach Dialog-A11y-Fix: `output/playwright/edge-mimo-inline-a11y-result-390300.json`, Screenshot `output/playwright/edge-mimo-inline-a11y-390300.png`, `missingDescriptionWarningCount=0`. Vorlauf: `output/playwright/edge-mimo-invalid-key-inline-result-621667.json`. Locator-Hinweis: In PowerShell-Node-Smokes deutsche Kurzlabels nicht roh als Uppercase-Umlautliteral verwenden; für `Kürzer` war `button` + `/rzer/i` stabil.
- Quick-Provider-Nachweis in Edge Stand 2026-06-02: Der dev-only Search-Param `?ndBubbleSmoke=1&ndBubbleSmokeQuick=1` rendert den Bubble-Smoke im Quick-Mode. Fake-MiMo-Provider im `note-drill-ai-providers`-Store plus Selection-Key `openrouter-xiaomi-mimo-edge-smoke::mimo-v2.5-edge-smoke` bewies für `Quiz`, `Prüfen`, `Diagramm` und `Lernen -> Analogie`, dass die Quick-Handler Provider-ID, Typ `openrouter`, Endpoint `https://api.xiaomimimo.com/v1` und Modell `mimo-v2.5-edge-smoke` erhalten. Artefakt: `output/playwright/edge-bubble-smoke-quick-provider-result-007014.json`, Screenshot `output/playwright/edge-bubble-smoke-quick-provider-007014.png`. Locator-Hinweis: `Prüfen` per ARIA-Name `Lerncheck erstellen` klicken; `Lernen` im Harness über sichtbaren Buttontext scopen, nicht per `getByRole(.../lernen/)`.
- Edge-Quick-Smokes ohne FSA brauchen keinen persistenten Kontext. Ein erneuter Frühabbruch mit `chromium.launchPersistentContext(..., { channel: 'msedge' })` schloss den Kontext vor dem Harness (`output/playwright/edge-bubble-smoke-quick-provider-result-120875.json`), ohne App-Fehler. Stabiler Ansatz: `chromium.launch({ channel: 'msedge' })`, dann `browser.newContext()` und localStorage per `context.addInitScript` seeden. Persistente Profile nur für FSA-/IndexedDB-Handle-Gates nutzen.
- Für den Search-Param-Harness nicht auf `[data-testid="nd-bubble-smoke-editor"] .ProseMirror` mit `visible` warten. Lauf `output/playwright/edge-bubble-smoke-quick-provider-result-320282.json` zeigte im Screenshot bereits Harness, markierten Lerntext, Bubble-Menü und `Quick-Mode`, scheiterte aber an diesem zu strengen Locator. Stabiler Gate: Harness-Ready, Body-Text `Lineare Funktionen`, Quick-Mode-Label und konkrete Bubble-Buttons.
- API-Key-Provider für Edge-Smokes über `ProviderStorage`-Legacy-Format seeden, nicht als Zustand-Wrapper: `note-drill-ai-providers = { providers, config, version, timestamp }`. Lauf `output/playwright/edge-bubble-smoke-quick-provider-result-714065.json` feuerte alle Quick-Events, aber ohne Provider-Metadaten, weil `{ state: { providers } }` von `ProviderStorage.loadProviders()` als leerer Store behandelt wurde.
- Wenn `chromium.launch({ channel: 'msedge' })` den Kontext vor dem Harness schließt, nicht denselben Startpfad retryn. Lauf `output/playwright/edge-bubble-smoke-quick-provider-result-031966.json` hatte keine App-Errors und keinen hängenden Edge-Prozess. Nächster stabiler Edge-Ansatz: expliziten `msedge.exe`-Pfad mit frischem temporärem Profil starten, weiterhin kein normales Nutzerprofil.
- Expliziter `msedge.exe`-Pfad ist für denselben Quick-Smoke ebenfalls kein weiterer Produktbeweis, wenn der Harness nicht erscheint (`output/playwright/edge-bubble-smoke-quick-provider-result-311725.json`). Für den bereits grünen Quick-Provider-Beweis `007014` nicht weiter Startpfade drehen; nur bei neuem Codeverhalten oder echtem MiMo-Key neu laufen lassen.
- Kritischer UX-Befund: `Quiz` ohne API-Key darf nicht als `API-Limit erreicht` oder Gemini-Kontingent-Problem erscheinen. Wenn der Log `Kein API-Key hinterlegt`/`No active AI providers configured` meldet, muss der UI-Pfad API-Key-Dialog oder klaren No-Key-Hinweis zeigen, nicht OpenRouter-/Quota-Fallback. Fehlerartefakt vor Fix: `output/playwright/edge-multi-action-result-089540.json`.
- Fix-Nachweis: Edge-Run `output/playwright/edge-quiz-no-key-a11y-clean-result-978676.json` ist grün. `Quiz` ohne Key zeigt `Kein KI-Zugang eingerichtet`, öffnet den API-Key-Dialog direkt im Tab `API Keys`, zeigt Xiaomi MiMo/GLM/MiniMax im Anbieter-Verzeichnis und zeigt kein `API-Limit erreicht`. `dialogWarningCount=0`, nachdem `CreateQuizDialog` Radix-Title/Description direkt im `DialogContent` nutzt und die zwei kleinen `p`-Überschriften mit innerem `div` zu `div` geändert wurden.

## Electron/OpenCode Diagramm-Findings 2026-06-03

- Für NoteDrill-Diagrammtests über die echte Desktop-Oberfläche den bestehenden Port `3005` wiederverwenden, wenn er bereits auf `127.0.0.1:3005` lauscht. Nicht blind `pnpm dev` starten. Stabiler Einstieg: `pnpm run electron:pwcli -- --help`, dann `pnpm run electron:pwcli:snapshot`.
- `electron:pwcli wait-for` nutzt benannte Optionen: `--text`, `--textGone`, `--time`. Nicht `text=...` als Selector-Argument übergeben.
- Für User-Vorgabe „MiMo V2.5 über OpenCode Free“ in der Chat-Modellliste die Free-Option `cli:opencode/mimo-v2.5-free` unter `OpenCode CLI` auswählen. Nicht die ähnlich benannte Go-Abo-Variante nehmen.
- Lange JSON-lastige Prompts nicht mit `electron:pwcli type` oder langen `run-code`-Argumenten senden. PowerShell/Pnpm/CLI kann Quotes beschädigen und alte Rich-Text-Eingaben können hängen bleiben. Stabiler Pfad: neuen Chat starten, Prompt per `Set-Clipboard`, Editor fokussieren, `Control+A`, `Backspace`, `Control+V`, Snapshot prüfen, dann Sendebutton klicken.
- MiMo V2.5 Free erzeugte beim 9-Varianten-Diagrammtest parsebares JSON, aber trotz Prompt in Markdown-Codefence und mit kleinen Schemafehlern wie falscher Kanten-ID. Parser müssen daher Codefences strippen, eingebettete JSON-Blöcke extrahieren, Kanten mit unbekannten Endpunkten verwerfen und optionale Kantenlabels akzeptieren. Artefakte: `.playwright-cli/snapshot-40.yml`, `.playwright-cli/page-2026-06-03T00-18-43-199Z.txt`, `.playwright-cli/output/playwright/electron-prompt-pasted-2026-06-03.png`, `.playwright-cli/output/playwright/electron-mimo-json-stream-2026-06-03.png`.
- Workspace-Gate im echten Electron-Chat: Wenn `Submit blockiert: Kein Workspace-Ordner` erscheint, den sichtbaren App-Dialog `Ordner-Freigabe nötig -> Ordner auswählen` oder den No-Workspace-Button nutzen und den nativen `Workspace-Ordner auswählen`-Dialog mit `scripts/e2e/electron-select-workspace-folder.ps1` behandeln. In einem Windows-Dialog kann `-Mode select` an einem schreibgeschützten Pfadfeld scheitern; wenn die Adresszeile eindeutig den gewünschten Workspace zeigt, ist `-Mode confirm-current` der stabile Pfad. Artefakte: `.playwright-cli/snapshot-29.yml`, `.playwright-cli/snapshot-5.yml`, Task `docs/diagram-system-excalidraw/tasks/2026-06-03-diagrammformat-auswahl-ki-ui-goal.md`.
- Frisch erzeugte kompakte `.excalidraw`-Dateien können in der Sidebar sichtbar werden, während ein direkter Öffnen-Klick in derselben Electron-Session noch am Hinweis `Datenbank wird noch geladen` hängt. Nicht durch wiederholte Klicks beweisen. Für kompakte `ndx-v0.1`-Payloads ist der stabile Render-Gate: `parseCompactDiagramContent` -> `convertCompactDiagramToExcalidraw` -> `parseExcalidrawLax` -> `parseDiagramData`; erst danach einen separaten Viewer-/DB-Import-Flow prüfen. Artefakte: `.playwright-cli/snapshot-29.yml`, `.playwright-cli/snapshot-34.yml`, `.playwright-cli/output/playwright/electron-mimo-diagram-json-success-2026-06-03.png`.

- MiMo/OpenCode-Chat-Bridge-Finding 2026-06-03: Eine echte CLI-Session-ID im Log reicht nicht als Erfolg. Fehlerbild vor Fix: `CLIENT: Session = ...`, MiMo-Antwort im Browser-Log, aber im Chat nur Systemstatus oder leerer Editor; Verlauf blieb `0 Einträge`. Root Cause: `activeSessionId` kann im Embedded-Chat temporär `null` sein, während `chatRuntimeSessionId`/Chat-Store-Slices laufen; ein Lifecycle-Sync setzte den sichtbaren Store wieder auf `null`, und globale `messagesRef.current`-Resets konnten den aktuellen CLI-Turn mit alten Fallback-Messages überschreiben. Stabiler Fix: Lifecycle auf `chatRuntimeSessionId ?? activeSessionId` synchronisieren, pro CLI-Turn lokalen Message-Snapshot nutzen, Zielsession im Agent-Store bei Bedarf lokal erhalten und `messageCount` aus sichtbaren User-/Assistant-Messages aktualisieren. Grüner Nachweis: `.playwright-cli/snapshot-28.yml` zeigt `Verlauf: 1 Einträge`, `Neuer Chat, 8 Nachrichten`, Userprompt `Verlauf-Sichttest-3...` und finale MiMo-Antwort `Verlauf sichtbar`.

- MiMo/OpenCode-Chat-History-Finding 2026-06-03: Nach HMR oder Service-Refresh kann die finale MiMo-Antwort sichtbar im Chat bleiben, während `AgentSessionSidebarSection` wieder `0 Einträge` zeigt. Der direkte Store-Import per `/lib/stores/...` kann in Vite/HMR zudem eine andere Modulinstanz lesen und ist dann nicht allein beweiskräftig; der DOM-Snapshot der Verlaufsliste ist der Abnahmebeweis. Stabiler Fix: `EmbeddedChatView` registriert sichtbare Runtime-Chatmessages erneut im `agent-session-store`, wenn der Verlauf die aktive Chat-Session verliert. Grüner Nachweis: `.playwright-cli/snapshot-62.yml`, `.playwright-cli/snapshot-63.yml` und `.playwright-cli/snapshot-64.yml` zeigen `Verlauf: 1 Einträge`, `4 Nachrichten` und die finale MiMo-Antwort `Verlauf sichtbar`.

- Kalender-Pill-Overlay-Finding 2026-06-03: Die globale `KalenderFloatingPill` unten rechts kann Bottom-Right-CTAs blockieren. Beobachtet auf Electron `http://localhost:3005/quiz/local/1`: Detailseite war geladen, aber ein normaler Klick auf `Quiz starten` scheiterte, weil die Pill `Gleich: Mathematik` Pointer-Events abfing. Nicht per Force-Click oder Koordinatenklick umgehen. Stabiler Fix: Pill aus der Buttonzone verschieben (`bottom-20 right-4`) und danach normal klicken. Nachweis: `.playwright-cli/snapshot-4.yml` Detailseite, normaler Klick auf `e194`, `.playwright-cli/snapshot-5.yml` Spielmodus `Frage 1 von 8`.

## Browser-UI-Nonstop-Findings 2026-06-03

- Für Browser-Spiel-Smokes mit SQLocal-Seeding nicht unnötig über `/dashboard` starten, wenn nur lokale Spieltabellen gebraucht werden. Dashboard-Aggregate können während früher Schema-/Seed-Momente zusätzliche Kontextabfragen auslösen. Stabiler Einstieg: leichte Zielroute wie `/crossword/hub`, `/learning-cards/session` oder ein dedizierter Dev-Harness, danach im selben Origin-Kontext `initSQLocalDatabase()` und `getRawClient().driver(...)` nutzen.
- SQLocal-`driver(..., 'all')` kann Ergebnisse als `{ rows: unknown[][], columns: string[] }` liefern. Direkt-Seed-Runner dürfen `rows` nicht blind als Objektzeilen behandeln. Stabiler Ansatz: Wenn `columns` vorhanden und die erste Row ein Array ist, per `Object.fromEntries(columns.map((column, index) => [column, row[index]]))` normalisieren. Fehlerbild bei Kreuzwort-Seed: `last_insert_rowid()` wurde sonst als `0` gelesen und `/crossword/play/0` lud keinen `CrosswordPlayClient`.
- Bei direkten Raw-SQL-Seeds für SQLite-Spalten mit Drizzle-`integer(..., { mode: 'timestamp' })` Sekundenwerte nutzen (`Math.floor(Date.now() / 1000)`), nicht Millisekunden. Millisekunden können im UI-Datum als extrem fernes Jahr erscheinen, obwohl das Produkt selbst mit Drizzle-`Date`-Werten korrekt arbeitet.
- Für Kreuzwort-Smokes reichen kleine lokale Puzzle-JSONs im bestehenden `crossword_puzzles.grid_data`: ein waagerechtes Wort kann direkt per Tastatur getippt werden; ein reines senkrechtes Wort braucht vor dem Tippen einen normalen `Space`-Richtungswechsel. Gewinnbeweis: `Rätsel gelöst!`, `Noch einmal spielen`, `ZEIT`, `TREFFER`, keine englischen Gewinnlabels und keine Console/Page-Errors.

- Notes-Sidebar-Zeilenbadge-Finding 2026-06-03: Für echte Workspace-Sidebar-Smokes ohne neuen nativen Picker das persistente FSA-Profil `output/playwright/browser-fsa-manual-profile` mit System-Chrome wiederverwenden. Setup: Dev-Server `http://127.0.0.1:3005/notes`, Workspace `C:\Users\PC1\Documents\Testordner`, Testdateien `faecher/mathematik/zeilenbadge-test-760-20260603.md` und `faecher/mathematik/zeilenbadge-test-2101-20260603.md`. Ergebnis: Badges `760 Z` und `2101 Z`, gelb unter 2000 (`border-status-warning`) und rot über 2000 (`border-status-error`), Tooltip `über 700 Zeilen`, Schnellfilter `über 700 Zeilen` blendet kurze Markdown-Dateien sowie JSON/HTML-Artefakte aus und lässt nur große Markdown-Dateien mit Ordnerkontext sichtbar. Artefakte: `output/playwright/zeilenbadge-badges-visible-recount-20260603.png`, `output/playwright/zeilenbadge-schnellfilter-final-20260603.png`, `output/playwright/zeilenbadge-warning-mode-final-20260603.png`. Root Cause/Not repeat: Einen finalen Datei-Newline nicht als zusätzliche sichtbare Zeile zählen; keine Fake-Workspace-Metadaten für FSA-Smokes nutzen. Nächster stabiler Ansatz: Erst persistenten echten FSA-Handle laden, dann gezielt Testdateien im bestehenden Workspace anlegen und nach dem Test Schnellfilter/Anzeigeprofil zurücksetzen.

## Real Gemini/FSA Smoke

Der echte Runner ist:
`scripts/e2e/browser-real-gemini-fsa-smoke.ts`

Der Runner öffnet Real-FSA-Läufe mit `?fsaGrantGoal=1`, damit Failure-Artefakte den `WorkspaceGrantCockpit`-Status und `nd:fsa-grant-status:last` enthalten.

Zuerst Check-Modus nutzen:

```powershell
pnpm run test:e2e:real-gemini-fsa:check
```

Picker-only-Modus für den echten Grant ohne Modellcall nutzen:

```powershell
$env:ND_E2E_USE_SYSTEM_BROWSER='1'
$env:ND_E2E_WORKSPACE_PATH='C:\Users\PC1\Documents\Testordner'
pnpm run test:e2e:real-gemini-fsa:picker
```

Dieser Modus mockt keinen File-System-Handle. Ein lokaler Platzhalter-Provider darf nur das Onboarding überspringen; Erfolg zählt erst, wenn Chrome einen echten `FileSystemDirectoryHandle` liefert und der Runner Reload plus aktiven Client-Tool-Executor bestätigt.

Offizielles lokales Manual-Assist-Gate:

- Vorher `pnpm run test:e2e:real-gemini-fsa:check` ausführen.
- Dann System-Chrome mit langem Picker-Wartefenster starten:

```powershell
$env:ND_E2E_USE_SYSTEM_BROWSER='1'
$env:ND_E2E_WORKSPACE_PATH='C:\Users\PC1\Documents\Testordner'
$env:ND_E2E_PICKER_WAIT_MS='600000'
pnpm run test:e2e:real-gemini-fsa:picker
```

- Der Nutzer bestätigt im sichtbaren nativen Chrome-Dialog exakt `C:\Users\PC1\Documents\Testordner`.
- Im manuellen Picker-Modus gibt der Runner vor dem Klick einen klaren `MANUAL-ASSIST AKTIV`-Hinweis mit Zielordner, Chrome-Bestätigung und Wartezeit aus und erinnert direkt nach dem Klick daran, den nativen Dialog sichtbar zu bestätigen.
- Erfolg zählt nur mit Summary `reloadWorkspaceRestored: true` und `clientToolExecutorActive: true`.
- Das Summary muss außerdem `browserUserDataDir`, `browserProfileSource` und `browserProfilePersistent` enthalten, damit klar ist, wo der echte IndexedDB-Handle liegt.
- Wenn kein Nutzer aktiv bestätigen kann, nicht weiter Timings, CDP oder UIAutomation gegen denselben Desktop drehen. Dann ist der echte Grant nicht bewiesen.

Real-Modus nur nutzen, wenn ein echter API-Key temporär gesetzt ist und die Ordnerfreigabe bestätigt werden kann:

```powershell
$env:ND_E2E_GEMINI_API_KEY='<transient key>'
$env:ND_E2E_GEMINI_MODEL='gemini-2.5-flash'
$env:ND_E2E_WORKSPACE_PATH='C:\Users\PC1\Documents\Testordner'
pnpm run test:e2e:real-gemini-fsa
```

Für experimentelle CDP-/Native-Picker-Läufe die exakten Env-Flags vor Wiederholung in der Masterplanung dokumentieren.

Optionale Flags:

- `ND_E2E_AUTO_PICKER=1`: versucht gescopt Windows-UIAutomation für das temporäre Testprofil.
- `ND_E2E_ALLOW_VISIBLE_PICKER_AUTOMATION=1`: erlaubt zusätzlich einen sichtbaren-Picker-Fallback, nur wenn Titel/Scope passen und genau ein Kandidat sichtbar ist. Bei mehreren passenden Dialogen muss der Runner abbrechen. Nicht als Standard nutzen.
- `ND_E2E_USE_BROWSER_CDP=1`: startet/attached an System-Chrome per CDP; bei Ladehängern Failure-Artefakte behalten.
- `ND_E2E_PICKER_WAIT_MS=600000`: langer manueller Picker-Wartepfad, wenn der Nutzer den Ordner selbst auswählt.

## Stop Conditions

Wenn derselbe Browserfehler zweimal auftritt:

1. Experimente stoppen,
2. Finding in aktive Task/Masterplanung schreiben,
3. offizielle Docs oder bekannte Issues recherchieren,
4. zwei oder drei Ansätze vergleichen,
5. dann mit dem kleinsten stabilen Pfad weitermachen.

Nicht blind weiter Timings, Retries oder Fensterfokus drehen.
