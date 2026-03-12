# Chat History: theming built chat layouts verlauf 20260312 6pyn

*Created on 3/12/2026, 3:52:09 PM*

---

**You (Draft):**
# Theming







Built-in chat layouts mount their own `ThemeProvider` by default. Use the `theme` prop to control mode and token overrides, or disable the built-in provider if your app already wraps the UI in its own theme scope.

There are two common theming paths:

* set `theme.mode` when you only need light or dark mode
* pass `lightTheme` and `darkTheme` when you need token-level visual customization

Set the mode [#set-the-mode]

```tsx
import { FullScreen } from "@openuidev/react-ui";

<FullScreen apiUrl="/api/chat" theme={{ mode: "dark" }} agentName="Assistant" />;
```

Override theme tokens [#override-theme-tokens]

Use `lightTheme` and `darkTheme` inside the `theme` prop to override the built-in token sets.

```tsx
import { FullScreen, createTheme } from "@openuidev/react-ui";

<FullScreen
  apiUrl="/api/chat"
  theme={{
    mode: "dark",
    lightTheme: createTheme({
      interactiveAccentDefault: "oklch(0.62 0.22 260)",
    }),
    darkTheme: createTheme({
      interactiveAccentDefault: "oklch(0.72 0.18 260)",
    }),
  }}
  agentName="Assistant"
/>;
```

If you only pass `lightTheme`, those overrides are also used as the fallback for dark mode.

Use your own app-level theme provider [#use-your-own-app-level-theme-provider]

If your app already wraps the page in `ThemeProvider`, disable the built-in wrapper on the chat layout.

```tsx
import { FullScreen } from "@openuidev/react-ui";

<FullScreen apiUrl="/api/chat" disableThemeProvider agentName="Assistant" />;
```

`disableThemeProvider` only skips the wrapper. It does not remove any chat functionality.

<div className="grid md:grid-cols-2 gap-6 my-6">
  <div>
    <p className="text-sm text-center font-medium mb-2">Light (default)</p>
        <img alt="FullScreen light theme" src={__img0} placeholder="blur" />
  </div>

  <div>
    <p className="text-sm text-center font-medium mb-2">Dark</p>
        <img alt="FullScreen dark theme" src={__img1} placeholder="blur" />
  </div>
</div>

Related guides [#related-guides]

* [FullScreen](/docs/chat/fullscreen)
* [Copilot](/docs/chat/copilot)
* [BottomTray](/docs/chat/bottom-tray)