---
title: 架構維度逐項比較：Codex、DeepSeek Harness、Pi
---

# 架構維度逐項比較：Codex、DeepSeek Harness、Pi

這一頁只做一件事：用同一組 architecture dimensions，逐項比較三套 Harness。

前一頁已經建立比較框架；這裡不再重複「哪個比較好」，而是回答：

> **同一個責任，在三套系統裡分別被放在哪一層？**

## 先看總表

| 維度 | Codex | DeepSeek Harness | Pi |
|---|---|---|---|
| Runtime center | `codex-core` + protocol / App Server | Cordis + Service contracts | `pi-agent-core` + `AgentSession` |
| Model | Provider registry | LLM capability seam | `pi-ai` multi-provider runtime |
| Agent Loop | product runtime 主幹 | replaceable service | low-level Agent loop + AgentSession lifecycle |
| State | Thread / Turn / Item | SessionEvent / projection | JSONL Entry Tree |
| Tool | integrated coding runtime | Tool service + pipeline + Code Mode / Workflow | minimal built-ins + extension registration |
| Extension | Skills / MCP / Hooks / Rules / Subagents | Plugin / Provider / Consumer / Events | TS Extensions / Skills / Packages |
| Security | productized sandbox / approval | formal replaceable sandbox / approval | Project Trust + external isolation ownership |
| Integration | CLI / exec / SDK / App Server | Web / SDK / JSON-RPC / ACP / Typert | TUI / Print / JSON / RPC / SDK |
| 採用者主要負擔 | integration / policy customization | composition / compatibility | workflow / policy / sandbox governance |

## 1. Runtime Center：系統的重心在哪裡？

### Codex

Codex 有明確 runtime center：

```text
Client Surface
→ App Server / CLI / SDK
→ codex-core
→ Model / Tools / State / Security
```

使用者通常是在一個已成形的 Runtime 上調整 config、接 extension、接 client。

優點是 product semantics 完整、integration boundary 清楚；代價是底層 responsibility 不會全部被視為可替換 composition unit。

### DeepSeek Harness

中心更像 composition kernel：

```text
Cordis
→ Service Definition
→ Provider
→ Consumer
→ Profile / Bundle composition
```

很多通常會被寫死在 runtime core 的責任，在這裡本身就是 provider seam。

### Pi

Pi 把低階 Agent 與 Coding Agent lifecycle 分開：

```text
pi-ai
→ pi-agent-core
→ AgentSession
→ TUI / RPC / SDK / Extensions
```

它不是把所有東西 plugin 化，而是盡量讓 core 小，把很多產品行為留在 AgentSession、extension 與外部 environment。

## 2. Model / Provider：三套都不是單一模型綁定

### Codex

Codex 有 model provider registry，也能配置 custom provider。

真正要注意的是不同 first-party surface 對 provider discovery、model catalog、OpenAI-specific semantics 的整合成熟度可能不同。

### DeepSeek Harness

LLM adapter 本身就是 capability seam：

```text
Agent Loop
→ LLM Service
→ Provider / Adapter
```

如果 model routing 是更大 Runtime Composition 的一部分，這種設計很自然。

### Pi

`pi-ai` 直接把 multi-provider 做成一級 runtime abstraction，產品 UX 也直接支援切換 provider / model。

| 需求 | 較自然的方向 |
|---|---|
| 成熟 Coding Runtime，偶爾換 provider | Codex |
| Model Adapter 是 Runtime Composition 的一部分 | DeepSeek |
| Multi-provider 本身就是日常 Agent UX | Pi |

## 3. Agent Loop：固定主幹、可替換 seam，還是小型 low-level loop？

### Codex

核心是成熟 iterative coding loop：

```text
Context
→ Model
→ Tool Call
→ Execute
→ Append Result
→ Next Model Request
```

State、approval、sandbox、tool execution 都深度圍繞這條主幹。

### DeepSeek Harness

預設也有 Agent Loop，但 loop 本身位於 service boundary。

因此「同一個 Model，換不同 Agent Loop」或替換 runtime mode，架構阻力較低。

### Pi

`pi-agent-core` 提供 stateful Agent 與 tool execution；`AgentSession` 再加上：

```text
session
compaction
resource loading
extensions
coding lifecycle
```

所以 coding behavior 並不全部塞進 low-level loop。

## 4. State：三套最值得並讀的地方

### Codex：Thread / Turn / Item

```text
Thread
└─ Turn
   └─ Item
```

這種 model 很適合 product UI：message、tool、diff、approval 都能自然表示成 activity。

### DeepSeek：Event-sourced Session

```text
Session
→ append-only SessionEvents
→ Projection / Context / Replay
```

這很適合：

```text
audit
replay
projection
query
runtime correctness
```

### Pi：JSONL Entry Tree

```text
Session JSONL
→ Entry(id, parentId)
→ branch / fork / resume
```

Branch 不是額外附加功能，而是 persisted format 本身就有 lineage。

| 主要需求 | 最直接的 state abstraction |
|---|---|
| Rich product activity | Codex |
| Replay / event-derived state | DeepSeek |
| Conversation branching / lineage | Pi |

## 5. Tools 與 Orchestration

### Codex

偏向完整 Coding Agent execution runtime：

```text
shell
file edits
MCP
approval
sandbox
process lifecycle
```

重點是整體產品整合。

### DeepSeek Harness

Tool 不只是 registry，還有完整 pipeline：

```text
tool/call
→ pre-execute
→ approval / guard
→ execute
→ post-execute
→ tool/result
```

另外還有 Code Mode、Workflow、Jobs 等不同 orchestration 方式。

### Pi

預設 coding tools 很小：

```text
read
write
edit
bash
```

其他能力再透過 Extension / SDK 注入。

三套其實在回答不同問題：

```text
Codex
→ 怎麼把 Coding Tool Runtime 做成熟？

DeepSeek
→ Tool / executor / policy 怎麼成為可替換 pipeline？

Pi
→ 最小工具集合到哪裡就夠？其他能力能否留給 extension？
```

## 6. Extension Boundary：新增需求應該放在哪裡？

### Codex：用途先分類

```text
AGENTS.md → Repo knowledge / guidance
Skill     → Workflow / SOP
MCP       → External capability
Hook      → Lifecycle interception
Rule      → Enforcement
Subagent  → Delegation
App Server→ Client integration
```

優點是產品語意清楚。

### DeepSeek：底層機制一致

```text
Plugin
Service Definition
Provider
Consumer
Typed Events
Profile / Bundle
```

Skills、Subagents、Workflow、Hooks、Extensions 都能放進同一套 composition mental model。

### Pi：Extension API 很寬

TypeScript Extension 可以直接碰：

```text
tools
events
commands
UI
context
compaction
session entries
providers
```

優點是 core 小、實驗快；代價是 governance responsibility 也更容易落到自己身上。

## 7. Security：最不能壓成一個分數的維度

### Codex

Security 是 productized runtime 的核心組成：

```text
sandbox
approval
workspace boundary
exec / network policy
client UX
```

### DeepSeek Harness

Security 是 formal capability architecture：

```text
Sandbox Service
Approval Service
Permission Presets
Credentials
Guards / Invariants
Platform Providers
```

優勢是 enforcement / interaction backend 本身更容易替換。

### Pi

Project Trust 主要控制的是「要不要載入 project-local resources」，不是 process sandbox。

強隔離通常需要：

```text
container
microVM
OpenShell
remote worker
其他 sandbox
```

| 問題 | Codex | DeepSeek | Pi |
|---|---|---|---|
| Built-in security UX | 強 | 有 | 少 |
| Enforcement backend replaceability | 中高 | 高 | 主要在外層 |
| 外部 isolation ownership | 可搭配 | 很自然 | 通常是必要設計題 |
| 採用者要自己設計多少 policy | 較少 | 中等 | 較多 |

## 8. Integration Boundary：自製 Client 要接哪裡？

### Codex

```text
Your UI
↕
App Server
↕
Codex Runtime
```

App Server 是非常清楚的 Rich Client boundary。

### DeepSeek Harness

```text
Web Host / Client
SDK
stdio JSON-RPC
ACP
Typert
In-process Cordis APIs
```

不同 transport / UI 本身也能成為 composition 的一部分。

### Pi

```text
Node.js App
↕
AgentSession SDK

或

Any Language Client
↕ JSONL RPC
Pi process
```

Pi 很適合「把 Agent 當 library 嵌入」的思路。

## 9. Subagent / Delegation

### Codex

Subagent / collaboration 是 first-party product capability，適合希望 delegation semantics 由 Runtime 提供的團隊。

### DeepSeek Harness

Delegation 是 formal provider seam，可以替換 subagent backend 或 delegation strategy。

### Pi

官方刻意不提供 canonical built-in subagent abstraction；可用 SDK、extension、multiple processes 或外部 orchestrator 自己定義。

因此這一題真正比較的是：

> **你希望 delegation semantics 由 upstream 定義，還是由 platform team 定義？**

## 10. Production 與 Governance：技術彈性最後會變成維護成本

### Codex

通常得到：

```text
較多 first-party runtime behavior
較完整 Coding Agent UX
較低 protocol / security UX 自建成本
```

### DeepSeek Harness

主要 adoption risk 在：

```text
project-level compatibility churn
plugin / profile composition compatibility
更多 runtime infrastructure ownership
```

但已有不少 production-oriented subsystem 與 stable package APIs。

### Pi

最大的誤解是把「minimal」理解成「導入成本一定最低」。

Pi 的 core 小，但若你需要 enterprise-grade policy、sandbox、extension governance、multi-agent conventions，這些責任會回到自己的 platform layer。

## 11. 同一個 Tool Call，三套路徑有什麼不同？

### Codex

```text
Model
→ Tool Router
→ Policy / Approval
→ Executor / Sandbox
→ Item / Result
→ next model request
```

### DeepSeek Harness

```text
Model
→ Tool Registry
→ pre-execute
→ Approval / Guard
→ Provider Execute
→ post-execute
→ SessionEvent
→ next Step
```

### Pi

```text
Model
→ AgentTool
→ Extension interception
→ Tool execute
→ Agent state
→ SessionManager persistence
→ next model request
```

同樣是 Tool Call，三套把「policy、execution、state」切在不同 boundary。

## 12. 同一次 Resume，三套也不一樣

### Codex

```text
Thread Store / rollout
→ rebuild Thread context
→ continue Turn
```

### DeepSeek Harness

```text
SessionEvent persistence
→ projection / message reconstruction
→ resume Session
```

### Pi

```text
SessionManager
→ read JSONL tree
→ choose active branch
→ buildSessionContext
→ AgentSession
```

這就是為什麼 State Model 不只是 storage implementation detail。

## 13. 一張 Responsibility Matrix

| Responsibility | Codex | DeepSeek Harness | Pi |
|---|---|---|---|
| Product workflow | Runtime first-party | Profile / plugins 組成 | Extensions / external workflow |
| Runtime composition | 較固定 | 核心能力 | 輕量 factory / resource wiring |
| Model abstraction | Provider registry | service seam | first-class multi-provider |
| State projection | Thread / Item APIs | event projections | branch context build |
| Approval | first-party | formal service | optional extension / external policy |
| Sandbox | first-party | formal provider | external environment |
| Client contract | App Server | 多種 integration surface | SDK / JSONL RPC |
| Delegation | first-party | provider seam | 自行定義 |

## 14. 怎麼讀這張比較表？

不要把每一欄換算成總分。

應該做的是：

```text
列出你的關鍵 responsibility
→ 找出你想讓 upstream 擁有的部分
→ 找出你願意自己維護的部分
→ 再看哪套 boundary 最接近
```

例如你很重視可替換 Sandbox，但不想自己設計 approval UX：DeepSeek 可能很有吸引力。

如果你想直接得到完整 Coding Agent security UX：Codex 更自然。

如果你本來就有自己的 container platform，只想嵌一個小 Agent runtime：Pi 反而可能最乾淨。

## 下一步

架構差異看完後，下一頁把這些差異映射到具體產品情境：

[情境式選型：什麼時候選 Codex、DeepSeek Harness 或 Pi？](./scenario-selection.md)
