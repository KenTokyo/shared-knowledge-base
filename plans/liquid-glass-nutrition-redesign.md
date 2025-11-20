# Implementation Plan: Liquid Glass Nutrition Tab Redesign

## Vision
Transform the Mobile Nutrition Tab into a high-end, "gaming-inspired" Liquid Glass interface. The design will focus on depth, transparency, subtle lighting effects, and a premium dark mode aesthetic.

## Core Design Principles
- **Liquid Glass:** Heavy use of `backdrop-blur`, semi-transparent backgrounds (`bg-black/40`, `bg-white/5`), and subtle borders (`border-white/10`).
- **Lighting & Glow:** "Neon" accents for data points (Protein: Violet, Carbs: Blue/Amber, Fat: Pink/Emerald). Active elements will have "ray from above" or outer glow effects.
- **Depth:** Layering elements (Background -> Glass Card -> Content -> Floating Actions).
- **Interactivity:** Smooth transitions, hover effects that increase glow/opacity.

## Component Breakdown & Steps

### 1. MobileNutritionOverviewSection.tsx (The "Hero" Card)
**Goal:** Create a visually striking summary card.
- **Container:** `GlassCard` with `variant="liquid"`. Dark, blurred background.
- **Calories (Center):**
  - "Reactor Core" look.
  - Circular progress with a glowing path.
  - Animated counter for the number.
  - Ambient glow behind the circle.
- **Macros (Bottom):**
  - Horizontal progress bars with "neon" styling.
  - Icons (Carbs, Protein, Fat) in glowing glass containers.
  - Text values with high contrast.
- **Stats (Left/Right):**
  - "Remaining" and "Burned" in smaller, floating glass pills.

### 2. MealActionButtons.tsx (The "HUD")
**Goal:** Replace standard buttons with a "Heads-Up Display" control panel.
- **Layout:** Horizontal row of icon-centric buttons.
- **Style:**
  - Dark glass background.
  - Icons have specific colors (Scanner: Amber, Photo: Blue, AI: Indigo, Recipe: Emerald).
  - On hover: The background lights up with the icon's color, and the icon scales slightly.
  - "Search" button as a primary action if needed.

### 3. MobileMealFoodListSection.tsx (The Content)
**Goal:** Clean, readable list with premium feel.
- **Header:** Integrate the `MealActionButtons` seamlessly.
- **Macro Badges:** Small, pill-shaped badges for meal-specific totals (Protein, Carbs, Fat) with subtle colored backgrounds.
- **List Items:**
  - Each food item row gets a subtle hover effect.
  - "Remove" and "Edit" actions appear smoothly or are always visible but subtle.
- **Empty State:** A visually pleasing "No food logged" state, perhaps with a faint icon or illustration.

### 4. MobileNutritionTab.tsx (The Structure)
**Goal:** Modernize the tab switching mechanism.
<!-- - **Tabs List:** -->
  - Container: A floating glass bar.
  - Triggers: "Pill" shape.
  - **Active State:** Strong glow, colored background (e.g., `bg-primary/20`), distinct text color.
  - **Inactive State:** Transparent, lower opacity text.
- **Background:** Ensure the page background supports the glass effect (dark, maybe a subtle gradient or mesh).

## Execution Order
1.  **Create Plan** (This Document).
2.  **Refine `MobileNutritionOverviewSection`**: Implement the "Reactor" and Macro bars.
3.  **Refine `MealActionButtons`**: Create the HUD buttons.
4.  **Refine `MobileMealFoodListSection`**: Integrate buttons and style the list.
5.  **Refine `MobileNutritionTab`**: Update the main tabs and layout.

## Technical Notes
- Use `write_to_file` to completely refresh components with the new design to avoid "search/replace" errors on large chunks.
- Ensure all colors are derived from CSS variables or Tailwind colors for consistency.
- Verify responsiveness (though focused on Mobile view).
