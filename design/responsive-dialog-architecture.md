# 🚀 Responsive Dialog Architecture: The Controller Pattern

This document outlines the official architecture for creating responsive dialogs in ElevateMe 4.0. By following this pattern, we ensure a pixel-perfect, stable, and maintainable user experience across all devices.

## 📌 The Core Problem: One Size Doesn't Fit All

Previously, we attempted to use single, complex components to handle both desktop and mobile views. This led to several issues:
- **Layout Instability**: CSS media queries and conditional rendering within a single component became complex and prone to breaking.
- **High Maintenance**: Debugging layout shifts was time-consuming.
- **Compromised UX**: Neither the desktop nor the mobile experience was fully optimized.

## ✨ The Solution: The Controller Pattern

We have adopted a powerful and clean "Controller Pattern." Instead of one component trying to do everything, we create three distinct, specialized components:

1.  **`[Feature]Dialog.tsx`**: The master component for the **desktop** view. It is built for mouse/keyboard interaction and larger screens.
2.  **`Mobile[Feature]Dialog.tsx`**: A dedicated component for the **mobile** view, optimized for touch input and smaller screens.
3.  **`[Feature]DialogController.tsx`**: The intelligent "brain" that acts as a switch. It detects the user's screen size and renders *either* the desktop or the mobile version.

---

## 🧠 How It Works: A Generic Implementation

This pattern is implemented using a generic controller that delegates to one of two specialized view components.

### 1. The Controller: `[Feature]DialogController.tsx`

This is the entry point for rendering a dialog. It receives all the necessary `props` and contains the core logic for device detection. It should not contain any UI itself.

```typescript
'use client';

import { useMediaQuery } from 'usehooks-ts';
import { [Feature]Dialog } from './[Feature]Dialog';
import { Mobile[Feature]Dialog } from './Mobile[Feature]Dialog';
import { DialogProps } from '@/lib/types'; // Use a relevant props type

const [Feature]DialogController = (props: DialogProps) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <[Feature]Dialog {...props} />;
  }

  return <Mobile[Feature]Dialog {...props} />;
};

export default [Feature]DialogController;
```

**Key Responsibilities:**
- **Device Detection**: Uses a hook like `useMediaQuery` to determine if the screen is desktop-sized.
- **Props Delegation**: Passes all incoming `props` transparently down to the appropriate child component. It does not modify data.
- **Clean Rendering**: It contains no UI itself, only the logic to render the correct component.

### 2. The View Components: Desktop & Mobile

- **`[Feature]Dialog.tsx` (Desktop)**: This component should be built using our standard desktop dialog components (e.g., from shadcn/ui). It is designed for larger screens and mouse interaction.

- **`Mobile[Feature]Dialog.tsx` (Mobile)**: This component **MUST** be built using the `MobileDialog` as its base. This ensures a consistent mobile experience across the app. The `MobileDialog` component provides the foundational structure for full-screen takeovers, touch-friendly controls, and a dedicated mobile header.
    - **Master Template Location**: A copy of the master `MobileDialog` component template can be found in the `shared-docs` submodule at [`shared-docs/components/dialogs/mobile-dialog.tsx`](shared-docs/components/dialogs/mobile-dialog.tsx).
    - **Implementation**: Copy the master template to the local project's UI library (e.g., `components/ui/`) and use it as the foundation for your mobile dialog.

### 🔄 Data Flow

The data flow is simple and robust:

`Parent Component` → `[Feature]DialogController` → (selects based on screen size) → `[Feature]Dialog.tsx` OR `Mobile[Feature]Dialog.tsx`

All business logic, state management, and data handling within the dialog's content remain identical. We are only swapping the outer "shell" or "chassis" of the dialog.

---

## ✅ Benefits of This Architecture

1.  **Pixel-Perfect Layouts**: Each component is perfectly tailored to its target device. No more compromises.
2.  **Stability & Reliability**: Eliminates complex CSS and conditional rendering logic that causes layout shifts.
3.  **Easy Maintenance**: When a layout issue occurs, you know exactly which file to look in. Desktop bug? Check `[Feature]Dialog.tsx`. Mobile bug? Check `Mobile[Feature]Dialog.tsx`.
4.  **Future-Proof & Reusable**: This pattern is scalable, easy to understand, and promotes the reuse of our core `MobileDialog` component.

## 📜 Implementation Rule

**All new dialogs that require a distinct mobile experience MUST follow this Controller Pattern.** Do not attempt to create a single responsive component. Always build two specialized components (one for desktop, one for mobile using the shared `MobileDialog` base) and a controller to manage them.