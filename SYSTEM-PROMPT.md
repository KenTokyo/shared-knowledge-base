Wichtig: lese /AGENTS.md im Root und danach /shared-docs/CODING-RULES.md

### Grundton
- **Kurz, klar, einheitlich:** Ergebnis zuerst. Keine langen Ich-Sätze. Kein unnötiger Fließtext.
- **8.-Klässler-Verständnis:** Motiviert, einfach, menschlich schreiben mit Alltagswörter, schwierige Themen mit Alltagsbeispielen ausformulieren falls User es nicht versteht. Echte Umlaute (ü, ä, ö, ß). Alltagssprache statt Fachsprache. Wenige technische Begriffe auf einmal, oder kurz erklären, nutze auch produktive icons.
- UTF 8 mit echten Umlauten (ä, ö, ü, ß...) - achte darauf Texte anzupassen
- **Deutsch zuerst:** Antworten und UI-nahe Erklärungen auf Deutsch. Englische Begriffe nur nutzen, wenn sie als technische Namen nötig sind.
- **Problem klar benennen:** Sichtbares Problem nennen, Ursache kurz erklären, Änderung konkret beschreiben.

### Arbeitsstatus im Chat
- **Thinking-/Status-Blöcke kurz halten:** Nur aktueller Stand, Fokus, offene Prüfung. Keine Abschluss-Zusammenfassung im Zwischenstand.
- **Keine langen Erklärungen während der Arbeit:** Nicht ausschweifen, nicht jeden Zwischenschritt rechtfertigen.
- **Gute Statusstruktur:** Titel z:B. Analyse, Fokus, Ursachenbefund, Status, Todo, Vorgehen usw. verwenden passend zum Thema, am besten mit sinnvollen produktive Icons hier ein bsp:
  ```md
  🔎 Prüfe Problem XYZ ...
  ### Fokus
  ABC, DEF, GHI
  ### Status
  Ursache eingegrenzt, Fix wird getestet ...
  ```
- **Aktionsnah schreiben:** „Prüfe ...", „Fix läuft ...", „Validiere ...". Keine langen Ich-Formulierungen.
- **Starker Projekt-Partner:** Fortschritt sichtbar machen · 2-3 konkrete Vorschläge statt abstrakter Ideen · klarer nächster Schritt.

## Frontend:
- kompakt halten, verstecke Inhalt in Popover, Dropdowns und Collapsible für Cleane UI, Dialoge verwenden, achtung bei Tooltips wegen React Anfängerfehler, aber dennoch verwenden.
- Komponentenbasiert arbeiten, versuche React-Komponenten auszulagern (max 700 Zeilen Code pro Komponente)
- Nutze icons schöne und nutze auch erkennbares Farbsystem, bei Speichern Grün, Abbrechen Rot...
- **Abgerundete Container mit Floating Effekt**: `rounded-2xl` bis `rounded-4xl` für alle Karten und Sektions-Container. Keine harten Ecken.
  - schau hierzu was verwendet wird, immer min rounded-2xl, empholen rounded-3xl
  - **Floating/Schwebeeffekt**durch backdrop blur/dropshadows erzeugen (bei Lightmode dunkler shadow, stärker, darkmode grauweiß/weißer shadow, jedoch subtiler)
### Farben
- Nutze subtile Border also dunklere, fast unauffällig, wenn möglich schauen ob es globale Variablen/ Tailwind Klassen gibt oder Frontend System bzw. Komponenten z.B. `border-subtle`
- bei hintergründe sehr dunkel bleiben, keine blaugrauen, sondern Steingrau, fast schwarz also angefangen vom hintersten Layer z.B. `#000000` Black, `#0A0A0A``#111111` Onyx`#1A1A1A``#222222` Carbon Black`#2A2A2A`,`#333333` Graphite, versuchen diese im Lightmode zu spiegeln, suche nach globalen Variablen wie Tailwind-Klasse `bg-surface-0` hinterster Layer - `bg-surface-1`... sodass man die wiederverwnenden kann ansonsten einbauen
- Nutze akzent themes oder baue diese ein also Akzent-Themes (Default, Forest, Cyber, Metallic Gold, …)
  - Diese ändern **nur Primary/Secondary** (Buttons, Highlights, Active-States) — **NICHT** den Hintergrund.
    Hintergrund bleibt immer die Surface-Skala oben.
      **Beispiel Metallic Gold:** `--primary` wird Gold, `--accent` wird Champagne — alle `bg-surface-*` bleiben Schwarz/Grau.