# Git Upstream Merge Skill

> Dieses Dokument wird dem AI-Agenten mitgegeben, wenn ein Fork mit dem Original-Repository synchronisiert werden muss. Der Agent weiss dann sofort was zu tun ist, ohne dass du es erklären musst.

---

## Git-Begriffe (Glossar)

| Begriff | Bedeutung | Analogie |
|---------|-----------|----------|
| **Repository (Repo)** | Ein Projekt-Ordner, der von Git verwaltet wird | Ein Ordner mit "Zeitmaschine" |
| **Fork** | Deine persönliche Kopie eines fremden Repos auf GitHub | Du kopierst das Kochbuch eines Restaurants und schreibst eigene Rezepte rein |
| **Origin** | Dein eigenes Repository auf GitHub (dein Fork) | Dein eigenes Kochbuch |
| **Upstream** | Das Original-Repository, von dem du geforkt hast | Das Original-Kochbuch des Restaurants |
| **Branch** | Ein Entwicklungsstrang / eine Arbeitslinie | Ein Lesezeichen in deinem Kochbuch |
| **main** | Der Haupt-Branch (Standard-Arbeitslinie) | Das Hauptkapitel |
| **Commit** | Ein gespeicherter Snapshot deiner Änderungen | Ein Foto von einer Buchseite |
| **HEAD** | Zeigt auf deinen aktuellen Commit / wo du gerade stehst | "Du bist hier" auf einer Karte |
| **Fetch** | Neueste Infos vom Server holen OHNE etwas zu ändern | Nachschauen ob neue Rezepte da sind, ohne sie einzukleben |
| **Pull** | Fetch + Merge in einem Schritt | Neue Rezepte holen UND einkleben |
| **Push** | Deine lokalen Änderungen auf GitHub hochladen | Deine neuen Rezepte ins Online-Kochbuch kopieren |
| **Merge** | Zwei Branches zusammenführen | Zwei Rezeptsammlungen zu einer vereinen |
| **Merge-Conflict** | Beide Seiten haben die gleiche Stelle geändert | Zwei Leute haben das gleiche Rezept anders abgewandelt |
| **Merge-Base** | Der letzte gemeinsame Commit beider Branches | Die letzte gemeinsame Version des Rezepts |
| **Rebase** | Commits umschreiben, als wären sie nach anderen passiert | Deine Rezepte so umschreiben, als hättest du sie erst nach den Restaurant-Updates geschrieben |
| **Ahead** | Dein Fork hat Commits, die Upstream nicht hat | Du hast eigene Rezepte |
| **Behind** | Upstream hat Commits, die dein Fork nicht hat | Das Restaurant hat neue Rezepte |
| **Stash** | Ungespeicherte Änderungen temporär zur Seite legen | Dein unfertiges Rezept kurz in die Schublade |
| **Cherry-Pick** | Einen einzelnen Commit aus einem anderen Branch holen | Ein einzelnes Rezept rauspicken |
| **Force-Push** | Push, der die Remote-Geschichte überschreibt (GEFÄHRLICH!) | Das Online-Kochbuch komplett mit deiner Version ersetzen |

---

## Situation: Fork ist hinter Upstream

```
Du siehst auf GitHub:
"This branch is X commits ahead of and Y commits behind OriginalOrg/repo:main"

Oder:
"This branch has conflicts that must be resolved"
```

### Was das bedeutet:
- **X commits ahead** = Du hast X eigene Änderungen
- **Y commits behind** = Das Original hat Y neue Änderungen, die du nicht hast
- **Conflicts** = Ihr habt die gleichen Dateien/Stellen geändert

---

## Agent-Anweisungen: Upstream Merge durchführen

### Prioritäten (WICHTIG!)

1. **Eigene Änderungen (origin) haben IMMER Vorrang** bei Konflikten
2. **Upstream-Änderungen werden übernommen** wo es keine Konflikte gibt
3. **Bei Konflikten:** Eigene Version behalten, aber Upstream-Änderungen intelligent integrieren wenn möglich
4. **IMMER Backup erstellen** bevor der Merge beginnt

### Schritt-für-Schritt Ablauf

#### Phase 1: Analyse & Backup

```bash
# 1. Status prüfen - keine uncommitted changes!
git status

# 2. Falls uncommitted changes: erst committen oder stashen
git stash  # oder: git add . && git commit -m "WIP: save before merge"

# 3. Backup-Branch erstellen (PFLICHT!)
git branch backup-vor-merge-$(date +%Y%m%d-%H%M%S)

# 4. Upstream fetchen (nur gucken, ändert nichts)
git fetch upstream

# 5. Analyse: Wie weit sind wir auseinander?
echo "=== Eigene Commits (ahead) ==="
git log --oneline upstream/main..HEAD

echo "=== Upstream Commits (behind) ==="
git log --oneline HEAD..upstream/main | wc -l

echo "=== Geänderte Dateien ==="
git diff --name-only HEAD upstream/main | wc -l

# 6. Trockenlauf: Welche Dateien werden Konflikte haben?
git merge --no-commit --no-ff upstream/main 2>&1 || true
git diff --name-only --diff-filter=U  # Zeigt Conflict-Dateien
git merge --abort  # Trockenlauf abbrechen
```

#### Phase 2: Merge durchführen

```bash
# Merge starten mit Strategie: Bei Konflikten UNSERE Version bevorzugen
git merge upstream/main -m "Merge upstream/main into fork"
```

#### Phase 3: Konflikte lösen

**Strategie bei Konflikten:**

1. **Dateien die NUR wir geändert haben:** Unsere Version behalten (kein Konflikt)
2. **Dateien die NUR upstream geändert hat:** Upstream Version nehmen (kein Konflikt)
3. **Dateien die BEIDE geändert haben (Konflikt):**
   - Prüfe ob unsere Änderung und die Upstream-Änderung zusammen funktionieren
   - Wenn JA: Beide Änderungen intelligent kombinieren
   - Wenn NEIN: Unsere Änderung behalten, Upstream verwerfen
   - **Spezialfall config/package.json:** Beide Versionen zusammenführen, aber unsere Overrides behalten

**Konflikt-Marker verstehen:**
```
<<<<<<< HEAD
// UNSERE Version (behalten/priorisieren)
const myFeature = true;
=======
// UPSTREAM Version (integrieren wenn möglich)
const upstreamFeature = true;
>>>>>>> upstream/main
```

**Lösung:** Die Marker (`<<<<<<<`, `=======`, `>>>>>>>`) entfernen und den gewünschten Code behalten.

#### Phase 4: Abschluss

```bash
# Alle gelösten Konflikte stagen
git add .

# Merge-Commit erstellen
git commit -m "Merge upstream/main - synced with latest upstream changes"

# Verifizieren: TypeScript-Fehler prüfen (KEIN Build!)
npx tsc --noEmit 2>&1 | head -50

# Auf GitHub pushen
git push origin main
```

#### Notfall: Alles rückgängig machen

```bash
# Wenn noch nicht committed:
git merge --abort

# Wenn schon committed, zurück zum Backup:
git reset --hard backup-vor-merge-XXXXXXXX
```

---

## Checkliste für den Agenten

- [ ] `git status` sauber? (keine uncommitted changes)
- [ ] Backup-Branch erstellt?
- [ ] `git fetch upstream` ausgeführt?
- [ ] Analyse durchgeführt (ahead/behind/changed files)?
- [ ] Merge gestartet?
- [ ] Konflikte gelöst (eigene Änderungen priorisiert)?
- [ ] `git add .` + `git commit`?
- [ ] TypeScript-Check bestanden?
- [ ] `git push origin main`?

---

## Häufige Szenarien

### Szenario A: "Keine Konflikte"
Merge geht automatisch durch. Einfach committen und pushen.

### Szenario B: "package.json / package-lock.json Konflikt"
```bash
# Unsere package.json behalten, dann dependencies neu auflösen
git checkout --ours package.json
git checkout --ours package-lock.json
npm install
git add package.json package-lock.json
```

### Szenario C: "Zu viele Konflikte, überfordert"
```bash
# Merge abbrechen
git merge --abort

# Alternative: Upstream nehmen, eigene Änderungen manuell drübersetzen
git checkout -b fresh-from-upstream upstream/main
# Dann eigene Änderungen cherry-picken oder manuell übertragen
```

### Szenario D: ".gitmodules oder Submodule Konflikte"
```bash
git checkout --ours .gitmodules
git add .gitmodules
```

---

## Nutzung dieses Skills

Schicke dieses Dokument an den AI-Agenten mit der Nachricht:

> "Bitte führe einen Upstream-Merge durch gemäß dem Git-Merge-Skill. Mein Fork ist behind."

Der Agent weiss dann:
1. Was zu tun ist
2. Dass er ein Backup machen muss
3. Dass deine Änderungen Vorrang haben
4. Wie er Konflikte löst
