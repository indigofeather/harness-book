---
title: Lab：Replay、Invariant 與 Session Correctness
---

# Lab：Replay、Invariant 與 Session Correctness

DeepSeek Harness 的 event-sourced Session 最有價值的地方，是 correctness 可以被直接測試，而不只靠 UI 看起來正常。

## 任務

建立一段最小 trajectory：

```text
User asks task
→ Model calls one Tool
→ Tool returns
→ Model final answer
```

然後驗證：重新載入 / replay 後，Model-visible history 與關鍵 lifecycle facts 能被重建。

## 1. 列出你預期的 Durable Facts

例如：

```text
user/message
turn/start
step/start
assistant/message or tool call anchor
tool/call
tool/result
turn/end
```

哪些 raw token delta 不需要 durable，也一起標出來。

## 2. 定義三條 Invariant

至少包含：

### Sequence

```text
Session event seq 必須單調增加
```

### Enclosure

```text
Step 必須位於 open Turn
```

### Tool Pairing

```text
Tool Result 必須能對到一個已存在的 Tool Call
```

## 3. 破壞資料

在測試 fixture / test helper 中刻意建立錯誤情況：

```text
orphan tool result
step outside turn
invalid sequence
```

確認 invariant tooling 能抓到，而不是直到 UI render 才發現。

## 4. Replay / Projection

從同一份 durable events 重建：

```text
message history
session projection
tool trajectory
```

比對原 runtime observation。

這一步的核心問題：

> **Source of truth 到底是 event log，還是某個 in-memory messages array？**

## 5. Resume 測試

持久化後重新 resume Agent，確認：

- turn numbering 正確；
- model-visible history 一致；
- tool result 沒遺失；
- compaction boundary 若存在仍能重建；
- 已完成 work 不會再次 side effect。

## 6. Query 練習

利用 Session Query / Projection 的概念回答：

```text
哪個 Tool Call 導致這個 Result？
這段 assistant message 屬於哪個 Step？
哪個 Turn 發生 failure？
```

這是 event sourcing 從「理論」走到 production debugging 的關鍵。

## 7. Loader Smoke

如果你有 custom Profile / Plugin，再加一個 smoke test：

```text
load profile
→ mount plugin tree
→ dependencies resolve
→ unload
→ no leaked effects
```

Composable runtime 的 correctness 不只在 unit function，也在 composition lifecycle。

## 完成標準

你能解釋：

> **Event sourcing 的價值不是 log 很多，而是 durable trajectory 可以被驗證、重建、查詢與 replay。**

## 官方來源

- [Invariants](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/invariants.md)
- [Session Query](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session-query.md)
- [Session Projection](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session-projection.md)
