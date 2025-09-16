# Working with Drizzle ORM and PostgreSQL in Next.js

![Refine AI App Screenshot](placeholder-refine-ai-screenshot.png)  
*Explore Refine AI: The next-gen approach to build enterprise-ready React-based internal tools with the power of GenAI.*  
[Learn more](https://refine.dev/ai/) | [Back to blog](https://refine.dev/blog/) | [Share on X](https://x.com/share)

**October 31, 2024** | **31 min read**

![Refine AI Image](placeholder-refine-ai-image.png)  
*The next-gen approach to build enterprise-ready React-based internal tools, admin panels, dashboards & B2B apps with the power of GenAI.*  
[Start for free](https://refine.dev/start)

Imagine building powerful, type-safe database interactions that feel just like writing SQL—but supercharged with TypeScript's intelligence and Next.js's speed. That's the magic of Drizzle ORM. Whether you're crafting a sleek blog dashboard or scaling enterprise apps, Drizzle makes it intuitive, efficient, and downright enjoyable.  

In this guide, we'll dive into Drizzle's essentials, from schemas to queries, and build a real-world Next.js blog app with PostgreSQL. You'll walk away motivated to supercharge your projects—ready to query, mutate, and migrate like a pro. Let's turn your database dreams into reality!

## Table of Contents

- [Introduction](#introduction)
- [What is Drizzle ORM?](#what-is-drizzle-orm)
- [Drizzle ORM: The Core and Opt-in Packages](#drizzle-orm-the-core-and-opt-in-packages)
- [Why Drizzle is Special](#why-drizzle-is-special)
- [How Drizzle ORM Works](#how-drizzle-orm-works)
  - [Schema-Based Configuration for Easy Migrations](#schema-based-configuration-for-easy-migrations)
  - [The Database Server Runs Independent of Drizzle](#the-database-server-runs-independent-of-drizzle)
- [Drizzle ORM: Essential Concepts and Features](#drizzle-orm-essential-concepts-andfeatures)
  - [Drizzle Feels Like SQL: Querying with `select()` and Relational APIs](#drizzle-feels-like-sql-querying-with-select-and-relational-apis)
  - [Partial Select](#partial-select)
  - [SQL Filtering with Drizzle ORM `where()`](#sql-filtering-with-drizzle-orm-where)
  - [Drizzle Filtering Helpers: A Quick Note](#drizzle-filtering-helpers-a-quick-note)
  - [`limit()`, `offset()`, and `orderBy()`](#limit-offset-and-orderby)
  - [Aggregating Data with `groupBy()`](#aggregating-data-with-groupby)
  - [Joins in Drizzle ORM](#joins-in-drizzle-orm)
  - [Drizzle Queries for Convenient Relational Data](#drizzle-queries-for-convenient-relational-data)
  - [Drizzle Relations Are Configured in the Schema](#drizzle-relations-are-configured-in-the-schema)
  - [Mutations in Drizzle ORM](#mutations-in-drizzle-orm)
    - [Inserting Rows](#inserting-rows)
    - [Updating Rows with `db.update()`](#updating-rows-with-dbupdate)
    - [SQL-like Delete Operation with `delete()`](#sql-like-delete-operation-with-delete)
- [Schemas and Migrations in Drizzle ORM](#schemas-and-migrations-in-drizzle-orm)
  - [Understanding Schemas in Drizzle ORM](#understanding-schemas-in-drizzle-orm)
  - [Drizzle Schemas Act as Single Source of Truth](#drizzle-schemas-act-as-single-source-of-truth)
  - [Drizzle Schemas Can Be Split](#drizzle-schemas-can-be-split)
  - [Drizzle Column Types](#drizzle-column-types)
  - [Drizzle Schemas: Indexes and Constraints](#drizzle-schemas-indexes-and-constraints)
  - [Drizzle ORM: Entity Relations in a Drizzle Schema](#drizzle-orm-entity-relations-in-a-drizzle-schema)
  - [Drizzle Schemas: Generating TypeScript Entity Types](#drizzle-schemas-generating-typescript-entity-types)
- [Drizzle with React Server Components: A Next.js Example](#drizzle-with-react-server-components-a-nextjs-example)
  - [Pre-requisites](#pre-requisites)
  - [Setting Up Drizzle ORM in a Next.js App](#setting-up-drizzle-orm-in-a-nextjs-app)
  - [Getting a Local PostgreSQL Server Running](#getting-a-local-postgresql-server-running)
  - [Installing Drizzle ORM and Related Packages](#installing-drizzle-orm-and-related-packages)
  - [Configuring Drizzle with `drizzle.config.ts`](#configuring-drizzle-with-drizzleconfigts)
  - [Defining Drizzle Schemas, Entity Relations, and Types](#defining-drizzle-schemas-entity-relations-and-types)
  - [Creating a PostgreSQL Client for Drizzle](#creating-a-postgresql-client-for-drizzle)
  - [Drizzle ORM: Generating Migration Files, Running Migrations, and Seeding](#drizzle-orm-generating-migration-files-running-migrations-and-seeding)
  - [Extras: Performing Drizzle Operations from Next.js Server Components](#extras-performing-drizzle-operations-from-nextjs-server-components)
    - [Keep Queries in Default Server-Rendered Pages](#keep-queries-in-default-server-rendered-pages)
    - [Make Forms Render Client-Side](#make-forms-render-client-side)
    - [Move Mutation Actions Explicitly to Server-Side](#move-mutation-actions-explicitly-to-server-side)
- [Next Steps](#next-steps)

---

## Introduction

Drizzle is a TypeScript-based headless ORM that delivers familiar database APIs mirroring native SQL and relational vocabulary. It empowers developers to compose type-safe database schemas, queries, and mutations using their SQL knowledge—all within TypeScript's safety net.

In this guide, we'll spotlight Drizzle's core APIs that make it feel refreshingly SQL-like. We'll explore querying with `db.select()` and helpers for filtering, joining, and aggregating. We'll zoom in on Drizzle's querying APIs via `db.query`—a web-app-friendly wrapper around `select()`. Plus, we'll cover mutation APIs like `db.insert()`, `db.update()`, and `db.delete()`.

We'll also unpack how schemas power migrations, table creation, relations, and TypeScript types for backend/frontend validation. Drizzle supports PostgreSQL, MySQL, SQLite, and more.

Finally, we'll build a simple blog app in Next.js with PostgreSQL and React Server Components—hands-on motivation to get you coding!

---

## What is Drizzle ORM?

Drizzle ORM is a TypeScript data framework that maps database entities to programmable objects via Object-Relational Mapping (ORM). It connects to database servers and executes queries/operations through object-based APIs.

In JS/TS, entities become prototypes: tables from prototypes, columns from fields/attributes, rows from instances. Drizzle keeps it simple, type-safe, and SQL-inspired—perfect for modern web apps.

---

## Drizzle ORM: The Core and Opt-in Packages

Drizzle's core (`drizzle-orm`) is headless, supporting dialects like PostgreSQL (`drizzle-orm/pg-core`), MySQL, and SQLite.

Opt-in packages add adapters: For Postgres in Node.js, use `drizzle-orm/node-postgres`. Others include PostgresJS, Neon, Supabase. Drizzle also integrates Zod (`drizzle-zod`) for validation.

Check supported [dialects and drivers](https://orm.drizzle.team/docs/overview#drizzle-orm).

---

## Why Drizzle is Special?

Drizzle shines with SQL-mirroring APIs—familiar for DB devs. Schema-based configs generate TypeScript types for seamless backend/frontend validation. It's lightweight, flexible, and scales effortlessly. Say goodbye to boilerplate; hello to productive coding!

---

## How Drizzle ORM Works

Drizzle uses schemas to define tables and generate migrations via dialect APIs (e.g., `pgTable()` for Postgres).

Configure in backends/server-rendered frontends: Set schema paths, output folders, DB URLs. Migrations handle table changes; drivers manage connections/migrations/seeding.

Drizzle serves APIs in Node/Deno/serverless or frontends like Next.js/Svelte.

### Schema-Based Configuration for Easy Migrations

Schemas define entities/relations—change them, and Drizzle auto-generates migrations. Add/drop columns without data loss drama. Drivers (e.g., `node-postgres`) handle the rest.

### The Database Server Runs Independent of Drizzle

Drizzle connects to *existing* DB servers (create/run separately). Just provide a URL—Drizzle does the querying magic.

---

## Drizzle ORM: Essential Concepts and Features

Let's explore key concepts for web apps, especially Next.js/RSC. We'll use snippets from a demo blog's `posts`, `categories`, and `tops` tables.

[View full posts schema example](placeholder-schema-link).

### Drizzle Feels Like SQL: Querying with `select()` and Relational APIs

Use `db.select().from(table)` like SQL SELECT:

```typescript
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";

const postsList = db.select().from(posts); // All rows/columns
```

Declare `db` and schemas upfront (e.g., in `@/drizzle/`).

### Partial Select

Specify columns in an object:

```typescript
const postsTitles = await db
  .select({
    id: posts.id,
    title: posts.title,
  })
  .from(posts);
```

Declarative: Use schema fields explicitly.

### SQL Filtering with Drizzle ORM `where()`

Mirror WHERE with `where()` and helpers (e.g., `gte` for >=):

```typescript
import { gte } from "drizzle-orm/pg-core";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";

const recentPosts = await db
  .select()
  .from(posts)
  .where(gte(posts.publishedAt, new Date("2024-01-01")));
```

Helpers: `eq`, `ne`, `gt`, etc. [Full list](https://orm.drizzle.team/docs/operators).

### Drizzle Filtering Helpers: A Quick Note

Helpers cover all ops, but multi-filter chains (with `and`/`or`) can get verbose—especially for relations. It's a minor trade-off for type-safety!

Example:

```typescript
const postsList = db
  .select()
  .from(posts)
  .where(
    and(
      gte(posts.publishedAt, new Date()),
      lt(length(posts.content), 5000)
    )
  );
```

### `limit()`, `offset()`, and `orderBy()`

Chain for pagination/sorting:

```typescript
const postsList = db
  .select()
  .from(posts)
  .where(/* ... */)
  .limit(10)
  .offset(10)
  .orderBy(asc(posts.title), desc(posts.publishedAt));
```

### Aggregating Data with `groupBy()`

Use `groupBy()` for GROUP BY; add `having()` for filters. Helpers: `count`, `sum`, `avg`. [Full list](https://orm.drizzle.team/docs/column-aggregates).

### Joins in Drizzle ORM

Dialect-specific: `leftJoin`, `rightJoin`, `innerJoin`, `fullJoin` for Postgres. [Docs](https://orm.drizzle.team/docs/joins).

### Drizzle Queries for Convenient Relational Data

`db.query` wraps `select()` for OO-style queries: `findMany()`, `findFirst()`. Navigate relations easily:

```typescript
const categoriesList = await db.query.categories.findMany({
  with: {
    posts: true,
  },
});
```

### Drizzle Relations Are Configured in the Schema

Relations aren't auto-detected—declare with `relations()`. See schemas section for details.

### Mutations in Drizzle ORM

Intuitive CUD ops on `db`.

#### Inserting Rows

```typescript
await db.insert(posts).values({
  title: "Post Title",
  subtitle: "Post subtitle",
  content: "Post content",
});
```

Supports arrays, `returning()`, `onConflictDoNothing()`/`onConflictDoUpdate()`.

#### Updating Rows with `db.update()`

```typescript
await db.update(posts)
  .set({ subtitle: "New subtitle" })
  .where(eq(posts.id, 1));
```

Chain `returning()`.

#### SQL-like Delete Operation with `delete()`

```typescript
await db.delete(posts).where(isNull(posts.content));

const deletedPosts = await db
  .delete(posts)
  .where(isNull(posts.content))
  .returning({ id: posts.id });
```

---

## Schemas and Migrations in Drizzle ORM

Schemas are your powerhouse: Define entities, generate migrations/relations/types.

### Understanding Schemas in Drizzle ORM

Schemas handle:
- Entity definitions/fields/types
- Migration generation
- Relations
- TS types

### Drizzle Schemas Act as Single Source of Truth

Update schema → Auto-migrations + inferred TS types. No more sync headaches!

Postgres example (`@/drizzle/schema/posts.ts`):

```typescript
import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { categories } from "@/drizzle/schema";
import * as zod from "zod";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 500 }),
  content: text("content").notNull(),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
}));

export const PostSchema = createSelectSchema(posts);
export const NewPostSchema = createInsertSchema(posts).pick({
  title: true,
  subtitle: true,
  content: true,
  categoryId: true,
});

export type TPost = zod.infer<typeof PostSchema>;
export type TNewPost = zod.infer<typeof NewPostSchema>;
```

Note: Explicit column mapping (e.g., `categoryId` → `"category_id"`).

Store in `@/drizzle/schema/`; reference in config.

### Drizzle Schemas Can Be Split

Single file OK, but split for scale. Import all:

```typescript
import * as schema from "@/drizzle/schema";

export const db = drizzle(client, { schema });
```

### Drizzle Column Types

All dialects supported: `serial`, `varchar`, `text`, `timestamp`, `integer`, `boolean`, `jsonb`, etc. [Full list](https://orm.drizzle.team/docs/column-types/pg).

### Drizzle Schemas: Indexes and Constraints

Add via `index()`/`uniqueIndex().on()`, `default()`, `notNull()`, `unique()`. [Constraints docs](https://orm.drizzle.team/docs/constraints).

### Drizzle ORM: Entity Relations in a Drizzle Schema

Declare separately:

```typescript
// posts.ts
export const postsRelations = relations(posts, ({ one }) => ({
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
}));

// categories.ts
export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(posts),
}));
```

### Drizzle Schemas: Generating TypeScript Entity Types

Infer from Zod:

```typescript
export const PostSchema = createSelectSchema(posts);
export type TPost = zod.infer<typeof PostSchema>;
```

---

## Drizzle with React Server Components: A Next.js Example

Time to build! We'll create a blog with posts/categories/tops, admin pages, and RSC integration.

[Repo: drizzle branch](placeholder-repo-link) for full code.

### Pre-requisites

Familiar with Next.js app router + TS. Init if needed: `npx create-next-app@latest --ts`.

### Setting Up Drizzle ORM in a Next.js App

Clone starter: [Repo main branch](placeholder-repo-link). Install: `npm i`. Run: `npm run dev`.

### Getting a Local PostgreSQL Server Running

Use `drizzle_demo` DB. Follow [this tutorial](https://www.youtube.com/watch?v=example).

### Installing Drizzle ORM and Related Packages

```bash
npm i drizzle-orm pg
npm i -D drizzle-kit @types/pg
npm i zod drizzle-zod react-hook-form @hookform/resolvers
npm i tsx dotenv
```

### Configuring Drizzle with `drizzle.config.ts`

```typescript
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `${process.env.DB_URL}`,
  },
  verbose: true,
  strict: true,
});
```

DB URL: `postgres://user:pass@host:port/db`.

### Defining Drizzle Schemas, Entity Relations, and Types

See `posts.ts` above. Define `categories.ts`, `tops.ts` similarly. Export in `index.ts`:

```typescript
export { categories, categoriesRelations } from "./categories";
export { posts, postsRelations } from "./posts";
export { tops, topsRelations } from "./tops";
```

### Creating a PostgreSQL Client for Drizzle

`@/drizzle/db.ts`:

```typescript
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";
import { Pool } from "pg";

export const client = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const db = drizzle(client, { schema });
```

### Drizzle ORM: Generating Migration Files, Running Migrations, and Seeding

Add scripts to `package.json`:

```json
{
  "scripts": {
    "db:generate": "npx drizzle-kit generate",
    "db:migrate": "tsx ./src/drizzle/migrate.ts",
    "db:seed": "tsx ./src/drizzle/seed.ts"
  }
}
```

Generate: `npm run db:generate`.

`migrate.ts`:

```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { client } from "@/drizzle/db";

async function main() {
  await migrate(drizzle(client), { migrationsFolder: "./src/drizzle/migrations" });
  await client.end();
}

main();
```

Run: `npm run db:migrate`.

`seed.ts` (example inserts):

```typescript
import { db } from "@/drizzle/db";
import { categories, posts, tops } from "@/drizzle/schema";

// Insert categories...
await db.insert(categories).values([{ name: "Tech" }]);

// Insert posts...
await db.insert(posts).values([
  { title: "First Post", content: "Hello Drizzle!", categoryId: 1 },
]);

// Insert tops...
await db.insert(tops).values([{ title: "Top Story" }]);
```

Run: `npm run db:seed`. View in pgAdmin.

Dev tip: Delete `./src/drizzle/migrations/` for fresh gens.

### Extras: Performing Drizzle Operations from Next.js Server Components

Queries: Server-side by default. Mutations: Use `"use server"`.

#### Keep Queries in Default Server-Rendered Pages

`app/page.tsx` (fetch tops/posts):

```typescript
import { db } from "@/drizzle/db";
import { posts, tops } from "@/drizzle/schema";

export default async function Home() {
  const [topPosts, allPosts] = await Promise.all([
    db.select().from(tops),
    db.select().from(posts),
  ]);

  return (
    <div>
      <h1>DrizzleDemo Blog</h1>
      {/* Render data */}
    </div>
  );
}
```

Similar for `/categories`, `/posts`, `/tops`.

#### Make Forms Render Client-Side

`app/posts/new/page.tsx` with `<CreatePostForm />` (`"use client"`):

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "./actions";
import { NewPostSchema, TNewPost } from "@/drizzle/schema/posts";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function CreatePostForm() {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<TNewPost>({
    resolver: zodResolver(NewPostSchema),
  });

  const createNewPost: SubmitHandler<TNewPost> = async (data) => {
    await createPost(data);
    reset({});
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(createNewPost)}>
      <input {...register("title")} placeholder="Title" />
      <textarea {...register("content")} placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

#### Move Mutation Actions Explicitly to Server-Side

`app/posts/new/actions.ts`:

```typescript
"use server";

import { db } from "@/drizzle/db";
import { posts, TNewPost } from "@/drizzle/schema/posts";
import { revalidatePath } from "next/cache";

export const createPost = async (data: TNewPost) => {
  await db.insert(posts).values(data);
  revalidatePath("/posts");
};
```

This bridges client forms to server ops—seamless!

---

## Next Steps

You've got the foundation! Extend with auth (e.g., NextAuth), roles, or full admin panels. Explore relations for nested queries, or migrate to production DBs. Dive into the repo, tweak, and build something epic. What's your next Drizzle-powered project? Share your wins—we're rooting for you! 🚀