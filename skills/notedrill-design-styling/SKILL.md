---
name: notedrill-design-styling
description: Use when modernizing Notedrill UI components or pages. Enforces the COMPONENT-STYLING-PROMPT rules with a cheatsheet-like liquid-glass style (muted borders, clean badges, smooth inputs/buttons).
---

# Notedrill Design Styling Skill

Nutze diesen Skill immer dann, wenn eine UI-Komponente modernisiert oder neu gebaut wird und der Look zur Learning-Cards-Spickzettel-Seite passen soll.

## Wann dieser Skill genutzt wird

- User sagt: "modernisieren", "sieht schlecht aus", "Design-Baukasten", "Komponenten-Framework".
- Buttons, Inputs, Badges oder Cards wirken uneinheitlich.
- Admin- und Tool-Seiten sollen auf den Spickzettel-Look gebracht werden.

## Pflicht-Quellen (zuerst laden)

1. `docs/graphics-performance/COMPONENT-STYLING-PROMPT.md`
2. `app/learning-cards/(cheatsheetSection)/CheatsheetSection.tsx`
3. `app/learning-cards/(cheatsheetSection)/CheatsheetControlsPanel.tsx`
4. `app/learning-cards/(cheatsheetSection)/CheatsheetCard.tsx`

Für konkrete Klassen nutze danach:
- `references/component-styling-checklist.md`
- `references/cheatsheet-style-recipes.md`

## Arbeitsablauf

1. **Ist-Zustand prüfen**: Welche UI-Teile sehen "zu hart" oder "zu weiß" aus?
2. **Spickzettel-Muster wählen**: ruhiger Glass-Look mit subtilen Rändern.
3. **Bausteine bauen/verbessern**: zuerst wiederverwendbare Komponenten, dann Seiten.
4. **Kontrast prüfen**: Text und Icons müssen direkt lesbar sein.
5. **Interaktion prüfen**: Hover/Focus/Active weich und klar, kein starkes Flackern.
6. **Technik prüfen**: `npm run type-check`.

## Harte Regeln

- **Ränder immer muted**: typischer Bereich `border-white/[0.06]` bis `border-white/[0.14]`.
- **Keine grellen Standard-Badges**: Badges klein, ruhig, lesbar.
- **Button-Standard ist ruhig**: `bg-white/[0.03-0.08]` + subtile Hover-Stufen.
- **Inputs ohne harte Outline**: dunkler Untergrund, feine Border, sauberer Focus-Ring.
- **Nur 1 starke Akzentfarbe pro Block** (z. B. Primary-Button).
- **Keine Admin-Zwischenseite**, wenn User direkt Design-Baukasten will: `/admin` auf `/admin/design` umleiten.

## Ergebnis-Definition

Eine Komponente ist erst fertig, wenn:

- Ränder nicht mehr "zu weiß" wirken,
- Badges ruhig und hochwertig aussehen,
- Inputs wie im Spickzettelbereich wirken,
- Buttons konsistent und hochwertig animiert sind,
- TypeScript sauber durchläuft.
