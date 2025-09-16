# Next.js Best Practices Guide: Avoiding Common Mistakes

Welcome to this comprehensive guide on mastering Next.js! Whether you're new to Next.js or an experienced developer, the App Router introduces powerful concepts like **Server Components**, **Server Actions**, **Suspense**, **Streaming**, and **Static/Dynamic Rendering**. These features make Next.js incredibly versatile, but they can also lead to mistakes if not used correctly. This guide will walk you through common pitfalls, explain how to fix them, and provide clear examples to ensure you build robust, performant applications. Let’s dive in with enthusiasm and make Next.js work for you!

---

## Table of Contents

1. [Introduction to Next.js Concepts](#introduction-to-nextjs-concepts)
2. [Understanding Server and Client Components](#understanding-server-and-client-components)
3. [Common Mistakes and How to Fix Them](#common-mistakes-and-how-to-fix-them)
   - [Mistake 1: Misplacing the `use client` Directive](#mistake-1-misplacing-the-use-client-directive)
   - [Mistake 2: Not Refactoring for Client Components](#mistake-2-not-refactoring-for-client-components)
   - [Mistake 3: Misjudging Client Components](#mistake-3-misjudging-client-components)
   - [Mistake 4: Assuming Server Components Become Client Components When Wrapped](#mistake-4-assuming-server-components-become-client-components-when-wrapped)
   - [Mistake 5: Using State Management on the Server](#mistake-5-using-state-management-on-the-server)
   - [Mistake 6: Using `use server` for Server Components](#mistake-6-using-use-server-for-server-components)
   - [Mistake 7: Leaking Sensitive Data](#mistake-7-leaking-sensitive-data)
   - [Mistake 8: Assuming Client Components Only Run on the Client](#mistake-8-assuming-client-components-only-run-on-the-client)
   - [Mistake 9: Misusing Browser APIs](#mistake-9-misusing-browser-apis)
   - [Mistake 10: Hydration Errors](#mistake-10-hydration-errors)
   - [Mistake 11: Mishandling Third-Party Components](#mistake-11-mishandling-third-party-components)
   - [Mistake 12: Using Route Handlers for Data Fetching](#mistake-12-using-route-handlers-for-data-fetching)
   - [Mistake 13: Overcomplicating Data Fetching](#mistake-13-overcomplicating-data-fetching)
   - [Mistake 14: Waterfall Data Fetching](#mistake-14-waterfall-data-fetching)
   - [Mistake 15: Submitting Data to Server Components](#mistake-15-submitting-data-to-server-components)
   - [Mistake 16: View Not Updating After Mutations](#mistake-16-view-not-updating-after-mutations)
   - [Mistake 17: Assuming Server Actions Are Only for Server Components](#mistake-17-assuming-server-actions-are-only-for-server-components)
   - [Mistake 18: Forgetting to Validate Server Actions](#mistake-18-forgetting-to-validate-server-actions)
   - [Mistake 19: Using `use server` for Server-Only Utilities](#mistake-19-using-use-server-for-server-only-utilities)
   - [Mistake 20: Misunderstanding Dynamic Routes](#mistake-20-misunderstanding-dynamic-routes)
   - [Mistake 21: Incorrectly Working with Search Params](#mistake-21-incorrectly-working-with-search-params)
   - [Mistake 22: Forgetting Loading States](#mistake-22-forgetting-loading-states)
   - [Mistake 23: Overly Broad Suspense Boundaries](#mistake-23-overly-broad-suspense-boundaries)
   - [Mistake 24: Misplacing Suspense Boundaries](#mistake-24-misplacing-suspense-boundaries)
   - [Mistake 25: Forgetting the `key` Prop for Suspense](#mistake-25-forgetting-the-key-prop-for-suspense)
   - [Mistake 26: Accidentally Triggering Dynamic Rendering](#mistake-26-accidentally-triggering-dynamic-rendering)
   - [Mistake 27: Hardcoding Secrets](#mistake-27-hardcoding-secrets)
   - [Mistake 28: Not Distinguishing Client and Server Utilities](#mistake-28-not-distinguishing-client-and-server-utilities)
   - [Mistake 29: Using `redirect` in Try-Catch Blocks](#mistake-29-using-redirect-in-try-catch-blocks)
4. [Conclusion](#conclusion)

---

## Introduction to Next.js Concepts

Next.js introduces a modern approach to web development with its **App Router**, which emphasizes **Server Components** by default, alongside **Client Components**, **Server Actions**, **Suspense**, **Streaming**, and **Static/Dynamic Rendering**. These features enable developers to build highly performant and interactive applications, but they also introduce complexity that can lead to errors.

To illustrate, we’ll use a simple Next.js application example:

- **Homepage**: A `page.tsx` file rendering an `<h1>My Store</h1>` and a `Product` component (Server Component) that fetches and displays a product title from an API.
- **Favorite Button**: A `FavoriteButton` component (Client Component) that toggles a favorite state on click, requiring interactivity.
- **Analytics Dashboard**: A feature using a third-party library (e.g., Sema4) for customizable analytics, demonstrating real-world use cases.

Here’s a high-level overview of Next.js architecture:

![Next.js Architecture Diagram](https://example.com/nextjs-diagram.png)

- **Client Side**: Client Components handle interactivity (e.g., `useState`, `onClick`).
- **Server Side**: Server Components, Server Actions, and Route Handlers manage data fetching and mutations.

Let’s explore the common mistakes and how to avoid them, ensuring your Next.js app is both robust and efficient.

---

## Understanding Server and Client Components

- **Server Components** (default in Next.js App Router):

  - Run only on the server.
  - Can use `async/await` for data fetching directly in the component body.
  - Ideal for fetching data, accessing secrets, and keeping large dependencies server-side.
  - Example: Fetching product data in a `Product` component.
- **Client Components** (marked with `"use client"`):

  - Run in the browser (and once on the server during pre-rendering).
  - Required for interactivity (e.g., `useState`, `onClick`).
  - Example: A `FavoriteButton` component toggling a favorite state.

---

## Common Mistakes and How to Fix Them

### Mistake 1: Misplacing the `use client` Directive

**Problem**: Adding `"use client"` too high in the component tree (e.g., in `page.tsx`) makes all imported components Client Components, even if they don’t need to be. This negates Server Component benefits like direct data fetching and keeping large dependencies server-side.

**Example**:

```tsx
// page.tsx
"use client"; // ❌ Makes everything below a Client Component
import Product from "./Product";
import FavoriteButton from "./FavoriteButton";

export default function Home() {
  return (
    <div>
      <h1>My Store</h1>
      <Product />
      <FavoriteButton />
    </div>
  );
}
```

**Solution**: Place `"use client"` only in components requiring interactivity, keeping it at the "leaves" of the component tree.

```tsx
// FavoriteButton.tsx
"use client"; // ✅ Only FavoriteButton is a Client Component
import { useState } from "react";

export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <button onClick={() => setIsFavorite(!isFavorite)}>
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  );
}

// page.tsx
import Product from "./Product"; // Remains Server Component
import FavoriteButton from "./FavoriteButton";

export default function Home() {
  return (
    <div>
      <h1>My Store</h1>
      <Product />
      <FavoriteButton />
    </div>
  );
}
```

**Key Takeaway**: Keep `"use client"` as low as possible in the component tree to maximize Server Component benefits.

---

### Mistake 2: Not Refactoring for Client Components

**Problem**: Adding interactivity (e.g., an `onClick` event) directly in a Server Component or a page without creating a separate Client Component.

**Example**:

```tsx
// page.tsx
export default async function Home() {
  return (
    <div>
      <h1>My Store</h1>
      <button onClick={() => alert("Clicked!")}>Upvote</button> // ❌ Error: onClick requires Client Component
    </div>
  );
}
```

**Solution**: Refactor interactive elements into a separate Client Component.

```tsx
// UpvoteButton.tsx
"use client";
export default function UpvoteButton() {
  return <button onClick={() => alert("Clicked!")}>Upvote</button>;
}

// page.tsx
import UpvoteButton from "./UpvoteButton";
export default async function Home() {
  return (
    <div>
      <h1>My Store</h1>
      <UpvoteButton />
    </div>
  );
}
```

**Key Takeaway**: Isolate interactivity in Client Components to keep Server Components lean and server-only.

---

### Mistake 3: Misjudging Client Components

**Problem**: Assuming a component is a Server Component because it lacks `"use client"`, even if it’s imported into a Client Component.

**Example**:

```tsx
// Sidebar.tsx
"use client";
import FavoriteButton from "./FavoriteButton";
export default function Sidebar() {
  return <FavoriteButton />;
}

// FavoriteButton.tsx
import { useState } from "react";
export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false); // No error, despite no "use client"
  return <button onClick={() => setIsFavorite(!isFavorite)}>Favorite</button>;
}
```

**Solution**: Explicitly add `"use client"` to components requiring interactivity for clarity and portability.

```tsx
// FavoriteButton.tsx
"use client";
import { useState } from "react";
export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  return <button onClick={() => setIsFavorite(!isFavorite)}>Favorite</button>;
}
```

**Key Takeaway**: Always mark interactive components with `"use client"` to avoid confusion, even if imported into a Client Component.

---

### Mistake 4: Assuming Server Components Become Client Components When Wrapped

**Problem**: Thinking a Server Component becomes a Client Component when wrapped by a Client Component (e.g., in a Context Provider).

**Example**:

```tsx
// ThemeProvider.tsx
"use client";
import { createContext, useState } from "react";
export const ThemeContext = createContext({ theme: "light" });

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

// page.tsx
import ThemeProvider from "./ThemeProvider";
import Product from "./Product";

export default async function Home() {
  return (
    <ThemeProvider>
      <Product /> // ✅ Remains a Server Component
    </ThemeProvider>
  );
}
```

**Solution**: Understand that Server Components remain server-side when passed as `children` to a Client Component. Only imports into a `"use client"` file make a component a Client Component.

**Key Takeaway**: Use the `children` pattern to keep Server Components server-side when wrapped by Client Components.

---

### Mistake 5: Using State Management on the Server

**Problem**: Attempting to use client-side state management (e.g., `useState`, `useContext`) in Server Components.

**Example**:

```tsx
// ThemeProvider.tsx
import { createContext, useState } from "react"; // ❌ Error: useState in Server Component
export const ThemeContext = createContext({ theme: "light" });

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
```

**Solution**: Use `"use client"` for components requiring state management.

```tsx
// ThemeProvider.tsx
"use client";
import { createContext, useState } from "react";
export const ThemeContext = createContext({ theme: "light" });

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
```

**Key Takeaway**: State management (e.g., Context API, Zustand) is client-side only. Use `"use client"` for such components.

---

### Mistake 6: Using `use server` for Server Components

**Problem**: Using `"use server"` to ensure a component is a Server Component, which instead creates a Server Action.

**Example**:

```tsx
// Product.tsx
"use server"; // ❌ Creates a Server Action, not a Server Component
export default async function Product() {
  const res = await fetch("https://api.example.com/product/3");
  const data = await res.json();
  return <h2>{data.title}</h2>;
}
```

**Solution**: Server Components are the default in Next.js. Use `server-only` to prevent accidental imports into Client Components.

```tsx
// Product.tsx
import "server-only";
export default async function Product() {
  const res = await fetch("https://api.example.com/product/3");
  const data = await res.json();
  return <h2>{data.title}</h2>;
}
```

**Key Takeaway**: Use `server-only` to enforce server-side execution, not `"use server"`.

---

### Mistake 7: Leaking Sensitive Data

**Problem**: Passing sensitive data (e.g., passwords) from a Server Component to a Client Component, exposing it in the browser.

**Example**:

```tsx
// page.tsx
import FavoriteButton from "./FavoriteButton";
export default async function Home() {
  const user = { id: 1, password: "secret123" }; // ❌ Leaked to client
  return <FavoriteButton user={user} />;
}

// FavoriteButton.tsx
"use client";
export default function FavoriteButton({ user }) {
  console.log(user); // Password visible in browser console
  return <button>Favorite</button>;
}
```

**Solution**: Filter sensitive data before passing to Client Components.

```tsx
// page.tsx
import FavoriteButton from "./FavoriteButton";
export default async function Home() {
  const user = { id: 1, password: "secret123" };
  const safeUser = { id: user.id }; // ✅ Exclude sensitive data
  return <FavoriteButton user={safeUser} />;
}
```

**Key Takeaway**: Ensure sensitive data stays server-side by filtering props passed to Client Components.

---

### Mistake 8: Assuming Client Components Only Run on the Client

**Problem**: Expecting Client Components to run only in the browser, but they also run once on the server during pre-rendering.

**Example**:

```tsx
// FavoriteButton.tsx
"use client";
export default function FavoriteButton() {
  console.log("Hello from FavoriteButton"); // ❌ Appears in server terminal
  return <button>Favorite</button>;
}
```

**Solution**: Be aware that Client Components run on the server during static site generation (SSG) and account for this in your logic.

**Key Takeaway**: Client Components are pre-rendered on the server once, so avoid server-incompatible code (e.g., browser APIs) without checks.

---

### Mistake 9: Misusing Browser APIs

**Problem**: Using browser APIs (e.g., `localStorage`) in Client Components without checking for server-side execution.

**Example**:

```tsx
// FavoriteButton.tsx
"use client";
export default function FavoriteButton() {
  const isFavorite = localStorage.getItem("isFavorite") === "true"; // ❌ Error on server
  return <button>{isFavorite ? "Unfavorite" : "Favorite"}</button>;
}
```

**Solution**: Use `typeof window !== "undefined"` or `useEffect` to ensure browser-only execution.

```tsx
// FavoriteButton.tsx
"use client";
import { useEffect, useState } from "react";
export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(localStorage.getItem("isFavorite") === "true"); // ✅ Runs only in browser
  }, []);
  return <button>{isFavorite ? "Unfavorite" : "Favorite"}</button>;
}
```

**Alternative Solution**: Use dynamic imports to ensure client-only execution.

```tsx
// page.tsx
import dynamic from "next/dynamic";
const FavoriteButton = dynamic(() => import("./FavoriteButton"), { ssr: false });
export default function Home() {
  return <FavoriteButton />;
}
```

**Key Takeaway**: Protect browser APIs with checks or dynamic imports to avoid server-side errors.

---

### Mistake 10: Hydration Errors

**Problem**: Mismatches between server-rendered and client-rendered HTML due to browser-specific logic (e.g., `localStorage`).

**Example**:

```tsx
// FavoriteButton.tsx
"use client";
export default function FavoriteButton() {
  const isFavorite = localStorage.getItem("isFavorite") === "true"; // ❌ Causes hydration mismatch
  return <p>{isFavorite ? "Yes" : "No"}</p>;
}
```

**Solution**: Use `useEffect` or suppress hydration warnings if intentional.

```tsx
// FavoriteButton.tsx
"use client";
import { useEffect, useState } from "react";
export default function FavoriteButton() {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(localStorage.getItem("isFavorite") === "true");
  }, []);
  return <p suppressHydrationWarning>{isFavorite ? "Yes" : "No"}</p>;
}
```

**Key Takeaway**: Ensure server and client HTML match, or use `suppressHydrationWarning` for intentional differences.

---

### Mistake 11: Mishandling Third-Party Components

**Problem**: Using third-party components that require hooks or browser APIs without marking them as Client Components.

**Example**:

```tsx
// page.tsx
import Carousel from "react-amazing-carousel"; // ❌ May use hooks, causing errors
export default function Home() {
  return <Carousel />;
}
```

**Solution**: Wrap third-party components in a Client Component.

```tsx
// CarouselWrapper.tsx
"use client";
import Carousel from "react-amazing-carousel";
export default Carousel;

// page.tsx
import CarouselWrapper from "./CarouselWrapper";
export default function Home() {
  return <CarouselWrapper />;
}
```

**For Browser APIs**: Use dynamic imports.

```tsx
// page.tsx
import dynamic from "next/dynamic";
const Carousel = dynamic(() => import("react-amazing-carousel"), { ssr: false });
export default function Home() {
  return <Carousel />;
}
```

**Key Takeaway**: Wrap third-party components with `"use client"` or use dynamic imports for browser-specific functionality.

---

### Mistake 12: Using Route Handlers for Data Fetching

**Problem**: Creating API routes for data fetching when Server Components can handle it directly.

**Example**:

```tsx
// app/api/products/route.ts
import { NextResponse } from "next/server";
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

// page.tsx
export default async function Home() {
  const res = await fetch("/api/products");
  const products = await res.json();
  return <div>{products.map(p => <p>{p.title}</p>)}</div>;
}
```

**Solution**: Fetch data directly in Server Components.

```tsx
// page.tsx
export default async function Home() {
  const products = await prisma.product.findMany();
  return <div>{products.map(p => <p>{p.title}</p>)}</div>;
}
```

**Key Takeaway**: Use Server Components for GET requests instead of Route Handlers, unless handling webhooks.

---

### Mistake 13: Overcomplicating Data Fetching

**Problem**: Assuming multiple data fetches in different components are inefficient due to duplication.

**Example**:

```tsx
// Product.tsx
export default async function Product() {
  const res = await fetch("https://api.example.com/product/3");
  const data = await res.json();
  return <h2>{data.title}</h2>;
}

// Price.tsx
export default async function Price() {
  const res = await fetch("https://api.example.com/product/3"); // ❌ Duplicated fetch
  const data = await res.json();
  return <p>{data.price}</p>;
}
```

**Solution**: Embrace multiple fetches, as React and Next.js cache them automatically.

```tsx
// utils/getProduct.ts
export async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/product/${id}`);
  return res.json();
}

// Product.tsx
import { getProduct } from "../utils/getProduct";
export default async function Product() {
  const data = await getProduct("3");
  return <h2>{data.title}</h2>;
}

// Price.tsx
import { getProduct } from "../utils/getProduct";
export default async function Price() {
  const data = await getProduct("3");
  return <p>{data.price}</p>;
}
```

**Key Takeaway**: Next.js caches `fetch` calls, and `react.cache` can be used for ORMs to avoid redundant requests.

---

### Mistake 14: Waterfall Data Fetching

**Problem**: Sequential data fetching creates waterfalls, slowing down rendering.

**Example**:

```tsx
// page.tsx
export default async function Home() {
  const product = await fetch("https://api.example.com/product/3").then(res => res.json());
  const ratings = await fetch("https://api.example.com/ratings").then(res => res.json()); // ❌ Waits for product
  return <div>{/* Render product and ratings */}</div>;
}
```

**Solution**: Use `Promise.all` for parallel fetching.

```tsx
// page.tsx
export default async function Home() {
  const [product, ratings] = await Promise.all([
    fetch("https://api.example.com/product/3").then(res => res.json()),
    fetch("https://api.example.com/ratings").then(res => res.json()),
  ]);
  return <div>{/* Render product and ratings */}</div>;
}
```

**Key Takeaway**: Fetch independent data in parallel to avoid waterfalls, improving performance.

---

### Mistake 15: Submitting Data to Server Components

**Problem**: Attempting to submit data to Server Components or Route Handlers instead of using Server Actions.

**Example**:

```tsx
// page.tsx
export default function Products() {
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/products", { method: "POST", body: JSON.stringify({ title: e.target.title.value }) }); // ❌ Unnecessary API route
  }
  return <form onSubmit={handleSubmit}><input name="title" /><button>Add Product</button></form>;
}
```

**Solution**: Use Server Actions for data mutations.

```tsx
// actions.ts
"use server";
import { prisma } from "./prisma";
export async function addProduct(formData: FormData) {
  const title = formData.get("title") as string;
  await prisma.product.create({ data: { title } });
}

// page.tsx
import { addProduct } from "./actions";
export default function Products() {
  return <form action={addProduct}><input name="title" /><button>Add Product</button></form>;
}
```

**Key Takeaway**: Server Actions simplify data mutations by abstracting network requests.

---

### Mistake 16: View Not Updating After Mutations

**Problem**: The UI doesn’t reflect data changes due to caching after a Server Action.

**Example**:

```tsx
// page.tsx
import { addProduct } from "./actions";
export default async function Products() {
  const products = await prisma.product.findMany();
  return (
    <div>
      {products.map(p => <p>{p.title}</p>)}
      <form action={addProduct}><input name="title" /><button>Add Product</button></form>
    </div>
  );
}
```

**Solution**: Use `revalidatePath` to bust the cache after mutations.

```tsx
// actions.ts
"use server";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
export async function addProduct(formData: FormData) {
  const title = formData.get("title") as string;
  await prisma.product.create({ data: { title } });
  revalidatePath("/products"); // ✅ Updates the view
}
```

**Key Takeaway**: Use `revalidatePath` to ensure the UI updates after data mutations.

---

### Mistake 17: Assuming Server Actions Are Only for Server Components

**Problem**: Thinking Server Actions can only be used in Server Components.

**Example**:

```tsx
// FavoriteButton.tsx
"use client";
export default function FavoriteButton() {
  // ❌ No way to invoke server action?
  return <button>Favorite</button>;
}
```

**Solution**: Invoke Server Actions from Client Components.

```tsx
// actions.ts
"use server";
import { prisma } from "./prisma";
export async function addProduct(title: string) {
  await prisma.product.create({ data: { title } });
}

// FavoriteButton.tsx
"use client";
import { addProduct } from "./actions";
export default function FavoriteButton() {
  return <button onClick={() => addProduct("Test 10")}>Favorite</button>;
}
```

**Key Takeaway**: Server Actions can be invoked from both Server and Client Components.

---

### Mistake 18: Forgetting to Validate Server Actions

**Problem**: Not validating or authenticating Server Action inputs, risking security issues.

**Example**:

```tsx
// actions.ts
"use server";
import { prisma } from "./prisma";
export async function addProduct(formData: FormData) {
  const title = formData.get("title"); // ❌ No validation
  await prisma.product.create({ data: { title } });
}
```

**Solution**: Validate inputs and add authentication checks.

```tsx
// actions.ts
"use server";
import { prisma } from "./prisma";
import { z } from "zod";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

const schema = z.object({ title: z.string().min(1) });

export async function addProduct(formData: unknown) {
  const session = await getServerSession();
  if (!session) redirect("/login"); // ✅ Authentication check
  const parsed = schema.parse(formData); // ✅ Validation
  await prisma.product.create({ data: { title: parsed.title } });
}
```

**Key Takeaway**: Always validate and authenticate Server Actions to ensure security.

---

### Mistake 19: Using `use server` for Server-Only Utilities

**Problem**: Using `"use server"` to ensure utilities run server-side, creating unintended Server Actions.

**Example**:

```tsx
// utils.ts
"use server"; // ❌ Creates a Server Action
export async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/product/${id}`);
  return res.json();
}
```

**Solution**: Use `server-only` for server-side utilities.

```tsx
// serverUtils.ts
import "server-only";
export async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/product/${id}`);
  return res.json();
}
```

**Key Takeaway**: Use `server-only` for utilities that should only run on the server.

---

### Mistake 20: Misunderstanding Dynamic Routes

**Problem**: Incorrectly handling dynamic routes, leading to missing or incorrect params.

**Example**:

```tsx
// app/product/[id]/page.tsx
export default async function ProductPage() {
  // ❌ No params access
  const data = await fetch("https://api.example.com/product/3").then(res => res.json());
  return <h2>{data.title}</h2>;
}
```

**Solution**: Use the `params` prop in dynamic route pages.

```tsx
// app/product/[id]/page.tsx
export default async function ProductPage({ params }: { params: { id: string } }) {
  const data = await fetch(`https://api.example.com/product/${params.id}`).then(res => res.json());
  return <h2>{data.title}</h2>;
}
```

**Key Takeaway**: Use `params` for dynamic route values, available only in page components.

---

### Mistake 21: Incorrectly Working with Search Params

**Problem**: Using `searchParams` in Server Components causes network requests, or using `useSearchParams` incorrectly.

**Example**:

```tsx
// page.tsx
export default function ProductPage({ searchParams }: { searchParams: { color?: string } }) {
  return <p>Color: {searchParams.color || "None"}</p>; // ❌ Triggers network request on change
}
```

**Solution**: Use `useSearchParams` in Client Components for client-side reading.

```tsx
// ColorSelector.tsx
"use client";
import { useSearchParams } from "next/navigation";
export default function ColorSelector() {
  const searchParams = useSearchParams();
  const color = searchParams.get("color") || "None";
  return <p>Color: {color}</p>;
}
```

**Key Takeaway**: Use `useSearchParams` in Client Components to avoid unnecessary network requests.

---

### Mistake 22: Forgetting Loading States

**Problem**: Not accounting for loading states, leading to poor UX in production.

**Example**:

```tsx
// app/product/page.tsx
export default async function ProductPage() {
  await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate delay
  const data = await fetch("https://api.example.com/product/3").then(res => res.json());
  return <h2>{data.title}</h2>;
}
```

**Solution**: Use a `loading.tsx` file for suspense.

```tsx
// app/product/loading.tsx
export default function Loading() {
  return <p>Loading...</p>;
}

// app/product/page.tsx
export default async function ProductPage() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const data = await fetch("https://api.example.com/product/3").then(res => res.json());
  return <h2>{data.title}</h2>;
}
```

**Key Takeaway**: Use `loading.tsx` to provide immediate feedback during data fetching.

---

### Mistake 23: Overly Broad Suspense Boundaries

**Problem**: Wrapping entire pages with suspense, blocking unrelated content.

**Example**:

```tsx
// app/product/loading.tsx
export default function Loading() {
  return <p>Loading...</p>; // ❌ Blocks entire page
}
```

**Solution**: Wrap only the data-dependent component with `Suspense`.

```tsx
// app/product/page.tsx
import { Suspense } from "react";
import Product from "./Product";

export default function ProductPage() {
  return (
    <div>
      <h1>Product Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Product />
      </Suspense>
    </div>
  );
}

// Product.tsx
export default async function Product() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const data = await fetch("https://api.example.com/product/3").then(res => res.json());
  return <h2>{data.title}</h2>;
}
```

**Key Takeaway**: Use granular suspense boundaries to improve UX by rendering available content immediately.

---

### Mistake 24: Misplacing Suspense Boundaries

**Problem**: Placing suspense inside a component that’s fetching data, preventing it from working.

**Example**:

```tsx
// Product.tsx
import { Suspense } from "react";
export default async function Product() {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const data = await fetch("https://api.example.com/product/3").then(res => res.json());
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <h2>{data.title}</h2> // ❌ Suspense inside async component
    </Suspense>
  );
}
```

**Solution**: Place suspense higher in the tree.

```tsx
// page.tsx
import { Suspense } from "react";
import Product from "./Product";
export default function ProductPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Product />
    </Suspense>
  );
}
```

**Key Takeaway**: Suspense must wrap the async component, not be inside it.

---

### Mistake 25: Forgetting the `key` Prop for Suspense

**Problem**: Not re-triggering suspense when props (e.g., `searchParams`) change.

**Example**:

```tsx
// page.tsx
import { Suspense } from "react";
import Product from "./Product";
export default function ProductPage({ searchParams }: { searchParams: { id?: string } }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Product id={searchParams.id || "3"} /> // ❌ No re-trigger on ID change
    </Suspense>
  );
}
```

**Solution**: Add a `key` prop to re-trigger suspense.

```tsx
// page.tsx
import { Suspense } from "react";
import Product from "./Product";
export default function ProductPage({ searchParams }: { searchParams: { id?: string } }) {
  return (
    <Suspense key={searchParams.id || "3"} fallback={<p>Loading...</p>}>
      <Product id={searchParams.id || "3"} />
    </Suspense>
  );
}
```

**Key Takeaway**: Use the `key` prop to ensure suspense re-triggers on prop changes.

---

### Mistake 26: Accidentally Triggering Dynamic Rendering

**Problem**: Using dynamic APIs (e.g., `cookies`, `headers`, `searchParams`) in pages, making them dynamically rendered.

**Example**:

```tsx
// page.tsx
import { cookies } from "next/headers";
export default function Home() {
  const cart = cookies().get("cart"); // ❌ Triggers dynamic rendering
  return <p>Items in cart: {cart?.value || 0}</p>;
}
```

**Solution**: Move dynamic logic to middleware or Client Components if possible.

```tsx
// middleware.ts
import { NextResponse } from "next/server";
export function middleware(req) {
  const cart = req.cookies.get("cart");
  return NextResponse.next({ headers: { "x-cart": cart?.value || "0" } });
}

// page.tsx
export default function Home() {
  return <p>Items in cart: <ClientCartDisplay /></p>;
}

// ClientCartDisplay.tsx
"use client";
import { useEffect, useState } from "react";
export default function ClientCartDisplay() {
  const [cart, setCart] = useState("0");
  useEffect(() => {
    fetch("/api/cart").then(res => res.text()).then(setCart);
  }, []);
  return <span>{cart}</span>;
}
```

**Key Takeaway**: Avoid `cookies`, `headers`, and `searchParams` in pages to maintain static rendering.

---

### Mistake 27: Hardcoding Secrets

**Problem**: Hardcoding secrets in Server Components, risking exposure if reused in Client Components.

**Example**:

```tsx
// Price.tsx
const API_KEY = "secret123"; // ❌ Hardcoded secret
export default async function Price() {
  const data = await fetch("https://api.example.com/product/3", { headers: { Authorization: API_KEY } }).then(res => res.json());
  return <p>{data.price}</p>;
}
```

**Solution**: Use environment variables.

```tsx
// .env.local
NEXT_PUBLIC_API_KEY=secret123 // ❌ Public, avoid for secrets
API_KEY=secret123 // ✅ Server-only

// Price.tsx
export default async function Price() {
  const data = await fetch("https://api.example.com/product/3", { headers: { Authorization: process.env.API_KEY } }).then(res => res.json());
  return <p>{data.price}</p>;
}
```

**Key Takeaway**: Use environment variables without `NEXT_PUBLIC_` for server-only secrets.

---

### Mistake 28: Not Distinguishing Client and Server Utilities

**Problem**: Using server-only utilities in Client Components, leading to errors or missing data.

**Example**:

```tsx
// utils.ts
export async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/product/${id}`, { headers: { Authorization: process.env.API_KEY } });
  return res.json();
}

// FavoriteButton.tsx
"use client";
import { getProduct } from "./utils"; // ❌ API_KEY not available
export default function FavoriteButton() {
  // ...
}
```

**Solution**: Use `server-only` for server-side utilities.

```tsx
// serverUtils.ts
import "server-only";
export async function getProduct(id: string) {
  const res = await fetch(`https://api.example.com/product/${id}`, { headers: { Authorization: process.env.API_KEY } });
  return res.json();
}
```

**Key Takeaway**: Mark server-only utilities with `server-only` to prevent client-side misuse.

---

### Mistake 29: Using `redirect` in Try-Catch Blocks

**Problem**: Using `redirect` inside a try-catch block, where it’s caught and ignored.

**Example**:

```tsx
// page.tsx
import { redirect } from "next/navigation";
export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const product = await fetch(`https://api.example.com/product/${params.id}`).then(res => res.json());
    if (!product) redirect("/not-found"); // ❌ Caught by try-catch
    return <h2>{product.title}</h2>;
  } catch (error) {
    console.error(error);
    return <p>Error</p>;
  }
}
```

**Solution**: Move `redirect` outside try-catch.

```tsx
// page.tsx
import { redirect } from "next/navigation";
export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetch(`https://api.example.com/product/${params.id}`).then(res => res.json()).catch(() => null);
  if (!product) redirect("/not-found"); // ✅ Works as expected
  return <h2>{product.title}</h2>;
}
```

**Key Takeaway**: Place `redirect` outside try-catch to ensure it executes correctly.

---

## Conclusion

Mastering Next.js requires understanding its powerful features like Server Components, Server Actions, Suspense, and Static/Dynamic Rendering. By avoiding these 29 common mistakes, you can build performant, secure, and user-friendly applications. Key takeaways include:

- Keep `"use client"` at the component tree’s edges.
- Use Server Actions for data mutations, not Route Handlers.
- Leverage Suspense for better loading states and be granular with boundaries.
- Cache data effectively to avoid redundant fetches.
- Secure secrets with environment variables and validate Server Actions.
- Run `npm run build` to check for unintended dynamic rendering.

For further learning, consider exploring a comprehensive Next.js course or experimenting with a tool like **Sema4** for advanced analytics integration. Keep practicing, and you’ll soon be a Next.js pro! 🚀
