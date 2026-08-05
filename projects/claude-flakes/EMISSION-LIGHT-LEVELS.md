# Emissiv-, Hitze- und Lichtpegel — claude-flakes

**Lesen wenn:** du eine Emissiv-, Hitze- oder Lichtzahl setzt, oder ein Effekt „zu schwach“, „zu flach“ oder „zu weiß“ aussieht.
**Status:** freiwillige Tipps · gemessen bessere Lösung → Vorrang · Änderungsrecht siehe [LEARNING-SYSTEM.md](../../LEARNING-SYSTEM.md)

- **Feuer dunkler als der Schnee, vor dem es steht** — Pegel gegen 1.0 kalibriert statt gegen die Szene; der eigene Hilfetext behauptete „über etwa 2 bloomt es“, das Knie liegt bei 28.6. Form, Verlauf und Partikelzahl retten nichts, der Tonemapper drückt den ganzen Effekt in ein Band: kein Halo, kein weißer Kern, keine dunklen Spitzen. → Vor jeder Hitzezahl drei Zahlen aus dem Renderer holen: hellste Fläche, Bloom-Schwelle exponiert, Anzeige-Weiß; Pegel dagegen setzen, nicht gegen 1. Additive Schichten vorher auf Emission+Absorption umstellen, sonst summiert der Stapel zum weißen Balken und erzwingt genau den zu niedrigen Pegel.
  *Schnee 12, Knie 28.6, Weiß ≈ 59 (`postChain.js`, th 3.0 exponiert, `S.exposure` 0.105); Feuer lag bei 0.8–7.8, komplett darunter. Zwei Phasen Formarbeit blieben unsichtbar, bis der Pegel stimmte · 2026-08-05*

- **Mehr Peak-Licht flacht Peak** — breites Licht +52 % p99, −11 % Struktur; weitere +75 % nur Delta 26 in Tonemap-Schulter. → Peak am Subjekt emittieren/geometrisch formen; Staubring später.
  *`FLASH_ICE=14`: 4,4 % statt Wash; Struktur 4,04→3,99 %, Clipping 0 · 2026-07-31*

- **Kontakt/Frost „zu schwach“** — Kill-Delta 12–22, Kontrast nur 8: zu wenig sichtbare Höhe. → Coverage-Fenster vor Amplitude; `sun`/`shadow` auf Clip/Absaufen.
  *Kontaktfenster 0,42/0,16→0,62/0,40: max Delta 23; Frost 33, Matrix ohne Clipping · 2026-07-31*

- **Lichtkanal ohne Lücke, harter Cut** — Afterglow überbrückt Präsenz; Peak-Prozent beschuldigt Ribbon. → Größten absoluten Framefall bei 60/120 fps; Fade halbiert, Branch-Cut gleich.
  *Legitim 0,50–0,60; echter Cut 0,987; Schwelle 0,75 · 2026-07-31*
