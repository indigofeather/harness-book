---
title: 完整教材目錄
---

# 完整教材目錄

這一頁是整份《Agent Harness 深度指南》的快速索引。若你第一次閱讀，建議先看 [學習地圖](./learning-map.md)；若你已知道自己要找哪個主題，可以直接從這裡跳到對應章節。

## 一、Agent Harness 基礎

- [什麼是 Harness？](./foundations/what-is-harness.md)
- [Agent Loop](./foundations/agent-loop.md)
- [Context 與 Caching](./foundations/context-and-caching.md)
- [Thread / Turn / Item](./foundations/thread-turn-item.md)

## 二、Codex｜架構與核心 Runtime

- [系統架構總覽](./architecture/system-map.md)
- [官方視角：Codex 介面與 App Server](./architecture/official-visuals.md)
- [codex-core](./architecture/codex-core.md)
- [App Server 與 Protocol](./architecture/app-server-and-protocol.md)
- [Model Provider 與 Streaming](./architecture/model-provider-and-streaming.md)
- [Tool Execution](./architecture/tool-execution.md)
- [State 與 Persistence](./architecture/state-and-persistence.md)
- [Client Surfaces](./architecture/client-surfaces.md)

## 三、Codex｜安全、權限與信任邊界

- [Sandbox 與 Approvals](./security/sandbox-and-approvals.md)
- [Permissions、Rules 與 Network](./security/permissions-rules-network.md)
- [Trust Boundaries](./security/trust-boundaries.md)

## 四、Codex｜客製化與擴充

- [Config](./customization/config.md)
- [AGENTS.md](./customization/agents-md.md)
- [Skills 與 Plugins](./customization/skills-and-plugins.md)
- [MCP](./customization/mcp.md)
- [Hooks](./customization/hooks.md)
- [Subagents 與 Worktrees](./customization/subagents-and-worktrees.md)

## 五、Codex｜使用與整合

- [Codex CLI](./usage/cli.md)
- [Non-interactive / CI](./usage/noninteractive-ci.md)
- [SDK](./usage/sdk.md)
- [App Server](./usage/app-server.md)
- [GitHub Actions](./usage/github-actions.md)

## 六、Codex｜實戰 Labs

- [Trace a Turn](./labs/trace-a-turn.md)
- [Guardrails](./labs/guardrails.md)
- [Embed App Server](./labs/embed-app-server.md)

## 七、DeepSeek Harness｜Composable Runtime

- [先建立正確心智模型](./deepseek/overview.md)
- [官方視角：Lifecycle 與 Tool Pipeline](./deepseek/official-visuals.md)
- [Cordis 與 Plugin 架構](./deepseek/architecture.md)
- [Profiles、Bundles 與啟動組合](./deepseek/usage-and-profiles.md)
- [Session 與 Events](./deepseek/session-and-events.md)
- [Models、Skills 與 Extensions](./deepseek/models-skills-and-extensions.md)
- [Code Mode 與 Plugins](./deepseek/code-mode-and-plugins.md)
- [Security 與 Approvals](./deepseek/security-and-approvals.md)
- [Integration Surfaces](./deepseek/integration-surfaces.md)
- [Production 與 Testing](./deepseek/production-and-testing.md)

## 八、Pi｜Minimal Runtime

- [先建立正確心智模型](./pi/overview.md)
- [官方視角：Pi TUI 與 Session Tree](./pi/official-visuals.md)
- [從 pi-ai 到 AgentSession](./pi/architecture.md)
- [Session、Compaction 與 Extensions](./pi/session-and-extensions.md)
- [Integration、Project Trust 與 Security](./pi/integration-and-security.md)

## 九、三種 Harness｜比較與選型

- [Codex、DeepSeek Harness、Pi 三方比較](./comparison/three-harnesses.md)
- [三種 Harness 選型指南](./comparison/three-way-selection-guide.md)
- [Codex vs DeepSeek 深度比較](./comparison/codex-vs-deepseek.md)
- [Codex vs DeepSeek 選型補充](./comparison/selection-guide.md)

## 十、Harness｜真實系統與實務

- [Workflows](./applications/workflows.md)
- [Behavior 應該放在哪一層？](./applications/where-should-behavior-live.md)
- [Build Your Own Harness](./applications/build-your-own-harness.md)
- [Production Checklist](./applications/production-checklist.md)

## 十一、參考資料與原始碼

- [Glossary](./reference/glossary.md)
- [三套 Harness 原始碼導讀入口](./reference/source-reading.md)
- [openai/codex 原始碼導讀地圖](./reference/source-map.md)
- [deepseek-ai/deepseek-harness 原始碼導讀地圖](./reference/deepseek-source-map.md)
- [earendil-works/pi 原始碼導讀地圖](./reference/pi-source-map.md)
- [官方閱讀清單](./reference/reading-list.md)
- [AI / LLM 資源](./reference/llm-resources.md)

## 三條最常用的閱讀路徑

### 第一次接觸 Agent Harness

```text
學習地圖
→ Harness 基礎
→ Codex 架構
→ DeepSeek Overview
→ Pi Overview
→ 三方比較
```

### 想做 Agent Platform / Harness 架構

```text
Codex Core / App Server
→ DeepSeek Capability Seams
→ Pi AgentSession / Extensions
→ 三方選型
→ Build Your Own Harness
```

### 想直接讀原始碼

```text
三套 Harness 原始碼導讀入口
→ 選一套 Source Map
→ 從 responsibility boundary 追到 implementation
```

> Sidebar 是網站的 canonical reading order；`llms.txt` 與 `llms-full.txt` 也會依同一份 Sidebar 排列。