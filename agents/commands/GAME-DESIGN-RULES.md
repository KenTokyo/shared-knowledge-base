# GAME-DESIGN-RULES

Universelle Regeln fuer Spielentwicklung - Sound Design, 3D-Modellierung, VFX und Game Feel.

---

## 1. Sound Design mit Web Audio API

### Grundprinzipien fuer hochwertige Sounds

Synthetische Sounds klingen oft "dull" (stumpf/flach). Diese Techniken machen sie lebendig:

#### 1.1 Pflicht-Bausteine pro Sound

```typescript
// 1. Soft Clipper - warme Saettigung statt harter Verzerrung
const createSoftClipper = (amount: number = 3) => {
  const shaper = audioCtx.createWaveShaper();
  const samples = 512;
  const curve = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = Math.tanh(x * amount) / Math.tanh(amount);
  }
  shaper.curve = curve;
  shaper.oversample = '2x';
  return shaper;
};

// 2. Simple Reverb - Raumtiefe ohne Convolution-Datei
const createSimpleReverb = (duration: number, decay: number) => {
  const sampleRate = audioCtx.sampleRate;
  const length = sampleRate * duration;
  const impulse = audioCtx.createBuffer(2, length, sampleRate);
  for (let channel = 0; channel < 2; channel++) {
    const channelData = impulse.getChannelData(channel);
    for (let i = 0; i < length; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }
  const convolver = audioCtx.createConvolver();
  convolver.buffer = impulse;
  return convolver;
};

// 3. Dynamics Compressor - fuer "Punch"
const compressor = audioCtx.createDynamicsCompressor();
compressor.threshold.setValueAtTime(-6, now);   // Ab wann komprimieren
compressor.knee.setValueAtTime(3, now);          // Weicher Uebergang
compressor.ratio.setValueAtTime(12, now);        // Kompressionsstaerke (4-16 je nach Waffe)
compressor.attack.setValueAtTime(0.0005, now);   // Schneller Attack = mehr Punch
compressor.release.setValueAtTime(0.15, now);    // Release-Zeit
```

#### 1.2 Layering-Technik (WICHTIG!)

**Nie nur einen Oszillator verwenden!** Mindestens 3-5 Layer pro Sound:

| Layer | Frequenzbereich | Zweck | Oszillator-Typ |
|-------|-----------------|-------|----------------|
| **Sub Bass** | 20-80 Hz | Wucht/Gewicht | `sine` |
| **Low-Mid** | 80-300 Hz | Koerper/Punch | `triangle`, `sine` |
| **Mid** | 300-2000 Hz | Praesenz/Definition | `sawtooth`, `square` |
| **High-Mid** | 2000-5000 Hz | Crispness/Attack | `sawtooth`, `square` |
| **Air/Sizzle** | 5000+ Hz | Brillanz | `triangle`, Noise |

#### 1.3 Detuning fuer reichere Harmonische

Zwei Oszillatoren mit leicht unterschiedlicher Frequenz erzeugen Schwebungen:

```typescript
mainOsc.frequency.setValueAtTime(2200, now);
mainOsc2.frequency.setValueAtTime(2205, now);  // +5 Hz Differenz = Chorus-Effekt
```

#### 1.4 Noise Bursts fuer Textur

```typescript
const playNoiseBurst = (
  start: number,
  duration: number,
  startGain: number,
  endGain: number,
  filterFreq: number,
  filterType: 'lowpass' | 'highpass' | 'bandpass'
) => {
  // Noise Buffer erstellen (einmal, dann cachen!)
  const source = audioCtx.createBufferSource();
  source.buffer = noiseBuffer;
  const filter = audioCtx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.setValueAtTime(filterFreq, start);
  // ... gain envelope
};

// Beispiel: Schrotflinten-Streuung
playNoiseBurst(now, 0.03, 0.25, 0.0001, 800, 'lowpass');      // Tiefer Bumms
playNoiseBurst(now + 0.002, 0.05, 0.18, 0.0001, 2000, 'bandpass'); // Mittentextur
playNoiseBurst(now + 0.005, 0.04, 0.12, 0.0001, 4500, 'highpass'); // Helligkeit
```

### Waffen-Archetypen

#### Blaster/Laser (Sci-Fi Pistole)
- Scharfer Transient (`square` bei 4500Hz runter auf 1200Hz in 8ms)
- Frequenz-Sweep abwaerts (2200Hz -> 350Hz)
- Soft Clipping Amount: 2-4
- Kurzer Reverb (0.3s, Decay 3)
- Kompressor Ratio: 8:1

#### Shotgun (Standard)
- EXPLOSIVER initialer Bang
- Doppelter Sub-Bass (100Hz + 50Hz)
- Mid-Crunch mit Distortion (Amount 8)
- Mechanischer Pump-Click (verzögert um 10ms)
- Laengerer Reverb (0.5s, Decay 2.5)
- Kompressor Ratio: 12:1, Attack 0.5ms

#### Heavy Shotgun / Kanone
- MASSIVER Kanonen-Impact (Soft Clip Amount 10+)
- DREIFACHER Sub-Bass (70Hz + 35Hz + 55Hz)
- Brutaler Mid-Crunch (Distortion Amount 12)
- Metallischer Shell-Casing Ring (Bandpass Q=12)
- High-Crack fuer Definition
- Laengster Reverb (0.8s, Decay 2)
- Kompressor Ratio: 16:1, Attack 0.3ms

#### SMG / Silenced
- Kann "dumpfer" klingen (ist gewollt)
- Weniger High-Frequency
- Kuerzere Decay-Zeiten
- Weniger Reverb

### Signal-Kette (Routing)

```
[Oszillatoren] -> [Soft Clipper] -> [Filter] -> [Gain Envelope] -> [Master Gain]
                                                                        |
                                                                        ├-> [Compressor] -> [Destination]
                                                                        |
                                                                        └-> [Reverb] -> [Reverb Gain] -> [Destination]
```

---

## 2. 3D-Modellierung (Blender -> Web)

### 2.1 Programmierte 3D-Modelle (ohne Blender)

Claude kann OBJ/MTL direkt als Text schreiben:

```
# vertices
v x y z
# normals
vn x y z
# texture coords
vt u v
# faces
f v1/vt1/vn1 v2/vt2/vn2 v3/vt3/vn3
```

**MTL fuer Emissive Glow:**
```
newmtl GlowMaterial
Kd 0.0 1.0 1.0      # Diffuse Color
Ke 0.0 1.0 1.0      # Emissive Color
Ns 100              # Shininess
```

### 2.2 Beat-Saber-Style Modeling

1. **Grosse klare Formen** - keine feinen chaotischen Details
2. **Saubere Bevels** - Kanten leicht abgerundet
3. **Wenige dominante Cuts** - klare Silhouette
4. **Starke Emissive-Kanten** - Hero-Look durch Glow
5. **Material-Rollen** sauber benennen: `base`, `trim`, `glow`

### 2.3 Export-Checkliste

- [ ] Pivot korrekt (Mitte des Objekts oder Handle-Position)
- [ ] Front-/Muzzle-Richtung konsistent (-Z oder +Z)
- [ ] LOD-Variante fuer Performance
- [ ] Material-Namen beschreibend
- [ ] Keine N-Gons (nur Tris/Quads)

---

## 3. Particle/Smoke Design Patterns

### 3.1 Smoke-Sphere-Technik

Dunkle Spheres (`#222222`) mit niedriger Opacity (0.3), langsam aufsteigend und expandierend.
Erzeugt natuerlichen Rauch-Look ohne teure Volumetrics.

### 3.2 Geometrie-Wahl

| Effekt | Geometrie | Warum |
|--------|-----------|-------|
| Flammen/Explosionen | `IcosahedronGeometry`, `SphereGeometry` | Weich, organisch |
| Smoke | Low-poly Spheres (6 segments) | Spart Draw-Calls |
| Sparks | Points oder kleine Spheres | Physik-faehig |
| **VERMEIDEN** | `ConeGeometry` | Wirkt spitz/unnatuerlich |

### 3.3 3-Layer-System

1. **Hauptflammen**: Helle Farben, schnell aufsteigend, Flicker-Animation
2. **Funken/Embers**: Kleine Partikel mit Physik, Gravitation, Gluehen
3. **Rauch**: Dunkel, langsam, expandierend (Kontrast!)

### 3.4 Wind/Gust-Effekte

- Partikel-Geschwindigkeit: 60-100 units/sec fuer Impact-Feel
- Fruehes Fade-out (ab 30% Progress) - kein "Nachhaengen"
- Shockwave-Ringe mit Additive Blending

### 3.5 Animation-Timing

- **Snappy** sein: kurze Duration, hohe Anfangsgeschwindigkeit
- Exponential-Out Easing (schneller Start, langsames Ende)
- Camera-Shake: stark am Anfang (0.25-0.4), schneller Decay (3.5+)

---

## 4. Game Feel / Juice

### 4.1 Screen Effects

- **Damage Shake**: Amplitude 0.1-0.3, Decay exponentiell
- **Hit Freeze**: 20-50ms Pause bei starken Treffern
- **Chromatic Aberration**: Kurz bei Impact
- **Vignette**: Pulse bei Low HP

### 4.2 Weapon Feel

- **Recoil**: Waffe nach hinten/oben, Kamera leicht mit
- **Muzzle Flash**: Point Light + Sprite, 1-2 Frames
- **Shell Ejection**: Physik-Huelsen mit Klang
- **Heat Glow**: Lauf gluehend bei Ueberhitzung

### 4.3 UI Feedback

- **Hit Markers**: Kurzer Crosshair-Pulse
- **Damage Numbers**: Pop-in mit Scale, Float nach oben
- **Kill Confirmation**: Satter Sound + Screen-Flash

---

## 5. Performance-Regeln

1. **Nur aktive Waffe updaten** - inaktive Shells aus `useFrame` raus
2. **Partikel-Pools** - keine Runtime-Allokationen
3. **LOD-System** - Detail-Stufen nach Distanz
4. **Grafikstufen** - FX pro Setting staffeln
5. **Keine per-frame `traverse`** fuer Materialien

---

## Referenz-Implementierung

Siehe: `src/utils/audio.ts` im Quiz-Blaster-Arena Projekt fuer vollstaendige Sound-Implementierungen.
