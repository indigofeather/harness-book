---
title: Lab 1：完整追蹤一次 Turn
---

# Lab 1：完整追蹤一次 Turn

目標：把抽象的 agent loop 變成你可以觀察的事件。

## Step 1：準備小型 Repo

找一個有 test 的 repository，建立簡單 failing test，或選一個已知小 bug。

## Step 2：用 JSON 模式執行

```bash
codex exec --ephemeral --json \
  "Find why the failing test fails. Make the smallest correct fix and rerun the test." \
  > trace.jsonl
```

## Step 3：觀察事件類型

```bash
head -n 20 trace.jsonl
```

找出：

```text
thread started
turn started
model/agent items
shell/file tool items
tool outputs
turn completed / failed
```

實際 JSON field 以當前版本為準。

## Step 4：畫出真正 Loop

不要只寫「Codex 改了檔」。記成：

```text
User input
→ read package/test
→ run failing test
→ inspect implementation
→ edit file
→ rerun test
→ final message
```

這就是一次真實 action trace。

## Step 5：找 Context Growth

思考每一個 tool output 如何成為下一輪 model input。特別注意大 log：如果 test 一次吐 5000 行，agent 下一輪真的需要全部嗎？

## Step 6：故意製造 Tool Failure

讓一個 command 不存在，觀察 agent 是否：

- 把 error 當成 observation；
- 改用其他 command；
- 還是整個 turn failure。

這能幫你區分「tool error」與「runtime failure」。

## Step 7：改成 Read-only

讓相同任務在 read-only sandbox 執行，只要求提出 patch plan。比較：

- model reasoning 是否仍能完成 diagnosis；
- write action 如何被限制；
- final response 如何改變。

## 完成標準

你應該能不用看 Codex UI，只靠 event trace 回答：

1. 一個 turn 中有幾次 model↔tool loop？
2. 哪些 action 有副作用？
3. 什麼狀態會進下一輪 context？
4. turn 為何結束？
