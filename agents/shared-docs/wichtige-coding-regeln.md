# Wichtigste Coding Regeln

---
version: 2.0
updated: 2026-04-11
hinweis: VERALTET - Siehe stattdessen shared-docs/wichtig/KRITISCHE-REGELN.md
---

> **WICHTIG:** Diese Datei wird durch `shared-docs/wichtig/KRITISCHE-REGELN.md` ersetzt.
> Die folgenden Regeln bleiben als Ergaenzung fuer Konsolenausgaben und Phasen-Format.

## Konsolenausgaben

**Wenn der User Konsolenausgaben möchte oder es zu Fehlern kommt, dann diese einbauen im folgenden Stil:**

* Bitte **hochmoderne, superschöne, motivierende und farbige Konsolenausgaben** verwenden.
* Die Ausgaben sollen **menschenlesbar** sein und **allgemeine Sprache** nutzen, damit sofort klar ist, **welche Methode was macht**.
* Bitte mit **CAPS LOCK** für wichtige Punkte arbeiten sowie mit **eckigen Klammern**, ***kursiv*** und **fett**.
* Das Ganze soll **wie eine kleine Kunstform** wirken: **so lesbar, schön und klar wie möglich**.
* Die Konsolenausgaben sollen so aufgebaut sein, dass ich sie dir direkt geben kann — inklusive Infos wie:
  * **Server oder Client**, **welche Methode**, **welche Klasse**
* Wichtig: **kompakt bleiben**, also **keine endlosen Konsolenausgaben**.
* Der Stil soll **spielerisch, modern und ein bisschen wie ein Retro-Game** sein.

Die Ausgaben sollen außerdem helfen, **Fehler**, **Probleme** und **Performance-Issues** schneller zu erkennen.
Dazu kannst du z. B. **Timer** für bestimmte Fälle einbauen, um zu prüfen:

* ob es **Laggs** gibt,
* ob **Endlosschleifen** entstehen,
* wie lange bestimmte **Prozesse dauern**.

## Architektur, Code-Qualität und Planung
**Achte immer auf folgende Punkte:**

* **Wartbarkeit**
* **Modularität / komponentenbasierte Struktur**
* **Helper- und Service-Funktionen**
* **saubere Trennung von Zuständigkeiten**
* **gute Architektur**
* **simpel und wiederverwendbar**
* **performance-optimiert**
* **Edge Cases mitdenken**

Zu den genannten Kriterien bitte **immer kurz Meinung oder Feedback** geben, ob die erzeugten Planungen diesen Punkten entsprechen.

## Phasen in Planungen

Wenn du mit **Phasen in Planungen** arbeitest, dann bitte die Phasen **immer mit To-dos markieren**.

Das heißt:

* innerhalb der Phase konkrete **To-dos anlegen**
* dazuschreiben, **was genau bereits gemacht wurde**
* offene Punkte klar als **noch zu erledigen** markieren

## Beispiel für das gewünschte Phasenformat

### ✅ Phase NUMMER — Kurzbeschreibung *z. B. Architektur, Modus-Trennung, Save-Basis*
**Ziel:** Hier schreiben, worum es geht.
* [x] `Komponente XYZ` erzeugt (604 Zeilen Code), .....
* [ ] `AUFGABE ABC` implementieren.
**Referenzen:**
`Hier Pfade der Unterplanungen, Historien, Completed, Besprechungen angeben`
`Jeweils getrennt pro Zeile`

Nach Abschluss bitte schreiben, an welchen Kriterien du dich gehalten hast, speziell also mit komma getrennt in einer Zeile
Kriterien eingehalten: unter 700 Zeilen, architektur, Edge-Cases beachtet
So kurz halt

Zusätzlich bitte auch die **Hauptkomponentenpfade** in die Referenzen aufnehmen — **maximal 3 pro Phase**, und zwar die, **an denen am meisten geändert wurde**.