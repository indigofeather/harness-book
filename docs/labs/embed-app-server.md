---
title: Lab 3：寫一個最小 App Server Client
---

# Lab 3：寫一個最小 App Server Client

目標：不透過 TUI，直接理解 App Server 的雙向 lifecycle。

## Step 1：啟動 Process

```ts
import {spawn} from 'node:child_process';
import readline from 'node:readline';

const child = spawn('codex', ['app-server', '--stdio'], {
  stdio: ['pipe', 'pipe', 'inherit'],
});

const lines = readline.createInterface({input: child.stdout});
```

## Step 2：建立 Request Manager

```ts
let nextId = 1;
const pending = new Map<number, {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}>();

function sendRequest(method: string, params: unknown) {
  const id = nextId++;
  child.stdin.write(JSON.stringify({id, method, params}) + '\n');

  return new Promise((resolve, reject) => {
    pending.set(id, {resolve, reject});
  });
}
```

## Step 3：Dispatch Incoming Messages

```ts
lines.on('line', (line) => {
  const msg = JSON.parse(line);

  if (msg.id != null && pending.has(msg.id) && ('result' in msg || 'error' in msg)) {
    const p = pending.get(msg.id)!;
    pending.delete(msg.id);
    msg.error ? p.reject(msg.error) : p.resolve(msg.result);
    return;
  }

  // notification or server->client request
  console.log('event', msg);
});
```

正式版本必須把 server→client request 與 notification 再分開。

## Step 4：Initialize

```ts
await sendRequest('initialize', {
  clientInfo: {
    name: 'harness_lab',
    title: 'Harness Lab',
    version: '0.1.0',
  },
});

child.stdin.write(JSON.stringify({method: 'initialized', params: {}}) + '\n');
```

## Step 5：Start Thread / Turn

方法名稱與 params 以你安裝版本產生的 schema 為準：

```bash
codex app-server generate-ts --out ./generated
```

不要從網路文章複製舊 interface。

## Step 6：做 State Reducer

把 events 轉成：

```ts
type ClientState = {
  threads: Record<string, ThreadState>;
  activeApprovals: ApprovalRequest[];
};
```

讓 rendering 與 transport 完全分開。

## Step 7：處理 Shutdown / Failure

至少處理：

- child process exit；
- malformed line；
- request timeout；
- overload retry；
- interrupted turn；
- reconnect + thread resume。

## 完成標準

你的 demo 應能顯示：

```text
[turn] started
[tool] shell: npm test
[tool] completed
[file] src/foo.ts changed
[agent] ...streaming text...
[turn] completed
```

做到這裡，你已經不是在「呼叫 Codex CLI」，而是在實作一個 Codex client。
