# AutoAnimate by FormKit

AutoAnimate is a single function — `autoAnimate` — that accepts a parent element. Automatic animations will be applied to the parent element and its immediate children.

Animations are specifically triggered when one of three events occurs:
- A child is added in the DOM.
- A child is removed in the DOM.
- A child is moved in the DOM.

## Usage

Let’s see what this looks like in practice. For now we'll use the `autoAnimate` function directly. React and Vue users — you’ll get some additional syntactic sugar later on — but for now let's learn the fundamentals.

### Example: Dropdown

```jsx
// Dropdown.jsx
import { useState, useRef, useEffect } from 'react'
import autoAnimate from '@formkit/auto-animate'

const Dropdown = () => {
  const [show, setShow] = useState(false)
  const parent = useRef(null)

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  const reveal = () => setShow(!show)

  return <div ref={parent}>
    <strong className="dropdown-label" onClick={reveal}>Click me to open!</strong>
    { show && <p className="dropdown-content" >Lorum ipsum...</p> }
  </div>
}

export default Dropdown
```

This provides a gentle, smooth shift without adding any transition classes or custom CSS. This is a notable upgrade for end users with minimal developer effort required.

## Tips for success

- It’s still ok to use other kinds of transitions. For example, if you are making stylistic changes with just CSS (such as a hover effect), then use standard CSS transitions for these kinds of styling tweaks.
- Animations are only triggered when immediate children of the parent element (the one you passed to `autoAnimate`) are added, removed, or moved.
- The parent element will automatically receive `position: relative` if it is statically positioned. Keep this in mind when writing your styles.
- Sometimes flexbox layouts don’t resize their children immediately. A child with a `flex-grow: 1` property waits for the surrounding content before snapping to its full width. AutoAnimate doesn’t work well in these cases, but if you give the element a more explicit width it should work like a charm.
- AutoAnimate respects a user’s `prefers-reduced-motion` setting and will automatic disable if the user has indicated they want reduced motion. Checkout the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) for more information on this media feature.

## Configuration

AutoAnimate is intended to be used with zero-configuration. We believe the default configuration falls in line with the project’s objective:

> AutoAnimate’s goal is to substantially improve an application’s user-experience without impacting the developer’s implementation time or performance budget.

That said, some minor configuration options are available. AutoAnimate allows you to pass a second argument to `autoAnimate` with the following options:

```typescript
// MyComponent.ts
autoAnimate(el, {
  // Animation duration in milliseconds (default: 250)
  duration: 250,
  // Easing for motion (default: 'ease-in-out')
  easing: 'ease-in-out',
  // When true, this will enable animations even if the user has indicated
  // they don’t want them via prefers-reduced-motion.
  disrespectUserMotionPreference: false
})
```

If your project’s specific requirements make it necessary to dramatically change the default animations, then you should check out the plugins documentation.

## React Hook

React users can use the hook `useAutoAnimate` by importing it from `@formkit/auto-animate/react`. This hook returns a ref to apply to the parent element, as well as a function to enable or disable animations.

### Example: App

```jsx
// App.jsx
import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const App = function () {
  const [items, setItems] = useState([0, 1, 2])
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
  const add = () => setItems([...items, items.length])
  return <>
  <ul ref={parent}>
    {items.map(
      item => <li key={item}>{ item }</li>
    )}
  </ul>
  <button onClick={add}>Add number</button>
  <button onClick={() => enableAnimations(false)}>Disable</button>
</>
}

export default App