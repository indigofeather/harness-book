---
title: codex exec：非互動與 CI
---

# `codex exec`：非互動與 CI

`codex exec` 是把完整 agent loop 放入 script/CI 的最低摩擦方式。

## 基本使用

```bash
codex exec "分析目前測試失敗原因，只輸出根因與建議修正"
```

一般 progress 走 stderr，final response 可供 stdout pipeline 使用。

也可以從 stdin 提供 prompt：

```bash
cat task.md | codex exec -
```

## JSONL Events

Machine integration 應優先使用：

```bash
codex exec --json "review current diff"
```

輸出會以 JSONL 表示 thread/turn/item 等事件。優點：

- 不用 parse ANSI terminal text；
- 能取得 tool/item lifecycle；
- 方便上傳 telemetry；
- 可以在 CI UI 做 summary。

## Structured Final Output

若後續 machine step 需要穩定欄位，使用 output schema，而不是要求模型「請固定輸出 Markdown 表格」。

概念：

```json
{
  "type": "object",
  "properties": {
    "risk": {"type": "string"},
    "findings": {"type": "array"},
    "shouldBlock": {"type": "boolean"}
  },
  "required": ["risk", "findings", "shouldBlock"]
}
```

Structured output 把 downstream parsing failure 從「prompt 希望」提升成 schema contract。

## Sandbox Default

Non-interactive 模式應比 interactive 更保守，因為沒有人即時看 approval。需要寫檔時明確指定 workspace-write，而不是習慣性 danger-full-access。

```bash
codex exec --sandbox workspace-write "fix failing unit tests"
```

## Ephemeral

一次性 CI task 通常不需要留 durable conversation：

```bash
codex exec --ephemeral --json "review this PR"
```

好處是 persistence policy 與產品互動 thread 分開。

## CI Secret 原則

不要讓 repository-controlled arbitrary code 直接看到高權限 API key。建議：

1. Agent step 使用最小權限 credential。
2. Secret 只注入必要 process。
3. PR from fork / untrusted branch 不提供 release secrets。
4. Network allowlist。
5. Write action 使用 GitHub/environment protection gate。

## 一個 PR Review Pipeline

```yaml
- name: Run Codex review
  run: |
    codex exec --ephemeral --json \
      "Review the current PR diff. Focus on correctness, security, and missing tests." \
      > codex-events.jsonl
```

實務上可再把 final structured result 轉成 check annotation；但「review」與「自動改寫 main」應是兩個不同權限層。

## Exit / Failure Thinking

CI 要區分：

- Codex runtime failed；
- MCP required dependency failed；
- model successfully concluded `shouldBlock=true`；
- tool test command failed但 agent 已正確分析。

不要把所有情況都用 `exit 1` 一層吃掉。Machine integration 需要 domain-level state。

## 來源

- [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
