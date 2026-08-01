# Werkzeugfallen — voxel-samurai-quiz (AEON)

**Lesen wenn:** du ein Welt-CLI aufrufst, eine Sonde schreibst, eine `.mjs`/Shader-Datei schreibst, die
SSoT-Tabelle anfasst oder committen willst.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe
[LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

Jede Zeile hier hat mindestens einen Durchgang gekostet. Zusammen sind sie der billigste Teil der Wissensbasis.

## Aufruf

- **`pnpm world:probe <welt> -- <probe>` schlägt fehl** — das installierte pnpm reicht `--` wörtlich durch,
  es wird als Skriptname gelesen, Exit 2. → `node scripts/world/run.mjs probe v73-ashen-coast probes/<x>.mjs`.
  *2026-08-01*

- **Nicht-Probe-Tools brauchen umgekehrt beides** — `pnpm world:obstruction -- --selftest` gibt Exit 1 und
  druckt Usage; das sieht wie ein Gate-Ausfall aus und ist keiner. → `pnpm world:obstruction v73-ashen-coast
  -- --selftest`. **Die Welt-Id ist Pflicht, nicht defaulted** — das gilt auch für `world:winding` und
  `world:stand`.
  *Eine falsche Usage-Zeile im P14p-Protokoll hat einen Durchgang gekostet · 2026-08-01*

- **Ausgaben der Weltskripte enthalten NUL-Bytes** — `grep` meldet „Binary file matches" und zeigt nichts.
  → `… | tr -d '\000' | grep -a …`.
  *2026-08-01*

- **`run_in_background` ist hier dreimal ohne Ausgabe gestorben** — Sonde scheinbar hängend, kein Fehler.
  → Sonden im Vordergrund fahren, Timeout großzügig. Ein voller 14-Zeilen-Lauf dauert ~29 s, mit `--site`
  ~22 s; `camwall.mjs` kostet 101 s gegen 25 s bei `playpass`.
  *2026-08-01*

- **Auf Port 3074 läuft ein `dev:aeon` — nicht neu starten, nie zwei parallel** — beide Server backen in
  dasselbe `public/aeon-world/`. → Vor einem Build prüfen, dass 3074 frei ist; `pnpm dev` und `pnpm dev:aeon`
  schließen einander aus. Jeder Sondenlauf öffnet ohnehin seine **eigene** kurzlebige Instanz; parallel
  spielen verschiebt keine Zahl.
  *2026-08-01*

- **Dev (3074) und Preview (4177) binden nur `::1`** — `127.0.0.1` gibt `ECONNREFUSED`. → Node-seitige Probes
  gegen `http://[::1]:<port>`; Browser-Tools dürfen `localhost` nehmen, weil Chrome beide Familien probiert.
  *2026-08-01*

- **Kein eigener Browser, keine Playwright-CLI, kein OS-Screengrabber** — ein sichtbares Fenster stürzt die
  Maschine des Users ab. → Ausschließlich `world:probe`, `world:capture`, `world:smoke`; die starten ihr
  eigenes kurzlebiges `--headless=new`-Chrome.
  *In P14g wurde eine Pointer-Lock-Sonde mit sichtbarem Chrome deshalb wieder entfernt · 2026-08-01*

## Schreiben

- **`node --check` fängt keine NUL-Bytes** — die Datei parst und die Ausgabe ist Müll. → Nach **jedem**
  `Write` auf eine `.mjs`:
  `node -e "console.log(require('fs').readFileSync(p).indexOf(0))"` muss `-1` liefern.
  *2026-08-01*

- **`GrassField.js` ist ein Template-Literal** — ein Backtick im Shader-**Kommentar** schließt den Shader,
  und `node --check` meldet ein kryptisches `Unexpected identifier`. → Nach jeder Shader-Bearbeitung
  `node --check`.
  *Hat in P14n, P14o und P14q je einen Durchgang gekostet · 2026-08-01*

- **Grep-Ausgaben von `CameraRig.js` nicht als Quelltext zitieren** — das Werkzeug stellt dort `//` als `\`
  dar. → Direktes `Read` ist korrekt.
  *2026-08-01*

- **Die SSoT-Tabelle ist an zwei Stellen zerbrechlich** — eine Leerzeile spaltet sie, und ein unescaptes `|`
  schneidet die Zeile beim Rendern nach der dritten Zelle ab, still. → Jedes `|` im Fließtext als `\|`,
  danach gegenzählen: `grep -oF '|'` minus `grep -oF '\|'` muss je `| P…`-Zeile **4** ergeben.
  **awk, sed und perl zählen hier falsch**, weil sie `\|` als Alternation lesen.
  *Die P15b-Zeile verlor dadurch **~3 400 Zeichen** beim Rendern, unbemerkt · 2026-08-01*

## Artefakte und Git

- **`review/probe/` wird von jedem Sweep überschrieben** — der Beleg ist weg, bevor er zitiert wird. → Vor
  dem nächsten Lauf nach `.tmp/` kopieren.
  *2026-08-01*

- **`git checkout` würde den uncommitteten Migrationsstand vernichten** — `src/engine/`, `scripts/world/`,
  `scripts/engine/`, `public/aeon-world/` und `vite.aeon.config.js` sind **untracked**, `git diff` zeigt die
  Migration also gar nicht. → Für Gegenmessungen die Datei nach `.tmp/` sichern, zurückschreiben und per
  `diff` byte-identisch verifizieren. **Nie `git checkout` als Undo.**
  *2026-08-01*

- **`/review/` und `/refs/` mit führendem Slash in `.gitignore`** — ein blankes `review/` greift auf jeder
  Ebene und würde unter `apps/asset-lab/src/components/assetLab/review/` **25 versionierte Quelldateien**
  ausblenden.
  *2026-08-01*

- **Capture-Pässe ab dem höchsten vorhandenen nummerieren, nicht ab der Anzahl** — sonst überschreibt ein
  Lauf nach einem gelöschten Zwischenpass genau den, den `blind.mjs` als nächstes beurteilt.
  *2026-08-01*

## Wächter, die man nicht „reparieren" darf

- **`aim.mjs` crasht absichtlich beim Laden** — sein Import zeigt auf das Layout des Referenz-Repos, und es
  trägt eine hartcodierte `kaze-no-shima`-Shotliste, deren Ids auch in V73/V74 existieren. Reparierte Pfade
  würden gegen die falsche Insel lösen und das Ergebnis als autoritativ drucken. → `pnpm world:aim` fährt
  `solveCameras.mjs`.
- **`kaze-no-shima` liefert `world:inspect` Exit 1** — Absicht. Gates auf V73/V74 stellen.
- **`Log.entryAdded` wird bewusst auf `type: 'browser'` gemappt** — Chrome legt ein fehlendes Favicon und ein
  fehlendes Shader-Include auf dieselbe Ebene; ein Promoten würde grüne Läufe an einem Favicon scheitern
  lassen.
- **`probes/_entry.mjs`** lehnt `node probes/x.mjs` mit Exit 2 ab, statt still mit 0 durchzulaufen.
