---
title: Lab：Trace Pi Session 與 AgentSession
---

# Lab：Trace Pi Session 與 AgentSession

這個 Lab 要把 Pi 的兩個 state boundary 分開看：

```text
AgentSession
→ live coding-agent controller

SessionManager / JSONL
→ durable entry tree
```

## 1. 建立一個新 Session

在測試 repository 啟動：

```bash
pi
```

請 Agent 做一個會包含 read + command 的簡單任務，例如：

```text
讀 package.json，找出 test script，執行最小測試並解釋結果。
```

## 2. 找到 Session

Pi session 預設保存在使用者 agent session directory。

不要先修改檔案，只觀察 JSONL。

記錄：

```text
Session Header
message entries
model / thinking metadata（若有）
compaction / branch entries（若有）
custom extension entries（若有）
```

## 3. 畫 `id / parentId`

把每個 entry 畫成：

```text
id → parentId
```

即使目前只有一條線，也先確認 lineage 如何表示。

## 4. 對照 Live Events

同一個 Tool Call 在 TUI / Agent event 中可能有 live progress，但 durable session 不一定逐 token 保存所有畫面事件。

列一張表：

| Activity | UI 看得到？ | Agent Event？ | Session Entry？ |
|---|---|---|---|
| user prompt | | | |
| token stream | | | |
| tool call | | | |
| tool result | | | |
| model change | | | |

目標是理解 live vs durable。

## 5. Resume

離開 Pi，再 resume / continue 同一 session。

確認：

```text
歷史仍存在
model / thinking state 正確
Agent 能接著完成工作
```

然後思考：這些資料是 AgentSession 自己記憶，還是由 SessionManager 重建？

## 6. 對照 Source

優先讀：

```text
packages/coding-agent/src/core/agent-session.ts
packages/coding-agent/src/core/session-manager.ts
packages/coding-agent/src/core/sdk.ts
```

追 `createAgentSession()` 如何把 ModelRuntime、SessionManager、ResourceLoader 與低階 Agent wiring 起來。

## 完成標準

你能清楚說明：

> **AgentSession 是 live runtime instance；SessionManager 保存的是可重建 context 的 durable entry tree。**

## 官方來源

- [Pi Sessions](https://pi.dev/docs/latest/sessions)
- [Session File Format](https://pi.dev/docs/latest/session-format)
- [`AgentSession`](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/src/core/agent-session.ts)
