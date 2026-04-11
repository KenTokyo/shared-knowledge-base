# 📱 Capacitor Deployment Guide - TrackMe AI App

## 🎯 Übersicht

Diese Anleitung führt dich durch den kompletten Deployment-Prozess deiner **TrackMe AI App** über Capacitor - vom lokalen Testen bis zur Play Store Veröffentlichung.

**App-Details:**
- **App ID:** `com.trackmeai.app`
- **App Name:** TrackMe AI
- **Package Name:** `trackme-ai`
- **Framework:** Next.js 14 + Capacitor 7
- **Plattformen:** Android (aktuell konfiguriert), iOS (vorbereitet)

---

## 📋 Voraussetzungen

### ✅ Software-Requirements
1. **Android Studio** (neueste Version)
2. **Android SDK** (API Level 33+)
3. **Java Development Kit (JDK 17+)**
4. **Node.js** (v18+)
5. **Capacitor CLI** (bereits installiert)

### ✅ Entwickler-Accounts
- **Google Play Console Account** (für Play Store)
- **Keystore für App-Signierung** (für Production)

---

## 🚀 Phase 1: Lokales Testen auf dem Handy

### 1.1 Development-Build erstellen
```bash
# 1. Dependencies installieren
npm install

# 2. Next.js Build erstellen
npm run build

# 3. Static Export für Capacitor
npm run static

# 4. Capacitor synchronisieren
npm run cap:sync
```

> ✅ **Hosted-Modus (empfohlen bei Server Actions):** Wenn `server.url` gesetzt ist, brauchst du **kein** `output: 'export'` und **kein** `next export`. Dann reichen `npm run build` + `npm run cap:sync`.

> ⚠️ **Wichtig (Next.js 14.2.32):** Während `npm run build` legt Next alle Server-Chunks zuerst unter `.next/server/chunks/` ab. Unser neues `ServerChunkMirrorPlugin` spiegelt diese Dateien automatisch ins Server-Root, damit `next export` nicht mehr mit `Cannot find module './1682.js'` abstürzt. Falls der Build trotzdem meckert, wiederhole `npm run build` und prüfe den Status mit `npx tsx scripts/build/chunk-mirror-log.ts` – nur wenn dort `Alle Chunks sind gespiegelt.` steht, ist der Export bereit.

### 1.2 Android-Projekt öffnen
```bash
# Android Studio mit dem Projekt öffnen
npm run cap:open:android
```

### 1.3 Gerät vorbereiten
1. **Entwickleroptionen aktivieren:**
   - Gehe zu `Einstellungen > Über das Telefon`
   - Tippe 7x auf `Build-Nummer`
   - Entwickleroptionen sind nun aktiviert

2. **USB-Debugging aktivieren:**
   - Gehe zu `Einstellungen > Entwickleroptionen`
   - Aktiviere `USB-Debugging`

3. **Handy verbinden:**
   - USB-Kabel anschließen
   - Debugging-Berechtigung bestätigen

### 1.4 App auf Gerät installieren
```bash
# Direkt auf verbundenem Gerät installieren und starten
npm run cap:run:android
```

**Alternative in Android Studio:**
1. Gerät in der Geräteliste auswählen
2. ▶️ Run-Button klicken
3. App wird automatisch installiert und gestartet

---

## 🔧 Phase 2: Production-Build vorbereiten

### 2.1 Capacitor-Config für Production anpassen

**Aktuelle Config überprüfen (`capacitor.config.ts`):**
```typescript
const config: CapacitorConfig = {
  appId: "com.trackmeai.app",
  appName: "trackme-ai",
  webDir: "www",
  // ⚠️ Development Server (nur für lokales Testing!)
  server: {
    url: "http://192.168.0.118:3000",
    cleartext: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: true,
      spinnerColor: "#ffffff",
      androidSpinnerStyle: "large",
    },
  },
};
```

**Production-Config Optionen:**

**Option 1: Hosted Backend (Empfohlen für TrackMe AI mit Server Actions)**
```typescript
const config: CapacitorConfig = {
  appId: "com.trackmeai.app",
  appName: "trackme-ai",
  webDir: "www",
  // Zeigt auf deine deployed Next.js-App (z.B. Vercel)
  server: {
    url: "https://trackmeai.de", // Deine Production-URL
    cleartext: false,  // HTTPS verwenden!
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: true,
      spinnerColor: "#ffffff",
      androidSpinnerStyle: "large",
    },
  },
};
```

**Option 2: Vollständig Static (nur wenn Server Actions nicht benötigt)**
```typescript
const config: CapacitorConfig = {
  appId: "com.trackmeai.app",
  appName: "trackme-ai",
  webDir: "www",
  // Kein server-Block = verwendet statische Files aus www/
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#000000",
      showSpinner: true,
      spinnerColor: "#ffffff",
      androidSpinnerStyle: "large",
    },
  },
};
```

**Reminder:** Auch wenn wir `www/` exportieren, laufen ALLE Server Actions und Datenmutationen weiterhin über die Production-URL im `server`-Block. Die Android-App ist eine WebView – stabile Builds entstehen nur, wenn `npm run static` erfolgreich ist UND der Mirror-Check ohne Fehlermeldung durchläuft.

### 2.2 Production-Build erstellen
```bash
# 1. Sauberer Build
npm run build

# 2. Static Export (wichtig für Capacitor!)
npm run static

# 3. Capacitor sync mit neuem Build
npm run cap:sync
```

---

## 📦 Phase 3: Android APK/AAB für Play Store

### 3.1 Wichtige Architektur-Entscheidung

**⚠️ TrackMe AI verwendet Server Actions!**

Diese App nutzt Next.js Server Actions für Datenbankzugriffe. Das bedeutet:

**Deployment-Strategie:**
1. **Next.js App auf Server deployen** (z.B. Vercel, Railway, AWS)
2. **Capacitor App zeigt auf diese URL** (siehe Config oben)
3. **App benötigt Internet-Verbindung** für alle Features

**Vorteile:**
- ✅ Alle Features funktionieren (AI, Datenbank, Auth)
- ✅ Updates ohne App-Store-Review (nur Web-Code ändern)
- ✅ Zentrale Datenbank für alle Geräte

**Nachteile:**
- ❌ Keine Offline-Funktionalität (außer gecachte Daten)
- ❌ Abhängig von Server-Verfügbarkeit

### 3.2 Keystore erstellen (einmalig)
```bash
# Keystore für App-Signierung erstellen
keytool -genkey -v -keystore trackmeai-release-key.keystore -alias trackmeai -keyalg RSA -keysize 2048 -validity 10000

# Wichtige Informationen notieren:
# - Keystore-Passwort
# - Key-Alias: trackmeai
# - Key-Passwort
```

⚠️ **WICHTIG:** Keystore-Datei und Passwörter sicher aufbewahren! Ohne diese kannst du keine Updates veröffentlichen.

### 3.3 Android Studio Build-Konfiguration

1. **Android Studio öffnen:**
   ```bash
   npm run cap:open:android
   ```

2. **Build Variant auf Release setzen:**
   - Links in der Seitenleiste: `Build Variants`
   - Module `app`: `debug` → `release` ändern

3. **Keystore konfigurieren:**
   - `Build > Generate Signed Bundle/APK`
   - `Android App Bundle` wählen (für Play Store)
   - Keystore-Pfad und Passwörter eingeben

### 3.4 App Bundle erstellen
```bash
# In Android Studio Terminal:
cd android
./gradlew bundleRelease

# Oder für APK:
./gradlew assembleRelease
```

**Output-Dateien:**
- **AAB (für Play Store):** `android/app/build/outputs/bundle/release/app-release.aab`
- **APK (für direktes Testen):** `android/app/build/outputs/apk/release/app-release.apk`

---

## 🌐 Phase 3.5: Backend deployen (WICHTIG!)

**⚠️ Vor Play Store Deployment MUSS dein Backend online sein!**

### Option A: Vercel (Empfohlen für Next.js)

1. **Vercel Account erstellen** (https://vercel.com)
2. **GitHub Repo verbinden**
3. **Environment Variables konfigurieren:**
   - Database URL (Supabase/Neon)
   - Auth Secrets (NextAuth)
   - API Keys (Google AI)

4. **Deployen:**
   ```bash
   # Via Vercel CLI
   npm i -g vercel
   vercel login
   vercel --prod
   ```

5. **Production-URL notieren** (z.B. `https://trackmeai.de`)

### Option B: Railway/Render/AWS

Ähnlicher Prozess wie Vercel - stelle sicher, dass:
- ✅ Environment Variables gesetzt sind
- ✅ Database erreichbar ist
- ✅ HTTPS aktiviert ist
- ✅ Domain/URL stabil bleibt (keine täglichen Änderungen!)

### Capacitor Config aktualisieren

Nach erfolgreichem Backend-Deployment:

```typescript
// capacitor.config.ts - PRODUCTION
const config: CapacitorConfig = {
  appId: "com.trackmeai.app",
  appName: "trackme-ai",
  webDir: "www",
  server: {
    url: "https://trackmeai.de", // ← Deine Production-URL!
    cleartext: false,
  },
  // ... rest
};
```

**Dann neu syncen:**
```bash
npm run cap:sync
```

---

## 🏪 Phase 4: Play Store Deployment

### 4.1 Google Play Console Setup
1. **App erstellen:**
   - App-Name: `TrackMe AI`
   - Sprache: Deutsch
   - App-/Spiel-Kategorie: `Gesundheit & Fitness`

2. **App-Identität:**
   - Package-Name: `com.trackmeai.app` (muss mit capacitor.config.ts übereinstimmen)

### 4.2 App-Bundle hochladen
1. **Testing Track:**
   - `Release > Testing > Internal Testing`
   - AAB-Datei hochladen
   - Release-Notes hinzufügen

2. **Production Release:**
   - Nach erfolgreichem Testing
   - `Release > Production`
   - AAB-Datei hochladen

### 4.3 Store-Listing konfigurieren
**Screenshots erforderlich:**
- 📱 Telefon-Screenshots (mindestens 2)
- 📱 7" Tablet-Screenshots (mindestens 1)
- 🎨 Feature-Grafik (1024 x 500 px)
- 🎨 App-Symbol (512 x 512 px)

**App-Beschreibung:**
```
TrackMe AI - Dein intelligenter Fitness & Lifestyle Tracker

🎯 Verfolge deine Fortschritte in Training, Ernährung und Lifestyle
📊 Detaillierte Analytics und Insights
🏃‍♂️ Krafttraining, Cardio und Schlaf-Tracking
🤖 KI-gestützte Datenerfassung mit Google Gemini
🎮 Gamification mit XP, Levels und Achievements
👥 Social Features: Teile deinen Fortschritt mit Freunden
📈 Personalisierte Trainingspläne und Ziele

Erreiche deine Ziele mit TrackMe AI!

HINWEIS: Diese App benötigt eine Internetverbindung für alle Features.
```

**Kategorie:** Gesundheit & Fitness
**Altersfreigabe:** Ab 13 Jahren

---

## 🔄 Phase 5: Update-Workflow

### 5.1 Version aktualisieren
```json
// package.json
{
  "version": "0.2.0"  // Version erhöhen
}
```

```bash
# Android Version aktualisieren
# In android/app/build.gradle:
# versionCode 2
# versionName "0.2.0"
```

### 5.2 Update-Build
```bash
# 1. Neue Version builden
npm run build && npm run static

# 2. Capacitor sync
npm run cap:sync

# 3. Signed Bundle erstellen
npm run cap:open:android
# In Android Studio: Build > Generate Signed Bundle/APK
```

### 5.3 Play Store Update
1. **Neue Release erstellen**
2. **AAB hochladen**
3. **Release-Notes hinzufügen**
4. **Review einreichen**

---

## 🛠️ Verfügbare NPM Scripts

```bash
# Development
npm run dev                 # Next.js Dev-Server starten
npm run cap:live:android   # Live-Reload auf Android-Gerät

# Building
npm run build              # Next.js Production-Build
npm run static             # Static Export für Capacitor

# Capacitor
npm run cap:sync           # Build zu Android/iOS synchronisieren
npm run cap:add:android    # Android-Plattform hinzufügen
npm run cap:open:android   # Android Studio öffnen
npm run cap:run:android    # Auf Android-Gerät installieren
npm run cap:build:android  # Sync + Android Studio öffnen

# Linting & Testing
npm run lint               # ESLint ausführen
npm run type-check         # TypeScript-Checks
```

---

## 🐛 Troubleshooting

### Problem: "Command failed: cap sync"
```bash
# Capacitor Cache leeren
npx cap clean
npm run cap:sync
```

### Problem: Android Studio kann Projekt nicht öffnen
```bash
# Android-Plattform neu hinzufügen
npx cap add android
npm run cap:sync
```

### Problem: App startet nicht auf Gerät
1. **Development server in capacitor.config.ts entfernen**
2. **Clean build erstellen:**
   ```bash
   rm -rf .next www
   npm run build && npm run static
   npm run cap:sync
   ```

### Problem: "App not installed" Fehler
```bash
# Bestehende App-Version deinstallieren
adb uninstall com.trackmeai.app
npm run cap:run:android
```

### Problem: Keystore-Fehler
```bash
# Keystore-Informationen anzeigen
keytool -list -v -keystore trackmeai-release-key.keystore
```

---

## 📚 Weitere Ressourcen

- [Capacitor Android Docs](https://capacitorjs.com/docs/android)
- [Android Studio Guide](https://developer.android.com/studio/intro)
- [Google Play Console Hilfe](https://support.google.com/googleplay/android-developer/)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

## ✅ Checkliste für ersten Release

- [ ] Dependencies installiert (`npm install`)
- [ ] Android Studio installiert und konfiguriert
- [ ] Handy mit USB-Debugging verbunden
- [ ] Development-Build getestet (`npm run cap:run:android`)
- [ ] Production-Config vorbereitet (server-Block entfernt)
- [ ] Keystore erstellt und sicher gespeichert
- [ ] Signed AAB erstellt
- [ ] Google Play Console Account eingerichtet
- [ ] App-Listing mit Screenshots konfiguriert
- [ ] Internal Testing durchgeführt
- [ ] Production-Release eingereicht

---

**🎉 Viel Erfolg beim Deployment deiner TrackMe AI App!**
