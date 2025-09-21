Perfekt 🚀
Hier die fertige Datei unter dem passenden Namen:

`shared-docs/technologies/autoAnimate-usage.md`

````markdown
# AutoAnimate – Usage

AutoAnimate is fundamentally a single function — **`autoAnimate`** — that accepts a **parent element**.  
Automatic animations will be applied to the parent element and its **immediate children**.  

Animations are specifically triggered when one of three events occurs:

- A child is **added** in the DOM  
- A child is **removed** in the DOM  
- A child is **moved** in the DOM  

---

## Fundamentals

Let’s see what this looks like in practice. For now we'll use the `autoAnimate` function directly.  

> React and Vue users — you’ll get some additional syntactic sugar later on — but for now let's learn the fundamentals.

---

### Example: Dropdown Component

**Dropdown.jsx**

```tsx
import { useState, useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'

const Dropdown = () => {
  const [show, setShow] = useState(false)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)

  return (
    <div ref={parent}>
      <strong className="dropdown-label" onClick={reveal}>
        Click me to open!
      </strong>
      {show && <p className="dropdown-content">Lorum ipsum...</p>}
    </div>
  )
}

export default Dropdown
````

**Demo output:**

👉 *Click me to open!*
A gentle, smooth shift occurs without adding any transition classes or custom CSS.

This is a **notable upgrade for end users** with **minimal developer effort** required.

Check out the [examples](https://auto-animate.formkit.com/#examples) to see other use cases.

---

## Framework Support

AutoAnimate works across different frameworks and environments:

* **React**
* **Vue**
* **Solid**
* **Native JS**

---

## React Hook – `useAutoAnimate`

React users can also use the **hook** `useAutoAnimate` by importing it from `@formkit/auto-animate/react`.

This hook returns:

1. A **ref** to apply to the parent element.
2. A **function** to enable or disable animations.

---

### Example: App Component

**App.jsx**

```tsx
import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const App = function () {
  const [items, setItems] = useState([0, 1, 2])
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  const add = () => setItems([...items, items.length])

  return (
    <>
      <ul ref={parent}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={add}>Add number</button>
      <button onClick={() => enableAnimations(false)}>Disable</button>
    </>
  )
}

export default App
```

---

## Summary

* **`autoAnimate`** can be used directly on any parent element.
* **Events**: child added, removed, or moved in the DOM will animate smoothly.
* **React hook** `useAutoAnimate` simplifies usage and allows enabling/disabling animations.
* Works with **React, Vue, Solid, and Native JS**.
