Ja — am schnellsten direkt im integrierten Terminal mit Git. Hier sind die nützlichsten Ein-Zeiler:

### Nur Dateinamen aller Änderungen (staged + unstaged) seit HEAD

```bash
git diff --name-only HEAD
```

### Dateinamen **mit Status-Flag** (M=modified, A=added, D=deleted, …)

```bash
git diff --name-status HEAD
# oder kompakter:
git status --short
```

### Getrennt nach Typ

```bash
git ls-files -m                         # nur geänderte (tracked) Dateien
git diff --name-only --cached           # nur staged
git ls-files --others --exclude-standard # nur untracked
git diff --name-only --diff-filter=U    # nur Merge-Konflikte
```

### Liste in die Zwischenablage kopieren

* **Windows**

```bash
git diff --name-only HEAD | clip
```

* **macOS**

```bash
git diff --name-only HEAD | pbcopy
```

* **Linux**

```bash
git diff --name-only HEAD | xclip -selection clipboard
```

### Direkt alle geänderten Dateien in VS Code öffnen

```bash
code -r $(git diff --name-only HEAD)
```

> Tipp in VS Code: Die **Source Control** Ansicht (Strg/Cmd + Shift + G) zeigt dir die Liste ebenfalls; für eine kopierbare Textliste sind die obigen Git-Befehle aber am praktischsten.
