import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const cards = [
  ['第一次理解 Agent', '先搞懂 Model、Harness、Tools、Sandbox 各自負責什麼，不需要先懂 Rust 或 Cordis。', '/docs/learning-map'],
  ['深入 Codex Harness', '看懂 Agent Loop、Context、Thread / Turn / Item、codex-core 與 App Server。', '/docs/architecture/system-map'],
  ['實際使用 Codex', '從 CLI、exec、SDK 到 App Server，理解不同整合方式各自適合什麼情境。', '/docs/usage/cli'],
  ['客製 Codex 行為', '分清楚 Prompt、AGENTS.md、Skill、MCP、Hook、Rule 與 Subagent 該放在哪一層。', '/docs/applications/where-should-behavior-live'],
  ['理解 DeepSeek Harness', '從 Cordis、Everything is a Plugin、Session Events 到四種 Runtime Mode 建立第二套心智模型。', '/docs/deepseek/overview'],
  ['研究 Code Mode', '理解模型如何用受控 TypeScript 組合多步 Tool 操作，以及 Capability Seam 的設計價值。', '/docs/deepseek/code-mode-and-plugins'],
  ['比較 Codex 與 DeepSeek', '用同一組維度比較 Core、Loop、Model Provider、State、Sandbox、Extension 與成熟度。', '/docs/comparison/codex-vs-deepseek'],
  ['做 Harness 技術選型', '依 Coding Agent、Multi-model、Remote Sandbox、企業 SOP 與 Production Stability 選擇架構。', '/docs/comparison/selection-guide'],
];

const layers = [
  ['Model', '理解、推理、決定下一步'],
  ['Harness', '組 Context、驅動 Loop、管權限與狀態'],
  ['Tools', '讀檔、Shell、Patch、MCP'],
  ['Environment', 'Repository、OS、Git、Network'],
];

export default function Home() {
  return (
    <Layout title="Agent Harness 深度指南" description="以 Codex 與 DeepSeek Harness 兩套實作，從零理解 Agent Loop、Tools、State、安全邊界與 production architecture">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className={clsx('container', styles.heroContent)}>
          <Heading as="h1" className="hero__title">Agent Harness 深度指南</Heading>
          <p className="hero__subtitle">
            先用 Codex 建立完整 Coding Agent 心智模型，再用 DeepSeek Harness 理解另一種 Everything-is-a-Plugin 架構，最後逐項比較兩者的設計取捨。
          </p>
          <p className={styles.heroHint}>不要求先懂 Rust 或 Cordis；每個核心概念都先用直覺圖解，再進入 Runtime、原始碼與技術選型。</p>
          <div className={styles.buttons}>
            <Link className={clsx(styles.ctaButton, styles.primaryButton)} to="/docs/learning-map">先看學習地圖</Link>
            <Link className={clsx(styles.ctaButton, styles.secondaryButton)} to="/docs/comparison/codex-vs-deepseek">直接看兩者比較</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">先理解 Harness，再比較實作</Heading>
              <p>Model 不會直接碰你的電腦。Harness 才是把模型決策連到真實世界的控制中心；Codex 與 DeepSeek 的真正差異，在於這個控制中心應該如何拆分與擴充。</p>
            </div>
            <div className={styles.layerFlow} aria-label="Agent Harness 概念層次">
              {layers.map(([title, body], index) => (
                <div className={styles.layerItem} key={title}>
                  <div className={styles.layerCard}>
                    <span className={styles.layerIndex}>{index + 1}</span>
                    <Heading as="h3">{title}</Heading>
                    <p>{body}</p>
                  </div>
                  {index < layers.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
                </div>
              ))}
            </div>
            <p className={styles.flowNote}>
              最重要的一句：<strong>Model 負責判斷，Harness 負責協調與執行；不同 Harness 的核心差異，是「哪些責任固定、哪些責任可替換」。</strong>
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, styles.altSection)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">依你的目標選閱讀路徑</Heading>
              <p>可以先完整理解 Codex，再閱讀 DeepSeek；也可以直接進入比較區，再回頭補各自架構細節。</p>
            </div>
            <div className="cardGrid">
              {cards.map(([title, body, href]) => (
                <div className="conceptCard" key={title}>
                  <Heading as="h3">{title}</Heading>
                  <p>{body}</p>
                  <Link to={href}>閱讀這一章 →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
