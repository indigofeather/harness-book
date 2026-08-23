import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'learning-map',
    {
      type: 'category', label: '一、先理解 Agent 怎麼工作', collapsed: true,
      items: [
        'foundations/what-is-harness',
        'foundations/agent-loop',
        'foundations/context-and-caching',
        'foundations/thread-turn-item',
      ],
    },
    {
      type: 'category', label: '二、再看 Codex Harness 架構', collapsed: true,
      items: [
        'architecture/system-map',
        'architecture/codex-core',
        'architecture/app-server-and-protocol',
        'architecture/model-provider-and-streaming',
        'architecture/tool-execution',
        'architecture/state-and-persistence',
        'architecture/client-surfaces',
      ],
    },
    {
      type: 'category', label: '三、Codex 安全、權限與信任邊界', collapsed: true,
      items: [
        'security/sandbox-and-approvals',
        'security/permissions-rules-network',
        'security/trust-boundaries',
      ],
    },
    {
      type: 'category', label: '四、Codex 客製化與擴充', collapsed: true,
      items: [
        'customization/config',
        'customization/agents-md',
        'customization/skills-and-plugins',
        'customization/mcp',
        'customization/hooks',
        'customization/subagents-and-worktrees',
      ],
    },
    {
      type: 'category', label: '五、實際使用 Codex', collapsed: true,
      items: [
        'usage/cli',
        'usage/noninteractive-ci',
        'usage/sdk',
        'usage/app-server',
        'usage/github-actions',
      ],
    },
    {
      type: 'category', label: '六、Codex 實戰 Labs', collapsed: true,
      items: [
        'labs/trace-a-turn',
        'labs/guardrails',
        'labs/embed-app-server',
      ],
    },
    {
      type: 'category', label: '七、DeepSeek Harness：完整導讀', collapsed: true,
      items: [
        'deepseek/overview',
        'deepseek/architecture',
        'deepseek/usage-and-profiles',
        'deepseek/session-and-events',
        'deepseek/models-skills-and-extensions',
        'deepseek/code-mode-and-plugins',
        'deepseek/security-and-approvals',
        'deepseek/integration-surfaces',
        'deepseek/production-and-testing',
      ],
    },
    {
      type: 'category', label: '八、Codex vs DeepSeek：比較與選型', collapsed: true,
      items: [
        'comparison/codex-vs-deepseek',
        'comparison/selection-guide',
      ],
    },
    {
      type: 'category', label: '九、把 Harness 用在真實系統', collapsed: true,
      items: [
        'applications/workflows',
        'applications/where-should-behavior-live',
        'applications/build-your-own-harness',
        'applications/production-checklist',
      ],
    },
    {
      type: 'category', label: '十、參考資料', collapsed: true,
      items: [
        'reference/glossary',
        'reference/source-reading',
        'reference/source-map',
        'reference/deepseek-source-map',
        'reference/reading-list',
      ],
    },
  ],
};

export default sidebars;
