# 🗄️ Database Testing Guide

> **Diese Datei enthält detaillierte Anleitungen zum Testen von Actions & Finders.**  
> **Kurzversion:** Siehe `CODING-RULES.md` → Regel 8.1

---

## 1. 🔴 Warum Live-DB Testing?

**Problem:** Bugs in Actions/Finders (z.B. Timezone-Drift, fehlerhafte JOINs, falsche WHERE-Bedingungen) werden oft erst in der UI entdeckt - zu spät!

**Typische Bugs die damit gefunden werden:**
- Timezone-Drift bei Date-Vergleichen
- N+1 Queries in Loops
- Falsche `toLocalDateKey()` vs `toISOString()` Verwendung
- Fehlende Daten durch zu enge WHERE-Filter
- Schlechte Performance

---

## 2. 🔴 Live-DB Testing für Actions & Finders (PFLICHT!)

**Lösung - Isolierte Test-Skripte mit `npx tsx`:**

```bash
# Direkte Skript-Ausführung gegen Live-DB
DATABASE_URL="postgres://..." npx tsx scripts/test-[feature].ts
```

### Wann testen:
- ✅ Neue Finder-Funktionen (queries)
- ✅ Neue Actions (mutations) - mit Test-Daten
- ✅ Komplexe Date/Timezone-Logik
- ✅ JOINs über mehrere Tabellen
- ✅ Geänderte WHERE-Bedingungen

---

## 3. Test-Skript Template

```typescript
// scripts/test-[feature].ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
const db = drizzle(client);

async function main() {
  console.log("🧪 Starting test...\n");

  // 1. Test-Query ausführen
  const result = await db
    .select()
    .from(/* your table */)
    .where(/* your conditions */)
    .limit(10);

  // 2. Ergebnis analysieren und loggen
  console.log("📊 Results:", result.length, "items");
  console.log(JSON.stringify(result, null, 2));

  // 3. Edge-Cases prüfen
  if (result.length === 0) {
    console.warn("⚠️ No results found - check your WHERE conditions!");
  }

  // 4. Cleanup
  await client.end();
  console.log("\n✅ Test completed!");
}

main().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
```

---

## 4. Database-First Logic (Performance-Kritisch!)

**Problem:** Client-seitige Filter-/Sortier-/Aggregationslogik verursacht Performance-Probleme bei größeren Datenmengen.

**Lösung - Logik in die Datenbank verlagern:**

| Operation | ❌ Client | ✅ Database |
|-----------|----------|------------|
| Filter | `.filter()` | `WHERE` |
| Sortierung | `.sort()` | `ORDER BY` |
| Aggregation | JS-Loops | `GROUP BY`, `COUNT()`, `SUM()` |
| Pagination | `.slice()` | `LIMIT/OFFSET` |
| Joins | Mehrere Queries | Drizzle-JOINs |

### Beispiel:

```typescript
// ✅ RICHTIG - Komplexe Query mit JOINs, Filter, Sortierung
const result = await db
  .select({ ... })
  .from(entries)
  .leftJoin(categories, eq(entries.categoryId, categories.id))
  .where(and(
    eq(entries.profileId, profileId),
    gte(entries.date, startDate),
    isNotNull(entries.value)
  ))
  .orderBy(desc(entries.date), asc(entries.priority))
  .limit(50);

// ❌ FALSCH - Alles laden und im Client filtern
const all = await db.select().from(entries);
const filtered = all.filter(e => e.profileId === profileId && e.date >= startDate);
const sorted = filtered.sort((a, b) => b.date - a.date);
```

---

## 5. Database Seeding Scripts

Seed-Skripte MÜSSEN `"dotenv/config"` importieren + via `npx tsx` ausgeführt werden:

```typescript
import "dotenv/config"; // IMMER Zeile 1
import db from "../db";

async function seed() {
  // Seeding logic...
}

seed();
```

**Ausführung:** `npx tsx scripts/seed-[name].ts`

---

## 6. Lokale SQLite-DB Direkttest

**Problem:** Service-Funktionen benötigen Auth-Session. Bei CLI-Tests fehlt diese.

**Lösung:** Profil-DB direkt ansprechen via `db/profiles/profile-[id].sqlite`

| Methode | Zuverlässigkeit |
|---------|-----------------|
| ❌ `npx tsx -e "..."` | Unzuverlässig |
| ✅ `npx tsx scripts/test-feature.ts` | Separate Datei erstellen, nach Test löschen |

---

## 7. Next.js Caching bei dynamischen Seiten

Server Components mit DB-Queries können gecacht werden. Fix:

```typescript
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

**Setzen bei:**
- User-spezifischen Daten
- Filter-Seiten
- Dashboards
- Echtzeit-Daten

---

## 8. ✅ Checkliste vor Merge

- [ ] Neue Query mit `npx tsx` getestet
- [ ] Ergebnisse verifiziert (korrekt, vollständig)
- [ ] Performance geprüft (keine N+1 Queries)
- [ ] Edge-Cases getestet (leere Results, Grenzwerte)
- [ ] Test-Skript gelöscht (nicht committen!)

---

**🔗 Zurück zu:** `shared-docs/CODING-RULES.md` → Regel 8.1
