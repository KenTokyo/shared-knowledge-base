# Component Styling Checklist (Notedrill)

## 1) Border-Qualität

- Vermeiden: `border-white/20+` als Standard auf vielen Elementen.
- Ziel: `border-white/[0.06-0.14]` mit ruhigem Hover-Upgrade.
- Für aktive Zustände nur leicht stärker werden.

## 2) Badge-Qualität

- Badge klein halten (`text-[10px]` bis `text-xs`).
- Keine grellen Vollflächen als Standard.
- Neutral zuerst, farbige Status nur wenn nötig.

## 3) Button-Qualität

- Standard: muted glass (`bg-white/[0.03-0.08]`).
- Hover: kleine Helligkeits-/Border-Steigerung.
- Active: leichter Scale-Down oder subtile Bewegung.
- Primary: nur ein klarer Akzent pro Bereich.

## 4) Input-Qualität

- Hintergrund: dunkles Glas (`bg-black/20` bis `bg-black/35`).
- Border: fein (`border-white/[0.08-0.12]`).
- Focus: primärer Ring, nicht zu dick.

## 5) Icon-Container

- Runde/abgerundete Container mit leichter Border.
- Keine harten hellen Outlines.
- Icons immer mit gutem Kontrast.

## 6) Konsistenz

- Gleiche Radius-Werte je Ebene.
- Gleiche Spacing-Logik je Bereich.
- Gleiche Interaktions-Geschwindigkeit (meist `duration-300`).

## 7) Abschluss

- `npm run type-check`
- UI kurz visuell prüfen (Badge/Button/Input/Card)
