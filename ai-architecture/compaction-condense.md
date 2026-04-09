# Compaction

Server-side context compaction for managing long conversations that approach context window limits.

---

<Note>
This feature is eligible for [Zero Data Retention (ZDR)](/docs/en/build-with-claude/api-and-data-retention). When your organization has a ZDR arrangement, data sent through this feature is not stored after the API response is returned.
</Note>

<Tip>
Server-side compaction is the recommended strategy for managing context in long-running conversations and agentic workflows. It handles context management automatically with minimal integration work.
</Tip>

Compaction extends the effective context length for long-running conversations and tasks by automatically summarizing older context when approaching the context window limit. This isn't just about staying under a token cap. As conversations get longer, models struggle to maintain focus across the full history. Compaction keeps the active context focused and performant by replacing stale content with concise summaries.

<Tip>
For a deeper look at why long contexts degrade and how compaction helps, see
[Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).
</Tip>

This is ideal for:

- Chat-based, multi-turn conversations where you want users to use one chat for a long period of time
- Task-oriented prompts that require a lot of follow-up work (often tool use) that may exceed the context window

<Note>
Compaction is in beta. Include the [beta header](/docs/en/api/beta-headers) `compact-2026-01-12` in your API requests to use this feature.
</Note>

## Supported models

Compaction is supported on the following models:

- Claude Opus 4.6 (`claude-opus-4-6`)
- Claude Sonnet 4.6 (`claude-sonnet-4-6`)

## How compaction works

When compaction is enabled, Claude automatically summarizes your conversation when it approaches the configured token threshold. The API:

1. Detects when input tokens exceed your specified trigger threshold.
2. Generates a summary of the current conversation.
3. Creates a `compaction` block containing the summary.
4. Continues the response with the compacted context.

On subsequent requests, append the response to your messages. The API automatically drops all message blocks prior to the `compaction` block, continuing the conversation from the summary.

![Flow diagram showing the compaction process: when input tokens exceed the trigger threshold, Claude generates a summary in a compaction block and continues the response with the compacted context](/docs/images/compaction-flow.svg)

## Basic usage

Enable compaction by adding the `compact_20260112` strategy to `context_management.edits` in your Messages API request.

<CodeGroup>
```bash Shell
curl https://api.anthropic.com/v1/messages \
     --header "x-api-key: $ANTHROPIC_API_KEY" \
     --header "anthropic-version: 2023-06-01" \
     --header "anthropic-beta: compact-2026-01-12" \
     --header "content-type: application/json" \
     --data \
'{
    "model": "claude-opus-4-6",
    "max_tokens": 4096,
    "messages": [
        {
            "role": "user",
            "content": "Help me build a website"
        }
    ],
    "context_management": {
        "edits": [
            {
                "type": "compact_20260112"
            }
        ]
    }
}'
```

```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()

messages = [{"role": "user", "content": "Help me build a website"}]

response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
)

# Append the response (including any compaction block) to continue the conversation
messages.append({"role": "assistant", "content": response.content})
```

```typescript TypeScript hidelines={1..2}
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
  { role: "user", content: "Help me build a website" }
];

const response = await client.beta.messages.create({
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages,
  context_management: {
    edits: [
      {
        type: "compact_20260112"
      }
    ]
  }
} as unknown as Anthropic.Beta.Messages.MessageCreateParamsNonStreaming);

// Append the response (including any compaction block) to continue the conversation
messages.push({
  role: "assistant",
  content: response.content as unknown as Anthropic.Beta.Messages.BetaContentBlockParam[]
});
```

```csharp C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Anthropic;
using Anthropic.Models.Beta.Messages;

class Program
{
    static async Task Main(string[] args)
    {
        AnthropicClient client = new();

        var messages = new List<BetaMessageParam>
        {
            new() { Role = Role.User, Content = "Help me build a website" }
        };

        var parameters = new MessageCreateParams
        {
            Betas = ["compact-2026-01-12"],
            Model = "claude-opus-4-6",
            MaxTokens = 4096,
            Messages = messages,
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit()]
            }
        };

        var response = await client.Beta.Messages.Create(parameters);

        // Append the response (including any compaction block) to continue the conversation
        messages.Add(new BetaMessageParam
        {
            Role = Role.Assistant,
            Content = response.Content.Select(b => new BetaContentBlockParam(b.Json)).ToList()
        });

        Console.WriteLine(response);
    }
}
```
```go Go hidelines={1..11,-1}
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/anthropics/anthropic-sdk-go"
)

func main() {
	client := anthropic.NewClient()

	messages := []anthropic.BetaMessageParam{
		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Help me build a website")),
	}

	response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
		Model:     anthropic.ModelClaudeOpus4_6,
		MaxTokens: 4096,
		Messages:  messages,
		ContextManagement: anthropic.BetaContextManagementConfigParam{
			Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
				{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{}},
			},
		},
		Betas: []anthropic.AnthropicBeta{"compact-2026-01-12"},
	})
	if err != nil {
		log.Fatal(err)
	}

	// Append the response (including any compaction block) to continue the conversation
	messages = append(messages, response.ToParam())

	fmt.Println(response)
}
```

```java Java hidelines={1..4,7..9,-2..}
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.beta.messages.MessageCreateParams;
import com.anthropic.models.beta.messages.BetaMessage;
import com.anthropic.models.beta.messages.BetaContextManagementConfig;
import com.anthropic.models.beta.messages.BetaCompact20260112Edit;

public class CompactionExample {
    public static void main(String[] args) {
        AnthropicClient client = AnthropicOkHttpClient.fromEnv();

        MessageCreateParams params = MessageCreateParams.builder()
            .addBeta("compact-2026-01-12")
            .model("claude-opus-4-6")
            .maxTokens(4096L)
            .addUserMessage("Help me build a website")
            .contextManagement(BetaContextManagementConfig.builder()
                .addEdit(BetaCompact20260112Edit.builder().build())
                .build())
            .build();

        BetaMessage response = client.beta().messages().create(params);

        // Append the response (including any compaction block) to continue the conversation
        // by including it in the next request's messages
        System.out.println(response);
    }
}
```

```php PHP hidelines={1..4}
<?php

use Anthropic\Client;

$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));

$messages = [
    ['role' => 'user', 'content' => 'Help me build a website']
];

$response = $client->beta->messages->create(
    maxTokens: 4096,
    messages: $messages,
    model: 'claude-opus-4-6',
    betas: ['compact-2026-01-12'],
    contextManagement: [
        'edits' => [
            ['type' => 'compact_20260112']
        ]
    ]
);

// Append the response (including any compaction block) to continue the conversation
$messages[] = ['role' => 'assistant', 'content' => $response->content];

echo $response->content[0]->text;
```

```ruby Ruby hidelines={1..2}
require "anthropic"

client = Anthropic::Client.new

messages = [
  { role: "user", content: "Help me build a website" }
]

response = client.beta.messages.create(
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages: messages,
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
)

# Append the response (including any compaction block) to continue the conversation
messages << { role: "assistant", content: response.content }

puts response
```
</CodeGroup>

## Parameters

| Parameter | Type | Default | Description |
|:----------|:-----|:--------|:------------|
| `type` | string | Required | Must be `"compact_20260112"` |
| `trigger` | object | 150,000 tokens | When to trigger compaction. Must be at least 50,000 tokens. |
| `pause_after_compaction` | boolean | `false` | Whether to pause after generating the compaction summary |
| `instructions` | string | `null` | Custom summarization prompt. Completely replaces the default prompt when provided. |

### Trigger configuration

Configure when compaction triggers using the `trigger` parameter:

<CodeGroup>
```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "Hello, Claude"}]
response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=messages,
    context_management={
        "edits": [
            {
                "type": "compact_20260112",
                "trigger": {"type": "input_tokens", "value": 150000},
            }
        ]
    },
)
```

```typescript TypeScript hidelines={1..2}
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [];

const response = await client.beta.messages.create({
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages,
  context_management: {
    edits: [
      {
        type: "compact_20260112",
        trigger: {
          type: "input_tokens",
          value: 150000
        }
      }
    ]
  }
} as unknown as Anthropic.Beta.Messages.MessageCreateParamsNonStreaming);
```

```csharp C# hidelines={1..13,-2..}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Anthropic;
using Anthropic.Models.Beta.Messages;

class Program
{
    static async Task Main(string[] args)
    {
        AnthropicClient client = new();
        List<BetaMessageParam> messages = [new() { Role = Role.User, Content = "Hello" }];

        var parameters = new MessageCreateParams
        {
            Model = "claude-opus-4-6",
            MaxTokens = 4096,
            Betas = ["compact-2026-01-12"],
            Messages = messages,
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit
                {
                    Trigger = new BetaInputTokensTrigger(150000)
                }]
            }
        };

        var message = await client.Beta.Messages.Create(parameters);
        Console.WriteLine(message);
    }
}
```
```go Go hidelines={1..11,-1}
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/anthropics/anthropic-sdk-go"
)

func main() {
	client := anthropic.NewClient()
	messages := []anthropic.BetaMessageParam{anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Hello, Claude"))}

	response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
		Model:     anthropic.ModelClaudeOpus4_6,
		MaxTokens: 4096,
		Messages:  messages,
		ContextManagement: anthropic.BetaContextManagementConfigParam{
			Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
				{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{
					Trigger: anthropic.BetaInputTokensTriggerParam{Value: 150000},
				}},
			},
		},
		Betas: []anthropic.AnthropicBeta{"compact-2026-01-12"},
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(response)
}
```

```java Java hidelines={1..4,8..10,-2..}
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.beta.messages.MessageCreateParams;
import com.anthropic.models.beta.messages.BetaMessage;
import com.anthropic.models.beta.messages.BetaContextManagementConfig;
import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
import com.anthropic.models.beta.messages.BetaInputTokensTrigger;

public class CompactionExample {
    public static void main(String[] args) {
        AnthropicClient client = AnthropicOkHttpClient.fromEnv();

        MessageCreateParams params = MessageCreateParams.builder()
            .model("claude-opus-4-6")
            .maxTokens(4096L)
            .addBeta("compact-2026-01-12")
            .addUserMessage("Hello, Claude")
            .contextManagement(BetaContextManagementConfig.builder()
                .addEdit(BetaCompact20260112Edit.builder()
                    .trigger(BetaInputTokensTrigger.builder()
                        .value(150000L)
                        .build())
                    .build())
                .build())
            .build();

        BetaMessage response = client.beta().messages().create(params);
        System.out.println(response);
    }
}
```

```php PHP hidelines={1..4}
<?php

use Anthropic\Client;

$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));
$messages = [['role' => 'user', 'content' => 'Hello, Claude']];

$message = $client->beta->messages->create(
    maxTokens: 4096,
    messages: $messages,
    model: 'claude-opus-4-6',
    betas: ['compact-2026-01-12'],
    contextManagement: [
        'edits' => [
            [
                'type' => 'compact_20260112',
                'trigger' => [
                    'type' => 'input_tokens',
                    'value' => 150000
                ]
            ]
        ]
    ]
);

echo $message;
```

```ruby Ruby hidelines={1..2}
require "anthropic"

client = Anthropic::Client.new
messages = [{ role: "user", content: "Hello, Claude" }]

response = client.beta.messages.create(
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages: messages,
  context_management: {
    edits: [
      {
        type: "compact_20260112",
        trigger: {
          type: "input_tokens",
          value: 150000
        }
      }
    ]
  }
)
puts response
```
</CodeGroup>

### Custom summarization instructions

By default, compaction uses the following summarization prompt:

```text
You have written a partial transcript for the initial task above. Please write a summary of the transcript. The purpose of this summary is to provide continuity so you can continue to make progress towards solving the task in a future context, where the raw history above may not be accessible and will be replaced with this summary. Write down anything that would be helpful, including the state, next steps, learnings etc. You must wrap your summary in a <summary></summary> block.
```

You can provide custom instructions via the `instructions` parameter to replace this prompt entirely. Custom instructions don't supplement the default; they completely replace it:

<CodeGroup>
```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "Hello, Claude"}]
response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=messages,
    context_management={
        "edits": [
            {
                "type": "compact_20260112",
                "instructions": "Focus on preserving code snippets, variable names, and technical decisions.",
            }
        ]
    },
)
```

```typescript TypeScript nocheck hidelines={1..2}
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [];

const response = await client.beta.messages.create({
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages,
  context_management: {
    edits: [
      {
        type: "compact_20260112",
        instructions:
          "Focus on preserving code snippets, variable names, and technical decisions."
      }
    ]
  }
} as unknown as Anthropic.Beta.Messages.MessageCreateParamsNonStreaming);
```

```csharp C#
using System;
using System.Threading.Tasks;
using Anthropic;
using Anthropic.Models.Beta.Messages;

class Program
{
    static async Task Main(string[] args)
    {
        AnthropicClient client = new();

        var parameters = new MessageCreateParams
        {
            Betas = ["compact-2026-01-12"],
            Model = "claude-opus-4-6",
            MaxTokens = 4096,
            Messages =
            [
                new BetaMessageParam { Role = Role.User, Content = "Help me build a Python web scraper" },
                new BetaMessageParam { Role = Role.Assistant, Content = "I'll help you build a web scraper..." },
                new BetaMessageParam { Role = Role.User, Content = "Add support for JavaScript-rendered pages" }
            ],
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit
                {
                    Instructions = "Focus on preserving code snippets, variable names, and technical decisions."
                }]
            }
        };

        var message = await client.Beta.Messages.Create(parameters);
        Console.WriteLine(message);
    }
}
```
```go Go hidelines={1..11,-1}
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/anthropics/anthropic-sdk-go"
)

func main() {
	client := anthropic.NewClient()

	response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
		Model:     anthropic.ModelClaudeOpus4_6,
		MaxTokens: 4096,
		Messages: []anthropic.BetaMessageParam{
			anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Help me build a Python web scraper")),
			{Role: anthropic.BetaMessageParamRoleAssistant, Content: []anthropic.BetaContentBlockParamUnion{anthropic.NewBetaTextBlock("I'll help you build a web scraper...")}},
			anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Add support for JavaScript-rendered pages")),
		},
		ContextManagement: anthropic.BetaContextManagementConfigParam{
			Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
				{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{
					Instructions: anthropic.String("Focus on preserving code snippets, variable names, and technical decisions."),
				}},
			},
		},
		Betas: []anthropic.AnthropicBeta{"compact-2026-01-12"},
	})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(response)
}
```

```java Java hidelines={1..4,7..9,-2..}
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.beta.messages.MessageCreateParams;
import com.anthropic.models.beta.messages.BetaMessage;
import com.anthropic.models.beta.messages.BetaContextManagementConfig;
import com.anthropic.models.beta.messages.BetaCompact20260112Edit;

public class CompactionExample {
    public static void main(String[] args) {
        AnthropicClient client = AnthropicOkHttpClient.fromEnv();

        MessageCreateParams params = MessageCreateParams.builder()
            .addBeta("compact-2026-01-12")
            .model("claude-opus-4-6")
            .maxTokens(4096L)
            .addUserMessage("Help me build a Python web scraper")
            .addAssistantMessage("I'll help you build a web scraper...")
            .addUserMessage("Add support for JavaScript-rendered pages")
            .contextManagement(BetaContextManagementConfig.builder()
                .addEdit(BetaCompact20260112Edit.builder()
                    .instructions("Focus on preserving code snippets, variable names, and technical decisions.")
                    .build())
                .build())
            .build();

        BetaMessage response = client.beta().messages().create(params);
        System.out.println(response);
    }
}
```

```php PHP hidelines={1..3}
<?php
use Anthropic\Client;

$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));

$response = $client->beta->messages->create(
    maxTokens: 4096,
    messages: [
        ['role' => 'user', 'content' => 'Help me build a Python web scraper'],
        ['role' => 'assistant', 'content' => "I'll help you build a web scraper..."],
        ['role' => 'user', 'content' => 'Add support for JavaScript-rendered pages']
    ],
    model: 'claude-opus-4-6',
    betas: ['compact-2026-01-12'],
    contextManagement: [
        'edits' => [
            [
                'type' => 'compact_20260112',
                'instructions' => 'Focus on preserving code snippets, variable names, and technical decisions.'
            ]
        ]
    ]
);

echo $response->content[0]->text;
```

```ruby Ruby hidelines={1..2}
require "anthropic"

client = Anthropic::Client.new

response = client.beta.messages.create(
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages: [
    { role: "user", content: "Help me build a Python web scraper" },
    { role: "assistant", content: "I'll help you build a web scraper..." },
    { role: "user", content: "Add support for JavaScript-rendered pages" }
  ],
  context_management: {
    edits: [
      {
        type: "compact_20260112",
        instructions:
          "Focus on preserving code snippets, variable names, and technical decisions."
      }
    ]
  }
)

puts response
```
</CodeGroup>

### Pausing after compaction

Use `pause_after_compaction` to pause the API after generating the compaction summary. This allows you to add additional content blocks (such as preserving recent messages or specific instruction-oriented messages) before the API continues with the response.

When enabled, the API returns a message with the `compaction` stop reason after generating the compaction block:

<CodeGroup>
```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "Hello, Claude"}]
response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=messages,
    context_management={
        "edits": [{"type": "compact_20260112", "pause_after_compaction": True}]
    },
)

# Check if compaction triggered a pause
if response.stop_reason == "compaction":
    # Response contains only the compaction block
    messages.append({"role": "assistant", "content": response.content})

    # Continue the request
    response = client.beta.messages.create(
        betas=["compact-2026-01-12"],
        model="claude-opus-4-6",
        max_tokens=4096,
        messages=messages,
        context_management={"edits": [{"type": "compact_20260112"}]},
    )
```

```typescript TypeScript hidelines={1..2}
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [];

let response = await client.beta.messages.create({
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages,
  context_management: {
    edits: [
      {
        type: "compact_20260112",
        pause_after_compaction: true
      }
    ]
  }
} as unknown as Anthropic.Beta.Messages.MessageCreateParamsNonStreaming);

// Check if compaction triggered a pause
if ((response.stop_reason as string) === "compaction") {
  // Response contains only the compaction block
  messages.push({
    role: "assistant",
    content: response.content as unknown as Anthropic.Beta.Messages.BetaContentBlockParam[]
  });

  // Continue the request
  response = await client.beta.messages.create({
    betas: ["compact-2026-01-12"],
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  } as unknown as Anthropic.Beta.Messages.MessageCreateParamsNonStreaming);
}
```

```csharp C#
using Anthropic;
using Anthropic.Models.Beta.Messages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        var client = new AnthropicClient();
        var messages = new List<BetaMessageParam>();

        var parameters = new MessageCreateParams
        {
            Model = "claude-opus-4-6",
            MaxTokens = 4096,
            Betas = ["compact-2026-01-12"],
            Messages = messages,
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit
                {
                    PauseAfterCompaction = true
                }]
            }
        };

        var response = await client.Beta.Messages.Create(parameters);

        if (response.StopReason == BetaStopReason.Compaction)
        {
            messages.Add(new BetaMessageParam
            {
                Role = Role.Assistant,
                Content = response.Content.Select(b => new BetaContentBlockParam(b.Json)).ToList()
            });

            parameters = new()
            {
                Model = "claude-opus-4-6",
                MaxTokens = 4096,
                Betas = ["compact-2026-01-12"],
                Messages = messages,
                ContextManagement = new BetaContextManagementConfig
                {
                    Edits = [new BetaCompact20260112Edit()]
                }
            };

            response = await client.Beta.Messages.Create(parameters);
        }

        Console.WriteLine(response);
    }
}
```
```go Go hidelines={1..11,-1}
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/anthropics/anthropic-sdk-go"
)

func main() {
	client := anthropic.NewClient()
	messages := []anthropic.BetaMessageParam{anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Hello, Claude"))}

	compactEdit := anthropic.BetaContextManagementConfigParam{
		Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
			{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{
				PauseAfterCompaction: anthropic.Bool(true),
			}},
		},
	}

	response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
		Model:             anthropic.ModelClaudeOpus4_6,
		MaxTokens:         4096,
		Messages:          messages,
		ContextManagement: compactEdit,
		Betas:             []anthropic.AnthropicBeta{"compact-2026-01-12"},
	})
	if err != nil {
		log.Fatal(err)
	}

	if response.StopReason == "compaction" {
		messages = append(messages, response.ToParam())

		response, err = client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
			Model:     anthropic.ModelClaudeOpus4_6,
			MaxTokens: 4096,
			Messages:  messages,
			ContextManagement: anthropic.BetaContextManagementConfigParam{
				Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
					{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{}},
				},
			},
			Betas: []anthropic.AnthropicBeta{"compact-2026-01-12"},
		})
		if err != nil {
			log.Fatal(err)
		}
	}

	fmt.Println(response)
}
```

```java Java hidelines={1..4,8..10,-2..}
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.beta.messages.MessageCreateParams;
import com.anthropic.models.beta.messages.BetaMessage;
import com.anthropic.models.beta.messages.BetaContextManagementConfig;
import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
import com.anthropic.models.beta.messages.BetaStopReason;

public class CompactionPauseExample {
    public static void main(String[] args) {
        AnthropicClient client = AnthropicOkHttpClient.fromEnv();

        MessageCreateParams params = MessageCreateParams.builder()
            .model("claude-opus-4-6")
            .maxTokens(4096L)
            .addBeta("compact-2026-01-12")
            .addUserMessage("Help me build a website")
            .contextManagement(BetaContextManagementConfig.builder()
                .addEdit(BetaCompact20260112Edit.builder()
                    .pauseAfterCompaction(true)
                    .build())
                .build())
            .build();

        BetaMessage response = client.beta().messages().create(params);

        // Check if compaction triggered a pause
        if (response.stopReason().isPresent()
                && response.stopReason().get().equals(BetaStopReason.COMPACTION)) {
            // Append the compaction block and continue the request
            // by building a new request with the compacted context
            MessageCreateParams continueParams = MessageCreateParams.builder()
                .model("claude-opus-4-6")
                .maxTokens(4096L)
                .addBeta("compact-2026-01-12")
                .addUserMessage("Help me build a website")
                .addMessage(response)
                .contextManagement(BetaContextManagementConfig.builder()
                    .addEdit(BetaCompact20260112Edit.builder().build())
                    .build())
                .build();

            response = client.beta().messages().create(continueParams);
        }

        System.out.println(response);
    }
}
```

```php PHP hidelines={1..4}
<?php

use Anthropic\Client;

$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));
$messages = [];

$response = $client->beta->messages->create(
    maxTokens: 4096,
    messages: $messages,
    model: 'claude-opus-4-6',
    betas: ['compact-2026-01-12'],
    contextManagement: [
        'edits' => [
            [
                'type' => 'compact_20260112',
                'pauseAfterCompaction' => true
            ]
        ]
    ]
);

if ($response->stopReason === 'compaction') {
    $messages[] = [
        'role' => 'assistant',
        'content' => $response->content
    ];

    $response = $client->beta->messages->create(
        maxTokens: 4096,
        messages: $messages,
        model: 'claude-opus-4-6',
        betas: ['compact-2026-01-12'],
        contextManagement: [
            'edits' => [
                ['type' => 'compact_20260112']
            ]
        ]
    );
}

echo $response;
```

```ruby Ruby hidelines={1..2}
require "anthropic"

client = Anthropic::Client.new
messages = []

response = client.beta.messages.create(
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages: messages,
  context_management: {
    edits: [
      {
        type: "compact_20260112",
        pause_after_compaction: true
      }
    ]
  }
)

if response.stop_reason == :compaction
  messages << { role: "assistant", content: response.content }

  response = client.beta.messages.create(
    betas: ["compact-2026-01-12"],
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages: messages,
    context_management: {
      edits: [{ type: "compact_20260112" }]
    }
  )
end

puts response
```
</CodeGroup>

#### Enforcing a total token budget

When a model works on long tasks with many tool-use iterations, total token consumption can grow significantly. You can combine `pause_after_compaction` with a compaction counter to estimate cumulative usage and gracefully wrap up the task once a budget is reached:

```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "Hello, Claude"}]
TRIGGER_THRESHOLD = 100_000
TOTAL_TOKEN_BUDGET = 3_000_000
n_compactions = 0

response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=messages,
    context_management={
        "edits": [
            {
                "type": "compact_20260112",
                "trigger": {"type": "input_tokens", "value": TRIGGER_THRESHOLD},
                "pause_after_compaction": True,
            }
        ]
    },
)

if response.stop_reason == "compaction":
    n_compactions += 1
    messages.append({"role": "assistant", "content": response.content})

    # Estimate total tokens consumed; prompt wrap-up if over budget
    if n_compactions * TRIGGER_THRESHOLD >= TOTAL_TOKEN_BUDGET:
        messages.append(
            {
                "role": "user",
                "content": "Please wrap up your current work and summarize the final state.",
            }
        )
```

## Working with compaction blocks

When compaction is triggered, the API returns a `compaction` block at the start of the assistant response.

A long-running conversation may result in multiple compactions. The last compaction block reflects the final state of the prompt, replacing content prior to it with the generated summary.

```json
{
  "content": [
    {
      "type": "compaction",
      "content": "Summary of the conversation: The user requested help building a web scraper..."
    },
    {
      "type": "text",
      "text": "Based on our conversation so far..."
    }
  ]
}
```

### Passing compaction blocks back

You must pass the `compaction` block back to the API on subsequent requests to continue the conversation with the shortened prompt. The simplest approach is to append the entire response content to your messages:

<CodeGroup>
```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "Hello, Claude"}]
response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
)
see shared-docs\ai-architecture\compaction-condense-2.md