---
title: Model Provider、Responses API 與 Streaming
---

# Model Provider、Responses API 與 Streaming

Harness 必須把「agent runtime」與「某個固定 endpoint」分開。Codex 可以依登入與設定走不同 model provider，而 core 仍維持同一套 turn/tool semantics。

## Provider abstraction 解決什麼

至少包含：

- endpoint / auth；
- model catalog；
- reasoning effort；
- service tier；
- request metadata；
- streaming protocol；
- retry / rate limit；
- context window / capabilities。

Model 應該是 dependency，不應該是 runtime 架構本身。

## Prompt request 的三個核心區塊

概念上可化成：

```json
{
  "instructions": "...",
  "tools": ["..."],
  "input": ["..."]
}
```

- `instructions`：模型/agent 的穩定高階行為。
- `tools`：這一輪可使用的 action schema。
- `input`：developer/user/environment/history/tool results 等 items。

真正 payload 可能因 provider/版本有更多欄位，但這個三分法很好用。

## Streaming 是 agent loop 的必要條件

若等整個 response 完成才處理，會損失：

- reasoning/message 的即時 UI；
- tool call 進度；
- cancel responsiveness；
- token/latency telemetry；
- background execution 的協調能力。

因此 core 需要把 provider-specific stream event 轉成 internal response/event model，再由 App Server/TUI 映射成 client-visible items。

## Model event 與 Product event 不必一對一

這是設計 harness 時常被忽略的點。

Provider 可能給你：

```text
response.output_text.delta
response.function_call_arguments.delta
response.completed
```

產品需要的卻可能是：

```text
item/started
item/shellCommand/outputDelta
item/completed
turn/completed
```

中間需要一層 **event mapping**。這樣 UI 不必知道 provider 細節，也不會因 API 換事件名稱就整套壞掉。

## Retry 不是無腦重送

對純 model request，retry 相對安全；但如果上一輪 response 已觸發具副作用的 tool call，重建 turn 時就要注意：

- 是否已執行過？
- 是否已有 persisted item id？
- 是否具 idempotency key？
- tool 是否可以重跑？

因此 production harness 的 retry boundary 通常落在「provider request」而非「整個 turn 從頭再來」。

## Local / alternate providers

Codex CLI 也能在特定模式使用本機或其他模型 provider。架構上的啟示不是某一個特定 provider 名稱，而是：

> Harness 的價值應該盡量存在於 provider 之外。

如果換模型就失去 sandbox、tools、history、approvals、events，那你建的不是 harness，只是一個 API wrapper。

## 來源

- [Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
- [`codex-rs/core/src/client.rs`](https://github.com/openai/codex/blob/main/codex-rs/core/src/client.rs)
- [`codex-rs/model-provider`](https://github.com/openai/codex/tree/main/codex-rs/model-provider)
