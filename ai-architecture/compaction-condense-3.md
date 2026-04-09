
This approach is particularly beneficial for long system prompts, as they remain cached even across multiple compaction events throughout a conversation.

## Understanding usage

Compaction requires an additional sampling step, which contributes to rate limits and billing. The API returns detailed usage information in the response:

```json
{
  "usage": {
    "input_tokens": 23000,
    "output_tokens": 1000,
    "iterations": [
      {
        "type": "compaction",
        "input_tokens": 180000,
        "output_tokens": 3500
      },
      {
        "type": "message",
        "input_tokens": 23000,
        "output_tokens": 1000
      }
    ]
  }
}
```

The `iterations` array shows usage for each sampling iteration. When compaction occurs, you'll see a `compaction` iteration followed by the main `message` iteration. The top-level `input_tokens` and `output_tokens` match the `message` iteration exactly in this example because there is only one non-compaction iteration. The final iteration's token counts reflect the effective context size after compaction.

<Note>
The top-level `input_tokens` and `output_tokens` do not include compaction iteration usage. They reflect the sum of all non-compaction iterations. To calculate total tokens consumed and billed for a request, sum across all entries in the `usage.iterations` array.

If you previously relied on `usage.input_tokens` and `usage.output_tokens` for cost tracking or auditing, you'll need to update your tracking logic to aggregate across `usage.iterations` when compaction is enabled. The `iterations` array is only populated when a new compaction is triggered during the request. Re-applying a previous `compaction` block incurs no additional compaction cost, and the top-level usage fields remain accurate in that case.
</Note>

## Combining with other features

### Server tools

When using server tools (like web search), the compaction trigger is checked at the start of each sampling iteration. Compaction may occur multiple times within a single request depending on your trigger threshold and the amount of output generated.

### Token counting

The token counting endpoint (`/v1/messages/count_tokens`) applies existing `compaction` blocks in your prompt but does not trigger new compactions. Use it to check your effective token count after previous compactions:

<CodeGroup>
```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "Hello, Claude"}]
count_response = client.beta.messages.count_tokens(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-6",
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
)

print(f"Current tokens: {count_response.input_tokens}")
print(f"Original tokens: {count_response.context_management.original_input_tokens}")
```

```typescript TypeScript hidelines={1..2}
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
  { role: "user", content: "Summarize the key points of our conversation so far." }
];

const countResponse = await client.beta.messages.countTokens({
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  messages,
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
} as unknown as Anthropic.Beta.Messages.MessageCountTokensParams);

console.log(`Current tokens: ${countResponse.input_tokens}`);
console.log(`Original tokens: ${countResponse.context_management!.original_input_tokens}`);
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

        var countParams = new MessageCountTokensParams
        {
            Model = "claude-opus-4-6",
            Messages = messages,
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit()]
            },
            Betas = ["compact-2026-01-12"]
        };

        var countResponse = await client.Beta.Messages.CountTokens(countParams);
        Console.WriteLine($"Current tokens: {countResponse.InputTokens}");
        Console.WriteLine($"Original tokens: {countResponse.ContextManagement?.OriginalInputTokens}");
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

	countResponse, err := client.Beta.Messages.CountTokens(context.TODO(), anthropic.BetaMessageCountTokensParams{
		Model:    anthropic.ModelClaudeOpus4_6,
		Messages: messages,
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

	fmt.Printf("Current tokens: %d\n", countResponse.InputTokens)
	fmt.Printf("Original tokens: %d\n", countResponse.ContextManagement.OriginalInputTokens)
}
```

```java Java hidelines={1..2,7..9,-2..}
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.beta.messages.BetaMessageTokensCount;
import com.anthropic.models.beta.messages.MessageCountTokensParams;
import com.anthropic.models.beta.messages.BetaContextManagementConfig;
import com.anthropic.models.beta.messages.BetaCompact20260112Edit;

public class Main {
    public static void main(String[] args) {
        AnthropicClient client = AnthropicOkHttpClient.fromEnv();

        MessageCountTokensParams params = MessageCountTokensParams.builder()
            .model("claude-opus-4-6")
            .addUserMessage("Hello, Claude")
            .contextManagement(BetaContextManagementConfig.builder()
                .addEdit(BetaCompact20260112Edit.builder().build())
                .build())
            .addBeta("compact-2026-01-12")
            .build();

        BetaMessageTokensCount countResponse = client.beta().messages().countTokens(params);
        System.out.println("Current tokens: " + countResponse.inputTokens());
        System.out.println("Original tokens: " + countResponse.contextManagement().get().originalInputTokens());
    }
}
```

```php PHP hidelines={1..4}
<?php

use Anthropic\Client;

$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));
$messages = [['role' => 'user', 'content' => 'Hello, Claude']];

$countResponse = $client->beta->messages->countTokens(
    messages: $messages,
    model: 'claude-opus-4-6',
    betas: ['compact-2026-01-12'],
    contextManagement: [
        'edits' => [
            ['type' => 'compact_20260112']
        ]
    ]
);

echo "Current tokens: " . $countResponse->inputTokens . "\n";
echo "Original tokens: " . $countResponse->contextManagement->originalInputTokens . "\n";
```

```ruby Ruby hidelines={1..2}
require "anthropic"

client = Anthropic::Client.new
messages = [{ role: "user", content: "Hello, Claude" }]

count_response = client.beta.messages.count_tokens(
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  messages: messages,
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
)

puts "Current tokens: #{count_response.input_tokens}"
puts "Original tokens: #{count_response.context_management.original_input_tokens}"
```
</CodeGroup>

## Examples

Here's a complete example of a long-running conversation with compaction:

<CodeGroup>
```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()

messages: list[dict] = []


def chat(user_message: str) -> str:
    messages.append({"role": "user", "content": user_message})

    response = client.beta.messages.create(
        betas=["compact-2026-01-12"],
        model="claude-opus-4-6",
        max_tokens=4096,
        messages=messages,
        context_management={
            "edits": [
                {
                    "type": "compact_20260112",
                    "trigger": {"type": "input_tokens", "value": 100000},
                }
            ]
        },
    )

    # Append response (compaction blocks are automatically included)
    messages.append({"role": "assistant", "content": response.content})

    # Return the text content
    return next(block.text for block in response.content if block.type == "text")


# Run a long conversation
print(chat("Help me build a Python web scraper"))
print(chat("Add support for JavaScript-rendered pages"))
print(chat("Now add rate limiting and error handling"))
# ... continue as long as needed
```

```typescript TypeScript hidelines={1..2}
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const messages: Anthropic.Beta.BetaMessageParam[] = [];

async function chat(userMessage: string): Promise<string> {
  messages.push({ role: "user", content: userMessage });

  const response = await client.beta.messages.create({
    betas: ["compact-2026-01-12"],
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages,
    context_management: {
      edits: [
        {
          type: "compact_20260112",
          trigger: { type: "input_tokens", value: 100000 }
        }
      ]
    }
  });

  // Append response (compaction blocks are automatically included)
  messages.push({ role: "assistant", content: response.content });

  // Return the text content
  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text ?? "";
}

// Run a long conversation
console.log(await chat("Help me build a Python web scraper"));
console.log(await chat("Add support for JavaScript-rendered pages"));
console.log(await chat("Now add rate limiting and error handling"));
// ... continue as long as needed
```

```csharp C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Anthropic;
using Anthropic.Models.Beta.Messages;

public class Program
{
    static async Task Main(string[] args)
    {
        AnthropicClient client = new();
        List<BetaMessageParam> messages = new();

        Console.WriteLine(await Chat(client, messages, "Help me build a Python web scraper"));
        Console.WriteLine(await Chat(client, messages, "Add support for JavaScript-rendered pages"));
        Console.WriteLine(await Chat(client, messages, "Now add rate limiting and error handling"));
    }

    static async Task<string> Chat(AnthropicClient client, List<BetaMessageParam> messages, string userMessage)
    {
        messages.Add(new() { Role = Role.User, Content = userMessage });

        var parameters = new MessageCreateParams
        {
            Betas = ["compact-2026-01-12"],
            Model = "claude-opus-4-6",
            MaxTokens = 4096,
            Messages = messages,
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit
                {
                    Trigger = new BetaInputTokensTrigger(100000)
                }]
            }
        };

        var response = await client.Beta.Messages.Create(parameters);

        messages.Add(new()
        {
            Role = Role.Assistant,
            Content = response.Content.Select(b => new BetaContentBlockParam(b.Json)).ToList()
        });

        return response.Content
            .Select(b => b.Value)
            .OfType<BetaTextBlock>()
            .Select(tb => tb.Text)
            .FirstOrDefault() ?? "";
    }
}
```
```go Go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/anthropics/anthropic-sdk-go"
)

var (
	client   = anthropic.NewClient()
	messages []anthropic.BetaMessageParam
)

func chat(userMessage string) string {
	messages = append(messages, anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(userMessage)))

	response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
		Model:     anthropic.ModelClaudeOpus4_6,
		MaxTokens: 4096,
		Messages:  messages,
		ContextManagement: anthropic.BetaContextManagementConfigParam{
			Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
				{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{
					Trigger: anthropic.BetaInputTokensTriggerParam{Value: 100000},
				}},
			},
		},
		Betas: []anthropic.AnthropicBeta{"compact-2026-01-12"},
	})
	if err != nil {
		log.Fatal(err)
	}

	messages = append(messages, response.ToParam())

	for _, block := range response.Content {
		if variant, ok := block.AsAny().(anthropic.BetaTextBlock); ok {
			return variant.Text
		}
	}
	return ""
}

func main() {
	fmt.Println(chat("Help me build a Python web scraper"))
	fmt.Println(chat("Add support for JavaScript-rendered pages"))
	fmt.Println(chat("Now add rate limiting and error handling"))
}
```

```java Java hidelines={1..5,9..12,-1}
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.beta.messages.MessageCreateParams;
import com.anthropic.models.beta.messages.BetaMessage;
import com.anthropic.models.beta.messages.BetaMessageParam;
import com.anthropic.models.beta.messages.BetaContextManagementConfig;
import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
import com.anthropic.models.beta.messages.BetaInputTokensTrigger;
import java.util.ArrayList;
import java.util.List;

public class CompactionExample {
    private static final AnthropicClient client = AnthropicOkHttpClient.fromEnv();
    private static final List<BetaMessageParam> messages = new ArrayList<>();

    public static void main(String[] args) {
        System.out.println(chat("Help me build a Python web scraper"));
        System.out.println(chat("Add support for JavaScript-rendered pages"));
        System.out.println(chat("Now add rate limiting and error handling"));
    }

    private static String chat(String userMessage) {
        messages.add(BetaMessageParam.builder()
            .role(BetaMessageParam.Role.USER)
            .content(userMessage)
            .build());

        MessageCreateParams params = MessageCreateParams.builder()
            .addBeta("compact-2026-01-12")
            .model("claude-opus-4-6")
            .maxTokens(4096L)
            .messages(messages)
            .contextManagement(BetaContextManagementConfig.builder()
                .addEdit(BetaCompact20260112Edit.builder()
                    .trigger(BetaInputTokensTrigger.builder()
                        .value(100000L)
                        .build())
                    .build())
                .build())
            .build();

        BetaMessage response = client.beta().messages().create(params);

        // Append response (compaction blocks are automatically included)
        messages.add(response.toParam());

        return response.content().stream()
            .filter(block -> block.text().isPresent())
            .map(block -> block.text().get().text())
            .findFirst()
            .orElse("");
    }
}
```

```php PHP hidelines={1..3}
<?php
use Anthropic\Client;

$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));
$messages = [];

function chat($client, &$messages, $userMessage) {
    $messages[] = ['role' => 'user', 'content' => $userMessage];

    $response = $client->beta->messages->create(
        maxTokens: 4096,
        messages: $messages,
        model: 'claude-opus-4-6',
        betas: ['compact-2026-01-12'],
        contextManagement: [
            'edits' => [
                [
                    'type' => 'compact_20260112',
                    'trigger' => ['type' => 'input_tokens', 'value' => 100000]
                ]
            ]
        ]
    );

    $messages[] = ['role' => 'assistant', 'content' => $response->content];

    foreach ($response->content as $block) {
        if ($block->type === 'text') {
            return $block->text;
        }
    }
    return '';
}

echo chat($client, $messages, "Help me build a Python web scraper") . "\n";
echo chat($client, $messages, "Add support for JavaScript-rendered pages") . "\n";
echo chat($client, $messages, "Now add rate limiting and error handling") . "\n";
```

```ruby Ruby hidelines={1..2}
require "anthropic"

client = Anthropic::Client.new
messages = []

def chat(client, messages, user_message)
  messages << { role: "user", content: user_message }

  response = client.beta.messages.create(
    betas: ["compact-2026-01-12"],
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages: messages,
    context_management: {
      edits: [
        {
          type: "compact_20260112",
          trigger: { type: "input_tokens", value: 100000 }
        }
      ]
    }
  )

  messages << { role: "assistant", content: response.content }

  response.content.find { |block| block.type == :text }&.text || ""
end

puts chat(client, messages, "Help me build a Python web scraper")
puts chat(client, messages, "Add support for JavaScript-rendered pages")
puts chat(client, messages, "Now add rate limiting and error handling")
```
</CodeGroup>

Here's an example that uses `pause_after_compaction` to preserve the prior exchange and the current user message (three messages total) verbatim instead of summarizing them:

<CodeGroup>
```python Python hidelines={1}
import anthropic
from typing import Any

client = anthropic.Anthropic()

messages: list[dict[str, Any]] = []


def chat(user_message: str) -> str:
    messages.append({"role": "user", "content": user_message})

    response = client.beta.messages.create(
        betas=["compact-2026-01-12"],
        model="claude-opus-4-6",
        max_tokens=4096,
        messages=messages,
        context_management={
            "edits": [
                {
                    "type": "compact_20260112",
                    "trigger": {"type": "input_tokens", "value": 100000},
                    "pause_after_compaction": True,
                }
            ]
        },
    )

    # Check if compaction occurred and paused
    if response.stop_reason == "compaction":
        # Get the compaction block from the response
        compaction_block = response.content[0]

        # Preserve the prior exchange + current user message (3 messages)
        # by including them after the compaction block
        preserved_messages = messages[-3:] if len(messages) >= 3 else messages

        # Build new message list: compaction + preserved messages
        new_assistant_content = [compaction_block]
        messages_after_compaction = [
            {"role": "assistant", "content": new_assistant_content}
        ] + preserved_messages

        # Continue the request with the compacted context + preserved messages
        response = client.beta.messages.create(
            betas=["compact-2026-01-12"],
            model="claude-opus-4-6",
            max_tokens=4096,
            messages=messages_after_compaction,
            context_management={"edits": [{"type": "compact_20260112"}]},
        )

        # Update our message list to reflect the compaction
        messages.clear()
        messages.extend(messages_after_compaction)

    # Append the final response
    messages.append({"role": "assistant", "content": response.content})

    # Return the text content
    return next(block.text for block in response.content if block.type == "text")


# Run a long conversation
print(chat("Help me build a Python web scraper"))
print(chat("Add support for JavaScript-rendered pages"))
print(chat("Now add rate limiting and error handling"))
# ... continue as long as needed
```

```typescript TypeScript hidelines={1..2}
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

let messages: Anthropic.Beta.BetaMessageParam[] = [];

async function chat(userMessage: string): Promise<string> {
  messages.push({ role: "user", content: userMessage });

  let response = await client.beta.messages.create({
    betas: ["compact-2026-01-12"],
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages,
    context_management: {
      edits: [
        {
          type: "compact_20260112",
          trigger: { type: "input_tokens", value: 100000 },
          pause_after_compaction: true
        }
      ]
    }
  });

  // Check if compaction occurred and paused
  if (response.stop_reason === "compaction") {
    // Get the compaction block from the response
    const compactionBlock = response.content[0];

    // Preserve the prior exchange + current user message (3 messages)
    // by including them after the compaction block
    const preservedMessages = messages.length >= 3 ? messages.slice(-3) : [...messages];

    // Build new message list: compaction + preserved messages
    const messagesAfterCompaction: Anthropic.Beta.BetaMessageParam[] = [
      { role: "assistant", content: [compactionBlock] },
      ...preservedMessages
    ];

    // Continue the request with the compacted context + preserved messages
    response = await client.beta.messages.create({
      betas: ["compact-2026-01-12"],
      model: "claude-opus-4-6",
      max_tokens: 4096,
      messages: messagesAfterCompaction,
      context_management: {
        edits: [{ type: "compact_20260112" }]
      }
    });

    // Update our message list to reflect the compaction
    messages = messagesAfterCompaction;
  }

  // Append the final response
  messages.push({ role: "assistant", content: response.content });

  // Return the text content
  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text ?? "";
}

// Run a long conversation
console.log(await chat("Help me build a Python web scraper"));
console.log(await chat("Add support for JavaScript-rendered pages"));
console.log(await chat("Now add rate limiting and error handling"));
// ... continue as long as needed
```

```csharp C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Anthropic;
using Anthropic.Models.Beta.Messages;

public class CompactionExample
{
    private static AnthropicClient client = new();
    private static List<BetaMessageParam> messages = new();

    static async Task<string> Chat(string userMessage)
    {
        messages.Add(new() { Role = Role.User, Content = userMessage });

        var response = await client.Beta.Messages.Create(new()
        {
            Betas = ["compact-2026-01-12"],
            Model = "claude-opus-4-6",
            MaxTokens = 4096,
            Messages = messages,
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit
                {
                    Trigger = new BetaInputTokensTrigger(100000),
                    PauseAfterCompaction = true
                }]
            }
        });

        if (response.StopReason == BetaStopReason.Compaction)
        {
            if (!response.Content[0].TryPickCompaction(out var cb))
                throw new InvalidOperationException("Expected compaction block");

            var preserved = messages.Count >= 3
                ? messages.Skip(messages.Count - 3).ToList()
                : new List<BetaMessageParam>(messages);

            var messagesAfterCompaction = new List<BetaMessageParam>
            {
                new()
                {
                    Role = Role.Assistant,
                    Content = new List<BetaContentBlockParam> { new BetaCompactionBlockParam(cb.Content) }
                }
            };
            messagesAfterCompaction.AddRange(preserved);

            response = await client.Beta.Messages.Create(new()
            {
                Betas = ["compact-2026-01-12"],
                Model = "claude-opus-4-6",
                MaxTokens = 4096,
                Messages = messagesAfterCompaction,
                ContextManagement = new BetaContextManagementConfig
                {
                    Edits = [new BetaCompact20260112Edit()]
                }
            });

            messages = messagesAfterCompaction;
        }

        messages.Add(new()
        {
            Role = Role.Assistant,
            Content = response.Content.Select(b => new BetaContentBlockParam(b.Json)).ToList()
        });

        return response.Content
            .Select(b => b.Value)
            .OfType<BetaTextBlock>()
            .Select(tb => tb.Text)
            .FirstOrDefault() ?? "";
    }

    static async Task Main()
    {
        Console.WriteLine(await Chat("Help me build a Python web scraper"));
        Console.WriteLine(await Chat("Add support for JavaScript-rendered pages"));
        Console.WriteLine(await Chat("Now add rate limiting and error handling"));
    }
}
```
```go Go
package main

import (
	"context"
	"fmt"
	"log"

	"github.com/anthropics/anthropic-sdk-go"
)

var (
	client   = anthropic.NewClient()
	messages []anthropic.BetaMessageParam
)

func chat(userMessage string) string {
	messages = append(messages, anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(userMessage)))

	compactEdit := anthropic.BetaContextManagementConfigParam{
		Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
			{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{
				Trigger:              anthropic.BetaInputTokensTriggerParam{Value: 100000},
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
		compactionParam := response.Content[0].ToParam()

		var preserved []anthropic.BetaMessageParam
		if len(messages) >= 3 {
			preserved = messages[len(messages)-3:]
		} else {
			preserved = messages
		}

		messagesAfterCompaction := []anthropic.BetaMessageParam{
			{Role: anthropic.BetaMessageParamRoleAssistant, Content: []anthropic.BetaContentBlockParamUnion{compactionParam}},
		}
		messagesAfterCompaction = append(messagesAfterCompaction, preserved...)

		response, err = client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
			Model:     anthropic.ModelClaudeOpus4_6,
			MaxTokens: 4096,
			Messages:  messagesAfterCompaction,
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

		messages = messagesAfterCompaction
	}

	messages = append(messages, response.ToParam())

	for _, block := range response.Content {
		if textBlock, ok := block.AsAny().(anthropic.BetaTextBlock); ok {
			return textBlock.Text
		}
	}
	return ""
}

func main() {
	fmt.Println(chat("Help me build a Python web scraper"))
	fmt.Println(chat("Add support for JavaScript-rendered pages"))
	fmt.Println(chat("Now add rate limiting and error handling"))
}
```

```java Java hidelines={1..5,10..13,-1}
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.beta.messages.MessageCreateParams;
import com.anthropic.models.beta.messages.BetaMessage;
import com.anthropic.models.beta.messages.BetaMessageParam;
import com.anthropic.models.beta.messages.BetaContextManagementConfig;
import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
import com.anthropic.models.beta.messages.BetaInputTokensTrigger;
import com.anthropic.models.beta.messages.BetaStopReason;
import java.util.ArrayList;
import java.util.List;

public class CompactionExample {
    private static final AnthropicClient client = AnthropicOkHttpClient.fromEnv();
    private static final List<BetaMessageParam> messages = new ArrayList<>();

    public static String chat(String userMessage) {
        messages.add(BetaMessageParam.builder()
            .role(BetaMessageParam.Role.USER)
            .content(userMessage)
            .build());

        MessageCreateParams params = MessageCreateParams.builder()
            .addBeta("compact-2026-01-12")
            .model("claude-opus-4-6")
            .maxTokens(4096L)
            .messages(messages)
            .contextManagement(BetaContextManagementConfig.builder()
                .addEdit(BetaCompact20260112Edit.builder()
                    .trigger(BetaInputTokensTrigger.builder()
                        .value(100000L)
                        .build())
                    .pauseAfterCompaction(true)
                    .build())
                .build())
            .build();

        BetaMessage response = client.beta().messages().create(params);

        // Check if compaction occurred and paused
        if (response.stopReason().isPresent()
                && response.stopReason().get().equals(BetaStopReason.COMPACTION)) {
            // Preserve the prior exchange + current user message (3 messages)
            List<BetaMessageParam> preservedMessages = messages.size() >= 3
                ? new ArrayList<>(messages.subList(messages.size() - 3, messages.size()))
                : new ArrayList<>(messages);

            // Build new message list: compaction + preserved messages
            List<BetaMessageParam> messagesAfterCompaction = new ArrayList<>();
            messagesAfterCompaction.add(response.toParam());
            messagesAfterCompaction.addAll(preservedMessages);

            // Continue the request with the compacted context + preserved messages
            MessageCreateParams continueParams = MessageCreateParams.builder()
                .addBeta("compact-2026-01-12")
                .model("claude-opus-4-6")
                .maxTokens(4096L)
                .messages(messagesAfterCompaction)
                .contextManagement(BetaContextManagementConfig.builder()
                    .addEdit(BetaCompact20260112Edit.builder().build())
                    .build())
                .build();

            response = client.beta().messages().create(continueParams);

            // Update our message list to reflect the compaction
            messages.clear();
            messages.addAll(messagesAfterCompaction);
        }

        // Append the final response
        messages.add(response.toParam());

        return response.content().stream()
            .filter(block -> block.text().isPresent())
            .map(block -> block.text().get().text())
            .findFirst()
            .orElse("");
    }

    public static void main(String[] args) {
        System.out.println(chat("Help me build a Python web scraper"));
        System.out.println(chat("Add support for JavaScript-rendered pages"));
        System.out.println(chat("Now add rate limiting and error handling"));
    }
}
```

```php PHP hidelines={1..4}
<?php

use Anthropic\Client;

$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));
$messages = [];

function chat($client, &$messages, $userMessage) {
    $messages[] = ['role' => 'user', 'content' => $userMessage];

    $response = $client->beta->messages->create(
        maxTokens: 4096,
        messages: $messages,
        model: 'claude-opus-4-6',
        betas: ['compact-2026-01-12'],
        contextManagement: [
            'edits' => [
                [
                    'type' => 'compact_20260112',
                    'trigger' => ['type' => 'input_tokens', 'value' => 100000],
                    'pauseAfterCompaction' => true
                ]
            ]
        ]
    );

    if ($response->stopReason === 'compaction') {
        $compactionBlock = $response->content[0];

        $preserved = count($messages) >= 3
            ? array_slice($messages, -3)
            : $messages;

        $messagesAfterCompaction = array_merge(
            [['role' => 'assistant', 'content' => [$compactionBlock]]],
            $preserved
        );

        $response = $client->beta->messages->create(
            maxTokens: 4096,
            messages: $messagesAfterCompaction,
            model: 'claude-opus-4-6',
            betas: ['compact-2026-01-12'],
            contextManagement: [
                'edits' => [['type' => 'compact_20260112']]
            ]
        );

        $messages = $messagesAfterCompaction;
    }

    $messages[] = ['role' => 'assistant', 'content' => $response->content];

    foreach ($response->content as $block) {
        if ($block->type === 'text') {
            return $block->text;
        }
    }
    return '';
}

echo chat($client, $messages, "Help me build a Python web scraper") . "\n";
echo chat($client, $messages, "Add support for JavaScript-rendered pages") . "\n";
echo chat($client, $messages, "Now add rate limiting and error handling") . "\n";
```

```ruby Ruby hidelines={1..2}
require "anthropic"

client = Anthropic::Client.new
messages = []

def chat(client, messages, user_message)
  messages << { role: "user", content: user_message }

  response = client.beta.messages.create(
    betas: ["compact-2026-01-12"],
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages: messages,
    context_management: {
      edits: [
        {
          type: "compact_20260112",
          trigger: { type: "input_tokens", value: 100000 },
          pause_after_compaction: true
        }
      ]
    }
  )

  if response.stop_reason == :compaction
    compaction_block = response.content[0]

    preserved = messages.length >= 3 ? messages[-3..-1] : messages.dup

    messages_after_compaction = [
      { role: "assistant", content: [compaction_block] }
    ] + preserved

    response = client.beta.messages.create(
      betas: ["compact-2026-01-12"],
      model: "claude-opus-4-6",
      max_tokens: 4096,
      messages: messages_after_compaction,
      context_management: {
        edits: [{ type: "compact_20260112" }]
      }
    )

    messages.clear
    messages.concat(messages_after_compaction)
  end

  messages << { role: "assistant", content: response.content }

  response.content.find { |block| block.type == :text }&.text || ""
end

puts chat(client, messages, "Help me build a Python web scraper")
puts chat(client, messages, "Add support for JavaScript-rendered pages")
puts chat(client, messages, "Now add rate limiting and error handling")
```
</CodeGroup>

## Current limitations

- **Same model for summarization:** The model specified in your request is used for summarization. There is no option to use a different (for example, cheaper) model for the summary.

## Next steps

<CardGroup>
  <Card title="Session memory compaction cookbook" icon="book" href="https://platform.claude.com/cookbook/misc-session-memory-compaction">
    Explore a practical implementation that manages long-running conversations with instant session memory compaction using background threading and prompt caching.
  </Card>
  <Card title="Context windows" icon="arrows-maximize" href="/docs/en/build-with-claude/context-windows">
    Learn about context window sizes and management strategies.
  </Card>
  <Card title="Context editing" icon="pen" href="/docs/en/build-with-claude/context-editing">
    Explore other strategies for managing conversation context like tool result clearing and thinking block clearing.
  </Card>
</CardGroup>