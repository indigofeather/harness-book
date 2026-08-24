---
title: CLI 與日常使用
---

# CLI 與日常使用

Pi 的 terminal experience 是它最直接的產品入口。理解 CLI 不只是背 flags，而是看 **Model、Session、Tools、Resources、Trust** 怎麼在一個 AgentSession 裡組合。

## 安裝與啟動

官方目前的 npm 安裝方式：

```bash
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
pi
```

首次使用再透過 `/login` 或對應 provider credential 設定模型存取。

## Model / Provider

常用選項包括：

```text
--provider
--model
--api-key
--thinking
--models
```

互動中可用：

```text
/model
```

切換 Model。

因此「這個 Session 現在用哪個模型」是可操作 runtime state，而不是 static app setting。

## Session 操作

Pi 的 CLI 把 Tree Session 直接暴露成使用者能力。

常見操作：

```text
-c / continue
-r / resume
--session
--fork
--no-session
/tree
/fork
/clone
/compact
```

### Continue / Resume

適合接著最近或指定 session 繼續工作。

### `/tree`

直接查看 / 切換 session branch。

### Fork / Clone

Fork 偏向從既有 lineage 開新工作；Clone 則適合建立另一份 session context。

理解差異時不要只看 UI 動作，回到 `id / parentId` persisted model 會更清楚。

## Tool Surface

CLI 可以控制 tools：

```text
--tools
--exclude-tools
--no-builtin-tools
--no-tools
```

這是一個很實用的 security / context design knob。

例如 reviewer 不需要 write：

```text
read
grep
find
ls
```

就不要因為「也許有用」而順便開 `bash` / `write`。

## Resources

CLI 可以載入 / 關閉：

```text
extensions
skills
prompts
themes
context files
```

這讓你可以用同一個 Pi binary 組出很不同的 workflow。

遇到問題時先問：

```text
resource 有沒有被 discover？
project 是否 trusted？
extension 是否 reload？
active tool set 是什麼？
```

而不是先懷疑 Model。

## `/reload`

對 Extension / resource 開發特別重要：

```text
修改 TypeScript extension
→ /reload
→ 立即測試
```

這讓 Pi 很像一個可以在自身 runtime 裡快速迭代的 Agent development shell。

## Print / JSON Mode

不是所有工作都需要互動式 TUI。

一次性 automation 可以用 print / structured JSON output 路線，適合：

```text
shell pipeline
CI
batch evaluation
script wrapper
```

如果需要長時間雙向 control，再升級到 RPC / SDK。

## Project Trust

碰到陌生 project 時，`/trust` 相關行為要被視為 security decision。

Trust 主要控制 project-local resources 是否載入，不代表 tool execution 已被 sandbox。

所以 CLI 使用者仍應知道目前 process 的 OS permissions。

## 一個實用的日常閱讀流程

```text
1. 啟動 pi
2. 確認 model / provider
3. 確認 project trust
4. 確認 active tools
5. 讓 Agent 工作
6. 用 /tree 看探索路徑
7. Context 壓力高時 /compact
8. Extension 修改後 /reload
9. 需要另一條方向時 fork / branch
```

這條流程直接把 Pi 的 architecture 映射回產品 UX。

## 本章重點

1. **CLI 是 AgentSession 的 presentation surface，不是另一套 runtime。**
2. **Model、Session、Tools、Resources 都能從 CLI 明確控制。**
3. **`/tree` / fork / compact 直接反映 Pi 的 state architecture。**
4. **縮小 active tool set 是重要 capability control。**
5. **Project Trust 與 execution sandbox 要分開理解。**

## 官方來源

- [Pi Usage](https://pi.dev/docs/latest/usage)
- [Pi Models](https://pi.dev/docs/latest/models)
- [Pi Sessions](https://pi.dev/docs/latest/sessions)
