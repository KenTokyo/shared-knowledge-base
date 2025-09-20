# Next.js Caching Guide

Diese Dokumentation erklärt die verschiedenen Caching-Mechanismen in Next.js 14+ App Router und wie sie optimal genutzt werden.

## 🔄 Die 4 Caching-Ebenen

Next.js hat 4 verschiedene Cache-Mechanismen, die zusammenarbeiten:

| Mechanismus | Was wird gecacht | Wo | Zweck | Dauer |
|-------------|------------------|-----|--------|-------|
| **Request Memoization** | Fetch-Return-Values | Server | Deduplizierung während Rendering | Pro Request |
| **Data Cache** | Daten | Server | Daten zwischen Requests speichern | Persistent |
| **Full Route Cache** | HTML + RSC Payload | Server | Rendering-Kosten reduzieren | Persistent |
| **Router Cache** | RSC Payload | Client | Server-Requests bei Navigation reduzieren | User Session |

---

## 1. 🧠 Request Memoization

### Was es macht
- React dedupliziert automatisch `fetch`-Requests mit gleicher URL während des Renderings
- Mehrere Komponenten können den gleichen `fetch` aufrufen → nur 1 Request wird ausgeführt

### Beispiel
```javascript
async function getUser(id) {
  // Wird automatisch memoized
  const res = await fetch(`/api/users/${id}`)
  return res.json()
}

// Diese Funktion wird 2x aufgerufen, aber nur 1x ausgeführt
const user1 = await getUser('123') // Cache MISS
const user2 = await getUser('123') // Cache HIT
```

### Wichtige Punkte
- ✅ Funktioniert nur bei `GET`-Requests
- ✅ Gilt nur während einer Render-Phase
- ✅ Memory wird nach dem Rendering zurückgesetzt
- ⚠️ Kein manuelles Opt-out nötig (React-Optimierung)

---

## 2. 💾 Data Cache

### Was es macht
- Persistenter Server-seitiger Cache für `fetch`-Daten
- Überdauert Requests und Deployments
- Erweitert die native `fetch` API um Caching-Optionen

### Cache-Optionen
```javascript
// Standard: gecacht (force-cache ist default)
fetch('/api/data', { cache: 'force-cache' })

// Nicht gecacht
fetch('/api/data', { cache: 'no-store' })

// Zeit-basierte Revalidierung (alle 1h)
fetch('/api/data', { next: { revalidate: 3600 } })

// Tag-basierte Revalidierung
fetch('/api/data', { next: { tags: ['users'] } })
```

### Revalidierung
```javascript
import { revalidatePath, revalidateTag } from 'next/cache'

// Nach Mutation: Cache invalidieren
export async function updateUser(data) {
  await updateUserInDB(data)
  
  // Option 1: Path-basiert
  revalidatePath('/users')
  
  // Option 2: Tag-basiert
  revalidateTag('users')
}
```

---

## 3. 📄 Full Route Cache

### Was es macht
- Cacht gerenderte Routen (HTML + React Server Component Payload) zur Build-Zeit
- Statische Routen werden automatisch gecacht
- Dynamische Routen werden nicht gecacht

### Statisch vs. Dynamisch
```javascript
// ✅ STATISCH: Wird gecacht
export default function StaticPage() {
  return <div>Static content</div>
}

// ❌ DYNAMISCH: Nicht gecacht (wegen cookies())
export default function DynamicPage() {
  const user = cookies().get('user')
  return <div>Hello {user}</div>
}
```

### Opt-out Strategien
```javascript
// Route-Level: Force Dynamic
export const dynamic = 'force-dynamic'

// Component-Level: Dynamic Functions verwenden
import { cookies, headers } from 'next/headers'
const userCookie = cookies().get('user')
const userAgent = headers().get('user-agent')
```

---

## 4. 🧭 Router Cache (Client-Side)

### Was es macht
- Speichert React Server Component Payload im Browser-Memory
- Cacht besuchte Routen und prefetched Routen
- Ermöglicht instant Navigation

### Kontrolle
```jsx
// Prefetching deaktivieren
<Link href="/page" prefetch={false}>Link</Link>

// Cache manuell invalidieren
import { useRouter } from 'next/navigation'
const router = useRouter()
router.refresh() // Cleared Router Cache
```

### Dauer
- **Session**: Bis Page Refresh
- **Auto-Invalidation**: 
  - Static Pages: 5 Minuten
  - Dynamic Pages: 30 Sekunden (ohne prefetch)

---

## 🔧 Praktische Anwendung

### 1. Standard Data Fetching
```javascript
// Automatisch gecacht, dedupliziert
async function ProductPage({ params }) {
  const product = await fetch(`/api/products/${params.id}`)
  return <ProductDetails product={product} />
}
```

### 2. Real-time Daten
```javascript
// Nie gecacht
async function LiveData() {
  const data = await fetch('/api/live', { cache: 'no-store' })
  return <Dashboard data={data} />
}
```

### 3. Mit Mutations
```javascript
// Server Action mit Cache-Invalidation
export async function updateProduct(id, data) {
  await updateProductInDB(id, data)
  
  // UI updates triggern
  revalidatePath('/products')
  revalidateTag('products')
}
```

### 4. Hybrid Caching
```javascript
async function MixedPage() {
  // Gecacht
  const staticData = await fetch('/api/static')
  
  // Nicht gecacht
  const dynamicData = await fetch('/api/dynamic', { cache: 'no-store' })
  
  return (
    <div>
      <StaticSection data={staticData} />
      <DynamicSection data={dynamicData} />
    </div>
  )
}
```

---

## 🚨 Häufige Fallstricke

### ❌ Cache wird nicht invalidiert
```javascript
// Problem: Cache wird nach Mutation nicht geleert
export async function deleteUser(id) {
  await deleteUserFromDB(id)
  // ❌ Fehlt: revalidatePath('/users')
}
```

### ❌ Ungewollte Dynamic Route
```javascript
// Problem: Ganze Route wird dynamic wegen einem cookies() call
export default function Page() {
  const user = cookies().get('user') // ❌ Macht ganze Route dynamic
  
  return (
    <div>
      <StaticHeader />
      <UserSection user={user} />
    </div>
  )
}

// ✅ Lösung: cookies() in separate Component
function UserSection() {
  const user = cookies().get('user')
  return <div>Hello {user}</div>
}
```

### ❌ Router Cache Probleme
```javascript
// Problem: Nach Server Action zeigt UI alte Daten
export async function updateUser(data) {
  await updateUserInDB(data)
  // ❌ Fehlt: revalidatePath() für Router Cache Update
}
```

---

## 📊 Debug & Monitoring

### Cache Status prüfen
```javascript
// Development: Cache Headers anzeigen
console.log('Cache Status:', response.headers.get('x-vercel-cache'))

// Response kann sein:
// HIT - Aus Cache serviert
// MISS - Nicht im Cache, neu gefetcht
// STALE - Stale data, Revalidation läuft im Hintergrund
```

### Performance messen
```javascript
// Core Web Vitals beachten
// CLS: Layout Shift durch Cache-Misses vermeiden
// LCP: Largest Contentful Paint durch gutes Caching optimieren
// FID: First Input Delay durch Router Cache reduzieren
```

---

## 🎯 Best Practices Zusammenfassung

1. **Standard verwenden**: Lass Next.js automatisch cachen, außer du brauchst real-time Daten
2. **Mutations richtig handhaben**: Immer `revalidatePath/Tag` nach Server Actions
3. **Selective Dynamic**: Nur Components dynamic machen, die es wirklich brauchen
4. **Tag-System nutzen**: Für granulare Cache-Invalidation Tags verwenden
5. **Performance messen**: Cache-Hit-Rate und Core Web Vitals überwachen

Für weitere Details siehe [Next.js Caching Docs](https://nextjs.org/docs/app/building-your-application/caching).