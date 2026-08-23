---
title: App Server：建立自己的 Codex Client
---

# App Server：建立自己的 Codex Client

若你要做「自己的 Codex UI」，最核心的整合點就是 App Server。

## 啟動

```bash
codex app-server --stdio
```

你的 process 啟動/連接它，然後以 JSONL 雙向通訊。

## 最小 Client 流程

```text
spawn app-server
  ↓
initialize request
  ↓
initialized notification
  ↓
thread/start
  ↓
turn/start
  ↓
consume notifications
  ↓
turn/completed
```

## Node.js 概念範例

```ts
import {spawn} from 'node:child_process';
import readline from 'node:readline';

const child = spawn('codex', ['app-server', '--stdio'], {
  stdio: ['pipe', 'pipe', 'inherit'],
});

const rl = readline.createInterface({input: child.stdout});
let nextId = 1;

function send(message: unknown) {
  child.stdin.write(JSON.stringify(message) + '\n');
}

send({
  id: nextId++,
  method: 'initialize',
  params: {
    clientInfo: {name: 'demo', title: 'Demo Client', version: '0.1.0'},
  },
});

rl.on('line', (line) => {
  const event = JSON.parse(line);
  console.log(event);
});
```

這只是 transport skeleton；真正 client 還需要 request correlation、initialize response 後再送 initialized、error handling、reconnect 等。

## Request Manager

不要在大型 client 中手寫：

```ts
if (msg.id === 1) ...
if (msg.id === 2) ...
```

建立：

```ts
Map<RequestId, {resolve, reject, timeout}>
```

收到 response 時依 id resolve；notification 則走 event bus。

## State reducer

UI 不應直接依 notification 順序修改一堆 component local state。建議把 event 轉成 domain reducer：

```text
thread/started   → upsertThread
turn/started     → markTurnRunning
item/started     → appendItem
item/*/delta     → applyDelta
item/completed   → finalizeItem
turn/completed   → finalizeTurn
```

這樣 reconnect/replay/test 都比較容易。

## Approvals

App Server 整合最容易漏掉的是 server→client request。雙向 protocol 不是 server 單方面丟 notifications；某些互動（approval/elicitation）可能需要 client 回 response。

因此 transport layer 必須支援：

```text
client request → server response
server request → client response
server notification
```

## Version Compatibility

App Server 仍有 experimental API。最佳做法：

- app-server binary 與 generated schema 同版本；
- startup 做 capability/version negotiation；
- unknown notifications ignore/log，而不是 crash；
- experimental fields behind feature flag；
- integration tests 用實際 binary 跑。

## Backpressure / Reconnect

如果 UI 消費太慢，server 有 bounded queue / overload semantics。Production client：

- event handler 不做重 CPU 工作；
- UI delta 可 batch；
- request retry 使用 exponential backoff + jitter；
- reconnect 後用 thread/read/list 取 authoritative state，而不是假設漏掉的 event 永遠找得回來。

## 來源

- [App Server docs](https://learn.chatgpt.com/docs/app-server)
- [App Server engineering article](https://openai.com/index/unlocking-the-codex-harness/)
- [`app-server/README.md`](https://github.com/openai/codex/blob/main/codex-rs/app-server/README.md)
