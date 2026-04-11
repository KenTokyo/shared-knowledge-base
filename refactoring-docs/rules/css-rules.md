# 📜 Global CSS Rules

This document outlines the core principles for writing clean, scalable, and maintainable CSS. Adhering to these rules will prevent common pitfalls and reduce debugging time.

---

### 1. 🎯 Centering Elements
**Always position elements through their parent container.** Use modern CSS properties like `display: flex` or `display: grid` on the parent to achieve robust centering.

---

### 2. 📏 Height in Percentages
**A percentage-based height requires an explicitly defined parent height.** If the parent's height is not set, a child's percentage height has no reference and will not work as expected.

---

### 3. 🚫 Avoid `!important`
**Do not use the `!important` keyword.** It breaks the natural CSS cascade and leads to debugging complexities. Solve specificity conflicts by using more specific selectors or by adjusting the order of your CSS rules.

---

### 4. 🧠 Master CSS Fundamentals
**Do not underestimate CSS.** A solid understanding of core concepts like the box model, specificity, the cascade, and browser inconsistencies is crucial for managing large-scale projects.

---

### 5. 🧬 Leverage Inheritance
**Write less code by utilizing CSS inheritance.** Set common typographical properties (e.g., `font-family`, `color`) on parent containers and let child elements inherit them to avoid redundant declarations.

---

### 6. 変数 Use CSS Variables
**Use CSS variables for organization and to prevent duplication.** They are essential for managing themes, maintaining consistency, and making global changes efficiently.

---

### The `h-full` and `flex-1` Problem in Nested Flexbox Layouts

**Problem:**

When building complex layouts with nested flex containers, you might encounter situations where a component with `h-full` or `flex-1` does not expand to fill the available vertical space as expected. This often happens with components like `<ScrollArea>` that are placed inside a flex column (`flex-col`).

The root cause is that for `height: 100%` (which `h-full` uses) to work, the parent element must have a defined height. If a parent in the hierarchy has an undefined or content-based height, the percentage height of the child has no reference and collapses.

**Example of the Issue:**

```tsx
<div className="flex h-screen flex-col">
  <header>Header</header>
  {/* This div might not have a defined height, causing issues for children */}
  <div className="flex-1"> 
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0">Some Content</div>
      {/* This ScrollArea won't expand because its parent's height is ambiguous */}
      <ScrollArea className="flex-1">
        ...
      </ScrollArea>
    </div>
  </div>
  <footer>Footer</footer>
</div>
```

**Solution:**

To fix this, you must ensure that the flex container's children that are supposed to grow can actually do so. The most robust solution is to prevent the parent flex container from shrinking and to define its boundaries clearly.

1.  **Add `overflow-hidden` to the parent container with `flex-1`**: This is the key. By adding `overflow-hidden`, you create a new block formatting context. It forces the container to respect its `flex-1` property and establish a firm height based on the available space, providing a reliable context for `h-full` on its children.

2.  **Ensure the flex layout is continuous**: The `flex` properties must be applied consistently from the top-level container down to the element you want to stretch.

**Corrected Example:**

```tsx
<div className="flex h-screen flex-col">
  <header>Header</header>
  {/* By adding overflow-hidden, this div now has a clearly defined height */}
  <div className="flex-1 overflow-hidden"> 
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0">Some Content</div>
      {/* This ScrollArea will now correctly fill the available space */}
      <ScrollArea className="flex-1">
        ...
      </ScrollArea>
    </div>
  </div>
  <footer>Footer</footer>
</div>
```

By applying `overflow-hidden` to the direct parent that is supposed to fill the space, you solve the height ambiguity and allow `h-full` and `flex-1` to work as intended. Avoid using fixed heights like `h-[600px]` as they are not responsive and create maintenance problems.

---

### Special Case: When `h-full` Fails in Complex Sidebars

**Problem:**

In highly complex layouts, particularly those involving resizable sidebars, nested flex containers, and viewport units (`h-screen`), you may find that `h-full` and `flex-1` still fail to produce the correct height. The component might collapse or refuse to fill the available space, even when parent containers seem to be correctly defined.

This indicates a deep-seated layout issue where a definitive height is not being passed down through the component tree, making percentage-based heights unreliable.

**Solution: Use `calc()` with Viewport Units**

When `h-full` is not a viable option, the most robust and responsive solution is to calculate the height manually using CSS `calc()` combined with viewport units (`vh`).

1.  **Identify Static Elements:** Determine the height of any static elements that share the space, such as a main application header or footer.
2.  **Calculate Available Height:** Subtract the height of these static elements from `100vh` (the total viewport height).

**Example:**

If your main application header has a height of `8rem`, you can set the height of your sidebar container like this:

```tsx
// The parent container takes the full screen height
<div className="h-screen">
  <AppHeader className="h-[8rem]" />
  
  {/* The sidebar calculates its height to fill the remaining space */}
  <div className="flex h-[calc(100vh-8rem)] flex-col">
    {/* Sidebar content */}
  </div>
</div>
```

This approach is superior to fixed pixel heights because it adapts to different viewport sizes. While it requires knowledge of the surrounding layout (e.g., the header height), it provides a reliable and responsive solution when the standard `h-full` approach fails due to layout complexity.