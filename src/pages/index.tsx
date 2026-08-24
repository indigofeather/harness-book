import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const cards = [
  ['共同基礎', '先建立 vendor-neutral 的 Model、Harness、Agent Loop、Context、Tools、State 與 Policy 心智模型。', '/docs/foundations/what-is-harness'],
  ['Codex｜Productized Runtime', '從 codex-core、Thread / Turn / Item、Tool Execution 到 Sandbox、Skills、App Server，完整看一套產品化 Coding Runtime。', '/docs/architecture/system-map'],
  ['DeepSeek｜Composable Runtime', '從 Cordis、Model / Loop、Tool Pipeline、SessionEvent 到 Plugins、Execution World、SDK 與 Replay。', '/docs/deepseek/overview'],
  ['Pi｜Minimal Runtime', '從 pi-ai、pi-agent-core、AgentSession、JSONL Session Tree 到 Resources、Extensions、RPC 與 Governance。', '/docs/pi/overview'],
  ['三套 Harness Labs', '用 Trace、Extension / Plugin、Replay / Branch 等實驗直接觀察三套 runtime 的 architecture behavior。', '/docs/labs/trace-a-turn'],
  ['架構逐項比較', '用 Runtime、Context、State、Tools、Extensions、Security、Integration、Ownership Cost 比較三套。', '/docs/comparison/architecture-comparison'],
  ['情境式選型', '把 Coding Agent、Embedded App、Agent Platform、Security、Research 等需求映射到不同 architecture。', '/docs/comparison/scenario-selection'],
  ['真實系統與 Production', '把三套抽象回 Workflow、Behavior Placement、自製 Harness 與 Production Checklist。', '/docs/applications/workflows'],
  ['三套原始碼導讀', '從責任邊界開始讀 openai/codex、deepseek-ai/deepseek-harness 與 earendil-works/pi。', '/docs/reference/source-reading'],
];

const layers = [
  ['Model', '理解、推理、提出下一步'],
  ['Harness', '組 Context、驅動 Loop、協調狀態與事件'],
  ['Capabilities', 'Tools、Files、Shell、APIs、Extensions'],
  ['Execution & Policy', 'OS、Sandbox、Network、Credentials、Trust'],
];

export default function Home() {
  return (
    <Layout title="Agent Harness 深度指南" description="以 Codex、DeepSeek Harness 與 Pi 三套完整開源 case study，對稱理解 Agent Runtime、Tools、State、安全、擴充與 production architecture">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className={clsx('container', styles.heroContent)}>
          <Heading as="h1" className="hero__title">Agent Harness 深度指南</Heading>
          <p className="hero__subtitle">
            用 Codex、DeepSeek Harness 與 Pi 三套完整開源 case study，看懂 Productized Runtime、Composable Framework 與 Minimal Harness 三種架構答案。
          </p>
          <p className={styles.heroHint}>三套都從 Model / Loop / Context / Tools / State / Security / Extensions / Integration / Production 讀到底，不再把任何一套當附錄。</p>
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
              <Heading as="h2">先理解責任，再比較實作</Heading>
              <p>真正的差異不是「哪套有更多功能」，而是 Model、Tools、State、Security、Extensions 與 Client responsibilities 被放在哪一層，以及最後由誰維護。</p>
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
              最重要的一句：<strong>Codex 偏 Productized Runtime、DeepSeek 偏 Composable Runtime、Pi 偏 Minimal Runtime；三套都是完整 Harness，只是 responsibility boundary 不同。</strong>
            </p>
          </div>
        </section>

        <section className={clsx(styles.section, styles.altSection)}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <Heading as="h2">三套同等深度，依問題自由切入</Heading>
              <p>你可以從共同基礎開始依序讀三套，也可以先選自己最關心的 Harness，再回到比較章用共同維度校正理解。</p>
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
