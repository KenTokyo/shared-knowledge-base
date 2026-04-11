# Polling Hook Template

This document provides a standardized template for creating custom polling hooks in our application. Adhering to this pattern ensures consistency, efficiency, and maintainability across all near-real-time features.

## Core Principles

1.  **State Management**: Encapsulate data, loading, and error states within the hook.
2.  **Controlled Polling**: Use `setInterval` within a `useEffect` for periodic data fetching.
3.  **Cleanup**: Always clear the interval in the `useEffect` cleanup function to prevent memory leaks.
4.  **Event-Driven Updates**: (Optional but recommended) Subscribe to custom events to allow for immediate, real-time updates, reducing perceived latency.
5.  **Manual Refresh**: Expose a `refresh` function to allow parent components to trigger data fetching on demand.
6.  **Generic Typing**: Use TypeScript generics to make the hook reusable for different data types.

## Template File (`usePolling.ts`)

```typescript
"use client";

import { useState, useCallback, useEffect } from "react";
import { ApiResponse } from "@/lib/types/error";
// import { YourCustomEvents } from "@/lib/events/your-events"; // Optional: For event-driven updates

/**
 * @template T The expected data type of the API response.
 *
 * @param {() => Promise<ApiResponse<T>>} fetcher - An async function that fetches the data.
 * @param {number} interval - The polling interval in milliseconds (e.g., 10000 for 10 seconds).
 * @param {T | null} initialData - The initial state for the data.
 */
export const usePolling = <T>(
  fetcher: () => Promise<ApiResponse<T>>,
  interval: number,
  initialData: T | null = null
) => {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    console.log(`[POLLING HOOK] Fetching data...`);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetcher();
      
      if (response.success && response.data !== undefined) {
        setData(response.data);
      } else {
        setError(response.error || "Failed to fetch data");
      }
    } catch (e) {
      console.error(`[POLLING HOOK] Exception in fetchData:`, e);
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  // Polling effect
  useEffect(() => {
    console.log(`[POLLING HOOK] Starting polling with ${interval}ms interval.`);
    
    // Initial fetch
    fetchData();
    
    const intervalId = setInterval(() => {
      console.log(`[POLLING HOOK] Polling for new data...`);
      fetchData();
    }, interval);

    return () => {
      console.log("[POLLING HOOK] Stopping polling.");
      clearInterval(intervalId);
    };
  }, [fetchData, interval]);

  /*
  // Optional: Event listener for real-time updates
  useEffect(() => {
    const unsubscribe = YourCustomEvents.onDataChanged(({ newData }) => {
      console.log("[POLLING HOOK] Data changed event received:", newData);
      setData(newData);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  */

  return {
    data,
    isLoading,
    error,
    refresh: fetchData
  };
};
```

## Example Usage

Here is how you would use this hook to fetch a user's step count from a smartwatch.

**1. Create the API Action (`/db/actions/smartwatch-actions.ts`)**

```typescript
"use server";

import { ApiResponse } from "@/lib/types/error";
import { getStepsFromSmartwatchAPI } from "@/lib/smartwatch-api"; // Fictional API call

export const getLiveStepCount = async (): Promise<ApiResponse<number>> => {
  try {
    // This would be a call to a third-party API or our own database
    const steps = await getStepsFromSmartwatchAPI(); 
    return { success: true, data: steps };
  } catch (error) {
    return { success: false, error: "Failed to fetch step count." };
  }
};
```

**2. Implement the Hook in a Component (`LiveTrackingDisplay.tsx`)**

```typescript
"use client";

import { usePolling } from "@/hooks/usePolling"; // Assuming the template is saved here
import { getLiveStepCount } from "@/db/actions/smartwatch-actions";

export const LiveTrackingDisplay = () => {
  const { data: stepCount, isLoading, error, refresh } = usePolling<number>(
    getLiveStepCount, // The fetcher function
    10000, // 10-second interval
    0 // Initial data
  );

  if (isLoading && stepCount === 0) {
    return <div>Connecting to Smartwatch...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Live Step Count</h2>
      <p>{stepCount} steps</p>
      <button onClick={refresh} disabled={isLoading}>
        {isLoading ? 'Refreshing...' : 'Refresh Now'}
      </button>
    </div>
  );
};