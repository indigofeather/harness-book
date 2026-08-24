---
title: earendil-works/pi 原始碼導讀地圖
---

# `earendil-works/pi` 原始碼導讀地圖

> 最後核對：2026-08-24。Pi repo 目前主線 package 名稱使用 `@earendil-works/*`。

這份地圖不是 package catalog，而是回答：

> **如果我想理解 Pi 的某個 responsibility，第一個該看哪裡？**

Pi 最有效的讀法不是從 CLI main function 一路往下，而是先分清楚三層：

```text
pi-ai
→ Model / Provider / Streaming

pi-agent-core
→ Agent state / Tool execution / Event loop

pi-coding-agent
→ AgentSession / SessionManager / Resources / Extensions / UI modes
```

## 1. 先看 repo 根目錄

### `README.md`

先確認專案定位：

```text
Pi Agent Harness
pi-ai
pi-agent-core
pi-coding-agent
pi-tui
```

也先讀它對 permissions / containerization 的明確聲明，避免把 Project Trust 誤認成 sandbox。

### `packages/coding-agent/README.md`

這是理解 Pi product philosophy 最重要的文件之一。

重點看：

```text
minimal terminal coding harness
Extensions
Skills
Prompt Templates
Themes
Pi Packages
Interactive / Print / JSON / RPC / SDK
```

以及官方刻意不內建的能力。

## 2. Model / Provider：`packages/ai/`

### 先讀

```text
packages/ai/src/models.ts
```

這裡可以看見 Provider / Models runtime 的主要 contract。

要回答：

```text
Provider 怎麼定義？
Auth 怎麼 resolve？
Model catalog 怎麼 refresh？
stream() 怎麼 dispatch？
```

### 再讀

```text
packages/ai/src/types.ts
packages/ai/src/providers/
packages/ai/src/api/
```

Pi 有一個很值得學的分離：

```text
Provider
→ vendor / auth / models / runtime ownership

API implementation
→ reusable streaming protocol behavior
```

### 新增 Provider 時

Repo 自己的 skill 也提供很好的 reading path：

```text
.pi/skills/add-llm-provider.md
```

它會把你帶到：

```text
providers/
register-builtins.ts
env-api-keys.ts
generate-models.ts
coding-agent model resolver
provider display names
provider tests
```

## 3. 最小 Agent Runtime：`packages/agent/`

### `packages/agent/README.md`

官方定位：

```text
Stateful agent
Tool execution
Event streaming
Built on pi-ai
```

如果你只想理解「不含 Coding Agent product behavior 的 Agent Loop」，先在這一層停留。

### 讀 source 時找

```text
Agent
AgentState
AgentEvent
AgentTool
stream function
message queue / steering / follow-up
```

這裡回答：

> **最小 stateful agent engine 到底負責什麼？**

## 4. Coding Runtime 中心：`agent-session.ts`

最重要檔案：

```text
packages/coding-agent/src/core/agent-session.ts
```

source comment 已直接說它是 interactive / print / RPC 共用 abstraction。

建議先看 class header 與 constructor dependencies：

```text
Agent
SessionManager
SettingsManager
ResourceLoader
ModelRuntime
Tool definitions
ExtensionRunner
cwd
```

接著追：

```text
prompt
agent event handling
tool refresh
model switching
compaction
branch navigation
bash execution
extension lifecycle
```

讀 Pi 時，`AgentSession` 比 CLI entry point 更值得當 runtime center。

## 5. Session / Persistence：`session-manager.ts`

```text
packages/coding-agent/src/core/session-manager.ts
```

重點先找 entry types：

```text
SessionHeader
SessionEntry
SessionMessageEntry
CompactionEntry
BranchSummaryEntry
ModelChangeEntry
ThinkingLevelChangeEntry
CustomEntry
```

然後找：

```text
id / parentId
getBranch()
buildSessionContext()
append...
parse / migrate
list / open / continue
```

核心問題是：

> **目前 active branch 怎麼從 JSONL tree 被投影成 model context？**

## 6. Compaction / Branch Summarization

官方文件已直接列出主要 source：

```text
packages/coding-agent/src/core/compaction/compaction.ts
packages/coding-agent/src/core/compaction/branch-summarization.ts
packages/coding-agent/src/core/compaction/utils.ts
packages/coding-agent/src/core/session-manager.ts
```

讀法：

```text
何時 compact？
cut point 怎麼選？
summary 存在哪？
branch switch 怎麼保留舊路徑知識？
extension 怎麼 intercept？
```

## 7. SDK Composition：`sdk.ts`

```text
packages/coding-agent/src/core/sdk.ts
```

這是 trace boot sequence 的最佳入口之一。

先找：

```text
createAgentSession()
```

並依序追：

```text
cwd / agentDir
→ ModelRuntime
→ SettingsManager
→ SessionManager
→ ResourceLoader
→ existing session restore
→ model resolution
→ Agent
→ AgentSession
```

如果你想嵌入 Pi，不要只讀 CLI；`sdk.ts` 才是正式 programmatic composition boundary。

## 8. Runtime Replacement / cwd-bound Services

再看：

```text
packages/coding-agent/src/core/agent-session-services.ts
packages/coding-agent/src/core/agent-session-runtime.ts
```

這裡把：

```text
create services
create session from services
replace active session
rebuild cwd-bound state
```

拆開。

這對 `/new`、`/resume`、`/fork`、cwd switch 與 custom embedding 很重要。

## 9. ModelRuntime

```text
packages/coding-agent/src/core/model-runtime.ts
```

它是 coding-agent 對 `pi-ai` Models / auth / model catalog 的 facade。

追：

```text
provider registration
auth store
models.json
model refresh
extension provider registration
```

若你要理解 `/login`、`/model`、custom provider，這裡是中樞。

## 10. Resource Loading

```text
packages/coding-agent/src/core/resource-loader.ts
```

要理解 Pi 為什麼能保持 minimal，這個檔案非常重要。

追它如何發現：

```text
Extensions
Skills
Prompts
Themes
AGENTS.md
Project resources
Global resources
Packages
```

並特別看 project trust 對 resource discovery 的影響。

## 11. Extensions

主要入口：

```text
packages/coding-agent/src/core/extensions/
```

先找：

```text
ExtensionAPI
ExtensionContext
ExtensionRunner
Event types
registerTool
registerCommand
registerProvider
appendEntry
```

再對照官方 [Extensions docs](https://pi.dev/docs/latest/extensions)。

最值得 trace 的三條路：

### Tool Gate

```text
model tool call
→ extension tool_call event
→ block / allow
→ tool execute
```

### Custom Tool

```text
extension factory
→ registerTool()
→ AgentSession tool registry
→ model-visible tool
```

### Durable Extension State

```text
appendEntry()
→ SessionManager
→ JSONL custom entry
→ resume
```

## 12. Built-in Tools

```text
packages/coding-agent/src/core/tools/
```

重點：

```text
read
write
edit
bash
grep
find
ls
```

不要只讀 execute function，也看 tool factory 如何綁定 cwd / operations。

尤其 `bash` 要分清楚：

```text
Tool schema
Bash operations
spawn lifecycle
extension hook
OS process boundary
```

## 13. System Prompt / Context Files

找：

```text
packages/coding-agent/src/core/system-prompt.ts
packages/coding-agent/src/core/resource-loader.ts
AGENTS.md loading
Skills formatting
Prompt Templates
```

Pi 的 context assembly 會把 builtin system prompt 與 project/global resources 組起來。

## 14. Interactive Mode

如果你要理解 TUI：

```text
packages/coding-agent/src/modes/interactive/
packages/tui/
```

但建議最後才讀。

先理解 `AgentSession`，再看 UI 如何訂閱 events、呼叫 commands、切 session。

## 15. RPC Mode

```text
packages/coding-agent/src/modes/rpc/
```

官方文件特別建議：

```text
Node / TypeScript
→ 優先 AgentSession SDK

Other language / subprocess
→ RPC
```

追：

```text
stdin JSONL command
→ rpc command handler
→ AgentSession
→ Agent events
→ stdout JSONL
```

如果要自製 IDE / daemon，這是重要 integration boundary。

## 16. Project Trust

安全文件：

```text
packages/coding-agent/docs/security.md
```

以及 settings / trust store code。

先問：

```text
哪些 project resources 需要 trust？
interactive / non-interactive 行為差在哪？
defaultProjectTrust 怎麼套用？
trust decision 存在哪？
```

最重要的 invariant：

> **Project Trust controls resource loading; it is not execution sandboxing.**

## 17. Containerization / Isolation

看：

```text
packages/coding-agent/docs/containerization.md
```

理解三種 pattern：

```text
Gondolin
Docker
OpenShell
```

Pi 的 source reading 到這裡才算把 security boundary 看完整，因為 isolation 不是只在 core source 裡。

## 18. Tests

Pi 的 provider layer 有大量 cross-provider tests；Agent core 也有 harness tests。

讀測試時優先看：

```text
provider streaming
abort
context overflow
tool-call-without-result
cross-provider handoff
session migration
branching
compaction
extension lifecycle
```

測試往往比 README 更能揭露真正 contract。

## 19. 一次完整 Prompt 怎麼追？

推薦練習：

```text
createAgentSession()
→ AgentSession.prompt()
→ pi-agent-core Agent
→ ModelRuntime
→ pi-ai Provider.stream()
→ model emits tool call
→ extension interception
→ AgentTool execute
→ tool result appended
→ next model request
→ SessionManager persistence
```

這條 trace 幾乎串起 Pi 所有重要層。

## 20. 一次 Resume 怎麼追？

```text
SessionManager.open / continueRecent
→ parse JSONL
→ select active branch
→ buildSessionContext()
→ restore model / thinking metadata
→ createAgentSession()
→ Agent state messages
→ AgentSession
```

## 21. 一次 Branch Switch 怎麼追？

```text
current entry
→ tree navigation
→ branch summarization（必要時）
→ parent/child lineage
→ rebuild active context
→ continue prompt
```

這是 Pi 最值得和 Codex / DeepSeek 並讀的練習。

## 22. Source Reading 原則

Codex 最適合先問：

```text
這個 responsibility 屬於哪個 crate / core module？
```

DeepSeek 最適合問：

```text
Service Definition / Provider / Consumer / Composition 在哪？
```

Pi 最適合問：

```text
這個 behavior 位於哪一層？

pi-ai？
pi-agent-core？
AgentSession？
Resource / Extension？
還是 external environment？
```

這就是 Pi 的 responsibility boundary。

## 建議閱讀順序

```text
README.md
→ packages/coding-agent/README.md
→ packages/agent/README.md
→ packages/ai/src/models.ts
→ packages/coding-agent/src/core/sdk.ts
→ agent-session.ts
→ session-manager.ts
→ compaction/
→ resource-loader.ts
→ extensions/
→ tools/
→ model-runtime.ts
→ modes/rpc/
→ security / containerization docs
```

## 官方入口

- [`earendil-works/pi`](https://github.com/earendil-works/pi)
- [Pi docs](https://pi.dev/docs/latest)
- [`AgentSession`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/agent-session.ts)
- [`sdk.ts`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/sdk.ts)
- [`pi-ai` Models](https://github.com/earendil-works/pi/blob/main/packages/ai/src/models.ts)
- [Sessions](https://pi.dev/docs/latest/sessions)
- [Extensions](https://pi.dev/docs/latest/extensions)
- [Security](https://pi.dev/docs/latest/security)
