import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'learning-map',
    {
      type: 'category', label: '一、先理解 Agent 怎麼工作', collapsed: false,
      items: [
        'foundations/what-is-harness',
        'foundations/agent-loop',
        'foundations/context-and-caching',
        'foundations/thread-turn-item',
      ],
    },
    {
      type: 'category', label: '二、再看 Codex Harness 架構', collapsed: false,
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
      type: 'category', label: '三、安全、權限與信任邊界',
      items: [
        'security/sandbox-and-approvals',
        'security/permissions-rules-network',
        'security/trust-boundaries',
      ],
    },
    {
      type: 'category', label: '四、客製化與擴充',
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
      type: 'category', label: '五、實際使用 Codex',
      items: [
        'usage/cli',
        'usage/noninteractive-ci',
        'usage/sdk',
        'usage/app-server',
        'usage/github-actions',
      ],
    },
    {
      type: 'category', label: '六、把 Harness 用在真實系統',
      items: [
        'applications/workflows',
        'applications/where-should-behavior-live',
        'applications/build-your-own-harness',
        'applications/production-checklist',
      ],
    },
    {
      type: 'category', label: '七、DeepSeek Harness：另一種設計哲學', collapsed: false,
      items: [
        'deepseek/overview',
        'deepseek/architecture',
        'deepseek/session-and-events',
        'deepseek/code-mode-and-plugins',
      ],
    },
    {
      type: 'category', label: '八、Codex vs DeepSeek：比較與選型', collapsed: false,
      items: [
        'comparison/codex-vs-deepseek',
        'comparison/selection-guide',
      ],
    },
    {
      type: 'category', label: '九、實戰 Labs',
      items: [
        'labs/trace-a-turn',
        'labs/guardrails',
        'labs/embed-app-server',
      ],
    },
    {
      type: 'category', label: '十、參考資料',
      items: [
        'reference/glossary',
        'reference/source-map',
        'reference/reading-list',
      ],
    },
  ],
};

export default sidebars;
