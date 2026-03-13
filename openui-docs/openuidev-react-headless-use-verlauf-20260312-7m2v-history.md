# Chat History: openuidev react headless use verlauf 20260312 7m2v

*Created on 3/12/2026, 3:52:50 PM*

---

**You (Draft):**
# @openuidev/react-headless



Use this package when you want headless chat state + streaming, with or without prebuilt UI.

Import [#import]

```ts
import {
  ChatProvider,
  useThread,
  useThreadList,
  openAIAdapter,
  openAIResponsesAdapter,
  openAIReadableStreamAdapter,
  agUIAdapter,
  openAIMessageFormat,
  openAIConversationMessageFormat,
  identityMessageFormat,
  processStreamedMessage,
  MessageProvider,
  useMessage,
  EventType,
} from "@openuidev/react-headless";
```

ChatProvider [#chatprovider]

Provides chat/thread state to UI components.

```ts
type ChatProviderProps = ThreadApiConfig &
  ChatApiConfig & {
    streamProtocol?: StreamProtocolAdapter;
    messageFormat?: MessageFormat;
    children: React.ReactNode;
  };
```

`ThreadApiConfig`:

* Provide `threadApiUrl`, **or**
* Provide custom handlers: `fetchThreadList`, `createThread`, `deleteThread`, `updateThread`, `loadThread`

`ChatApiConfig`:

* Provide `apiUrl`, **or**
* Provide `processMessage({ threadId, messages, abortController })`

useThread() [#usethread]

Thread-level state/actions used throughout chat docs.

```ts
function useThread(): ThreadState & ThreadActions;
function useThread<T>(selector: (state: ThreadState & ThreadActions) => T): T;
```

Shape:

```ts
type ThreadState = {
  messages: Message[];
  isRunning: boolean;
  isLoadingMessages: boolean;
  threadError: Error | null;
};

type ThreadActions = {
  processMessage: (message: CreateMessage) => Promise<void>;
  appendMessages: (...messages: Message[]) => void;
  updateMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  deleteMessage: (messageId: string) => void;
  cancelMessage: () => void;
};
```

useThreadList() [#usethreadlist]

Thread list state/actions for sidebars and history.

```ts
function useThreadList(): ThreadListState & ThreadListActions;
function useThreadList<T>(selector: (state: ThreadListState & ThreadListActions) => T): T;
```

useMessage() [#usemessage]

Access the current message inside a message component.

```ts
function useMessage(): Message;
```

Provided via `MessageProvider` / `MessageContext`.

Stream adapters [#stream-adapters]

Adapters referenced in integration guides:

```ts
function openAIAdapter(): StreamProtocolAdapter; // OpenAI Chat Completions stream
function openAIResponsesAdapter(): StreamProtocolAdapter; // OpenAI Responses stream
function openAIReadableStreamAdapter(): StreamProtocolAdapter; // OpenAI ReadableStream
function agUIAdapter(): StreamProtocolAdapter; // AG-UI protocol stream
```

Related type:

```ts
interface StreamProtocolAdapter {
  parse(response: Response): AsyncIterable<AGUIEvent>;
}
```

Message format adapters [#message-format-adapters]

Converters referenced in integration guides:

```ts
const openAIMessageFormat: MessageFormat; // Chat Completions format
const openAIConversationMessageFormat: MessageFormat; // Responses/Conversations item format
const identityMessageFormat: MessageFormat; // Pass-through (no conversion)
```

Base type:

```ts
interface MessageFormat {
  toApi(messages: Message[]): unknown;
  fromApi(data: unknown): Message[];
}
```

Message types [#message-types]

```ts
type Message =
  | UserMessage
  | AssistantMessage
  | SystemMessage
  | DeveloperMessage
  | ToolMessage
  | ActivityMessage
  | ReasoningMessage;
```

Key message shapes:

```ts
interface UserMessage {
  role: "user";
  id: string;
  content: InputContent[];
}

interface AssistantMessage {
  role: "assistant";
  id: string;
  content: string | null;
  toolCalls?: ToolCall[];
}
```

Streaming utilities [#streaming-utilities]

```ts
function processStreamedMessage(/* ... */): Promise<void>;
```

Low-level utility for processing a streamed response outside of `ChatProvider`.