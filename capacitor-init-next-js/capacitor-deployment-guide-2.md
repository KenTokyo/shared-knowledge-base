# Next.js ➜ Native Mobile mit Capacitor (optional: Ionic)

*Einfach erklärt, schön formatiert, mit Icons & Beispielen*

---

## Inhaltsverzeichnis

1. [Warum Capacitor?](#warum-capacitor)
2. [Capacitor vs. React Native vs. Flutter](#vergleich)
3. [Voraussetzungen](#voraussetzungen)
4. [Projekt vorbereiten (Next.js)](#next-setup)
5. [Hosted Modus (kein Static Export)](#hosted-mode)
6. [Static Export für Capacitor](#static-export)
7. [Capacitor in Next.js einrichten](#cap-setup)
8. [iOS/Android-Projekte erzeugen & öffnen](#native-projects)
9. [Live Reload/Hot Reload einrichten](#live-reload)
10. [Capacitor-Plugins nutzen (Beispiel: Share)](#plugins)
11. [Optional: Ionic UI in Next.js](#ionic)
12. [SSR-Probleme mit Web Components lösen](#ssr)
13. [Plattform-spezifische UI & Checks](#platform)
14. [PWA-Hinweis](#pwa)
15. [Troubleshooting & Tipps](#troubleshooting)
16. [Command-Cheatsheet](#cheatsheet)

---

## Warum Capacitor? <a id="warum-capacitor"></a>

🧩 **Drop-in für Web-Apps:** Capacitor packt deine bestehende Web-App (React/Next.js, Vue, Svelte, Angular, …) in eine **native WebView** (iOS: `WKWebView`, Android: `WebView`) – **ohne** komplettes Umschreiben in ein anderes UI-System.
🔌 **Native Brücke:** Greife per JS auf **Kamera, Share, Files, Geolocation** u. v. m. zu – über Plugins.
🛠️ **Ein Codebase:** Web, iOS, Android + optional PWA.

**Kurz:**

* Du behältst deine Next.js-App ✅
* Du bekommst echte native Binaries ✅
* Du kannst Schritt für Schritt native Features ergänzen ✅

---

## Capacitor vs. React Native vs. Flutter <a id="vergleich"></a>

| Kriterium      | Capacitor                      | React Native                  | Flutter                |
| -------------- | ------------------------------ | ----------------------------- | ---------------------- |
| UI             | WebView (HTML/CSS/JS)          | Native Controls (JS/TS)       | Eigene Engine (Dart)   |
| Lernkurve      | gering (Web-Stack)             | mittel                        | hoch (Dart + Widgets)  |
| Code-Reuse Web | **maximal**                    | logisch/State, aber UI anders | gering                 |
| Plugins        | JS-API → native Bridge         | viele                         | viele                  |
| Use-Case       | Web-App schnell „mobil machen“ | mobile-first                  | performante Custom-UIs |

---

## Voraussetzungen <a id="voraussetzungen"></a>

* 🧰 Node.js + npm
* 📱 Für iOS: Xcode (macOS), Apple Developer Account zum Signieren
* 🤖 Für Android: Android Studio + SDK
* ✅ Bestehendes Next.js-Projekt oder `npx create-next-app`

---

## Projekt vorbereiten (Next.js) <a id="next-setup"></a>

```bash
# Beispiel: neues Next-Projekt
npx create-next-app my-app
cd my-app
npm run dev
```

---

## Hosted Modus (kein Static Export) <a id="hosted-mode"></a>

Wenn du **Server Actions, Auth oder DB** nutzt, ist Static Export unpassend.  
Dann laeuft die App **gehostet** und Capacitor oeffnet einfach deine URL.

**Vorteil:** Kein `output: 'export'`, kein `next export`, alles laeuft wie im Web.

**Capacitor Config (Hosted URL):**

```ts
const config: CapacitorConfig = {
  webDir: 'www',
  server: { url: 'https://deine-app.de', cleartext: false }
};
```

**Build-Flow:**

```bash
npm run build
npx cap sync
```

**Merksatz:** Hosted = `output: 'export'` bleibt **aus**.

---

## Static Export für Capacitor <a id="static-export"></a>

**Nur nutzen, wenn du keinen Server brauchst** (keine Server Actions).  
Capacitor lädt dann deine **build-Ausgabe** als statische Files. In Next.js dafür **`next export`** verwenden.

**`package.json` – Scripts ergänzen**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "static": "next build && next export" // erzeugt ./out
  }
}
```

**Wichtig (Images & Export):**
Next Image-Optimierung funktioniert im Export nicht automatisch. Deaktiviere sie:

**`next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true }, // nötig für next export
};
export default nextConfig;
```

**Bauen/Exportieren**

```bash
npm run static   # erzeugt ./out mit index.html etc.
```

---

## Capacitor in Next.js einrichten <a id="cap-setup"></a>

### 1) CLI & Core installieren

```bash
npm i -D @capacitor/cli
npm i @capacitor/core
```

### 2) Initialisieren

```bash
npx cap init
# App-Name & Package-ID eingeben (z. B. com.example.myapp)
```

Es entsteht eine `capacitor.config.*` – stelle **Web-Ordner** auf `out`:

**`capacitor.config.ts` (oder .json/.js)**

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'My App',
  webDir: 'out',     // <-- wichtig: statischer Export
  bundledWebRuntime: false
};

export default config;
```

---

## iOS/Android-Projekte erzeugen & öffnen <a id="native-projects"></a>

### 1) Plattform-Packages installieren

```bash
npm i @capacitor/ios @capacitor/android
```

### 2) Native Projekte hinzufügen

```bash
npx cap add ios
npx cap add android
```

### 3) Öffnen

```bash
npx cap open ios      # öffnet Xcode
npx cap open android  # öffnet Android Studio
```

> 🔁 **Merke:** Nach *jedem* Web-Build oder Config-Änderung: `npx cap sync`

---

## Live Reload/Hot Reload einrichten <a id="live-reload"></a>

Ziel: Änderungen in Next.js **sofort** auf Gerät/Simulator sehen.

1. **Lokale IP** deines Rechners ermitteln (z. B. `ipconfig`/`ifconfig`).
2. In `capacitor.config.ts` eine **Server-Section** hinzufügen:

```ts
const config: CapacitorConfig = {
  // ...
  server: {
    url: 'http://192.168.0.42:3000', // deine lokale IP + Port
    cleartext: true
  }
};
```

3. **Next Dev** starten:

```bash
npm run dev -- -p 3000
```

4. **Syncen & neu deployen**:

```bash
npx cap sync
npx cap open ios   # bzw. android, dann App starten
```

Jetzt lädt die native App deine Dev-URL – Änderungen erscheinen sofort.

> ℹ️ Änderst du **native** Dinge (Plugins, iOS/Android-Code), musst du erneut bauen/neu deployen.

---

## Capacitor-Plugins nutzen (Beispiel: Share) <a id="plugins"></a>

### 1) Plugin installieren & syncen

```bash
npm i @capacitor/share
npx cap sync
```

### 2) In einer Seite verwenden (React/Next)

```tsx
// app/page.tsx oder pages/index.tsx
'use client';

import { Share } from '@capacitor/share';

export default function Home() {
  const onShare = async () => {
    await Share.share({
      title: 'Schau mal!',
      text: 'Teile diesen großartigen Link 🚀',
      url: 'https://example.com'
    });
  };

  return (
    <main>
      <h1>Willkommen 👋</h1>
      <button onClick={onShare}>Teilen</button>
    </main>
  );
}
```

> 💡 Viele Plugins haben **Web-Fallbacks**. Auf iOS/Android wird die **native Implementierung** genutzt, im Browser ggf. die Web-Variante.

---

## Optional: Ionic UI in Next.js <a id="ionic"></a>

Ionic liefert **adaptive, mobile-freundliche** React-Komponenten (iOS-/Material-Look).

### 1) Pakete installieren

```bash
npm i @ionic/react ionicons
```

### 2) Globale Styles & Setup

Füge die CSS-Imports und das Setup **einmalig** ein (z. B. in `app/layout.tsx` oder `_app.tsx`):

```tsx
// styles (wichtig – Reihenfolge!)
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/display.css';

// optionale Utilities
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import { setupIonicReact } from '@ionic/react';
setupIonicReact();
```

### 3) Transpile-Fix (falls nötig)

Ionic (Stencil Web Components) müssen in Next oft transpiliert werden.

**`next.config.mjs`**

```js
import withTM from 'next-transpile-modules';

const tm = withTM([
  '@ionic/react',
  '@stencil/core',
  'ionicons'
]);

export default tm({
  images: { unoptimized: true }
});
```

### 4) Viewport-Meta (für korrekte mobile Darstellung)

Füge sicher das **Viewport-Meta** im Head ein:

```tsx
// app/layout.tsx <head>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

### 5) Erstes Ionic-UI

```tsx
'use client';

import { IonHeader, IonToolbar, IonTitle, IonButton, IonContent } from '@ionic/react';

export default function Page() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meine App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block">Los geht’s</IonButton>
      </IonContent>
    </>
  );
}
```

---

## SSR-Probleme mit Web Components lösen <a id="ssr"></a>

Ionic-Web-Components können bei **Server-Side-Rendering** Hydration-Fehler erzeugen.

### Lösung A: Client-Only Wrapper (empfohlen)

Nutze Next.js **Dynamic Import** ohne SSR:

```tsx
// app/ionic-client.tsx
'use client';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
export default function IonicHeader() {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Header</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}
```

```tsx
// app/page.tsx
import dynamic from 'next/dynamic';
const IonicHeader = dynamic(() => import('./ionic-client'), { ssr: false });

export default function Page() {
  return (
    <>
      <IonicHeader />
      {/* restliche Inhalte */}
    </>
  );
}
```

### Lösung B: Universeller „No-SSR“ Wrapper

```tsx
// components/NoSSR.tsx
'use client';
import { useEffect, useState } from 'react';

export default function NoSSR({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready ? <>{children}</> : null;
}
```

---

## Plattform-spezifische UI & Checks <a id="platform"></a>

Capacitor erkennt die Laufzeit-Plattform. So blendest du z. B. einen nativen Header **nur** auf Geräten ein:

```tsx
'use client';
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform(); // true auf iOS/Android

export function MaybeNativeHeader() {
  if (!isNative) return null;
  return <header>📱 Native Header</header>;
}
```

Ionic passt Styles **automatisch** an:

* iOS → **Cupertino-Look**
* Android/Web → **Material Design**

---

## PWA-Hinweis <a id="pwa"></a>

Deine Next.js-App kann **zusätzlich** als **PWA** ausgeliefert werden (Service Worker, Manifest).
Capacitor & PWA sind **komplementär**: Web-User bekommen PWA, Stores bekommen native Apps.

---

## Troubleshooting & Tipps <a id="troubleshooting"></a>

* 🔁 **Änderungen greifen nicht:**

  * Web-Code geändert → `npm run static` **oder** Dev-Server (Live Reload) läuft.
  * Native/Plugins/Config geändert → `npx cap sync`, dann in Xcode/Android Studio neu bauen.
* 🖼️ **`next export` bricht wegen Images:** `images.unoptimized = true` im Next-Config.
* 🌐 **Live Reload lädt nicht:** Prüfe **korrekte lokale IP**, Port freigeben, `cleartext: true`.
* 🧩 **Hydration/SSR-Fehler mit Ionic:** Komponenten **client-only** rendern (`ssr: false`).
* 🧪 **Plugin fehlt nativ:** Immer `npx cap sync` nach `npm i @capacitor/<plugin>`.
* 🔏 **iOS auf echtem Gerät:** In Xcode unter **Signing & Capabilities** Team wählen.
* 🧱 **Firewall/Netzwerk:** Simulator/Gerät muss deine Dev-IP erreichen (gleiches WLAN).

---

## Command-Cheatsheet <a id="cheatsheet"></a>

```bash
# Next.js
npm run dev                 # Dev-Server (für Live Reload)
npm run build               # Build
npm run static              # Build + Export (./out)

# Capacitor
npx cap init                # Projekt initialisieren
npm i @capacitor/core @capacitor/cli -D
npm i @capacitor/ios @capacitor/android
npx cap add ios             # iOS-Projekt erstellen
npx cap add android         # Android-Projekt erstellen
npx cap sync                # Web/Plugins -> native Projekte syncen
npx cap open ios            # in Xcode öffnen
npx cap open android        # in Android Studio öffnen

# Plugins
npm i @capacitor/share
npx cap sync
```

---

## Mini-Checkliste (🟢 = fertig, 🟡 = prüfen)

* 🟢 Next.js `next export` erzeugt `out/`
* 🟢 `capacitor.config` → `webDir: 'out'`
* 🟢 `npx cap add ios/android`
* 🟡 Live Reload: `server.url` auf lokale IP zeigen
* 🟡 iOS Signing (echtes Gerät)
* 🟡 Ionic nur client-seitig rendern (SSR aus)
* 🟢 Plugins nach Installation `npx cap sync`

---

### Fazit

Mit **Capacitor** verwandelst du deine **existierende Next.js-App** sehr schnell in **echte native iOS/Android-Apps** – inklusive Live Reload, nativen Plugins und optional **Ionic** für mobile-optimierte UI. Ideal, wenn du **Web-Know-how** maximal wiederverwenden möchtest. 🚀
