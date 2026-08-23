---
title: 官方閱讀清單與版本策略
---

# 官方閱讀清單與版本策略

Codex 與 DeepSeek Harness 都演進很快。這份清單按「架構價值」排序，而不是按文件導航排序。

## 第一層：先理解 Harness

### Codex：Unrolling the Codex agent loop

https://openai.com/index/unrolling-the-codex-agent-loop/

建議看：

- prompt assembly；
- Responses API request；
- tools；
- stream；
- tool output append；
- prefix caching；
- turn termination。

### Codex：Unlocking the Codex harness / App Server

https://openai.com/index/unlocking-the-codex-harness/

建議看：

- 為什麼從 TUI-centric runtime 抽出 App Server；
- App Server、MCP server、exec、SDK 的定位差異；
- Thread / Turn / Item；
- client-friendly integration boundary。

### DeepSeek Harness：官方總覽

https://deepseek.com/harness/en/

建議先看：

- Everything is a Plugin；
- Cordis kernel；
- traceable Session；
- Standard / Code / Minimal / Creator Mode；
- developer-preview status。

## 第二層：Codex 公開使用介面

- Codex CLI: https://learn.chatgpt.com/docs/codex/cli
- Non-interactive: https://learn.chatgpt.com/docs/non-interactive-mode
- Codex SDK: https://learn.chatgpt.com/docs/codex-sdk
- App Server: https://learn.chatgpt.com/docs/app-server

## 第三層：Codex Configuration / Agent Environment

- Config basics: https://learn.chatgpt.com/docs/config-file/config-basic
- Config reference: https://learn.chatgpt.com/docs/config-file/config-reference
- AGENTS.md: https://learn.chatgpt.com/docs/agent-configuration/agents-md
- Rules: https://learn.chatgpt.com/docs/agent-configuration/rules
- Subagents: https://learn.chatgpt.com/docs/agent-configuration/subagents

## 第四層：Codex Extension / Security

- MCP: https://learn.chatgpt.com/docs/extend/mcp
- Skills: https://learn.chatgpt.com/docs/build-skills
- Hooks: https://learn.chatgpt.com/docs/hooks
- Sandboxing: https://learn.chatgpt.com/docs/sandboxing
- Permissions: https://learn.chatgpt.com/docs/permissions
- Git worktrees: https://learn.chatgpt.com/docs/environments/git-worktrees

## 第五層：DeepSeek Harness Architecture

### Architecture

https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md

這是 DeepSeek Harness 最重要的文件。重點：

- Cordis；
- plugin tree；
- core service map；
- Profiles / Bundles；
- Session / Turn / Step；
- event taxonomy；
- capability seams；
- where new behavior goes。

### Core subsystem

https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/core.md

重點：

- SessionEvent log；
- Agent interface；
- default Agent Loop；
- model-visible facts 如何回寫 log；
- lifecycle / ownership。

### Subsystems index

https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/README.md

適合當 DeepSeek source tour 的入口。

### Code Mode implementation note

https://github.com/deepseek-ai/deepseek-harness/blob/master/.agents/notes/implemented/feature/2026-06-15-code-mode.md

重點：

- native / code / both Tool presentation；
- generated SDK；
- `run_code` transport；
- Code Runtime capability seam；
- 為什麼要減少中間 Tool round trip。

## 第六層：Source

### Codex

- Repository: https://github.com/openai/codex
- Rust workspace: https://github.com/openai/codex/tree/main/codex-rs
- Core: https://github.com/openai/codex/tree/main/codex-rs/core
- Model provider registry: https://github.com/openai/codex/blob/main/codex-rs/model-provider-info/src/lib.rs
- App Server README: https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md
- Protocol README: https://github.com/openai/codex/blob/main/codex-rs/protocol/README.md

### DeepSeek Harness

- Repository: https://github.com/deepseek-ai/deepseek-harness
- Architecture: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md
- Core subsystem: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/core.md
- Default Agent Loop: https://github.com/deepseek-ai/deepseek-harness/tree/master/packages/core/agent-loop

## 文件與 Source 衝突時怎麼辦

### Codex 使用方式

Public docs 優先。Source 中未公開 / experimental API 不應被當成穩定 contract。

### DeepSeek Harness

目前官方仍標示 developer preview，所以：

```text
architecture principle
通常比
具體 package/config key
更值得長期記住
```

若 README / architecture / main source 不一致，以當前 source 與最新官方 architecture 說明交叉核對，並把 API 寫成版本敏感。

### 架構理解

Source 很重要，但要區分 implementation detail 與 architecture principle。

### 歷史文章與 Design Notes

它們非常適合理解「為什麼這樣設計」，但描述的 transition state 可能已被後續 refactor 推進，所以要用現在的 source 核對結果。

## 建議核對日期

每次重大更新本教材時，在 `intro.md` 更新：

```text
最後核對：YYYY-MM-DD
```

### Codex 至少重查

1. App Server lifecycle / API；
2. custom model provider / model discovery；
3. config precedence；
4. sandbox / permission model；
5. Skills / Plugins / Hooks；
6. subagents；
7. Rust workspace members。

### DeepSeek Harness 至少重查

1. developer-preview / release status；
2. Architecture service map；
3. SessionEvent schema / persistence；
4. Agent Loop interface；
5. Code Mode；
6. Profiles / Bundles；
7. sandbox / filesystem / subprocess capability seams；
8. Remote API / UI integration。

這比把所有版本號與內部 package 名稱寫死在正文更耐維護。
