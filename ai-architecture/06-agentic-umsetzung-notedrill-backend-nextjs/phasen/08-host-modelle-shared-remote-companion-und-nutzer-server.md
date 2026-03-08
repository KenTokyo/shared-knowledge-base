# Notedrill Backend Next.js: Phase 08 Host-Modelle, Shared Remote, Companion und Nutzer-Server

Stand: 8. März 2026
Status: `PLANNED`

## Ziel
Diese Phase trennt die Betriebswege sauber.

## Was der User davon hat
1. weniger Verwirrung
2. klarer Standardweg
3. optional mehr Power ohne Zwang

## Die drei Zielwege

## 1. Shared Remote
Standard für fast alle.

Gut für:
1. iPad-only
2. Mobile
3. normale Nutzer

## 2. Companion
Optionaler Begleit-Host auf Desktop.

Gut für:
1. Power-User
2. BYOK oder BYOA
3. Nutzer mit Codex, Gemini CLI oder Claude Code

## 3. Dedizierter Nutzer-Server
Späterer Premium-Weg.

Gut für:
1. lange Läufe
2. isolierte Premium-Arbeit
3. schwere Agent-Projekte

## Hauptaufgaben

## 1. Host-Modus im Lauf speichern
1. `shared_remote`
2. `desktop_companion`
3. `dedicated_user_worker`

## 2. Onboarding pro Modus bauen
Jeder Modus braucht:
1. Status
2. Test
3. Fehlerhilfe

## 3. Companion-Vertrag definieren
Wichtig:
Companion darf kein Sonderchaos sein.
Er muss denselben Run-Vertrag sprechen.

## 4. Dedizierten Nutzer-Worker sauber begrenzen
Nur mit:
1. Provisionierung
2. Secret-Verwaltung
3. Stop bei Idle
4. Billing-Verknüpfung

## Edge Cases

| Edge Case | Antwort |
|---|---|
| User hat nur Mobile | Shared Remote bleibt Standard |
| Companion fällt aus | Rückweg auf Shared Remote |
| Nutzer-Server läuft leer weiter | Idle-Stop |
| Windows oder WSL2 zickt | klarer Supportpfad und Fallback |

## Betroffene Dateien oder Bereiche
1. Setup- und Host-Status
2. Run-Vertrag
3. Companion-Adapter
4. künftige Provisionierungslogik

## Done-Kriterien
1. ein Standardweg ist glasklar
2. Companion ist nur Zusatz, nicht Pflicht
3. Nutzer-Server ist technisch planbar und begrenzt

## Nächste Phase danach
`09-abo-preise-und-paketlogik.md`
