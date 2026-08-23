---
title: config.toml 與設定優先序
---

# `config.toml` 與設定優先序

Codex 的設定系統不是只有一個 `~/.codex/config.toml`。真正重要的是 **scope + precedence + project trust**。

## 常見設定來源

由高到低，概念上可整理為：

1. CLI flags / `--config` overrides；
2. trusted project 的 `.codex/config.toml`，從 project root 到 cwd，越近越優先；
3. profile config；
4. user `~/.codex/config.toml`；
5. system config，例如 `/etc/codex/config.toml`；
6. built-in defaults。

這個順序讓同一個 Codex binary 可以同時支援：

- organization baseline；
- user preference；
- project-specific behavior；
- 一次性 CLI override。

## Project config 為什麼要 Trust

如果任何 clone 下來的 repo 都能自動套用 hooks/rules/provider/auth config，光 `cd` 進目錄就可能改變 agent 的安全行為。因此 project config 只有在專案被信任時才應生效。

這也代表 troubleshooting 時要先問：

> 「這個 `.codex/config.toml` 沒生效，是內容錯，還是 project 尚未 trusted？」

## 個人設定範例

```toml
model = "gpt-5.3-codex"
model_reasoning_effort = "high"

[features]
# 依當前版本支援項目設定

[mcp_servers.docs]
command = "npx"
args = ["-y", "some-mcp-server"]
```

> 具體 model 名稱、feature flags 與 schema 會隨版本變化；請以當前 config reference / schema 為準，不要把網路上的舊範例當永久設定。

## Project-specific config

```text
repo/
├─ .codex/
│  └─ config.toml
├─ AGENTS.md
├─ packages/
└─ ...
```

適合放：

- 這個 repo 的 agent feature 設定；
- project-specific MCP；
- hooks / rules；
- agent definitions；
- environment-specific controls。

不適合把個人 API key commit 進 repository。

## Profile

Profile 適合切換工作模式，例如：

```text
work profile       → 公司 MCP / stricter policy
oss profile        → public repo / no company tools
research profile   → read-heavy / web tools
```

比每次手動改主 config 更可維護。

## 設定分類法

閱讀 config reference 時，不要只看 key 名稱，可以分成：

| 類別 | 例子 |
|---|---|
| Model | model, provider, reasoning effort |
| Context | instructions, compaction, project docs |
| Execution | sandbox / permission / environment |
| Tools | MCP, web, shell-related features |
| Agent | subagents, skills, collaboration |
| Lifecycle | hooks, history, thread behavior |
| Telemetry | logging / OTEL / diagnostics |

這會比背幾百個 config fields 更有效。

## Schema-driven config

當 config 面積很大，建議讓 editor 使用官方 schema。好處：

- autocomplete；
- enum validation；
- deprecated field 提示；
- 減少拼字錯誤。

Production integration 更應把 versioned schema 當 compatibility contract，而非 parsing arbitrary TOML 後「猜」意思。

## 常見錯誤

### 把安全 policy 放在最低優先層

如果 organization policy 必須不可被 user override，就不能只靠普通 user config precedence；要使用 managed policy / deployment-level enforcement。

### 把所有 project knowledge 塞 config

Config 是機器行為設定；開發慣例與教學文字放 AGENTS.md；特定任務流程放 Skill。

### 在 repo commit secrets

MCP auth/secret 應使用環境變數、credential store 或外部 secret mechanism。

## 來源

- [Config basics](https://learn.chatgpt.com/docs/config-file/config-basic)
- [Config reference](https://learn.chatgpt.com/docs/config-file/config-reference)
