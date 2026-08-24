# Agent Harness 深度指南

一個以繁體中文撰寫的 Docusaurus 教材專案，用 **OpenAI Codex**、**DeepSeek Harness** 與 **Pi Agent Harness** 三套開源實作系統化理解 Agent Harness：先建立共同的 Model / Loop / Tool / State / Policy 心智模型，再分別深入三套架構、使用、擴充、安全、整合與原始碼，最後用相同維度比較設計取捨。

> 本專案不是 OpenAI、DeepSeek 或 Pi 官方教材。內容以官方文件、工程文章，以及 `openai/codex`、`deepseek-ai/deepseek-harness`、`earendil-works/pi` 開源原始碼交叉核對；最後系統性核對日期為 2026-08-24。

## 網站能力

- 繁體中文單語教材，Sidebar 同時作為網站與 LLM 輸出的 canonical reading order
- 支援明暗模式與 Mermaid 架構圖
- Mermaid 圖表可開啟獨立檢視與縮放
- 每頁可複製或查看原始 Markdown，也可直接帶入 ChatGPT、Claude、Perplexity 或 Gemini
- Build 會產生 `llms.txt`、`llms-full.txt` 與逐頁 Markdown
- Sidebar 提供 AI / LLM 資源入口

## 教材核心觀點

三套 Harness 代表三種不同 design philosophy：

```text
Codex
→ Productized / Opinionated Runtime

DeepSeek Harness
→ Composable Runtime Framework

Pi
→ Minimal / Self-extensible Harness
```

因此教材不把任何一套當成「標準答案」，而用同一組問題並讀：

```text
Runtime 怎麼拆？
Model 怎麼接？
Agent Loop 怎麼跑？
State 怎麼保存與重建？
Tools 怎麼註冊與執行？
怎麼擴充？
Sandbox / Approval / Trust 怎麼做？
怎麼實際啟動與設定？
怎麼嵌入自製 Client？
Production responsibility 誰承擔？
原始碼該從哪裡讀？
```

## 內容

### Harness 基礎

- Model / Agent / Harness 的責任邊界
- Agent Loop 與 Think → Act → Observe
- Context、Prompt Caching、Compaction
- Tool、Environment、Policy、State
- Thread / Turn / Item 等 Agent lifecycle primitives

### Codex Harness

- `codex-core` 與 Rust workspace 架構
- Agent Loop、Context、Model Provider / Streaming
- Thread / Turn / Item、Rollout、Persistence
- Tool Execution、Shell、MCP
- Sandbox、Approvals、Permissions、Rules、Network
- Config、AGENTS.md、Skills、Plugins、Hooks
- Subagents、Git Worktrees
- CLI、`codex exec`、SDK、App Server、GitHub Actions
- Production Workflow 與自製 Harness Architecture
- `openai/codex` 原始碼導讀地圖

### DeepSeek Harness

- Cordis 與 Everything is a Plugin
- Service Definition / Provider / Consumer / Capability Seam
- Profiles、Bundles、`cordis.patch.yml` 與 Plugin Tree
- LLM Adapter、Agent Loop、Turn / Step
- SessionEvent、Persistence、Projection、Replay、Fork
- Skills、Subagents、Workflow、Jobs、Hooks、Extensions
- Standard / Code / Minimal / Creator Mode
- Code Mode 與 TypeScript Tool Orchestration
- Sandbox、Approval、Permission Presets、Credentials
- Web Host / Client、TypeScript SDK、stdio JSON-RPC、ACP、Typert
- Invariants、Replay、Test Support、Telemetry、Session Query
- `deepseek-ai/deepseek-harness` 原始碼導讀地圖

### Pi Agent Harness

- `pi-ai`：multi-provider Models / Provider / Streaming
- `pi-agent-core`：stateful Agent、Tool Execution、Event Streaming
- `AgentSession`：Coding Agent lifecycle center
- `SessionManager`：JSONL tree、`id / parentId`、branch / fork / resume
- Compaction 與 Branch Summarization
- `ResourceLoader`、Skills、Prompt Templates、Themes
- TypeScript Extensions、Tool interception、custom UI、durable extension state
- Interactive / Print / JSON / RPC / SDK 四種 run mode
- Project Trust 與 resource-loading boundary
- 外部 container / microVM / sandbox isolation philosophy
- `earendil-works/pi` 原始碼導讀地圖

### 三種 Harness 比較

- Productized Runtime vs Composable Framework vs Minimal Harness
- Custom Model Provider / Multi-provider
- Agent Loop 固定程度
- Thread / Turn / Item vs SessionEvent vs JSONL Entry Tree
- Tool orchestration 與 extension boundary
- Built-in Subagent vs provider seam vs no canonical built-in abstraction
- Sandbox / Approval / Project Trust / external isolation
- App Server vs SDK / ACP / Host vs AgentSession SDK / JSONL RPC
- Production responsibility 與 governance burden
- 三方技術選型指南

## 一張最短對照表

| 面向 | Codex | DeepSeek Harness | Pi |
|---|---|---|---|
| 核心定位 | 完整 Coding Runtime | Composable Runtime Framework | Minimal Coding Harness |
| Runtime center | `codex-core` | Cordis composition | `Agent` + `AgentSession` |
| State | Thread / Turn / Item | Event-sourced Session | JSONL Entry Tree |
| Extension | Skills / MCP / Hooks / Rules | Plugin / Service / Provider | TS Extensions / Skills / Packages |
| Security | built-in、產品化 | formal、可替換 | Project Trust + external isolation |
| Integration | CLI / SDK / App Server | SDK / JSON-RPC / ACP / Host | TUI / Print / JSON / RPC / SDK |

## Local development

需要 Node.js 20+ 與 Bun。

```bash
bun install
bun run start
```

檢查與 Build：

```bash
bun run typecheck
bun run build
```

## Deployment

本專案以 Vercel 直接部署。Docusaurus 使用根路徑 `/`，站點 URL 會優先讀取 Vercel 提供的 `VERCEL_PROJECT_PRODUCTION_URL`，preview deployment 則可使用 `VERCEL_URL`。

Vercel 建議設定：

```text
Install Command: bun install
Build Command: bun run build
Output Directory: build
```

## 主要來源

### Codex

- https://openai.com/index/unrolling-the-codex-agent-loop/
- https://openai.com/index/unlocking-the-codex-harness/
- https://learn.chatgpt.com/docs/codex
- https://github.com/openai/codex

### DeepSeek Harness

- https://deepseek.com/harness/en/
- https://github.com/deepseek-ai/deepseek-harness
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/README.md

### Pi

- https://pi.dev/
- https://pi.dev/docs/latest
- https://github.com/earendil-works/pi
- https://pi.dev/docs/latest/extensions
- https://pi.dev/docs/latest/sessions
- https://pi.dev/docs/latest/security

## License / attribution

教材為整理與解說性內容；引用之外部產品名稱、原始碼與文件各自依其原始授權與條款。`openai/codex` repository 為 Apache-2.0；`deepseek-ai/deepseek-harness` 與 `earendil-works/pi` 為 MIT（均請以 upstream 當前 LICENSE 為準）。

製作者：[Lance He](mailto:indigofeather@gmail.com)
