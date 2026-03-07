# ggcoder

<p align="center">
  <strong>An open-source CLI coding agent. No API keys. Just OAuth and go.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@kenkaiiii/ggcoder"><img src="https://img.shields.io/npm/v/@kenkaiiii/ggcoder?style=for-the-badge" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
  <a href="https://youtube.com/@kenkaidoesai"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"></a>
  <a href="https://skool.com/kenkai"><img src="https://img.shields.io/badge/Skool-Community-7C3AED?style=for-the-badge" alt="Skool"></a>
</p>

**ggcoder** is a terminal-based coding agent that connects to Claude and GPT models through OAuth. No API keys to manage. Log in once, start coding. It reads your codebase, edits files, runs commands, and loops until the job is done.

Built as a TypeScript monorepo with three composable packages that you can use independently or together.

---

## Why this exists

Most coding agents either lock you into one provider or make you juggle API keys across machines.

ggcoder uses OAuth exclusively. Log in with your Anthropic or OpenAI account, and it handles token refresh, session management, and provider switching. Switch between Claude and GPT mid-conversation. No `.env` files, no key rotation, no billing surprises from leaked credentials.

It's also fully open-source. Every layer of the stack is available as its own npm package if you want to build on top of it.

---

## What it actually does

### Agentic coding loop
Give it a task and it figures out the rest. It reads files, makes edits, runs shell commands, and validates its own work. Multi-turn tool execution with automatic error recovery. When a command fails, it reads the output and adjusts. When an edit breaks something, it catches it and fixes it.

### OAuth-only authentication
No API keys anywhere. PKCE OAuth flows for both Anthropic and OpenAI. Tokens stored securely in `~/.gg/auth.json` with automatic refresh. One `ggcoder login` and you're set.

### Multi-provider support
Switch between Claude (Sonnet, Opus, Haiku) and GPT (GPT-4.1, o3, o4-mini) with `/model`. Same conversation, different models. The unified streaming API handles provider differences so you don't have to think about them.

### Full tool suite
- **File operations:** read, write, edit, glob, grep, ls
- **Shell execution:** bash with timeout, background tasks
- **Web fetching:** pull content from URLs
- **Subagents:** spawn parallel agents for independent tasks
- **MCP support:** connect external tool servers

### Interactive terminal UI
Built with Ink and React. Syntax-highlighted code blocks, streaming responses, session management, dark/light themes. Slash commands for everything: `/model`, `/compact`, `/session`, `/clear`, `/help`.

### Session management
Conversations persist across restarts. Resume where you left off or start fresh. Context compaction keeps long sessions within token limits without losing important context.

### Extensible architecture
Three npm packages, each usable on its own:

| Package | Description |
|---|---|
| [`@kenkaiiii/gg-ai`](https://www.npmjs.com/package/@kenkaiiii/gg-ai) | Unified LLM streaming API for Anthropic and OpenAI |
| [`@kenkaiiii/gg-agent`](https://www.npmjs.com/package/@kenkaiiii/gg-agent) | Agent loop with tool execution and multi-turn reasoning |
| [`@kenkaiiii/ggcoder`](https://www.npmjs.com/package/@kenkaiiii/ggcoder) | The full CLI coding agent |

---

## Getting started

### Install

```bash
npm i -g @kenkaiiii/ggcoder
```

### Setup

1. Run `ggcoder login`
2. Pick your provider (Anthropic or OpenAI)
3. Authenticate in your browser
4. Start coding with `ggcoder`

That's it.

---

## Usage

```bash
# Interactive mode
ggcoder

# Ask a question directly
ggcoder "fix the failing tests in src/utils"

# Switch models mid-session
/model claude-opus-4-6
/model gpt-4.1

# Manage sessions
/session list
/session load my-feature
/new

# Get help
/help
```

---

## Using the packages independently

### @kenkaiiii/gg-ai — Unified LLM streaming

```typescript
import { stream } from "@kenkaiiii/gg-ai";

const result = stream({
  provider: "anthropic",
  model: "claude-sonnet-4-6",
  messages: [{ role: "user", content: "Hello!" }],
});

// Stream events
for await (const event of result) {
  if (event.type === "text_delta") process.stdout.write(event.text);
}

// Or just await the final result
const response = await stream({ /* ... */ });
```

### @kenkaiiii/gg-agent — Agent loop

```typescript
import { Agent } from "@kenkaiiii/gg-agent";
import { z } from "zod";

const agent = new Agent({
  provider: "anthropic",
  model: "claude-sonnet-4-6",
  system: "You are a helpful assistant.",
  tools: [{
    name: "get_weather",
    description: "Get the weather for a city",
    parameters: z.object({ city: z.string() }),
    async execute({ city }) {
      return { temperature: 72, condition: "sunny" };
    },
  }],
});

for await (const event of agent.prompt("What's the weather in Tokyo?")) {
  // Handle agent events: text_delta, tool_call_start, tool_call_end, etc.
}
```

---

## For developers

```bash
git clone https://github.com/KenKaiii/gg-framework.git
cd gg-framework
pnpm install
pnpm build
```

Stack: TypeScript 5.9 + pnpm workspaces + Ink 6 + React 19 + Vitest 4 + Zod v4

---

## Community

- [YouTube @kenkaidoesai](https://youtube.com/@kenkaidoesai) — tutorials and demos
- [Skool community](https://skool.com/kenkai) — come hang out

---

## License

MIT

---

<p align="center">
  <strong>A coding agent that authenticates like an app, not a script.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@kenkaiiii/ggcoder"><img src="https://img.shields.io/badge/Install-npm%20i%20--g%20%40kenkaiiii%2Fggcoder-blue?style=for-the-badge" alt="Install"></a>
</p>
