## Orchestrator-Modus starten

Moinsen. Wir starten jetzt den **Orchestrator-Modus**.

---

## Ziel der Aktion

Erstelle eine **große Masterplanung** und zusätzlich **sehr viele einzelne Planungen** (je Planung eine eigene Markdown-Datei), um eine sehr große App Schritt für Schritt umzubauen.

---

## Hauptproblem (Ist-Zustand)

* Die App hat sehr viel **kleintseitige Logik / kleinseitigen Code** (Client = Handy/Smartphone des Users).
* Kleintseitiger Code ist grundsätzlich okay, aber **auf schlechten Geräten** ist das **schlecht für Performance**.
* Aktuell werden Dinge wie **Filtern, Sortieren, etc.** häufig **in TypeScript im Client** gemacht.

---

## Hauptziel (Soll-Zustand)

* **So wenig Client-Arbeit wie möglich.**
* Statt TypeScript-Filter/Sortierung soll das **über SQL** laufen:

  * Queries gehen an den Server.
  * Der Server macht **Sortierung, Filterung, etc.**
* Dadurch muss die **gesamte Struktur** der App (Logik/Flows) auseinander genommen und sauber neu aufgebaut werden.

---

## Vorgehensprinzip: Phasen & minimale Arbeit pro Phase

* Du erstellst **sehr viele Phasen**.
* Pro Phase wird **so wenig wie möglich** verändert/gebaut.
* Jede Phase bekommt eine **eigene Planung** als **Markdown-Datei** mit **einem klaren Pfad/Fokus**.

---

## Workflow im Orchestrator-Modus (Chat-Struktur)

* Für **jede einzelne Planung** wird ein **neuer Chat** geöffnet.
* In jedem neuen Chat wird **ein bestimmter Pfad** der App **vollständig durchgearbeitet**.
* Wir gehen dabei **von ganz oben nach unten**:

  * Start auf hoher Ebene (App/Feature-Level)
  * Dann immer tiefer rein (Module → Komponenten → Logiken → Queries)

---

## Was in jeder Planung passieren muss (Pflicht-Checkliste)

1. **Dateien finden und identifizieren**, die relevant sind (für den jeweiligen Pfad/Feature).
2. **Logiken feststellen** (wie funktioniert Filter/Sortierung/Abfragen aktuell?).
3. **Umbauen**:

   * Clientseitige TypeScript-Filter/Sortierung/etc. herausnehmen
   * Durch **SQL-Queries** ersetzen (Server übernimmt Arbeit)
4. Planung zuerst **hinschreiben und iterativ ausbauen**, bevor tief implementiert wird.

---

## Masterplanung (Tracking / Übersicht)

* Es muss eine **Masterplanung** geben, die trackt:

  * Welche **Pfade** existieren
  * Welche **Markdown-Planungen** schon erstellt wurden
  * Welche Pfade bereits **angeschaut / analysiert / umgebaut / getestet** wurden

---

## Kritische Anforderungen: Logik darf nicht kaputt gehen

* **Ohne dass die Logik kaputt geht** (wichtig, mehrfach betont).
* SQL/DB-Umstellungen dürfen niemals “Pi mal Daumen” passieren.

---

## Datenbank-Statements: Pflicht-Tests (extrem wichtig)

* Die neuen Datenbank-Statements sind **schwere Queries** und **super wichtig**.
* Diese Queries müssen **live getestet** werden.
* **Unbedingt**: Live-Tests der Datenbank-Abfragen mit **mpxtsc**.
* Wenn das nicht gemacht wird:

  * kann die App **crashen**
  * das System kann **nicht funktionieren**
* Tests sind kein “Nice to have”, sondern **Pflicht**.

---

## Optimistic Loading (Use-Optimistik) – nur wenn sinnvoll

* Wenn möglich: **optimistisches Laden** einsetzen.
* Aber:

  * In jeder Planung muss explizit bewertet werden, ob optimistisches Laden **hier möglich** ist.
  * Und ob es **in diesem Fall Performance-Probleme verursachen könnte**.
* Optimistic Loading nur nutzen, **wenn es wirklich möglich/sicher** ist.

---

## Kurzform als Befehl an die KI

* Starte Orchestrator-Modus.
* Erzeuge Masterplanung + viele einzelne Markdown-Planungen (je Phase/Pfad).
* Arbeite pro Planung in einem neuen Chat einen Pfad von oben nach unten durch.
* Ziel: Client entlasten → Filter/Sortierung/etc. von TypeScript auf SQL (Server) verlagern.
* Pro Phase minimaler Scope.
* Logik darf nicht kaputt gehen.
* Alle DB-Queries live testen (mpxtsc), sonst Crash-Risiko.
* Optimistic Loading nur wenn möglich und pro Planung mit Risiko-Check dokumentieren.
