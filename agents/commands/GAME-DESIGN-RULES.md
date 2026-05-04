# GAME-DESIGN-RULES

Universelle Richtlinien fuer Spielentwicklung. Diese Patterns sind **optional** und dienen als Orientierung.

---

## 0. WICHTIG: Immer zuerst recherchieren!

**Vor jeder Implementierung WebFetch oder WebSearch nutzen:**

```
WebFetch: "web audio api [sound-typ] synthesis tutorial"
WebFetch: "three.js [effekt-typ] particle system example"
WebFetch: "game audio design [kategorie] best practices"
WebFetch: "blender [objekt-typ] low poly tutorial"
```

**Warum?** Jedes Spiel hat andere Anforderungen. Diese Regeln sind Ausgangspunkte, keine absoluten Vorgaben. Recherche liefert aktuelle Best Practices und Beispielcode.

---

## 1. Sound Design mit Web Audio API

### Grundproblem

Synthetische Sounds klingen oft "dull" (stumpf/flach). Diese Bausteine helfen:

### 1.1 Kern-Bausteine (optional, aber empfohlen)

```typescript
// Soft Clipper - warme Saettigung statt harter Verzerrung
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

// Simple Reverb - Raumtiefe ohne externe Datei
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

// Dynamics Compressor - fuer "Punch"
const compressor = audioCtx.createDynamicsCompressor();
compressor.threshold.setValueAtTime(-6, now);
compressor.knee.setValueAtTime(3, now);
compressor.ratio.setValueAtTime(12, now);
compressor.attack.setValueAtTime(0.0005, now);
compressor.release.setValueAtTime(0.15, now);
```

### 1.2 Layering-Technik

Fuer vollere Sounds mehrere Frequenzbereiche kombinieren:

| Layer | Frequenzbereich | Zweck | Oszillator-Typ |
|-------|-----------------|-------|----------------|
| Sub Bass | 20-80 Hz | Wucht/Gewicht | `sine` |
| Low-Mid | 80-300 Hz | Koerper | `triangle`, `sine` |
| Mid | 300-2000 Hz | Praesenz | `sawtooth`, `square` |
| High-Mid | 2000-5000 Hz | Attack | `sawtooth`, `square` |
| Air | 5000+ Hz | Brillanz | `triangle`, Noise |

### 1.3 Detuning

Zwei Oszillatoren mit leicht unterschiedlicher Frequenz = reichere Harmonische:

```typescript
osc1.frequency.setValueAtTime(440, now);
osc2.frequency.setValueAtTime(443, now);  // +3 Hz = Chorus-Effekt
```

### 1.4 Noise Bursts

Fuer Texturen (Explosionen, Impacts, Atmosphaere):

```typescript
const playNoiseBurst = (start, duration, startGain, endGain, filterFreq, filterType) => {
  const source = audioCtx.createBufferSource();
  source.buffer = noiseBuffer; // einmal erstellen, dann cachen!
  const filter = audioCtx.createBiquadFilter();
  filter.type = filterType; // 'lowpass', 'highpass', 'bandpass'
  filter.frequency.setValueAtTime(filterFreq, start);
  // ... gain envelope
};
```

### 1.5 Signal-Kette

```
[Oszillatoren] -> [Soft Clipper] -> [Filter] -> [Gain] -> [Master]
                                                              |
                                                              ├-> [Compressor] -> [Output]
                                                              └-> [Reverb] -> [Output]
```

### Sound-Beispiele (NUR zur Orientierung - immer recherchieren!)

| Sound-Typ | Recherche-Suchbegriff |
|-----------|----------------------|
| Explosionen | "web audio explosion sound synthesis" |
| UI Clicks | "web audio ui sound design" |
| Ambient | "web audio ambient soundscape tutorial" |
| Impact/Hit | "web audio impact sound procedural" |
| Magic/Spell | "web audio magic spell sound synthesis" |
| Engine/Motor | "web audio engine sound synthesis" |

---

## 2. 3D-Modellierung

### 2.1 Vor jeder 3D-Arbeit recherchieren

```
WebFetch: "three.js [objekt-typ] model example"
WebFetch: "low poly [objekt-typ] blender tutorial"
WebFetch: "gltf [objekt-typ] free model"
```

### 2.2 Programmierte Modelle (OBJ/MTL)

Claude kann einfache 3D-Modelle als Text schreiben:

```
# OBJ Format
v x y z           # Vertex
vn x y z          # Normal
vt u v            # Texture Coord
f v1/vt1/vn1 ...  # Face

# MTL Format
newmtl MaterialName
Kd 0.8 0.8 0.8    # Diffuse
Ke 0.0 1.0 1.0    # Emissive (Glow)
Ns 100            # Shininess
```

### 2.3 Export-Checkliste (optional)

- [ ] Pivot-Position sinnvoll
- [ ] Achsen-Orientierung konsistent
- [ ] Material-Namen beschreibend
- [ ] Nur Tris/Quads (keine N-Gons)
- [ ] LOD-Variante falls Performance kritisch

---

## 3. Partikel & VFX (optional)

### Allgemeine Patterns

| Pattern | Beschreibung |
|---------|--------------|
| **Smoke-Spheres** | Dunkle Spheres mit niedriger Opacity, langsam aufsteigend |
| **Multi-Layer** | Mehrere Partikel-Systeme ueberlagert (z.B. Flammen + Funken + Rauch) |
| **Noise-basierte Bewegung** | Perlin/Simplex Noise fuer organische Bewegung |
| **Object Pooling** | Partikel recyclen statt neu erstellen |

### Geometrie-Empfehlungen

| Effekt | Geometrie |
|--------|-----------|
| Organisch (Flammen, Rauch) | `SphereGeometry`, `IcosahedronGeometry` |
| Funken | Points oder kleine Spheres |
| Debris | Box/Plane mit Physik |

### Timing-Richtlinien

- **Snappy**: Kurze Duration, hohe Anfangsgeschwindigkeit
- **Easing**: Exponential-Out (schneller Start, langsames Ende)
- **Fade**: Frueh beginnen (ab 30-50% Lifetime)

---

## 4. Game Feel / Juice (optional)

Patterns die Spiele "besser anfuehlen" lassen:

| Kategorie | Beispiele |
|-----------|-----------|
| **Screen Effects** | Shake, Flash, Chromatic Aberration, Vignette |
| **Animation** | Squash & Stretch, Anticipation, Follow-through |
| **Audio Feedback** | Layered Sounds, Pitch Variation, Spatial Audio |
| **UI Feedback** | Scale-Pulse, Color-Flash, Particle Burst |
| **Time Manipulation** | Hit-Freeze, Slow-Mo, Speed-Ramp |

**Immer recherchieren:** `WebFetch: "game feel juice [effekt-typ] tutorial"`

---

## 5. Performance (wichtig!)

| Regel | Beschreibung |
|-------|--------------|
| **Object Pooling** | Keine Runtime-Allokationen in Loops |
| **LOD** | Detail-Stufen nach Distanz |
| **Culling** | Unsichtbares nicht rendern |
| **Batching** | Draw-Calls minimieren |
| **Update-Throttling** | Nicht alles jeden Frame updaten |

---

## Recherche-Workflow

1. **Sound**: `WebFetch: "web audio [sound-typ] synthesis"`
2. **3D**: `WebFetch: "three.js [objekt] example"` oder `"blender [objekt] low poly"`
3. **VFX**: `WebFetch: "three.js [effekt] particle system"`
4. **Game Feel**: `WebFetch: "game juice [effekt] implementation"`

**Diese Regeln sind Ausgangspunkte. Jedes Projekt hat eigene Anforderungen - daher immer zuerst recherchieren!**
