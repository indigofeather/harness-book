---
title: Lab：寫一個 Pi Extension
---

# Lab：寫一個 Pi Extension

這個 Lab 用最小 Extension 同時練三件事：

```text
register Tool
listen lifecycle
reload without changing core
```

## 任務

建立一個 project-local Extension，提供 read-only `project_summary` tool。

它只回傳：

```text
current cwd
package manager hint
known script names
```

不要執行 destructive action。

## 1. 建立 Extension

放到 project 的 `.pi/extensions/`。

結構概念：

```ts
export default function (pi) {
  pi.registerTool({
    name: 'project_summary',
    // description / schema / execute
  })
}
```

實際 types / helper 以當前 Pi Extensions 文件為準。

## 2. 先觀察 Project Trust

因為這是 project-local executable resource，先確認 Pi 是否要求 trust。

這一步不是麻煩，而是 Lab 的一部分：

> **為什麼一個 repo 裡的 TypeScript Extension 不能在 clone 後自動無條件執行？**

## 3. `/reload`

Extension 修改後：

```text
/reload
```

確認不需要重啟整個工作流程就能看到新 tool。

## 4. 讓 Model 使用 Tool

請 Agent：

```text
use project_summary and tell me what kind of project this is
```

觀察：

```text
model tool call
→ extension interception / tool execution
→ result
→ next model iteration
```

## 5. 加一個 Lifecycle Listener

再加入一個只記錄 metadata 的 listener，例如 Tool 完成時紀錄：

```text
tool name
success / failure
duration
```

不要把 secret / full command output 無限制寫到 log。

## 6. 寫 Durable Extension State

進階：用 custom session entry 保存：

```text
project_summary version
last analyzed commit
```

重新 resume session，確認 state 仍能讀取。

這一步讓你看到 Extension 不只可以「當下改行為」，也能建立自己的 durable contract。

## 7. 想一次 Security

回答：

```text
這個 Extension 有什麼 OS permission？
Project Trust 限制的是什麼？
如果 Tool 改成 bash，真正 sandbox 在哪裡？
```

正確答案不能是「Extension 有 popup 所以安全」。

## 完成標準

你能說明：

> **Pi 把很多產品行為推出 core，是因為 Extension 能同時擴充 Tool、Lifecycle、UI 與 Durable State。**

同時也知道：這種自由度會把治理責任交給 Extension owner。

## 官方來源

- [Pi Extensions](https://pi.dev/docs/latest/extensions)
- [Pi Security](https://pi.dev/docs/latest/security)
