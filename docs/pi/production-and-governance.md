---
title: Production 與 Governance：Minimal Harness 的責任清單
---

# Production 與 Governance：Minimal Harness 的責任清單

Pi 可以很快被改造成高度客製的 Coding Agent，但 production 使用真正要問的是：

> **哪些責任 Pi 已經幫你做掉，哪些責任因為 minimal philosophy 會落到你的團隊？**

這不是缺點清單，而是 ownership map。

## Pi 已提供的穩定 building blocks

```text
multi-provider model layer
stateful Agent core
AgentSession
JSONL session tree
compaction / branch summary
resource discovery
TypeScript extensions
TUI / Print / JSON / RPC / SDK
```

這些足以建立功能完整的 Agent workflow。

## 你通常要自行擁有的 Production Responsibility

```text
strong sandbox / container
enterprise approval protocol
network policy
credential isolation
extension allowlist
package provenance
custom session-entry migrations
central telemetry / audit
multi-agent conventions
upgrade compatibility tests
```

Pi 的 minimal design 讓這些不是被單一 first-party product model 固定住。

## Extension Governance

Extension 是 full-permission Node.js code，所以 production 不能只做：

```text
npm install some-extension
→ trust forever
```

至少應有：

```text
source / owner
version pin
review status
required permissions
secret access
session schema impact
tool surface impact
upgrade test
```

可以把 Extension 當成內部 runtime dependency，而不是 prompt asset。

## Pi Package Governance

Package 可能同時帶：

```text
Extension
Skill
Prompt
Theme
```

因此 review 時要區分：

```text
純文字 guidance risk
vs
executable extension risk
```

不要因為都裝在同一個 Package，就用同一層審核強度。

## Session Schema Governance

Custom Extension 可以 append durable entry。

一旦 production workflow 依賴這些 custom facts，就要回答：

```text
schema version 是什麼？
新版 extension 能讀舊 session 嗎？
移除 package 後舊 entry 怎麼處理？
branch / compaction 後 custom state 還有效嗎？
```

這是 minimal extensibility 常被忽略的長期成本。

## Observability

SDK / Agent events 提供足夠 observation surface，但 enterprise platform 通常還要定義自己的：

```text
turn / task latency
token / model usage
tool executions
command audit
branch / compact events
error taxonomy
user interventions
extension failures
```

Pi 不會替你決定唯一 telemetry backend，這也意味著你可以接現有 OTel / internal observability。

## Upgrade Strategy

Pi 活躍演進時，Production 不應讓 extension ecosystem 跟著 `latest` 自動漂移。

建議：

```text
pin Pi version
pin Pi Packages
contract-test custom extensions
resume old sessions
run tool smoke tests
run RPC / SDK protocol tests
verify provider catalog / auth
verify container image
```

尤其是直接使用較低階 SDK runtime objects 的產品，upgrade test 要比只使用 CLI 更完整。

## Security Ownership Matrix

| Responsibility | Pi Default | Production Owner |
|---|---|---|
| Project resource trust | 有 Project Trust | team 定義 policy |
| Tool allowlist | 可配置 | app / workflow |
| Approval UX | 可用 Extension 自建 | app / extension |
| Filesystem confinement | 無 built-in | OS / container / sandbox |
| Network policy | 無統一 built-in | execution platform |
| Credentials | provider / process config | platform / secret system |
| Extension provenance | 可安裝 package | organization governance |

這張表是採用 Pi 前最值得填的內容。

## 什麼情況 Pi 很適合 Production？

如果團隊本來就有：

```text
container / worker platform
secret management
package governance
observability
TypeScript expertise
```

Pi 的 minimal core 可能反而降低重複 abstraction：Harness 不會和你爭 execution / policy ownership。

## 什麼情況要更保守？

如果期待的是：

```text
裝完就有統一 sandbox
統一 approval UX
固定 enterprise policy model
first-party multi-agent semantics
中央 admin governance
```

那採用 Pi 時要先把缺的 platform layer 成本估進來。

## 一個 Adoption Gate

```text
[ ] 能在隔離環境完成真實 coding task
[ ] tool surface 可明確最小化
[ ] project trust policy 可自動化
[ ] credentials 不直接灑進 workspace
[ ] custom extensions 有 owner / pin / tests
[ ] old session 可跨 upgrade resume
[ ] RPC / SDK cancel / failure semantics 已測
[ ] telemetry 能追 tool / model / session
[ ] container / network policy 有明確 owner
```

全部通過後，才代表你驗證的是 production Harness，而不是只驗證 TUI 能不能回答問題。

## 本章重點

1. **Pi 的 production burden 主要來自 ownership freedom，而不是 runtime 不完整。**
2. **Extension / Package 必須被當成高權限 supply-chain dependency。**
3. **Custom durable state 會產生 schema migration responsibility。**
4. **已有 execution / secret / telemetry platform 的團隊可能特別適合 Pi。**
5. **採用前應把 Security、Governance、Upgrade responsibility 寫成明確 owner matrix。**

## 官方來源

- [Pi Security](https://pi.dev/docs/latest/security)
- [Pi Extensions](https://pi.dev/docs/latest/extensions)
- [Pi SDK](https://pi.dev/docs/latest/sdk)
- [`earendil-works/pi`](https://github.com/earendil-works/pi)
