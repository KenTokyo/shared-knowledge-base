# Colyseus-Regeln für dieses Projekt

**Zweck:** Diese Datei ist die kompakte Projekt-Regeldatei für Multiplayer-Arbeit in `voxel-samurai-quiz`.

**Detail-Referenz:** `.agents/skills/starwards-colyseus/SKILL.md`

**Wichtig:** Dieses Projekt nutzt Colyseus aktuell vor allem als Room- und WebSocket-Transport mit eigenen `raid:snapshot`-Nachrichten. Es nutzt noch keine vollständige Colyseus-`Schema`-State-Sync-Pipeline für Raid/Dungeon.

## Kurzurteil

**Server ist die Wahrheit.**

Der Client darf Eingaben senden und Effekte anzeigen. Er darf aber nicht heimlich entscheiden, ob Boss, Add, Bot, Schaden, Cast oder Treffer wirklich passiert sind. Das entscheidet `server/multiplayer`.

## Projektarchitektur jetzt

- Room: `server/multiplayer/RaidLabRoom.ts`
- Server-Runtime: `server/multiplayer/raidRoomRuntime.ts`
- Dungeon-Runtime: `server/multiplayer/raidDungeonRuntime.ts`
- Client-Verbindung: `src/lib/multiplayer/colyseusRaidClient.ts`
- Protokolltypen: `src/lib/multiplayer/raidProtocol.ts`

Aktueller Fluss:

1. Client verbindet per `joinOrCreate(RAID_ROOM_NAME, { displayName, playerClass })`.
2. `onJoin()` registriert den Spieler im Server-Runtime-State.
3. Client sendet Absicht, z. B. `raid:input`, `raid:dungeonConfig`, `raid:dungeonAnswer`.
4. Server prüft und verändert seine Runtime.
5. Server sendet `raid:snapshot`.
6. Client normalisiert den Snapshot und rendert daraus UI, Figuren, Gegner, Boss und VFX.

## Harte Regeln

### 1. Client sendet Absicht, nicht Ergebnis

Erlaubt:

- `attack: true`
- Position, Blickrichtung, Skill-Cue
- Dungeon-Konfig, Antwort-Index, Leave/Reset

Nicht erlaubt:

- Client setzt Boss-HP direkt
- Client entscheidet Add-Tod direkt
- Client erzeugt echten Boss-Schaden ohne Serverprüfung
- Client setzt Boss-Cast als Wahrheit

### 2. Snapshot ist abgeleitet

`raid:snapshot` ist ein Bild vom Serverzustand, nicht der Zustand selbst.

Regel:

- Runtime-State bleibt intern auf dem Server.
- Snapshot enthält nur das, was Client/UI/VFX wirklich brauchen.
- Kein doppeltes Health-System in Snapshot und separaten Damage-Messages.
- Messages dürfen Effekte triggern, aber Werte kommen aus dem Snapshot.

### 3. Spieler muss im Server existieren

Wenn ein echter Spieler Boss/Add nicht angreifen kann, zuerst prüfen:

- Kommt `onJoin()` an?
- Hat `participants` den `client.sessionId`?
- Wird `localParticipantId` im Client gesetzt?
- Sendet der Client `raid:input` mit der gleichen Session?
- Ist Spieler tot, im Respawn oder außerhalb der aktiven Dungeon-Zone?
- Blockiert Dungeon-Logik `canDungeonParticipantAttackBoss()` oder Add-Priorität?

Kein Blindfix an Hitbox oder VFX, bevor diese Kette geprüft wurde.

### 4. Boss, Adds und Bots dürfen keine gekoppelte Bewegung haben

Jeder Bewegungstyp braucht eigene Quelle:

- Spieler: Client-Input, vom Server geklemmt.
- Dungeon-Bots: `moveDungeonBot(...)`.
- Adds: Add-KI und Zielwahl.
- Boss: `updateDungeonBossMovement(...)`.

Warnzeichen:

- Boss und Bots bewegen sich im gleichen Muster.
- Boss bewegt sich während Casts ohne Absicht.
- Adds laufen nur zum Ziel, greifen aber nie an.
- Target-ID zeigt auf nicht vorhandene oder tote Teilnehmer.

Dann prüfen:

1. Teilt sich Code versehentlich Orbit-/Boss-/Bot-Werte?
2. Wird während Casts ein Bewegungsprofil mit Lunge/Strafe angewandt?
3. Hat jede Einheit eigene `targetId`, Cooldowns und Attack-Pulse?
4. Wird `dtMs` begrenzt und stabil genutzt?

### 5. Casts brauchen Lock, Schaden und Feedback

Ein Boss-Cast ist erst korrekt, wenn alle drei Dinge stimmen:

- **Lock:** Boss bewegt sich nur so, wie der Cast es erlaubt.
- **Schaden:** Server wendet Schaden in der richtigen Zeit an.
- **Feedback:** Snapshot enthält Cue, Telegraphedaten, Pulse und Restzeit für Sound/VFX.

Wenn Sound oder Schaden fehlt:

1. Server: startet `bossCue`?
2. Server: zählt `bossCueRemainingMs` runter?
3. Server: wendet Mechanik-Schaden an?
4. Snapshot: enthält `bossCue`, `telegraph`, `attackPulse`, `damageWindowRemainingMs`?
5. Client: spielt Sound/VFX nur bei echter Cue-Änderung oder Pulse, nicht pro Render.

### 6. Hitbox zuerst serverseitig prüfen

Bei "Boss nicht angreifbar" nicht zuerst am Modell schrauben.

Prüfreihenfolge:

1. Server-Zielwahl: Add vor Boss oder Boss erlaubt?
2. Reichweite: Klassenrange vs. Boss-HitRadius.
3. Position: Server-Bossposition vs. Client-Bossposition.
4. Gate/Phase: Ist der Boss überhaupt verwundbar?
5. Damage-Multiplikator: blockt Spellshield, Phase oder Mechanik den Schaden?
6. Snapshot: sinkt Boss-HP auf dem Server, aber UI zeigt es nicht?

### 7. Snapshot-Budget schützen

Multiplayer ist teuer, weil jede Änderung übers Netz geht.

Regeln:

- Nur sichtbare/spielrelevante Werte senden.
- Große Arrays begrenzen, z. B. aktive Adds statt historische Adds.
- Zahlen runden, wenn Zentimeter nicht wichtig sind.
- Puls-Werte schnell abklingen lassen und nicht endlos senden.
- `estimatedSnapshotBytesPerTick` beobachten.
- Bei vielen Gegnern lieber Pooling/Instancing im Client nutzen statt mehr Snapshot-Daten.

Ziel: Mehr Gameplay zeigen, aber Netzwerk und Renderkosten kontrollieren.

### 8. Snapshot-Validierung bleibt Pflicht

Der Client muss Serverdaten defensiv normalisieren.

Pflicht:

- Unbekannte Enum-Werte auf sicheren Fallback setzen.
- Zahlen mit `Number.isFinite` prüfen.
- Radien, HP, Progress und Timer clampen.
- Arrays filtern, nicht blind rendern.
- Keine `Date.now()`-Fallbacks in Normalizern, wenn dadurch künstliche Änderungen entstehen.

### 9. Colyseus-`Schema` nur bewusst einführen

Wenn später echte Colyseus-`Schema`-State-Sync genutzt wird:

- Nur Felder synchronisieren, die Clients brauchen.
- Collections immer initialisieren: `new ArraySchema()`, `new MapSchema()`.
- Objekte nicht komplett ersetzen, sondern Eigenschaften mutieren.
- `float32` hat weniger Genauigkeit als JavaScript-`number`.
- TypeScript: `experimentalDecorators: true`, `useDefineForClassFields: false`.

Bis dahin gilt: Snapshot-System nicht halb mit Schema mischen. Entweder sauber migrieren oder bei Snapshot bleiben.

### 10. `devMode` ist kein Produktionsmodell

Colyseus-`devMode` hilft lokal beim Server-Neustart.

Regeln:

- Nicht für Produktion nutzen.
- Frontend muss doppelte `onAdd`/Reconnect-Effekte in Dev aushalten.
- Nur JSON-serialisierbare Daten in `onCacheRoom()` speichern.
- `onRestoreRoom()` läuft, bevor Clients wieder verbunden sind.

## Debug-Checkliste für die aktuellen Dungeon-Probleme

### Boss nicht angreifbar

- `onJoin()` Spieler angelegt?
- `raid:input` kommt an?
- `message.attack === true`?
- Spieler lebt und ist nicht im Respawn?
- Bossposition auf Server und Client gleich genug?
- `canDungeonParticipantAttackBoss(...)` erlaubt Schaden?
- Add-Ziel klaut den Angriff korrekt oder fälschlich?
- Boss-HP sinkt im Server-Snapshot?

### Gegner greifen nicht an

- Add hat lebendes `targetId`?
- Add ist in Reichweite?
- `attackCooldownRemainingMs` läuft runter?
- Attack-Damage wird serverseitig angewandt?
- `attackPulse` kommt im Snapshot an?
- Client zeigt Pulse/Sound/VFX aus Snapshot?

### Boss bewegt sich während Casts komisch

- Cast-Profil erlaubt Bewegung oder müsste locken?
- `updateDungeonBossMovement(...)` wendet Lunge/Strafe auch bei falschem Cue an?
- `bossCueRemainingMs` und `cueProgress` passen?
- Boss-Ziel ist stabil oder springt pro Tick?
- Leash/Clamp zieht Boss sichtbar zurück?

### Bots wirken mit Boss gekoppelt

- Dungeon-Bots nutzen wirklich `moveDungeonBot(...)`?
- Boss nutzt nur `updateDungeonBossMovement(...)`?
- Keine gemeinsamen Orbitwerte für Boss und Bots?
- Bot-Zielwahl und Boss-Zielwahl getrennt?
- Snapshot rendert Bots und Boss aus getrennten Feldern?

### Sound/VFX fehlen

- Server sendet eindeutigen Cue/Pulse?
- Client triggert Sound bei Änderung, nicht bei jedem Snapshot?
- Sound ist an `bossCue`/`attackPulse` gebunden?
- VFX ist sichtbar, aber nicht zu teuer: Pooling, Instancing, Caps.

## Arbeitsregel bei Multiplayer-Fixes

1. Repro oder Smoke prüfen.
2. Server-Quelle finden.
3. Snapshot prüfen.
4. Client-Normalisierung prüfen.
5. Rendering/VFX prüfen.
6. Performance-Budget prüfen.
7. `pnpm exec tsc --noEmit`
8. `pnpm lint`
9. Multiplayer-Änderungen committen und pushen, wenn die Phase fertig ist.

## Offizielle Quellen

- Colyseus State Synchronization: https://docs.colyseus.io/state
- Colyseus Core Concepts: https://docs.colyseus.io/concepts
- Colyseus Rooms/Lifecycle: https://docs.colyseus.io/room
- Colyseus State Sync Callbacks: https://docs.colyseus.io/sdk/state-sync-callbacks
- Colyseus Development Mode: https://docs.colyseus.io/server/devmode
