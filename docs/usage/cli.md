---
title: Codex CLI：Interactive Harness
---

# Codex CLI：Interactive Harness

Codex CLI 是最直接的人機協作入口。它的價值不只是輸入 prompt，而是把 approvals、tool progress、diff、steering、session lifecycle 組成一個 interactive harness UX。

## 安裝與登入

請以官方文件的當前安裝方式為準。常見形式包括 npm/Homebrew/官方 installer，登入可以使用 ChatGPT account 或 API/provider 設定。

安裝後最重要的不是背 flag，而是理解三個 scope：

```text
current process flags
      ↓
project .codex/config.toml
      ↓
user ~/.codex/config.toml
```

遇到行為不符預期，先確認實際生效設定來源。

## 啟動位置就是 Context Boundary 的一部分

```bash
cd my-repo
codex
```

cwd 影響：

- project root discovery；
- AGENTS.md hierarchy；
- nested project config；
- workspace write scope；
- shell execution；
- skill/project lookup。

所以不要把 `cd` 當成無關緊要的 shell 前置動作。

## Prompt 應描述 Outcome + Constraints

差：

```text
幫我改 auth
```

好：

```text
找出登入後偶發 401 的原因。先重現與確認 session refresh 流程，
只修改必要檔案；不要更換 auth library。完成後跑相關 unit/integration tests，
最後列出根因、修改與尚未驗證的風險。
```

Harness 可以提供工具，但任務邊界仍要由 user 說清楚。

## 先 Research 再 Write

高風險 repository 最好用兩階段：

```text
1. 先只分析，不修改，提出根因與修改計畫。
2. 計畫確認後，再實作。
```

這比一開始 full-access 然後要求「小心一點」更可靠。

## Steering

Interactive agent 的優勢是你能在工作中途補充：

```text
不要動 migration，改從 repository layer 解。
```

好的 harness 會把這種 input 接進 active turn/queue，而不是只能等整個任務結束。

## 何時該開新 Thread

建議新 thread：

- 任務目標完全改變；
- 前一個 thread 累積大量無關 context；
- 想避免舊假設污染；
- 要比較另一條方案，可 fork。

建議延續：

- 同一 feature 的後續修正；
- 剛完成 exploration，現在要實作；
- 需要保留已驗證的 assumptions。

## CLI 是 UI，不是 API

如果要 automation，不要寫：

```bash
expect codex
# scrape terminal output...
```

改用 `codex exec --json`、SDK 或 App Server。UI text 是給人看的，event protocol 才是 machine contract。

## 來源

- [Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [Configuration](https://learn.chatgpt.com/docs/config-file/config-basic)
