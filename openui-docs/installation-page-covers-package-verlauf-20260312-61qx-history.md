# Chat History: installation page covers package verlauf 20260312 61qx

*Created on 3/12/2026, 3:51:37 PM*

---

**You (Draft):**
# Installation





This page covers package installation, style imports, and a basic render check for an existing Next.js App Router app.

<Callout type="info">
  **Starting a new project?** Skip this guide and use our scaffold command instead: `npx
    @openuidev/cli@latest create --name my-app`
</Callout>

Prerequisites [#prerequisites]

This guide assumes:

* Next.js App Router
* React 18 or newer
* a page where you can mount a chat layout

1. Install dependencies [#1-install-dependencies]

Install the UI package, the headless core, and the icons package used by the built-in layouts.

<Tabs items={["npm", "pnpm", "yarn", "bun"]}>
  <Tab value="npm">
    `bash npm install @openuidev/react-ui @openuidev/react-headless lucide-react `
  </Tab>

  <Tab value="pnpm">
    `bash pnpm add @openuidev/react-ui @openuidev/react-headless lucide-react `
  </Tab>

  <Tab value="yarn">
    `bash yarn add @openuidev/react-ui @openuidev/react-headless lucide-react `
  </Tab>

  <Tab value="bun">
    `bash bun add @openuidev/react-ui @openuidev/react-headless lucide-react `
  </Tab>
</Tabs>

2. Import the styles [#2-import-the-styles]

Import the component and theme styles in your root layout.

```tsx
import "@openuidev/react-ui/components.css";
import "@openuidev/react-ui/styles/index.css";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

These imports give you the default chat layout styling and theme tokens.

3. Render a layout to verify setup [#3-render-a-layout-to-verify-setup]

Render one of the built-in layouts on a page to confirm the package is installed correctly.

```tsx
// app/page.tsx
import { FullScreen } from "@openuidev/react-ui";

export default function Page() {
  return (
    <div className="h-screen">
      <FullScreen apiUrl="/api/chat" agentName="Assistant" />
    </div>
  );
}
```

At this stage, the page should render the layout shell. It will not send working chat requests until you add a backend.

<img alt="Expected baseline render after styles are imported" src={__img0} placeholder="blur" />

Related guides [#related-guides]

<Cards>
  <Card title="End-to-End Guide" href="/docs/chat/from-scratch">
    Add the backend route, message conversion, stream adapter, and optional persistence.
  </Card>

  <Card title="Explore Layouts" href="/docs/chat/fullscreen">
    Compare the built-in layouts and choose the one you want to ship.
  </Card>

  <Card title="Quick Start" href="/docs/chat/quick-start">
    Prefer a generated app instead of wiring everything manually.
  </Card>
</Cards>