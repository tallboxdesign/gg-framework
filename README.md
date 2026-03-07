# ggcoder

<p align="center">
  <strong>The fast, lean coding agent. Four providers. Zero bloat.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@kenkaiiii/ggcoder"><img src="https://img.shields.io/npm/v/@kenkaiiii/ggcoder?style=for-the-badge" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="MIT License"></a>
  <a href="https://youtube.com/@kenkaidoesai"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube"></a>
  <a href="https://skool.com/kenkai"><img src="https://img.shields.io/badge/Skool-Community-7C3AED?style=for-the-badge" alt="Skool"></a>
</p>

I built ggcoder because I got tired of waiting. Claude Code is a great product, but it carries an enormous system prompt that eats tokens and slows everything down. The Claude Agent SDK has the same problem — it's essentially Claude Code under the hood. Every turn starts with thousands of tokens of instructions the model mostly ignores.

So I stripped it all out. ggcoder's system prompt is ~90 lines of what actually matters. The result is a coding agent that responds noticeably faster, burns fewer tokens per turn, and gets out of your way.

---

## Why this is different

### It's actually fast
The biggest bottleneck in coding agents isn't the model — it's how much context you shove into every request. Claude Code's system prompt alone is thousands of tokens. ggcoder cuts that down to the essentials. Less input = faster time-to-first-token, fewer wasted tokens, lower cost per turn.

### Four providers, one interface
Not just Anthropic. Not just OpenAI. ggcoder supports **Claude** (Opus, Sonnet, Haiku), **GPT** (GPT-4.1, o3, o4-mini), **GLM** (GLM-5, GLM-4.7), and **Kimi** (K2.5). Switch between them mid-conversation with `/model`. Same tools, same UI, different brain. Use whatever model fits the task.

### OAuth for Anthropic & OpenAI, API keys for GLM & Moonshot
No `.env` files for Claude and GPT — log in with OAuth once and it handles token refresh automatically. GLM and Moonshot use straightforward API keys. Either way, you're coding in under 30 seconds.

### Open-source and composable
The whole stack is three npm packages you can use independently. Want just the unified streaming API? Install `@kenkaiiii/gg-ai`. Need an agent loop for your own app? `@kenkaiiii/gg-agent`. Or use the full CLI. Everything is MIT licensed and available on npm.

---

## Getting started

```bash
npm i -g @kenkaiiii/ggcoder
```

1. Run `ggcoder login`
2. Pick your provider
3. Authenticate
4. Start coding with `ggcoder`

That's it.

---

## Usage

```bash
# Interactive mode
ggcoder

# Ask a question directly
ggcoder "fix the failing tests in src/utils"

# Use a different provider
ggcoder -p moonshot

# Switch models mid-session
/model claude-opus-4-6
/model gpt-4.1
/model kimi-k2.5

# Manage sessions
/session list
/session load my-feature
/new

# Get help
/help
```

---

## Supported models

| Provider | Models | Auth |
|---|---|---|
| **Anthropic** | Claude Opus 4.6, Sonnet 4.6, Haiku 4.5 | OAuth |
| **OpenAI** | GPT-4.1, o3, o4-mini | OAuth |
| **Z.AI (GLM)** | GLM-5, GLM-4.7 | API key |
| **Moonshot** | Kimi K2.5 | API key |

---

## The packages

The CLI is built on two standalone libraries. Use them separately if you want.

| Package | What it does |
|---|---|
| [`@kenkaiiii/gg-ai`](https://www.npmjs.com/package/@kenkaiiii/gg-ai) | Unified streaming API across all four providers. One interface, provider differences handled internally. |
| [`@kenkaiiii/gg-agent`](https://www.npmjs.com/package/@kenkaiiii/gg-agent) | Agent loop with multi-turn tool execution, Zod-validated parameters, error recovery. |
| [`@kenkaiiii/ggcoder`](https://www.npmjs.com/package/@kenkaiiii/ggcoder) | Full CLI — tools, sessions, UI, OAuth, the works. |

### Quick example — streaming API

```typescript
import { stream } from "@kenkaiiii/gg-ai";

for await (const event of stream({
  provider: "anthropic",
  model: "claude-sonnet-4-6",
  messages: [{ role: "user", content: "Hello!" }],
})) {
  if (event.type === "text_delta") process.stdout.write(event.text);
}
```

### Quick example — agent loop

```typescript
import { Agent } from "@kenkaiiii/gg-agent";
import { z } from "zod";

const agent = new Agent({
  provider: "moonshot",
  model: "kimi-k2.5",
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
  // text_delta, tool_call_start, tool_call_end, agent_done, etc.
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
  <strong>Less bloat. More coding. Four providers. One agent.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@kenkaiiii/ggcoder"><img src="https://img.shields.io/badge/Install-npm%20i%20--g%20%40kenkaiiii%2Fggcoder-blue?style=for-the-badge" alt="Install"></a>
</p>
