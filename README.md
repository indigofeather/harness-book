# Agent Harness 深度指南

一個以繁體中文撰寫的 Docusaurus 教材專案，用 **OpenAI Codex** 與 **DeepSeek Harness** 兩套實作系統化理解 Agent Harness：先建立共同的 Model / Loop / Tool / State / Policy 心智模型，再分別深入兩邊的架構、使用、擴充、安全、整合與原始碼，最後用相同維度比較設計取捨。

> 本專案不是 OpenAI 或 DeepSeek 官方教材。內容以官方文件、工程文章，以及 `openai/codex`、`deepseek-ai/deepseek-harness` 開源原始碼交叉核對；最後系統性核對日期為 2026-08-23。

## 教材原則

兩套 Harness 採 **對稱覆蓋**，避免把其中一套當主角、另一套只當附錄。核心問題都會盡量從兩邊回答：

```text
Runtime 怎麼拆？
Model 怎麼接？
Agent Loop 怎麼跑？
State 怎麼保存與重建？
Tools 怎麼註冊與執行？
怎麼擴充？
Sandbox / Approval 怎麼做？
怎麼實際啟動與設定？
怎麼嵌入自製 Client？
Production correctness 怎麼驗證？
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
- Sandbox、full / partial enforcement、Approval、Permission Presets、Credentials
- Web Host / Client、TypeScript SDK、stdio JSON-RPC、ACP、Typert
- Invariants、Replay、Test Support、Telemetry、Session Query
- `deepseek-ai/deepseek-harness` 原始碼導讀地圖

### Codex vs DeepSeek

- Runtime Center 與 Composition Philosophy
- Custom Model Provider 與 Multi-model / Multi-runtime Orchestration
- Agent Loop 可替換性
- Thread / Turn / Item vs Session / Turn / Step / SessionEvent
- Iterative Tool Calling vs Code Mode / Workflow
- Extension semantics vs Plugin / Capability Seam
- Sandbox / Approval / Credential architecture
- App Server vs SDK / JSON-RPC / ACP / Host / Client
- Production Maturity 與 API Stability
- Harness 技術選型指南

## Local development

需要 Node.js 20+。

```bash
npm install
npm start
```

Build：

```bash
npm run typecheck
npm run build
```

## Deployment

本專案以 Vercel 直接部署。Docusaurus 使用根路徑 `/`，站點 URL 會優先讀取 Vercel 提供的 `VERCEL_PROJECT_PRODUCTION_URL`，preview deployment 則可使用 `VERCEL_URL`。

Vercel 建議設定：

```text
Build Command: npm run build
Output Directory: build
```

## 主要來源

### Codex

- https://openai.com/index/unrolling-the-codex-agent-loop/
- https://openai.com/index/unlocking-the-codex-harness/
- https://learn.chatgpt.com/docs/codex
- https://learn.chatgpt.com/docs/app-server
- https://github.com/openai/codex

### DeepSeek Harness

- https://deepseek.com/harness/en/
- https://github.com/deepseek-ai/deepseek-harness
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/README.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/README.md

## License / attribution

教材為整理與解說性內容；引用之外部產品名稱、原始碼與文件各自依其原始授權與條款。`openai/codex` repository 為 Apache-2.0；`deepseek-ai/deepseek-harness` 為 MIT（均請以 upstream 當前 LICENSE 為準）。
