# After receiving a response with a compaction block
messages.append({"role": "assistant", "content": response.content})

# Continue the conversation
messages.append({"role": "user", "content": "Now add error handling"})

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

// Assume we already have a response from a previous request
const response = await client.beta.messages.create({
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages,
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
} as unknown as Anthropic.Beta.Messages.MessageCreateParamsNonStreaming);

// After receiving a response with a compaction block
messages.push({
  role: "assistant",
  content: response.content as unknown as Anthropic.Beta.Messages.BetaContentBlockParam[]
});

// Continue the conversation
messages.push({ role: "user", content: "Now add error handling" });

const nextResponse = await client.beta.messages.create({
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages,
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
} as unknown as Anthropic.Beta.Messages.MessageCreateParamsNonStreaming);
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
        AnthropicClient client = new();

        var messages = new List<BetaMessageParam>
        {
            new() { Role = Role.User, Content = "Help me build a web scraper" }
        };

        var response = await client.Beta.Messages.Create(new()
        {
            Betas = ["compact-2026-01-12"],
            Model = "claude-opus-4-6",
            MaxTokens = 4096,
            Messages = messages,
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit()]
            }
        });

        messages.Add(new BetaMessageParam
        {
            Role = Role.Assistant,
            Content = response.Content.Select(b => new BetaContentBlockParam(b.Json)).ToList()
        });

        messages.Add(new BetaMessageParam { Role = Role.User, Content = "Now add error handling" });

        var nextResponse = await client.Beta.Messages.Create(new()
        {
            Betas = ["compact-2026-01-12"],
            Model = "claude-opus-4-6",
            MaxTokens = 4096,
            Messages = messages,
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit()]
            }
        });

        Console.WriteLine(nextResponse);
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
		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Help me build a web scraper")),
	}

	compactEdit := anthropic.BetaContextManagementConfigParam{
		Edits: []anthropic.BetaContextManagementConfigEditUnionParam{
			{OfCompact20260112: &anthropic.BetaCompact20260112EditParam{}},
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

	messages = append(messages, response.ToParam())

	messages = append(messages, anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Now add error handling")))

	nextResponse, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
		Model:             anthropic.ModelClaudeOpus4_6,
		MaxTokens:         4096,
		Messages:          messages,
		ContextManagement: compactEdit,
		Betas:             []anthropic.AnthropicBeta{"compact-2026-01-12"},
	})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(nextResponse)
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

        // First request
        BetaMessage response = client.beta().messages().create(
            MessageCreateParams.builder()
                .addBeta("compact-2026-01-12")
                .model("claude-opus-4-6")
                .maxTokens(4096L)
                .addUserMessage("Help me build a web scraper")
                .contextManagement(BetaContextManagementConfig.builder()
                    .addEdit(BetaCompact20260112Edit.builder().build())
                    .build())
                .build());

        // After receiving a response with a compaction block, append the full
        // content (including compaction blocks) and continue the conversation
        BetaMessage nextResponse = client.beta().messages().create(
            MessageCreateParams.builder()
                .addBeta("compact-2026-01-12")
                .model("claude-opus-4-6")
                .maxTokens(4096L)
                .addUserMessage("Help me build a web scraper")
                .addMessage(response)
                .addUserMessage("Now add error handling")
                .contextManagement(BetaContextManagementConfig.builder()
                    .addEdit(BetaCompact20260112Edit.builder().build())
                    .build())
                .build());

        System.out.println(nextResponse);
    }
}
```

```php PHP hidelines={1..4}
<?php

use Anthropic\Client;

$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));

$messages = [
    ['role' => 'user', 'content' => 'Help me build a web scraper']
];

$response = $client->beta->messages->create(
    maxTokens: 4096,
    messages: $messages,
    model: 'claude-opus-4-6',
    betas: ['compact-2026-01-12'],
    contextManagement: [
        'edits' => [['type' => 'compact_20260112']]
    ]
);

$messages[] = ['role' => 'assistant', 'content' => $response->content];

$messages[] = ['role' => 'user', 'content' => 'Now add error handling'];

$nextResponse = $client->beta->messages->create(
    maxTokens: 4096,
    messages: $messages,
    model: 'claude-opus-4-6',
    betas: ['compact-2026-01-12'],
    contextManagement: [
        'edits' => [['type' => 'compact_20260112']]
    ]
);

echo $nextResponse->content[0]->text;
```

```ruby Ruby hidelines={1..2}
require "anthropic"

client = Anthropic::Client.new

messages = [
  { role: "user", content: "Help me build a web scraper" }
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

messages << { role: "assistant", content: response.content }

messages << { role: "user", content: "Now add error handling" }

next_response = client.beta.messages.create(
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages: messages,
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
)

puts next_response.content
```
</CodeGroup>

When the API receives a `compaction` block, all content blocks before it are ignored. You can either:

- Keep the original messages in your list and let the API handle removing the compacted content
- Manually drop the compacted messages and only include the compaction block onwards

### Streaming

When streaming responses with compaction enabled, you'll receive a `content_block_start` event when compaction begins. The compaction block streams differently from text blocks. You'll receive a `content_block_start` event, followed by a single `content_block_delta` with the complete summary content (no intermediate streaming), and then a `content_block_stop` event.

<CodeGroup>
```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "Hello, Claude"}]

with client.beta.messages.stream(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-6",
    max_tokens=4096,
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
) as stream:
    for event in stream:
        if event.type == "content_block_start":
            if event.content_block.type == "compaction":
                print("Compaction started...")
            elif event.content_block.type == "text":
                print("Text response started...")

        elif event.type == "content_block_delta":
            if event.delta.type == "compaction_delta":
                print(f"Compaction complete: {len(event.delta.content)} chars")
            elif event.delta.type == "text_delta":
                print(event.delta.text, end="", flush=True)

    # Get the final accumulated message
    message = stream.get_final_message()
    messages.append({"role": "assistant", "content": message.content})
```

```typescript TypeScript nocheck hidelines={1..2}
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();
const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [];

const stream = await client.beta.messages.stream({
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages,
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
} as unknown as Anthropic.Beta.Messages.BetaMessageStreamParams);

for await (const event of stream) {
  if (event.type === "content_block_start") {
    if ((event.content_block as { type: string }).type === "compaction") {
      console.log("Compaction started...");
    } else if (event.content_block.type === "text") {
      console.log("Text response started...");
    }
  } else if (event.type === "content_block_delta") {
    if ((event.delta as { type: string }).type === "compaction_delta") {
      console.log(
        `Compaction complete: ${(event.delta as unknown as { content: string }).content.length} chars`
      );
    } else if (event.delta.type === "text_delta") {
      process.stdout.write(event.delta.text);
    }
  }
}

// Get the final accumulated message
const message = await stream.finalMessage();
messages.push({
  role: "assistant",
  content: message.content as unknown as Anthropic.Beta.Messages.BetaContentBlockParam[]
});
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
        var client = new AnthropicClient();
        List<BetaMessageParam> messages = [new() { Role = Role.User, Content = "Hello" }];

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

        await foreach (var streamEvent in client.Beta.Messages.CreateStreaming(parameters))
        {
            if (streamEvent.TryPickContentBlockStart(out var startEvent))
            {
                if (startEvent.ContentBlock.TryPickBetaCompaction(out _))
                {
                    Console.WriteLine("Compaction started...");
                }
                else if (startEvent.ContentBlock.TryPickBetaText(out _))
                {
                    Console.WriteLine("Text response started...");
                }
            }
            else if (streamEvent.TryPickContentBlockDelta(out var deltaEvent))
            {
                if (deltaEvent.Delta.TryPickCompaction(out var compactionDelta))
                {
                    Console.WriteLine($"Compaction complete: {compactionDelta.Content?.Length ?? 0} chars");
                }
                else if (deltaEvent.Delta.TryPickText(out var textDelta))
                {
                    Console.Write(textDelta.Text);
                }
            }
        }
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

	stream := client.Beta.Messages.NewStreaming(context.TODO(), anthropic.BetaMessageNewParams{
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

	for stream.Next() {
		event := stream.Current()
		switch eventVariant := event.AsAny().(type) {
		case anthropic.BetaRawContentBlockStartEvent:
			switch eventVariant.ContentBlock.AsAny().(type) {
			case anthropic.BetaCompactionBlock:
				fmt.Println("Compaction started...")
			case anthropic.BetaTextBlock:
				fmt.Println("Text response started...")
			}
		case anthropic.BetaRawContentBlockDeltaEvent:
			switch deltaVariant := eventVariant.Delta.AsAny().(type) {
			case anthropic.BetaCompactionContentBlockDelta:
				fmt.Printf("Compaction complete: %d chars\n", len(deltaVariant.Content))
			case anthropic.BetaTextDelta:
				fmt.Print(deltaVariant.Text)
			}
		}
	}
	if err := stream.Err(); err != nil {
		log.Fatal(err)
	}
}
```

```java Java hidelines={1..3,6..8,-2..}
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.beta.messages.MessageCreateParams;
import com.anthropic.models.beta.messages.BetaContextManagementConfig;
import com.anthropic.models.beta.messages.BetaCompact20260112Edit;

public class CompactionStreamingExample {
    public static void main(String[] args) {
        AnthropicClient client = AnthropicOkHttpClient.fromEnv();

        MessageCreateParams params = MessageCreateParams.builder()
            .model("claude-opus-4-6")
            .maxTokens(4096L)
            .addBeta("compact-2026-01-12")
            .addUserMessage("Hello, Claude")
            .contextManagement(BetaContextManagementConfig.builder()
                .addEdit(BetaCompact20260112Edit.builder().build())
                .build())
            .build();

        try (var streamResponse = client.beta().messages().createStreaming(params)) {
            streamResponse.stream().forEach(event -> {
                event.contentBlockStart().ifPresent(startEvent -> {
                    startEvent.contentBlock().compaction().ifPresent(c ->
                        System.out.println("Compaction started...")
                    );
                    startEvent.contentBlock().text().ifPresent(t ->
                        System.out.println("Text response started...")
                    );
                });

                event.contentBlockDelta().ifPresent(deltaEvent -> {
                    deltaEvent.delta().compaction().ifPresent(cd ->
                        System.out.println("Compaction complete: " + cd.content().map(String::length).orElse(0) + " chars")
                    );
                    deltaEvent.delta().text().ifPresent(td ->
                        System.out.print(td.text())
                    );
                });
            });
        }
    }
}
```

```php PHP hidelines={1..4}
<?php

use Anthropic\Client;

$client = new Client(apiKey: getenv("ANTHROPIC_API_KEY"));
$messages = [['role' => 'user', 'content' => 'Hello, Claude']];

$stream = $client->beta->messages->createStream(
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

foreach ($stream as $event) {
    if ($event->type === 'content_block_start') {
        if ($event->contentBlock->type === 'compaction') {
            echo "Compaction started...\n";
        } elseif ($event->contentBlock->type === 'text') {
            echo "Text response started...\n";
        }
    } elseif ($event->type === 'content_block_delta') {
        if ($event->delta->type === 'compaction_delta') {
            echo "Compaction complete: " . strlen($event->delta->content) . " chars\n";
        } elseif ($event->delta->type === 'text_delta') {
            echo $event->delta->text;
        }
    }
}
```

```ruby Ruby hidelines={1..2}
require "anthropic"

client = Anthropic::Client.new
messages = [{ role: "user", content: "Hello, Claude" }]

stream = client.beta.messages.stream(
  betas: ["compact-2026-01-12"],
  model: "claude-opus-4-6",
  max_tokens: 4096,
  messages: messages,
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
)

stream.each do |event|
  case event.type
  when :content_block_start
    if event.content_block.type == :compaction
      puts "Compaction started..."
    elsif event.content_block.type == :text
      puts "Text response started..."
    end
  when :content_block_delta
    if event.delta.type == :compaction_delta
      puts "Compaction complete: #{event.delta.content.length} chars"
    elsif event.delta.type == :text_delta
      print event.delta.text
    end
  end
end
```
</CodeGroup>

### Prompt caching

Compaction works well with [prompt caching](/docs/en/build-with-claude/prompt-caching). You can add a `cache_control` breakpoint on compaction blocks to cache the summarized content. The original compacted content is ignored.

```json
{
  "role": "assistant",
  "content": [
    {
      "type": "compaction",
      "content": "[summary text]",
      "cache_control": { "type": "ephemeral" }
    },
    {
      "type": "text",
      "text": "Based on our conversation..."
    }
  ]
}
```

#### Maximizing cache hits with system prompts

When compaction occurs, the summary becomes new content that needs to be written to the cache. Without additional cache breakpoints, this would also invalidate any cached system prompt, requiring it to be re-cached along with the compaction summary.

To maximize cache hit rates, add a `cache_control` breakpoint at the end of your system prompt. This keeps the system prompt cached separately from the conversation, so when compaction occurs:

- The system prompt cache remains valid and is read from cache
- Only the compaction summary needs to be written as a new cache entry

<CodeGroup>
```python Python hidelines={1..2}
import anthropic

client = anthropic.Anthropic()
messages = [{"role": "user", "content": "Hello, Claude"}]
response = client.beta.messages.create(
    betas=["compact-2026-01-12"],
    model="claude-opus-4-6",
    max_tokens=4096,
    system=[
        {
            "type": "text",
            "text": "You are a helpful coding assistant...",
            "cache_control": {
                "type": "ephemeral"
            },  # Cache the system prompt separately
        }
    ],
    messages=messages,
    context_management={"edits": [{"type": "compact_20260112"}]},
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
  system: [
    {
      type: "text",
      text: "You are a helpful coding assistant...",
      cache_control: { type: "ephemeral" } // Cache the system prompt separately
    }
  ],
  messages,
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
} as unknown as Anthropic.Beta.Messages.MessageCreateParamsNonStreaming);
```

```csharp C#
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Anthropic;
using Anthropic.Models.Beta.Messages;

class Program
{
    static async Task Main(string[] args)
    {
        var client = new AnthropicClient();

        var parameters = new MessageCreateParams
        {
            Betas = ["compact-2026-01-12"],
            Model = "claude-opus-4-6",
            MaxTokens = 4096,
            System = new List<BetaTextBlockParam>
            {
                new()
                {
                    Text = "You are a helpful coding assistant...",
                    CacheControl = new BetaCacheControlEphemeral()
                }
            },
            Messages = [],
            ContextManagement = new BetaContextManagementConfig
            {
                Edits = [new BetaCompact20260112Edit()]
            }
        };

        var response = await client.Beta.Messages.Create(parameters);
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

	response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
		Model:     anthropic.ModelClaudeOpus4_6,
		MaxTokens: 4096,
		System: []anthropic.BetaTextBlockParam{
			{
				Text:         "You are a helpful coding assistant...",
				CacheControl: anthropic.NewBetaCacheControlEphemeralParam(),
			},
		},
		Messages: []anthropic.BetaMessageParam{anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Hello, Claude"))},
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
	fmt.Println(response)
}
```

```java Java hidelines={1..5,9..12,-2..}
import com.anthropic.client.AnthropicClient;
import com.anthropic.client.okhttp.AnthropicOkHttpClient;
import com.anthropic.models.beta.messages.MessageCreateParams;
import com.anthropic.models.beta.messages.BetaMessage;
import com.anthropic.models.beta.messages.BetaTextBlockParam;
import com.anthropic.models.beta.messages.BetaContextManagementConfig;
import com.anthropic.models.beta.messages.BetaCompact20260112Edit;
import com.anthropic.models.beta.messages.BetaCacheControlEphemeral;
import java.util.List;

public class CompactionExample {
    public static void main(String[] args) {
        AnthropicClient client = AnthropicOkHttpClient.fromEnv();

        MessageCreateParams params = MessageCreateParams.builder()
            .model("claude-opus-4-6")
            .maxTokens(4096L)
            .addBeta("compact-2026-01-12")
            .systemOfBetaTextBlockParams(List.of(
                BetaTextBlockParam.builder()
                    .text("You are a helpful coding assistant...")
                    .cacheControl(BetaCacheControlEphemeral.builder().build())
                    .build()
            ))
            .addUserMessage("Hello, Claude")
            .contextManagement(BetaContextManagementConfig.builder()
                .addEdit(BetaCompact20260112Edit.builder().build())
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
    messages: [['role' => 'user', 'content' => 'Hello, Claude']],
    model: 'claude-opus-4-6',
    betas: ['compact-2026-01-12'],
    system: [
        [
            'type' => 'text',
            'text' => 'You are a helpful coding assistant...',
            'cache_control' => [
                'type' => 'ephemeral'
            ]
        ]
    ],
    contextManagement: [
        'edits' => [
            ['type' => 'compact_20260112']
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
  system: [
    {
      type: "text",
      text: "You are a helpful coding assistant...",
      cache_control: {
        type: "ephemeral"
      }
    }
  ],
  messages: [],
  context_management: {
    edits: [{ type: "compact_20260112" }]
  }
)
puts response
```
</CodeGroup>
.. continue in shared-docs\ai-architecture\compaction-condense-3.md