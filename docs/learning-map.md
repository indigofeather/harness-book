---
sidebar_position: 2
title: 學習地圖：先建立全局觀
---

# 學習地圖：先建立全局觀

如果你第一次接觸 Agent Harness，不需要先懂 Rust、TypeScript、Responses API、MCP、JSON-RPC、Cordis 或 Pi Extensions。

先記住一件事：

> **Model 只是負責判斷的一部分；Harness 才把模型連到 Tools、Environment、Policy 與 State。**

這份教材現在用三套開源實作建立全局觀：

```text
Codex
→ 完整、opinionated 的 Coding Agent Runtime

DeepSeek Harness
→ Runtime responsibility 可重組的 Plugin / Capability Framework

Pi
→ Minimal、self-extensible 的 Coding Harness
```

三套不是互斥品牌，而是三種不同的架構答案。

## 最簡單的 Harness 模型

假設你對 Agent 說：

> 幫我找出登入失敗的原因，修好它，然後跑測試。

真正發生的事情比較像：

```mermaid
flowchart LR
  U[你\n提出任務] --> H[Harness\n控制與協調]
  H --> M[Model\n判斷下一步]
  M --> H
  H --> T[Tools\n讀檔、搜尋、Shell、API]
  T --> E[Environment\nRepo、OS、網路、外部服務]
  E --> T
  T --> H
  H --> M
  H --> U
```

| 元件 | 直覺角色 | 主要工作 |
|---|---|---|
| Model | 大腦 | 理解、推理、選擇下一步 |
| Harness | 控制中心 | 組 Context、驅動 Loop、執行 Tool、保存狀態 |
| Tools | 手與感官 | Read、Search、Shell、Patch、MCP / API |
| Environment | 工作現場 | Repository、OS、Network、External Services |
| Policy / Sandbox | 門禁 | 決定 Action 能不能真正執行 |
| State | 工作筆記 | 保存已做過什麼、目前做到哪裡 |

## 所有 Agent 都在反覆三件事

```mermaid
flowchart LR
  A[Think\n現在該做什麼？] --> B[Act\n執行 Action / Tool]
  B --> C[Observe\n取得真實結果]
  C --> A
```

後面的 Agent Loop、Context、Tool Runtime、Sandbox、Session、Thread / Turn / Item、SessionEvent、JSONL Tree，本質上都在回答：

> **如何把 Think → Act → Observe 做到 production-grade？**

## 教材現在有五個主要區塊

```mermaid
flowchart LR
  G[① Harness 基礎概念] --> C[② Codex\nProductized Runtime]
  C --> D[③ DeepSeek\nComposable Runtime]
  D --> P[④ Pi\nMinimal Runtime]
  P --> X[⑤ 三方比較與選型]
```

## 第一階段：先建立共同語言

先理解：

- Model vs Agent vs Harness；
- Agent Loop；
- Context；
- Tool Call；
- Policy / Sandbox；
- State / Persistence。

這些概念不屬於任何單一產品。

## 第二階段：用 Codex 看完整 Production Runtime

Codex 很適合用來學：

```text
codex-core
App Server
Thread / Turn / Item
Model Provider
Tool Execution
Sandbox / Approval
Skills / MCP / Hooks / Rules
```

它代表：

> **核心 Runtime 有明確中心，再提供高階 extension surfaces。**

## 第三階段：用 DeepSeek 看 Runtime Composition

DeepSeek Harness 很適合用來學：

```text
Cordis
Everything is a Plugin
Service / Provider / Consumer
SessionEvent
Capability Seam
Replaceable Agent Loop
Code Mode
Profiles / Bundles
```

它代表：

> **Runtime 本身就是可以重新組合的 Plugin Tree。**

## 第四階段：用 Pi 看 Minimal Harness

Pi 很適合用來學：

```text
pi-ai
pi-agent-core
AgentSession
SessionManager
JSONL Tree
ResourceLoader
TypeScript Extensions
RPC / SDK
Project Trust
External Sandbox
```

它代表：

> **不是所有常見 Agent feature 都必須內建在 core。**

Pi 特別適合拿來問：

```text
最小 Agent Runtime 需要什麼？
哪些 behavior 應該交給 extension？
哪些 security responsibility 應該留在外部 execution environment？
```

## 第五階段：再做真正比較

不要只問「哪個比較強」，而比較：

```text
穩定中心是什麼？
Model 怎麼替換？
Loop 能不能替換？
State 怎麼建模？
Tool 如何 orchestrate？
Sandbox / Execution backend 怎麼抽象？
Extension boundary 有多深？
UI / Client 怎麼整合？
Production responsibility 由誰承擔？
```

## 三套 Harness 的第一張對照圖

### Codex：明確 Runtime Core

```mermaid
flowchart TB
  C[codex-core]
  C --> M[Model Provider]
  C --> T[Tools / MCP]
  C --> S[State]
  C --> P[Sandbox / Policy]
  E[Skills / Hooks / Rules / Subagents] --> C
  UI[CLI / IDE / App Server] --> C
```

### DeepSeek：Plugin Composition

```mermaid
flowchart TB
  K[Cordis]
  K --> M[Model Plugin]
  K --> L[Loop Plugin]
  K --> T[Tool Plugin]
  K --> S[Session Plugin]
  K --> SB[Sandbox Plugin]
  K --> ST[Storage Plugin]
  K --> UI[UI Plugin]
```

### Pi：Minimal Core + Deep Extensions

```mermaid
flowchart TB
  AI[pi-ai\nModels / Providers]
  AC[pi-agent-core\nAgent / Tool Loop]
  AS[AgentSession\nCoding Runtime]
  R[ResourceLoader]
  E[Extensions / Skills / Packages]
  X[External OS / Container / Sandbox]

  AS --> AC
  AC --> AI
  R --> AS
  E --> R
  AS --> X
```

現在不需要判斷哪一張比較好，只要先看懂：

> **三套把「固定、可替換、移出 core」的邊界畫在不同地方。**

## State Model 是最好的並讀入口

### Codex

```text
Thread
└─ Turn
   └─ Item
```

### DeepSeek

```text
Session
→ SessionEvents
→ Projection / Context / Replay
```

### Pi

```text
Session JSONL
→ Entry(id, parentId)
→ Tree / Branch
```

這三種 abstraction 都合理，但服務的產品目標不同。

## Security Model 也完全不同

### Codex

```text
Sandbox / Approval / Policy
→ Runtime 核心產品能力
```

### DeepSeek

```text
Sandbox / Approval / Credentials
→ Formal capability seams
```

### Pi

```text
Project Trust
→ 控制 resource loading

OS / Container / Sandbox
→ 真正 execution isolation
```

Pi 官方明確提醒：**Project Trust 不是 sandbox。**

## 三種閱讀深度

### Level 1：第一次理解 Agent

建議：

1. [導論](./intro.md)
2. [什麼是 Harness？](./foundations/what-is-harness.md)
3. [Agent Loop](./foundations/agent-loop.md)
4. [三種 Agent Harness：Codex、DeepSeek、Pi](./comparison/three-harnesses.md)

先懂圖與概念，不必讀原始碼。

### Level 2：工程師 / Agent 重度使用者

先完整讀 Codex，再讀：

- [DeepSeek Harness：先建立正確心智模型](./deepseek/overview.md)
- [Pi Agent Harness：先建立正確心智模型](./pi/overview.md)
- [Pi Session、Compaction 與 Extensions](./pi/session-and-extensions.md)
- [三種 Harness 選型指南](./comparison/three-way-selection-guide.md)

你會開始理解同一個 Harness 問題可以有完全不同 architectural answer。

### Level 3：Agent / Platform 架構設計者

除了 App Server、State、Security，也重點讀：

- [`openai/codex` 原始碼導讀地圖](./reference/source-map.md)
- [`deepseek-ai/deepseek-harness` 原始碼導讀地圖](./reference/deepseek-source-map.md)
- [`earendil-works/pi` 原始碼導讀地圖](./reference/pi-source-map.md)
- [三套 Harness 原始碼導讀入口](./reference/source-reading.md)

這一層的目標不是「會使用三套工具」，而是能自己回答：

> **如果我要做新的 Agent Platform，哪些 abstraction 值得固定、哪些值得做 seam、哪些應該移出 core？**

## 後面所有名詞都可以放進六層模型

```mermaid
flowchart TB
  L1[① Client\n人、CLI、IDE、CI、自製 UI]
  L2[② Harness / Runtime\n協調整個 Agent 工作流程]
  L3[③ Model\n理解、推理、決策]
  L4[④ Tools / Capabilities\nShell、File、MCP、Search...]
  L5[⑤ Environment\nOS、Repo、Network、External Services]
  L6[⑥ State & Policy\nHistory、Events、Permissions、Sandbox]

  L1 <--> L2
  L2 <--> L3
  L2 <--> L4
  L4 <--> L5
  L2 <--> L6
```

遇到陌生名詞時先問：

> **它是在做 Decision、Capability、Execution、Enforcement、State，還是 Integration？**

通常就不會迷路。

## 你現在只需要記住七句話

1. **Model 是推理元件，Harness 是完整控制與執行系統。**
2. **Agent 的核心是 Think → Act → Observe。**
3. **Tool Call 是行動提案，不等於行動已經成功。**
4. **Sandbox / Permission 是 capability boundary，不一定必須由同一層實作。**
5. **Codex 強調完整、opinionated 的 Coding Agent Runtime。**
6. **DeepSeek Harness 強調 Runtime 本身的 Plugin Composition。**
7. **Pi 強調 Minimal Core 與深度 Self-extension。**

帶著這七句話往下讀，就能把三套系統看成「同一問題的不同解法」，而不是三堆孤立 API。
