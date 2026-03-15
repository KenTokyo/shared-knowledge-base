# Chat History: system prompts library prompt verlauf 20260315 zsj4

*Created on 3/15/2026, 3:29:56 AM*

---

**You (Draft):**
# System Prompts



`library.prompt(...)` generates the instruction text your model needs to output valid OpenUI Lang. You can generate it programmatically or with the CLI.

Generate with the CLI [#generate-with-the-cli]

The fastest way to generate a system prompt — works with any backend language:

```bash
npx @openuidev/cli generate ./src/library.ts
```

Write to a file:

```bash
npx @openuidev/cli generate ./src/library.ts --out system-prompt.txt
```

Generate JSON Schema instead:

```bash
npx @openuidev/cli generate ./src/library.ts --json-schema
```

The CLI auto-detects exported `PromptOptions` (examples, rules) alongside your library. Use `--prompt-options <name>` to pick a specific export.

Generate programmatically [#generate-programmatically]

```ts
import { openuiLibrary, openuiPromptOptions } from "@openuidev/react-ui";

const systemPrompt = openuiLibrary.prompt(openuiPromptOptions);
```

Prompt options [#prompt-options]

```ts
import type { PromptOptions } from "@openuidev/react-lang";

const options: PromptOptions = {
  preamble: "You are an assistant that outputs only OpenUI Lang.",
  additionalRules: ["Always produce actionable controls for forms.", "Prefer concise layouts."],
  examples: [`root = Stack([title])\ntitle = TextContent("Hello")`],
};

const prompt = openuiLibrary.prompt(options);
```

What gets generated [#what-gets-generated]

The generated prompt includes:

* syntax rules
* component signatures (from your registered components)
* hoisting/streaming rules
* important output constraints
* your optional examples/rules

Important behavior notes [#important-behavior-notes]

* Root component requirement comes from the library `root` passed to `createLibrary`.
* Prompt signatures include component descriptions, argument names, and required/optional structure.

Backend usage example [#backend-usage-example]

```ts
import OpenAI from "openai";
import { openuiLibrary, openuiPromptOptions } from "@openuidev/react-ui/genui-lib";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();

  const completion = await client.chat.completions.create({
    model: "gpt-5.2",
    stream: true,
    messages: [{ role: "system", content: openuiLibrary.prompt(openuiPromptOptions) }, ...messages],
  });

  return new Response(completion.toReadableStream(), {
    headers: { "Content-Type": "text/event-stream" },
  });
}
```

Next Steps [#next-steps]

<Cards>
  <Card title="Renderer" href="/docs/openui-lang/renderer">
    Render streamed OpenUI Lang in React.
  </Card>
</Cards>