---
title: AGENTS.md：Repository Instructions
---

# `AGENTS.md`：Repository Instructions

`AGENTS.md` 最適合放「這個 repository 的 agent 必須知道，但不容易光靠讀 code 推斷」的規則。

## 搜尋模型

Codex 會從 global 與 project hierarchy 載入 instructions。Project 內會沿著 root → cwd 找，越靠近工作目錄的 guidance 越具體。

常見檔案：

```text
$CODEX_HOME/AGENTS.md
repo/AGENTS.md
repo/packages/api/AGENTS.md
repo/packages/api/AGENTS.override.md
```

同一層若存在 override，會優先於一般 AGENTS；nested guidance 可以針對局部 codebase 覆寫上層規則。

## 好的 AGENTS.md 寫什麼

### Build / test truth

```md
## Validation
- TypeScript changes: `pnpm typecheck`
- API changes: `pnpm test:api`
- Never use `npm`; this repo is pnpm-only.
```

### Architecture invariants

```md
## Data access
- HTTP handlers must not query PostgreSQL directly.
- Use repositories under `src/data/`.
```

### Generated files

```md
- Do not edit `src/generated/**` manually.
- Run `pnpm generate` after schema changes.
```

### Review rules

```md
When changing auth code, verify:
1. session invalidation
2. CSRF behavior
3. audit logging
```

## 不適合放什麼

### 大篇 project documentation

模型能從 README/docs 按需讀取的內容，不必全注入每個 turn。

### 任務-specific 操作手冊

「發布 npm 套件的 27 步流程」更適合 Skill，因為不是每個 turn 都需要。

### 強制 security enforcement

「禁止 `git push --force`」如果真的不可違反，應搭配 rule/policy，而不是只寫 prose。

## Context budget

Project instructions 會消耗 context。Codex 對 project docs/instructions 有 size limit，且 source 自己也強調 injected context 要 bounded。

好的 AGENTS.md 應該：

- concise；
- high signal；
- deterministic；
- 避免重複 README；
- 用 command / path / invariant 取代抽象口號。

## Nested instructions 的價值

Monorepo 特別適合：

```text
AGENTS.md                       # repo-wide
packages/frontend/AGENTS.md     # React rules
packages/backend/AGENTS.md      # DB/API rules
infra/AGENTS.override.md        # infra 特別嚴格
```

這讓 agent 進入不同 cwd 時取得最相關規則，不必把所有 team 的規則塞在根目錄。

## 與 Skill 的分工

| AGENTS.md | Skill |
|---|---|
| 每次在此 code scope 都相關 | 特定任務才載入 |
| repository invariant | workflow/procedure |
| 短、常駐 context | progressive disclosure |
| 例如 test command | 例如 release procedure |

## 建議模板

```md
# Repository Guidance

## Stack
- Node 22, pnpm, TypeScript strict.

## Architecture
- Domain logic lives in `src/domain`.
- Route handlers are thin adapters.

## Commands
- Test: `pnpm test`
- Typecheck: `pnpm typecheck`
- Lint: `pnpm lint`

## Safety
- Never edit generated files directly.
- Do not run production migrations from local tasks.

## Review
- Add tests for bug fixes.
- Prefer small changes; avoid unrelated refactors.
```

## 來源

- [AGENTS.md guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [`openai/codex` AGENTS.md](https://github.com/openai/codex/blob/main/AGENTS.md)
