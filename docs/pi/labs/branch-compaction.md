---
title: Lab：Branch、Tree 與 Compaction
---

# Lab：Branch、Tree 與 Compaction

這個 Lab 專門驗證 Pi 最有辨識度的 state model：**同一個 Session 是一棵可操作的 JSONL Tree。**

## 任務

讓 Agent 對同一個小問題探索兩種方案，然後在 `/tree` 間切換，最後做一次 compaction。

## 1. 建立共同 Prefix

先請 Agent：

```text
分析目前的 validation 邏輯，先不要修改；列出兩種可能修法。
```

取得共同探索 history 後，再選方案 A 繼續。

## 2. 走方案 A

讓 Agent 多做幾步 read / test，形成：

```text
A → B → C → D
```

記住目前 leaf。

## 3. `/tree` 回到 B

打開：

```text
/tree
```

回到分歧前的 entry，再走方案 B：

```text
        C → D
       /
A → B
       \
        E → F
```

觀察官方 Tree UI 如何表達這個 persisted lineage。

## 4. 檢查 JSONL

在 session file 中確認：

```text
C.parentId = B.id
E.parentId = B.id
```

這證明 branch 不是 UI 假象，而是 data model 本身。

## 5. Branch Summary

從一條有重要發現的 branch 切走時，觀察是否產生 / 使用 branch summarization。

問自己：

```text
哪些 knowledge 被帶到新 branch？
哪些 raw tool output 沒必要帶？
summary 是否保留 user constraint？
```

## 6. `/compact`

在 active branch 做：

```text
/compact
```

再檢查 session entries。

你要能區分：

```text
Branch Summary
→ 為了離開某條探索路徑時保留 knowledge

Compaction
→ 為了降低 context window 壓力
```

## 7. Resume

關閉 Pi 再 resume session，確認：

- tree lineage 仍存在；
- active branch 可重建；
- compacted history 正確；
- 其他 branch 沒被刪掉。

## 8. 和 Git Branch 不要過度類比

Pi Session Tree 類似 branch，但不是 Git object database。

它主要保存：

```text
Agent trajectory
messages
runtime metadata
summaries
custom entries
```

而不是 filesystem snapshot。

因此 session branch 與 git worktree 可以同時存在，是兩個不同 isolation/state layer。

## 完成標準

你能從 JSONL 本身解釋：

> **Pi 的 fork / tree navigation 為什麼不需要複製整份 conversation。**

並能清楚區分 branch summarization 與 compaction。

## 官方來源

- [Pi Sessions](https://pi.dev/docs/latest/sessions)
- [Session File Format](https://pi.dev/docs/latest/session-format)
- [Compaction & Branch Summarization](https://pi.dev/docs/latest/compaction)
