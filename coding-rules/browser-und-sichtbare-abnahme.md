# Browser und sichtbare Abnahme — On-demand-Vertrag

**Lesen bei:** aktueller ausdrücklicher Browser-, Playwright-, Screenshot-, UI-, Preview- oder
Gameplay-Prüffreigabe.  
**Ohne diese Freigabe:** keinen Browser, keine UI-Automation und keinen Screenshotlauf starten; sichtbares
Ergebnis als manuelles Gate dokumentieren.

## Autorisierung

- Nur die aktuelle Usernachricht kann Browser-/Computer-Use freigeben. Historie, Handover, Task-Todos oder
  frühere Freigaben zählen nicht.
- Browserfreigabe erlaubt keine Orchestrierung; Orchestrierungsfreigabe erlaubt keinen Browserlauf.
- Projektspezifische Kanal-, Serialitäts-, Dev-Server- und Portregeln stehen in der lokalen `AGENTS.md`.
- Technische Browserautomation folgt `shared-docs/agents/agent-browser/`.

## Akzeptanz vor Lauf

Vor sichtbarer Arbeit drei bis sieben konkrete Prüffragen aus dem Userziel notieren, zum Beispiel:

- Ist das Hauptobjekt vollständig, groß genug und unverdeckt?
- Bleiben Text, Werte, Eingaben und Zustände lesbar?
- Ist die wichtigste Form, Bewegung oder Zahl ohne Suche verständlich?
- Sind explizite Maße, Farben, Stückzahlen und Superlative weiterhin wörtlich erfüllt?
- Wurde kein zuvor gutes Merkmal für den neuen Fokus geopfert?

## Gültiger Abnahmezustand

- Fenster/Preview maximieren, Hauptobjekt zentrieren, Referenz groß genug anzeigen und Kamera/Zoom passend
  setzen.
- Debug-, Handle-, Joint-, Grid- und Overlayelemente ausblenden, wenn sie das Produkt verdecken.
- Bewegte Objekte mit Follow/Center/Keep-visible verfolgen. Pfad, Distanz, Timeline, Scrollposition oder
  Vorher/Nachher-Versatz sichtbar machen.
- Bei 3D mindestens passende Front-/Seiten-/Rück-/Topansichten nutzen.
- Ist das Hauptobjekt verdeckt, zu klein oder aus dem Bild gelaufen, ist die Aufnahme kein Gate.

## Urteil

- Screenshot, Preview oder Export fachlich gegen die Prüffragen beurteilen. Sichtbar falsches Ergebnis ist
  Fehlerbeweis, kein Abschlussbeweis.
- Grüne Logs, gespeicherte Daten, Typecheck und erfolgreiches Playwright beweisen nur Ausführung.
- Tooling zuerst verbessern, wenn Editor, Sidebar, falsche Kamera oder fehlender Clean-Modus die Beurteilung
  verhindert.
- Bei wiederholtem sichtbaren Scheitern Grundstruktur und Vergleichsreferenz prüfen; nicht weiter einzelne
  Werte drehen.
- `success` oder `fertig` nur bei bestandenem sichtbaren Kern. Sonst `partial`, `blocked` oder
  `technisch umgesetzt, visuell nicht abgenommen`.

## Echtzeitformen

- Hero-Solid braucht charakteristische Silhouette, glaubwürdige Basis/Bodenkontakt, räumliche Tiefe und
  Oberflächenvariation.
- Material- und Instanzfarbe nicht unbemerkt doppelt multiplizieren.
- Materie schreibt Tiefe; Lichtkern, Halo, Funken und Bloom sind getrennte Rollen.
- Bodenreste brauchen authored Maske und Randfalloff; Trägerbox/-plane darf die Silhouette nicht bestimmen.
- Statisch prüfbar sind Geometrieherkunft, Farbpfad, Depth-/Blendrolle, HDR-Werte und Masken. Tatsächliche
  Form-/Lichtqualität bleibt sichtbares Gate.
