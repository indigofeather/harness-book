---
title: Lab：加入一個 DeepSeek Capability
---

# Lab：加入一個 DeepSeek Capability

這個 Lab 練的是 DeepSeek Harness 最核心的設計語言：

```text
Service / Registry
→ Provider
→ Consumer
→ Composition
```

你不需要改 Agent Loop，就能讓 Agent 多一個能力。

## 任務

做一個 read-only 的 project metadata tool，例如回傳：

```json
{
  "branch": "main",
  "packageManager": "bun",
  "hasTests": true
}
```

重點不是功能本身，而是能力應該放在哪個 boundary。

## 1. 先決定 Responsibility

這是一個：

```text
Model-facing Tool
→ 讀取 repository metadata
→ read-only side effect class
```

因此優先走 Tool Registry，而不是：

- 修改 system prompt；
- 修改 agent-loop；
- 在 UI 特判。

## 2. 建立 Plugin

依官方 Extension Cookbook 建立一個 plugin，將 tool definition 註冊到 `ctx.tools`。

概念結構：

```ts
export default function plugin(ctx) {
  ctx.tools.add({
    name: 'project_metadata',
    // schema + execute
  })
}
```

實際 API 以你當下 pin 的版本與官方 cookbook 為準。

## 3. 讓 Tool 只依賴需要的 Capability

如果只是讀 workspace，不要順便拿：

```text
network
credentials
arbitrary shell
```

理想依賴：

```text
project_metadata Tool
→ filesystem / project context
```

這是在練 capability minimization。

## 4. Mount 到 Profile

把 plugin 加入測試 profile / patch，然後：

```bash
dsh --profile <your-profile> --dump-config
```

確認它真的被 mount。

如果 Tool 沒出現，依序查：

```text
Plugin row 存在？
Dependency satisfy？
Provider mount 成功？
Tool definition 被 register？
Model-facing schema 被 assemble？
```

## 5. 觀察 Tool Pipeline

執行一個需要 metadata 的任務，確認路徑：

```text
Model tool call
→ tools/pre-execute
→ guard / policy
→ execute
→ post-execute
→ result
→ next Step
```

## 6. 替換 Backend

進階練習：不要讓 Tool implementation 直接綁 Node filesystem。

抽成：

```text
ProjectMetadata consumer
→ FS / project capability
← Local provider
```

再寫一個 fake provider 給 test。

這一步才真正體會 Capability Seam 的價值。

## 7. Teardown 測試

因為 Cordis 強調 reversible effects，卸載 plugin 後確認：

- Tool 不再存在；
- listener 被清理；
- provider 不殘留；
- remount 不產生 duplicate registration。

## 完成標準

你能回答：

> **新增 Model capability 為什麼通常應該是 Plugin / Provider，而不是去改 Agent Loop？**

## 官方來源

- [Extension Cookbook](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cookbook/extension-cookbook.md)
- [Tools subsystem](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/tools.md)
