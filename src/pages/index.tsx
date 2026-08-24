import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const cards = [
  ['第一次理解 Agent', '先搞懂 Model、Harness、Tools、Sandbox 各自負責什麼，不需要先懂 Rust、Cordis 或 Pi Extensions。', '/docs/learning-map'],
  ['深入 Codex Harness', '看懂 Agent Loop、Context、Thread / Turn / Item、codex-core 與 App Server。', '/docs/architecture/system-map'],
  ['實際使用 Codex', '從 CLI、exec、SDK 到 App Server，理解不同整合方式各自適合什麼情境。', '/docs/usage/cli'],
  ['客製 Codex 行為', '分清楚 Prompt、AGENTS.md、Skill、MCP、Hook、Rule 與 Subagent 該放在哪一層。', '/docs/applications/where-should-behavior-live'],
  ['理解 DeepSeek Harness', '從 Cordis、Everything is a Plugin、Session Events 到 Runtime Composition 建立第二套心智模型。', '/docs/deepseek/overview'],
  ['研究 DeepSeek Code Mode', '理解模型如何用受控 TypeScript 組合多步 Tool 操作，以及 Capability Seam 的設計價值。', '/docs/deepseek/code-mode-and-plugins'],
  ['理解 Pi Agent Harness', '從 pi-ai、pi-agent-core、AgentSession 到 JSONL Session Tree，理解 Minimal Harness 的第三種答案。', '/docs/pi/overview'],
  ['研究 Pi Extensions', '理解 TypeScript Extension 如何加入 Tools、Events、Commands、UI、Compaction 與 Provider。', '/docs/pi/session-and-extensions'],
  ['建立 Harness 比較框架', '先學會比較 Runtime Center、State、Security、Extension 與 Ownership，再進入三方架構差異。', '/docs/comparison/overview'],
  ['做 Harness 技術選型', '把 Coding Agent、Platform、Security、Embedded、Research 等需求映射到三種架構。', '/docs/comparison/scenario-selection'],
];

const layers = [
  ['Model', '理解、推理、決定下一步'],
  ['Harness', '組 Context、驅動 Loop、管工具與狀態'],
  ['Tools', '讀檔、Shell、Patch、MCP / Extensions'],
  ['Environment', 'Repository、OS、Git、Network、Sandbox'],
];

export default function Home() {
  return (
    <Layout title="Agent Harness 深度指南" description="以 Codex、DeepSeek Harness 與 Pi 三套開源實作，從零理解 Agent Loop、Tools、State、安全邊界與 production architecture">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className={clsx('container', styles.heroContent)}>
          <Heading as="h1" className="hero__title">Agent Harness 深度指南</Heading>
          <p className="hero__subtitle">
            用 Codex、DeepSeek Harness 與 Pi 三套開源實作，看懂 Productized Runtime、Composable Framework 與 Minimal Harness 三種不同設計哲學。
          </p>
          <p className={styles.heroHint}>不要求先懂 Rust、Cordis 或 Pi Extensions；每個核心概念都先用直覺圖解，再進入 Runtime、原始碼與技術選型。</p>
          <div className={styles.buttons}>
            <Link className={clsx(styles.ctaButton, styles.primaryButton)} to="/docs/learning-map">先看學習地圖</Link>
            <Link className={clsx(styles.ctaButton, styles.secondaryButton)} to="/docs/comparison/architecture-comparison">直接看三方比較</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">先理解 Harness，再比較實作</Heading>
              <p>Model 不會直接碰你的電腦。Harness 才是把模型決策連到真實世界的控制中心；三套案例的真正差異，在於哪些責任要固定、哪些要做成 seam、哪些甚至應該移出 core。</p>
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
              最重要的一句：<strong>Codex 偏 Productized Runtime、DeepSeek 偏 Composable Runtime、Pi 偏 Minimal Runtime；三者都在解同一個 Harness 問題。</strong>
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, styles.altSection)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">依你的目標選閱讀路徑</Heading>
              <p>可以先用 Codex 建立完整 Coding Agent 心智模型，再讀 DeepSeek 與 Pi；也可以直接進入第九章比較框架，再回頭補各自架構細節。</p>
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
