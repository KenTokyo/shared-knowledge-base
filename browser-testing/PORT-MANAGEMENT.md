# Port-Management Strategie für Browser-Testing

**Erstellt:** 2026-02-01
**Bezug:** Expo Web + Agent-Browser

---

## Übersicht

Diese Dokumentation beschreibt den Umgang mit Ports beim Browser-Testing der TrackMe-AI Mobile-App.

---

## Standard-Port-Konfiguration

### Expo/React Native Ports

| Service | Standard-Port | Beschreibung |
|---------|---------------|--------------|
| **Expo Web (Webpack)** | 8081 | Web-Version der App |
| **Metro Bundler** | 19000 | React Native Bundler |
| **Expo Dev Client** | 19001 | Development Client |
| **Expo DevTools** | 19002 | Browser-basierte DevTools |

### Backend-Ports (falls relevant)

| Service | Port | Beschreibung |
|---------|------|--------------|
| Backend API | 3000 | Express/NestJS Server |
| PostgreSQL | 5432 | Datenbank |

---

## Port-Konflikt Erkennung

### Symptome

**Expo-Ausgabe bei Konflikt:**
```
Port 8081 is already in use.
Would you like to run on another port? (Y/n)
```

**Agent-Browser Fehler:**
```
Error: Connection refused to localhost:8081
```

### Automatische Erkennung

Expo wählt automatisch den nächsten freien Port:
```
Starting Webpack on port 8082  # Falls 8081 belegt
```

**Wichtig:** Den tatsächlichen Port aus der Expo-Ausgabe ablesen!

---

## Lösungsstrategien

### Strategie A: Spezifischen Port verwenden

**Empfohlen für konsistente Tests.**

```bash
# Expo mit explizitem Port starten
cd apps/mobile && npx expo start --web --port 8082

# Agent-Browser mit korrektem Port
agent-browser open http://localhost:8082
```

### Strategie B: Prozess auf Port beenden

**Wenn alter Prozess blockiert.**

```bash
# Windows (mit npx kill-port)
npx kill-port 8081

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 8081).OwningProcess | Stop-Process

# Linux/Mac
kill $(lsof -t -i:8081)
# ODER
fuser -k 8081/tcp
```

### Strategie C: Automatische Port-Erkennung

**Für Automation-Scripts.**

```bash
# Expo starten und Port aus Output lesen
cd apps/mobile && npx expo start --web 2>&1 | grep -o "port [0-9]*" | head -1

# Oder: Expo im JSON-Mode (falls unterstützt)
npx expo start --web --json
```

---

## Port-Freigabe Workflow

### Vor dem Starten von Tests

```bash
# 1. Prüfen ob Port frei ist
netstat -ano | findstr :8081  # Windows
lsof -i :8081                  # Linux/Mac

# 2. Falls belegt: Prozess identifizieren und beenden
# Windows:
tasklist /FI "PID eq [PID_AUS_NETSTAT]"
taskkill /PID [PID] /F

# Linux/Mac:
kill -9 [PID]

# 3. Expo starten
cd apps/mobile && npx expo start --web
```

### Bei parallelen Tests

```bash
# Session 1: Port 8081
cd apps/mobile && npx expo start --web --port 8081
agent-browser --session test1 open http://localhost:8081

# Session 2: Port 8082
cd apps/mobile && npx expo start --web --port 8082
agent-browser --session test2 open http://localhost:8082
```

---

## Empfohlene Port-Ranges

### Für dieses Projekt

| Verwendung | Port-Range | Beispiel |
|------------|------------|----------|
| **Expo Web (Primary)** | 8081-8085 | 8081 |
| **Expo Web (Testing)** | 8086-8090 | 8086 |
| **Backend Dev** | 3000-3005 | 3000 |

### Port-Konflikte vermeiden

1. **Nie `8080` verwenden** - Oft von anderen Tools belegt
2. **Standard-Ports dokumentieren** - Team-Kommunikation
3. **Ports nach Tests freigeben** - `agent-browser close` + Expo beenden

---

## Troubleshooting

### "EADDRINUSE: address already in use"

**Ursache:** Port bereits belegt.

**Lösung:**
```bash
# Port freigeben
npx kill-port 8081

# ODER: Anderen Port verwenden
npx expo start --web --port 8082
```

### "Connection refused"

**Ursache:** Expo läuft nicht oder falscher Port.

**Lösung:**
```bash
# 1. Prüfen ob Expo läuft
ps aux | grep expo  # Linux/Mac
tasklist | findstr expo  # Windows

# 2. Port aus Expo-Output ablesen
# "Starting Webpack on port XXXX"

# 3. Korrekten Port verwenden
agent-browser open http://localhost:XXXX
```

### "Expo nimmt 'Y' nicht an"

**Ursache:** Interaktiver Prompt blockiert.

**Lösung:**
```bash
# Mit --non-interactive Flag
npx expo start --web --non-interactive

# ODER: Port vorher freigeben
npx kill-port 8081 && npx expo start --web
```

---

## Automation-Script Template

```bash
#!/bin/bash
# start-expo-for-testing.sh

PORT=${1:-8081}  # Standard: 8081

echo "=== Expo Web Testing Setup ==="

# 1. Port freigeben (falls nötig)
echo "Prüfe Port $PORT..."
if lsof -i :$PORT > /dev/null 2>&1; then
    echo "Port $PORT belegt, beende Prozess..."
    kill $(lsof -t -i:$PORT) 2>/dev/null
    sleep 1
fi

# 2. Expo starten
echo "Starte Expo auf Port $PORT..."
cd apps/mobile && npx expo start --web --port $PORT &
EXPO_PID=$!

# 3. Warten auf Bundle
echo "Warte auf Bundling..."
sleep 30  # Oder: tail -f um auf "Web Bundled" zu warten

# 4. Ausgabe
echo ""
echo "=== Expo läuft ==="
echo "URL: http://localhost:$PORT"
echo "PID: $EXPO_PID"
echo ""
echo "Zum Beenden: kill $EXPO_PID"
```

---

## Referenzen

- `shared-docs/browser-testing/BROWSER-TESTING-GUIDE.md` - Hauptanleitung
- `shared-docs/CODING-RULES.md` (Regel 11.3) - Port-Konflikt Regeln
- Expo Docs: https://docs.expo.dev/workflow/development-mode/
