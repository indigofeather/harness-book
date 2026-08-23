import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category', label: '一、基礎心智模型', collapsed: false,
      items: [
        'foundations/what-is-harness',
        'foundations/agent-loop',
        'foundations/context-and-caching',
        'foundations/thread-turn-item',
      ],
    },
    {
      type: 'category', label: '二、Harness 架構', collapsed: false,
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
      type: 'category', label: '五、使用方式',
      items: [
        'usage/cli',
        'usage/noninteractive-ci',
        'usage/sdk',
        'usage/app-server',
        'usage/github-actions',
      ],
    },
    {
      type: 'category', label: '六、應用與設計',
      items: [
        'applications/workflows',
        'applications/where-should-behavior-live',
        'applications/build-your-own-harness',
        'applications/production-checklist',
      ],
    },
    {
      type: 'category', label: '七、實戰 Labs',
      items: [
        'labs/trace-a-turn',
        'labs/guardrails',
        'labs/embed-app-server',
      ],
    },
    {
      type: 'category', label: '八、參考資料',
      items: [
        'reference/glossary',
        'reference/source-map',
        'reference/reading-list',
      ],
    },
  ],
};

export default sidebars;
