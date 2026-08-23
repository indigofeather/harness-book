---
title: Glossary
---

# Glossary

## Agent
能根據目標反覆推理、呼叫工具、觀察結果再採取下一步的系統。模型只是 agent 的一部分。

## Agent Loop
Model → action/tool → observation → model 的反覆控制迴路，直到 turn 完成。

## Harness
協調 model、context、tools、execution、policy、state 與 client lifecycle 的 runtime。

## Context
某次 model inference 真正收到的 instructions、tools metadata、history、environment、user input 等總和。

## Context Window
模型單次可處理 token 的容量上限。

## Compaction
將較舊 history 壓縮成後續推理所需的 durable state，以控制 context budget。

## Prompt Caching
當後續 request 保留相同前綴時，provider 可重用先前 prompt 計算的機制。Harness 透過 stable prefix / append-only growth 提高命中機會。

## Tool
模型可提出呼叫的結構化能力，例如 shell、file edit、web、MCP tool。

## Tool Schema
描述 tool name、用途、arguments/result 結構的 machine-readable contract。

## MCP
Model Context Protocol。讓 agent host 以標準方式連接外部 tools/resources/server。

## Skill
按需載入的專門工作流程/知識包。核心特色是 progressive disclosure。

## Plugin
可分發的一組 Codex capability bundle；具體能力與格式依版本演進。

## Hook
在 session/tool/permission/compaction 等 lifecycle event 執行 deterministic handler 的擴充點。

## AGENTS.md
Repository-scoped agent instructions，可依 global/project/nested scope 載入與覆寫。

## Sandbox
在 execution layer 限制 filesystem/process/network 等技術能力的隔離機制。

## Approval
當 action 需要額外授權時，交由 user/reviewer 決策的流程。

## Permission Profile
一組命名化 capability/policy 設定，用來選擇 thread/turn 的權限組合。

## Rule
針對特定 action/command pattern 做 allow/prompt/forbidden 等 deterministic policy。

## Thread
可跨多個 turn 延續的 agent conversation/session。

## Turn
一次 user intent 到 agent completion/interruption 的工作單位。

## Item
Turn 中的細粒度內容/事件，例如 message、reasoning、shell command、file edit、tool result。

## App Server
Codex 的完整 harness integration surface，以 JSON-RPC-lite 的雙向 protocol 讓 rich clients 操作 thread/turn/items/config/auth 等。

## JSON-RPC-lite
App Server 使用的 request/response/notification pattern，語意類似 JSON-RPC 2.0，但 wire 格式省略標準 `jsonrpc` header。

## JSONL
一行一個 JSON object，適合 stdio streaming protocol 與 `codex exec --json`。

## Steering
在 active turn 執行中補充/調整 user input 的能力。

## Fork
從既有 thread/history boundary 建立新 thread 分支。

## Ephemeral Thread
不保存 durable session history 的暫時 thread。

## Worktree
Git 讓同一 repository 同時存在多個獨立 working directories/branches 的功能，適合平行 agent writes。

## Subagent
由 root agent 派生、負責特定子任務的 agent runtime/thread。

## Backpressure
當 event producer 速度高於 consumer 時，系統用 bounded queue、拒絕/重試等方式避免記憶體無限制成長。

## Idempotency
相同 operation 因 retry 重複執行時，不造成重複副作用的性質/設計。
