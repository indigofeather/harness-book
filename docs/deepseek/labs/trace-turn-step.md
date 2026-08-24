---
title: Lab：Trace 一次 DeepSeek Turn / Step
---

# Lab：Trace 一次 DeepSeek Turn / Step

這個 Lab 的目標不是只「跑起 dsh」，而是把一次工作拆成：

```text
Profile boot
→ Agent / Session
→ Turn
→ Step
→ Model stream
→ Tool call / result
→ next Step
→ Turn end
```

## 目標

完成後你應該能回答：

1. 一個 Turn 為什麼可能有多個 Steps？
2. 哪些 event 是 durable Session facts？
3. 哪些只是 live Agent lifecycle？
4. Tool Result 何時會進下一個 Model Request？

## 1. 先確認實際 Composition

```bash
dsh --profile headless --dump-config
```

先找出：

```text
agent-loop
llm adapter
tool registry
session / persistence
sandbox / approval
```

這一步很重要：不要在不知道 Runtime 組成的情況下直接 trace source。

## 2. 跑一個會觸發 Tool 的任務

在一個測試 repository 中執行類似：

```bash
dsh --profile headless "inspect package scripts, run the smallest relevant test, and summarize the result"
```

任務故意包含 read + process，方便觀察至少一個 Tool round trip。

## 3. 畫出你看到的 Lifecycle

理想上用這張表記錄：

| 順序 | Event / Activity | Durable? | Model-visible later? |
|---:|---|---|---|
| 1 | user input | | |
| 2 | turn/start | | |
| 3 | step/start | | |
| 4 | request / stream | | |
| 5 | tool/call | | |
| 6 | tool/result | | |
| 7 | next step | | |
| 8 | assistant/message | | |
| 9 | turn/end | | |

不要先猜答案；用 Session log / SDK observation / source trace 驗證。

## 4. 對照 Source

優先讀：

```text
packages/core/agent-loop/README.md
packages/core/session/README.md
packages/core/tools/
```

追：

```text
assembleContextFor(agent)
→ llm prepare/stream
→ tool pipeline
→ session events
```

## 5. 做一次 Steering 實驗

如果你用可互動 surface，讓 Turn 正在跑時補充：

```text
不要修改任何檔案，只讀取與測試。
```

觀察這個 input 是進 next-step 還是 next-turn，以及後續 Tool Surface / decision 是否改變。

## 6. 寫下 Invariant

最後不要只畫時序圖，寫出至少三條你認為 Runtime 必須維持的 invariant，例如：

```text
Tool Result 必須對應既有 Tool Call
Step 必須位於 open Turn 中
Resume 後 Model history 必須能由 durable log 重建
```

再去官方 invariant / session docs 對照。

## 完成標準

你能不用看圖，自己解釋：

> **DeepSeek 的 Agent Loop 是 live driver；SessionEvents 才是 durable trajectory，而 Step 是 Model Request 的正式 lifecycle boundary。**

## 官方來源

- [`dsh-agent-loop`](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/core/agent-loop/README.md)
- [Session subsystem](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/session.md)
