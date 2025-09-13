# 🚀 Start der nächsten Phase

Willkommen zurück! Hier sind deine Anweisungen, um mit der nächsten Phase zu beginnen:

**📖 Plan lesen**: Lies **zuerst** die übergebene Planung/Task aus `docs/[feature]/tasks/`, um die nächste anstehende Phase zu verstehen.

**🔍 Kontext sammeln**: Versuche immer ähnliche Dateien wie Finder oder Actions zu finden, die ähnliche Logiken aufweisen um die Struktur bzw. Coding-Richtlinien besser zu verstehen.

**💡 Eine Phase implementieren**: Konzentriere dich darauf, **nur eine einzige Phase** des Plans umzusetzen. Qualität vor Quantität!

**✅ Plan aktualisieren**: Sobald du fertig bist, aktualisiere das Planungsdokument:

*   Markiere die abgeschlossene Phase als `✅ Erledigt`.
*   Dokumentiere deine Arbeitsschritte klar und nachvollziehbar.
*   Fasse zusammen, warum du bestimmte Entscheidungen getroffen hast.

**✨ Abschluss**: Beende deine Arbeit und teile uns den Pfad der bearbeiteten Planung in `docs/[feature]/tasks/` mit

**📚 Dokumentation**: NUR WENN **alle Phasen abgeschlossen sind** erweitere das intelligente Dokumentations-System:  
**Feature-Overview falls erforderlich bei großen Änderungen**: `docs/[feature]/[feature]-overview.md` mit User-Features updaten ("Der User kann...")

*   **Sub-Features**: `docs/[feature]/features/[sub-feature].md` mit Komponenten-Details erweitern (TipTap-Editor, Canvas-Rectangles, etc.)
*   **Task-History**: `docs/[feature]/tasks/[datum]-[task].md` auf abgeschlossen setzen
*   **Master-Navigation falls erforderlich bei sehr großen Änderungen**: `docs/OVERVIEW.md` das ist nur ein Overview der ganzen App!
*   **Feature-Matrix**: `docs/FEATURE_MATRIX.md` für Use-Case → Feature Mapping updaten
*   Falls die Anforderungen erfüllt sind und du dokumentieren musst - **LESE UNBEDINGT** agents\\dokumentier-regeln.md wie die Dokumentationen herizu aufgebaut sind

**Erzeuge Signaltöne anhands deines Fortschritts:**

*   **Phase implementiert()**: `powershell -c "[console]::beep(400,800)"` (längere Dauer)
*   **Alle Phasen fertig()**: `powershell -c "[console]::beep(400,300); Start-Sleep -Milliseconds 100; [console]::beep(400,300)"` (Doppel-Beep)

## Refactoring-Anweisung

Es geht um dieses Refactoring:  
`docs\refactoring\komponenten-struktur-refactoring-master-plan.md`

Die anderen Dateien, die ich dir geschickt habe, sind noch grob.  
Wichtig: Schaue dir unbedingt die komplette **Sektion „Komponentenstruktur“** an, sobald du an einer Phase bist, in der eine ganze Sektion umgebaut werden muss.

⚠️ Hinweis:

*   Noch nicht alle Dateien sind vollständig analysiert.
*   Das ist eine **sehr große Änderung** → Konflikte sind möglich.
*   Folge nicht nur dem bestehenden Plan, sondern **überlege eigenständig**, dokumentiere deine Schritte und halte fest, was du gemacht hast.

---

**Wichtige Regel: Planungspflicht**

*   **Vor jedem Refactoring-Schritt muss eine Planung erstellt werden, falls noch keine bestehende Planung oder Planung zu groß.**
*   Eine **Planung ist zu groß wenn sie über 600 Zeilen Code umfasst.**
*   Falls eine Planung mehr als 600 Zeilen Code erfordert → **neuen Plan erstellen** (mit fortlaufender Nummerierung).
*   Innerhalb einer Planung sollen die Phasen jeweils **1500 – 2500 Zeilen Code Refactorisierung** umfassen (Richtwert).
*   Das entspricht in etwa **4 – 6 Komponenten pro Phase**.
*   Richtwert: Wenn Eine einzelne Komponente nicht größer als **400 Zeilen** ist (optimales Ziel).

### Struktur der Planung

**Nummerierung der Pläne**

Jeder Plan folgt der Struktur:  
`1-2025-09-11-1-komponenten-umstrukturierung.md`

*   Erste Zahl = fortlaufende Plan-Nummer (1, 2, 3, …)
*   Danach Datum
*   Dann wieder die Plan-Nummer
*   Dann Themenname oder Sektion
*   Dann der Zusatz **Umstrukturierung**

Dadurch entsteht eine chronologische und thematische Übersicht der bereits bearbeiteten Aufgaben.

**Ablageort der Pläne**

Jeder Plan kommt direkt in den Ordner der jeweiligen Feature-Sektion:

Vorteil: Die KI kann sich bei jeder neuen Planung die letzten ein bis zwei Pläne derselben Feature-Sektion anschauen (z. B. Plan 3 und 4), um zu verstehen, wo sie aktuell steht.

So entsteht eine **lokale Historie pro Feature**, was für Übersicht und Konsistenz im Refactoring entscheidend ist.

**Phasen innerhalb eines Plans**

*   Jeder Plan wird in **Phasen** unterteilt, mit Buchstaben (a, b, c, …).
*   Beispiel: `5a`, `5b`, `5c` → gehört alles zu **Plan 5**, aber in einzelnen Schritten.
*   So behält die KI den Überblick bei großen Sektionen.

**Große Sektionen**

*   Beispiel: Eine „Notiz-Sektion“ mit ~100 Komponenten kann nicht in einem einzigen Plan behandelt werden.
*   In diesem Fall werden **mehrere Pläne** erstellt (z. B. 5 Pläne für diese Sektion).
*   Jeder Plan hat wiederum Phasen (z. B. `3a`, `3b`, `3c`).

**Aufgaben für die KI**

*   Umbau der **Komponentenstruktur** und der **Animationen**.
*   Bei Bedarf **separate Planungen pro Page oder Sektion** erstellen, falls der Master-Plan zu grob oder ungenau ist.
*   Dokumentieren, welche Dateien umgebaut wurden und welche Konflikte auftraten.

---

Du hast hat mit diesem Schema einen **klaren Überblick** über:

*   wann eine neue Planung erstellt werden muss (immer unter 600 Zeilen),
*   wie Pläne nummeriert und abgelegt werden,
*   welche Sektionen betroffen sind,
*   wie weit die Refactorings in den Phasen fortgeschritten sind,
*   und kann jederzeit auf frühere Planungen derselben Feature-Sektion zurückgreifen.

## 🗑️ KRITISCH: LEGACY CLEANUP NACH JEDER PHASE

**⚠️ WICHTIGSTE REGEL: Nach jeder abgeschlossenen Phase müssen Legacy-Komponenten gelöscht werden!**

### **🔄 Legacy Cleanup Workflow:**

**📝 WÄHREND der Phase-Implementation:**

*   **Dokumentiere ALLE Legacy-Dateien** die durch neue Komponenten ersetzt werden
*   **Liste in der Planung** welche Dateien gelöscht werden müssen
*   **Suche alle Imports** der zu löschenden Komponenten (`grep -r "import.*LegacyComponent" .`)

**✅ NACH jeder abgeschlossenen Phase:**

*   **Imports aktualisieren:** Alle Import-Statements auf neue Pfade umstellen
*   **Legacy-Komponenten löschen:** Komplett aus dem Repository entfernen
*   **TypeScript Check:** `npx tsc --noEmit` zur Validierung dass alle Imports funktionieren
*   **Funktionstest:** Alle betroffenen Features testen

**📋 CLEANUP DOKUMENTATION:**  
\`\`\`markdown

## 🗑️ PHASE X CLEANUP (2025-09-11):

**Gelöschte Legacy-Komponenten:**

*   `dashboard/components/DashboardControls.tsx` → ersetzt durch `(controlsSection)/KontrollenPanel.tsx`
*   `dashboard/components/entry-dialog.tsx` → ersetzt durch `(entrySection)/EintragErstellenDialog.tsx`
*   `dashboard/components/dashboard-grid.tsx` → ersetzt durch `(dataSection)/DashboardDataGrid.tsx`

**Import Updates durchgeführt:**

*   12 Files aktualisiert mit neuen Import-Pfaden
*   0 TypeScript Errors nach Cleanup  
    \`\`\`

### **🚨 GEFÄHRLICHE LEGACY-SITUATIONEN:**

**Problem 1: "Doppelte Implementierung"**

```typescript
// ❌ SCHLECHT: Beide Komponenten existieren
import { OldButton } from '../components/old-button';
import { NeuerButton } from './(section)/NeuerButton';
```

**Problem 2: "Import Chaos"**

```typescript
// ❌ SCHLECHT: Gemischte Import-Pfade 
import { Component1 } from '../components/'; // Legacy
import { Component2 } from './(section)/';   // Neu
```

**Problem 3: "Funktions-Duplikation"**

```typescript
// ❌ SCHLECHT: Gleiche Funktion in beiden Komponenten
function calculateData() { /* duplicated logic */ }
```

### **✅ SOLUTION: ATOMIC PHASE CLEANUP**

**Phase Implementation Steps:**

1.  ✅ **Neue Komponenten erstellen** (Universal Template)
2.  ✅ **Imports in anderen Dateien aktualisieren**
3.  ✅ **Legacy-Komponenten komplett löschen**
4.  ✅ **TypeScript & Funktionstest**
5.  ✅ **Cleanup dokumentieren**

## 🔍 SYSTEMATIC LEGACY DETECTION SYSTEM

**⚠️ PROBLEM: Vergessene Legacy-Dateien bei großen Refactorings!**

Nach jeder Phase müssen **ALLE Legacy-Dateien systematisch aufgespürt** werden, da sie oft "vergessen" werden und zu Code-Duplikation, Bundle-Bloat und Wartungs-Nightmares führen.

### **🕵️ DETECTION METHODS - SCHRITT-FÜR-SCHRITT:**

#### **1\. 📂 LEGACY ORDNER-STRUKTUR DETECTION:**

```
# Finde alle potentiellen Legacy-Ordner (alte Namenskonventionen)
find app/ -type d -name "*tab*" | grep -v node_modules
find app/ -type d -name "*components*" | grep -v node_modules  
find app/ -type d -name "*old*" -o -name "*legacy*" | grep -v node_modules

# Finde verdächtige Ordner-Tiefen (Legacy = oft tief verschachtelt)
find app/ -type d | awk -F/ '{print NF-1, $0}' | sort -nr | head -20
```

#### **2\. 🔗 IMPORT-CHAOS DETECTION:**

```
# Finde Legacy-Import Patterns
grep -r "import.*\/components\/" app/ --include="*.tsx" --include="*.ts" | head -20
grep -r "import.*\.\.\/\.\.\/" app/ --include="*.tsx" --include="*.ts" | head -20  
grep -r "import.*training-tab" app/ --include="*.tsx" --include="*.ts"

# Finde gemischte Import-Patterns (Legacy + Neu)
grep -r "import.*\(.*Section\)" app/ --include="*.tsx" --include="*.ts"
```

#### **3\. 📄 DUPLICATE COMPONENT DETECTION:**

```
# Finde Komponenten mit ähnlichen Namen (potentielle Duplikate)
find app/ -name "*.tsx" | sed 's/.*\///' | sort | uniq -d

# Finde große Legacy-Dateien (>500 Zeilen = verdächtig)
find app/ -name "*.tsx" -exec wc -l {} + | sort -nr | head -20

# Finde spezifische Legacy-Patterns
find app/ -name "*Tab.tsx" -o -name "*tab.tsx" | grep -v node_modules
find app/ -name "*Dialog*" | grep components
```

#### **4\. 🧪 FUNCTIONAL DUPLICATE DETECTION:**

```
# Finde Export-Duplikate (gleiche Funktion, verschiedene Files)
grep -r "export.*function.*" app/ --include="*.tsx" | cut -d: -f2 | sort | uniq -d

# Finde Type-Duplikate
grep -r "interface.*\|type.*=" app/ --include="*.ts" | cut -d: -f2 | sort | uniq -d

# Finde CSS-Duplikate
find app/ -name "*.css" -exec grep -l "\..*{" {} + | xargs -I {} basename {}
```

#### **5\. 📊 USAGE ANALYSIS DETECTION:**

```
# Finde ungenutzte Exports (potentielle Dead Code)
for file in $(find app/dashboard/components/ -name "*.tsx" -type f); do
  component=$(basename "$file" .tsx)
  usage=$(grep -r "$component" app/ --include="*.tsx" --include="*.ts" | wc -l)
  if [ "$usage" -eq 1 ]; then
    echo "UNUSED: $file (usage: $usage)"
  fi
done

# Finde orphaned Directories (Ordner ohne aktive Imports)
find app/ -type d -name "components" -exec find {} -name "*.tsx" \; | \
while read file; do
  if ! grep -r "$(basename "$file" .tsx)" app/ --include="*.tsx" --exclude="$file" > /dev/null; then
    echo "ORPHANED: $file"
  fi
done
```

### **⚡ AUTOMATED LEGACY AUDIT SCRIPT:**

```
#!/bin/bash
# legacy-audit.sh - Comprehensive Legacy Detection

echo "🔍 LEGACY AUDIT STARTING..."
echo "=========================="

echo "📂 1. SUSPICIOUS FOLDER STRUCTURES:"
find app/ -type d | grep -E "(components|tab|old|legacy)" | sort

echo "📊 2. LARGE LEGACY FILES (>400 lines):"
find app/ -name "*.tsx" -exec wc -l {} + | awk '$1 > 400' | sort -nr

echo "🔗 3. LEGACY IMPORT PATTERNS:"
grep -r "import.*\/components\/" app/ --include="*.tsx" | wc -l | awk '{print "Legacy imports found: " $1}'

echo "🚨 4. POTENTIAL DUPLICATES:"
find app/ -name "*.tsx" | sed 's/.*\///' | sort | uniq -d

echo "📋 5. FEATURE-SPECIFIC LEGACY (Training example):"
find app/ -path "*training*" -name "*.tsx" | grep -v "(trainingSection)" | head -10

echo "=========================="
echo "✅ LEGACY AUDIT COMPLETE"
```

### **🚨 CRITICAL LEGACY PATTERNS TO WATCH:**

#### **Pattern 1: "Vergessene Feature-Ordner"**

```
# BEISPIEL: TrainingSection Refactoring
❌ SCHLECHT: app/dashboard/components/training-tab/ (845 Zeilen + 20 Komponenten)  
✅ GUT: Komplett gelöscht nach TrainingSection Implementation
```

#### **Pattern 2: "Import-Inkonsistenz"**

```
# BEISPIEL: Gemischte Training-Imports
❌ SCHLECHT: import { TrainingTab } from '../components/training-tab/TrainingTab'
❌ SCHLECHT: import { TrainingSection } from './(trainingSection)/TrainingSection'
✅ GUT: Nur neue Imports verwenden
```

#### **Pattern 3: "CSS-Duplikation"**

```
# BEISPIEL: Animation-Konflikte
❌ SCHLECHT: training-tab/animations.css + (trainingSection)/training-animations.css
✅ GUT: Nur eine CSS-Datei pro Feature
```

### **📋 PHASE LEGACY-AUDIT CHECKLIST:**

**Nach JEDER Phase ausführen:**

*   🕵️ **Legacy-Audit Script** ausführen
*   📂 **Verdächtige Ordner** manuell überprüfen
*   🔗 **Import-Statements** auf neue Struktur validieren
*   📄 **Große Dateien** (>400 Zeilen) auf Legacy-Status prüfen
*   🧪 **Duplicate Detection** durchführen
*   ⚡ **TypeScript Check** nach Cleanup
*   📊 **Bundle Size** vor/nach Cleanup vergleichen

### **🎯 LEGACY-DETECTION INTEGRATION IN WORKFLOW:**

````
## 🔍 PHASE X LEGACY-AUDIT (2025-09-11):

**Audit Commands ausgeführt:**
```bash
bash legacy-audit.sh
find app/dashboard -path "*training*" -name "*.tsx" | grep -v "(trainingSection)"
````

**Gefundene Legacy-Dateien:**

*   `app/dashboard/components/training-tab/` (KOMPLETT - 20+ Dateien)
*   `app/dashboard/components/training-tab/TrainingTab.tsx` (845 Zeilen!)
*   `app/dashboard/components/training-tab/enhanced-exercise-history/` (17 Dateien)

**Cleanup durchgeführt:**

*   Ordner `training-tab/` komplett gelöscht
*   23 Legacy-Imports in anderen Dateien aktualisiert
*   `npx tsc --noEmit` erfolgreich (0 Errors)
*   Bundle Size: -127KB durch Legacy-Removal

**Validation:**

*   Alle Training-Features funktional getestet
*   Keine Import-Errors
*   TrainingSection Universal Template funktioniert  
    \`\`\`

## Ziel

Das gesamte Projekt gilt als **vollständig refactored**, wenn zu jedem Feature im `docs/[feature]/tasks`\-Ordner entsprechende **Refactoring-/Umstrukturierungspläne** existieren, diese umgesetzt wurden **UND alle Legacy-Komponenten gelöscht wurden**.

**Wichtiger Zusatz:**  
Wenn eine komplette Umstrukturierung für eine Sektion abgeschlossen ist (z. B. alle 5,6 oder auch 11 Phasen erledigt, kommt auf die Feature größe an), muss eine **separate Aufgabe zur Dokumentationsaktualisierung UND Legacy-Cleanup-Validierung** erstellt werden.

*   In dieser Aufgabe wird die Dokumentation vollständig aktualisiert.
*   **LEGACY-VALIDIERUNG:** Überprüfung dass ALLE alten Komponenten gelöscht wurden
*   Sie soll festhalten, **welche Komponenten und Features jetzt existieren** und wie sie strukturiert sind, also dokumentationen einfach aktualisieren, unnötiges Zeug rauschlöschen, nur was atkuell dem jetzigen Zustand entspricht!!.

```
docs/[feature]/tasks/[datum]-[nummer]-[task].md
```

## 🎯 PHASE COMPLETION CHECKLIST

**Eine Phase gilt NUR als abgeschlossen wenn:**

*   ✅ Neue Komponenten funktional implementiert
*   ✅ Alle betroffenen Import-Statements aktualisiert
*   ✅ Legacy-Komponenten komplett gelöscht
*   ✅ `npx tsc --noEmit` läuft ohne Fehler
*   ✅ Funktionstest aller betroffenen Features erfolgreich
*   ✅ Cleanup in Planungsdokument dokumentiert

**⚠️ Ohne Legacy Cleanup ist die Phase NICHT abgeschlossen!**

## Wichtigste Regel!

Implementiere keine neuen Features, nur bestehende Features migrieren, frontend sollte sich nur von der Animation her verändern und LoadingStates, evtl schnellere Ladezeiten

Schaue jetzt selber, was sinn macht, an welcher Planung oder Feature/Sektion du als nächstes arbeiten sollst, orientiere dich an die Features in docs, schau in den Ordnern rein wo noch keine tasks existieren bzw kein reactoring vollzogen wurde