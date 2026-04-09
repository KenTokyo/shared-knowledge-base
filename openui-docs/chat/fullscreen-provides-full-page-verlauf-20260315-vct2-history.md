# Chat History: fullscreen provides full page verlauf 20260315 vct2

*Created on 3/15/2026, 3:26:29 AM*

---

**You (Draft):**
# FullScreen





`FullScreen` provides a full-page chat layout with the built-in thread list and main conversation area.

This page covers the complete built-in layout. For a sidebar inside an existing app screen, see [Copilot](/docs/chat/copilot). For a floating widget, see [BottomTray](/docs/chat/bottom-tray).

```tsx
import { FullScreen } from "@openuidev/react-ui";

export function App() {
  return (
    <div className="h-screen">
      <FullScreen apiUrl="/api/chat" agentName="Assistant" />
    </div>
  );
}
```

<img alt="FullScreen layout example" src={__img0} />

Common configuration [#common-configuration]

```tsx
<FullScreen
  apiUrl="/api/chat"
  threadApiUrl="/api/threads"
  agentName="Data Assistant"
  logoUrl="/logo.png"
/>
```

`FullScreen` is the best starting point for end-to-end setup because it exercises both the message surface and thread UI. See the [End-to-End Guide](/docs/chat/from-scratch) if you want to wire the whole flow manually.

Related guides [#related-guides]

<Cards>
  <Card title="Connecting to LLM" href="/docs/chat/connecting">
    Configure endpoint, streaming adapters, and auth.
  </Card>

  <Card title="Connect Thread History" href="/docs/chat/persistence">
    Load thread lists and message history from your backend.
  </Card>

  <Card title="Welcome & Starters" href="/docs/chat/welcome">
    Customize the empty-state experience.
  </Card>

  <Card title="Theming" href="/docs/chat/theming">
    Control colors, mode, and theme overrides.
  </Card>

  <Card title="Custom Chat Components" href="/docs/chat/custom-chat-components">
    Override the built-in composer and message rendering.
  </Card>
</Cards>