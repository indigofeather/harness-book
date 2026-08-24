---
title: 官方閱讀清單與版本策略
---

# 官方閱讀清單與版本策略

Codex、DeepSeek Harness 與 Pi 都演進很快。這份清單按「架構價值」排序，並盡量讓三套都覆蓋：

```text
架構
使用
Model / Loop
State
擴充
Security
Integration
Source
```

## 第一層：先理解三套 Harness 的定位

### Codex

- [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- [Unlocking the Codex harness / App Server](https://openai.com/index/unlocking-the-codex-harness/)
- [Codex documentation](https://learn.chatgpt.com/docs/codex)

重點：prompt assembly、Responses request、tools、stream、tool output append、prefix caching、Thread / Turn / Item、App Server。

### DeepSeek Harness

- [DeepSeek Harness 官方總覽](https://deepseek.com/harness/en/)
- [Architecture](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md)
- [`packages/README.md`](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/README.md)

重點：Everything is a Plugin、Cordis、Profiles / Bundles、Service / Provider / Consumer、Session Log、Capability Seams。

### Pi

- [Pi 官方網站](https://pi.dev/)
- [Pi Documentation](https://pi.dev/docs/latest)
- [`earendil-works/pi`](https://github.com/earendil-works/pi)
- [Coding Agent README](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md)

重點：minimal terminal coding harness、`pi-ai`、`pi-agent-core`、`AgentSession`、Extensions、四種 run mode，以及刻意不內建的 features。

## 第二層：實際使用 / Boot / Runtime Composition

### Codex

- CLI: https://learn.chatgpt.com/docs/codex/cli
- Non-interactive: https://learn.chatgpt.com/docs/non-interactive-mode
- SDK: https://learn.chatgpt.com/docs/codex-sdk
- App Server: https://learn.chatgpt.com/docs/app-server
- Config: https://learn.chatgpt.com/docs/config-file/config-reference

### DeepSeek Harness

- README: https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md
- Architecture: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md
- Packages map: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/README.md
- Base bundle: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/bundle/base/README.md

實際 boot 建議搭配：

```bash
dsh --profile web --dump-config
```

### Pi

- Usage: https://pi.dev/docs/latest/usage
- Settings: https://pi.dev/docs/latest/settings
- SDK: https://pi.dev/docs/latest/sdk
- Coding Agent README: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md

Pi 的 boot 心智模型建議從：

```text
createAgentSession()
→ ModelRuntime
→ SettingsManager
→ SessionManager
→ ResourceLoader
→ Agent
→ AgentSession
```

開始讀。

## 第三層：Model / Agent Loop

### Codex

- Agent loop article: https://openai.com/index/unrolling-the-codex-agent-loop/
- Core: https://github.com/openai/codex/tree/main/codex-rs/core
- Model provider registry: https://github.com/openai/codex/blob/main/codex-rs/model-provider-info/src/lib.rs

### DeepSeek Harness

- Core: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/core.md
- LLM streaming: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/llm-streaming.md
- System prompt: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/system-prompt.md

### Pi

- `pi-agent-core`: https://github.com/earendil-works/pi/blob/main/packages/agent/README.md
- `pi-ai` Models: https://github.com/earendil-works/pi/blob/main/packages/ai/src/models.ts
- `pi-ai` types: https://github.com/earendil-works/pi/blob/main/packages/ai/src/types.ts
- `AgentSession`: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/agent-session.ts
- SDK composition: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/sdk.ts

Pi 特別值得分清：

```text
Provider
→ vendor / auth / model catalog / stream ownership

API implementation
→ reusable protocol behavior
```

## 第四層：State / Persistence / Compaction

### Codex

重點讀 Thread / Rollout / Thread Store 與 App Server lifecycle。

### DeepSeek Harness

- Session: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session.md
- Persistence: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/persistence.md
- Session Projection: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session-projection.md
- Session Query: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session-query.md

### Pi

- Sessions: https://pi.dev/docs/latest/sessions
- Session Format: https://pi.dev/docs/latest/session-format
- Compaction: https://pi.dev/docs/latest/compaction
- `SessionManager`: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/session-manager.ts

Pi 的核心 state invariant 是：

```text
Session Entry
→ id / parentId
→ Tree / Branch
```

這和 DeepSeek event sourcing、Codex Thread / Turn / Item 是三種不同 state design。

## 第五層：Extension / Skills / Subagents

### Codex

- AGENTS.md: https://learn.chatgpt.com/docs/agent-configuration/agents-md
- Rules: https://learn.chatgpt.com/docs/agent-configuration/rules
- Subagents: https://learn.chatgpt.com/docs/agent-configuration/subagents
- MCP: https://learn.chatgpt.com/docs/extend/mcp
- Skills: https://learn.chatgpt.com/docs/build-skills
- Hooks: https://learn.chatgpt.com/docs/hooks

### DeepSeek Harness

- Skills: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/skills.md
- Subagents: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/subagent.md
- Workflow: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/workflow.md
- Extensions: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/extensions.md

### Pi

- Extensions: https://pi.dev/docs/latest/extensions
- Pi docs customization index: https://pi.dev/docs/latest
- `ResourceLoader`: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/resource-loader.ts
- Extensions source: https://github.com/earendil-works/pi/tree/main/packages/coding-agent/src/core/extensions

Pi 要特別注意官方刻意不提供 canonical built-in：

```text
MCP
Subagents
Plan mode
Permission popups
Built-in todos
Background bash
```

這些是 design choice，不是「做不到」。

## 第六層：Security / Execution

### Codex

- Sandboxing: https://learn.chatgpt.com/docs/sandboxing
- Permissions: https://learn.chatgpt.com/docs/permissions
- Git worktrees: https://learn.chatgpt.com/docs/environments/git-worktrees

### DeepSeek Harness

- Sandbox: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/sandbox.md
- Approval: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/approval.md
- Permission Presets: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/permission-presets.md
- Credentials: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/credentials.md

### Pi

- Security: https://pi.dev/docs/latest/security
- Settings / Project Trust: https://pi.dev/docs/latest/settings
- Repo permission / containerization overview: https://github.com/earendil-works/pi

Pi 必須牢記：

```text
Project Trust
≠
Sandbox
```

Pi 預設沿用啟動它的 OS user permissions；強 isolation 應放到 Docker、microVM、OpenShell 或其他外部 execution environment。

## 第七層：Integration / Client Surface

### Codex

- App Server: https://learn.chatgpt.com/docs/app-server
- App Server source: https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md
- Protocol: https://github.com/openai/codex/blob/main/codex-rs/protocol/README.md

### DeepSeek Harness

- SDK: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/sdk/README.md
- ACP: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/acp/README.md
- Typert: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/typert.md
- Web server: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/web-server.md

### Pi

- SDK: https://pi.dev/docs/latest/sdk
- RPC: https://pi.dev/docs/latest/rpc
- `sdk.ts`: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/sdk.ts
- Coding Agent modes: https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md

Pi integration surface：

```text
Interactive TUI
Print / JSON
RPC over stdin/stdout JSONL
SDK
```

## 第八層：Production Correctness / Tests

### Codex

搭配 core tests、protocol schemas、App Server contracts 與官方 engineering articles。

### DeepSeek Harness

- Invariants: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/invariants.md
- Session Telemetry: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session-telemetry.md
- Package release expectations: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/README.md

### Pi

Pi provider layer有大量：

```text
stream
abort
context overflow
tool-call-without-result
cross-provider handoff
```

等測試；另外應搭配 session / compaction / extension lifecycle tests 閱讀。

Repo：

https://github.com/earendil-works/pi

## 第九層：Source Maps

教材內建三張 source map：

- [`openai/codex` 原始碼導讀地圖](./source-map.md)
- [`deepseek-ai/deepseek-harness` 原始碼導讀地圖](./deepseek-source-map.md)
- [`earendil-works/pi` 原始碼導讀地圖](./pi-source-map.md)
- [三套 Harness 原始碼導讀入口](./source-reading.md)

## 文件與 Source 衝突時怎麼辦？

### Codex

Public docs 優先判定公開使用 contract；source 用來理解 implementation 與實驗能力。

### DeepSeek Harness

同時看：

```text
Top-level project status
Package-level release expectation
Current source / generated subsystem docs
```

因為整體 Developer Preview 與部分 stable packages 可以同時成立。

### Pi

優先順序：

```text
pi.dev latest docs
→ current main source
→ package README / tests
```

Pi 目前改動很活躍，特別是 Models / Provider、AgentSession runtime、extension API 與 session behavior，不宜把主分支內部細節當永久 contract。

## 每次重大更新至少重查

### Codex

1. App Server lifecycle / API；
2. model provider / discovery；
3. config precedence；
4. sandbox / permission；
5. Skills / Plugins / Hooks；
6. subagents；
7. Rust workspace members。

### DeepSeek Harness

1. project release status；
2. package release expectations；
3. Architecture service map；
4. Profiles / Bundles；
5. SessionEvent / persistence / projection；
6. Agent Loop / LLM adapter；
7. Skills / Subagents / Extensions；
8. Sandbox / Approval / Credentials；
9. SDK / ACP / Host / Client；
10. Code Mode / Workflow / Invariants。

### Pi

1. package names / repo migration；
2. `pi-ai` Provider / Models contract；
3. `pi-agent-core` Agent state / events；
4. `AgentSession` responsibilities；
5. Session format version / migration；
6. compaction / branch summarization；
7. ResourceLoader / project trust；
8. ExtensionAPI / event lifecycle；
9. SDK / RPC protocol；
10. security / containerization guidance。

這比把 package 名稱、版本號或 feature list 當永久事實更耐維護。
