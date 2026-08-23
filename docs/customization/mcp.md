---
title: MCP：把外部能力接進 Harness
---

# MCP：把外部能力接進 Harness

MCP（Model Context Protocol）讓 Codex 能連接外部 tool/resource server，而不必把每個 SaaS/API integration 寫死在 core。

## MCP 在架構上的位置

```text
Codex core
   ↓ MCP client
MCP server
   ├─ tools
   ├─ resources
   └─ auth / remote API
```

對模型來說，MCP tool 最後仍會變成可選 tool schema；對 harness 來說，還要管理 server lifecycle、transport、timeout、auth、tool exposure。

## Stdio MCP

典型 config：

```toml
[mcp_servers.example]
command = "npx"
args = ["-y", "my-mcp-server"]
startup_timeout_sec = 10
tool_timeout_sec = 60
```

適合本機 process server。Harness 負責啟動 process 並用 stdio protocol 溝通。

## HTTP MCP

Remote MCP 適合 SaaS/team-shared capability。通常還需要：

- URL；
- bearer token / auth flow；
- headers；
- timeout；
- TLS / network policy。

Credential 應透過 environment/secret mechanism，不要寫死在 repo config。

## Tool exposure

MCP server 可能提供 50 個 tools，但 agent 任務只需要 3 個。可以透過 enabled/disabled tools 等機制縮小 exposure。

這同時改善：

- security surface；
- tool selection accuracy；
- context size；
- accidental side effects。

## `required` server

若某 workflow 沒有某 MCP 就根本不能正確執行，可以把 server 視為 required。這讓啟動時直接 fail，而不是 agent 跑到一半才發現關鍵工具不存在。

這是 production 的 **fail-fast** 原則。

## MCP Tool 的安全模型

務必把 MCP server 當成獨立 security principal：

```text
Codex local sandbox             Remote MCP permission
-------------------             ---------------------
workspace write                 GitHub token: repo admin?
no network                      server itself still has network?
read-only local files           database tool still writes prod?
```

本地 sandbox 與 remote API permission 是不同維度。

## Tool description 設計

MCP server author 需要替 agent 設計工具，而不是直接把 REST API 一比一映射成 200 個 endpoints。

好 tool：

- intent 明確；
- input schema 小；
- output 結構化；
- side effect 可辨認；
- errors 可修復；
- read/write action 分離。

例如把：

```text
POST /repos/:owner/:repo/issues/:id/comments
```

包成：

```text
add_issue_comment(repo, issue_number, body)
```

對 agent routing 更友善。

## MCP vs Skill

常常兩者要一起：

- MCP 給工具：「可以查 deployment、建立 incident」。
- Skill 給流程：「incident 發生時先查 metrics → logs → recent deploy → 建立 timeline」。

工具與程序分開，重用性更高。

## 來源

- [MCP docs](https://learn.chatgpt.com/docs/extend/mcp)
- [`codex-rs/codex-mcp`](https://github.com/openai/codex/tree/main/codex-rs/codex-mcp)
- [`codex-rs/mcp-server`](https://github.com/openai/codex/tree/main/codex-rs/mcp-server)
