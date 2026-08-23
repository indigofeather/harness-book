---
title: Permission Profiles、Rules 與 Network Policy
---

# Permission Profiles、Rules 與 Network Policy

Sandbox 模式回答的是粗粒度 capability；現代 agent runtime 還需要更細的「哪些路徑、哪些 command、哪些 network domain、什麼條件下允許」。

## Permission Profiles

Permission profile 可以把一組 execution capabilities 命名化。內建概念通常包含 read-only、workspace、danger-full-access 等級；較新的 profile 模型可把 filesystem 與 network privilege 更明確地組合。

好處是 client 不必每次 turn 手工拼一堆低階設定，而是選擇一個經過治理的 profile。

## Rules：Command-aware policy

Codex rules 支援 `prefix_rule()` 這類規則，根據命令前綴做決策，例如：

```python
prefix_rule(
    pattern = ["git", "push"],
    decision = "prompt",
)
```

概念上的 decision：

- `allow`：允許。
- `prompt`：要求批准。
- `forbidden`：禁止。

如果多條規則同時符合，應以更限制性的結果為準，而不是「有一條 allow 就放行」。

## 為什麼不能只 blacklist `rm -rf`

Shell 能力可被組合：

```bash
python -c '...delete files...'
find ... -delete
node script.js
curl ... | sh
```

所以 command rules 是 defense-in-depth，不是完整 sandbox 的替代品。真正 filesystem / network boundary 仍應在 OS / executor 層 enforcement。

## Network 是獨立權限面

對 coding agent，network access 常比 filesystem write 更敏感，因為它涉及：

- data exfiltration；
- package supply chain；
- SaaS APIs；
- production resources；
- credentials/token；
- arbitrary downloads。

因此設計 permission 時，應把：

```text
filesystem: read/write scope
network: allowed domains / sockets / proxies
credentials: which secrets are injected
```

分開處理。

## Project Trust

Codex 對 project-level config 有 trust 概念。未信任 project 不應能藉由 repository 中的 `.codex/config.toml`、hooks、rules 等，自動提升 agent 的行為能力。

這是在防一種經典 supply-chain 問題：

> 你 clone 一個陌生 repo，光是打開它，repo 內的 agent config 就試圖執行惡意 hook 或放寬權限。

因此「repository content」本身也要被當成 untrusted input。

## Managed Policy

企業環境通常還需要比 user config 更高層的 managed restrictions，例如固定允許的 permission profiles、network destinations、approval requirements。

原則是：

```text
User preference 不能覆蓋 organization security boundary
```

這和一般 endpoint management / browser policy 的設計相同。

## 一個實用 Policy Matrix

| 工作 | Filesystem | Network | Approval |
|---|---|---|---|
| Code review | read-only | off/allowlisted | usually none |
| Local bug fix | workspace-write | package registry only | risky command prompt |
| Dependency update | workspace-write | registry + source hosts | lockfile/scripts review |
| Release automation | narrow write | release endpoints | deterministic machine policy |
| Production migration | prefer plan-only | prod allowlist | explicit human gate |

不要用「開 full access 比較方便」當 default。

## 來源

- [Permissions](https://learn.chatgpt.com/docs/permissions)
- [Rules](https://learn.chatgpt.com/docs/agent-configuration/rules)
- [Configuration basics](https://learn.chatgpt.com/docs/config-file/config-basic)
