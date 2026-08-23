---
title: 官方閱讀清單與版本策略
---

# 官方閱讀清單與版本策略

Codex 與 DeepSeek Harness 都演進很快。這份清單按「架構價值」排序，並刻意讓兩邊都覆蓋架構、使用、擴充、安全、整合與原始碼，而不是只替其中一邊列完整資料。

## 第一層：先理解 Harness

### Codex：Unrolling the Codex agent loop

https://openai.com/index/unrolling-the-codex-agent-loop/

重點：prompt assembly、Responses request、tools、stream、tool output append、prefix caching、turn termination。

### Codex：Unlocking the Codex harness / App Server

https://openai.com/index/unlocking-the-codex-harness/

重點：從 TUI-centric runtime 抽出 App Server、Thread / Turn / Item、client integration boundary。

### DeepSeek Harness：官方總覽

https://deepseek.com/harness/en/

重點：Everything is a Plugin、Cordis、traceable Session、Standard / Code / Minimal / Creator Mode。

### DeepSeek Harness：Architecture

https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md

這是 DeepSeek 最重要的架構文件。重點：Profiles / Bundles、Service Map、Turn / Step flow、Session Log、Capability Seams、where new behavior goes。

## 第二層：實際使用與 Composition

### Codex

- CLI: https://learn.chatgpt.com/docs/codex/cli
- Non-interactive: https://learn.chatgpt.com/docs/non-interactive-mode
- SDK: https://learn.chatgpt.com/docs/codex-sdk
- App Server: https://learn.chatgpt.com/docs/app-server
- Config basics: https://learn.chatgpt.com/docs/config-file/config-basic
- Config reference: https://learn.chatgpt.com/docs/config-file/config-reference

### DeepSeek Harness

- Top-level README: https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md
- Architecture / Profiles: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md
- Packages map: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/README.md
- Base bundle: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/bundle/base/README.md

閱讀 DeepSeek 時特別記住：

```bash
dsh --profile web --dump-config
```

它比只看 package tree 更能回答「現在實際 boot 哪一棵 Plugin Tree」。

## 第三層：Agent State / Loop / Model

### Codex

- Agent loop engineering article: https://openai.com/index/unrolling-the-codex-agent-loop/
- Core: https://github.com/openai/codex/tree/main/codex-rs/core
- Model provider registry: https://github.com/openai/codex/blob/main/codex-rs/model-provider-info/src/lib.rs

### DeepSeek Harness

- Core subsystem: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/core.md
- Session: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session.md
- Persistence: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/persistence.md
- LLM streaming: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/llm-streaming.md
- System prompt: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/system-prompt.md

## 第四層：Extension / Skills / Subagents

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
- Extension cookbook: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cookbook/extension-cookbook.md

## 第五層：Security / Execution

### Codex

- Sandboxing: https://learn.chatgpt.com/docs/sandboxing
- Permissions: https://learn.chatgpt.com/docs/permissions
- Git worktrees: https://learn.chatgpt.com/docs/environments/git-worktrees

### DeepSeek Harness

- Sandbox: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/sandbox.md
- Approval: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/approval.md
- Permission Presets: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/permission-presets.md
- Credentials: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/credentials.md
- Filesystem: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/filesystem.md
- Subprocess: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/subprocess.md

## 第六層：Integration / Client Surface

### Codex

- App Server docs: https://learn.chatgpt.com/docs/app-server
- App Server source README: https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md
- Protocol README: https://github.com/openai/codex/blob/main/codex-rs/protocol/README.md

### DeepSeek Harness

- SDK: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/sdk/README.md
- ACP: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/acp/README.md
- Typert subsystem: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/typert.md
- Web server: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/web-server.md
- Client modules: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/client-modules.md

## 第七層：Code Mode / Workflow Experiment

### DeepSeek Code Mode

- Code Runtime: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/code-runtime.md
- Code Mode design note: https://github.com/deepseek-ai/deepseek-harness/blob/master/.agents/notes/implemented/feature/2026-06-15-code-mode.md

重點：native / code tool presentation、generated SDK、Code Runtime seam、降低中間 Tool round trip。

## 第八層：Production Correctness / Operations

### DeepSeek Harness

- Invariants: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/invariants.md
- Session Query: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session-query.md
- Session Projection: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session-projection.md
- Session Telemetry: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session-telemetry.md
- Package release expectations: https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/README.md

Codex 的 production correctness 則應搭配 core tests、protocol schemas、App Server contract 與官方 product docs / engineering articles 閱讀。

## 第九層：Source Maps

教材內建兩張對稱導讀：

- [`openai/codex` 原始碼導讀地圖](./source-map.md)
- [`deepseek-ai/deepseek-harness` 原始碼導讀地圖](./deepseek-source-map.md)
- [雙 Harness 原始碼導讀入口](./source-reading.md)

### Codex Source

- Repository: https://github.com/openai/codex
- Rust workspace: https://github.com/openai/codex/tree/main/codex-rs
- Core: https://github.com/openai/codex/tree/main/codex-rs/core

### DeepSeek Source

- Repository: https://github.com/deepseek-ai/deepseek-harness
- Packages: https://github.com/deepseek-ai/deepseek-harness/tree/master/packages
- Subsystems: https://github.com/deepseek-ai/deepseek-harness/tree/master/docs/subsystems
- Module graph: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/module-graph.md

## 文件與 Source 衝突時怎麼辦

### Codex

Public docs 優先判定公開使用 contract；source 用來理解當前 implementation 與實驗功能。

### DeepSeek Harness

同時看三層：

```text
Top-level project status
Package-level release expectation
Current source / generated subsystem docs
```

因為「整體 Developer Preview」與「部分 packages 標 stable API」可以同時成立。

### 歷史文章 / Design Notes

適合理解「為什麼這樣設計」，但必須用當前 source 核對 transition 是否已完成。

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

1. developer-preview / release status；
2. `packages/README.md` release expectations；
3. Architecture service map；
4. Profiles / Bundles；
5. SessionEvent / persistence / projection；
6. Agent Loop / LLM adapter；
7. Skills / Subagents / Extensions；
8. Sandbox / Approval / Credentials；
9. SDK / ACP / Host / Client；
10. Code Mode / Workflow / Invariants。

這比把 package 名稱或版本號當永久事實更耐維護。
