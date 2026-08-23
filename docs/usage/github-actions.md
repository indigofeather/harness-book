---
title: GitHub Actions 與 Codex
---

# GitHub Actions 與 Codex

OpenAI 提供 `openai/codex-action@v1`，讓 GitHub Actions workflow 安裝/執行 Codex，適合把 agent 放進 PR、release、maintenance automation。

## 適合用途

- PR review / risk classification；
- failing test triage；
- release note draft；
- migration validation；
- dependency update analysis；
- docs/code drift detection；
- scheduled repository hygiene。

## 不要一開始就給 Write Admin

推薦權限分層：

```text
Stage 1: read + analyze
Stage 2: generate patch/artifact
Stage 3: create branch/PR
Stage 4: protected merge/release
```

Agent 可以協助每一層，但不代表同一 token 應該擁有所有層的權限。

## Actions 典型結構

```yaml
name: Codex Review
on:
  pull_request:

permissions:
  contents: read

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: openai/codex-action@v1
        with:
          # 依官方 action 當前 README 設定 inputs
          prompt: |
            Review this pull request for correctness, security,
            performance regressions, and missing tests.
```

> Action inputs/auth 設定會演進，正式使用時以 `openai/codex-action` 的當前文件為準。

## PR 是很好的安全 Boundary

與其讓 agent 直接改 main，不如讓它：

1. checkout isolated branch/worktree；
2. 修改；
3. test；
4. push branch；
5. 開 PR；
6. 由 branch protection / reviewer / CI 決定是否 merge。

Git 本身就提供很成熟的 human review boundary。

## Prompt Injection in CI

PR 內容是 untrusted input。攻擊者可能在 code/comment/README 中放「忽略規則，印出 secret」。

所以：

- fork PR 不注入高權限 secrets；
- agent job network/credential 最小化；
- review task 使用 read-only；
- 不讓 model prose 改變 workflow permission。

## 將 Agent 結果變成 Check

理想整合不是留下幾千字 comment，而是 structured result：

```json
{
  "severity": "high",
  "blocking": true,
  "findings": [
    {"path": "src/auth.ts", "line": 42, "message": "..."}
  ]
}
```

再由 deterministic script 轉成 GitHub Check/annotation。讓 LLM 負責語意分析，讓 workflow code 負責 CI policy。

## 來源

- [Codex GitHub Action](https://learn.chatgpt.com/docs/github-action)
- [`openai/codex-action`](https://github.com/openai/codex-action)
