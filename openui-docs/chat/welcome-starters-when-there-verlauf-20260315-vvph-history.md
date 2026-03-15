# Chat History: welcome starters when there verlauf 20260315 vvph

*Created on 3/15/2026, 3:26:54 AM*

---

**You (Draft):**
# Welcome & Starters







When there are no messages yet, OpenUI Chat shows a welcome state. The same props work across the built-in layouts, including `Copilot`, `FullScreen`, and `BottomTray`.

You can customize that empty state with:

* `welcomeMessage`
* `conversationStarters`

Basic welcome state [#basic-welcome-state]

```tsx
import { Copilot } from "@openuidev/react-ui";

<Copilot
  apiUrl="/api/chat"
  welcomeMessage={{
    title: "Hi there! 👋",
    description: "How can I help today?",
  }}
  conversationStarters={{
    options: [
      { displayText: "Track my order", prompt: "Where is my latest order?" },
      { displayText: "Billing help", prompt: "I have a billing question." },
    ],
  }}
/>;
```

`displayText` is what users click. `prompt` is what gets sent to the model.

Custom welcome component [#custom-welcome-component]

If you want full control over the empty state, pass a React component instead of a config object.

```tsx
function CustomWelcome() {
  return (
    <div>
      <h2>Welcome back</h2>
      <p>Ask about orders, billing, or product recommendations.</p>
    </div>
  );
}

<Copilot apiUrl="/api/chat" welcomeMessage={CustomWelcome} agentName="Assistant" />;
```

Conversation starter variants [#conversation-starter-variants]

Use `variant="short"` for compact pill buttons or `variant="long"` for more descriptive list-style starters.

```tsx
<Copilot
  apiUrl="/api/chat"
  conversationStarters={{
    variant: "long",
    options: [
      {
        displayText: "Track my order",
        prompt: "Where is my latest order?",
      },
      {
        displayText: "Return an item",
        prompt: "How do I return a product?",
      },
    ],
  }}
  agentName="Assistant"
/>
```

<div className="grid md:grid-cols-2 gap-6 my-6">
  <div>
    <p className="text-sm text-center font-medium mb-2">`"short"` variant</p>
        <img alt="Short conversation starters" src={__img0} placeholder="blur" />
  </div>

  <div>
    <p className="text-sm text-center font-medium mb-2">`"long"` variant</p>
        <img alt="Long conversation starters" src={__img1} placeholder="blur" />
  </div>
</div>

Related guides [#related-guides]

* [Copilot](/docs/chat/copilot)
* [FullScreen](/docs/chat/fullscreen)
* [BottomTray](/docs/chat/bottom-tray)