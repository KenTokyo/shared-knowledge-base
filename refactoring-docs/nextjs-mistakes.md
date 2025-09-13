 29 common mistakes beginners make in Next.js and how to avoid them.
 
Putting the use client Directive Too High
When you add the use client directive too high up in your component tree, it can inadvertently turn server components into client components. This can lead to performance issues as server components have benefits like fetching data directly on the server and keeping large dependencies on the server. Always try to keep the use client directive at the edges of your component tree.

Not Refactoring for Client Components
If you need to add interactivity to a part of your page, you might be tempted to add use client to the top of your file. Instead, create a new component for the interactive part and add use client there. This way, only the necessary parts of your application become client components.

Misunderstanding Component Types
A component without use client is not necessarily a server component. If it is imported into a file with use client, it becomes a client component. Always check where your components are being imported to understand their type.

Wrapping Server Components in Client Components
Wrapping a server component inside a client component does not automatically make it a client component. Server components can stay server components even when rendered within client components, as long as they are passed as children.

Using State Management on the Server Side
State management solutions like Context API, Zustand, and Redux only work on the client side. The server operates on a request-response cycle and does not keep track of state between requests.

Misusing the use server Directive
The use server directive is not for making a component a server component. Everything in the Next.js app router is a server component by default. Using use server creates a server action, which exposes a POST endpoint on your server.

Leaking Sensitive Data
Be cautious when passing data from server components to client components. Sensitive data like passwords can be exposed on the client side. Always validate and sanitize your data.

Misunderstanding Client Component Execution
Client components run both on the server (for pre-rendering) and on the client. This can lead to confusion, especially when using browser APIs like localStorage.

Incorrectly Using Browser APIs
Browser APIs like localStorage are not available on the server. Use checks like typeof window !== 'undefined' or use useEffect to ensure these APIs are only accessed on the client.

Getting Hydration Errors
Hydration errors occur when the HTML generated on the server does not match the HTML generated on the client. This can happen if you use browser APIs incorrectly or have mismatched HTML structures.

Incorrectly Dealing with Third-Party Components
Third-party components that use React hooks or event handlers need to be wrapped in a client component. If they use browser APIs, consider using dynamic imports to ensure they only run on the client.

Using Route Handlers for Data Fetching
You don't need to create separate API routes for data fetching in Next.js. Server components can fetch data directly, simplifying your code.

Worrying About Duplicate Data Fetching
Fetching the same data in multiple components is fine. React and Next.js handle caching for you, so you don't need to worry about making multiple fetch calls.

Creating Waterfalls When Fetching Data
Avoid sequential data fetching, which can create a waterfall effect and slow down your application. Use Promise.all to fetch data in parallel.

Submitting Data to Server Components or Route Handlers
You cannot submit data to server components. Use server actions for data mutations like POST, PUT, and DELETE requests.

Confusion When Page Doesn't Reflect Data Mutation
Next.js caches the result of server components. Use revalidatePath to bust the cache and ensure your page reflects data mutations.

Thinking Server Actions Are Only for Server Components
Server actions can be used in both server and client components. They are not limited to server components.

Forgetting to Validate and Protect Server Actions
Always validate the input data in server actions and ensure proper authentication and authorization checks are in place.

Misusing the use server Directive for Server-Only Code
The use server directive creates a server action, not a server component. Use the server-only package to ensure code runs only on the server.

Misunderstanding Dynamic Routes
Dynamic routes use square brackets in the file name (e.g., [id].tsx). Use the params prop to access dynamic route parameters.

Incorrectly Working with searchParams
Using the searchParams prop in a page component makes the route dynamically rendered. Use the useSearchParams hook in client components to avoid this.

Forgetting to Handle Loading States
Use the loading.tsx file to handle loading states for your pages. This provides a better user experience by showing a loading indicator while data is being fetched.

Not Being Granular with Suspense
Wrap only the parts of your component tree that need to wait for data fetching in a Suspense component. This prevents blocking the entire page.

Placing Suspense in the Wrong Place
Ensure the Suspense component is placed higher in the component tree than the code that fetches data. Otherwise, it won't work as expected.

Forgetting the key Prop for Suspense
When using Suspense with dynamic data, use the key prop to ensure React re-triggers the suspense boundary when the data changes.

Accidentally Opting Out of Static Rendering
Using features like searchParams, cookies, or headers in your page component opts it out of static rendering. Be mindful of this to avoid unnecessary dynamic rendering.

Hardcoding Secrets
Never hardcode secrets in your components. Use environment variables to keep them secure and avoid exposing them to the client.

Mixing Client and Server Utilities
Use the server-only package to ensure utility functions that should only run on the server are not accidentally used in client components.

Using redirect in try/catch
The redirect function throws an error, which will be caught in a try/catch block, preventing the redirect. Use redirect outside of try/catch blocks.