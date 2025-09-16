# 🚀 Next.js 14 Fetching Blueprint - Universal Implementation Guide

Eine kompakte, universelle Anleitung für AI-Assistenten zur Implementierung von optimiertem Data Fetching in Next.js 14 mit Drizzle ORM.

## 📋 Quick Reference

### File Structure Pattern
```
db/
├── actions/
│   └── [feature]/
│       └── [feature]-actions.ts    # "use server" - Mutations
├── finders/  
│   └── [feature]/
│       └── [feature]-finder.ts     # "use server" - Queries  
└── services/
    └── [feature]-service.ts        # Complex business logic

hooks/
├── use[Feature]Count.ts            # Count-only + polling
├── use[Feature]Data.ts             # Full data, no polling
└── use[Feature]Mutations.ts        # Mutations + optimistic updates
```

---

## ⚡ 1. Server Actions (Mutations) - ALWAYS "use server"

```typescript
// db/actions/[feature]/[feature]-actions.ts
"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { [tableName] } from "@/db/schema/[schema]";
import { getCurrentProfile } from "@/db/finders/profile/profile-finder";

// ✅ PATTERN: CREATE Action
export async function create[Entity](data: CreateRequest): Promise<ApiResponse<string>> {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) {
      return { success: false, error: "User not logged in" };
    }

    const [created] = await db.insert([tableName]).values({
      ...data,
      userId: currentProfile.id,
      createdAt: new Date()
    }).returning({ id: [tableName].id });

    // Cache invalidation
    revalidateTag(`[feature]-${currentProfile.id}`);
    revalidatePath('/dashboard');

    return { success: true, data: created.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ✅ PATTERN: UPDATE Action  
export async function update[Entity](id: string, data: UpdateRequest): Promise<ApiResponse<boolean>> {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) {
      return { success: false, error: "User not logged in" };
    }

    await db.update([tableName])
      .set({ ...data, updatedAt: new Date() })
      .where(and(
        eq([tableName].id, id),
        eq([tableName].userId, currentProfile.id)
      ));

    // Cache invalidation
    revalidateTag(`[feature]-${currentProfile.id}`);
    revalidateTag(`[feature]-item-${id}`);

    return { success: true, data: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ✅ PATTERN: DELETE Action
export async function delete[Entity](id: string): Promise<ApiResponse<boolean>> {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) {
      return { success: false, error: "User not logged in" };
    }

    await db.delete([tableName])
      .where(and(
        eq([tableName].id, id),
        eq([tableName].userId, currentProfile.id)
      ));

    // Cache invalidation
    revalidateTag(`[feature]-${currentProfile.id}`);
    revalidateTag(`[feature]-item-${id}`);

    return { success: true, data: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ✅ PATTERN: COUNT-only Action (für Performance)
export async function get[Entity]Count(): Promise<ApiResponse<number>> {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) {
      return { success: false, error: "User not logged in" };
    }

    const [result] = await db.select({ count: count() })
      .from([tableName])
      .where(eq([tableName].userId, currentProfile.id));

    return { success: true, data: result.count };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

---

## 🔍 2. Finders (Queries) - ALWAYS "use server" + Caching

```typescript
// db/finders/[feature]/[feature]-finder.ts
"use server";

import { unstable_cache } from "next/cache";
import { eq, desc, and } from "drizzle-orm";
import db from "@/db/drizzle";
import { [tableName] } from "@/db/schema/[schema]";
import { getCurrentProfile } from "@/db/finders/profile/profile-finder";

// ✅ PATTERN: GET ALL with Caching
export async function get[Entity]List(): Promise<[Entity][]> {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) return [];

    const cached[Entity]List = unstable_cache(
      async (userId: string) => {
        return await db.select()
          .from([tableName])
          .where(eq([tableName].userId, userId))
          .orderBy(desc([tableName].createdAt));
      },
      [`[feature]-list-${currentProfile.id}`],
      {
        revalidate: 30, // 30 seconds
        tags: [`[feature]-${currentProfile.id}`]
      }
    );

    return await cached[Entity]List(currentProfile.id);
  } catch (error) {
    console.error('Error fetching [entity] list:', error);
    return [];
  }
}

// ✅ PATTERN: GET BY ID with Caching
export async function get[Entity]ById(id: string): Promise<[Entity] | null> {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) return null;

    const cached[Entity] = unstable_cache(
      async (entityId: string, userId: string) => {
        const [result] = await db.select()
          .from([tableName])
          .where(and(
            eq([tableName].id, entityId),
            eq([tableName].userId, userId)
          ))
          .limit(1);
        
        return result || null;
      },
      [`[feature]-item-${id}`],
      {
        revalidate: 60, // 1 minute for individual items
        tags: [`[feature]-${currentProfile.id}`, `[feature]-item-${id}`]
      }
    );

    return await cached[Entity](id, currentProfile.id);
  } catch (error) {
    console.error('Error fetching [entity]:', error);
    return null;
  }
}

// ✅ PATTERN: COUNT with Caching (für Polling Hooks)
export async function get[Entity]CountCached(): Promise<number> {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) return 0;

    const cachedCount = unstable_cache(
      async (userId: string) => {
        const [result] = await db.select({ count: count() })
          .from([tableName])
          .where(eq([tableName].userId, userId));
        
        return result.count;
      },
      [`[feature]-count-${currentProfile.id}`],
      {
        revalidate: 30, // 30 seconds
        tags: [`[feature]-${currentProfile.id}`]
      }
    );

    return await cachedCount(currentProfile.id);
  } catch (error) {
    console.error('Error fetching [entity] count:', error);
    return 0;
  }
}

// ✅ PATTERN: Complex Query with Relations
export async function get[Entity]WithRelations(): Promise<[Entity]WithRelations[]> {
  try {
    const currentProfile = await getCurrentProfile();
    if (!currentProfile) return [];

    const cachedQuery = unstable_cache(
      async (userId: string) => {
        return await db.select({
          // Main entity fields
          id: [tableName].id,
          name: [tableName].name,
          createdAt: [tableName].createdAt,
          // Related entity fields
          relatedId: relatedTable.id,
          relatedName: relatedTable.name,
        })
        .from([tableName])
        .leftJoin(relatedTable, eq([tableName].relatedId, relatedTable.id))
        .where(eq([tableName].userId, userId))
        .orderBy(desc([tableName].createdAt));
      },
      [`[feature]-with-relations-${currentProfile.id}`],
      {
        revalidate: 30,
        tags: [`[feature]-${currentProfile.id}`, `related-data`]
      }
    );

    return await cachedQuery(currentProfile.id);
  } catch (error) {
    console.error('Error fetching [entity] with relations:', error);
    return [];
  }
}
```

---

## 🎣 3. Client Hooks Pattern

### Count-Only Hook (für Navbar/Stats)
```typescript
// hooks/use[Feature]Count.ts
"use client";

import { useState, useCallback, useEffect } from "react";
import { get[Entity]Count } from "@/db/actions/[feature]/[feature]-actions";

export const use[Feature]Count = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCount = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await get[Entity]Count();
      if (response.success) {
        setCount(response.data);
      }
    } catch (error) {
      console.error('Count fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 60s polling
  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 60000);
    return () => clearInterval(interval);
  }, [fetchCount]);

  return { count, isLoading, refresh: fetchCount };
};
```

### Full Data Hook (für Content)
```typescript
// hooks/use[Feature]Data.ts  
"use client";

import { useState, useCallback } from "react";
import { get[Entity]List } from "@/db/finders/[feature]/[feature]-finder";

export const use[Feature]Data = () => {
  const [data, setData] = useState<[Entity][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await get[Entity]List();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { data, isLoading, error, fetchData };
};
```

### Mutations Hook (mit Optimistic Updates)
```typescript
// hooks/use[Feature]Mutations.ts
"use client";

import { useCallback } from "react";
import { create[Entity], update[Entity], delete[Entity] } from "@/db/actions/[feature]/[feature]-actions";
import { toast } from "sonner";

export const use[Feature]Mutations = () => {
  const handleCreate = useCallback(async (data: CreateRequest) => {
    try {
      const response = await create[Entity](data);
      if (response.success) {
        toast.success("[Entity] created successfully");
        return response.data;
      } else {
        toast.error(response.error);
        return null;
      }
    } catch (error) {
      toast.error("Failed to create [entity]");
      return null;
    }
  }, []);

  const handleUpdate = useCallback(async (id: string, data: UpdateRequest) => {
    try {
      const response = await update[Entity](id, data);
      if (response.success) {
        toast.success("[Entity] updated successfully");
        return true;
      } else {
        toast.error(response.error);
        return false;
      }
    } catch (error) {
      toast.error("Failed to update [entity]");
      return false;
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      const response = await delete[Entity](id);
      if (response.success) {
        toast.success("[Entity] deleted successfully");
        return true;
      } else {
        toast.error(response.error);
        return false;
      }
    } catch (error) {
      toast.error("Failed to delete [entity]");
      return false;
    }
  }, []);

  return { handleCreate, handleUpdate, handleDelete };
};
```

---

## 📏 4. Implementation Checklist

### Server-Side ✅
```bash
□ Actions file created with "use server"
□ All mutations return ApiResponse<T>
□ getCurrentProfile() for auth
□ revalidateTag() after mutations  
□ Error handling with try/catch

□ Finder file created with "use server"
□ unstable_cache() for queries
□ Proper cache keys and tags
□ 30-60s revalidate times
□ Null checks and error handling
```

### Client-Side ✅
```bash
□ Count hook with polling (60s)
□ Data hook for full queries (manual fetch)
□ Mutations hook with optimistic updates
□ useCallback for stable references
□ Proper useEffect dependencies
□ Error states and loading states
```

### Cache Strategy ✅
```bash
□ Cache tags follow pattern: [feature]-${userId}
□ Individual items: [feature]-item-${id}
□ Actions invalidate relevant tags
□ Short cache times (30-60s)
□ User-specific cache keys
```

---

## 🎯 5. Quick Implementation Template

### Step 1: Define Types
```typescript
// types/[feature].ts
export interface [Entity] {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Create[Entity]Request {
  name: string;
}

export interface Update[Entity]Request {
  name?: string;
}
```

### Step 2: Server Layer
```bash
1. Create db/actions/[feature]/[feature]-actions.ts
2. Add CRUD actions (create, update, delete, count)
3. Create db/finders/[feature]/[feature]-finder.ts  
4. Add queries with caching (getList, getById, getCount)
```

### Step 3: Client Layer
```bash
1. Create hooks/use[Feature]Count.ts (polling)
2. Create hooks/use[Feature]Data.ts (manual)
3. Create hooks/use[Feature]Mutations.ts (optimistic)
4. Wire up in components
```

### Step 4: Component Usage
```typescript
// Component implementation
export function [Feature]Dashboard() {
  const { count } = use[Feature]Count();           // Auto-polling count
  const { data, fetchData } = use[Feature]Data();  // Manual full data
  const { handleCreate } = use[Feature]Mutations(); // Mutations

  return (
    <div>
      <div>Total: {count}</div>
      <button onClick={fetchData}>Load Data</button>
      {data.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
```

---

## 🚨 Common Pitfalls & Solutions

### Cache Not Invalidating
```typescript
// ❌ Wrong tag
revalidateTag('wrong-tag');

// ✅ Correct pattern  
revalidateTag(`[feature]-${userId}`);
```

### Hook Dependencies Missing
```typescript
// ❌ Missing deps
useEffect(() => {
  if (userId) fetchData();
}, [fetchData]); // userId missing!

// ✅ All deps included
useEffect(() => {
  if (userId) fetchData();
}, [fetchData, userId]);
```

### Memory Leaks
```typescript
// ❌ No cleanup
useEffect(() => {
  const interval = setInterval(fetch, 60000);
}, []);

// ✅ With cleanup
useEffect(() => {
  const interval = setInterval(fetch, 60000);
  return () => clearInterval(interval);
}, []);
```

### Infinite Re-renders
```typescript  
// ❌ Function recreated every render
const fetchData = async () => { /* ... */ };

// ✅ Memoized function
const fetchData = useCallback(async () => { /* ... */ }, [deps]);
```

---

## 📝 AI Prompt Template

> **Context**: Using Next.js 14 App Router with Drizzle ORM. Need to implement data fetching for [FEATURE_NAME].
> 
> **Requirements**:
> - Server Actions in `db/actions/[feature]/[feature]-actions.ts`
> - Finders with caching in `db/finders/[feature]/[feature]-finder.ts`  
> - Client hooks: count (polling), data (manual), mutations (optimistic)
> - Follow the patterns in NEXTJS-FETCHING-BLUEPRINT.md
> 
> **Entity**: [ENTITY_NAME] with fields [FIELD_LIST]
> 
> **Please implement**: [SPECIFIC_REQUIREMENT]

This blueprint provides a complete, copy-paste foundation for any data fetching implementation in Next.js 14! 🚀