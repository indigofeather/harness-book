# Agent Harness 深度指南

一個以繁體中文撰寫的 Docusaurus 教材專案，先用 OpenAI Codex 建立完整 Coding Agent Harness 心智模型，再加入 DeepSeek Harness 作為第二套架構 case study，最後從 Runtime Core、Model Provider、Agent Loop、State、Tool Orchestration、Sandbox、Extension System 與 Production Maturity 等面向逐項比較。

> 本專案不是 OpenAI 或 DeepSeek 官方教材。內容以 OpenAI / DeepSeek 官方文件、工程文章，以及 `openai/codex`、`deepseek-ai/deepseek-harness` 開源原始碼交叉核對；最後系統性核對日期為 2026-08-23。

## 內容

### Harness 基礎

- Model / Agent / Harness 的責任邊界
- Agent Loop 與 Think → Act → Observe
- Context、Prompt Caching、Compaction
- Tool、Environment、Policy、State

### Codex Harness

- Thread / Turn / Item lifecycle
- `codex-core` 與 Rust workspace 架構
- App Server / Protocol / Event Stream
- Model Provider / Streaming / Retry
- Tool Execution / MCP / Hooks
- State / Rollout / Persistence
- Sandbox / Approvals / Permissions / Rules / Network
- Config / AGENTS.md / Skills / Plugins
- Subagents / Git Worktrees
- CLI / `codex exec` / SDK / App Server / GitHub Actions
- Production Workflow 與自製 Harness Architecture

### DeepSeek Harness

- Cordis 與 Everything is a Plugin
- Service / Provider / Consumer / Capability Seam
- Session / Turn / Step / SessionEvent
- Event-sourced State、Resume、Fork、Replay
- Standard / Code / Minimal / Creator Mode
- Code Mode 與 TypeScript Tool Orchestration
- Replaceable Model / Loop / Sandbox / Storage / UI

### Codex vs DeepSeek

- Runtime Center 與 Composition Philosophy
- Custom Model Provider 與 Multi-model Orchestration
- Agent Loop 可替換性
- Thread / Turn / Item vs SessionEvent
- Tool Calling vs Code Mode
- Security / Execution Backend
- App / IDE Integration
- Production Maturity
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
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/core.md

## License / attribution

教材為整理與解說性內容；引用之外部產品名稱、原始碼與文件各自依其原始授權與條款。`openai/codex` repository 為 Apache-2.0；`deepseek-ai/deepseek-harness` 為 MIT（均請以 upstream 當前 LICENSE 為準）。
