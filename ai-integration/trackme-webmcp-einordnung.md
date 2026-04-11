# TrackMe WebMCP Einordnung

## Kurz gesagt
WebMCP ist spannend, aber für TrackMe gerade **nicht** der wichtigste Weg.

## Warum?
- WebMCP ist für **Browser-KI direkt in einer geöffneten Webseite** gedacht.
- Unser aktueller TrackMe-Weg zu ChatGPT läuft über einen **Remote-MCP-Server**.
- Das sind zwei verschiedene Dinge.

## Was WebMCP gut kann
- Eine Webseite kann eigene Werkzeuge direkt im Browser bereitstellen.
- Ein Browser-Agent muss dann weniger raten, wo er klicken oder tippen soll.
- Das ist besonders gut für Formulare, Assistenten und klare Schritt-für-Schritt-Flows.

## Was WebMCP für uns gerade nicht löst
- Es ersetzt **nicht** unsere ChatGPT-MCP-Verbindung.
- Es ist **kein** Ersatz für unseren serverseitigen Zugriff auf Daten, Rechte und Freigaben.
- Es ist **kein** guter Hauptweg für unsere jetzigen Tests.
- Es ist laut Proposal vor allem für **lokale Browser-Flows mit sichtbarer Seite** gedacht.

## Was für TrackMe jetzt sinnvoller ist
- Direkte Integrations-Tests für unsere MCP-Logik
- Tests, die prüfen:
  - Werden Daten wirklich gespeichert?
  - Werden Freunde richtig gelesen?
  - Werden Zeitreihen und Auswertungen sauber gebaut?
- Danach kleine Browser-Smoke-Tests, nur für Login und UI-Grundwege

## Wann WebMCP später interessant wird
- Wenn wir TrackMe im Browser selbst noch agent-freundlicher machen wollen
- Wenn Chrome oder andere Browser das breiter unterstützen
- Wenn wir in der Web-App eigene Agent-Werkzeuge direkt an Formulare hängen wollen

## Empfehlung
1. Remote MCP für ChatGPT weiter nutzen
2. Direkte Logik- und DB-Tests für Stabilität nutzen
3. Browser-Tests nur als kurze Sichtprüfung
4. WebMCP später als Extra-Spike prüfen, nicht als Kernweg

## Quellen
- Chrome Blog: https://developer.chrome.com/blog/webmcp-epp
- Proposal: https://github.com/webmachinelearning/webmcp
- Lokale Notiz: `docs/ai/web-mcp.md`
