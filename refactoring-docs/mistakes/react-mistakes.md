React is powerful, but even experienced developers fall into common traps that can slow performance and make debugging a nightmare. Let’s explore ten mistakes you should avoid at all costs!

1️⃣ Modifying State Directly
Changing state directly instead of using setState or state setters in hooks can cause unexpected behavior. Always treat state as immutable.

❌ Bad:

state.count = state.count + 1; // Wrong ❌
✅ Good:

setState(prev => ({ count: prev.count + 1 })); // Correct ✅
2️⃣ Not Using Keys in Lists
React uses keys to track elements efficiently. Skipping keys in .map() can lead to rendering issues.

❌ Bad:

items.map(item => <li>{item.name}</li>); // No key ❌
✅ Good:

items.map(item => <li key={item.id}>{item.name}</li>); // Correct ✅
3️⃣ Excessive Re-renders
Unnecessary renders can hurt performance. Use useMemo, useCallback, and React.memo when needed.

4️⃣ Not Cleaning Up Effects
Forgetting cleanup in useEffect can cause memory leaks, especially in event listeners and timers.

✅ Always cleanup:

useEffect(() => {
  const interval = setInterval(() => {
    console.log('Running...');
  }, 1000);

  return () => clearInterval(interval); // Cleanup ✅
}, []);
5️⃣ Using useEffect Unnecessarily
Sometimes, useEffect is overused for things that can be done without it, like directly setting state in event handlers.

6️⃣ Ignoring Dependency Arrays in useEffect
Incorrect dependency arrays can cause infinite loops or missing updates.

❌ Bad:

useEffect(() => {
  fetchData();
}); // No dependency array ❌
✅ Good:

useEffect(() => {
  fetchData();
}, [dependency]); // Correct ✅
7️⃣ Using State When a Ref is Better
State updates cause re-renders, but refs don’t. If you don’t need reactivity, use useRef.

❌ Bad:

const [count, setCount] = useState(0); // Re-renders on update ❌
✅ Good:

const countRef = useRef(0); // No re-render ✅
8️⃣ Not Handling Asynchronous State Updates
React batches updates, so relying on outdated state can cause bugs.

❌ Bad:

setCount(count + 1); // Might not update correctly ❌
setCount(count + 1); 
✅ Good:

setCount(prev => prev + 1); // Always correct ✅
setCount(prev => prev + 1);
9️⃣ Blocking the UI with Expensive Computations
Heavy calculations in render can slow down the UI. Use useMemo.

❌ Bad:

const result = expensiveCalculation(data); // Runs on every render ❌
✅ Good:

const result = useMemo(() => expensiveCalculation(data), [data]); // Optimized ✅
🔟 Not Handling Errors Properly
Without error boundaries, one crash can break the whole app.

✅ Always use an error boundary:

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}
Wrap components like this:

<ErrorBoundary>
  <MyComponent /> // component name
</ErrorBoundary>
