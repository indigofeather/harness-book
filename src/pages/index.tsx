import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const cards = [
  ['第一次理解 Agent', '先搞懂 Model、Harness、Tools、Sandbox 各自負責什麼，不需要先懂 Rust。', '/docs/learning-map'],
  ['已經常用 Codex CLI', '看懂 Agent Loop、Context、Thread / Turn / Item，理解 Codex 為什麼會這樣運作。', '/docs/foundations/agent-loop'],
  ['要做 Agent / Platform', '深入 codex-core、App Server、Tool Runtime、State、Security 與 production architecture。', '/docs/architecture/system-map'],
  ['客製 Codex 行為', '分清楚 Prompt、AGENTS.md、Skill、MCP、Hook、Rule 與 Subagent 該放在哪一層。', '/docs/applications/where-should-behavior-live'],
  ['建立自己的 Harness', '把 Codex 的設計拆成 model client、tool executor、authorizer、event store 與 context builder。', '/docs/applications/build-your-own-harness'],
  ['跟著 Lab 實作', '實際追蹤一次 Turn、建立 guardrails，再做最小 App Server client。', '/docs/labs/trace-a-turn'],
];

const layers = [
  ['Model', '理解、推理、決定下一步'],
  ['Harness', '組 Context、驅動 Loop、管權限與狀態'],
  ['Tools', '讀檔、Shell、Patch、MCP'],
  ['Environment', 'Repository、OS、Git、Network'],
];

export default function Home() {
  return (
    <Layout title="Codex Harness 深度指南" description="從零理解 Codex Harness：Model、Agent Loop、Tools、安全邊界到 production integration">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className={clsx('container', styles.heroContent)}>
          <Heading as="h1" className="hero__title">Codex Harness 深度指南</Heading>
          <p className="hero__subtitle">
            從「Codex 到底怎麼工作」開始，一路理解 Agent Loop、Context、Tools、Sandbox、App Server 與 production harness。
          </p>
          <p className={styles.heroHint}>不要求先懂 Rust，也不是 CLI 指令表；每個核心概念都先用直覺圖解，再進入工程細節。</p>
          <div className={styles.buttons}>
            <Link className={clsx('button', 'button--lg', styles.primaryButton)} to="/docs/learning-map">先看學習地圖</Link>
            <Link className={clsx('button', 'button--lg', styles.secondaryButton)} to="/docs/intro">從導論開始</Link>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">先用一張圖理解 Codex</Heading>
              <p>Model 不會直接碰你的電腦。Harness 才是把模型決策連到真實世界的控制中心。</p>
            </div>
            <div className={styles.layerFlow} aria-label="Codex Harness 概念層次">
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
              最重要的一句：<strong>Model 負責判斷，Harness 負責協調與執行。</strong>
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, styles.altSection)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">依你的程度選閱讀路徑</Heading>
              <p>同一份教材可以從概念層、工程層或架構層切入。</p>
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
