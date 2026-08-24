---
title: Production Harness Checklist
---

# Production Harness Checklist

把 Agent 放到 production 前，不要只問「模型夠不夠強」。真正需要驗證的是 Harness 是否能在模型判斷錯誤時，仍把 damage、cost 與 operational risk 限制在可接受範圍。

這份 checklist 刻意不用 Codex / DeepSeek / Pi 的特定名詞，讓三套都能套用。

## 1. Model / Provider

- [ ] Provider timeout、retry、rate limit 已定義。
- [ ] Model capability / version 顯式設定，不靠不透明 default。
- [ ] Streaming parser 能容忍 unknown / future event。
- [ ] Provider retry 不會重複已完成的 external side effect。
- [ ] Model route / credential / fallback 有清楚 ownership。
- [ ] Model switch 後 context / tool compatibility 已驗證。

## 2. Context

- [ ] Instructions 有 deterministic precedence。
- [ ] Stable prefix 不會每輪無故改寫。
- [ ] Tool schemas ordering deterministic。
- [ ] Tool output 有 size limit / truncation / locator。
- [ ] 有 context budget 與 compaction 策略。
- [ ] Secret / PII 進 context 前有 policy。
- [ ] Durable state 與 model-facing projection 分離。
- [ ] Compaction 後仍保留 constraints、unresolved work、critical IDs。

## 3. Agent Loop

- [ ] 一個 user task 可跨多個 model/tool steps，而 lifecycle boundary 清楚。
- [ ] Cancel / interrupt 能停止新工作並收斂已開始的工作。
- [ ] Retry policy 有上限、backoff 與 terminal failure semantics。
- [ ] Steering / follow-up / queued input 的 ordering 定義清楚。
- [ ] Runaway turn 有 budget、deadline 或 kill path。
- [ ] Model failure、tool failure、policy denial 不會混成同一種 error。

## 4. Tools / Capabilities

- [ ] 每個 tool schema 小且可驗證。
- [ ] Read / local write / process / network / external write / destructive 有分類。
- [ ] Timeout / cancel 有效。
- [ ] Tool error 能以 structured observation 回到 Agent。
- [ ] External write 有 idempotency strategy。
- [ ] Parallel calls 不會踩 shared state。
- [ ] Tool registry 不會把不必要能力全部暴露給所有 Agent。
- [ ] Capability provider 與 consumer 的 contract 有測試。

## 5. Security / Trust Boundary

- [ ] Filesystem default 是最小權限。
- [ ] Network default 與 allowlist 明確。
- [ ] Credentials 依 operation / tool / job 最小化。
- [ ] Repo / prompt / skill / extension content 視為 untrusted input。
- [ ] 外部 Tool / MCP / Plugin / Extension 各自完成 threat model。
- [ ] Hook / callback 不被誤當成唯一 enforcement boundary。
- [ ] Approval UI 顯示具體 action、target 與 risk。
- [ ] Headless mode 在無人可回答 approval 時 fail closed。
- [ ] CI 不把高權限 secret 暴露給 untrusted code。
- [ ] Resource trust 與 execution isolation 沒被混為一談。

## 6. Execution World

- [ ] Local / container / remote workspace 的 boundary 明確。
- [ ] Filesystem、process、terminal、network 指向同一個 coherent execution world。
- [ ] Workspace escape、symlink、mount 等 edge case 有測試。
- [ ] Remote execution 的 artifact transfer 與 cleanup semantics 明確。
- [ ] Sandbox enforcement strength 可以被觀察，而不是只回傳 enabled/disabled。

## 7. State / Persistence

- [ ] Session / thread / run identifiers stable。
- [ ] Completed / failed / interrupted / cancelled 可區分。
- [ ] Persistence 與 context projection 分離。
- [ ] Resume semantics 定義清楚。
- [ ] Fork / branch semantics 若存在，lineage 不會遺失。
- [ ] Event / entry ordering 有 guarantee。
- [ ] Replay / reconstruction 能驗證 correctness。
- [ ] Ephemeral mode 不意外持久化敏感 transcript。
- [ ] Schema / session format 有 migration strategy。

## 8. Extensions / Plugins / Skills

- [ ] Extension lifecycle 有 install / load / unload / failure boundary。
- [ ] 第三方 extension provenance 可追蹤。
- [ ] Version compatibility 有測試或明確限制。
- [ ] Extension 能力權限不會因「同 process」被默認全部信任。
- [ ] Skills / resources 使用 progressive disclosure，避免 context 污染。
- [ ] Runtime self-modification 若存在，有 approval / audit / rollback。

## 9. Client / Integration Protocol

- [ ] Request / response correlation。
- [ ] Server notifications 與 server→client requests 都能處理。
- [ ] Reconnect 後可取得 authoritative state。
- [ ] Backpressure 有策略。
- [ ] Version / capability negotiation。
- [ ] UI 不從 terminal human-readable text 解析 domain state。
- [ ] Approval / interrupt / resume 都有 machine-readable protocol。
- [ ] SDK / RPC / App Server 等 boundary 有 contract tests。

## 10. Observability

- [ ] Task / turn latency。
- [ ] Model latency / retries / route。
- [ ] Tool latency / failures / denials。
- [ ] Approval wait time。
- [ ] Token / cache / compaction 指標。
- [ ] 每次 external side effect 有 trace correlation。
- [ ] State append / replay / resume 可追蹤。
- [ ] Log 不會洩漏 secrets。
- [ ] 可區分 Agent decision 與 Harness enforcement outcome。

## 11. Evaluation

- [ ] 有固定 repository / task eval set。
- [ ] 評估 task completion，不只 final answer 文筆。
- [ ] 評估 tool correctness / unnecessary calls。
- [ ] 評估 destructive / denied action rate。
- [ ] 評估 token / latency / cache efficiency。
- [ ] 評估 resume / compaction 後是否保留關鍵 constraints。
- [ ] 重大 Harness / config / extension 變更有 regression test。
- [ ] Upgrade 前後以相同 eval 比較，不憑體感上線。

## 12. Operational Governance

- [ ] Agent 可以做什麼，文件明確。
- [ ] Agent 絕對不能做什麼，由 enforcement 實現。
- [ ] Production destructive action 有 human / machine gate。
- [ ] 有 kill switch / interrupt。
- [ ] 有 credential rotation / revocation 路徑。
- [ ] 有 extension / plugin disable path。
- [ ] 有 rollback / previous-version pinning strategy。
- [ ] Incident 時能快速回答「是哪個 model、tool、provider、extension、policy 造成？」

## 13. 三套 Harness 特別要多問什麼？

### Codex

- App Server / client protocol 版本是否和 client 相容？
- Sandbox / approval / rules 是否符合 deployment boundary？
- Skill / MCP / Hook 是否被放在正確 abstraction？

### DeepSeek Harness

- 最終 boot 的 Plugin Tree 是否符合預期？
- Provider / Consumer dependency 是否完整？
- `full` / `partial` enforcement 是否被產品層正確處理？
- Event replay / invariant 是否通過？

### Pi

- Project Trust 是否被錯當 sandbox？
- Extension provenance / permissions 是否可治理？
- External container / sandbox 是否真的覆蓋 execution boundary？
- Session Tree / custom entries 的 compatibility 是否有測試？

## 最後一題

如果今天模型突然做了一個**非常有說服力但完全錯誤**的決定，你的系統是否仍能：

```text
限制 capability
→ 阻止高風險 side effect
→ 保留 audit trail
→ 正確停止 / rollback
→ 讓人知道發生了什麼
```

如果答案是否定，問題通常不在 prompt，而在 Harness architecture。
