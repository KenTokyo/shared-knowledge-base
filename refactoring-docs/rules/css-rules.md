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