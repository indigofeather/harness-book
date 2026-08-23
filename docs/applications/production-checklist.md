---
title: Production Harness Checklist
---

# Production Harness Checklist

把 agent 放到 production 前，用這份 checklist 檢查「不是模型能力」的那 80% 工程。

## Model / Provider

- [ ] Provider timeout、retry、rate limit 已定義。
- [ ] Model capability/version 是顯式設定，不靠隱含 default。
- [ ] Streaming parser 能處理 unknown/new events。
- [ ] Provider failure 不會重複已完成的 external side effect。

## Context

- [ ] Instructions 有 deterministic precedence。
- [ ] Stable prefix 不會每輪無故改寫。
- [ ] Tool schemas deterministic ordering。
- [ ] Tool output 有 size limit/truncation。
- [ ] 有 context budget 與 compaction 策略。
- [ ] Secret / PII 進 context 前有 policy。

## Tools

- [ ] 每個 tool schema 小且可驗證。
- [ ] Read/write/external side effects 有分類。
- [ ] Timeout/cancel 有效。
- [ ] Error 可交回模型自我修正。
- [ ] External write 有 idempotency strategy。
- [ ] Parallel tool execution 不會踩 shared state。

## Security

- [ ] Filesystem default 最小權限。
- [ ] Network default 與 allowlist 明確。
- [ ] Credentials 依 tool/job 最小化。
- [ ] Repo content 視為 untrusted input。
- [ ] MCP server 各自完成 threat model。
- [ ] Hook 不被當成唯一 enforcement boundary。
- [ ] Approval UI 顯示具體 action/risk。
- [ ] CI 不暴露高權限 secret 給 untrusted code。

## State

- [ ] Thread/turn/item IDs stable。
- [ ] Turn completion/failure/interruption 可區分。
- [ ] Persistence 與 model context projection 分離。
- [ ] Fork/resume semantics 定義清楚。
- [ ] Event append/replay 有 ordering guarantee。
- [ ] Ephemeral mode 不意外持久化敏感 transcript。

## Client Protocol

- [ ] Request/response correlation。
- [ ] Server notifications 與 server→client requests 都能處理。
- [ ] Reconnect 後可取 authoritative state。
- [ ] Backpressure 有策略。
- [ ] Version/capability negotiation。
- [ ] UI 不從 human-readable terminal text 解析 domain state。

## Observability

- [ ] Turn latency。
- [ ] Model latency / retries。
- [ ] Tool latency / failures。
- [ ] Approval wait time。
- [ ] Token/cache/compaction 指標。
- [ ] 每次 external side effect 有 trace correlation。
- [ ] Log 不會洩漏 secrets。

## Evaluation

- [ ] 有固定 repository/task eval set。
- [ ] 評估完成率，不只 final answer 文筆。
- [ ] 評估 tool correctness / unnecessary calls。
- [ ] 評估 destructive action rate。
- [ ] 評估 token / latency / cache efficiency。
- [ ] 重大 harness/config 變更有 regression test。

## Operational Boundaries

- [ ] Agent 可以做什麼，文件明確。
- [ ] Agent 絕對不能做什麼，靠 enforcement 實現。
- [ ] Production destructive action 有 human/machine gate。
- [ ] 有 kill switch / interrupt。
- [ ] 有 credential rotation / revocation 路徑。

## 最後一題

如果今天模型突然做了一個「非常有說服力但完全錯誤」的決定，你的系統是否仍能把 damage 限制在可接受範圍？

如果答案是否定，問題不在 prompt，而在 harness architecture。
