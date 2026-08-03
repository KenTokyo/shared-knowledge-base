# Template-Literals mit Code darin — claude-flakes

**Lesen wenn:** du ein JS-Template-Literal editierst, das Code, CSS oder Markup trägt — die `evaluate`-Strings in `tools/`, `RAIL_CSS` und das HUD-Markup in `src/ui/`.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Backtick im Kommentar killt die ganze Datei** — `node --check` meldet `missing ) after argument list` und zeigt auf eine Zeile weit hinter dem Schaden; die Datei ist syntaktisch tot, der Fehler steht woanders. Ursache: ein Backtick in einem `//`-Kommentar **innerhalb** eines Template-Literals. Für den Lexer gibt es dort keine Kommentare — das Literal endet am ersten Backtick, alles danach wird als Code gelesen, und die erste unbalancierte Klammer meldet sich. → In Template-Literals nie Backticks setzen, auch nicht in Kommentaren: Bezeichner dort in Klartext oder einfache Anführungszeichen. Nicht der Meldezeile hinterherlesen, sondern die umschließenden Literale nach Backticks absuchen.
  *Dreimal ein ganzes Modul zerlegt: `src/ui/hud.js`, `src/ui/skillRail.js`, zuletzt `tools/play.mjs` — gemeldet bei Zeile 471, verursacht von drei Kommentaren in einem `evaluate`-String darüber · 2026-08-03*
