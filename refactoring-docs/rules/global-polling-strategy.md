# Global Polling Strategy

This document outlines the official strategy for implementing near-real-time data updates using a polling architecture. This approach replaces our previous WebSocket implementation, aiming for reduced complexity and improved maintainability while preserving a responsive user experience.

## The "Why": Polling over WebSockets

-   **Simplicity**: A polling architecture eliminates the need for a separate, stateful WebSocket server, reducing deployment complexity and potential points of failure.
-   **Statelessness**: Polling leverages the stateless nature of HTTP, making it easier to scale and manage.
-   **Sufficient UX**: For many of our use cases (e.g., notification counts, live step tracking), updates every 10-30 seconds are sufficient to provide a "live" feel without the overhead of a persistent connection.

## The "How": `usePolling` Hook

All new polling implementations **must** be built using the generic `usePolling` hook. This ensures that every implementation shares the same core logic for fetching, state management, and error handling.

**Reference**: [`Polling Hook Template`](../patterns/polling-hook-template.md)

## Best Practices

### 1. Determine the Right Interval

-   **Near-Real-Time (10 seconds)**: Use for features where users expect immediate feedback, such as live smartwatch data during a workout.
-   **Standard (30 seconds)**: The default for most background updates, like the `LiveStatusPollingProvider`.
-   **Infrequent (60+ seconds)**: Suitable for non-critical background data, like the notification count in the navbar.

**Caution**: Be mindful of API rate limits and server load. Avoid intervals shorter than 10 seconds unless absolutely necessary.

### 2. Use Server Actions as Fetchers

The `fetcher` function passed to the `usePolling` hook should always be a Next.js Server Action. This provides a secure and efficient way to communicate between the client and server-side logic.

### 3. Implement Smart Polling (Pause/Resume)

For global providers or hooks that run on most pages, implement logic to pause polling when the user is not actively engaged with the application.

-   **`document.hidden`**: Pause the interval when the browser tab is not visible.
-   **`window.requestIdleCallback`**: Defer polling until the main thread is idle.

This is demonstrated in the `LiveStatusPollingProvider` and is crucial for conserving client-side resources and reducing unnecessary server requests.

### 4. Optimize with Event-Driven Updates

While polling provides periodic updates, our custom event system can be used to trigger immediate UI changes in response to user actions.

-   **Example**: When a user reads a notification, the `EnhancedNotificationCenter` component dispatches a `NotificationEvents.onCountChanged` event. The `useNotificationCount` hook listens for this event and immediately updates the count, rather than waiting for the next poll.

This hybrid approach offers the best of both worlds: the robustness of polling and the immediacy of event-driven architecture.

### 5. Provide Clear Loading and Error States

The `usePolling` hook provides `isLoading` and `error` states. Use them to give the user clear feedback:

-   Show a skeleton loader or spinner on the initial fetch.
-   Display a subtle loading indicator for subsequent polls.
-   Render a user-friendly error message if a fetch fails, ideally with a "Retry" button that calls the `refresh` function.

By following these guidelines, we can build a consistent, performant, and maintainable application that feels responsive and alive to the user.