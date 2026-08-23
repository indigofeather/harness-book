# Codex Harness 深度指南

一個以繁體中文撰寫的 Docusaurus 教材專案，系統化拆解 OpenAI Codex harness：從 agent loop、context orchestration、`codex-core`、App Server、tool execution、state/persistence，到 sandbox、permissions、AGENTS.md、Skills、MCP、Hooks、Subagents、Worktrees、CI 與自製 harness。

> 本專案不是 OpenAI 官方教材。內容以 OpenAI 官方 Codex 文件、工程文章與 `openai/codex` 開源原始碼交叉核對；最後系統性核對日期為 2026-08-23。

## 內容

- Harness 與 model 的責任邊界
- Agent loop 與 Responses API/tool-call loop
- Context、prompt caching、compaction
- Thread / Turn / Item lifecycle
- `codex-core` 與 Rust workspace 架構
- App Server / JSON-RPC-lite / event stream
- Model provider / streaming / retry
- Tool execution / MCP / hooks
- State / rollout / persistence
- Sandbox / approvals / permission profiles / rules / network
- Config / AGENTS.md / Skills / Plugins
- Subagents / Git worktrees
- CLI / `codex exec` / SDK / App Server / GitHub Actions
- Production workflow 與自製 harness architecture
- 實戰 Labs 與 source map

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

- https://openai.com/index/unrolling-the-codex-agent-loop/
- https://openai.com/index/unlocking-the-codex-harness/
- https://learn.chatgpt.com/docs/codex
- https://learn.chatgpt.com/docs/app-server
- https://github.com/openai/codex

## License / attribution

教材為整理與解說性內容；引用之外部產品名稱、原始碼與文件各自依其原始授權與條款。`openai/codex` repository 為 Apache-2.0（請以 upstream 當前 LICENSE 為準）。
