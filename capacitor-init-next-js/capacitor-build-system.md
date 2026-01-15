# =' Capacitor Build System

| Komponente | Art | Beschreibung |
|------------|-----|--------------|
| capacitor.config.ts | Config | Capacitor-Konfiguration für Android/iOS Apps mit Development-Server-Integration |
| initCapacitor() | Method | Initialisiert native Plugins: StatusBar, Keyboard, App-State-Listener |
| isCapacitorEnvironment() | Method | Prüft ob App in Capacitor-Umgebung läuft (nicht im Browser) |
| isCapacitorOrigin() | Method | Erkennt Capacitor-Origin (capacitor:// oder https://localhost) |
| triggerHapticFeedback() | Method | Erzeugt Haptic-Feedback mit verschiedenen Intensitäten (light/medium/heavy) |
| exitApp() | Method | Schließt App in nativer Umgebung |
| SplashScreen Config | Config | 2s Splash-Screen mit schwarzem Hintergrund und weißem Spinner |
| Development Server | Config | Verbindung zu localhost:3000 für Live-Development |

## Build-Strategie
- **Hosted (server.url gesetzt):** Kein `output: 'export'`, kein `next export`, WebView laedt die gehostete App.
- **Static (webDir Export):** Nur ohne Server Actions; `images.unoptimized` fuer Export noetig.

## Edge Cases
- **Server-Side Safety**: Alle Capacitor-Methoden prüfen `typeof window === 'undefined'`
- **Dynamic Imports**: Vermeidet TypeScript-Errors bei Server-Side-Rendering
- **Plugin-Fallback**: Graceful Degradation wenn Capacitor-Plugins nicht verfügbar sind
- **Environment Detection**: Unterscheidet zwischen Browser, Localhost-Testing und Native-App
