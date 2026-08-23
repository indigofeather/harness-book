import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const cards = [
  ['先建立正確心智模型', '模型、harness、工具、context、policy 到底各自負責什麼。', '/docs/foundations/what-is-harness'],
  ['追一遍 Agent Loop', '從 prompt assembly、Responses API、tool call 到下一輪 inference。', '/docs/foundations/agent-loop'],
  ['拆解 Rust 架構', '以 openai/codex 的 core、protocol、app-server、exec、sandboxing 等模組對照。', '/docs/architecture/codex-core'],
  ['做真正的整合', '用 CLI、exec、SDK、App Server 與 GitHub Actions 把 Codex 放進工作流。', '/docs/usage/app-server'],
  ['建立自己的 Harness', '把 Codex 的設計拆成可重用的架構原則與 production checklist。', '/docs/applications/build-your-own-harness'],
  ['跟著 Lab 實作', '追蹤一次 turn、建立 guardrails、寫最小 App Server client。', '/docs/labs/trace-a-turn'],
];

export default function Home() {
  return (
    <Layout title="Codex Harness 深度指南" description="從 Codex agent loop 到 production integration 的完整繁體中文教材">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">Codex Harness 深度指南</Heading>
          <p className="hero__subtitle">不是一份 CLI 指令表，而是一套從 agent runtime、context orchestration、tool execution、安全邊界到整合架構的完整教材。</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs/intro">開始閱讀</Link>
            <Link className="button button--outline button--secondary button--lg" to="/docs/architecture/system-map">直接看架構</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.section}>
          <div className="container">
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
