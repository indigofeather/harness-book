---
title: 官方閱讀清單與版本策略
---

# 官方閱讀清單與版本策略

Codex 演進速度快。這份清單按「架構價值」排序，而不是按文件導航排序。

## 第一層：先理解 Harness

### Unrolling the Codex agent loop

https://openai.com/index/unrolling-the-codex-agent-loop/

建議看：

- prompt assembly；
- Responses API request；
- tools；
- SSE stream；
- tool output append；
- prefix caching；
- turn termination。

### Unlocking the Codex harness: App Server

https://openai.com/index/unlocking-the-codex-harness/

建議看：

- 為什麼從 TUI-centric runtime 抽出 App Server；
- App Server、MCP server、exec、SDK 的定位差異；
- JSON-RPC-lite 的設計取捨。

## 第二層：公開使用介面

- Codex CLI: https://learn.chatgpt.com/docs/codex/cli
- Non-interactive: https://learn.chatgpt.com/docs/non-interactive-mode
- Codex SDK: https://learn.chatgpt.com/docs/codex-sdk
- App Server: https://learn.chatgpt.com/docs/app-server

## 第三層：Configuration / Agent Environment

- Config basics: https://learn.chatgpt.com/docs/config-file/config-basic
- Config reference: https://learn.chatgpt.com/docs/config-file/config-reference
- AGENTS.md: https://learn.chatgpt.com/docs/agent-configuration/agents-md
- Rules: https://learn.chatgpt.com/docs/agent-configuration/rules
- Subagents: https://learn.chatgpt.com/docs/agent-configuration/subagents

## 第四層：Extension

- MCP: https://learn.chatgpt.com/docs/extend/mcp
- Skills: https://learn.chatgpt.com/docs/build-skills
- Hooks: https://learn.chatgpt.com/docs/hooks

## 第五層：Security / Environment

- Sandboxing: https://learn.chatgpt.com/docs/sandboxing
- Permissions: https://learn.chatgpt.com/docs/permissions
- Git worktrees: https://learn.chatgpt.com/docs/environments/git-worktrees
- GitHub Action: https://learn.chatgpt.com/docs/github-action

## 第六層：Source

- Repository: https://github.com/openai/codex
- Rust workspace: https://github.com/openai/codex/tree/main/codex-rs
- Core: https://github.com/openai/codex/tree/main/codex-rs/core
- App Server README: https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md
- Protocol README: https://github.com/openai/codex/blob/main/codex-rs/protocol/README.md

## 文件與 Source 衝突時怎麼辦

### 使用方式

以官方 public docs 為優先。Source 中未公開/experimental API 不應被當成穩定 contract。

### 架構理解

以當前 source 為準，但要區分 implementation detail 與 architecture principle。

### 歷史文章

工程文章說明「為什麼這樣設計」很有價值，但描述的 transition state 可能已被後續 refactor 推進。因此要用 source 核對「現在在哪一步」。

## 建議核對日期

每次重大更新本教材時，在 `intro.md` 更新：

```text
最後核對：YYYY-MM-DD
```

並至少重查：

1. App Server lifecycle/API；
2. config precedence；
3. sandbox/permission model；
4. Skills/Plugins；
5. subagents；
6. Rust workspace members。

這比把每個版本號寫死在正文更耐維護。
