# Shared Knowledge Base

Dieses Repository ist die gemeinsame Wissensbasis für Arbeitsregeln, Agenten-Dokumente und projektübergreifende technische Leitfäden. Es wird als Git-Submodul eingebunden.

## Einmalig einbinden

Im Eltern-Repository:

```bash
git submodule add https://github.com/KenTokyo/shared-knowledge-base shared-docs
git add -- .gitmodules shared-docs
git commit -m "docs: gemeinsame Wissensbasis einbinden"
```

Der Zielpfad darf abweichen. Maßgeblich ist ausschließlich der in `.gitmodules` deklarierte Pfad.

## Projekt mit Submodul klonen

```bash
git clone --recurse-submodules <REPOSITORY_URL>
```

Bei einem bereits vorhandenen Clone:

```bash
git submodule update --init --recursive
```

## Genau ein Submodul sicher aktualisieren

Zuerst die im Eltern-Repository deklarierten Pfade anzeigen:

```bash
git config --file .gitmodules --get-regexp "^submodule\\..*\\.path$"
```

Dann ausschließlich den gewünschten Pfad verwenden:

```bash
git -C <submodul-pfad> status --short
git -C <submodul-pfad> pull --ff-only origin main
git add -- <submodul-pfad>
git commit -m "docs: gemeinsame Wissensbasis aktualisieren"
```

Regeln:

- Nur einen Pfad verwenden, den `.gitmodules` wirklich nennt. Keine Pfade wie `shared/docs` raten.
- Vor `pull` muss das Submodul sauber sein. Eigene Änderungen zuerst im Submodul committen und pushen.
- `pull --ff-only` verhindert einen unbeabsichtigten Merge-Commit.
- Im Eltern-Repository nur den betroffenen Gitlink aufnehmen, niemals pauschal `git add .`.
- Kein blindes `git submodule update --remote`, wenn das Eltern-Repository mehrere oder unregelmäßige Gitlinks besitzt.

## Shared Docs selbst ändern

Änderungen gehören zuerst in einen eigenen Commit dieses Repositories:

```bash
git add -- <geänderte-datei-1> <geänderte-datei-2>
git commit -m "docs: gemeinsame Regel aktualisieren"
git push origin main
```

Erst danach wird im Eltern-Repository der neue Gitlink gezielt aufgenommen und committed.
