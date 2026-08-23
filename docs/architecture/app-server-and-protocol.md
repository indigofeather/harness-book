---
title: App Server 與 Protocol
---

# App Server 與 Protocol

App Server 解決的是一個典型架構問題：**如何讓完整 Codex harness 不被某個 UI 綁死？**

## 為什麼需要 App Server

早期 coding agent 很容易長成：

```text
Terminal UI
  ├─ prompt building
  ├─ model call
  ├─ tool execution
  ├─ approvals
  └─ state
```

只要想加 IDE、desktop app、自製 UI，就會開始複製 runtime logic。

App Server 把界面改成：

```text
TUI / IDE / App / Automation
            ↓
       App Server API
            ↓
       Codex harness
```

OpenAI 將它定位成「完整 harness 的 first-class integration surface」，而不是只暴露一個 `prompt → string` API。

## JSON-RPC-lite

App Server 使用雙向、類 JSON-RPC 2.0 的消息模型，但 wire 上省略 `"jsonrpc":"2.0"` header。預設 transport 是 stdio 上的 JSONL；另有 Unix socket 與實驗性 WebSocket 等形式。

三種消息：

```json
{"id": 1, "method": "thread/start", "params": {}}
{"id": 1, "result": {"thread": {"id": "..."}}}
{"method": "turn/completed", "params": {"turn": {"id": "..."}}}
```

- request：有 `id`，期待 response。
- response：同 `id` 回 result/error。
- notification：沒有 `id`，用於事件串流。

## Initialize handshake

每個 transport connection 必須先 initialize：

```json
{
  "method": "initialize",
  "id": 0,
  "params": {
    "clientInfo": {
      "name": "my_codex_client",
      "title": "My Codex Client",
      "version": "0.1.0"
    }
  }
}
```

接著 client 送 `initialized` notification。這讓 server 能知道 client capabilities、MCP extensions 與身份資訊。

## API 為什麼不是只有 run(prompt)

因為真正 UI 需要：

- thread start/resume/fork/list/read；
- turn start/interrupt/steer；
- item streaming/deltas；
- approvals；
- model/config/auth；
- skills/apps/MCP；
- project/thread organization；
- diagnostics/telemetry 等。

如果只提供 `run(prompt) -> text`，上層無法做 rich progress UI，也無法安全處理 approvals。

## Event stream 是產品能力，不只是 log

例如一個 IDE 可能收到：

```text
turn/started
item/started           shell command
item/*/delta           output streaming
item/completed         shell command
item/started           file edit
item/completed         file edit
item/agentMessage/delta
item/completed         agent message
turn/completed
```

UI 可以因此把「正在跑測試」「修改了哪些檔案」「正在等待批准」呈現成真正產品狀態，而非從 terminal text 猜測。

## Backpressure

App Server 的 transport 使用 bounded queues。當 ingress 飽和時，server 可回 retryable overload error；client 應採 exponential backoff + jitter。

這是很重要的 harness lesson：**事件系統本身也需要流量控制**。Agent 可能高頻產生 deltas/tool output，不能假設 client 永遠消費得夠快。

## Schema generation

App Server 可以由當前 Codex binary 產生 TypeScript 或 JSON Schema。這比手抄 protocol interface 更可靠，因為 schema 與 binary 版本綁定。

```bash
codex app-server generate-ts --out ./generated
codex app-server generate-json-schema --out ./schema
```

## MCP Server ≠ App Server

兩者名字容易混淆：

- **Codex 作為 MCP server**：把某些 Codex 能力暴露給支援 MCP 的 host。
- **Codex App Server**：把完整 Codex product/harness lifecycle 暴露給 rich client。

如果你要「在自己的產品裡嵌一個完整 Codex」，優先研究 App Server。

## 來源

- [App Server docs](https://learn.chatgpt.com/docs/app-server)
- [Unlocking the Codex harness](https://openai.com/index/unlocking-the-codex-harness/)
- [`codex-rs/app-server/README.md`](https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md)
- [`codex-rs/protocol/README.md`](https://github.com/openai/codex/blob/main/codex-rs/protocol/README.md)
