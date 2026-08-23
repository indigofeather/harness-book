---
title: State、History、Rollout 與 Persistence
---

# State、History、Rollout 與 Persistence

LLM API 通常是 stateless 的；coding agent 卻必須表現得有狀態。這個落差由 harness 補上。

## 至少要保存哪些狀態？

可以分成四層：

### Conversation state

Thread、turn、items、message/tool history。

### Execution state

active turn、background process、pending input、cancellation、approval wait。

### Configuration state

model、cwd、workspace roots、permissions、selected environment、loaded instruction sources。

### Product metadata

thread title/section/project assignment、fork/parent relation、git info、timestamps、token usage。

## Rollout 的概念

Codex source 中保留 `rollout` 相關模組，可以把它理解成可重建 session/thread history 的事件/項目紀錄層。它不只是 UI chat transcript，因為 agent 執行過程中的 tool/item 也是未來 context 與 audit 的一部分。

## Event sourcing 的味道

Agent 系統很適合採「append events, derive views」思路：

```text
UserInput
ToolCall
ToolOutput
FileEdit
AgentMessage
TurnCompleted
```

由這些 durable items 可以衍生：

- conversation view；
- diff timeline；
- token accounting；
- resume context；
- observability；
- audit trail。

如果只保存最後 assistant text，幾乎所有 production 能力都會失去。

## Ephemeral thread 的作用

Ephemeral 不代表「另一套簡化 agent」。理想設計是共享完整 runtime，只把 persistence backend 換成 in-memory/no durable write。

這讓你可以安全地用同一套 semantics 支援：

- 一次性 CI task；
- temporary research；
- subtask；
- 不希望留下 durable history 的執行。

## Fork 與 immutable history

Fork 最好基於 immutable history boundary，而不是複製一個可變 `messages` array。原因：

- 可以知道來源 thread；
- 可以 fork 到某個 turn；
- 可以避免 mid-turn partial state 不明；
- 可以對歷史截斷/重寫做 versioning。

Codex 的 source 也存在 thread rollout truncation、fork snapshot 等概念，顯示 history mutation 是需要嚴肅處理的 runtime 行為。

## Persistence 與 Context 不是同一件事

這一點很重要：

```text
Durable history != what must be sent to the model now
```

完整 history 可以留在 store；context builder 只選擇當前推理需要的 projection。當 history 很長時，透過 compaction / summarization / selected items 控制 token budget。

## Database 設計提示

自製 harness 可以從這個最小 schema 起步：

```text
threads(id, created_at, status, parent_thread_id, ...)
turns(id, thread_id, started_at, completed_at, status, ...)
items(id, turn_id, seq, type, payload_json, created_at)
approvals(id, turn_id, item_id, state, ...)
artifacts(id, item_id, locator, metadata_json)
```

真正 production 再加 project、environment、usage、telemetry、compaction snapshot 等。

## 來源

- [`codex-rs/thread-store`](https://github.com/openai/codex/tree/main/codex-rs/thread-store)
- [`codex-rs/core/src/rollout`](https://github.com/openai/codex/tree/main/codex-rs/core/src/rollout)
- [App Server docs](https://learn.chatgpt.com/docs/app-server)
