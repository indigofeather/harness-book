---
sidebar_position: 1
title: 導論：把 Codex 看成一個 Harness
---

# 導論：把 Codex 看成一個 Harness

> 最後核對：2026-08-23。Codex 的 App Server、permission profiles、subagents 等介面仍快速演進；本教材把「穩定的架構概念」與「版本敏感的 API」分開標示。

很多人第一次接觸 Codex，會把它理解成「一個會寫程式的模型」。這個理解少掉了最重要的一半。真正讓 Codex 能在 repository 中讀檔、搜尋、執行命令、修改程式、等待測試、要求批准、呼叫 MCP，並在多輪工具呼叫後仍維持工作狀態的，是 **harness**。

可以先用一個公式記住：

```text
Coding agent ≈ model + harness + tools + environment + policy + state
```

模型負責推理與產生下一個行動；harness 負責把世界整理成模型可以操作的介面，並把模型的行動真正執行、記錄、限制，再送回模型。

## 這份教材回答什麼

本專案刻意不是 CLI cheat sheet，而是依序回答六個問題：

1. **模型到底看見什麼？** — instructions、AGENTS.md、skills metadata、environment context、conversation history 與 tool schemas 如何組成 context。
2. **一次 turn 怎麼跑完？** — Responses API、streaming events、function/tool calls、tool outputs、下一輪 inference 的完整 agent loop。
3. **Codex 本體怎麼拆？** — `codex-core`、`protocol`、`app-server`、`exec`、`sandboxing`、MCP、hooks、thread store 等模組的責任邊界。
4. **權限怎麼控制？** — sandbox、approval、permission profiles、rules、network policy、project trust，以及它們不保護什麼。
5. **要擴充行為時放哪裡？** — prompt、AGENTS.md、Skill、Plugin、MCP、Hook、Rule、Subagent 或 core，各自適合的問題不同。
6. **怎麼放進真實系統？** — interactive CLI、`codex exec`、SDK、App Server、GitHub Actions、自製 UI、CI/CD 與 production harness。

## 建議閱讀路徑

如果你是第一次系統化理解 agent harness，照 sidebar 順序讀。若你已經長期使用 Codex CLI，建議先讀：

- [什麼是 Harness？](./foundations/what-is-harness.md)
- [Agent Loop](./foundations/agent-loop.md)
- [系統架構總覽](./architecture/system-map.md)
- [Sandbox 與 Approvals](./security/sandbox-and-approvals.md)
- [行為到底該放哪裡？](./applications/where-should-behavior-live.md)

## 「Codex harness」不是單一 crate

在目前的開源專案中，Codex 已是一個大型 Rust workspace。`codex-core` 是核心 agent runtime，但完整 harness 還包含 client surfaces、protocol、App Server、tool execution、sandbox、MCP、state persistence、hooks、skills 與其他 extensions。

因此本教材使用 **harness** 這個詞時，指的是「協調模型、context、工具、執行環境、安全政策與狀態的整體 runtime」，而不是特指某一個檔案或 crate。

## 來源策略

本教材優先採用三種來源：

- OpenAI 官方 Codex 文件：說明公開支援的使用方式與設定。
- OpenAI 工程文章：說明 agent loop 與 App Server 的設計意圖。
- `openai/codex` 目前主分支原始碼：用來核對真正的模組邊界與 runtime 實作。

當官方文件與 `main` 上的實驗功能有落差時，正文會把它標成「版本敏感」或「實驗性」，而不把內部細節當成永久 API。

## 官方入口

- [Codex documentation](https://learn.chatgpt.com/docs/codex)
- [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- [Unlocking the Codex harness: how we built the App Server](https://openai.com/index/unlocking-the-codex-harness/)
- [`openai/codex`](https://github.com/openai/codex)
