---
title: 完整教材目錄
---

# 完整教材目錄

這一頁是《Agent Harness 深度指南》的完整索引。Sidebar 與 `llms.txt` / `llms-full.txt` 會使用同一份 canonical reading order。

如果第一次閱讀，建議先看 [學習地圖](./learning-map.md)。

## 一、Agent Harness 基礎

- [什麼是 Harness？](./foundations/what-is-harness.md)
- [Agent Loop：Think → Act → Observe](./foundations/agent-loop.md)
- [Context、Caching 與 Compaction](./foundations/context-and-caching.md)
- [State Models 與 Lifecycle：Codex、DeepSeek、Pi](./foundations/thread-turn-item.md)

## 二、Codex｜Productized Runtime 完整導讀

### 架構與 Runtime

- [系統架構總覽](./architecture/system-map.md)
- [官方介面與 App Server 視角](./architecture/official-visuals.md)
- [`codex-core`](./architecture/codex-core.md)
- [Model Provider 與 Streaming](./architecture/model-provider-and-streaming.md)
- [Tool Execution](./architecture/tool-execution.md)
- [State 與 Persistence](./architecture/state-and-persistence.md)
- [App Server 與 Protocol](./architecture/app-server-and-protocol.md)
- [Client Surfaces](./architecture/client-surfaces.md)

### Security / Trust

- [Sandbox 與 Approvals](./security/sandbox-and-approvals.md)
- [Permissions、Rules 與 Network](./security/permissions-rules-network.md)
- [Trust Boundaries](./security/trust-boundaries.md)

### Customization / Extensions

- [Config](./customization/config.md)
- [AGENTS.md](./customization/agents-md.md)
- [Skills 與 Plugins](./customization/skills-and-plugins.md)
- [MCP](./customization/mcp.md)
- [Hooks](./customization/hooks.md)
- [Subagents 與 Worktrees](./customization/subagents-and-worktrees.md)

### Usage / Integration

- [Codex CLI](./usage/cli.md)
- [Non-interactive / CI](./usage/noninteractive-ci.md)
- [SDK](./usage/sdk.md)
- [App Server](./usage/app-server.md)
- [GitHub Actions](./usage/github-actions.md)

## 三、DeepSeek Harness｜Composable Runtime 完整導讀

### 架構與 Runtime

- [完整導讀](./deepseek/overview.md)
- [官方 Lifecycle / Tool Pipeline](./deepseek/official-visuals.md)
- [Cordis 與 Everything-is-a-Plugin](./deepseek/architecture.md)
- [Model Adapter 與 Agent Loop](./deepseek/model-and-agent-loop.md)
- [Tool Execution Pipeline](./deepseek/tool-execution.md)
- [Context、System Prompt 與 Compaction](./deepseek/context-and-compaction.md)
- [Session 與 Events](./deepseek/session-and-events.md)
- [Profiles、Bundles 與啟動組合](./deepseek/usage-and-profiles.md)

### Extensions / Orchestration

- [Models、Skills、Hooks 與 Extensions](./deepseek/models-skills-and-extensions.md)
- [Subagents、Workflows 與 Jobs](./deepseek/subagents-workflows-and-jobs.md)
- [Code Mode 與 Plugins](./deepseek/code-mode-and-plugins.md)

### Security / Execution

- [Sandbox、Approval 與 Permission Presets](./deepseek/security-and-approvals.md)
- [Credentials 與 Execution Worlds](./deepseek/execution-worlds-and-credentials.md)

### Usage / Integration / Production

- [CLI、Headless 與 Automation](./deepseek/headless-and-automation.md)
- [Web、SDK、JSON-RPC、ACP 與 Client](./deepseek/integration-surfaces.md)
- [Production、Testing、Invariant 與 Replay](./deepseek/production-and-testing.md)

## 四、Pi｜Minimal Runtime 完整導讀

### 架構與 Runtime

- [完整導讀](./pi/overview.md)
- [官方 TUI 與 Session Tree](./pi/official-visuals.md)
- [從 pi-ai 到 AgentSession](./pi/architecture.md)
- [Model Providers：pi-ai](./pi/model-providers.md)
- [Agent Loop 與 Tools](./pi/agent-loop-and-tools.md)
- [Context、Compaction 與 Branching](./pi/context-compaction-and-branching.md)
- [Session、Compaction 與 Extensions](./pi/session-and-extensions.md)

### Resources / Extensions

- [Resources、Skills、Prompts 與 Pi Packages](./pi/resources-skills-and-packages.md)
- [Extensions 與自訂 TUI](./pi/extensions-and-ui.md)

### Security / Usage / Integration

- [Project Trust 與 Isolation](./pi/project-trust-and-isolation.md)
- [CLI 與日常使用](./pi/cli-and-usage.md)
- [SDK 與 RPC](./pi/sdk-and-rpc.md)
- [Production 與 Governance](./pi/production-and-governance.md)

## 五、三套 Harness｜實戰 Labs

### Codex Labs

- [Trace a Turn](./labs/trace-a-turn.md)
- [Guardrails](./labs/guardrails.md)
- [Embed App Server](./labs/embed-app-server.md)

### DeepSeek Harness Labs

- [Trace Turn / Step / Events](./deepseek/labs/trace-turn-step.md)
- [Build a Capability Plugin](./deepseek/labs/capability-plugin.md)
- [Replay / Invariant / Session Correctness](./deepseek/labs/replay-invariant.md)

### Pi Labs

- [Trace AgentSession / JSONL Session](./pi/labs/session-tree.md)
- [Build a Pi Extension](./pi/labs/extension.md)
- [Branch / Tree / Compaction](./pi/labs/branch-compaction.md)

## 六、三種 Harness｜比較、選型與採用

1. [比較框架：如何比較 Agent Harness](./comparison/overview.md)
2. [架構維度逐項比較](./comparison/architecture-comparison.md)
3. [情境式選型](./comparison/scenario-selection.md)
4. [PoC、採用與混用策略](./comparison/adoption-playbook.md)

閱讀邏輯：**怎麼比較 → 差在哪 → 怎麼選 → 怎麼驗證與導入**。

## 七、Harness｜真實系統與實務

- [實務工作流](./applications/workflows.md)
- [Behavior / Capability / Enforcement 應該放在哪一層？](./applications/where-should-behavior-live.md)
- [從零設計自己的 Agent Harness](./applications/build-your-own-harness.md)
- [Production Harness Checklist](./applications/production-checklist.md)

## 八、參考資料與原始碼

- [Glossary：三方名詞速查](./reference/glossary.md)
- [三套 Harness 原始碼導讀入口](./reference/source-reading.md)
- [`openai/codex` Source Map](./reference/source-map.md)
- [`deepseek-ai/deepseek-harness` Source Map](./reference/deepseek-source-map.md)
- [`earendil-works/pi` Source Map](./reference/pi-source-map.md)
- [官方閱讀清單](./reference/reading-list.md)
- [AI / LLM 資源](./reference/llm-resources.mdx)

## 三條推薦路徑

### 快速建立全局觀

```text
第一章
→ Codex / DeepSeek / Pi Overview
→ 第六章比較框架
```

### 想做 Agent Platform

```text
第一章
→ 三套完整導讀
→ 三套 Labs
→ 第六章
→ 第七章 Build Your Own Harness
→ 三套 Source Map
```

### 想直接做技術選型

```text
三套 Overview
→ 架構維度逐項比較
→ 情境式選型
→ PoC / Adoption
→ Production Checklist
```
