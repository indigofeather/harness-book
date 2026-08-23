---
title: Lab 2：做一套 Guardrails
---

# Lab 2：做一套 Guardrails

目標：把「請不要做危險操作」改造成 deterministic control。

## 情境

假設 project 規則：

- 可以讀全部 repo；
- 可以改 workspace；
- 不能 `git push --force`；
- production-related command 必須 approval；
- 不允許任意外網，只需要 package registry。

## Step 1：AGENTS.md 寫行為意圖

```md
## Safety
- Never force-push shared branches.
- Production operations require explicit user authorization.
```

這讓 model 知道原因，但還不是 enforcement。

## Step 2：Rules 阻擋命令

依當前 Codex rules syntax 建立類似：

```python
prefix_rule(pattern=["git", "push", "--force"], decision="forbidden")
```

再針對 deployment command 設 prompt/approval。

## Step 3：Network 收窄

只允許真正需要的 domain。不要因為 package install 偶爾需要網路，就把 unrestricted network 當 default。

## Step 4：Hook 做 Audit

PreToolUse 記錄：

```json
{
  "tool": "shell",
  "cwd": "...",
  "decision": "...",
  "timestamp": "..."
}
```

Hook 是 observation/guardrail；真正禁止仍由 rule/permission/sandbox 保證。

## Step 5：測試繞路

安全測試不能只測 exact string：

```text
git push --force
```

還要思考：

```text
git push -f
shell script wrapper
alias
python subprocess
MCP GitHub write tool
```

你會發現 command rule 只能保護它看得到的 action surface，因此仍需要 filesystem/network/remote IAM 等多層控制。

## 完成標準

你應該能清楚指出每條規則在哪一層 enforcement：

```text
Behavior guidance → AGENTS
Command policy    → Rules
Filesystem        → Sandbox/Permission
Network           → Network policy
Remote API        → MCP credential/IAM
Audit             → Hook/Telemetry
```
