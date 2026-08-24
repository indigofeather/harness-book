# Agent Harness 深度指南

一個以繁體中文撰寫的 Docusaurus 教材專案，用 **OpenAI Codex**、**DeepSeek Harness** 與 **Pi Agent Harness** 三套開源實作，對稱地理解 Agent Harness 的 Runtime、Model、Loop、Context、Tools、State、Security、Extensions、Integration 與 Production。

> 本專案不是 OpenAI、DeepSeek 或 Pi 官方教材。內容以官方文件、工程文章，以及 `openai/codex`、`deepseek-ai/deepseek-harness`、`earendil-works/pi` 開源原始碼交叉核對；系統性核對日期為 2026-08-24。

## 教材核心原則

三套 Harness 都是完整 case study，不是「Codex 主教材 + 另外兩套補充」。

```text
Codex
→ Productized / Opinionated Runtime

DeepSeek Harness
→ Composable Runtime Framework

Pi
→ Minimal / Self-extensible Harness
```

教材用同一組問題閱讀三套：

```text
Runtime center 在哪？
Model / Provider 怎麼接？
Agent Loop 怎麼跑？
Context 怎麼組？
Tools 怎麼執行？
State 怎麼保存 / resume / fork？
Security / Trust boundary 在哪？
Extensions 怎麼加入？
CLI / SDK / RPC / UI 怎麼整合？
Production correctness / governance 誰負責？
原始碼該從哪裡讀？
```

## 八個頂層章節

1. **Agent Harness 基礎**：vendor-neutral 的 Model / Loop / Context / State Models。
2. **Codex 完整導讀**：架構、Security、Customization、Usage / Integration。
3. **DeepSeek Harness 完整導讀**：Cordis、Model/Loop、Tools、State、Orchestration、Security、Headless、SDK、Production。
4. **Pi 完整導讀**：pi-ai、pi-agent-core、AgentSession、Session Tree、Resources、Extensions、Security、CLI、SDK、Governance。
5. **三套 Harness Labs**：每套三個 architecture-oriented hands-on labs。
6. **比較、選型與採用**：比較框架 → 架構維度 → 情境選型 → PoC / Adoption。
7. **真實系統與實務**：Workflow、Behavior Placement、自製 Harness、Production Checklist。
8. **參考資料與原始碼**：Glossary、三套 Source Map、官方閱讀清單、LLM exports。

## 三套內容對稱矩陣

| Responsibility | Codex | DeepSeek Harness | Pi |
|---|---|---|---|
| Runtime | `codex-core` | Cordis composition | `pi-agent-core` + `AgentSession` |
| Model | Model Providers | LLM Service / Adapters | `pi-ai` Providers |
| Loop | Codex Agent Loop | AgentLoop / Turn / Step | Agent / AgentSession loop |
| Context | instructions / tools / history / compaction | system prompt / session projection / compaction | current branch / resources / compaction |
| Tools | Tool runtime / MCP | `ctx.tools` pipeline | built-in + Extension tools |
| State | Thread / Turn / Item | SessionEvent log | JSONL Entry Tree |
| Extensions | AGENTS / Skill / MCP / Hook / Rule / Subagent | Plugin / Skill / Subagent / Workflow / Jobs / Events | Resources / Skills / Extensions / Pi Packages |
| Security | Sandbox / Approval / Rules | Sandbox / Approval / Credentials / Providers | Project Trust + Extension gates + external isolation |
| Integration | CLI / SDK / App Server | Web / CLI / SDK / JSON-RPC / ACP | TUI / Print / JSON / RPC / SDK |
| Production | productized runtime contracts | replay / invariants / test-support / telemetry | adoption-team governance / session & extension compatibility |

## Labs

```text
Codex
├─ Trace a Turn
├─ Guardrails
└─ Embed App Server

DeepSeek Harness
├─ Trace Turn / Step / Events
├─ Build a Capability Plugin
└─ Replay / Invariant

Pi
├─ Trace AgentSession / JSONL Session
├─ Build an Extension
└─ Branch / Tree / Compaction
```

## 網站能力

- 繁體中文單語教材
- Sidebar 作為網站與 LLM export 的 canonical reading order
- 明暗模式與 Mermaid 架構圖
- Mermaid 獨立檢視 / 縮放
- 每頁可複製 / 查看 Markdown
- 可直接將頁面帶入 ChatGPT、Claude、Perplexity、Gemini
- Build 產生 `llms.txt`、`llms-full.txt`、逐頁 Markdown
- 官方 screenshots / visual references 會附 upstream source 與 attribution

## Local development

需要 Node.js 20+ 與 Bun。

```bash
bun install
bun run start
```

檢查與 Build：

```bash
bun run typecheck
bun run build
```

## Deployment

以 Vercel 直接部署：

```text
Install Command: bun install
Build Command: bun run build
Output Directory: build
```

## 主要官方來源

### Codex

- https://developers.openai.com/codex
- https://openai.com/index/unrolling-the-codex-agent-loop/
- https://openai.com/index/unlocking-the-codex-harness/
- https://github.com/openai/codex

### DeepSeek Harness

- https://deepseek.com/harness/en/
- https://github.com/deepseek-ai/deepseek-harness
- https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md
- https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/README.md

### Pi

- https://pi.dev/
- https://pi.dev/docs/latest
- https://github.com/earendil-works/pi
- https://pi.dev/docs/latest/extensions
- https://pi.dev/docs/latest/sessions
- https://pi.dev/docs/latest/security

## License / attribution

教材為整理與解說性內容；引用之外部產品名稱、原始碼、官方圖片與文件各自依原始授權與條款。`openai/codex` repository 為 Apache-2.0；`deepseek-ai/deepseek-harness` 與 `earendil-works/pi` 為 MIT（請以 upstream 當前 LICENSE 為準）。

製作者：[Lance He](mailto:indigofeather@gmail.com)
